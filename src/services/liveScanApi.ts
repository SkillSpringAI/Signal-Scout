import type { ScanJob, ScanRequest } from '../../server/contracts'

const terminalStatuses = new Set(['completed', 'partial', 'failed', 'cancelled', 'needs_input'])

export class LiveScanApiError extends Error {
  constructor(message: string, readonly status?: number, readonly code?: string) { super(message); this.name = 'LiveScanApiError' }
}

export class LiveScanApi {
  constructor(private readonly options: { baseUrl?: string; fetchImpl?: typeof fetch; pollIntervalMs?: number; maxPolls?: number } = {}) {}

  async health() { return this.request<{ ok: boolean; service: string }>('/api/health') }
  async createScan(input: ScanRequest) { return this.request<ScanJob>('/api/scans', { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify(input) }) }
  async getScan(id: string) { return this.request<ScanJob>(`/api/scans/${encodeURIComponent(id)}`) }
  async cancelScan(id: string) { return this.request<ScanJob>(`/api/scans/${encodeURIComponent(id)}/cancel`, { method: 'POST' }) }
  async retryAnalysis(id: string) { return this.request<ScanJob>(`/api/scans/${encodeURIComponent(id)}/retry-analysis`, { method: 'POST' }) }
  async submitFeedback(id: string, feedback: string) { return this.request<ScanJob>(`/api/scans/${encodeURIComponent(id)}/feedback`, { method: 'POST', headers: { 'content-type': 'application/json' }, body: JSON.stringify({ feedback }) }) }

  async waitForTerminal(id: string, onUpdate: (job: ScanJob) => void, signal?: AbortSignal) {
    const maxPolls = this.options.maxPolls ?? 180
    for (let poll = 0; poll < maxPolls; poll += 1) {
      if (signal?.aborted) throw new DOMException('Live scan polling cancelled.', 'AbortError')
      const job = await this.getScan(id)
      onUpdate(job)
      if (terminalStatuses.has(job.status)) return job
      await delay(this.options.pollIntervalMs ?? 1_000, signal)
    }
    throw new LiveScanApiError('Live scan polling reached its configured limit.')
  }

  private async request<T>(path: string, init?: RequestInit): Promise<T> {
    const fetchImpl = this.options.fetchImpl ?? fetch
    let response: Response
    try { response = await fetchImpl(`${this.options.baseUrl ?? ''}${path}`, init) }
    catch { throw new LiveScanApiError('The live Signal Scout API is unavailable.') }
    if (!response.ok) {
      const body = await response.json().catch(() => undefined) as { error?: string; message?: string } | undefined
      throw new LiveScanApiError(body?.message ?? body?.error ?? `Live API returned HTTP ${response.status}.`, response.status, body?.error)
    }
    return response.json() as Promise<T>
  }
}

const delay = (milliseconds: number, signal?: AbortSignal) => new Promise<void>((resolve, reject) => {
  const timeout = setTimeout(resolve, milliseconds)
  signal?.addEventListener('abort', () => { clearTimeout(timeout); reject(new DOMException('Live scan polling cancelled.', 'AbortError')) }, { once: true })
})
