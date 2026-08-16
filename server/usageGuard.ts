import type { CollectionReference, DocumentData } from 'firebase-admin/firestore'

export type CostlyAction = 'scan' | 'analysis_retry' | 'feedback'

export class DemoCapacityError extends Error {
  constructor(message: string, readonly retryAfterSeconds: number) {
    super(message)
    this.name = 'DemoCapacityError'
  }
}

export interface DailyUsageStore {
  consume(day: string, limit: number): Promise<boolean>
}

export interface UsageGuard {
  consume(clientId: string, action: CostlyAction): Promise<void>
}

export class InMemoryDailyUsageStore implements DailyUsageStore {
  private readonly counts = new Map<string, number>()

  async consume(day: string, limit: number) {
    const current = this.counts.get(day) ?? 0
    if (current >= limit) return false
    this.counts.set(day, current + 1)
    return true
  }
}

export class FirestoreDailyUsageStore implements DailyUsageStore {
  private constructor(private readonly collection: CollectionReference<DocumentData>) {}

  static async create(collectionName: string) {
    const [{ applicationDefault, getApps, initializeApp }, { getFirestore }] = await Promise.all([import('firebase-admin/app'), import('firebase-admin/firestore')])
    const app = getApps()[0] ?? initializeApp({ credential: applicationDefault() })
    return new FirestoreDailyUsageStore(getFirestore(app).collection(collectionName))
  }

  async consume(day: string, limit: number) {
    const reference = this.collection.doc(day)
    return this.collection.firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(reference)
      const current = snapshot.exists && typeof snapshot.data()?.count === 'number' ? snapshot.data()?.count as number : 0
      if (current >= limit) return false
      transaction.set(reference, { count: current + 1, day, updatedAt: new Date().toISOString() })
      return true
    })
  }
}

export class PublicDemoUsageGuard implements UsageGuard {
  private readonly bursts = new Map<string, number[]>()

  constructor(private readonly store: DailyUsageStore, private readonly options: {
    dailyLimit: number
    burstLimit: number
    burstWindowMs: number
    now?: () => Date
  }) {}

  async consume(clientId: string, _action: CostlyAction) {
    const now = (this.options.now ?? (() => new Date()))()
    const timestamp = now.getTime()
    const windowStart = timestamp - this.options.burstWindowMs
    const recent = (this.bursts.get(clientId) ?? []).filter((candidate) => candidate > windowStart)
    if (recent.length >= this.options.burstLimit) {
      const retryAfterMs = recent[0] + this.options.burstWindowMs - timestamp
      throw new DemoCapacityError('This browser has reached the public demo burst limit. Try again later or use the mock demo.', Math.max(1, Math.ceil(retryAfterMs / 1_000)))
    }

    const day = now.toISOString().slice(0, 10)
    if (!await this.store.consume(day, this.options.dailyLimit)) {
      const nextUtcDay = Date.parse(`${day}T00:00:00.000Z`) + 86_400_000
      throw new DemoCapacityError('Today\'s live demo capacity has been reached. The mock demo and recorded evidence remain available.', Math.max(1, Math.ceil((nextUtcDay - timestamp) / 1_000)))
    }

    recent.push(timestamp)
    this.bursts.set(clientId, recent)
  }
}

export const noUsageGuard: UsageGuard = { consume: async () => undefined }
