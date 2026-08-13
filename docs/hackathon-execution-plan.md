# Hackathon Execution Plan

> **Authoritative execution document.** Updated and verified against the official Devpost pages on 13 August 2026. If this document conflicts with official rules, the official rules win.

## Official baseline

- Official overview and requirements: https://allthingsagentichackathon.devpost.com/
- Official rules: https://allthingsagentichackathon.devpost.com/rules
- Official schedule: https://allthingsagentichackathon.devpost.com/details/dates
- Official resources: https://allthingsagentichackathon.devpost.com/resources
- Official FAQ: https://allthingsagentichackathon.devpost.com/details/faqs
- Submission period: 3 August 2026 at 9:00 AM PT through 31 August 2026 at 5:00 PM PT, as stated in the binding rules (the corrective directive's 4 August baseline is superseded by this official source)
- New Zealand display: 1 September 2026 at 12:00 PM GMT+12/NZST; confirm against the official countdown before submission
- Project must be newly created during the submission period; allowed pre-existing frameworks/assets and other incorporated pre-existing work must be disclosed as required by the rules
- Mandatory model: Gemini 3.5 or newer through Gemini API or Vertex AI
- Mandatory agent framework: at least one of Google ADK, Google GenAI SDK, Antigravity SDK, or Genkit
- Mandatory infrastructure: at least one Google Cloud infrastructure service such as Cloud Run, Cloud SQL, Firestore, GKE, or Pub/Sub
- Select one category; selected choice: **The Collaborative Partner**
- Submission requires repository access, reproducible spin-up instructions, an accurate architecture diagram, and an approximately four-minute demo video
- The demo must show the app in action and visible proof that the backend ran on Google Cloud
- Judging rubric: Innovation & Operational Utility 40%; Architectural Discipline & Tech Stack 30%; Demo & Production Readiness 30%

The corrective directive additionally requires the final public video to be no longer than four minutes, public on YouTube or Vimeo, in English or with English subtitles, and to contain an unedited live execution. These details must be reconfirmed against the rules/FAQ immediately before recording.

## Category fit

The Collaborative Partner is the selected category because Signal Scout should guide the builder through sourced findings, ask targeted clarifying questions, capture feedback, and use prior scan context to adapt later project, learning, and collaboration recommendations. It must still perform a bounded multi-step workflow and cannot qualify through conversational copy alone.

Signal Scout must not be described as multi-agent unless independently scoped agents with real routing and recovery are implemented.

## Canonical target

Signal Scout autonomously turns a hackathon and a builder's goals into a sourced field analysis, strategic project gaps, a learning shortlist, and an actionable build plan, while preserving a visible trace of every source and processing step.

```text
official hackathon URL + builder context + optional project URLs
  -> retrieve -> extract -> validate -> cluster -> rank
  -> generate Field Report -> expose activity and evidence
```

## Authoritative implementation order

1. Documentation truth pass and official requirements checklist
2. Minimal Node backend and typed API contract
3. One qualifying Google agent framework
4. Gemini 3.5+ structured extraction for one real input
5. Source provenance and validation
6. Cloud Run deployment
7. Firestore or another justified Google Cloud service for scan/activity/report state
8. One real end-to-end workflow
9. Failure handling, retry limits, and partial results
10. Accurate architecture diagram, reproducible setup, deployment proof, and live demo preparation
11. Optional UI polish, broader sources, additional models, or generalized domain packs

Use local development to control cost, but establish the required integration and deployment spine early. The mock service remains only for deterministic tests and offline UI development.

## Gate discipline

After every gate, run its checks and report files inspected and changed, removed facts and superseded directions, downgraded claims, new authoritative documents, exact commands, test/build results, uncertainties, and a pass recommendation. Do not continue if acceptance criteria are not met. Do not commit, push, tag, or open a pull request without explicit authorization.
