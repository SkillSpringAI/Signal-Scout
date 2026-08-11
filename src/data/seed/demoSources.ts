import type { SourceReference } from '../../../shared/types'

export const demoSources: SourceReference[] = [
  { id: 'source-event-listing', title: 'All things agent hackathon by Apify — public event listing', url: 'https://www.hackathons.space/hackathons/all-things-agent-hackathon-by-apify', kind: 'event_listing', verification: 'secondary', collectedAt: '2026-08-11', notes: 'Public secondary listing. Confirm official organizer materials before treating event facts as authoritative.' },
  { id: 'source-project-orbit', title: 'Orbit project — illustrative seed fixture', kind: 'demo_fixture', verification: 'illustrative', collectedAt: '2026-08-11', notes: 'Synthetic project record used for offline workflow testing; not a verified public submission.' },
  { id: 'source-project-civic', title: 'Civic Relay project — illustrative seed fixture', kind: 'demo_fixture', verification: 'illustrative', collectedAt: '2026-08-11', notes: 'Synthetic project record used for offline workflow testing; not a verified public submission.' },
  { id: 'source-project-eval', title: 'Tracebench project — illustrative seed fixture', kind: 'demo_fixture', verification: 'illustrative', collectedAt: '2026-08-11', notes: 'Synthetic project record used for offline workflow testing; not a verified public submission.' },
]
