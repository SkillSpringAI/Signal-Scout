import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { clarificationRequestSchema, feedbackRequestSchema, scanRequestSchema } from './contracts.js'
import type { ScanRunner } from './runner.js'
import type { ScanStore } from './store.js'
import { DemoCapacityError, noUsageGuard, type CostlyAction, type UsageGuard } from './usageGuard.js'

export function createServerApp(deps: { runner: ScanRunner; store: ScanStore; usageGuard?: UsageGuard; staticDir?: string }) {
  const app = express()
  app.disable('x-powered-by')
  app.set('trust proxy', 1)
  app.use(express.json({ limit: '32kb' }))
  const usageGuard = deps.usageGuard ?? noUsageGuard
  const consume = async (request: express.Request, response: express.Response, action: CostlyAction) => {
    try { await usageGuard.consume(request.ip || 'unknown', action); return true }
    catch (error) {
      if (!(error instanceof DemoCapacityError)) throw error
      response.set('Retry-After', String(error.retryAfterSeconds)).status(429).json({ error: 'DEMO_CAPACITY_REACHED', message: error.message })
      return false
    }
  }
  app.get('/api/health', (_request, response) => response.json({ ok: true, service: 'signal-scout-api' }))
  app.post('/api/scans', async (request, response) => {
    const parsed = scanRequestSchema.safeParse(request.body)
    if (!parsed.success) return response.status(400).json({ error: 'INVALID_REQUEST', issues: parsed.error.issues })
    if (!await consume(request, response, 'scan')) return
    const job = await deps.runner.create(parsed.data)
    setImmediate(() => { void deps.runner.run(job.id) })
    return response.status(202).location(`/api/scans/${job.id}`).json(job)
  })
  app.get('/api/scans/:id', async (request, response) => {
    const job = await deps.store.get(request.params.id)
    return job ? response.json(job) : response.status(404).json({ error: 'NOT_FOUND' })
  })
  app.post('/api/scans/:id/cancel', async (request, response) => {
    const job = await deps.runner.cancel(request.params.id)
    return job ? response.json(job) : response.status(404).json({ error: 'NOT_FOUND' })
  })
  app.post('/api/scans/:id/retry-analysis', async (request, response) => {
    try {
      if (!await consume(request, response, 'analysis_retry')) return
      const job = await deps.runner.requestAnalysisRetry(request.params.id)
      if (!job) return response.status(404).json({ error: 'NOT_FOUND' })
      setImmediate(() => { void deps.runner.runAnalysisRetry(job.id) })
      return response.status(202).json(job)
    } catch (error) { return response.status(409).json({ error: 'RETRY_NOT_APPLICABLE', message: error instanceof Error ? error.message : 'Analysis could not be retried.' }) }
  })
  app.post('/api/scans/:id/feedback', async (request, response) => {
    const parsed = feedbackRequestSchema.safeParse(request.body)
    if (!parsed.success) return response.status(400).json({ error: 'INVALID_FEEDBACK', issues: parsed.error.issues })
    try {
      if (!await consume(request, response, 'feedback')) return
      const job = await deps.runner.applyFeedback(request.params.id, parsed.data)
      return job ? response.json(job) : response.status(404).json({ error: 'NOT_FOUND' })
    } catch (error) { return response.status(409).json({ error: 'FEEDBACK_NOT_APPLICABLE', message: error instanceof Error ? error.message : 'Feedback could not be applied.' }) }
  })
  app.post('/api/scans/:id/clarification', async (request, response) => {
    const parsed = clarificationRequestSchema.safeParse(request.body)
    if (!parsed.success) return response.status(400).json({ error: 'INVALID_CLARIFICATION', issues: parsed.error.issues })
    try {
      const job = await deps.runner.recordClarification(request.params.id, parsed.data)
      return job ? response.json(job) : response.status(404).json({ error: 'NOT_FOUND' })
    } catch (error) { return response.status(409).json({ error: 'CLARIFICATION_NOT_APPLICABLE', message: error instanceof Error ? error.message : 'Clarification could not be recorded.' }) }
  })
  if (deps.staticDir && existsSync(deps.staticDir)) {
    app.use(express.static(deps.staticDir))
    app.get('*splat', (_request, response) => response.sendFile(path.join(deps.staticDir as string, 'index.html')))
  }
  return app
}
