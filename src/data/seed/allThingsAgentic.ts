import type { Domain } from '../../../shared/types'

export const allThingsAgentic: Domain = {
  id: 'domain-all-things-agentic',
  kind: 'hackathon',
  name: 'All Things Agentic Hackathon',
  summary: 'A focused field study of practical, trustworthy agent experiences built for real users.',
  sourceUrl: 'https://www.hackathons.space/hackathons/all-things-agent-hackathon-by-apify',
  sourceIds: ['source-event-listing'],
  researchStatus: 'partially_verified',
  researchNotes: ['A public secondary listing describes an Apify event focused on real-time web data and LLM prototypes.', 'The current Gemini, Cloud Run, and judging criteria assumptions still require confirmation from official organizer materials.'],
  constraints: ['Build an agentic experience', 'Show a working demo', 'Explain the user value clearly', 'Use responsible autonomy'],
  judgingCriteria: ['User value', 'Technical execution', 'Agent quality', 'Demo clarity', 'Responsible design'],
  requiredTechnologies: ['Gemini', 'Google Cloud', 'TypeScript'],
  deadlines: [
    { label: 'Prototype checkpoint', date: '2026-08-14' },
    { label: 'Submission window', date: '2026-08-28' },
  ],
}
