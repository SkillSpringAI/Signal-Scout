# Scope

> **Current status:** the repository contains a deterministic mock UI and a tested local API spine. Credentialed Gemini/Firestore execution, live UI integration, and Cloud Run proof remain incomplete.

## Hackathon MVP target

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
- Google GenAI SDK adapter targeting `gemini-3.5-flash`, tested through an injected model boundary but not yet called with credentials
- optional Firestore adapter using Application Default Credentials, not yet integration-tested
- multi-stage container definition

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
