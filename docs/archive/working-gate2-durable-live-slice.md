# Temporary Working Document — Gate 2 Durable Live Workflow

> **Archived 13 August 2026:** this operational slice is complete and superseded by `docs/gate-2-runtime.md`. Retained as implementation history; it is not an active plan or status source.

> **Purpose:** operational scratch document for the next Gate 2 slice. This is not an authoritative roadmap and should be deleted or archived when the slice is complete.
>
> **Checkpoint:** `ced23bf` / `checkpoint-gate2-gemini-runtime`
> **Started:** 13 August 2026
> **Selected category:** The Collaborative Partner

## Where we left off

Verified:

- Node/TypeScript scan API and typed request/output contracts
- bounded retrieval of the official Devpost URL
- real `gemini-3.5-flash` execution through Google GenAI SDK
- schema-validated structured output with source-linked gaps and explicit uncertainties
- visible lifecycle stages and honest `completed`, `partial`, `failed`, and `cancelled` behavior
- server-only Gemini credentials
- optional Firestore adapter implemented
- frontend and backend production build
- 41 passing tests at the checkpoint
- Google Cloud project, required APIs, ADC, and Firestore Native database configured in `australia-southeast1`

Not yet verified:

- real Firestore read/write behavior through `signalScoutScans`
- UI calls to the live API
- UI rendering of real Activity, evidence, partial failure, and Field Report data
- continuity or feedback behavior needed for The Collaborative Partner track
- clean-checkout reproduction
- Cloud Run build/deployment and public proof

## Slice objective

Produce one durable local live workflow in which the React UI starts a real scan, the backend retrieves the official hackathon source and invokes Gemini, Firestore preserves the job/activity/report state, and the UI renders the resulting evidence and terminal state without confusing it with synthetic mock data.

This slice stops before public Cloud Run deployment. It should leave deployment as a low-risk packaging and configuration step rather than the first time the integrated product is exercised.

## Required user-visible flow

```text
choose LIVE mode
  -> enter builder context
  -> start official-source scan
  -> see retrieving/extracting/validating/synthesizing activity
  -> see completed, partial, failed, cancelled, or needs-input state
  -> inspect source URL and collection timestamp
  -> inspect sourced analysis and uncertainties
  -> provide or retain context for a later guided interaction
```

Mock mode must remain available and must be visually unmistakable from live mode.

## Work sequence

### Progress log

- 13 August 2026: Firestore adapter validation added; local tests reached 43/43; first real ADC-backed create/read/update/validation probe succeeded. Cleanup verification is being tightened before this step is closed.
- 13 August 2026: Integrated UI/API/Firestore/Gemini scan completed, but quality verification stopped on model serialization residue and unjustified stack drift. Approved correction: verified stack choices are constraints, while replacements remain permissible only when a concrete incompatibility or unmet requirement is identified and explained.
- 13 August 2026: Corrected rerun passed stack and serialization checks. Work paused on the phrase "dynamic prompt injection techniques," which incorrectly used attack terminology for personalization. Approved narrow rule: permit "prompt injection" only for threats, detection, defense, or mitigation.
- 13 August 2026: Third real scan passed terminology, citation, serialization, and stack-constraint checks (`1a8e951b-5c01-4315-89ec-51c97a1fb765`).
- 13 August 2026: Bounded Collaborative Partner feedback workflow verified through UI, API, Gemini, and Firestore (`2fb3e320-608b-4f60-a428-5e52454532de`): one explicit feedback entry, one adapted sourced recommendation, one targeted clarification, and one feedback Activity event.
- 13 August 2026: User approved clean-checkout verification and Cloud Run deployment. Six moderate transitive `uuid` findings are a documented non-blocking risk; the breaking Firebase Admin downgrade is prohibited for this deployment slice.
- 13 August 2026: Clean-checkout audit exposed that local Vitest runs were also discovering compiled tests under `dist-server`, inflating test counts. Test configuration now excludes generated build directories; deployment verification requires matching source-only results locally and in the isolated checkout.

### 1. Firestore integration proof

- exercise `FirestoreScanStore` using ADC and project `gen-lang-client-0047054532`
- use database `(default)` and collection `signalScoutScans`
- create a deliberately labelled integration-test record
- verify read-after-write and job/event round-trip validation
- remove the test record after verification if safe and explicitly targeted
- add adapter tests using an injected collection boundary where practical
- do not recreate the database or change its region/security configuration

Done when a scan record can be written, read, updated, and schema-checked without service-account JSON.

**Status:** complete. Real ADC-backed create/read/update/delete probe passed; integrated scan and feedback records also persisted successfully.

### 2. Strengthen durable job behavior

- validate Firestore documents when reading them
- prevent stale updates from overwriting cancellation or terminal states
- make process-local execution limitations explicit
- decide whether restart recovery is required for the demonstration; do not introduce Pub/Sub or Cloud Tasks unless evidence shows it is necessary
- add bounded model retry behavior for transient `429`/`5xx` responses without retrying validation failures

Done when failure, cancellation, and partial results remain consistent in persisted state.

**Status:** complete for this slice. Conditional writes prevent stale cancellation overwrites; transient model retries are bounded to configured attempts; malformed output remains fail-fast.

### 3. Add a browser API client

- create typed client calls for health, create scan, poll/read scan, and cancel scan
- never import server-only configuration or Google SDK code into the browser bundle
- handle unavailable API, invalid input, timeouts, and terminal states
- keep polling bounded and visible

Done when client behavior is unit-testable without a running server.

**Status:** complete. Health, create, poll, cancel, feedback, unavailable API, and polling-limit paths are typed and tested.

### 4. Integrate live mode into the UI

- replace the current permission-style mode selector with an honest `Mock demo` / `Live scan` distinction, or add a separate execution-mode control
- keep synthetic fixture screens visibly labelled
- accept the official hackathon URL, builder goals/context, and optional public project URLs
- show actual job Activity events rather than generated UI placeholders
- show sources, timestamps, evidence links, structured findings, build plan, and uncertainties
- show cancellation and partial/failure states
- ensure a live result cannot be mistaken for fixture output and fixture output cannot be presented as real research

Done when the user can complete the real local workflow without calling the API manually.

**Status:** complete. Real scan, evidence, Activity, report, partial/failure surfaces, and mock/live separation are wired into the UI.

### 5. Collaborative Partner continuity

- capture targeted missing context rather than asking broad conversational questions
- preserve builder context and explicit feedback with the scan/report state
- define the smallest follow-up interaction that adapts a recommendation from user feedback
- keep durable memory changes approval-gated
- do not expand into a general chat system

Done when the category fit is demonstrated through guided clarification and feedback continuity, not merely described in documentation.

**Status:** complete for the bounded proof. Explicit feedback is persisted with the scan, adapts one sourced recommendation, and produces exactly one targeted clarification; it does not create a general chat system or silently grant durable memory.

### 6. Integrated verification

- run the real official-source scan through the UI with Firestore enabled
- verify the same job in the UI, API, and Firestore
- exercise one partial or bounded failure path
- confirm Gemini model identifier appears only in safe diagnostics
- run `npm run preflight`
- run production dependency audit and record unresolved findings
- test setup instructions from a clean checkout or temporary clone

Done when local behavior is reproducible and deployment-ready.

## Decisions already made

- Category: **The Collaborative Partner**
- Google Cloud project: `gen-lang-client-0047054532`
- Region: `australia-southeast1`
- Firestore: `(default)`, Native mode, collection `signalScoutScans`
- Cloud Run service name: `signal-scout`
- Cloud Run min/max: `0` / `2`
- Public Cloud Run access is allowed for the hackathon demonstration
- Model: `gemini-3.5-flash`
- Framework: Google GenAI SDK
- Node 22 is pinned in the container; local Node 24 may remain
- Cloud Build is preferred; local Docker is not required unless debugging creates a concrete need
- Credentials remain server-side and `.env` remains untracked

Do not reopen these choices without concrete implementation evidence.

## Stop and request approval if

- Firestore database recreation, location change, or security relaxation is proposed
- an unexpected billable service or material cost is required
- additional credentials or service-account key files appear necessary
- public deployment would expose an incomplete or unsafe route
- a migration would delete or rewrite non-test Firestore records
- implementation would materially expand into general crawling, multi-agent orchestration, CRM, or automated outreach

## Verification commands

```powershell
npm run typecheck
npm test
npm run build
npm run preflight
npm audit --omit=dev
git diff --check
git status --short
```

Google Cloud CLI is installed at:

```text
C:\Program Files (x86)\Google\Cloud SDK\google-cloud-sdk\bin\gcloud.cmd
```

Use the absolute path until the current process PATH includes it. Do not print access tokens or ADC contents.

## Slice completion report

Before closing this slice, report:

1. files changed
2. Firestore evidence and record lifecycle
3. live UI workflow demonstrated
4. Collaborative Partner behavior demonstrated
5. failure/cancellation behavior tested
6. exact verification commands and results
7. dependency/security findings
8. remaining Cloud Run blockers
9. recommendation on whether to proceed to deployment

Do not commit, push, tag, or deploy without separate explicit authorization.
