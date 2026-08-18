# Signal-Scout: Tuesday Gap-Closure Plan
**Date:** Tuesday, 18 August 2026  
**Target:** Begin demo production Friday, 21 August  
**Primary objective:** Close trust and implementation gaps before demo work begins. Do not expand scope merely because additional Cloud budget is available.

> **Working status:** This document is the project source of truth. Check off items only when supported by repository, test, deployed-runtime, or captured-evidence verification.

## 1. Current Baseline

### Infrastructure
- Google Cloud promotional credit successfully redeemed.
- **NZ$259.29** Cloud credit available.
- Credit valid **17 August to 17 October 2026**.
- Treat this as infrastructure funding, not Gemini inference funding.
- Gemini API remains separately funded through AI Studio.
- Cloud Run, Firestore and the existing Google Cloud deployment remain the live infrastructure path.

### Gemini API
AI Studio currently shows:

- **Gemini 3.5 Flash**
- Tier 1
- Approximately 50 live API requests across the recent test period.
- **2 recorded 429 TooManyRequests errors** around 13 August.
- Overall success rate otherwise effectively 100%.
- Peak daily input usage approximately **60K tokens**.
- Peak daily output usage approximately **55K tokens**.
- **Total API cost: $2.50** from 22 July to 18 August.
- Current testing costs are therefore small enough that API expenditure is not a meaningful blocker for demo verification.

Additional API funding can be added later, but it should not justify unnecessary calls or feature expansion.

---

# 2. Today's Rule

**Do not add features until we know exactly what Signal-Scout currently promises, what it actually executes Live, and where those two diverge.**

Today's work is therefore:

**Audit → classify → correct → verify → freeze the demo-capable baseline.**

---

# 3. Gate One: Establish the Exact Current State

Before changing code, inspect the current repository and deployed implementation.

Confirm:

- Current branch and latest relevant commits.
- Current production build passes.
- Current automated tests pass.
- Current Cloud Run deployment corresponds to the intended code.
- Gemini live runtime works.
- Firestore persistence works.
- Feedback persistence works.
- Adapted recommendation works.
- Targeted clarification works.
- Activity events persist correctly.
- Retry handling still covers 429/5xx failures.
- Schema and semantic validation still fail safely.
- Mock and Live modes remain clearly identifiable internally.

### Verification log — 18 August 2026

- Repository: `main` at `aca2016`, matching `origin/main` at the start of the audit. The only initial working-tree change was this source-of-truth document.
- Relevant deployed code baseline: `c46d059`. All later committed changes through `aca2016` affect documentation only.
- Local preflight: passed on Node project baseline with typecheck, **14/14 test files and 68/68 tests**, and the Vite/server production build.
- Public health: `GET /api/health` returned `{ "ok": true, "service": "signal-scout-api" }`.
- Cloud Run: revision `signal-scout-00011-zx8` remains ready and serves **100%** of traffic with maximum scale 2.
- Durable deployed proof: golden scan `e543fe32-96fa-458c-af5e-a9ea61706a58` remains readable through the deployed API with status `completed`, event and project evidence roles, 8 Activity events, 5 requirements, 3 judging criteria, 2 strategic gaps, and one persisted feedback turn containing `Changed because`, two supporting sources, and one clarification.
- Retry and validation: local tests cover one retry for transient `429`/`500`/`502`/`503`/`504` and provider-equivalent errors; malformed schema/semantic output is not retried and recommendations are withheld.
- The fresh deployed golden workflow and observed transient-failure paths are now verified; broader Gate Six cases remain Wednesday work.
- Final candidate verification: commit `bfbec5b` is deployed as `signal-scout-00014-rhj` at 100% traffic. Health, configuration preservation, Firestore persistence, transient analysis/feedback retries, one deliberate analysis retry, feedback adaptation, clarification persistence, and the one-response limit passed against scan `689924a1-2fdd-456f-9479-0a5b5b5899f0`.

### Output

Create a short factual capability inventory:

| Capability | Mock | Live | Verified | Demo-safe |
|---|---|---|---|---|
| Hackathon analysis | Synthetic fixture | Yes | Local tests + deployed golden record | Yes, pending fresh golden run |
| Project analysis | Synthetic fixture | Yes, public GitHub evidence | Local tests + deployed golden record | Yes, pending fresh golden run |
| Evidence gathering | Synthetic fixture | Yes, allowlisted public Devpost/GitHub sources | Local tests + deployed golden record | Yes within stated source limits |
| Builder feedback | Concept/local mock state | Yes, one bounded turn | Local tests + deployed persisted turn | Yes within one-turn boundary |
| Guided adaptation | Concept/local mock state | Yes, one sourced recommendation + one clarification | Local tests + deployed persisted turn | Yes within one-turn boundary |
| Historical hackathon/project intelligence | Synthetic fixture only | No | Code inventory | No; concept only |
| Networking assistance | Suggested synthetic plan only | No autonomous outreach | Code inventory | No; guided concept only |
| Cross-run user memory | Browser-local fixture state | No account/project identity | Code and persistence inventory | No; boundary must remain explicit |

**Nothing gets marked Live because the mock demonstrates it. Live means we can execute and verify it against the deployed runtime.**

---

# 4. Gate Two: Fix the Mock vs Live Trust Gap

This is today's highest-priority product issue.

The mock currently demonstrates a broader vision of Signal-Scout than the Live runtime implements.

That is acceptable.

Allowing users to reasonably believe those capabilities are already executable is not.

## Required distinction

Every meaningful capability should resolve to one of three states:

### LIVE
Implemented and executable using real sources/runtime.

### GUIDED / CONSTRAINED
Signal-Scout can reason about or recommend the action but cannot autonomously complete the entire workflow.

### CONCEPT / MOCK
Demonstrates intended future Signal-Scout behaviour but is not currently implemented in the Live runtime.

### Approval language

Review mock approvals carefully.

Avoid language where:

> Approved

could reasonably mean:

> Signal-Scout will now execute this action.

Where necessary distinguish:

**Concept approval recorded**

from:

**Approved for execution**

### Acceptance test

A first-time user should be able to move between Mock and Live without developing a materially incorrect understanding of what Signal-Scout can actually do.

If we cannot confidently say that, the gap is not closed.

### Audit status — 18 August 2026

- The global execution selector, sidebar identity, synthetic fixture labels, and Live-only backend rendering already make the primary mode boundary explicit.
- One residual trust gap was identified in Mock memory/approval language: unqualified references to saving, long-term memory, and an approved decision could imply durable Live execution.
- Local copy now describes these actions as **CONCEPT / MOCK**, records a concept decision, and states that only browser-local synthetic fixture state changes.
- Post-change verification passed: typecheck, 68/68 tests, production build, rendered Mock memory/activity inspection, rendered switch to Live, and zero browser console warnings/errors. Gate Two still requires the broader first-time-user acceptance pass during the golden workflow.
- The 18 August deployed golden walkthrough exposed a second trust/interaction gap: after generating a targeted clarification, the only feedback control was disabled, so the user could not answer the question presented by Signal Scout.
- Local correction: the adapted recommendation now exposes one Enter-submittable clarification-response form. The answer is schema-validated, persisted to the existing feedback entry, and recorded in Activity without another Gemini call. A second clarification response is rejected. This preserves the one-model-feedback-turn cost boundary.
- Clarification correction verification passed locally with **15/15 test files and 73/73 tests**, production builds, rendered component checks for enabled and persisted states, and a rebuilt-browser console check with no warnings/errors. Deployed verification remains pending.

---

# 5. Gate Three: Define Persistence Correctly

Do not call the existing problem simply "persistence."

Signal-Scout already has durable persistence in parts of the live workflow.

The missing capability appears to be closer to:

**authenticated user/project continuity across independent runs.**

Current approximate model:

`run → persisted scan/feedback/activity`

Potential future model:

`user → projects → runs → feedback → decisions → relevant project memory`

## Today's investigation

Determine exactly what survives:

- Browser refresh.
- New scan.
- New session.
- Cloud Run instance shutdown/restart.
- Different browser/device.
- Completely new visit.
- Reopening an existing project.

Document the boundary.

### Established persistence boundary — 18 August 2026

| Situation | Mock | Live |
|---|---|---|
| Browser refresh | Local fixture state hydrates from `localStorage` in the same browser | The current UI loses its in-memory scan handle; the Firestore scan record survives |
| New scan | Mutates/replaces browser-local fixture workflow state | Creates an independent Firestore scan document |
| New browser session | Same-browser `localStorage` can hydrate until reset/cleared | No scan history or discovery; a known scan UUID remains readable through the API |
| Cloud Run shutdown/restart | Not applicable | Completed/partial Firestore records survive; in-flight process-local work is not resumed |
| Different browser/device | No continuity | No account-based discovery or continuity |
| Completely new visit | Seed fixture or same-browser local state | Starts without prior scan context |
| Reopen existing project | No project entity; fixture only | Not supported as a project workflow; a new scan must be created |

Live persistence is therefore accurately described as **durable scan/feedback/activity records**, not authenticated user or project memory.

---

# 6. Authentication / Persistent Memory Go-No-Go Gate

We do **not** automatically implement authentication this week.

First estimate the smallest implementation that would achieve:

> A returning authenticated builder can reopen Signal-Scout and continue working with their existing projects and relevant project context.

### GO only if:

- Existing architecture supports it cleanly.
- Authentication can use a standard mechanism.
- Existing Firestore data can be associated with users/projects without substantial migration complexity.
- Security rules can be made defensible.
- It does not destabilise the current Live workflow.
- It can be implemented and thoroughly tested before Thursday's freeze.
- It materially improves the demo or Collaborative Partner case.

### NO-GO if:

- It requires significant schema redesign.
- It requires improvised identity/device tracking.
- It introduces substantial security complexity.
- It threatens the stable Firestore workflow.
- Testing would spill into demo production.
- We are implementing it primarily because it sounds impressive.

If NO-GO:

Document **authenticated project continuity** as post-hackathon product work and make the current boundary explicit.

That is completely acceptable.

### Decision — 18 August 2026: NO-GO for this hackathon

The current model stores top-level scan documents keyed by UUID and has no user, account, ownership, project, membership, or scan-listing model. A defensible authenticated-continuity implementation would require an identity provider, frontend token handling, server-side token verification, ownership fields and access checks, user/project indexing, existing-record policy or migration, and security testing. That is a material schema and security slice close to the Thursday freeze and does not improve the already-demonstrable bounded feedback loop enough to justify the risk.

**Authenticated project continuity is deferred to post-hackathon product work.** The current durable-scan boundary must remain explicit in product and submission language.

---

# 7. Gate Four: Re-run the Golden Live Workflow

Once corrections are made, perform the complete Live test.

### Test inputs

**Hackathon**
All Things Agentic

**Project**
Signal-Scout repository

### Verify

- Correct event detected.
- Correct project detected.
- Activity populated.
- Two evidence roles present where expected.
- Requirements extracted.
- Criteria extracted.
- Findings use both relevant sources.
- Opportunities generated.
- Uncertainties explicitly represented.
- Field Report generated.
- No Mock-only capability presented as executed Live functionality.

### Feedback turn

Submit:

> I have limited time, so prioritize the smallest demo-critical implementation that proves guided adaptation.

Verify:

- Recommendation changes.
- "Changed because" appears correctly.
- Supporting evidence remains available.
- Clarification is generated where appropriate.
- Feedback persists.
- Only the supported number of feedback turns is available.
- Activity correctly records the interaction.

### Walkthrough status — 18 August 2026

The user-provided deployed screenshots demonstrate a completed two-source All Things Agentic scan with requirements, criteria, findings, opportunities, uncertainties, Field Report, Activity, one adapted recommendation, `Changed because`, two evidence links, and one generated clarification. The walkthrough did **not** pass the complete acceptance gate because the generated clarification could not be answered. The local correction is complete, but Gate Four remains open until the correction is deployed and the same workflow—including the persisted clarification response—is rerun against that revision.

Deployment verification on revision `signal-scout-00012-qh4` produced a safe `partial` scan after Gemini exhausted its bounded `503 UNAVAILABLE` retry path. Both sources were preserved and analysis was withheld. The deliberate retry then exposed a Firestore-only defect: optional `analysis`/`error` fields were assigned `undefined`, which Firestore rejected. The scan remained unchanged and partial. The local fix deletes those optional fields before the conditional write; regression and full preflight verification pass. A replacement revision and repeated deployed retry are required before Gate Four closes.

Revision `signal-scout-00013-7z5` verified the Firestore retry correction against the preserved scan: the scan reused both sources and completed. The subsequent feedback request encountered `503 UNAVAILABLE` and exposed that feedback adaptation did not share the analysis path's bounded transient retry policy. No feedback was persisted. The local correction applies the same configured retry bound to feedback and records a warning Activity event before retrying. Replacement deployment and feedback/clarification verification remain required.

Revision `signal-scout-00014-rhj` is the verified gap-closure candidate. The same scan completed, feedback survived a real transient `503` through the new bounded retry, the adapted recommendation preserved both evidence sources and `Changed because`, and one clarification answer persisted without another model call. A second clarification response returned HTTP 409. Gate Four is complete for the deployed API/runtime path; clean final UI screenshots remain evidence-capture work rather than an implementation blocker.

---

# 8. Gate Five: Different Hackathon Test

Use another public Devpost hackathon with the same Signal-Scout repository.

Verify:

- Event changes.
- Requirements change.
- Criteria change.
- Findings change.
- Opportunities respond to the new event.
- Sidebar/event card changes.
- No All Things Agentic hard-coding leaks into the result.

This test is particularly important for demonstrating that Signal-Scout is a system rather than a scripted hackathon demo.

---

# 9. Gate Six: Failure and Partial-Collection Testing

Test known imperfect conditions.

At minimum:

- One source unavailable.
- Partial project collection.
- Invalid project URL.
- Invalid event URL.
- Gemini 429/retry path.
- Gemini failure after retry exhaustion.
- Schema-invalid model response.
- Firestore write/read failure where practical.
- Refresh/revisit behaviour.

Signal-Scout should prefer:

**uncertainty, partial result, retry, or explicit failure**

over fabricated completeness.

---

# 10. Wednesday Target

By the end of Wednesday we should know:

- Exact Live capability boundary.
- Exact Mock capability boundary.
- Whether authentication/project continuity is GO or NO-GO.
- Whether any misleading capability language remains.
- Whether the primary Live workflow survives repeated testing.
- Whether the second-hackathon workflow works.
- Whether known failure paths behave acceptably.

Wednesday should be the last reasonable point for accepting a meaningful architectural change.

### Remaining Wednesday work — recorded 18 August 2026

- Review and deploy the local Mock/Live trust-copy and clarification-response corrections as one controlled revision.
- Rerun the full golden Live workflow against that revision and record revision, scan ID, feedback, clarification answer, persistence, Activity, and clean screenshots.
- Resolve or explicitly classify any remaining incorrect golden-analysis claims before treating the output as demo-safe.
- Run the different-hackathon test.
- Complete the selected failure and partial-collection tests.
- Reconcile the final evidence ledger and source-of-truth checkboxes before Thursday freeze verification.

---

# 11. Thursday: Demo Freeze

Thursday is primarily verification and cleanup.

### Required before freeze

- Typecheck passes.
- Full automated test suite passes.
- Production build passes.
- Clean deployment succeeds.
- Golden workflow passes against deployed Cloud Run.
- Different-hackathon test passes.
- Feedback/adaptation test passes.
- Persistence boundary documented.
- Mock/Live distinction verified.
- No known demo-critical defect remains.
- Cloud billing checked.
- Gemini billing checked.
- Correct deployed revision recorded.

### Freeze rule

After the Thursday candidate passes:

**No feature additions.**

Only fix:

- Demo blockers.
- Incorrect claims.
- Serious UX problems.
- Security issues.
- Regressions.

---

# 12. Friday: Begin Demo Production

Friday switches the project from engineering mode into evidence mode.

The demo should prove a small number of things extremely clearly rather than attempt to show everything.

### Core story

**1. Give Signal-Scout a real opportunity and real project.**

↓

**2. Signal-Scout gathers evidence and determines what matters.**

↓

**3. It identifies requirements, opportunities and uncertainty.**

↓

**4. The builder provides feedback.**

↓

**5. Signal-Scout adapts its recommendation and explains why it changed.**

↓

**6. Activity/evidence makes the process inspectable.**

That is already a credible Collaborative Partner story.

Do not use the demo to imply that Mock-only networking or historical intelligence is operational.

Mock capabilities can appear if clearly labelled as concept/future capability.

---

# 13. Evidence to Capture During Verification

Do not wait until Friday to discover we forgot evidence.

Capture clean screenshots/video evidence of:

- Initial Live state.
- Event + repository submission.
- Activity progression.
- Evidence collection.
- Requirements.
- Criteria.
- Findings.
- Opportunities.
- Uncertainty.
- Field Report.
- Feedback submission.
- Changed recommendation.
- "Changed because."
- Supporting evidence.
- Clarification.
- Persistence after refresh/revisit where supported.
- Second hackathon producing different results.
- Mock/Live capability distinction.
- Cloud Run deployment/runtime where useful.
- Relevant Google Cloud architecture.

Keep screenshots free of:

- API keys.
- Secret values.
- Billing identifiers.
- Personal account information.
- Irrelevant browser clutter.

---

# 14. After Demo Completion

Once the demo is:

**recorded → edited → reviewed → polished → uploaded**

we stop changing the product unless something is demonstrably broken.

Then shift attention to submission quality.

## Repository pass

Review:

- README.
- Repository description.
- Architecture diagram.
- Setup instructions.
- Live vs Mock explanation.
- Google Cloud services used.
- Gemini integration.
- Agent workflow.
- Evidence model.
- Persistence model.
- Limitations.
- Security considerations.
- Testing.
- Demo link.
- Screenshots.
- Hackathon requirements.
- Correct licensing.
- No stale/outdated documentation.
- No contradictory architecture documents.

The repository should describe **what exists**, not what we once intended to build.

---

# 15. Submission Pass

Map the final project explicitly against the hackathon judging requirements.

For every major requirement, identify:

**Requirement → implementation → repository evidence → demo evidence**

Do not make judges infer the connection.

---

# 16. Explicitly Deferred Product Work

Unless today's investigation produces an unusually cheap win, defer:

- Full authentication/account system.
- Cross-device user memory.
- Long-term project memory.
- Historical completed-hackathon intelligence.
- Automated networking assistance.
- Broader GitHub/project monitoring.
- Android/Google Play application.
- Subscription billing.
- Pricing tiers.
- Notifications.
- Multi-project portfolio intelligence.
- Production-scale analytics.
- Extensive new agent capabilities.

These are **post-hackathon productisation questions**, not missing requirements for a valid hackathon submission.

---

# 17. Post-Hackathon Product Question

After submission, Signal-Scout should no longer automatically be treated as a disposable portfolio project.

The next question becomes:

> **Does real usage provide enough evidence that Signal-Scout should become a maintained product?**

If yes, the likely foundation becomes:

`Account`

↓

`Projects`

↓

`Opportunity / event intelligence`

↓

`Evidence`

↓

`Recommendations`

↓

`Builder feedback`

↓

`Persistent project context`

↓

`Change detection / future opportunities`

Mobile, subscriptions and broader agent capabilities should be evaluated **after this recurring value loop is demonstrated**.

---

# Definition of Done for Today

By the end of today's session we want:

- [x] Current repo/runtime baseline verified.
- [x] Live capabilities inventoried.
- [x] Mock capabilities inventoried.
- [x] Mock-vs-Live misleading promises identified.
- [x] Necessary capability labels/copy corrected.
- [x] Existing persistence boundary established.
- [x] Authentication/project-memory complexity assessed.
- [x] Authentication decision recorded as GO or NO-GO.
- [x] Golden Live workflow rerun after corrections.
- [x] Remaining Wednesday work explicitly identified.
- [x] No unnecessary scope added.

**Today's success is not measured by how much new functionality we build. It is measured by whether, by tonight, we know exactly what Signal-Scout does, can prove that it does it, and can safely begin converging on Friday's demo.**
