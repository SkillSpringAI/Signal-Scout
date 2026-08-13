# Architecture

> **Current status:** the local mock UI remains intact. A Node/TypeScript API, safe retrieval boundary, job runner, Google GenAI SDK adapter, structured-output validation, optional Firestore store, and container build are implemented and tested with injected fakes. Real Gemini, Firestore, and Cloud Run execution remain unverified.

## Implemented local architecture

```text
React/Vite UI
  -> in-process MockAgent
  -> in-memory application store
  -> deterministic synthetic fixtures
  -> Activity, Memory, and Field Report views
```

Verified current components:

- React, Vite, and TypeScript browser application
- shared TypeScript types and lightweight runtime validation
- deterministic mock route service
- session-only in-memory store
- synthetic event/project fixtures
- local Activity, Memory review, and Field Report surfaces

The API and retrieval/model boundaries now exist. There is no verified credentialed model call, durable Firestore run, production queue, or cloud deployment yet. Background execution is currently process-local through `setImmediate`, so it is not durable across server restarts.

## Immediate target architecture

```text
React UI
  -> Node/TypeScript API on Cloud Run
     -> qualifying Google agent framework
     -> Gemini 3.5+ with schema-validated output
     -> allowlisted public-source retrieval
     -> Firestore for scan/activity/report state
```

The target must keep credentials server-side; treat retrieved content as untrusted; enforce URL, size, and timeout limits; validate model output; preserve provenance and collection timestamps; and expose completed, partial, failed, cancelled, and needs-input terminal states.

TypeScript is a project choice, not a hackathon requirement. Cloud Run and Firestore are the current intended infrastructure choices, subject to verification during implementation.

## Mock boundary

The mock service remains for deterministic tests, failure fixtures, and offline UI development. It must be visibly distinguishable from live mode and cannot serve as submission proof.
