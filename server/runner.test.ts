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
    expect(result?.events.map((event) => event.message)).toEqual(expect.arrayContaining([
      'Checking the public sources you provided.',
      'Analyzing event requirements and available project evidence.',
      'Checked required fields, evidence links, and supported findings.',
      'Linking each finding to the source that supports it.',
    ]))
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

  it('does not overwrite cancellation that arrives during model execution', async () => {
    const store = new InMemoryScanStore()
    let releaseModel: (() => void) | undefined
    const modelGate = new Promise<void>((resolve) => { releaseModel = resolve })
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => { await modelGate; return analysis } })
    const job = await runner.create(request)
    const running = runner.run(job.id)
    for (let attempt = 0; attempt < 20; attempt += 1) {
      if ((await store.get(job.id))?.status === 'extracting') break
      await new Promise((resolve) => setTimeout(resolve, 0))
    }
    await runner.cancel(job.id)
    releaseModel?.()
    await running
    expect((await store.get(job.id))?.status).toBe('cancelled')
  })

  it('retries one transient model failure and records it in Activity', async () => {
    const store = new InMemoryScanStore()
    let attempts = 0
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => { attempts += 1; if (attempts === 1) throw Object.assign(new Error('Service unavailable'), { code: 503 }); return analysis } }, { sleep: async () => undefined })
    const job = await runner.create(request)
    await runner.run(job.id)
    const result = await store.get(job.id)
    expect(attempts).toBe(2)
    expect(result?.status).toBe('completed')
    expect(result?.events.some((event) => event.kind === 'warning' && event.message.includes('retrying attempt 2'))).toBe(true)
  })

  it('does not retry malformed model output', async () => {
    const store = new InMemoryScanStore()
    let attempts = 0
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => { attempts += 1; throw new Error('Schema validation failed') } }, { sleep: async () => undefined })
    const job = await runner.create(request)
    await runner.run(job.id)
    expect(attempts).toBe(1)
    expect((await store.get(job.id))?.status).toBe('partial')
  })

  it('allows one deliberate analysis retry with preserved sources', async () => {
    const store = new InMemoryScanStore()
    let retrievals = 0
    let analyses = 0
    const runner = new ScanRunner(store, { retrieve: async () => { retrievals += 1; return source } }, { analyze: async () => { analyses += 1; if (analyses === 1) throw new Error('Unsupported claim'); return analysis } })
    const job = await runner.create(request)
    await runner.run(job.id)
    const requested = await runner.requestAnalysisRetry(job.id)
    expect(requested?.status).toBe('extracting')
    await runner.runAnalysisRetry(job.id)
    const result = await store.get(job.id)
    expect(result?.status).toBe('completed')
    expect(result?.analysis).toEqual(analysis)
    expect(result?.error).toBeUndefined()
    expect(retrievals).toBe(1)
    expect(analyses).toBe(2)
    await expect(runner.requestAnalysisRetry(job.id)).rejects.toThrow('Only a withheld analysis')
  })

  it('keeps the second rejected analysis partial and prevents another deliberate retry', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => { throw new Error('Unsupported claim') } })
    const job = await runner.create(request)
    await runner.run(job.id)
    await runner.requestAnalysisRetry(job.id)
    await runner.runAnalysisRetry(job.id)
    const result = await store.get(job.id)
    expect(result?.status).toBe('partial')
    expect(result?.sources).toHaveLength(1)
    expect(result?.error?.code).toBe('MODEL_FAILED')
    await expect(runner.requestAnalysisRetry(job.id)).rejects.toThrow('already used its one analysis retry')
  })

  it('persists explicit feedback, one adapted recommendation, and one clarification', async () => {
    const store = new InMemoryScanStore()
    const runner = new ScanRunner(store, { retrieve: async () => source }, { analyze: async () => analysis, adapt: async (_job, feedback) => ({ adaptedRecommendation: { title: 'Narrow the build', explanation: 'Prioritize the Activity evidence path.', changedBecause: feedback.feedback, sourceUrls: [source.url], confidence: 'high' }, nextClarifyingQuestion: 'Which evidence view matters most for your demo?' }) })
    const job = await runner.create(request)
    await runner.run(job.id)
    const updated = await runner.applyFeedback(job.id, { feedback: 'I only have two hours, so prioritize the demo-critical path.' })
    await expect(runner.applyFeedback(job.id, { feedback: 'Attempt a second feedback turn for this same scan.' })).rejects.toThrow('already used its one bounded feedback turn')
    expect(updated?.feedback).toHaveLength(1)
    expect(updated?.feedback?.[0].adaptedRecommendation.title).toBe('Narrow the build')
    expect(updated?.feedback?.[0].nextClarifyingQuestion).toContain('evidence view')
    expect((await store.get(job.id))?.events.at(-1)?.message).toContain('explicit user feedback')
  })
})
