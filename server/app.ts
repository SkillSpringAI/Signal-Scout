import express from 'express'
import { existsSync } from 'node:fs'
import path from 'node:path'
import { scanRequestSchema } from './contracts.js'
import type { ScanRunner } from './runner.js'
import type { ScanStore } from './store.js'

export function createServerApp(deps: { runner: ScanRunner; store: ScanStore; staticDir?: string }) {
  const app = express()
  app.disable('x-powered-by')
  app.use(express.json({ limit: '32kb' }))
  app.get('/api/health', (_request, response) => response.json({ ok: true, service: 'signal-scout-api' }))
  app.post('/api/scans', async (request, response) => {
    const parsed = scanRequestSchema.safeParse(request.body)
    if (!parsed.success) return response.status(400).json({ error: 'INVALID_REQUEST', issues: parsed.error.issues })
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
  if (deps.staticDir && existsSync(deps.staticDir)) {
    app.use(express.static(deps.staticDir))
    app.get('*splat', (_request, response) => response.sendFile(path.join(deps.staticDir as string, 'index.html')))
  }
  return app
}
