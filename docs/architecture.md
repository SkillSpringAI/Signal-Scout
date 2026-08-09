# Architecture Notes

## Primary Language

Use TypeScript across the app.

Reasons:

- shared types between frontend, backend, routes, memory, and tasks
- strong fit for React and Node
- clean schema validation with libraries like Zod
- practical integration path for Google GenAI and Google Cloud libraries
- fast hackathon development without splitting the project across languages

## Recommended Stack

Frontend:

- React
- TypeScript
- Vite

Backend:

- Node
- TypeScript API routes or service
- Express-style structured route handlers

Agent:

- Gemini through Google GenAI SDK or ADK
- mocked agent service first
- real model calls later

Storage:

- local JSON or in-memory store for first prototype
- Firestore for cloud version

Cloud:

- Cloud Run for a single web/API service
- Firestore for durable data
- Cloud Tasks or Pub/Sub for async scans
- Cloud Storage for optional cached snapshots or report exports

## Framework Decision

Use Vite + React for the frontend and a Node API service for the backend.

Reasons:

- faster local prototype setup
- less framework magic during a hackathon
- clear separation between UI, agent routes, and task ledger
- easy mock-agent development before cloud setup
- straightforward Cloud Run path by serving the built frontend and API from one Node service later

Next.js is a reasonable alternative, but the first build should optimize for explicit architecture and quick iteration rather than framework conventions.

## Core Data Flow

```txt
User input
  -> route selection
  -> permission check
  -> task ledger entry
  -> source ingestion
  -> structured extraction
  -> signal generation
  -> pattern clustering
  -> opportunity ranking
  -> memory review
  -> field report
  -> activity log
```

## Core Collections

`domains`
Hackathons or other ecosystems.

`items`
Projects, talks, papers, repos, grants, or other analyzed objects.

`actors`
People, teams, organizations, sponsors, maintainers, or authors.

`signals`
Extracted observations.

`patterns`
Clusters of signals.

`opportunities`
Ranked possible actions.

`plans`
Generated learning, networking, or build plans.

`memoryEntries`
Inspectable user-owned memories.

`tasks`
Agent tasks and workflow status.

`taskEvents`
Step-by-step task activity.

`approvals`
User approval requests and decisions.

## Domain Packs

Keep domain-specific behavior separate from the reusable core.

A domain pack can define:

- accepted source types
- item labels
- actor labels
- extraction fields
- ranking criteria
- prompt templates
- enabled routes
- output templates

Initial domain pack:

- `hackathon`

Future domain packs:

- `conference`
- `research`
- `open_source`
- `career`
- `accelerator`

## Route Design

Routes should be named generically in code:

- `intake`
- `domainAnalyze`
- `itemScout`
- `patternMap`
- `relationshipScout`
- `opportunityRefine`
- `learningPlan`
- `fieldReport`

The UI may show hackathon-specific language when the active domain pack is `hackathon`.

## Agent Service Strategy

Start with a mock agent service that returns deterministic structured outputs.

This lets us build:

- UI
- data model
- task ledger
- Activity review
- memory review
- fallback behavior
- report output

When credits/API setup is ready, replace mock calls with Gemini-backed calls behind the same interface.

## Agent Output Requirements

Agent outputs should be structured, validated, and reviewable.

Each recommendation should include:

- title
- explanation
- evidence
- confidence
- related sources
- related memory, if any

## Fallback Strategy

Use fallback logic at three levels.

Tool-level:

- retry simple extraction once
- store raw summary if structured extraction fails
- mark missing fields clearly

Route-level:

- produce partial output when one step fails
- ask the user for the smallest missing input
- mark low-confidence sections

Product-level:

- support manual links and pasted text
- support seed demo data
- allow the user to continue without live scraping

## Review Surface

The `Activity` area is a first-class part of the app, not a debug page.

It should show:

- what the agent did
- what sources it used
- what tools/routes ran
- what outputs were produced
- what memory changes were proposed
- what fallbacks occurred
- what approvals are pending

## Field Report

The Field Report is the main polished output.

It should be generated from stored domain, item, signal, pattern, opportunity, plan, memory, and activity data rather than from a single freeform prompt.
