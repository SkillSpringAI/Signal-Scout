import { isIP } from 'node:net'
import { lookup as dnsLookup } from 'node:dns/promises'
import type { SourceRecord } from './contracts.js'

export type EvidenceRole = 'event' | 'project'
export interface Retriever { retrieve(url: string, evidenceRole?: EvidenceRole): Promise<SourceRecord> }
type LookupAll = (hostname: string) => Promise<Array<{ address: string; family: number }>>

const blockedHostnames = new Set(['localhost', 'localhost.localdomain'])

function assertPublicUrl(value: string): URL {
  const url = new URL(value)
  if (url.protocol !== 'https:' && url.protocol !== 'http:') throw new Error('Only HTTP and HTTPS sources are supported.')
  const host = url.hostname.toLowerCase().replace(/\.$/, '')
  if (blockedHostnames.has(host) || host.endsWith('.local') || host.endsWith('.internal')) throw new Error('Private or local source hosts are not allowed.')
  if (isPrivateAddress(host)) throw new Error('Private or local source addresses are not allowed.')
  url.username = ''
  url.password = ''
  url.hash = ''
  return url
}

function isPrivateAddress(host: string) {
  const normalizedHost = host.toLowerCase().replace(/^\[|\]$/g, '')
  const ipVersion = isIP(normalizedHost)
  if (ipVersion === 4) {
    const octets = normalizedHost.split('.').map(Number)
    return octets[0] === 10 || octets[0] === 127 || octets[0] === 0 || (octets[0] === 100 && octets[1] >= 64 && octets[1] <= 127) || (octets[0] === 169 && octets[1] === 254) || (octets[0] === 172 && octets[1] >= 16 && octets[1] <= 31) || (octets[0] === 192 && (octets[1] === 0 || octets[1] === 168)) || (octets[0] === 198 && (octets[1] === 18 || octets[1] === 19 || octets[1] === 51)) || (octets[0] === 203 && octets[1] === 0 && octets[2] === 113) || octets[0] >= 224
  }
  if (ipVersion === 6) {
    if (normalizedHost.startsWith('::ffff:')) return isPrivateAddress(normalizedHost.slice(7))
    return normalizedHost === '::' || normalizedHost === '::1' || normalizedHost.startsWith('fc') || normalizedHost.startsWith('fd') || normalizedHost.startsWith('fe80:') || normalizedHost.startsWith('ff')
  }
  return false
}

function hostAllowed(host: string, allowed: string[]) {
  return allowed.some((candidate) => host === candidate || host.endsWith(`.${candidate}`))
}

function titleFromHtml(html: string, fallback: string) {
  const match = html.match(/<title[^>]*>([\s\S]*?)<\/title>/i)
  return (match?.[1] ?? fallback).replace(/<[^>]+>/g, '').replace(/\s+/g, ' ').trim().slice(0, 300)
}

function textFromHtml(html: string) {
  return html.replace(/<script[\s\S]*?<\/script>/gi, ' ').replace(/<style[\s\S]*?<\/style>/gi, ' ').replace(/<[^>]+>/g, ' ').replace(/&nbsp;/gi, ' ').replace(/&amp;/gi, '&').replace(/\s+/g, ' ').trim()
}

export class SafeHttpRetriever implements Retriever {
  constructor(private readonly options: {
    timeoutMs: number
    maxBytes: number
    fetchImpl?: typeof fetch
    lookupImpl?: LookupAll
    allowedEventHosts?: string[]
    allowedProjectHosts?: string[]
  }) {}

  async retrieve(input: string, evidenceRole?: EvidenceRole): Promise<SourceRecord> {
    let url = assertPublicUrl(input)
    const fetchImpl = this.options.fetchImpl ?? fetch
    for (let redirects = 0; redirects <= 3; redirects += 1) {
      this.assertAllowedHost(url, evidenceRole)
      await this.assertPublicResolution(url)
      const response = await fetchImpl(url, { redirect: 'manual', signal: AbortSignal.timeout(this.options.timeoutMs), headers: { 'user-agent': 'Signal-Scout/0.2 (+public-source-research)' } })
      if (response.status >= 300 && response.status < 400) {
        const location = response.headers.get('location')
        if (!location || redirects === 3) throw new Error('Source redirect limit exceeded.')
        url = assertPublicUrl(new URL(location, url).toString())
        continue
      }
      if (!response.ok) throw new Error(`Source returned HTTP ${response.status}.`)
      const contentType = (response.headers.get('content-type') ?? '').split(';')[0].toLowerCase()
      if (contentType !== 'text/html' && contentType !== 'text/plain') throw new Error(`Unsupported source content type: ${contentType || 'unknown'}.`)
      const declaredLength = Number(response.headers.get('content-length') ?? 0)
      if (declaredLength > this.options.maxBytes) throw new Error('Source exceeds the configured size limit.')
      const bytes = new Uint8Array(await response.arrayBuffer())
      if (bytes.byteLength > this.options.maxBytes) throw new Error('Source exceeds the configured size limit.')
      const raw = new TextDecoder().decode(bytes)
      const excerpt = (contentType === 'text/html' ? textFromHtml(raw) : raw).slice(0, 20_000)
      if (!excerpt) throw new Error('Source did not contain readable text.')
      return { url: url.toString(), title: contentType === 'text/html' ? titleFromHtml(raw, url.hostname) : url.hostname, collectedAt: new Date().toISOString(), contentType, byteLength: bytes.byteLength, excerpt }
    }
    throw new Error('Source retrieval failed.')
  }

  private assertAllowedHost(url: URL, evidenceRole?: EvidenceRole) {
    const allowed = evidenceRole === 'event' ? this.options.allowedEventHosts : evidenceRole === 'project' ? this.options.allowedProjectHosts : undefined
    if (allowed?.length && !hostAllowed(url.hostname.toLowerCase().replace(/\.$/, ''), allowed)) throw new Error(`${evidenceRole === 'event' ? 'Event' : 'Project'} source host is not available in the public demo.`)
  }

  private async assertPublicResolution(url: URL) {
    if (isIP(url.hostname.replace(/^\[|\]$/g, ''))) return
    let addresses: Array<{ address: string; family: number }>
    try { addresses = await (this.options.lookupImpl ?? ((hostname) => dnsLookup(hostname, { all: true })))(url.hostname) }
    catch { throw new Error('Source hostname could not be resolved.') }
    if (!Array.isArray(addresses) || addresses.length === 0) throw new Error('Source hostname did not resolve to a public address.')
    if (addresses.some(({ address }) => isPrivateAddress(address))) throw new Error('Source hostname resolved to a private or local address.')
  }
}
