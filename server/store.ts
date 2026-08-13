import type { CollectionReference, DocumentData } from 'firebase-admin/firestore'
import { scanJobSchema, type ScanJob } from './contracts.js'

export interface ScanStore {
  create(job: ScanJob): Promise<void>
  get(id: string): Promise<ScanJob | undefined>
  save(job: ScanJob, expectedUpdatedAt?: string): Promise<void>
  delete(id: string): Promise<void>
}

export class ScanStoreConflictError extends Error {
  constructor(id: string) { super(`Scan ${id} changed before this update could be saved.`); this.name = 'ScanStoreConflictError' }
}

export class InMemoryScanStore implements ScanStore {
  private readonly jobs = new Map<string, ScanJob>()

  async create(job: ScanJob) { this.jobs.set(job.id, structuredClone(scanJobSchema.parse(job))) }
  async get(id: string) { const job = this.jobs.get(id); return job ? structuredClone(job) : undefined }
  async save(job: ScanJob, expectedUpdatedAt?: string) {
    const current = this.jobs.get(job.id)
    if (expectedUpdatedAt !== undefined && current?.updatedAt !== expectedUpdatedAt) throw new ScanStoreConflictError(job.id)
    this.jobs.set(job.id, structuredClone(scanJobSchema.parse(job)))
  }
  async delete(id: string) { this.jobs.delete(id) }
}

export class FirestoreScanStore implements ScanStore {
  private constructor(private readonly collection: CollectionReference<DocumentData>) {}

  static async create(collectionName: string): Promise<FirestoreScanStore> {
    const [{ applicationDefault, getApps, initializeApp }, { getFirestore }] = await Promise.all([import('firebase-admin/app'), import('firebase-admin/firestore')])
    const app = getApps()[0] ?? initializeApp({ credential: applicationDefault() })
    return new FirestoreScanStore(getFirestore(app).collection(collectionName))
  }

  async create(job: ScanJob) { await this.save(job) }
  async get(id: string) { const snapshot = await this.collection.doc(id).get(); return snapshot.exists ? scanJobSchema.parse(snapshot.data()) : undefined }
  async save(job: ScanJob, expectedUpdatedAt?: string) {
    const validated = scanJobSchema.parse(job)
    const reference = this.collection.doc(validated.id)
    if (expectedUpdatedAt === undefined) { await reference.set(structuredClone(validated)); return }
    await this.collection.firestore.runTransaction(async (transaction) => {
      const snapshot = await transaction.get(reference)
      const current = snapshot.exists ? scanJobSchema.parse(snapshot.data()) : undefined
      if (current?.updatedAt !== expectedUpdatedAt) throw new ScanStoreConflictError(validated.id)
      transaction.set(reference, structuredClone(validated))
    })
  }
  async delete(id: string) { await this.collection.doc(id).delete() }
}
