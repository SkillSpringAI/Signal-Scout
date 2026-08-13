# Decision Record

This is an append-only record. Superseded decisions remain labelled so they cannot be mistaken for current instructions.

## 13 August 2026 — Submission category (superseded)

**Status:** superseded later on 13 August 2026.
**Decision:** use **The Taskmaster** provisionally.
**Reason:** Signal Scout targets a bounded, multi-step research and synthesis chore and should progress from intake to a sourced Field Report with minimal hand-holding.

## 13 August 2026 — Final category direction

**Status:** active.
**Decision:** use **The Collaborative Partner**.
**Reason:** closer inspection of the official tracks showed a better fit with guided discovery, targeted clarification, feedback capture, and continuity across a builder's project, learning, and collaboration decisions. The implementation must demonstrate those behaviors rather than rely on a chatbot-style description.

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

## 13 August 2026 — Repository license

**Status:** active.
**Decision:** license Signal Scout under the canonical MIT License with `Copyright (c) 2026 Isac Thompson`.
**Reason:** Signal Scout is a hackathon and semi-personal tool for which broad reuse, modification, distribution, and commercial use are acceptable when the copyright and permission notice are retained. PathWarden’s separate custom license does not apply because no PathWarden implementation or asset was identified in Signal Scout.

## Earlier — Reusable discovery framework

**Status:** superseded for hackathon execution.
The generalized framework and multiple-domain direction is deferred until the submission loop works.

## Earlier — Mock-first integration order

**Status:** superseded.
The former plan to complete broad mock workflow, permissions, memory, and UI foundations before Gemini and Cloud is no longer valid.

## Earlier — Broad permission modes

**Status:** narrowed.
Only mock memory review has a concrete approval check. Broader permission architecture is deferred until it can be enforced server-side.
