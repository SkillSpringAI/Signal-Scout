import { describe, expect, it } from 'vitest'
import { LiveScanApi, LiveScanApiError } from './liveScanApi'
import type { ScanJob } from '../../server/contracts'

const job = (status: ScanJob['status']): ScanJob => ({ id: '92e12351-c171-4a22-a390-d8a20002ef01', request: { hackathonUrl: 'https://example.com', builderContext: 'Detailed builder context for this scan.', projectUrls: [] }, status, createdAt: '2026-08-13T00:00:00.000Z', updatedAt: '2026-08-13T00:00:00.000Z', events: [], sources: [] })
const jsonResponse = (value: unknown, status = 200) => new Response(JSON.stringify(value), { status, headers: { 'content-type': 'application/json' } })

describe('LiveScanApi', () => {
  it('creates and polls a scan to a terminal state', async () => {
    const responses = [job('queued'), job('retrieving'), job('completed')]
    const api = new LiveScanApi({ pollIntervalMs: 0, fetchImpl: async (_input, init) => init?.method === 'POST' ? jsonResponse(responses.shift()) : jsonResponse(responses.shift()) })
    const created = await api.createScan(job('queued').request)
    const updates: string[] = []
    const completed = await api.waitForTerminal(created.id, (current) => updates.push(current.status))
    expect(completed.status).toBe('completed')
    expect(updates).toEqual(['retrieving', 'completed'])
  })

  it('reports an unavailable API without leaking fetch details', async () => {
    const api = new LiveScanApi({ fetchImpl: async () => { throw new Error('connection detail') } })
    await expect(api.health()).rejects.toEqual(new LiveScanApiError('The live Signal Scout API is unavailable.'))
  })

  it('stops at the polling limit', async () => {
    const api = new LiveScanApi({ maxPolls: 2, pollIntervalMs: 0, fetchImpl: async () => jsonResponse(job('retrieving')) })
    await expect(api.waitForTerminal(job('queued').id, () => undefined)).rejects.toThrow('configured limit')
  })

  it('submits explicit feedback to the bounded endpoint', async () => {
    let body = ''
    const api = new LiveScanApi({ fetchImpl: async (_input, init) => { body = String(init?.body); return jsonResponse(job('completed')) } })
    await api.submitFeedback(job('completed').id, 'Prioritize the shortest credible demo path.')
    expect(JSON.parse(body)).toEqual({ feedback: 'Prioritize the shortest credible demo path.' })
  })
})
