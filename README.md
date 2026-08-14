# Signal Scout

> **Current status (updated 14 August 2026):** Signal Scout is publicly deployed on Cloud Run revision `signal-scout-00007-vb6` with a live React/TypeScript UI, bounded Node/TypeScript scan API, Gemini 3.5 Flash analysis through the Google GenAI SDK, Firestore persistence, sourced Activity evidence, and one bounded Collaborative Partner feedback turn. The current local correction slice adds clearer live inputs and findings language plus one deliberate analysis retry using preserved sources; it passed the 55-test preflight suite but has not yet been deployed. Deterministic mock mode remains available and visibly separated for offline demonstration and testing.

Signal Scout turns a hackathon and a builder's goals into a sourced field analysis, strategic project gaps, a learning shortlist, and an actionable build plan, while preserving a visible trace of every source and processing step.

The deployed workflow demonstrates this bounded loop with real public input:

```text
official hackathon URL + builder context + optional project URLs
  -> retrieve -> extract -> validate -> cluster -> rank
  -> generate Field Report -> expose activity and evidence
```

## Hackathon alignment

- Event: [All Things Agentic Hackathon](https://allthingsagentichackathon.devpost.com/)
- Selected category: **The Collaborative Partner**
- Mandatory runtime: Gemini 3.5 or newer, at least one qualifying Google agent framework, and at least one Google Cloud infrastructure service
- Project choice: TypeScript; TypeScript is not a hackathon requirement
- Current UI modes: public live scan plus a visibly labelled deterministic mock demo
- Public deployment: https://signal-scout-212660130578.australia-southeast1.run.app

The Collaborative Partner fits because Signal Scout guides a builder through sourced findings, asks for missing context, captures feedback, and carries that context into later project, learning, and collaboration decisions. The target remains a working research workflow rather than a text-only chatbot.

## Authoritative project documents

- [Hackathon execution plan](docs/hackathon-execution-plan.md) — the only active implementation sequence
- [Submission compliance](docs/submission-compliance.md) — evidence-based checklist
- [Architecture](docs/architecture.md) — implemented and immediate target architecture
- [Architecture diagram](docs/architecture-diagram.md) — maintained visual submission artifact
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

Deployment configuration and reproducible verification evidence are recorded in [Gate 2 runtime guide](docs/gate-2-runtime.md).

## License

Signal Scout is available under the [MIT License](LICENSE). Copyright (c) 2026 Isac Thompson.
