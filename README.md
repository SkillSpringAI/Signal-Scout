# Signal Scout

> **Current status (verified 13 August 2026):** Signal Scout is a tested local React and TypeScript prototype using deterministic synthetic fixtures and a mock agent service. Gemini, a qualifying Google agent framework, backend execution, live source ingestion, asynchronous jobs, Firestore, and Google Cloud deployment are planned but not yet implemented.

Signal Scout's target hackathon capability is to autonomously turn a hackathon and a builder's goals into a sourced field analysis, strategic project gaps, a learning shortlist, and an actionable build plan, while preserving a visible trace of every source and processing step.

That proposition remains a **target**, not a claim about the current prototype. The submission must prove this bounded loop with real public input:

```text
official hackathon URL + builder context + optional project URLs
  -> retrieve -> extract -> validate -> cluster -> rank
  -> generate Field Report -> expose activity and evidence
```

## Hackathon alignment

- Event: [All Things Agentic Hackathon](https://allthingsagentichackathon.devpost.com/)
- Provisional category: **The Taskmaster**
- Mandatory runtime: Gemini 3.5 or newer, at least one qualifying Google agent framework, and at least one Google Cloud infrastructure service
- Project choice: TypeScript; TypeScript is not a hackathon requirement
- Current mode: local deterministic mock only; synthetic data is visibly labelled and must not be presented as field research

The Taskmaster fits because Signal Scout targets a bounded multi-step research and synthesis chore: turning a large hackathon ecosystem into useful project, learning, and networking decisions with minimal hand-holding.

## Authoritative project documents

- [Hackathon execution plan](docs/hackathon-execution-plan.md) — the only active implementation sequence
- [Submission compliance](docs/submission-compliance.md) — evidence-based checklist
- [Architecture](docs/architecture.md) — implemented and immediate target architecture
- [Scope](docs/scope.md) — in-scope, deferred, and prohibited work
- [Safety and permissions](docs/safety-and-permissions.md) — policy matching current enforcement
- [Product blueprint](docs/blueprint.md) — focused product intent
- [Decisions](docs/decisions.md) — dated decision record

Older build and implementation roadmaps are retained only as clearly marked historical records and are not active instructions.

## Local prototype

```bash
npm install
npm run dev
```

Verification:

```bash
npm run typecheck
npm test
npm run build
```

The mock service and synthetic fixtures support deterministic tests and offline UI development. They are not the intended submission workflow or judging proof.
