# Tomorrow Handoff — Behavioral Evidence and Correction Slice

> **Temporary status:** handoff for continued work on 14 August 2026. Tonight's work stops after preserving the current evidence and this handoff. This document does not authorize further testing, product-code correction, staging, or deployment tonight. Review and archive it when tomorrow's slice is complete. It does not replace the corrective implementation directive, established decisions, or verified deployment documentation.

## Purpose

Preserve tonight's exact stopping point and keep tomorrow's work in the correct order so Signal Scout is not polished, expanded, staged, or redeployed before the observed behavioral defects are understood and an intentionally narrow correction set is approved.

The judge-facing objective remains:

> Can a judge open Signal Scout, understand it quickly, run one convincing live workflow, give feedback, see the recommendation adapt, and inspect the evidence without a verbal architecture explanation?

## Current baseline

- Public revision: `signal-scout-00004-9hl`.
- Model: `gemini-3.5-flash` through the Google GenAI SDK.
- Persistence: Firestore Native.
- Deployment: public Cloud Run service in `australia-southeast1`.
- Current evidence and documentation changes are intentionally unstaged and uncommitted pending review.
- Existing deployment remains the behavioral-test baseline; do not redeploy during evidence collection.

## Tonight's stopping point — 13 August 2026

Stop after this handoff. Do not begin another scan, implement a correction, stage files, or prepare a deployment tonight.

Tonight completed:

- judge first-access and terminology observations;
- official-overview behavior and feedback review;
- event-plus-project partial-state evidence;
- unrelated CALL-E generalization evidence;
- dense official-rules plus repository evidence;
- preservation of screenshots and exact deployed scan metadata;
- intentional MIT license decision for copyright holder Isac Thompson;
- draft compliance, prior-work, and demo-evidence documentation.

All current repository changes remain available for review and are intentionally unstaged.

## Work sequence

### Phase 1 — Complete behavioral evidence

Status: **in progress**.

Continue gathering evidence against the deployed baseline. Record exact scan IDs, backend timestamps, revision, source count, terminal status, and screenshots. Prefer backend timestamps over manual timing when a scan ID is recoverable.

Required remaining cases:

1. sparse but valid public source;
2. redirecting or unusual valid public page;
3. Collaborative Partner feedback scenarios:
   - disagreement;
   - missing implementation context;
   - ambiguous request that should trigger clarification;
   - unsupported request;
4. failure and interruption behavior:
   - cancellation;
   - unreachable URL;
   - malformed or unsupported source;
   - partial source retrieval;
   - model/schema/semantic failure;
   - local container or process interruption before considering any public-service interruption.

Evidence already captured:

- first-access and navigation comprehension baseline;
- official overview scan and feedback turn;
- event-plus-project partial semantic rejection;
- unrelated CALL-E hackathon generalization scan;
- dense official rules plus public Signal Scout repository scan.

### Phase 2 — Consolidate and classify defects

Status: **not started**. Begin only after enough Phase 1 evidence exists to distinguish stable product defects from generation variance.

For each observed issue classify:

- judge-blocking, demo-risk, or polish;
- UI copy, interaction design, prompt/model behavior, validation, provenance, retrieval, persistence, or runtime;
- reproduced across scans or isolated;
- safe narrow correction or architectural correction;
- verification needed after correction.

Current repeated findings to validate during consolidation:

- live input does not explain what useful builder context and project URLs contain;
- `Patterns / Clusters and gaps` uses unclear internal language;
- Activity exposes repeated stages and internal terminology;
- Field Report repeats earlier screens without enough prioritization;
- requirements are presented as confirmed project gaps without sufficient project evidence;
- multi-source gap cards do not expose every source needed to support the complete claim;
- Signal Scout's analyzer runtime can leak into an unrelated project's recommended architecture;
- feedback adaptation can coexist with an unreconciled original recommendation;
- judging criteria are less reliably extracted and classified than submission requirements;
- partial states expose validator language, duplicate errors, and lack recovery actions;
- raw source previews contain substantial site-navigation boilerplate.

Do not assume every item above belongs in the implementation slice until it has been consolidated and prioritized.

### Phase 3 — Approve the narrow correction set

Status: **blocked on Phase 2 review and user approval**.

Before editing product code, prepare a proposed correction list containing:

- exact behavior to change;
- smallest responsible implementation surface;
- acceptance test;
- regression risk;
- whether a new Cloud Run revision is required;
- whether the correction is required for the recorded demo or can remain documented risk.

The user reviews and approves this list before implementation begins.

### Phase 4 — Implement and verify approved corrections

Status: **not authorized yet**.

Only implement approved corrections. Preserve the architectural rule:

> Treat verified project stack choices as constraints. Do not recommend replacement technologies merely because they are plausible alternatives. A replacement may only be proposed when a concrete incompatibility or unmet requirement has been identified, and it must explain that incompatibility.

Also keep analyzer runtime metadata separate from the project constraints inferred from builder context or inspected project evidence.

Verification must be proportional to each change and include relevant automated tests plus replay of the affected deployed behavior case. Do not tune the system solely to one saved generation.

### Phase 5 — Review, stage, commit, deploy, and update evidence

Status: **not authorized yet**.

Sequence:

1. user reviews the correction diff and verification results;
2. update documentation to describe actual behavior;
3. archive superseded temporary working documents;
4. stage only reviewed files;
5. commit and push only after explicit approval;
6. deploy a new revision only after local/clean-checkout verification;
7. rerun the selected behavioral cases and update the demo ledger;
8. choose the golden-path workflow only from verified post-deployment evidence.

## Explicitly out of scope for now

- staging, committing, pushing, tagging, or deploying current changes;
- redesigning the entire information architecture;
- adding broad chat or unbounded memory behavior;
- adding replacement technologies without a verified incompatibility;
- polishing demo screenshots before the UI and behavior stabilize;
- deliberately interrupting the public Cloud Run service without a separately approved, controlled test;
- dependency downgrades or unrelated dependency remediation;
- submission packaging or final demo recording;
- new product features that do not correct an observed judge-facing defect.

## Stop conditions

Stop and verify before proceeding when:

- a scan exposes credentials, private data, or an unexpected public-source boundary;
- evidence contradicts an existing project or compliance claim;
- a proposed correction changes architecture rather than narrowly correcting behavior;
- a test could degrade the public service or alter unrelated Firestore records;
- the same failure cannot be reproduced and may be generation variance;
- implementation would begin before the correction set is reviewed;
- work drifts toward submission polish while behavioral blockers remain unresolved.

## Completion criteria for this temporary slice

This slice is complete only when:

- the agreed behavioral matrix has enough representative evidence;
- repeated defects are separated from one-off generations;
- the user has reviewed the consolidated findings;
- a narrow correction set has been explicitly approved;
- approved corrections are implemented and verified;
- the deployed result is retested where required;
- evidence and status documents reflect actual post-correction behavior;
- the user approves staging and the temporary document is archived.

## Tomorrow's starting action — 14 August 2026

Begin by reading this handoff and reviewing `docs/demo-evidence-ledger.md`. Confirm the recorded cases and remaining matrix before taking any action. Then deliberately choose whether tomorrow should gather more Phase 1 evidence or whether the existing evidence is sufficient to begin Phase 2 consolidation. Do not begin product-code correction or demo polish merely because the likely defects are already visible.
