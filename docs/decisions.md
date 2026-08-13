# Decision Record

This is an append-only record. Superseded decisions remain labelled so they cannot be mistaken for current instructions.

## 13 August 2026 — Submission category

**Status:** active.
**Decision:** use **The Taskmaster** provisionally.
**Reason:** Signal Scout targets a bounded, multi-step research and synthesis chore and should progress from intake to a sourced Field Report with minimal hand-holding.

## 13 August 2026 — Canonical product claim

**Status:** active.
**Decision:** describe the autonomous sourced workflow as the target submission capability until it works end to end. Describe the current product as a deterministic local mock prototype.

## 13 August 2026 — Implementation order

**Status:** active.
**Decision:** follow [hackathon-execution-plan.md](hackathon-execution-plan.md). Establish the backend, qualifying Google agent framework, Gemini 3.5+, provenance, Cloud Run, and persistence spine before optional expansion.

## 13 August 2026 — Technology choices

**Status:** active.
**Decision:** TypeScript remains a project choice. The intended required stack is Gemini 3.5+ through a qualifying Google agent framework, with Cloud Run and Firestore as the planned Google Cloud services. Runtime evidence is still required.

## 13 August 2026 — Synthetic data

**Status:** active.
**Decision:** retain unmistakably labelled synthetic fixtures for deterministic tests and offline UI work. They are not field evidence and cannot support real trends, gaps, outreach, or measured relevance claims.

## Earlier — Reusable discovery framework

**Status:** superseded for hackathon execution.
The generalized framework and multiple-domain direction is deferred until the submission loop works.

## Earlier — Mock-first integration order

**Status:** superseded.
The former plan to complete broad mock workflow, permissions, memory, and UI foundations before Gemini and Cloud is no longer valid.

## Earlier — Broad permission modes

**Status:** narrowed.
Only mock memory review has a concrete approval check. Broader permission architecture is deferred until it can be enforced server-side.
