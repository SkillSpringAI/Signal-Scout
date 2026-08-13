import { describe, expect, it } from 'vitest'
import type { AnalysisModel } from './model.js'
import type { Retriever } from './retrieval.js'
import { ScanRunner } from './runner.js'
import { InMemoryScanStore } from './store.js'
import type { FieldAnalysis, SourceRecord } from './contracts.js'

const request = { hackathonUrl: 'https://example.com/event', builderContext: 'I want to build a trustworthy research workflow.', projectUrls: [] }
const source: SourceRecord = { url: request.hackathonUrl, title: 'Event', collectedAt: '2026-08-13T00:00:00.000Z', contentType: 'text/html', byteLength: 20, excerpt: 'Official event requirements' }
const analysis: FieldAnalysis = { eventName: 'Event', summary: 'Summary', requirements: ['Requirement'], judgingCriteria: ['Criterion'], strategicGaps: [{ title: 'Gap', rationale: 'Reason', sourceUrls: [request.hackathonUrl], confidence: 'medium' }], learningShortlist: ['Learn'], buildPlan: ['Build'], uncertainties: [] }

describe('ScanRunner', () => {
  it('completes a sourced structured analysis', async () => {
    const store = new InMemoryScanStore()
    const retriever: Retriever = { retrieve: async () => source }
    const model: AnalysisModel = { analyze: async () => analysis }
    const runner = new ScanRunner(store, retriever, model)
    const job = await runner.create(request)
    await runner.run(job.id)
    const result = await store.get(job.id)
    expect(result?.status).toBe('completed')
    expect(result?.analysis).toEqual(analysis)
    expect(result?.events.map((event) => event.stage)).toEqual(expect.arrayContaining(['retrieving', 'extracting', 'validating', 'synthesizing', 'completed']))
  })

  it('preserves retrieved sources when the model fails', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => { throw new Error('Malformed output') } })
    const job = await runner.create(request)
    await runner.run(job.id)
    const result = await store.get(job.id)
    expect(result?.status).toBe('partial')
    expect(result?.sources).toHaveLength(1)
    expect(result?.error).toEqual({ code: 'MODEL_FAILED', message: 'Malformed output' })
  })

  it('fails explicitly when no source can be retrieved', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => { throw new Error('timeout') } }, { analyze: async () => analysis })
    const job = await runner.create(request)
    await runner.run(job.id)
    const result = await store.get(job.id)
    expect(result?.status).toBe('failed')
    expect(result?.error?.code).toBe('RETRIEVAL_FAILED')
  })

  it('records cancellation before model execution', async () => {
    const store = new InMemoryScanStore()
    let releaseRetrieval: (() => void) | undefined
    const retrievalGate = new Promise<void>((resolve) => { releaseRetrieval = resolve })
    let modelCalled = false
    const runner = new ScanRunner(store, { retrieve: async () => { await retrievalGate; return source } }, { analyze: async () => { modelCalled = true; return analysis } })
    const job = await runner.create(request)
    const running = runner.run(job.id)
    await new Promise((resolve) => setTimeout(resolve, 0))
    await runner.cancel(job.id)
    releaseRetrieval?.()
    await running
    expect((await store.get(job.id))?.status).toBe('cancelled')
    expect(modelCalled).toBe(false)
  })
})
