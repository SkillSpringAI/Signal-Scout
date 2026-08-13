import type { ScanJob } from './contracts.js'

export interface ScanStore {
  create(job: ScanJob): Promise<void>
  get(id: string): Promise<ScanJob | undefined>
  save(job: ScanJob): Promise<void>
}

export class InMemoryScanStore implements ScanStore {
  private readonly jobs = new Map<string, ScanJob>()

  async create(job: ScanJob) { this.jobs.set(job.id, structuredClone(job)) }
  async get(id: string) { const job = this.jobs.get(id); return job ? structuredClone(job) : undefined }
  async save(job: ScanJob) { this.jobs.set(job.id, structuredClone(job)) }
}

export class FirestoreScanStore implements ScanStore {
  private constructor(private readonly collection: { doc(id: string): { set(value: ScanJob): Promise<unknown>; get(): Promise<{ exists: boolean; data(): unknown }> } }) {}

  static async create(collectionName: string): Promise<FirestoreScanStore> {
    const [{ applicationDefault, getApps, initializeApp }, { getFirestore }] = await Promise.all([import('firebase-admin/app'), import('firebase-admin/firestore')])
    const app = getApps()[0] ?? initializeApp({ credential: applicationDefault() })
    return new FirestoreScanStore(getFirestore(app).collection(collectionName) as never)
  }

  async create(job: ScanJob) { await this.save(job) }
  async get(id: string) { const snapshot = await this.collection.doc(id).get(); return snapshot.exists ? snapshot.data() as ScanJob : undefined }
  async save(job: ScanJob) { await this.collection.doc(job.id).set(structuredClone(job)) }
}
