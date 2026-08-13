# Product Blueprint

> **Current status:** tested local mock UI plus a Node/TypeScript API spine with bounded retrieval, job states, schema validation, Google GenAI SDK integration code, optional Firestore persistence, and container packaging. Credentialed Gemini execution, live UI integration, Firestore runtime evidence, and Google Cloud deployment remain unverified.

## Target proposition

Signal Scout autonomously turns a hackathon and a builder's goals into a sourced field analysis, strategic project gaps, a learning shortlist, and an actionable build plan, while preserving a visible trace of every source and processing step.

This is the target submission capability until the real end-to-end workflow exists.

## User and friction

The target user is a builder who would otherwise manually inspect rules, project pages, resources, and scattered notes to decide what to build and learn. Signal Scout should complete a bounded research and synthesis workflow with minimal hand-holding.

## Target loop

```text
official hackathon URL + builder context + optional project URLs
  -> retrieve -> extract -> validate -> cluster -> rank
  -> generate Field Report -> expose activity and evidence
```

The final proof artifact is a sourced Field Report containing the verified event constraints, evidence-linked observations, strategic gaps, a project/learning shortlist, an actionable build plan, and the Activity trail.

## Product boundaries

Signal Scout is not currently a multi-agent system. It is not a general crawler, CRM, social graph, automated outreach product, reusable ecosystem platform, or production-ready service. Domain-neutral types in the prototype are implementation details, not evidence that generalized domain packs work.

Potential generalized discovery features belong after the hackathon and must not distract from the demonstrated loop.
