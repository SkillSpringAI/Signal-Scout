# Scope

> **Current status:** the bounded hackathon workflow is implemented and publicly deployed. Live Gemini analysis, Firestore persistence, Cloud Run, sourced Activity evidence, and one Collaborative Partner feedback turn are verified; deterministic mock mode remains visibly separated.

## Hackathon MVP

- one official hackathon URL plus builder context and optional public project URLs
- bounded retrieval, extraction, validation, clustering, ranking, and Field Report generation
- Gemini 3.5+ used materially through one qualifying Google agent framework
- Node/TypeScript backend with server-side credentials
- Cloud Run deployment and one justified Google Cloud persistence service
- source references, collection timestamps, actual Activity events, and honest partial-failure handling
- deterministic mock mode retained and visibly labelled

## Current implementation

- local React/Vite/TypeScript UI
- in-process deterministic mock service
- in-memory session state
- synthetic fixtures for tests and offline UI development
- presentational Activity, Memory, and report views
- Node/TypeScript scan API with bounded retrieval and explicit lifecycle states
- Google GenAI SDK adapter using credentialed `gemini-3.5-flash` calls with structured and semantic validation
- Firestore Native adapter verified through ADC locally and a dedicated Cloud Run runtime identity
- multi-stage Node 22 container deployed publicly to Cloud Run with min 0 / max 2 instances
- one persisted, bounded feedback adaptation with one targeted clarifying question

## Deferred until the required loop works

- multiple domain packs, broad web crawling, Devpost-wide indexing, and social graphs
- automated outreach, CRM behavior, publishing, or messaging
- multiple cooperating agents
- generalized permission or capability-token systems
- Google authentication, large UI redesigns, and speculative enterprise features
- additional Google models beyond the required Gemini integration
- import/export systems and production-grade authentication

## Prohibited for the submission workflow

- exposing model or cloud credentials to the browser
- presenting synthetic people, projects, scores, trends, gaps, or recommendations as real evidence
- private/logged-in scraping or arbitrary URL crawling
- automatic messaging, publishing, spending, or infrastructure mutation from the application
- claims of production readiness without evidence
