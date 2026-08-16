import { describe, expect, it } from 'vitest'
import { buildAnalysisPrompt, buildFeedbackPrompt, deriveProjectConstraints, signalScoutRuntimeManifest, validateAnalysisSemantics, validateCollaborationSemantics } from './model.js'
import type { CollaborationResponse, FieldAnalysis, ScanJob, ScanRequest, SourceRecord } from './contracts.js'

const source: SourceRecord = { url: 'https://example.com/event', evidenceRole: 'event', title: 'Event', collectedAt: '2026-08-13T00:00:00.000Z', contentType: 'text/html', byteLength: 100, excerpt: 'Official requirements.' }
const projectSource: SourceRecord = { url: 'https://example.com/project', evidenceRole: 'project', title: 'Project', collectedAt: '2026-08-13T00:00:01.000Z', contentType: 'text/html', byteLength: 200, excerpt: 'This project uses the Google GenAI SDK and Cloud Run.' }
const neutralRequest: ScanRequest = { hackathonUrl: source.url, builderContext: 'I need a credible project plan for this event.', projectUrls: [] }
const constrainedRequest: ScanRequest = { hackathonUrl: source.url, builderContext: 'The current project uses the Google GenAI SDK and Cloud Run.', projectUrls: [projectSource.url] }
const analysis: FieldAnalysis = { eventName: 'Event', summary: 'Summary', requirements: [], judgingCriteria: [], strategicGaps: [{ title: 'Feedback continuity', rationale: 'Persist explicit feedback between guided steps.', sourceUrls: [source.url], confidence: 'medium' }], learningShortlist: ['Learn the existing Google GenAI SDK boundary.'], buildPlan: ['Deploy the verified service to Cloud Run.'], uncertainties: ['The evaluation method is not specified.'] }
const neutralAnalysis: FieldAnalysis = { ...analysis, learningShortlist: ['Learn the event integration boundary.'], buildPlan: ['Build the smallest verified workflow.'] }
const collaboration: CollaborationResponse = { adaptedRecommendation: { title: 'Narrow the build', explanation: 'Keep the current plan focused.', changedBecause: 'The builder requested a smaller scope.', sourceUrls: [source.url], confidence: 'high' }, nextClarifyingQuestion: 'Which outcome matters most?' }

describe('Gemini analysis constraints', () => {
  it('does not import Signal Scout runtime choices into a neutral project prompt', () => {
    const prompt = buildAnalysisPrompt(neutralRequest, [source])
    expect(prompt).toContain('None established')
    for (const technology of Object.values(signalScoutRuntimeManifest)) expect(prompt).not.toContain(technology)
    expect(deriveProjectConstraints(neutralRequest, [source])).toEqual([])
  })

  it('treats explicitly evidenced project choices as constraints while allowing justified incompatibility findings', () => {
    const prompt = buildAnalysisPrompt(constrainedRequest, [source, projectSource])
    expect(prompt).toContain(signalScoutRuntimeManifest.agentFramework)
    expect(prompt).toContain('A replacement may only be proposed')
    expect(prompt).toContain('legitimate technical risks or limitations')
    expect(validateAnalysisSemantics({ ...analysis, buildPlan: ['Google ADK may replace the framework only if an unmet requirement is identified: the current SDK cannot satisfy required lifecycle routing.'] }, constrainedRequest, [source, projectSource])).toBeTruthy()
  })

  it('rejects model serialization residue', () => {
    expect(() => validateAnalysisSemantics({ ...analysis, uncertainties: ['System cut off; here is the final parsed JSON.```'] }, neutralRequest, [source])).toThrow('serialization or schema commentary')
  })

  it('rejects uncollected citations', () => {
    const contaminated = { ...analysis, strategicGaps: [{ ...analysis.strategicGaps[0], sourceUrls: ['https://uncollected.example/'] }] }
    expect(() => validateAnalysisSemantics(contaminated, neutralRequest, [source])).toThrow('uncollected source URL')
  })

  it('rejects plausible replacement recommendations without a concrete incompatibility', () => {
    expect(() => validateAnalysisSemantics({ ...analysis, buildPlan: ['Switch to Vertex AI for the production deployment.'] }, constrainedRequest, [source, projectSource])).toThrow('without a concrete incompatibility')
    expect(validateAnalysisSemantics({ ...analysis, buildPlan: ['Evaluate Vertex AI for this unconstrained project.'] }, neutralRequest, [source])).toBeTruthy()
  })

  it('rejects prompt injection as personalization terminology but allows defensive usage', () => {
    expect(() => validateAnalysisSemantics({ ...analysis, learningShortlist: ['Learn dynamic prompt injection techniques for user personalization.'] }, neutralRequest, [source])).toThrow('non-security implementation terminology')
    expect(validateAnalysisSemantics({ ...analysis, learningShortlist: ['Learn prompt injection mitigation for untrusted retrieved pages.'] }, neutralRequest, [source])).toBeTruthy()
  })

  it('requires project evidence for current-state claims and both roles for combined gap claims', () => {
    const projectGap = { title: 'Missing mandatory architecture diagram', rationale: 'The rules require a diagram, and the project currently lacks one.', sourceUrls: [source.url], confidence: 'high' as const }
    expect(() => validateAnalysisSemantics({ ...analysis, strategicGaps: [projectGap] }, constrainedRequest, [source, projectSource])).toThrow('without citing collected project evidence')
    expect(validateAnalysisSemantics({ ...analysis, strategicGaps: [{ ...projectGap, sourceUrls: [source.url, projectSource.url] }] }, constrainedRequest, [source, projectSource])).toBeTruthy()
    expect(() => validateAnalysisSemantics({ ...analysis, strategicGaps: [{ ...projectGap, sourceUrls: [projectSource.url] }] }, constrainedRequest, [source, projectSource])).toThrow('without citing both event and project evidence')
  })

  it('rejects deployment work when public Cloud Run deployment is explicitly complete', () => {
    const deployedRequest = { ...constrainedRequest, builderContext: `${constrainedRequest.builderContext} The current implementation is publicly deployed on Cloud Run and verified.` }
    expect(() => validateAnalysisSemantics({ ...analysis, buildPlan: ['Deploy the current correction slice to Cloud Run.'] }, deployedRequest, [source, projectSource])).toThrow('marks it complete')
    expect(validateAnalysisSemantics({ ...analysis, buildPlan: ['Capture the verified Cloud Run revision and logs in the demo video.'] }, deployedRequest, [source, projectSource])).toBeTruthy()
  })

  it('rejects unsupported absence claims observed in a neutral live scan', () => {
    const unsupported = { title: 'Runtime setup', rationale: 'No baseline code or project exists, so an integration must be built from scratch. No repository integration exists at this stage.', sourceUrls: [source.url], confidence: 'high' as const }
    expect(() => validateAnalysisSemantics({ ...neutralAnalysis, strategicGaps: [unsupported] }, neutralRequest, [source])).toThrow('without citing collected project evidence')
  })

  it('preserves evidence roles when retrieval redirects change source URLs', () => {
    const redirectedProject = { ...projectSource, url: 'https://www.example.com/project/' }
    const prompt = buildAnalysisPrompt(constrainedRequest, [source, redirectedProject])
    expect(prompt).toContain('SOURCE 2 (PROJECT EVIDENCE)')
    expect(deriveProjectConstraints(constrainedRequest, [source, redirectedProject])).toContain(signalScoutRuntimeManifest.agentFramework)
  })

  it('keeps feedback prompts and validation scoped to project constraints', () => {
    const job = { id: '92e12351-c171-4a22-a390-d8a20002ef01', request: neutralRequest, status: 'completed', createdAt: source.collectedAt, updatedAt: source.collectedAt, events: [], sources: [source], analysis: neutralAnalysis } satisfies ScanJob
    const prompt = buildFeedbackPrompt(job, { feedback: 'Please narrow this recommendation.' })
    for (const technology of Object.values(signalScoutRuntimeManifest)) expect(prompt).not.toContain(technology)
    expect(validateCollaborationSemantics({ ...collaboration, adaptedRecommendation: { ...collaboration.adaptedRecommendation, explanation: 'Consider Google ADK for this unconstrained project.' } }, neutralRequest, [source])).toBeTruthy()
    expect(() => validateCollaborationSemantics({ ...collaboration, adaptedRecommendation: { ...collaboration.adaptedRecommendation, explanation: 'Switch to Google ADK.' } }, constrainedRequest, [source, projectSource])).toThrow('without a concrete incompatibility')
  })
})
