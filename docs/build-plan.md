# Build Plan

## Build Philosophy

Build the app as if the agent already exists, but use mocked structured outputs first.

That lets us validate the product, UI, task ledger, permissions, memory, and report flow before spending time on API setup or cloud deployment.

## Phase 0: Alignment Docs

Goal:

- reduce scope creep
- capture decisions
- keep the project forkable

Outputs:

- README
- product blueprint
- scope guardrails
- architecture notes
- safety and permissions
- build plan

## Phase 1: Local Product Skeleton

Goal:

Create the core app experience with mock data.

Build:

- Vite + React + TypeScript app
- Node + TypeScript API shell
- app shell with main workspace and side panels
- route navigation
- hackathon domain pack
- seed demo dataset
- basic in-memory or local JSON store

Core views:

- Intake
- Domain Brief
- Items
- Signals
- Patterns
- Opportunities
- Activity
- Memory
- Field Report

Done when:

- the user can move through the intended workflow using seed data
- no real model calls are required

## Phase 2: Task Ledger And Review

Goal:

Make agent work visible and reviewable.

Build:

- task model
- task events
- Activity page
- status states
- fallback events
- approval cards
- memory change review

Done when:

- every mock route creates Activity entries
- memory changes can be accepted, edited, or rejected
- pending approval states are visible

## Phase 3: Mock Agent Routes

Goal:

Implement the full semantic loop without real AI.

Build mock handlers for:

- intake
- domain analyze
- item scout
- pattern map
- relationship scout
- opportunity refine
- learning plan
- field report

Done when:

- the Field Report is generated from stored structured data
- recommendations include reasons and confidence
- fallback examples can be demonstrated

## Phase 4: Gemini Integration

Goal:

Replace mock outputs with real model-backed analysis.

Build:

- Gemini client wrapper
- structured prompt templates
- schema validation
- retry behavior
- malformed-output fallback
- source evidence handling

Done when:

- the same routes work with real model calls
- failed model calls degrade gracefully
- mock mode can still be used for demos

## Phase 5: Google Cloud Integration

Goal:

Satisfy production and hackathon infrastructure requirements.

Build:

- Cloud Run deployment
- Firestore persistence
- Cloud Tasks or Pub/Sub for async scans
- environment config
- basic deployment documentation

Done when:

- backend runs on Google Cloud
- task and memory data persist
- demo can show cloud infrastructure clearly

## Phase 6: Submission Polish

Goal:

Prepare the hackathon submission.

Build:

- architecture diagram
- README improvements
- demo script
- sample Field Report
- short video flow
- screenshots
- final repo cleanup

Done when:

- the app can be demoed in under four minutes
- the submission clearly explains Gemini and Google Cloud usage
- the value proposition is obvious to someone seeing it cold

## Suggested MVP Demo Flow

1. Choose the All Things Agentic hackathon seed dataset.
2. Enter user interests.
3. Generate the hackathon brief.
4. Analyze project examples.
5. Show extracted signals.
6. Show pattern clusters.
7. Show opportunity shortlist.
8. Review proposed memory updates.
9. Open Activity and show the agent trail.
10. Generate the Field Report.

## Stop Conditions

Do not add a new feature during MVP unless it helps:

- the core demo flow
- trust and review
- field report quality
- hackathon requirement alignment
- repo forkability

Everything else goes to later.
