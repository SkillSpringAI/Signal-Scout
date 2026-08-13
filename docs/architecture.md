# Architecture

> **Current status:** the live workflow is deployed and verified on Cloud Run. It uses the Google GenAI SDK with Gemini 3.5 Flash, Firestore Native persistence, bounded public retrieval, structured and semantic validation, and a server-side Secret Manager reference. The visibly separated mock UI remains intact for deterministic tests and offline demonstration.

## Implemented architecture

```text
React/Vite UI
  -> live Node/TypeScript API on Cloud Run
     -> bounded public-source retriever
     -> Google GenAI SDK -> Gemini 3.5 Flash
     -> schema and semantic validation
     -> Firestore Native scan/activity/report state
     -> one bounded feedback adaptation

React/Vite mock mode
  -> in-process MockAgent -> deterministic synthetic fixtures
```

Verified components:

- React, Vite, and TypeScript browser application
- shared TypeScript types and lightweight runtime validation
- deterministic mock route service
- public Cloud Run service with min 0 / max 2 instances
- dedicated runtime service identity with Firestore access
- Gemini key mounted from a single least-privilege Secret Manager secret
- real official-source retrieval, Gemini analysis, Firestore persistence, Activity, Field Report, and feedback adaptation
- session-only mock store and synthetic fixtures kept outside the live evidence path

Background execution remains process-local through `setImmediate`, so an in-flight job is not recovered across a container restart. Completed and partial records are durable in Firestore. This is an explicit prototype limitation, not a production-readiness claim.

## Deployed runtime path

```text
React UI
  -> Node/TypeScript API on Cloud Run
     -> qualifying Google agent framework
     -> Gemini 3.5+ with schema-validated output
     -> allowlisted public-source retrieval
     -> Firestore for scan/activity/report state
```

The runtime keeps credentials server-side; treats retrieved content as untrusted; enforces URL, size, redirect, and timeout limits; validates model output; preserves provenance and collection timestamps; and exposes completed, partial, failed, cancelled, and needs-input terminal states.

TypeScript is a project choice, not a hackathon requirement. Cloud Run and Firestore are verified infrastructure choices.

## Mock boundary

The mock service remains for deterministic tests, failure fixtures, and offline UI development. It must be visibly distinguishable from live mode and cannot serve as submission proof.
