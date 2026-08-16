import { describe, expect, it } from 'vitest'
import type { ScanJob, SourceRecord } from '../../server/contracts'
import { evidenceLinkLabel, liveWorkspaceSummary } from './livePresentation'

const eventSource: SourceRecord = {
  url: 'https://sample.devpost.com/',
  evidenceRole: 'event',
  title: 'Sample Hackathon',
  collectedAt: '2026-08-16T00:00:00.000Z',
  contentType: 'text/html',
  byteLength: 100,
  excerpt: 'Requirements',
}

const job: ScanJob = {
  id: '00000000-0000-4000-8000-000000000001',
  request: { hackathonUrl: eventSource.url, builderContext: 'Context', projectUrls: [] },
  status: 'completed',
  createdAt: '2026-08-16T00:00:00.000Z',
  updatedAt: '2026-08-16T00:00:01.000Z',
  events: [],
  sources: [eventSource],
  analysis: {
    eventName: 'Sample Hackathon',
    summary: 'Summary',
    requirements: [],
    judgingCriteria: [],
    strategicGaps: [],
    learningShortlist: [],
    buildPlan: [],
    uncertainties: [],
  },
}

describe('live presentation', () => {
  it('uses the validated event name for the current completed scan', () => {
    expect(liveWorkspaceSummary('https://sample.devpost.com', job)).toEqual({
      title: 'Sample Hackathon',
      detail: 'Analysis complete · 1 source',
    })
  })

  it('clears stale event identity when the input URL changes', () => {
    expect(liveWorkspaceSummary('https://different.devpost.com/', job)).toEqual({
      title: 'Public hackathon scan',
      detail: 'Ready for public input',
    })
  })

  it('labels event and GitHub project evidence distinctly', () => {
    const projectSource: SourceRecord = { ...eventSource, url: 'https://github.com/SkillSpringAI/Signal-Scout', evidenceRole: 'project', title: 'Signal Scout' }
    expect(evidenceLinkLabel([eventSource, projectSource], eventSource.url)).toBe('Event evidence: Devpost')
    expect(evidenceLinkLabel([eventSource, projectSource], projectSource.url)).toBe('Project evidence: SkillSpringAI/Signal-Scout')
  })
})
