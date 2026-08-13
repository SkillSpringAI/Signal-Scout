import type { Domain } from '../../../shared/types'

export const allThingsAgentic: Domain = {
  id: 'domain-all-things-agentic',
  kind: 'hackathon',
  name: 'All Things Agentic Hackathon',
  summary: 'Official requirements fixture for a Google-hosted hackathon focused on autonomous agents. Synthetic project records are stored separately and are not field research.',
  sourceUrl: 'https://allthingsagentichackathon.devpost.com/',
  sourceIds: ['source-event-official', 'source-event-rules', 'source-event-resources', 'source-event-faq'],
  researchStatus: 'verified',
  researchNotes: ['Official Devpost materials were re-checked on 2026-08-13.', 'The Collaborative Partner was selected on 2026-08-13 after reviewing the official track descriptions. Reconfirm dates and video details immediately before submission.'],
  constraints: ['Select one official category', 'Use Gemini 3.5 or newer via Gemini API or Vertex AI', 'Use at least one qualifying Google agent framework', 'Use at least one Google Cloud infrastructure service', 'Provide repository access, reproducible setup, architecture diagram, demo video, and visible Google Cloud proof'],
  judgingCriteria: ['Innovation & Operational Utility — 40%', 'Architectural Discipline & Tech Stack — 30%', 'Demo & Production Readiness — 30%'],
  requiredTechnologies: ['Gemini 3.5+ via Gemini API or Vertex AI', 'Google ADK, Google GenAI SDK, Antigravity SDK, or Genkit', 'Google Cloud infrastructure service such as Cloud Run, Firestore, Cloud SQL, GKE, or Pub/Sub'],
  deadlines: [
    { label: 'Submission opens — 9:00 AM PT', date: '2026-08-03' },
    { label: 'Submission deadline — 5:00 PM PDT / 12:00 PM NZST on 1 September', date: '2026-08-31' },
  ],
}
