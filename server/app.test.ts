import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createServerApp } from './app.js'
import { ScanRunner } from './runner.js'
import { InMemoryScanStore } from './store.js'
import type { FieldAnalysis, SourceRecord } from './contracts.js'

const source: SourceRecord = { url: 'https://example.com/event', evidenceRole: 'event', title: 'Event', collectedAt: '2026-08-14T00:00:00.000Z', contentType: 'text/html', byteLength: 20, excerpt: 'Official event requirements' }
const analysis: FieldAnalysis = { eventName: 'Event', summary: 'Summary', requirements: ['Requirement'], judgingCriteria: ['Criterion'], strategicGaps: [{ title: 'Gap', rationale: 'Reason', sourceUrls: [source.url], confidence: 'medium' }], learningShortlist: ['Learn'], buildPlan: ['Build'], uncertainties: [] }

describe('API', () => {
  it('rejects invalid scans and exposes health', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => { throw new Error('unused') } }, { analyze: async () => { throw new Error('unused') } })
    const app = createServerApp({ runner, store })
    expect((await request(app).get('/api/health')).body.ok).toBe(true)
    const invalid = await request(app).post('/api/scans').send({ hackathonUrl: 'not-a-url', builderContext: 'short' })
    expect(invalid.status).toBe(400)
    expect(invalid.body.error).toBe('INVALID_REQUEST')
  })

  it('creates a queued job without exposing secrets', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => { throw new Error('offline') } }, { analyze: async () => { throw new Error('unused') } })
    const app = createServerApp({ runner, store })
    const response = await request(app).post('/api/scans').send({ hackathonUrl: 'https://example.com', builderContext: 'I want a trustworthy builder research report.' })
    expect(response.status).toBe(202)
    expect(response.headers.location).toMatch(/^\/api\/scans\//)
    expect(JSON.stringify(response.body)).not.toContain('API_KEY')
  })

  it('rejects invalid feedback before model execution', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => { throw new Error('unused') } }, { analyze: async () => { throw new Error('unused') } })
    const app = createServerApp({ runner, store })
    const response = await request(app).post('/api/scans/92e12351-c171-4a22-a390-d8a20002ef01/feedback').send({ feedback: 'short' })
    expect(response.status).toBe(400)
    expect(response.body.error).toBe('INVALID_FEEDBACK')
  })

  it('accepts one bounded analysis retry for a partial scan', async () => {
    const store = new InMemoryScanStore()
    let analyses = 0
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => { analyses += 1; if (analyses === 1) throw new Error('Unsupported claim'); return analysis } })
    const job = await runner.create({ hackathonUrl: source.url, builderContext: 'I want a trustworthy builder research report.', projectUrls: [] })
    await runner.run(job.id)
    const app = createServerApp({ runner, store })
    const response = await request(app).post(`/api/scans/${job.id}/retry-analysis`)
    expect(response.status).toBe(202)
    expect(response.body.status).toBe('extracting')
    for (let attempt = 0; attempt < 20; attempt += 1) {
      if ((await store.get(job.id))?.status === 'completed') break
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
    expect((await store.get(job.id))?.status).toBe('completed')
    expect((await request(app).post(`/api/scans/${job.id}/retry-analysis`)).status).toBe(409)
  })
})
