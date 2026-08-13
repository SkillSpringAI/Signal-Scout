import { describe, expect, it } from 'vitest'
import { InMemoryScanStore } from './store.js'
import type { ScanJob } from './contracts.js'

const validJob: ScanJob = {
  id: '92e12351-c171-4a22-a390-d8a20002ef01',
  request: { hackathonUrl: 'https://example.com', builderContext: 'A sufficiently detailed builder context.', projectUrls: [] },
  status: 'queued',
  createdAt: '2026-08-13T00:00:00.000Z',
  updatedAt: '2026-08-13T00:00:00.000Z',
  events: [],
  sources: [],
}

describe('scan stores', () => {
  it('round-trips validated jobs and deletes only the target id', async () => {
    const store = new InMemoryScanStore()
    await store.create(validJob)
    expect(await store.get(validJob.id)).toEqual(validJob)
    await store.delete(validJob.id)
    expect(await store.get(validJob.id)).toBeUndefined()
  })

  it('rejects malformed durable state', async () => {
    const store = new InMemoryScanStore()
    await expect(store.save({ ...validJob, status: 'invented' } as never)).rejects.toThrow()
  })

  it('rejects stale conditional writes', async () => {
    const store = new InMemoryScanStore()
    await store.create(validJob)
    const newer = { ...validJob, status: 'cancelled' as const, updatedAt: '2026-08-13T00:00:01.000Z' }
    await store.save(newer, validJob.updatedAt)
    await expect(store.save({ ...validJob, status: 'completed', updatedAt: '2026-08-13T00:00:02.000Z' }, validJob.updatedAt)).rejects.toThrow('changed before this update')
    expect((await store.get(validJob.id))?.status).toBe('cancelled')
  })
})
