import { describe, expect, it } from 'vitest'
import { SafeHttpRetriever } from './retrieval.js'

describe('SafeHttpRetriever', () => {
  const publicLookup = async () => [{ address: '93.184.216.34', family: 4 as const }]

  it.each(['http://localhost/a', 'http://127.0.0.1/a', 'http://10.0.0.1/a', 'http://[::1]/a', 'http://[::ffff:127.0.0.1]/a', 'file:///etc/passwd'])('blocks non-public source %s', async (url) => {
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, lookupImpl: publicLookup, fetchImpl: async () => { throw new Error('must not fetch') } })
    await expect(retriever.retrieve(url)).rejects.toThrow()
  })

  it('extracts bounded text and provenance', async () => {
    const html = '<html><head><title>Official Event</title><script>ignore()</script></head><body><h1>Rules</h1></body></html>'
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, lookupImpl: publicLookup, fetchImpl: async () => new Response(html, { headers: { 'content-type': 'text/html' } }) })
    const result = await retriever.retrieve('https://example.com/event#section')
    expect(result.title).toBe('Official Event')
    expect(result.excerpt).toBe('Official Event Rules')
    expect(result.url).toBe('https://example.com/event')
  })

  it('rejects unsupported content', async () => {
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, lookupImpl: publicLookup, fetchImpl: async () => new Response('binary', { headers: { 'content-type': 'application/pdf' } }) })
    await expect(retriever.retrieve('https://example.com/file')).rejects.toThrow('Unsupported source content type')
  })

  it('enforces role-specific hosts on the initial URL and redirects', async () => {
    const responses = [new Response(null, { status: 302, headers: { location: 'https://evil.example/project' } })]
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, lookupImpl: publicLookup, allowedEventHosts: ['devpost.com'], allowedProjectHosts: ['github.com'], fetchImpl: async () => responses.shift() as Response })
    await expect(retriever.retrieve('https://event.devpost.com/', 'event')).rejects.toThrow('Event source host is not available')
    await expect(retriever.retrieve('https://example.com/', 'event')).rejects.toThrow('Event source host is not available')
  })

  it('rejects hostnames that resolve to private addresses', async () => {
    const retriever = new SafeHttpRetriever({ timeoutMs: 1_000, maxBytes: 10_000, lookupImpl: async () => [{ address: '10.0.0.8', family: 4 }], allowedEventHosts: ['devpost.com'], fetchImpl: async () => { throw new Error('must not fetch') } })
    await expect(retriever.retrieve('https://event.devpost.com/', 'event')).rejects.toThrow('resolved to a private')
  })
})
