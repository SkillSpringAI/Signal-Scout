# Temporary Working Document — Judge Readiness and Demo Evidence

> **Purpose:** operational plan for the post-deployment judge-readiness slice. This is not an authoritative roadmap and should be archived when the slice closes.
>
> **Starting checkpoint:** `16d4df2` / `checkpoint-gate2-cloud-run-deployed`
> **Started:** 13 August 2026
> **Selected category:** The Collaborative Partner

## Core objective

Can a judge open Signal Scout, understand it quickly, run one convincing live workflow, give feedback, see the recommendation adapt, and inspect the evidence without a verbal architecture explanation?

## Exit criteria

The slice is complete only when:

- a first-time judge can identify the product purpose, live/mock distinction, primary action, and evidence path without narration;
- one rehearsable live workflow completes reliably and produces useful, non-repetitive findings;
- one feedback turn visibly shows what changed, why it changed, its supporting evidence, and the next clarification;
- findings, evidence, uncertainties, and recommended next actions are visually distinct;
- cancellation, unreachable or malformed sources, partial retrieval, model rejection/failure, and container interruption end in honest UI states;
- eligibility and prior-work claims have named evidence owners and captured artifacts;
- the repository license is an intentional recorded decision;
- the demo evidence ledger contains exact identifiers and an explicit screenshot/recording checklist;
- preflight, clean-checkout reproduction, deployed verification, and dependency-risk review are current.

Do not stage, commit, push, tag, or redeploy until the user reviews the slice results and explicitly approves the action.

## Work sequence

### 1. Establish the judge baseline

- open the deployed service as a first-time visitor;
- record what the product claims, where the primary action appears, and whether live/mock mode is immediately clear;
- time the path from page load to starting a live scan;
- record any terminology that requires architecture knowledge;
- inspect desktop and narrow viewport presentation;
- capture the current baseline before UI changes.

Done when the initial comprehension problems are recorded as observable findings rather than assumptions.

**Baseline result — 13 August 2026:** complete for first desktop access.

- Strength: mock-first presentation gives a first-time user a useful guided understanding of the workflow.
- Issue: live mode does not make the expected builder context or the effect of optional project URLs clear.
- Issue: `Patterns / Clusters and gaps` is confusing internal terminology; `CLUSTER` also appears in the mock hero.
- Evidence: `docs/evidence/judge-baseline/01-live-input-confusion.png`, `02-patterns-clusters-navigation.png`, and `03-mock-first-onboarding.png`.
- Provisional direction: retain an unmistakably labelled example path; add input examples and outcome explanations in live mode; test plain-language navigation such as `Findings / Requirements and strategic gaps` before finalizing copy.

### 2. Real public scan quality matrix

Use public pages only. Do not test private, authenticated, or personally sensitive sources.

| Case | Input type | Purpose | Record |
|---|---|---|---|
| A | Official hackathon overview | Golden-path baseline | usefulness, grounding, repetition, uncertainty, completion time |
| B | Official rules/details page | Dense requirements | missed constraints, duplication, evidence quality |
| C | Another public hackathon/event | Generalization | event-name accuracy, useful gaps, stack leakage |
| D | Official page plus public project URL | Comparative context | whether project evidence changes recommendations |
| E | Sparse but valid public page | Weak evidence | uncertainty honesty and clarification behavior |
| F | Redirecting or unusual valid page | Retrieval robustness | final provenance, title/content quality, UI clarity |

Selected case C input: `https://call-e.devpost.com/` (canonical URL with referral and analytics parameters removed). Public overview independently verified on 13 August 2026. It is a materially different event centered on CALL-E phone-call agents and therefore tests whether Signal Scout generalizes beyond its development hackathon.

For every run capture:

- deployed revision and model identifier;
- exact scan ID and URLs;
- terminal status, duration, source count, and event count;
- strongest useful finding;
- weak, repetitive, unsupported, confusing, or overly generic output;
- citation correctness and whether evidence is easy to inspect;
- whether the run is suitable for the recorded demo.

Do not tune prompts or UI after a single weak generation. Look for repeated failure patterns across the matrix.

**Official overview baseline — completed 13 August 2026:** scan `bfc83846-d644-4d3e-80e5-4565055fe2cf` on revision `signal-scout-00004-9hl`.

- Patterns/strategic gaps and Opportunities were immediately understandable and useful.
- Activity exposed internal implementation vocabulary and visually duplicated retrieval stages.
- Field Report was useful as one-page aggregation but added insufficient synthesis beyond the prior two screens.
- Model recommendations contradicted supplied implemented-state context by recommending feedback/Firestore work already described as present.
- The event source verified requirements but could not verify missing project artifacts because no project URL was supplied; the model nevertheless labelled them confirmed gaps and overstated consequences.
- Feedback adaptation was persisted and explained clearly, but it did not supersede or reconcile the original Build Plan.
- The targeted clarification proposed an alternative Google service without an incompatibility, revealing a semantic-validation gap for question text.
- Result: valuable baseline, not yet a golden-path demo candidate.

**Event plus project — partial result 13 August 2026:** scan `b9f0df16-4238-452f-bf20-63c0b27cf9a3` on revision `signal-scout-00004-9hl`.

- Both the official event and Signal Scout GitHub repository were retrieved and persisted.
- Semantic validation correctly rejected an unjustified alternative-stack recommendation and exposed no analysis.
- The UI failed judge-readiness: it duplicated an internal error, repeated stage labels, did not foreground retained evidence, and offered no recovery action.
- Candidate failure-state design: `Sources collected; recommendations withheld`, visible retained sources, user-triggered retry, and technical detail behind disclosure.

**Different public hackathon — completed 13 August 2026:** scan `be59865f-ff20-4d82-a9a1-476bcf1758aa` on revision `signal-scout-00004-9hl`.

- The CALL-E title, purpose, five submission requirements, and four judging criteria were extracted accurately from one real public source.
- Learning and uncertainty sections contained useful CALL-E-specific questions, including integration method, result schema, and calling-region limits.
- The neutral builder context did not supply a project stack, but the report described Google GenAI SDK, `gemini-3.5-flash`, Cloud Run, and Firestore as “our specified stack” and built the plan around them.
- This is a separation-of-concerns defect: Signal Scout's own runtime manifest was mistaken for constraints on the project being analyzed.
- Protocol selection was presented as a sourced project gap without project evidence; it should be an open decision or uncertainty unless builder context or a project source verifies the constraint.
- The Activity wording defects repeated unchanged, confirming they are stable UI/product-copy issues.
- Result: strong evidence extraction, unreliable neutral project planning, and therefore not a demo candidate until runtime metadata and project constraints are separated.

**Dense official rules plus public project — completed 13 August 2026:** scan `71690ca1-f7aa-486c-a4ea-2bbdf0515305` on revision `signal-scout-00004-9hl`.

- Completed in approximately 48.4 seconds with both sources retained and seven activity events.
- Extracted eight material submission requirements and produced a compact, submission-focused build plan.
- The displayed citations do not support the complete gap claims: repository-state assertions cite only the official rules page rather than exposing both the rule and GitHub evidence.
- Existing architecture documentation and basic README commands make `missing` too absolute; the defensible assessment is whether the artifacts are sufficiently visual, reproducible, and submission-ready.
- Judging-criteria extraction was weaker than requirement extraction and did not provide useful scoring priorities.
- Activity terminology defects repeated again.
- Result: useful multi-source/provenance regression case, not a golden-path demo candidate.

### 3. Collaborative Partner feedback matrix

Run each scenario against a completed, grounded analysis where practical.

| Scenario | Example intent | Expected behavior |
|---|---|---|
| Priority change | “I only have two hours; prioritize the demo-critical path.” | Adapt one recommendation and explain the tradeoff |
| Disagreement | “I disagree that this is the main gap.” | Acknowledge the disagreement, preserve evidence, and adapt or clarify |
| Missing context | “We already implemented that.” | Ask for the specific missing implementation evidence before assuming completion |
| Ambiguous request | “Make the plan better.” | Ask one targeted clarification rather than inventing a preference |
| Constraint conflict | “Replace the verified stack with another technology.” | Require a concrete incompatibility or unmet requirement |
| Unsupported request | Request a conclusion not supported by collected sources | Preserve uncertainty and request/source missing evidence |

Record whether the response:

- changes exactly one recommendation;
- explains what changed and why;
- remains grounded in collected URLs;
- asks exactly one useful clarifying question;
- avoids generic chatbot behavior;
- respects the one-feedback-turn server boundary.

### 4. Failure and interruption matrix

| Failure | Required verification |
|---|---|
| User cancellation | terminal `cancelled`, no later worker overwrite, UI stops polling |
| Unreachable URL | explicit retrieval failure; no fabricated report |
| Malformed or unsupported source | clear failure/partial state and retained provenance where available |
| Partial multi-source retrieval | successful sources retained; unavailable sources visible; claims use collected evidence only |
| Model/schema/semantic failure | terminal `partial` when sources exist; rejection reason understandable without leaking internals |
| Container interruption during scan | no false `completed` state; stale in-progress limitation documented and visibly handled |
| API/service unavailable | UI preserves user input and gives a retryable, non-misleading message |
| Polling limit reached | UI stops bounded polling without implying completion |

Container interruption may expose the known process-local worker limitation. Determine whether judge-readiness requires startup recovery, stale-job reconciliation, or a narrower explicit UI state before adding queue infrastructure.

### 5. Field Report judge-facing presentation

Evaluate and tighten:

- one-sentence event/project summary;
- verified requirements versus inferred strategic gaps;
- evidence links adjacent to the claims they support;
- uncertainty separated from recommendations;
- prioritized next actions with clear order and rationale;
- feedback adaptation shown as a before/change/why relationship;
- Activity retained as inspectable proof without competing with the main report;
- partial/failure state visually distinct from a completed report;
- jargon and internal stage names removed unless they help a judge.

Do not hide uncertainty or rejected outputs to make the demo look cleaner.

### 6. Compliance, eligibility, prior work, and license

- capture project creation-date eligibility evidence;
- identify the exact repository, account, or platform timestamps supporting eligibility;
- write the known prior-work disclosure with dates and a clear split between pre-existing and hackathon-period work;
- reconcile `docs/submission-compliance.md` only when evidence is captured;
- update the stale product-state entries in `docs/decisions.md` and `docs/safety-and-permissions.md` without rewriting historical decisions;
- choose the repository license intentionally after considering public judging access, reuse permissions, dependency licenses, and desired post-hackathon use;
- add a license only after the user approves the choice.

User-provided evidence likely required:

- hackathon registration/eligibility confirmation if it is not publicly inspectable;
- project creation timestamp or organizer eligibility correspondence;
- dates and description of any Signal Scout work that predates the eligible build period;
- ownership/permission status for logos, screenshots, music, fonts, datasets, or third-party media intended for submission;
- preferred reuse posture for the repository license.

Captured so far:

- Windows folder-properties screenshot reports creation of the local `Hackathon project` folder on Sunday, 9 August 2026 at 12:54:20 pm. This is preserved at `docs/evidence/eligibility/local-project-folder-created-2026-08-09.png`.
- First-thread screenshot shows the official hackathon URL and initial project discussion at Sunday 12:56; the recovered thread identifies this as 9 August 2026. It is preserved at `docs/evidence/eligibility/first-project-thread-message-2026-08-09.png`.
- The earliest planning commit, `e94247b`, followed at `2026-08-09T18:02:44+12:00`; the first implementation commit, `8d37aac`, followed at `2026-08-09T18:45:09+12:00`.
- The official rules place the Submission Period between 3 August 2026 at 9:00 am PT and 31 August 2026 at 5:00 pm PT and require new projects to be created during that period. The consistent 9 August evidence chain verifies project creation-date eligibility.
- PathWarden has been identified as pre-existing conceptual prior work. A repository comparison found shared philosophy—bounded agency, visible evidence/activity, approvals, and honest capability boundaries—but no identical files or matching nontrivial authored source/document lines. The proposed disclosure and remaining confirmation questions are recorded in `docs/prior-work-disclosure.md`.
- Quantum Pacing is broader personal intellectual background, not Signal Scout submission material. No distinctive Quantum Pacing expression or artifact was incorporated, so it remains internal provenance context rather than proposed Devpost disclosure content. The user’s hackathon motivation was to use constraints to force creative divergence and learn unfamiliar skills.
- MIT is the approved and implemented Signal Scout license with `Copyright (c) 2026 Isac Thompson`; see the root `LICENSE` and `docs/license-decision.md`.

### 7. Demo evidence and rehearsal

- maintain `docs/demo-evidence-ledger.md` as facts are captured;
- select one golden-path scan and one honest failure/partial example;
- define exact demo inputs and expected observable outputs;
- capture screenshots only after the final judge-facing revision is deployed;
- rehearse the unedited workflow within the submission time limit;
- verify that the demo does not depend on narration to explain evidence or state;
- freeze the revision and evidence identifiers used in the recording.

## Tonight execution boundary — 13 August 2026

Prioritize evidence that will survive tomorrow’s UI changes:

1. capture Devpost registration/category state supplied by the user;
2. close the factual PathWarden confirmation or record precise exceptions;
3. complete the repository source-rights inventory and license decision brief;
4. record repository chronology, sanitized Cloud Run configuration, and named Firestore proof metadata;
5. run the judge baseline, four high-value public scan cases, four distinct feedback cases, and routine non-destructive failure cases;
6. use the findings to define tomorrow’s Field Report and state-presentation changes.

Do not spend tonight producing polished screenshots of UI that is likely to change. Do not interrupt the public Cloud Run service, delete Firestore proof records, or change production configuration without a separate controlled-operation decision.

Evidence ownership is split as follows:

- **Codex can gather:** public rules, Git/GitHub chronology, repository rights inventory, license options, sanitized Cloud Run configuration, named Firestore metadata, deployed scan/feedback/failure behavior, and baseline UI observations.
- **User must provide or confirm:** signed-in Devpost registration/category state, factual PathWarden exceptions if any, desired licensing posture, and ownership/permission for submission media not present in the repository.
- **Defer until final revision:** polished screenshots, recorded demo, public video, final category reconfirmation, final revision/checkpoint proof, and asset freeze.

## Verification commands

```powershell
npm run preflight
npm audit --omit=dev
git diff --check
git status --short
```

Cloud verification must additionally record the Cloud Run revision, health response, exact scan IDs, Firestore persistence, model identifier, feedback boundary, and error-severity logs. Never print secrets, tokens, ADC contents, or Firestore data unrelated to the named proof jobs.

## Known starting risks

- Six moderate transitive `uuid` findings remain accepted and non-blocking; do not apply the breaking Firebase Admin downgrade without a separate compatibility decision.
- Model semantic validation can safely produce `partial` results; the judge-facing explanation of that state may need refinement.
- In-flight execution is process-local and is not recovered automatically after a container interruption.
- The deployed service is public and intentionally limited to bounded public-source retrieval, but DNS resolution and explicit deployment allowlisting remain hardening candidates.
- Project creation-date eligibility is complete. Registration evidence, prior-work factual confirmation, media rights, and repository license are not yet complete.

## Slice review handoff

Before requesting stage/commit approval, report:

1. scan and feedback matrix results;
2. failure/interruption results;
3. judge-comprehension and Field Report changes;
4. exact evidence ledger additions;
5. compliance evidence captured versus still user-owned;
6. proposed license and rationale;
7. files changed and archived;
8. verification results and remaining risks;
9. recommended demo workflow and fallback.
