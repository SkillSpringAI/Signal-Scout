import { randomUUID } from 'node:crypto'
import type { AnalysisModel, FeedbackModel } from './model.js'
import type { Retriever } from './retrieval.js'
import { collaborationResponseSchema, type FeedbackRequest, type ScanEvent, type ScanJob, type ScanRequest, type ScanStatus } from './contracts.js'
import { ScanStoreConflictError, type ScanStore } from './store.js'

const now = () => new Date().toISOString()
const nextTimestamp = (previous: string) => {
  const current = Date.now()
  const prior = Date.parse(previous)
  return new Date(Number.isFinite(prior) && current <= prior ? prior + 1 : current).toISOString()
}

export class ScanRunner {
  private readonly options: { modelMaxAttempts: number; modelRetryBaseMs: number; sleep: (milliseconds: number) => Promise<void> }

  constructor(private readonly store: ScanStore, private readonly retriever: Retriever, private readonly model: AnalysisModel & Partial<FeedbackModel>, options: Partial<{ modelMaxAttempts: number; modelRetryBaseMs: number; sleep: (milliseconds: number) => Promise<void> }> = {}) {
    this.options = { modelMaxAttempts: options.modelMaxAttempts ?? 2, modelRetryBaseMs: options.modelRetryBaseMs ?? 500, sleep: options.sleep ?? ((milliseconds) => new Promise((resolve) => setTimeout(resolve, milliseconds))) }
  }

  async create(request: ScanRequest) {
    const createdAt = now()
    const job: ScanJob = { id: randomUUID(), request, status: 'queued', createdAt, updatedAt: createdAt, events: [], sources: [] }
    await this.store.create(job)
    return job
  }

  async run(id: string) {
    const job = await this.store.get(id)
    if (!job) return
    try {
      await this.transition(job, 'retrieving', 'Checking the public sources you provided.')
      const inputs = [{ url: job.request.hackathonUrl, evidenceRole: 'event' as const }, ...job.request.projectUrls.map((url) => ({ url, evidenceRole: 'project' as const }))]
      for (const { url, evidenceRole } of inputs) {
        try {
          const source = await this.retriever.retrieve(url)
          if (await this.isCancelled(job)) return
          job.sources.push({ ...source, evidenceRole })
          await this.save(job, 'retrieving', `Collected source: ${url}`)
        }
        catch (error) { if (await this.isCancelled(job)) return; await this.save(job, 'retrieving', `Could not collect source: ${url} — ${message(error)}`, 'warning') }
      }
      if (await this.isCancelled(job)) return
      if (job.sources.length === 0) return this.fail(job, 'RETRIEVAL_FAILED', 'No public source could be retrieved.')
      await this.transition(job, 'extracting', 'Analyzing event requirements and available project evidence.')
      try {
        const analysis = await this.analyzeWithRetry(job)
        if (!analysis) return
        job.analysis = analysis
      }
      catch (error) {
        if (await this.isCancelled(job)) return
        await this.fail(job, 'MODEL_FAILED', message(error), job.sources.length > 0 ? 'partial' : 'failed')
        return
      }
      if (await this.isCancelled(job)) return
      await this.transition(job, 'validating', 'Checked required fields, evidence links, and supported findings.')
      await this.transition(job, 'synthesizing', 'Linking each finding to the source that supports it.')
      const status: ScanStatus = job.sources.length < inputs.length ? 'partial' : 'completed'
      await this.transition(job, status, status === 'completed' ? 'Scan completed with all requested sources.' : 'Scan completed with partial source coverage.', status === 'partial' ? 'warning' : 'activity')
    } catch (error) {
      if (error instanceof ScanStoreConflictError) return
      await this.fail(job, 'UNEXPECTED_FAILURE', message(error))
    }
  }

  async cancel(id: string) {
    const job = await this.store.get(id)
    if (!job || ['completed', 'partial', 'failed', 'cancelled'].includes(job.status)) return job
    await this.transition(job, 'cancelled', 'Scan cancelled by user request.', 'warning')
    return job
  }

  async requestAnalysisRetry(id: string) {
    const job = await this.store.get(id)
    if (!job) return undefined
    if (job.status !== 'partial' || job.error?.code !== 'MODEL_FAILED' || job.sources.length === 0) throw new Error('Only a withheld analysis with preserved sources can be retried.')
    if (job.events.some((event) => event.message === 'Retrying analysis once with the preserved sources.')) throw new Error('This scan has already used its one analysis retry.')
    job.analysis = undefined
    job.error = undefined
    await this.transition(job, 'extracting', 'Retrying analysis once with the preserved sources.')
    return job
  }

  async runAnalysisRetry(id: string) {
    const job = await this.store.get(id)
    if (!job || job.status !== 'extracting' || !job.events.some((event) => event.message === 'Retrying analysis once with the preserved sources.')) return
    try {
      const analysis = await this.analyzeWithRetry(job)
      if (!analysis || await this.isCancelled(job)) return
      job.analysis = analysis
      await this.transition(job, 'validating', 'Checked required fields, evidence links, and supported findings.')
      await this.transition(job, 'synthesizing', 'Linking each finding to the source that supports it.')
      const requestedSourceCount = 1 + job.request.projectUrls.length
      const status: ScanStatus = job.sources.length < requestedSourceCount ? 'partial' : 'completed'
      await this.transition(job, status, status === 'completed' ? 'Analysis retry completed with the preserved sources.' : 'Analysis retry completed with partial source coverage.', status === 'partial' ? 'warning' : 'activity')
    } catch (error) {
      if (await this.isCancelled(job)) return
      await this.fail(job, 'MODEL_FAILED', message(error), 'partial')
    }
  }

  async applyFeedback(id: string, request: FeedbackRequest) {
    const job = await this.store.get(id)
    if (!job) return undefined
    if (!job.analysis || !['completed', 'partial'].includes(job.status)) throw new Error('Feedback requires a completed or partial scan with validated analysis.')
    if (job.feedback?.length) throw new Error('This scan has already used its one bounded feedback turn.')
    if (!this.model.adapt) throw new Error('Feedback adaptation is not configured.')
    const adapted = collaborationResponseSchema.parse(await this.model.adapt(job, request))
    const expectedUpdatedAt = job.updatedAt
    const receivedAt = nextTimestamp(expectedUpdatedAt)
    job.updatedAt = receivedAt
    job.feedback = [...(job.feedback ?? []), { id: randomUUID(), receivedAt, feedback: request.feedback, ...adapted }]
    job.events.push({ id: randomUUID(), at: receivedAt, stage: 'synthesizing', kind: 'activity', message: 'Applied explicit user feedback to one sourced recommendation and prepared one targeted clarification.' })
    await this.store.save(job, expectedUpdatedAt)
    return job
  }

  private async transition(job: ScanJob, status: ScanStatus, messageText: string, kind: ScanEvent['kind'] = 'activity') { job.status = status; await this.save(job, status, messageText, kind) }
  private async save(job: ScanJob, stage: ScanStatus, messageText: string, kind: ScanEvent['kind'] = 'activity') { const expectedUpdatedAt = job.updatedAt; const at = nextTimestamp(expectedUpdatedAt); job.updatedAt = at; job.events.push({ id: randomUUID(), at, stage, message: messageText, kind }); await this.store.save(job, expectedUpdatedAt) }
  private async fail(job: ScanJob, code: string, errorMessage: string, status: 'failed' | 'partial' = 'failed') { job.error = { code, message: errorMessage }; await this.transition(job, status, errorMessage, 'error') }
  private async isCancelled(job: ScanJob) { const latest = await this.store.get(job.id); if (latest?.status !== 'cancelled') return false; Object.assign(job, latest); return true }
  private async analyzeWithRetry(job: ScanJob) {
    for (let attempt = 1; attempt <= this.options.modelMaxAttempts; attempt += 1) {
      try { return await this.model.analyze(job.request, job.sources) }
      catch (error) {
        if (!isTransientModelError(error) || attempt === this.options.modelMaxAttempts) throw error
        await this.save(job, 'extracting', `Transient model failure; retrying attempt ${attempt + 1} of ${this.options.modelMaxAttempts}.`, 'warning')
        await this.options.sleep(this.options.modelRetryBaseMs * attempt)
        if (await this.isCancelled(job)) return undefined
      }
    }
    return undefined
  }
}

const message = (error: unknown) => error instanceof Error ? error.message : 'Unknown failure.'
export const isTransientModelError = (error: unknown) => {
  const candidate = error as { code?: unknown; status?: unknown; message?: unknown }
  const searchable = `${candidate?.code ?? ''} ${candidate?.status ?? ''} ${candidate?.message ?? ''}`
  return /(^|\D)(429|500|502|503|504)(\D|$)|RESOURCE_EXHAUSTED|UNAVAILABLE|DEADLINE_EXCEEDED/i.test(searchable)
}
