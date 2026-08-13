# Product Blueprint

> **Current status:** the bounded live workflow is implemented and publicly deployed through Cloud Run, Gemini 3.5 Flash, the Google GenAI SDK, and Firestore Native. A visibly separated deterministic mock mode remains for testing and offline demonstration.

## Implemented proposition

Signal Scout autonomously turns a hackathon and a builder's goals into a sourced field analysis, strategic project gaps, a learning shortlist, and an actionable build plan, while preserving a visible trace of every source and processing step.

This capability has been verified end to end with a real official source, persisted analysis, visible Activity evidence, and one bounded feedback adaptation. Submission media must still demonstrate it clearly and honestly.

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
