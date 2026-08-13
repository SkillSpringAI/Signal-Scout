import { randomUUID } from 'node:crypto'
import type { AnalysisModel } from './model.js'
import type { Retriever } from './retrieval.js'
import type { ScanEvent, ScanJob, ScanRequest, ScanStatus } from './contracts.js'
import type { ScanStore } from './store.js'

const now = () => new Date().toISOString()

export class ScanRunner {
  constructor(private readonly store: ScanStore, private readonly retriever: Retriever, private readonly model: AnalysisModel) {}

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
      await this.transition(job, 'retrieving', 'Retrieving allowlisted public inputs.')
      const urls = [job.request.hackathonUrl, ...job.request.projectUrls]
      for (const url of urls) {
        try {
          const source = await this.retriever.retrieve(url)
          if (await this.isCancelled(job)) return
          job.sources.push(source)
          await this.save(job, 'retrieving', `Collected source: ${url}`)
        }
        catch (error) { if (await this.isCancelled(job)) return; await this.save(job, 'retrieving', `Source failed: ${url} — ${message(error)}`, 'warning') }
      }
      if (await this.isCancelled(job)) return
      if (job.sources.length === 0) return this.fail(job, 'RETRIEVAL_FAILED', 'No public source could be retrieved.')
      await this.transition(job, 'extracting', 'Running Gemini structured analysis through Google GenAI SDK.')
      try { job.analysis = await this.model.analyze(job.request, job.sources) }
      catch (error) { return this.fail(job, 'MODEL_FAILED', message(error), job.sources.length > 0 ? 'partial' : 'failed') }
      await this.transition(job, 'validating', 'Validated structured output against the server schema.')
      await this.transition(job, 'synthesizing', 'Connecting the analysis to preserved source provenance.')
      const status: ScanStatus = job.sources.length < urls.length ? 'partial' : 'completed'
      await this.transition(job, status, status === 'completed' ? 'Scan completed with all requested sources.' : 'Scan completed with partial source coverage.', status === 'partial' ? 'warning' : 'activity')
    } catch (error) { await this.fail(job, 'UNEXPECTED_FAILURE', message(error)) }
  }

  async cancel(id: string) {
    const job = await this.store.get(id)
    if (!job || ['completed', 'partial', 'failed', 'cancelled'].includes(job.status)) return job
    await this.transition(job, 'cancelled', 'Scan cancelled by user request.', 'warning')
    return job
  }

  private async transition(job: ScanJob, status: ScanStatus, messageText: string, kind: ScanEvent['kind'] = 'activity') { job.status = status; await this.save(job, status, messageText, kind) }
  private async save(job: ScanJob, stage: ScanStatus, messageText: string, kind: ScanEvent['kind'] = 'activity') { const at = now(); job.updatedAt = at; job.events.push({ id: randomUUID(), at, stage, message: messageText, kind }); await this.store.save(job) }
  private async fail(job: ScanJob, code: string, errorMessage: string, status: 'failed' | 'partial' = 'failed') { job.error = { code, message: errorMessage }; await this.transition(job, status, errorMessage, 'error') }
  private async isCancelled(job: ScanJob) { const latest = await this.store.get(job.id); if (latest?.status !== 'cancelled') return false; Object.assign(job, latest); return true }
}

const message = (error: unknown) => error instanceof Error ? error.message : 'Unknown failure.'
