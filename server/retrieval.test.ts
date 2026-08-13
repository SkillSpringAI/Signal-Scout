import { describe, expect, it } from 'vitest'
import { SafeHttpRetriever } from './retrieval.js'

describe('SafeHttpRetriever', () => {
  it.each(['http://localhost/a', 'http://127.0.0.1/a', 'http://10.0.0.1/a', 'file:///etc/passwd'])('blocks non-public source %s', async (url) => {
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, fetchImpl: async () => { throw new Error('must not fetch') } })
    await expect(retriever.retrieve(url)).rejects.toThrow()
  })

  it('extracts bounded text and provenance', async () => {
    const html = '<html><head><title>Official Event</title><script>ignore()</script></head><body><h1>Rules</h1></body></html>'
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, fetchImpl: async () => new Response(html, { headers: { 'content-type': 'text/html' } }) })
    const result = await retriever.retrieve('https://example.com/event#section')
    expect(result.title).toBe('Official Event')
    expect(result.excerpt).toBe('Official Event Rules')
    expect(result.url).toBe('https://example.com/event')
  })

  it('rejects unsupported content', async () => {
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, fetchImpl: async () => new Response('binary', { headers: { 'content-type': 'application/pdf' } }) })
    await expect(retriever.retrieve('https://example.com/file')).rejects.toThrow('Unsupported source content type')
  })
})
