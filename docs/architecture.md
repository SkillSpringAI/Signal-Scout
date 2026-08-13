# Architecture

> **Current status:** tested local React and TypeScript prototype using deterministic synthetic fixtures and a mock agent service. The target backend and Google integrations below are planned, not implemented.

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

There is no Node backend, network retrieval, model call, durable persistence, asynchronous worker, or cloud deployment in the current code.

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
