import { renderToStaticMarkup } from 'react-dom/server'
import { describe, expect, it } from 'vitest'
import type { ScanJob } from '../../server/contracts'
import { LiveContext } from './LiveWorkspace'

const feedbackEntry: NonNullable<ScanJob['feedback']>[number] = {
  id: '60aa7f89-fc3a-4058-b50d-b142d591d572',
  receivedAt: '2026-08-18T09:00:00.000Z',
  feedback: 'Prioritize the shortest credible demo path.',
  adaptedRecommendation: {
    title: 'Narrow the demo',
    explanation: 'Show the feedback loop.',
    changedBecause: 'The builder has limited time.',
    sourceUrls: ['https://example.com/event'],
    confidence: 'high',
  },
  nextClarifyingQuestion: 'Which evidence view matters most?',
}

const job = (clarificationResponse?: NonNullable<ScanJob['feedback']>[number]['clarificationResponse']): ScanJob => ({
  id: '92e12351-c171-4a22-a390-d8a20002ef01',
  request: { hackathonUrl: 'https://example.com/event', builderContext: 'Detailed builder context for this scan.', projectUrls: [] },
  status: 'completed',
  createdAt: '2026-08-18T08:00:00.000Z',
  updatedAt: '2026-08-18T09:00:00.000Z',
  events: [],
  sources: [{ url: 'https://example.com/event', evidenceRole: 'event', title: 'Event', collectedAt: '2026-08-18T08:01:00.000Z', contentType: 'text/html', byteLength: 20, excerpt: 'Event evidence' }],
  feedback: [{ ...feedbackEntry, clarificationResponse }],
})

describe('LiveContext', () => {
  it('renders an enabled Enter-submittable clarification form after feedback', () => {
    const markup = renderToStaticMarkup(<LiveContext job={job()} error="" applyFeedback={async () => undefined} recordClarification={async () => undefined} />)
    expect(markup).toContain('<form>')
    expect(markup).toContain('placeholder="Type an answer and press Enter"')
    expect(markup).toContain('Record clarification')
    expect(markup).toContain('does not trigger another Gemini call')
  })

  it('replaces the form with the persisted clarification response', () => {
    const markup = renderToStaticMarkup(<LiveContext job={job({ answer: 'The Activity view matters most.', receivedAt: '2026-08-18T09:01:00.000Z' })} error="" applyFeedback={async () => undefined} recordClarification={async () => undefined} />)
    expect(markup).not.toContain('<form>')
    expect(markup).toContain('Your clarification was recorded')
    expect(markup).toContain('The Activity view matters most.')
    expect(markup).toContain('without another Gemini call')
  })
})
