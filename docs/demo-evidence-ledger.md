# Demo Evidence Ledger

> **Rule:** this ledger distinguishes verified evidence from evidence still needed. Do not mark an item captured from memory or intention alone. Never include credentials, tokens, ADC contents, or unrelated Firestore records.

## Current deployed baseline

| Evidence | Status | Value / location |
|---|---|---|
| Public service | verified | `https://signal-scout-212660130578.australia-southeast1.run.app` |
| Google Cloud project | verified | `gen-lang-client-0047054532` |
| Cloud Run region | verified | `australia-southeast1` |
| Deployed revision | verified | `signal-scout-00014-rhj`, 100% traffic on 18 August 2026; commit `bfbec5b` |
| Repository checkpoint | verified | `16d4df2` / `checkpoint-gate2-cloud-run-deployed` |
| Model identifier | verified | `gemini-3.5-flash` |
| Agent framework | verified | Google GenAI SDK |
| Persistence | verified | Firestore Native `(default)`, collection `signalScoutScans` |
| Runtime identity | verified | `signal-scout-runtime@gen-lang-client-0047054532.iam.gserviceaccount.com` |
| Secret handling | verified | `GEMINI_API_KEY` references Secret Manager; secret-level accessor is limited to the runtime identity |
| Scaling | verified | minimum 0, maximum 2 |
| Final-revision error logs at deployment verification | verified | no error-severity entries observed |

## Afternoon correction verification — local, 14 August 2026

| Evidence | Status | Result |
|---|---|---|
| Full preflight | verified locally | 55 tests passed; typecheck and production build passed |
| Neutral-project boundary | verified by regression | Signal Scout runtime technologies are not imported into an unrelated project |
| Event/project evidence separation | verified by regression | current-state claims require project evidence; combined claims require both roles |
| Explicit project constraints | verified by regression | supplied technologies remain constraints; alternatives require concrete incompatibility |
| Feedback boundary | verified by regression | one sourced adaptation succeeds; a second feedback request is rejected |
| Partial semantic rejection | verified locally | validation remains fail-closed; sources remain preserved and visible; technical detail is secondary |
| Deliberate analysis retry | verified locally | one retry reuses persisted sources without recollection; another retry is rejected |
| Revised live-input presentation | verified locally | production UI rendered the guidance and findings terminology with no browser console warnings or errors |
| Public deployment of this correction slice | verified later | included in `signal-scout-00009-wrp` on 15 August 2026 |

## Submission-readiness correction — deployed 15 August 2026

Verified deployment: `signal-scout-00009-wrp`, 100% traffic.

| Evidence | Status | Result / required proof |
|---|---|---|
| Organizer email guidance | preserved | original JPEG bytes copied under `docs/evidence/organizer-email`; index records checksums and non-authoritative status |
| Public demo capacity | implemented locally | atomic Firestore UTC-day counter target: 50 costly actions; in-process per-client target: 3 actions / 10 minutes; HTTP `429` contract tested |
| Source host policy | implemented locally | deployed event hosts limited to Devpost; project hosts limited to GitHub; policy reapplied after redirects |
| DNS boundary | implemented locally | private/local literal and resolved addresses rejected before fetch |
| Responsive correction | verified locally | rebuilt production bundle passed 1440×900, 1280×720, 768×1024, and 390×844 with no page overflow or console warnings/errors; evidence under `docs/evidence/ui-readiness/2026-08-15-local-candidate` |
| Reproducible setup | verified locally | isolated dependency-free candidate copy completed `npm ci` and the 63-test preflight with matching production bundle hashes on 15 August 2026 |
| Prior-work owner confirmation | verified | no PathWarden code, schemas, UI/assets, prose, prompts, fixtures, datasets, or templates incorporated |
| Rights inventory | prepared | final rendered media inspection remains user-owned before upload |
| Budget alerts | verified by project owner | Alerts-only monthly budget `Signal Scout hackathon guards`, scoped to project `gen-lang-client-0047054532`, with a specified USD $25 amount and actual-spend alerts at 50%, 80%, and 100%; screenshots captured on 15 August 2026 under `docs/evidence/cloud-budget/` |
| Cloud Run revision | verified | `signal-scout-00009-wrp`, 100% traffic, min 0, max 2, dedicated runtime identity, Secret Manager reference, health pass |
| Golden event + repository scan | verified | `b66b7629-26ce-41e6-b9b9-4b6477f56b07`; completed in about 46 seconds with 2 sources, event/project roles, 6 requirements, 3 criteria, 2 gaps, both gaps dual-source grounded |
| Golden feedback turn | verified | one adapted recommendation with changed-because explanation, 2 supporting sources, and clarification; direct second turn returned `409 FEEDBACK_NOT_APPLICABLE` |
| Capacity proof | verified | fourth costly action returned `429 DEMO_CAPACITY_REACHED` with `Retry-After`; Firestore UTC-day usage document recorded count 3 |
| Deployed responsive matrix | verified | four target viewports passed with no page overflow or console warnings/errors; evidence under `docs/evidence/ui-readiness/signal-scout-00009-wrp` |
| Revision error logs | verified | zero error-severity entries observed after golden-path verification |

Deployment diagnostic: revision `signal-scout-00008-t7b` failed before receiving traffic because the deployment command combined six environment settings into one malformed collection value. The image build succeeded; Cloud Run retained the previous serving revision. The environment delimiter was corrected, and revision `signal-scout-00009-wrp` then started and passed all verification. Treat `00008-t7b` as diagnostic history only.

## Walkthrough correction — deployed 16 August 2026

| Evidence | Status | Result / required proof |
|---|---|---|
| Dynamic event identity | verified locally and deployed | live entry shows neutral identity; pure regression verifies validated event name and immediate stale-name reset when the event URL changes |
| Evidence-link clarity | verified by regression | event citations render as Devpost evidence and project citations identify the GitHub owner/repository |
| Completed-work grounding | verified by regression | Cloud Run deployment recommendations are rejected when builder/project evidence marks public deployment complete; proof-capture recommendations remain valid |
| Event-source fail-closed boundary | verified by regression | if Devpost is unavailable while project evidence succeeds, project evidence is preserved, event analysis is withheld, and no analysis retry is offered |
| Local verification | verified | 68 tests, typecheck, production build, 390 px no-overflow check, and zero browser warnings/errors |
| Cloud Run revision | verified | `signal-scout-00016-c9x`, 100% traffic, default min 0, max 2, dedicated runtime identity, Secret Manager reference, and health pass |
| Current gap-closure scan | verified | `689924a1-2fdd-456f-9479-0a5b5b5899f0`; safe `503` partial state, Firestore analysis retry, completion with event/project roles, bounded feedback retry, dual-source adaptation, and one persisted clarification response on `signal-scout-00014-rhj` |
| Corrected golden feedback | verified | one adaptation focused the demo on a minimal end-to-end feedback loop, included `Changed because`, cited both sources, and asked one targeted clarification |
| Secondary CALL-E project scan | verified supporting evidence | `17372c88-3d09-4e8e-84e7-d30d37c92dc3`; completed on `signal-scout-00014-rhj` with 2 evidence roles, 5 CALL-E requirements, 4 criteria, 3 dual-source gaps, 7 build steps, one dual-source adaptation, one persisted clarification response, and no `All Things Agentic` string in persisted JSON; screenshots in `docs/evidence/scan-quality/2026-08-18-secondary-call-e/` |
| Gate Five event-change control | verified | `b370d15f-5c83-4efa-84d8-2f04c374444d`; changed only the event to Agents for Humans while retaining the Signal Scout repository; completed with event/project roles, 6 requirements, 5 criteria, 2 gaps, 3 learning items, 4 build steps, 2 uncertainties, 7 Activity events, and no `All Things Agentic` phrase in generated analysis; screenshots in `docs/evidence/scan-quality/2026-08-18-gate-five-agents-for-humans/` |
| Refresh continuity | verified | fresh deployed tab defaults to Mock; an explicit Live selection survives refresh on `signal-scout-00016-c9x`; only the Live workspace renders after reload; zero browser warnings/errors |

Walkthrough diagnostic scan `523b2198-6a57-4151-a1b6-f1b8b8d94bba` on revision `signal-scout-00010-rkb` preserved GitHub project evidence after the Devpost request timed out, but incorrectly exposed event-oriented analysis. The result is diagnostic only and must not be used in the demo. It directly produced the fail-closed correction deployed in `signal-scout-00011-zx8`.

## Existing proof jobs

| Scan ID | Environment | Result | Evidence value | Demo status |
|---|---|---|---|---|
| `8229ac9a-b67d-43ca-aa2e-adea16a11136` | local memory | completed | first credentialed Gemini scan; ephemeral | historical only |
| `1a8e951b-5c01-4315-89ec-51c97a1fb765` | local Firestore | completed | passed citation, serialization, terminology, and stack checks | candidate supporting evidence |
| `2fb3e320-608b-4f60-a428-5e52454532de` | local Firestore | completed + feedback | bounded Collaborative Partner proof | candidate supporting evidence |
| `e068445b-6cef-49f2-acb5-b1f97d579655` | Cloud Run revision 1 | partial | rejected invented citation hostname | failure evidence candidate |
| `477f8f8a-06b4-4355-bbd7-4804d0175db1` | Cloud Run revision 2 | partial | rejected non-security use of “prompt injection” | failure evidence candidate |
| `81793abb-5007-4213-9434-5bda3857e392` | Cloud Run revision 3 | partial | bounded correction still failed semantic terminology rule | failure evidence candidate |
| `4b979d67-e80b-4e77-9127-1a65907e165b` | Cloud Run revision 3 | completed + diagnostic feedback | verified full path; later received two feedback entries before one-turn enforcement | diagnostic only; do not use as bounded-loop proof |
| `0938e5bf-4320-4a87-8455-2b95ecd5cb15` | Cloud Run revision 4 | completed + feedback | final deployed scan, persisted analysis, one feedback turn, second request HTTP 409 | current golden-path candidate |
| `d6f4a2bb-ae51-4630-8323-98333bb35113` | Cloud Run revision 7 | completed | neutral CALL-E regression; no Signal Scout runtime leak or unsupported absence claim | current neutral-grounding proof |
| `192b9f41-d20a-4727-b27b-95e98bbce8bf` | Cloud Run revision 7 | completed + feedback | event/project evidence roles, dual-source gap grounding, persisted bounded adaptation | current grounded workflow candidate |

## Judge baseline — first access, 13 August 2026

Tester opened the public service without relying on an architecture explanation.

| Observation | Evidence | Assessment | Candidate response |
|---|---|---|---|
| The application starts in mock mode and the guided fixture makes the workflow immediately understandable | `docs/evidence/judge-baseline/03-mock-first-onboarding.png` | strength; useful first-time orientation | retain a clearly labelled example/demo path, while ensuring a judge cannot mistake it for live evidence |
| Switching to live mode creates uncertainty about what information belongs in the form | `docs/evidence/judge-baseline/01-live-input-confusion.png` | high-priority comprehension issue | add concise examples and outcome-oriented help for builder context and optional project URLs |
| `Patterns` with subtitle `Clusters and gaps` is confusing and describes internal analysis rather than a judge-facing result | `docs/evidence/judge-baseline/02-patterns-clusters-navigation.png` | high-priority terminology issue | test `Findings` with `Requirements and strategic gaps`, or another plain-language outcome label |

Detailed notes:

- The prefilled official hackathon URL is understandable, but the interface does not explain whether other public event pages are supported.
- `Builder context` needs to tell the user what useful context includes: current project, goals, constraints, completed work, available time, and decisions they want help making.
- `Optional public project URLs` needs to explain what changes when URLs are provided and give a concrete public GitHub/project-page example.
- The mock hero also uses `CLUSTER`, so the terminology issue is broader than the navigation label.
- Do not decide final copy from this single observation alone; compare terminology against the scan-quality and Field Report findings.

## Scan quality matrix

| Case | Date | Revision | Scan ID | Input URLs | Context summary | Status / duration | Sources | Strongest result | Weak/repetitive/confusing result | Citation/evidence check | Demo suitability |
|---|---|---|---|---|---|---|---:|---|---|---|---|
| Official overview baseline | 13 Aug 2026 | `signal-scout-00004-9hl` | `bfc83846-d644-4d3e-80e5-4565055fe2cf` | official overview | deployed state and judge-risk review | completed / ~28 sec | 1 | gaps and Opportunities scan quickly | internal Activity language, repeated report, context contradictions | citations point to collected source, but project-gap claims exceed inspected evidence | not yet |
| Dense official rules/details | 13 Aug 2026 | `signal-scout-00004-9hl` | `71690ca1-f7aa-486c-a4ea-2bbdf0515305` | official rules + Signal Scout GitHub | verify submission readiness against public project state | completed / ~48 sec | 2 | extracted eight requirements and produced a focused four-step build plan | judging-criteria extraction is incomplete; project-state claims cite only the rules page | both sources were retrieved, but gap citations do not expose the repository evidence they rely on | useful regression case; not golden path |
| Different public hackathon | 13 Aug 2026 | `signal-scout-00004-9hl` | `be59865f-ff20-4d82-a9a1-476bcf1758aa` | `https://call-e.devpost.com/` | neutral CALL-E entry planning; no project stack supplied | completed / ~20 sec | 1 | accurate event identity, submission requirements, judging criteria, and useful uncertainties | Signal Scout's own Gemini / Cloud Run / Firestore runtime was imposed as the entrant project's architecture | source supports CALL-E and submission claims, but not the injected Google stack | not suitable as neutral generalization proof |
| Event plus public project | 13 Aug 2026 | `signal-scout-00004-9hl` | `b9f0df16-4238-452f-bf20-63c0b27cf9a3` | official overview + Signal Scout GitHub | compare requirements to implementation | partial / ~46 sec | 2 | both sources retained and stack drift rejected | internal error is duplicated and offers no recovery | no analysis was accepted; safety gate passed | failure candidate |
| Sparse valid source | needed | | | | | | | | | | |
| Redirect/unusual valid page | needed | | | | | | | | | | |

### Official overview baseline result — 13 August 2026

| Field | Result |
|---|---|
| Revision | `signal-scout-00004-9hl` |
| Scan ID | `bfc83846-d644-4d3e-80e5-4565055fe2cf` |
| Input | official All Things Agentic overview; no optional project URL |
| Status and timing | `completed`; created `09:04:04Z`, completed at approximately `09:04:32Z`; feedback persisted `09:27:37Z` |
| Sources/events | 1 source; 6 scan events plus 1 feedback event |
| Strongest presentation | strategic gaps and Opportunities screens communicate quickly; confidence and source affordance are visible |
| Weak presentation | Activity uses technical/internal language; Field Report repeats earlier views rather than adding prioritization or executive synthesis |
| Context quality | failed to respect implemented-state context: recommends implementing feedback capture despite the input stating that one recommendation already adapts from feedback and the live stack already uses Firestore |
| Evidence classification | official source verifies submission requirements, but with no project URL the model cannot verify that Signal Scout lacks the required artifacts; it incorrectly presents uninspected requirements as confirmed project gaps |
| Claim strength | phrases such as `avoid administrative disqualification` and `fails the evaluation` are stronger than the cited requirement evidence supports and should be expressed as eligibility/readiness risk unless the rules explicitly state that consequence |
| Adaptation quality | feedback is captured and a changed-because explanation is clear, but the adapted popup recommendation is added beside an unchanged original Build Plan, leaving competing recommendations |
| Constraint quality | clarification offers `Use Alternative Google Service` without a concrete incompatibility or unmet requirement; clarification text is not covered by the same stack semantic guard |
| Demo suitability | not yet suitable as the golden path; useful baseline after context reconciliation, true recommendation replacement, and terminology corrections |

Screenshots: `docs/evidence/scan-quality/official-overview-baseline/01-activity-technical-language.png` through `11-memory-feedback-state.png`.

Observed Activity copy issues:

- `Retrieving allowlisted public inputs` is security-oriented internal phrasing; prefer a user outcome such as `Checking the public sources you provided`.
- two `retrieving` labels read as duplication even though one is the start event and one is a successful collection event;
- `Running Gemini structured analysis through Google GenAI SDK` explains architecture rather than the work being done;
- `Validated structured output against the server schema` does not tell a judge what was validated; replace with a claim about required fields, source links, and safe structure;
- `Connecting the analysis to preserved source provenance` uses specialist terminology; prefer `Linking each finding to the source that supports it`.

### Event-plus-project partial result — 13 August 2026

- Revision: `signal-scout-00004-9hl`.
- Scan: `b9f0df16-4238-452f-bf20-63c0b27cf9a3`.
- Inputs: official event overview plus `https://github.com/SkillSpringAI/Signal-Scout`.
- Timing: created `09:37:39Z`, terminal `partial` at `09:38:25Z`.
- Both public sources were retrieved and persisted with timestamps and byte lengths.
- Gemini output was rejected because it recommended an alternative stack without a concrete incompatibility or unmet requirement.
- No invalid analysis was exposed; `hasAnalysis` is false. This verifies the stack guard fails closed.
- Screenshot: `docs/evidence/scan-quality/event-plus-project/01-partial-stack-guard.png`.

Judge-facing defects:

- the internal validator message is shown verbatim;
- the same message appears in both the Activity event and a separate error banner;
- three events share the `retrieving` label even though they mean `started` and two separate `source collected` outcomes;
- the UI does not explain that both sources were preserved successfully;
- the UI does not offer a safe retry using the already collected sources;
- `partial` is not translated into a plain-language outcome such as `Sources collected; recommendations withheld`.

### Different-hackathon result — CALL-E, 13 August 2026

| Field | Result |
|---|---|
| Revision | `signal-scout-00004-9hl` |
| Scan ID | `be59865f-ff20-4d82-a9a1-476bcf1758aa` |
| Input | canonical CALL-E Devpost overview; no optional project URL; neutral planning context that did not specify an implementation stack |
| Status and timing | `completed`; created `09:59:16.597Z`, completed `09:59:36.820Z`; approximately 20 seconds |
| Sources/events | 1 source, 89,420 bytes; 6 activity events |
| Accurate extraction | event identity and summary; five submission requirements; four judging criteria |
| Useful synthesis | distinguished CALL-E integration choices; preserved questions about callback schema, MCP compatibility, and calling-region limits |
| Unsupported synthesis | treated Google GenAI SDK, `gemini-3.5-flash`, Cloud Run, and Firestore Native as the entrant project's “specified stack” even though neither the source nor builder context specified it |
| Classification issue | called protocol selection a sourced strategic gap despite having no project evidence; it is an open implementation decision unless the user supplies a verified project constraint |
| Demo suitability | not suitable as the neutral generalization workflow; valuable regression case for separating analyzer runtime from project constraints |

Screenshots: `docs/evidence/scan-quality/different-hackathon-call-e/01-completed-source.png` through `05-uncertainties.png`.

This run establishes a boundary defect rather than a one-off wording issue: Signal Scout's deployment architecture is metadata about the analyzer, not automatically a constraint on every project being analyzed. Verified project stack choices should still be respected, and replacement technologies should require a concrete incompatibility or unmet requirement. The correction is to derive project constraints only from explicit builder context or inspected project evidence; the server's own runtime manifest must not silently become the user's proposed architecture.

The Activity screen repeated the same terminology defects seen in the official-overview baseline (`allowlisted public inputs`, repeated `retrieving`, `server schema`, and implementation-focused extraction copy). That repetition is enough evidence to treat the Activity wording as a product-level issue rather than generation variance.

### Dense official-rules result — 13 August 2026

| Field | Result |
|---|---|
| Revision | `signal-scout-00004-9hl` |
| Scan ID | `71690ca1-f7aa-486c-a4ea-2bbdf0515305` |
| Inputs | official All Things Agentic rules page plus the public Signal Scout GitHub repository |
| Status and timing | `completed`; created `10:11:16.801Z`, completed `10:12:05.165Z`; approximately 48.4 seconds |
| Sources/events | 2 sources; 7 activity events |
| Accurate extraction | eight mandatory technology, category, architecture, video, spin-up, and repository-access requirements |
| Focus | reduced the result to architecture/video and README-readiness gaps with a four-step submission-oriented plan |
| Evidence defect | both gap cards make claims about current repository contents, but each displayed `Source` points only to the rules page; the rule supports the requirement, not the claim that the public repository lacks or only partially contains the asset |
| Project-state nuance | `docs/architecture.md` exists and README contains basic local commands, so the real question is submission sufficiency and discoverability—not simple absence of architecture documentation or run instructions |
| Judging defect | returned generic eligibility/operation statements as judging criteria and omitted the more decision-useful scoring dimensions needed to guide prioritization |
| Uncertainty quality | hands-on judging and criterion weighting are reasonable open questions, though they should not displace verified scoring information present in the rules |
| Demo suitability | not the golden path; valuable proof that multi-source retrieval succeeds and that cross-source claim-level provenance needs correction |

Screenshots: `docs/evidence/scan-quality/dense-official-rules/01-completed-input-and-sources.png` through `12-judging-criteria.png`.

The additional Project Field captures verify that both raw source records, collection timestamps, media types, and byte lengths were exposed in the UI. They also reveal a presentation-quality issue: the preserved excerpts begin with substantial Devpost/GitHub navigation and unsupported-browser boilerplate. Provenance is visible, but the evidence preview does not yet help a judge locate the relevant passage efficiently.

The full extraction captures support two different conclusions:

- the requirements section is a strong result: all eight items are legible, specific, and immediately useful;
- the judging section is visibly weak: `judges will choose the winners` is circular rather than a criterion, successful installation is closer to eligibility/technical readiness, and optional publishing is a score modifier rather than a core judging dimension.

This scan also took materially longer than the single-source CALL-E case, but completed normally. The user estimated roughly one minute before exact matching; backend timestamps establish the precise duration, so future manual stopwatch timing is optional rather than required when the scan ID can be recovered from Cloud Run evidence.

Recommended recovery design:

- headline: `Sources collected; recommendations withheld`;
- explanation: Signal Scout rejected a recommendation that conflicted with the verified stack without evidence;
- retained-evidence panel: show both collected sources and timestamps;
- action: `Retry analysis with the same sources`, bounded to a deliberate user action;
- expandable technical detail for the exact validator reason, rather than leading with it.

Presentation conclusions:

- rename or reframe `Patterns / Clusters and gaps` using plain findings language;
- retain the existing strategic-gap card treatment because it scans well;
- retain Opportunities as the action-oriented view;
- turn Field Report into a prioritized executive synthesis instead of duplicating both preceding screens;
- rename `Memory` to a feedback/adaptation outcome in live mode;
- show adaptation as `previous recommendation -> revised recommendation -> changed because`, and update or supersede the original recommendation rather than leaving both active.
- distinguish `verified requirement`, `verified project state`, and `unverified gap`; project-gap assertions require project evidence or explicit uncertainty.

## Collaborative Partner feedback matrix

| Scenario | Date | Revision | Scan ID | Exact feedback | Expected behavior | Actual adaptation | Clarifying question | Grounding check | Pass / issue |
|---|---|---|---|---|---|---|---|---|---|
| Priority change | needed | | | | | | | | |
| Disagreement | needed | | | | | | | | |
| Missing implementation context | needed | | | | | | | | |
| Ambiguous request requiring clarification | needed | | | | | | | | |
| Stack-replacement request | needed | | | | | | | | |
| Unsupported conclusion request | needed | | | | | | | | |

The official-overview scan exercised a priority-change feedback case, but it does not pass yet: capture and explanation are clear, while true replacement, plan reconciliation, and clarification constraint enforcement fail.

## Failure and interruption evidence

| Scenario | Date | Revision | Scan ID / log reference | Expected terminal/UI state | Actual result | Screenshot needed | Status |
|---|---|---|---|---|---|---|---|
| Cancellation | | | | `cancelled`; no later overwrite | | yes | needed |
| Unreachable URL | | | | explicit failed retrieval; no report | | yes | needed |
| Malformed/unsupported source | | | | failed or honest partial | | yes | needed |
| Partial multi-source retrieval | | | | successful evidence retained | | yes | needed |
| Model semantic failure | 13 Aug 2026 | revisions 1–3 | see partial jobs above | `partial`; source retained; no false report | server behavior verified; judge-facing UI still to inspect | yes | partial evidence |
| Container interruption | | | | no false completion; stale state handled honestly | | yes | needed |
| API unavailable | | | | retryable message; input preserved | | yes | needed |
| Polling limit | | | | bounded polling stops honestly | client tests exist; deployed UI evidence needed | optional | partial evidence |

## Screenshot and recording checklist

Capture only from the final judge-facing revision.

- [x] Landing/overview showing purpose, live mode, and primary action
- [x] Live scan in progress with understandable Activity state
- [x] Completed Field Report with findings and next actions
- [x] Evidence link and collection timestamp adjacent to a supported claim
- [x] Uncertainty section clearly distinct from recommendations
- [x] Feedback input before submission
- [x] Adapted recommendation showing what changed and why
- [x] One targeted clarifying question
- [x] Honest partial/failure state with retained evidence
- [x] Firestore proof for the exact golden-path job without unrelated records
- [x] Cloud Run revision/traffic proof
- [x] Model identifier shown through safe configuration evidence
- [x] Final repository checkpoint and public license

Final-revision evidence for the checked items above is archived in `docs/evidence/final-candidate/2026-08-20/`. The golden scan is `c3c0f521-0b3d-41ea-855d-83a42db22df8`; honest partial and failure scans are `2f6c053a-5fdf-4bde-ac0b-5723a61259b8` and `c716b724-684c-46f3-92e2-f9a21d42cf80` respectively. The final repository checkpoint, license, and compact architecture captures are under the `github/` subdirectory.

## Tonight evidence queue — 13 August 2026

### Durable evidence to capture now

These items remain useful even if the UI changes tomorrow.

| Priority | Evidence | Method | Owner | Completion condition |
|---:|---|---|---|---|
| 1 | Devpost registration and participant eligibility | signed-in screenshot showing registration/participant state; exclude unnecessary personal details | user | artifact stored or location recorded, date visible where practical |
| 2 | Selected category state | signed-in Devpost submission/category screenshot showing The Collaborative Partner | user | exact category visibly selected; final submission reconfirmation still remains later |
| 3 | Prior-work factual confirmation | review `docs/prior-work-disclosure.md` confirmation list | user | confirm no PathWarden code/assets were incorporated, or identify exact exceptions |
| 4 | Repository source-rights inventory | inspect tracked images, fonts, fixtures, copied text, dependencies, and external assets | Codex | inventory records provenance/license/ownership or flags follow-up |
| 5 | License decision brief | MIT implications reviewed and ownership confirmed | Codex + user | complete: MIT, Copyright (c) 2026 Isac Thompson |
| 6 | Hackathon-period repository chronology | export concise public commit/tag timeline from 9 August through deployed checkpoint | Codex | hashes, dates, subjects, and public repository URL recorded |
| 7 | Cloud deployment configuration proof | capture sanitized service revision, traffic, scaling, runtime identity, model name, Firestore mode, and secret reference | Codex | text evidence saved without secret values or tokens |
| 8 | Golden-path Firestore proof metadata | inspect only the named proof record `0938e5bf-4320-4a87-8455-2b95ecd5cb15` | Codex | status, timestamps, sources, analysis presence, one feedback entry, and event count recorded |
| 9 | Existing semantic-failure proof metadata | inspect one named partial job without unrelated records | Codex | retained source, partial status, safe rejection reason, and revision recorded |

### Behavior evidence to run tonight

These runs should inform tomorrow’s UI work. Capture structured ledger entries now; defer polished screenshots.

| Priority | Evidence | Scope tonight | Guardrail |
|---:|---|---|---|
| 1 | Judge baseline | first-time deployed walkthrough at desktop and narrow viewport | observations and temporary screenshots only |
| 2 | Scan quality | official rules, different public event, event plus project, and sparse valid page | public sources only; stop if results expose a safety issue |
| 3 | Feedback quality | disagreement, missing context, ambiguous request, and constraint conflict | one fresh completed scan per scenario because feedback is single-turn |
| 4 | Routine failure states | cancellation, unreachable URL, unsupported/malformed content, partial multi-source retrieval | verify API, persisted state, and visible UI agree |
| 5 | Service-unavailable client state | controlled local or intercepted-client test | do not disable the public service merely to capture this state |

### Requires a separate controlled-operation decision

- Container interruption against the public Cloud Run service. Prefer a local container/process-interruption proof first. A deliberate public revision or instance interruption must be scoped so it does not expose unrelated data or leave the service degraded.
- Firestore deletion or cleanup of proof records. Retain named evidence jobs unless the user explicitly approves targeted deletion.
- Any production configuration or security-policy change discovered during testing.

### Defer until the judge-facing revision is final

- polished landing, report, evidence, feedback, uncertainty, and failure screenshots;
- final Cloud Run revision/traffic screenshot;
- final repository checkpoint/license screenshot;
- the unedited demonstration recording and public video upload;
- final submission-asset freeze and final category reconfirmation.

### User evidence that can be supplied tonight

- Devpost registration/participant screenshot;
- current category-selection screenshot, if a draft submission exists;
- factual confirmation for the PathWarden disclosure checklist;
- repository licensing is complete; no further reuse-posture input is needed unless the decision changes;
- ownership/source notes for any logo, font, image, music, screenshot, or external dataset planned for the final submission.

## Intended recorded workflow

**Status:** not selected.

Before recording, freeze:

- exact official URL and optional project URL;
- exact builder context;
- exact feedback text;
- expected key finding and evidence link;
- expected adaptation and clarification behavior;
- final Cloud Run revision and repository checkpoint;
- fallback proof job if live generation safely ends partial during recording.

The fallback must be disclosed as prior captured evidence, not presented as the current live run.

## Eligibility and disclosure evidence

| Requirement | Evidence needed | Owner | Status / location |
|---|---|---|---|
| Project creation-date eligibility | official rules plus folder, first-thread, and Git timestamps | user + repository | verified 13 Aug 2026; artifacts below |
| Hackathon registration/participant eligibility | registration/account evidence if not public | user | needed |
| Pre-existing work disclosure | PathWarden conceptual lineage, file comparison, and user confirmation | user + repository review | verified: `docs/prior-work-disclosure.md` |
| Hackathon-period work | Git history, tags, deployment and scan evidence | repository/runtime | verified and captured |
| Source and third-party rights | inventory of logos, fonts, screenshots, media, and datasets | user + repository audit | inventory prepared in `docs/third-party-rights.md`; final rendered-media check pending |
| Repository license | root license, README reference, and decision record | user + repository | verified: MIT, Copyright (c) 2026 Isac Thompson (`LICENSE`, `docs/license-decision.md`) |
| Final category | Devpost selection screenshot/confirmation | user | Collaborative Partner selected in project records; final Devpost form capture pending |

### Local project creation evidence — captured 13 August 2026

- Artifact: `docs/evidence/eligibility/local-project-folder-created-2026-08-09.png`
- Source: user-captured Windows Properties dialog for `C:\Users\Laptop\Desktop\Hackathon project`.
- Displayed creation time: Sunday, 9 August 2026 at 12:54:20 pm (local system time).
- Repository corroboration: the earliest Git commit is `e94247bb70bfcb9e844753faaf9fb0e06032d0be` (`Add Signal Scout planning docs`) with author and commit time `2026-08-09T18:02:44+12:00`.
- What it supports: the current local project folder existed by the displayed time.
- First-thread artifact: `docs/evidence/eligibility/first-project-thread-message-2026-08-09.png`.
- First-thread content: the user shared the official hackathon URL and asked whether the project was worth pursuing; the visible timestamp is `Sunday 12:56`.
- Retrospective context: `docs/archive/thread-handoff-summary-2026-08-13.md` identifies that message as Sunday, 9 August 2026 at 12:56 pm Pacific/Auckland and records the project’s initial reasoning, product choice, and subsequent Git history.
- Official rule: the [Devpost Official Eligibility and Rules](https://allthingsagentichackathon.devpost.com/rules) state that the Submission Period runs from 3 August 2026 at 9:00 am PT through 31 August 2026 at 5:00 pm PT and that projects must be newly created during that period.
- Eligibility conclusion: the 9 August folder, first-thread, planning-commit, and implementation-commit timestamps all fall inside the official Submission Period. Project creation-date eligibility is verified for the current evidence ledger.
- Evidence limitation: filesystem and local thread timestamps are not individually tamper-proof. Their agreement with the remote repository chronology provides a consistent multi-artifact chain; retain the original screenshots and public Git history for submission support.

### Prior-work disclosure — confirmed 15 August 2026

The available thread and Git history indicate that Signal Scout was conceived, named, planned, and first implemented on 9 August 2026 during the Submission Period. The initial work used standard development tools, libraries, and AI coding assistance permitted by the rules. No pre-Submission-Period Signal Scout code is identified in the evidence reviewed so far.

The project owner confirmed that no PathWarden code, schemas, UI/assets, prose, prompts, fixtures, datasets, or templates were incorporated into Signal Scout. The disclosure is complete for the repository state reviewed on 15 August 2026; reopen it only if new pre-existing material is added before submission.

Quantum Pacing is part of the user’s broader intellectual background but was not intended as Signal Scout submission material; no distinctive text, formula, diagram, terminology, branding, or document asset from it appears in Signal Scout. It is therefore retained as internal provenance context rather than proposed Devpost disclosure content. PathWarden remains the relevant prior project influence. Its repository comparison found no identical files or matching nontrivial authored source/document lines. The detailed review and proposed submission wording are in `docs/prior-work-disclosure.md`.

## Known risks and open decisions

- Six moderate transitive `uuid` findings are accepted as non-blocking; do not apply the breaking Firebase Admin downgrade without a separate decision.
- Container interruption is not deliberately demonstrated and remains a documented prototype limitation; do not interrupt the public service merely to capture evidence.
- The final golden-path input, feedback text, adaptation, and clarification are verified by scan `c3c0f521-0b3d-41ea-855d-83a42db22df8` on revision `signal-scout-00016-c9x`; retain `689924a1-2fdd-456f-9479-0a5b5b5899f0` and `e543fe32-96fa-458c-af5e-a9ea61706a58` as prior corrected baselines.
- Project creation-date eligibility, repository licensing, prior-work factual confirmation, budget evidence, deployment evidence, and golden runtime evidence are complete. Participant registration/account evidence and the final rendered-media rights check remain user-owned.
- MIT is implemented for Signal Scout; the third-party-rights inventory is prepared and must be rechecked against the final video, narration, screenshots, and any music before upload.
