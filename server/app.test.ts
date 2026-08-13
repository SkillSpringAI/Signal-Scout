import { describe, expect, it } from 'vitest'
import request from 'supertest'
import { createServerApp } from './app.js'
import { ScanRunner } from './runner.js'
import { InMemoryScanStore } from './store.js'

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
})
