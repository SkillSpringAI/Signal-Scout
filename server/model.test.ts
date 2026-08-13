import { describe, expect, it } from 'vitest'
import { buildAnalysisPrompt, validateAnalysisSemantics, verifiedStackManifest } from './model.js'
import type { FieldAnalysis, SourceRecord } from './contracts.js'

const source: SourceRecord = { url: 'https://example.com/event', title: 'Event', collectedAt: '2026-08-13T00:00:00.000Z', contentType: 'text/html', byteLength: 100, excerpt: 'Official requirements.' }
const analysis: FieldAnalysis = { eventName: 'Event', summary: 'Summary', requirements: [], judgingCriteria: [], strategicGaps: [{ title: 'Feedback continuity', rationale: 'Persist explicit feedback between guided steps.', sourceUrls: [source.url], confidence: 'medium' }], learningShortlist: ['Learn the existing Google GenAI SDK boundary.'], buildPlan: ['Deploy the verified service to Cloud Run.'], uncertainties: ['The evaluation method is not specified.'] }

describe('Gemini analysis constraints', () => {
  it('treats the verified stack as a constraint while allowing justified incompatibility findings', () => {
    const prompt = buildAnalysisPrompt({ hackathonUrl: source.url, builderContext: 'Detailed builder context for this analysis.', projectUrls: [] }, [source])
    expect(prompt).toContain(verifiedStackManifest.agentFramework)
    expect(prompt).toContain('A replacement may only be proposed')
    expect(prompt).toContain('legitimate technical risks or limitations')
    expect(validateAnalysisSemantics({ ...analysis, buildPlan: ['Google ADK may replace the framework only if an unmet requirement is identified: the current SDK cannot satisfy required lifecycle routing.'] }, [source])).toBeTruthy()
  })

  it('rejects model serialization residue', () => {
    expect(() => validateAnalysisSemantics({ ...analysis, uncertainties: ['System cut off; here is the final parsed JSON.```'] }, [source])).toThrow('serialization or schema commentary')
  })

  it('rejects uncollected citations', () => {
    const contaminated = { ...analysis, strategicGaps: [{ ...analysis.strategicGaps[0], sourceUrls: ['https://uncollected.example/'] }] }
    expect(() => validateAnalysisSemantics(contaminated, [source])).toThrow('uncollected source URL')
  })

  it('rejects plausible replacement recommendations without a concrete incompatibility', () => {
    expect(() => validateAnalysisSemantics({ ...analysis, buildPlan: ['Switch to Vertex AI for the production deployment.'] }, [source])).toThrow('without a concrete incompatibility')
  })

  it('rejects prompt injection as personalization terminology but allows defensive usage', () => {
    expect(() => validateAnalysisSemantics({ ...analysis, learningShortlist: ['Learn dynamic prompt injection techniques for user personalization.'] }, [source])).toThrow('non-security implementation terminology')
    expect(validateAnalysisSemantics({ ...analysis, learningShortlist: ['Learn prompt injection mitigation for untrusted retrieved pages.'] }, [source])).toBeTruthy()
  })
})
