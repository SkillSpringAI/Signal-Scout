# Implementation Roadmap

This roadmap turns the blueprint into a rough build sequence. It is intentionally flexible: each phase includes likely files and room for added steps as the project teaches us more.

## Guiding Rule

Build the workflow first with mock data and mock agent outputs. Replace mocks with Gemini and cloud services only after the product loop is visible.

Core loop:

```txt
intake -> analyze -> scout -> map -> recommend -> review -> report
```

Trust loop:

```txt
observe -> suggest -> approve -> log
```

## Proposed Project Shape

```txt
signal-scout/
  docs/
  package.json
  tsconfig.json
  vite.config.ts
  index.html
  src/
    app/
    components/
    data/
    domain-packs/
    lib/
    routes/
    services/
    styles/
    types/
  server/
    index.ts
    routes/
    services/
  shared/
    schemas/
    types/
```

This structure may shift slightly during setup, but the split should stay clear:

- `src/` for the browser app
- `server/` for backend/API logic
- `shared/` for types and schemas used by both
- `docs/` for alignment and planning

## Phase 0: Alignment And Guardrails

Status: complete

Goal:

Capture the product, architecture, safety, and scope decisions before implementation starts.

Current files:

- `README.md`
- `docs/blueprint.md`
- `docs/scope.md`
- `docs/architecture.md`
- `docs/safety-and-permissions.md`
- `docs/build-plan.md`
- `docs/decisions.md`
- `docs/implementation-roadmap.md`

Possible additions:

- `docs/demo-script.md`
- `docs/submission-checklist.md`
- `docs/architecture-diagram.md`

## Phase 1: App Scaffold

Status: complete for the local prototype shell

Goal:

Create a working local TypeScript app with a basic shell and clear directories.

Likely files:

- `package.json`
- `tsconfig.json`
- `vite.config.ts`
- `index.html`
- `src/main.tsx`
- `src/app/App.tsx`
- `src/styles/global.css`
- `src/styles/theme.css`

Likely steps:

- initialize Vite + React + TypeScript
- add basic app shell
- add global layout styles
- add route/view state
- add placeholder views for the core workflow
- confirm local dev server runs

Expansion slots:

- choose icons/UI library
- add design tokens
- add testing setup
- add lint/format setup

Done when:

- the app runs locally
- navigation between placeholder views works
- project structure matches the roadmap closely enough

Completed in this repo:

- Vite + React + TypeScript app scaffold
- responsive application shell and navigation
- domain brief, field, patterns, opportunities, memory, activity, and report views
- local mock mode and permission-mode selector
- production build and local HTTP smoke check

Follow-up notes:

- `src/app/App.tsx` is still intentionally compact but should be split into route/view and layout components before the UI grows further.
- Accessibility, keyboard navigation, loading states, and error states need a dedicated pass.
- The current visual language is a prototype; final typography and brand assets are not yet locked.

## Phase 2: Shared Domain Model

Status: complete for the initial semantic foundation

Goal:

Define the reusable semantic model before building UI behavior around it.

Likely files:

- `shared/types/domain.ts`
- `shared/types/item.ts`
- `shared/types/actor.ts`
- `shared/types/signal.ts`
- `shared/types/pattern.ts`
- `shared/types/opportunity.ts`
- `shared/types/plan.ts`
- `shared/types/memory.ts`
- `shared/types/activity.ts`
- `shared/types/approval.ts`
- `shared/types/index.ts`
- `shared/schemas/domainSchemas.ts`

Likely steps:

- define `Domain`
- define `Item`
- define `Actor`
- define `Signal`
- define `Pattern`
- define `Opportunity`
- define `Plan`
- define `MemoryEntry`
- define `ActivityTask`
- define `ActivityEvent`
- define `ApprovalRequest`
- add status and confidence types

Expansion slots:

- add Zod schemas
- add fixture validation
- add typed IDs
- add source/evidence model

Done when:

- app, mock services, and future backend can share the same types
- recommendations can include evidence, confidence, and source references

Completed in this repo:

- domain-neutral types for domains, items, actors, signals, patterns, opportunities, plans, memory, activity, and approvals
- confidence, permission, status, evidence, and source-reference fields
- shared runtime guards for core domain objects
- dataset-level cross-reference validation for seed fixtures

Follow-up notes:

- The current validators are lightweight TypeScript guards. Add JSON Schema or a similarly formal contract when backend/API boundaries are introduced.
- Add typed identifiers or branded IDs only if they improve safety without making domain-pack forks cumbersome.
- Add API schemas when the local backend shell begins; do not couple the browser-only fixture store to Firestore shapes prematurely.

## Phase 3: Hackathon Domain Pack And Seed Data

Status: complete for the first offline demo dataset

Goal:

Create the first domain preset and stable demo data.

Likely files:

- `src/domain-packs/hackathon/index.ts`
- `src/domain-packs/hackathon/labels.ts`
- `src/domain-packs/hackathon/criteria.ts`
- `src/domain-packs/hackathon/prompts.ts`
- `src/data/seed/allThingsAgentic.ts`
- `src/data/seed/demoProjects.ts`
- `src/data/seed/demoMemory.ts`

Likely steps:

- define hackathon labels
- define hackathon ranking criteria
- define seed hackathon brief
- define seed projects/items
- define seed signals and patterns
- define seed opportunities
- define seed memory examples

Expansion slots:

- add additional sample projects
- add a second small seed dataset for testing forkability
- add source citation fields
- add sample fallback cases

Done when:

- the app can load a realistic hackathon scenario without network access
- the seed data can drive the whole demo flow

Completed in this repo:

- `hackathon` domain-pack contract
- hackathon labels, ranking criteria, and prompt placeholders
- All Things Agentic seed domain brief
- seed actors, projects, signals, patterns, opportunities, and memory entries
- fixture aggregator and load-time validation
- deterministic evidence and cross-reference relationships

Follow-up notes:

- Verify the hackathon name, URL, deadlines, judging criteria, required technologies, and submission artifacts against the authoritative event materials before public demo or submission.
- Replace placeholder seed claims with source references and collection timestamps where possible.
- Collect a larger, representative project sample; the current three projects are designed for a readable demo, not field-level conclusions.
- Add a second small fixture or domain-pack stub to prove forkability before making the seed format more elaborate.
- Add fallback fixtures for missing URLs, incomplete project metadata, low-confidence extraction, and unavailable live pages.

Data to collect or research:

- authoritative hackathon rules, judging rubric, deadlines, technology requirements, and submission checklist
- a curated set of public project links or descriptions with permission-safe source metadata
- project authors/teams and public learning/contact context, avoiding unnecessary personal data
- the builder’s interests, current project idea, time available, and networking intent for relevance testing
- examples of high-confidence versus low-confidence evidence so the UI can communicate uncertainty honestly

## Phase 4: Local Store And Workflow State

Status: foundation started; full workflow store remains future work

Goal:

Create the app state layer that holds domains, items, signals, memory, tasks, and report data.

Likely files:

- `src/lib/store/createStore.ts`
- `src/lib/store/storeTypes.ts`
- `src/lib/store/selectors.ts`
- `src/lib/store/actions.ts`
- `src/lib/store/fixtures.ts`
- `src/lib/ids.ts`
- `src/lib/time.ts`

Likely steps:

- create local in-memory store
- load seed dataset
- add selectors for each view
- add actions for route outputs
- add actions for memory review
- add actions for task/activity events
- add reset demo state action

Expansion slots:

- persist to localStorage
- add import/export JSON
- add store tests
- add migration shape for Firestore later

Done when:

- all views can read from the same structured state
- mock agent routes can write results into the store

Completed so far:

- read-only `createFixtureStore` boundary
- centralized seed dataset consumed by the app
- fail-fast validation when a dataset is loaded

Next work:

- add actions for opportunity saves, memory review, task events, and report generation
- add reset-demo behavior and then localStorage persistence if useful
- preserve an import/export shape that remains usable by future domain packs

## Phase 5: App Shell And Navigation

Goal:

Build the main product surface.

Likely files:

- `src/app/App.tsx`
- `src/app/navigation.ts`
- `src/components/layout/AppShell.tsx`
- `src/components/layout/Sidebar.tsx`
- `src/components/layout/TopBar.tsx`
- `src/components/layout/MainPanel.tsx`
- `src/components/layout/RightPanel.tsx`
- `src/components/common/Button.tsx`
- `src/components/common/Tabs.tsx`
- `src/components/common/Badge.tsx`
- `src/components/common/EmptyState.tsx`

Likely steps:

- create main app layout
- add section navigation
- add agent mode indicator
- add source/domain summary in sidebar
- add memory or activity summary in side panel
- add consistent empty/loading/error states

Expansion slots:

- responsive layout pass
- keyboard navigation
- accessibility polish
- icon library integration

Done when:

- the app feels like one coherent workspace
- users can move through the workflow without needing implementation details explained

## Phase 6: Core Views

Goal:

Create the visible workflow screens.

Likely files:

- `src/routes/IntakeView.tsx`
- `src/routes/DomainBriefView.tsx`
- `src/routes/ItemsView.tsx`
- `src/routes/SignalsView.tsx`
- `src/routes/PatternsView.tsx`
- `src/routes/OpportunitiesView.tsx`
- `src/routes/MemoryView.tsx`
- `src/routes/ActivityView.tsx`
- `src/routes/FieldReportView.tsx`
- `src/components/domain/DomainBrief.tsx`
- `src/components/items/ItemCard.tsx`
- `src/components/signals/SignalList.tsx`
- `src/components/patterns/PatternCluster.tsx`
- `src/components/opportunities/OpportunityCard.tsx`
- `src/components/memory/MemoryEntryCard.tsx`
- `src/components/activity/ActivityTaskCard.tsx`
- `src/components/report/FieldReport.tsx`

Likely steps:

- build Intake form
- build Domain Brief display
- build Item cards
- build Signal list
- build Pattern clusters
- build Opportunity cards
- build Memory review controls
- build Activity task log
- build Field Report output

Expansion slots:

- add filters and sorting
- add confidence/evidence drawers
- add edit controls
- add report print/export styling

Done when:

- the user can see the entire product story using seed data
- Activity and Memory are visible first-class areas

## Phase 7: Mock Agent Routes

Goal:

Make the app behave as if agent work is happening, without real model calls yet.

Likely files:

- `src/services/agent/mockAgent.ts`
- `src/services/agent/agentTypes.ts`
- `src/services/agent/runRoute.ts`
- `src/services/agent/routes/intake.ts`
- `src/services/agent/routes/domainAnalyze.ts`
- `src/services/agent/routes/itemScout.ts`
- `src/services/agent/routes/patternMap.ts`
- `src/services/agent/routes/relationshipScout.ts`
- `src/services/agent/routes/opportunityRefine.ts`
- `src/services/agent/routes/learningPlan.ts`
- `src/services/agent/routes/fieldReport.ts`

Likely steps:

- define route input/output contracts
- create deterministic mock outputs
- write results into the local store
- create Activity entries for every route
- create proposed memory updates
- create fallback demo cases

Expansion slots:

- add route tests
- add configurable latency for demo realism
- add mock failure mode toggles
- add route replay from Activity

Done when:

- buttons or actions run mock agent tasks
- every task leaves an Activity trail
- Field Report is generated from structured state

## Phase 8: Permissions, Approvals, And Fallbacks

Goal:

Make bounded autonomy visible and functional.

Likely files:

- `src/lib/permissions/permissionTypes.ts`
- `src/lib/permissions/checkPermission.ts`
- `src/lib/permissions/toolRegistry.ts`
- `src/components/approvals/ApprovalCard.tsx`
- `src/components/approvals/ApprovalQueue.tsx`
- `src/components/fallbacks/FallbackNotice.tsx`
- `src/components/fallbacks/NeedsInputCard.tsx`

Likely steps:

- define permission modes
- define tool metadata
- block external-impact actions
- create approval request model
- add approval cards to Activity or side panel
- show fallback events in Activity
- mark low-confidence outputs

Expansion slots:

- add policy tests
- add per-route permission summaries
- add memory-specific approval flow
- add export approval flow

Done when:

- the app clearly distinguishes observing, suggesting, and waiting for approval
- blocked or fallback behavior is visible and understandable

PathWarden-informed notes:

- Reuse the principle that the UI displays state from a source-of-truth record; it must not infer or upgrade permission state.
- Keep `observe`, `suggest`, and `act_with_approval` explicit, with plain-language explanations and visible next actions.
- Adapt PathWarden’s fail-closed and evidence-oriented patterns for external-impact actions and long-term memory, without importing its filesystem execution authority model.

## Phase 9: Local Backend Shell

Goal:

Prepare the app for real agent and cloud services while keeping the prototype working.

Likely files:

- `server/index.ts`
- `server/routes/health.ts`
- `server/routes/agentRoutes.ts`
- `server/routes/reportRoutes.ts`
- `server/services/taskService.ts`
- `server/services/memoryService.ts`
- `server/services/mockAgentService.ts`
- `server/services/sourceService.ts`
- `server/config.ts`
- `shared/schemas/apiSchemas.ts`

Likely steps:

- create backend server
- add health route
- mirror mock agent routes on backend
- define API request/response schemas
- move route execution behind service interface
- keep frontend mock mode available

Expansion slots:

- add basic logging
- add request validation
- add error handling middleware
- add server tests

Done when:

- the frontend can call local API routes
- the service interface is ready for Gemini integration

## Phase 10: Gemini Integration

Goal:

Replace selected mock routes with real Gemini-backed routes.

Likely files:

- `server/services/gemini/geminiClient.ts`
- `server/services/gemini/prompts/shared.ts`
- `server/services/gemini/prompts/hackathon.ts`
- `server/services/gemini/structuredOutput.ts`
- `server/services/gemini/retryPolicy.ts`
- `server/services/gemini/evidence.ts`
- `server/services/agentService.ts`

Likely steps:

- add environment config
- create Gemini client wrapper
- add structured prompts
- validate model output
- retry malformed output
- preserve source evidence
- fall back to mock or partial outputs

Expansion slots:

- add prompt tests with fixtures
- add model selection config
- add token/cost logging
- add route-by-route Gemini rollout

Done when:

- at least one core route runs through Gemini
- failed model calls degrade gracefully
- mock mode remains available

## Phase 11: Persistence And Cloud

Goal:

Move from local prototype to cloud-ready app.

Likely files:

- `server/services/firestore/firestoreClient.ts`
- `server/services/firestore/domainRepo.ts`
- `server/services/firestore/itemRepo.ts`
- `server/services/firestore/taskRepo.ts`
- `server/services/firestore/memoryRepo.ts`
- `server/services/firestore/reportRepo.ts`
- `server/services/queue/taskQueue.ts`
- `Dockerfile`
- `.dockerignore`
- `cloudrun.yaml` or deployment notes
- `.env.example`

Likely steps:

- add Firestore repositories
- persist tasks and memory
- persist domain analysis data
- add queue abstraction
- containerize app
- deploy to Cloud Run
- document environment variables

Expansion slots:

- add Cloud Tasks
- add Pub/Sub
- add Cloud Storage for report exports
- add deployment smoke test

Done when:

- task and memory data persist
- app can run on Cloud Run
- cloud architecture is visible for demo/submission

## Phase 12: Submission Polish

Goal:

Prepare the project for hackathon submission and future forks.

Likely files:

- `docs/demo-script.md`
- `docs/submission-checklist.md`
- `docs/architecture-diagram.md`
- `docs/forking-guide.md`
- `docs/domain-pack-guide.md`
- `docs/sample-field-report.md`
- `README.md`

Likely steps:

- write demo script
- create architecture diagram
- capture screenshots
- create sample Field Report
- document how to add a domain pack
- update README
- verify app demo flow under four minutes

Expansion slots:

- add short product video outline
- add public roadmap
- add contributor notes

Done when:

- the product story is clear
- the repo is understandable to someone new
- the demo is stable
- future users can see how to fork it

## Working Backlog

Use this section for new tasks that emerge without derailing the current phase.

### Candidate Tasks

- Add `docs/demo-script.md`
- Add `docs/domain-pack-guide.md`
- Add `docs/sample-field-report.md`
- Add a second domain pack stub to prove forkability
- Add fixture validation once schemas exist
- Add localStorage persistence for prototype state
- Add report export after the report view is stable

### Deferred Ideas

- automated Devpost ingestion
- GitHub repository analysis
- direct message sending
- multi-user collaboration
- production auth
- browser extension
- CRM-style contact management

## Roadmap Maintenance

At the end of each phase:

1. Mark the phase status.
2. Add newly discovered steps to the next relevant phase.
3. Move non-essential ideas to Deferred Ideas.
4. Keep MVP scope aligned with `docs/scope.md`.

## Cross-Project Reuse Notes: PathWarden

The local PathWarden repository was reviewed as a design reference. It contains mature patterns for governed local execution, not drop-in Signal Scout modules.

Patterns worth adapting:

- schema-first validation with useful, human-readable validation errors
- explicit lifecycle states rather than UI-inferred status
- audit records with stable IDs, timestamps, route/decision context, and trace references
- evidence lineage and deterministic ordering for reports
- fail-closed behavior when data is missing, malformed, revoked, or inconsistent
- replayable or reconstructable task history for debugging and user trust
- plain-language state display with advanced identifiers and raw details available on demand

Patterns to keep out of the MVP unless scope changes:

- filesystem execution capabilities
- permission tokens, capability grants, or local authority chains
- policy hashing and cryptographic trust manifests
- remote/federated authority negotiation

The reusable lesson is the boundary: Signal Scout can borrow the evidence and governance ideas, but its core action is discovery and recommendation rather than governed machine execution.

## Data And Research Backlog

Before live integrations or a public demo, research and record:

- authoritative event details and source URLs
- source freshness and collection timestamps
- acceptable public-source collection boundaries
- project-field sampling method and inclusion criteria
- evidence quality and confidence rubric
- privacy rules for actor and networking data
- Gemini structured-output requirements and fallback behavior
- Google Cloud services and hackathon requirement alignment
- demo script claims that need direct evidence rather than illustrative seed data
