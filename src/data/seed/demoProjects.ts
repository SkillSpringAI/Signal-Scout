import type { Actor, Item, Opportunity, Pattern, Signal } from '../../../shared/types'

export const actors: Actor[] = [
  { id: 'actor-maya', name: 'Maya Chen', role: 'builder', bio: 'Design engineer exploring calm interfaces for complex AI workflows.', itemIds: ['item-orbit'], contactHint: 'Ask about how she makes agent state legible.' },
  { id: 'actor-northstar', name: 'Northstar Labs', role: 'team', bio: 'Small team building agents for local community services.', itemIds: ['item-civic'], contactHint: 'Compare approaches to human approval checkpoints.' },
  { id: 'actor-jonah', name: 'Jonah Patel', role: 'builder', bio: 'Developer focused on evaluation and reliable tool use.', itemIds: ['item-eval'], contactHint: 'Learn how he tests agent behavior before launch.' },
]

export const items: Item[] = [
  { id: 'item-orbit', domainId: 'domain-all-things-agentic', type: 'project', title: 'Orbit: Personal Research Navigator', summary: 'An agent that turns an open-ended research question into a source-backed exploration trail.', audience: 'Curious builders and researchers', stack: ['Gemini', 'React', 'Cloud Run'], maturity: 'working', relevance: 94, actorIds: ['actor-maya'], signalIds: ['signal-evidence', 'signal-guidance'], tags: ['research', 'source-grounding'] },
  { id: 'item-civic', domainId: 'domain-all-things-agentic', type: 'project', title: 'Civic Relay', summary: 'A multilingual intake assistant that routes local service requests with a human review step.', audience: 'Community service teams', stack: ['Gemini', 'Firestore', 'Cloud Tasks'], maturity: 'prototype', relevance: 88, actorIds: ['actor-northstar'], signalIds: ['signal-approval', 'signal-access'], tags: ['civic', 'human-in-the-loop'] },
  { id: 'item-eval', domainId: 'domain-all-things-agentic', type: 'project', title: 'Tracebench', summary: 'A lightweight evaluation harness for replaying tool calls and comparing agent decisions.', audience: 'Agent developers', stack: ['TypeScript', 'Vertex AI', 'BigQuery'], maturity: 'working', relevance: 86, actorIds: ['actor-jonah'], signalIds: ['signal-eval', 'signal-evidence'], tags: ['evaluation', 'observability'] },
]

export const signals: Signal[] = [
  { id: 'signal-evidence', domainId: 'domain-all-things-agentic', itemIds: ['item-orbit', 'item-eval'], title: 'Evidence is becoming part of the product', observation: 'The strongest experiences expose sources, traces, or reasoning artifacts users can inspect.', category: 'behavior', confidence: 'high', evidence: [{ label: 'Observed across projects', detail: 'Two projects make evidence visible in the main workflow.', sourceIds: ['item-orbit', 'item-eval'] }] },
  { id: 'signal-guidance', domainId: 'domain-all-things-agentic', itemIds: ['item-orbit'], title: 'Guided exploration beats blank prompts', observation: 'Users get more value when the agent proposes a sequence of useful next questions.', category: 'theme', confidence: 'medium', evidence: [{ label: 'Orbit workflow', detail: 'The project turns ambiguity into a staged exploration trail.', sourceIds: ['item-orbit'] }] },
  { id: 'signal-approval', domainId: 'domain-all-things-agentic', itemIds: ['item-civic'], title: 'Approval checkpoints create trust', observation: 'Human review is presented as a useful product moment rather than an exception path.', category: 'behavior', confidence: 'high', evidence: [{ label: 'Civic Relay flow', detail: 'Requests pause before any external service action.', sourceIds: ['item-civic'] }] },
  { id: 'signal-access', domainId: 'domain-all-things-agentic', itemIds: ['item-civic'], title: 'Access and inclusion are underexplored', observation: 'Multilingual and community-first workflows remain less common than productivity assistants.', category: 'gap', confidence: 'medium', evidence: [{ label: 'Field comparison', detail: 'Only one seed project prioritizes community access.', sourceIds: ['item-civic'] }] },
  { id: 'signal-eval', domainId: 'domain-all-things-agentic', itemIds: ['item-eval'], title: 'Evaluation is a differentiator', observation: 'A visible evaluation story can make an agent demo feel dependable and technically mature.', category: 'technology', confidence: 'high', evidence: [{ label: 'Tracebench approach', detail: 'Replayable traces turn reliability into a demonstrable feature.', sourceIds: ['item-eval'] }] },
]

export const patterns: Pattern[] = [
  { id: 'pattern-trust', domainId: 'domain-all-things-agentic', name: 'Inspectable autonomy', summary: 'Projects are differentiating through visible evidence, traces, and human checkpoints.', signalIds: ['signal-evidence', 'signal-approval'], gap: 'Few projects connect these trust moments into one coherent user-facing report.', confidence: 'high' },
  { id: 'pattern-guided', domainId: 'domain-all-things-agentic', name: 'Agents as navigators', summary: 'The field is moving from one-shot answers toward guided journeys with useful next actions.', signalIds: ['signal-guidance', 'signal-eval'], gap: 'A learning-oriented navigator for builders is still a clear opening.', confidence: 'medium' },
]

export const opportunities: Opportunity[] = [
  { id: 'opportunity-report', domainId: 'domain-all-things-agentic', kind: 'build', title: 'Make the Field Report the demo centerpiece', explanation: 'Combine evidence, patterns, and next steps into one artifact that judges can understand quickly.', whyNow: 'It directly reinforces user value and demo clarity.', confidence: 'high', evidenceIds: ['signal-evidence', 'pattern-trust'], actorIds: [], status: 'proposed' },
  { id: 'opportunity-eval', domainId: 'domain-all-things-agentic', kind: 'learn', title: 'Study lightweight agent evaluation', explanation: 'Borrow Tracebench-style replay thinking to make Signal Scout’s mock-to-Gemini path credible.', whyNow: 'Evaluation can become a visible differentiator before live integrations.', confidence: 'medium', evidenceIds: ['signal-eval'], actorIds: ['actor-jonah'], status: 'proposed' },
  { id: 'opportunity-community', domainId: 'domain-all-things-agentic', kind: 'refine', title: 'Test a community-access angle', explanation: 'Explore whether a builder learning plan can connect agentic patterns to underserved workflows.', whyNow: 'The field has whitespace beyond productivity assistants.', confidence: 'medium', evidenceIds: ['signal-access'], actorIds: ['actor-northstar'], status: 'proposed' },
]
