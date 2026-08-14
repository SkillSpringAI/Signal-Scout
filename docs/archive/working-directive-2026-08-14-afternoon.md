# Signal Scout — Afternoon Working Directive

**Date:** 14 August 2026
**Status:** Completed and superseded — archived 14 August 2026
**Applies to:** Afternoon development session only
**Repository:** `SkillSpringAI/Signal-Scout`

> **Archive note:** All five afternoon stages were completed. Local preflight passed with 55 tests, typecheck, and production build. Permanent documentation was reconciled. This correction slice was not deployed; Cloud Run revision `signal-scout-00007-vb6` remains the verified public baseline.

> This document is the source of truth for the 14 August 2026 afternoon working session.
>
> Where older temporary handoffs, implementation notes, stale status statements, or outdated documentation conflict with this directive, **this directive governs the session**.
>
> Official hackathon rules remain authoritative over this document. Permanent architectural and scope documents remain authoritative where they accurately describe the currently verified implementation.
>
> This document must be archived, superseded, or removed after the afternoon slice is completed and permanent documentation has been reconciled.

## 1. Session objective

Do not expand Signal Scout's architecture merely because additional capability could be added.

The core submission architecture is now sufficiently implemented and verified. The purpose of this session is to convert that implementation into a clearer, more reliable, and more judge-ready product.

The afternoon priority is:

**judge clarity → graceful partial-result recovery → regression verification → documentation reconciliation**

The session should improve the experience and evidence around the existing bounded workflow rather than create another major backend slice.

---

## 2. Current verified baseline

Treat the following as the current implementation baseline unless new verification proves otherwise:

* public React/TypeScript application deployed on Google Cloud Run;
* Node/TypeScript API;
* Google GenAI SDK;
* Gemini 3.5 Flash;
* Firestore Native persistence;
* dedicated Cloud Run runtime identity;
* Gemini credential supplied server-side through Secret Manager;
* bounded public-source retrieval;
* URL, redirect, timeout, content-type, and response-size controls;
* structured schema validation;
* semantic validation of generated claims;
* explicit source provenance and collection metadata;
* separate `event` and `project` evidence roles;
* project constraints derived from builder context and project evidence rather than Signal Scout's own runtime;
* dual-source grounding where a claim combines event requirements with current project state;
* one bounded Collaborative Partner feedback turn;
* persisted adapted recommendation;
* deterministic mock mode kept visibly separate from the live evidence path;
* completed and partial scan records durably stored in Firestore;
* maintained architecture diagram representing the verified deployment;
* Cloud Run revision `signal-scout-00007-vb6` verified on 14 August 2026;
* preflight previously passed with 51 tests before the current deployed revision was verified.

### Known prototype limitation

Scan execution remains process-local.

If the Cloud Run container terminates while a scan is in flight, the job is not automatically resumed. Completed and partial Firestore records remain durable.

This is an accepted prototype limitation for the current hackathon scope unless testing demonstrates that it materially undermines the judge-facing workflow.

Do **not** introduce Pub/Sub, Cloud Tasks, distributed workers, job recovery infrastructure, or similar orchestration during this session without a demonstrated need.

---

## 3. Product boundary for this session

Signal Scout's canonical bounded loop remains:

```text
official hackathon URL
+ builder context
+ optional public project URLs

→ retrieve
→ extract
→ validate
→ cluster / synthesize
→ rank
→ generate Field Report
→ expose source-backed Activity and evidence
→ accept one bounded feedback turn
→ adapt one recommendation
```

The product is a bounded research and decision-support workflow.

It is **not** to become:

* a general-purpose chatbot;
* an unrestricted web crawler;
* a multi-agent system;
* a CRM;
* an automated outreach system;
* an authentication platform;
* a generalized governance kernel;
* a production-grade distributed job system;
* a broad project-management application.

---

## 4. Approved afternoon work

### Priority A — Improve live-input comprehension

The live workflow currently asks the user for useful information without explaining clearly enough what belongs in each field.

Correct this.

#### Builder Context

Provide concise guidance indicating that useful context may include:

* what the builder is currently creating;
* work already completed;
* project goals;
* technical or time constraints;
* technologies already chosen where relevant;
* decisions the builder wants help making.

Do not turn the field into a lengthy questionnaire.

The goal is simply to make a first-time user understand what useful context looks like.

#### Optional Public Project URLs

Explain briefly that supplying a public project URL allows Signal Scout to compare hackathon requirements against evidence of the project's current implementation.

Provide a concrete example such as a public GitHub repository or public project page where appropriate.

Do not imply that Signal Scout can inspect private repositories or authenticated resources.

---

## 5. Replace internal terminology with user outcomes

Existing testing has repeatedly shown that some interface language describes Signal Scout's internal implementation instead of explaining what it is doing for the builder.

Correct repeatable comprehension problems where changes are narrow and evidence-supported.

Examples requiring review include:

* `Patterns`;
* `Clusters and gaps`;
* `CLUSTER`;
* `Retrieving allowlisted public inputs`;
* duplicated or ambiguous `retrieving` activity states;
* `Running Gemini structured analysis through Google GenAI SDK`;
* `Validated structured output against the server schema`;
* `Connecting the analysis to preserved source provenance`.

Prefer plain outcome language.

Candidate direction:

* `Patterns` → `Findings`
* `Clusters and gaps` → `Requirements and strategic gaps`
* `Retrieving allowlisted public inputs` → `Checking the public sources you provided`
* schema-validation language → wording explaining that findings, required fields, and source links were checked
* provenance language → `Linking each finding to the source that supports it`

These are candidate directions, not immutable strings. Preserve technical accuracy.

Do not hide material operations or falsely simplify what occurred.

---

## 6. Improve partial-result recovery

This is the highest-value functional refinement approved for the afternoon.

Current semantic validation correctly rejects unsupported or conflicting recommendations. That fail-closed behaviour should remain.

The problem is presentation.

A rejected analysis should not make successfully collected and preserved evidence appear to have been lost.

### Target user-facing state

Where sources were collected successfully but recommendations were withheld:

**Headline direction:**

`Sources collected; recommendations withheld`

Explain that:

* the supplied sources were collected successfully;
* Signal Scout did not expose the recommendation because validation detected an unsupported or conflicting claim;
* preserved sources remain available;
* the failure occurred in analysis validation, not source collection.

Where practical, provide a deliberate bounded action such as:

`Retry analysis with the same sources`

Do not silently retry indefinitely.

### Technical details

Exact validator messages may remain accessible for debugging or transparency but should not dominate the main user-facing state.

Avoid:

* duplicate presentation of the same validator error;
* exposing internal terminology as the primary explanation;
* representing a safe rejection as a complete system failure.

Preserve fail-closed semantic validation.

---

## 7. Regression verification

After approved corrections, verify behaviour against established cases rather than inventing a new feature matrix.

At minimum review:

### Neutral project / different hackathon

Confirm that Signal Scout does **not** impose:

* Google GenAI SDK;
* Gemini;
* Cloud Run;
* Firestore;
* or other Signal Scout runtime technologies

onto a project when the user and project evidence have not established those technologies as project constraints.

### Event + real project evidence

Confirm that:

* event requirements use event evidence;
* current implementation claims use project evidence;
* combined requirement/current-state gaps are grounded in both where necessary;
* Signal Scout does not claim a project lacks something merely because the event requires it.

### Explicit project constraints

Confirm that genuinely supplied or evidenced project constraints remain respected.

Alternative technologies must not be recommended without a concrete incompatibility or unmet requirement.

### Feedback adaptation

Confirm that:

* one bounded feedback turn is accepted;
* the recommendation actually adapts;
* the adapted recommendation remains evidence-grounded;
* a second feedback request remains rejected according to the current one-turn boundary.

### Partial validation case

Confirm that:

* unsupported analysis still fails closed;
* collected sources remain visible/preserved;
* the user-facing explanation distinguishes collection success from recommendation rejection;
* technical detail is secondary;
* any retry action is deliberate and bounded.

---

## 8. Documentation reconciliation

Documentation must be corrected during this session where it conflicts with verified current state.

Do not perform broad prose rewriting for its own sake.

### `docs/submission-compliance.md`

This file is currently stale.

Correct at least:

* `Last reviewed` → 14 August 2026 once verification is performed;
* Cloud Run deployment evidence from old revision `signal-scout-00004-9hl` to the currently verified revision `signal-scout-00007-vb6`;
* any local-only wording that is now superseded by verified deployed evidence;
* architecture-diagram status if necessary;
* current end-to-end deployment evidence.

Do not mark unfinished submission tasks complete without evidence.

The following should remain incomplete until genuinely done:

* final Devpost category reconfirmation;
* unedited live action recording;
* public video;
* English audio/subtitle verification;
* third-party/source-rights review;
* pre-existing-work disclosures;
* final submission freeze;
* optional bonus requirements not actually completed.

### `README.md`

Check that the status statement accurately reflects the verified deployment after today's changes.

Do not inflate claims.

### `docs/architecture.md`

Only update if today's implementation changes an actual component boundary, trust boundary, runtime path, or material limitation.

Copy changes and terminology cleanup alone do **not** require an architecture rewrite.

### `docs/architecture-diagram.md`

Update only if implemented architecture or data flow changes.

Do not redraw the architecture diagram for cosmetic UI changes.

### Evidence and handoff documents

Update evidence records with new verification where appropriate.

Old evidence should normally remain historical evidence rather than being rewritten to pretend it described the newer revision.

Temporary handoff documents whose purpose has been completed should be clearly marked superseded, archived, or removed according to the project's existing documentation discipline.

---

## 9. Architecture freeze

For this afternoon, the following are explicitly deferred unless a discovered defect makes one unavoidable:

* multiple agents;
* agent routing;
* generalized domain packs;
* broad crawling;
* Devpost-wide indexing;
* social graphs;
* automated outreach;
* automated publishing;
* CRM functionality;
* authentication;
* capability-token systems;
* generalized permission architecture;
* additional Gemini or Google models;
* generalized import/export;
* production job orchestration;
* major UI redesign;
* speculative enterprise functionality.

Do not add functionality merely to make the architecture look more sophisticated.

Architectural discipline is currently a strength.

Protect it.

---

## 10. Testing and acceptance gate

Before considering the afternoon correction slice complete:

1. run targeted tests for changed behaviour;
2. run the full regression suite;
3. run:

```bash
npm run preflight
```

This must execute:

```text
typecheck
→ tests
→ production build
```

4. verify the public deployed workflow if deployment occurred;
5. verify the neutral-project boundary;
6. verify event/project evidence separation;
7. verify the bounded feedback turn;
8. verify partial-result presentation if modified;
9. inspect relevant deployed error logs where appropriate;
10. reconcile permanent documentation with the verified result.

A passing build alone is not sufficient if the behavioural regression cases fail.

---

## 11. Deployment discipline

Do not deploy automatically merely because local checks pass.

Deployment should follow the repository's existing approval discipline.

If deployment is authorized:

* preserve the existing server-side credential boundary;
* preserve the dedicated runtime identity;
* preserve Secret Manager use;
* preserve Firestore access boundaries;
* preserve current bounded scaling unless a specific reason exists to change it;
* record the resulting Cloud Run revision;
* run deployed behavioural verification;
* update evidence and documentation to the actual deployed revision.

Do not document an intended revision or intended behaviour as verified.

---

## 12. Evidence discipline

Continue distinguishing:

* implementation fact;
* deployed verification;
* observed user behaviour;
* model variance;
* known limitation;
* proposed correction.

Do not convert a single odd generation into a product defect without supporting repetition or a clear architectural cause.

Conversely, repeated terminology and comprehension problems already observed across multiple cases may be treated as product-level evidence rather than dismissed as model variance.

Maintain the existing rule:

**claims about event requirements require event evidence; claims about project state require project evidence; claims combining both require adequate evidence for both sides.**

---

## 13. Definition of done for this afternoon

The afternoon session is successful when:

* live inputs are easier for a first-time user to understand;
* repeated internal terminology problems are reduced;
* semantic rejection remains fail-closed;
* partial results communicate retained value rather than appearing as total failure;
* the established regression cases still pass;
* no Signal Scout runtime metadata leaks into unrelated analysed projects;
* feedback remains bounded and evidence-grounded;
* `npm run preflight` passes;
* relevant deployed verification passes if a deployment occurs;
* stale permanent documentation is reconciled with the current verified state;
* no major deferred feature has been introduced without evidence of necessity.

---

## 14. Stop condition

Once the acceptance criteria above are met, **stop the implementation slice**.

Do not immediately begin another backend architecture feature.

The next phase should increasingly prioritize:

* demo reliability;
* judge comprehension;
* submission narrative;
* live recording preparation;
* evidence capture;
* rights and disclosure checks;
* final Devpost completeness.

The remaining challenge is increasingly to demonstrate the existing system clearly and credibly, not to make Signal Scout larger.

---

## 15. Authority and expiry

For the remainder of the 14 August 2026 afternoon session:

1. official All Things Agentic rules and requirements remain the highest external authority;
2. this temporary directive governs today's implementation priorities and resolves conflicts with stale temporary working notes;
3. verified permanent architecture, scope, safety, and evidence documents remain authoritative where they do not conflict with newer verified implementation facts;
4. historical evidence remains historical and must not be rewritten as though it originated from the current revision;
5. no documentation claim becomes verified merely because this directive states that it should be checked.

At the end of the session:

* reconcile permanent documentation;
* record final verification evidence;
* mark this directive **completed/superseded**;
* do not allow it to become a second permanent roadmap.

**Final session rule:** improve the clarity and resilience of the bounded workflow already built. Do not solve tomorrow's hypothetical problems at the expense of today's demonstrable product.
