# Gate 2 Runtime Guide

> Status: local and deployed runtime verified through Google GenAI SDK, Gemini 3.5 Flash, Firestore Native, and Cloud Run. The current deployed baseline is revision `signal-scout-00011-zx8`, verified on 16 August 2026.

## Verified local live scan — 13 August 2026

A credentialed scan of `https://allthingsagentichackathon.devpost.com/` completed through Google GenAI SDK and `gemini-3.5-flash`.

- job: `8229ac9a-b67d-43ca-aa2e-adea16a11136` (ephemeral in-memory evidence; not a durable public identifier)
- status: `completed`
- real sources retrieved: 1
- lifecycle events: 6 (`retrieving`, `extracting`, `validating`, `synthesizing`, `completed`)
- server-schema validation: passed
- extracted requirements: 5
- extracted judging criteria: 3
- strategic gaps: 3; every gap included a source URL
- learning shortlist items: 3
- build-plan steps: 6
- uncertainties preserved: 3

No credential value was returned to the browser, logs, or evidence output.

## Verified durable live workflow — 13 August 2026

- Firestore Native create/read/update/schema-validation/delete probe passed through ADC in collection `signalScoutScans`.
- React live mode ran a real official-source scan through the Node API, Gemini, and Firestore.
- Mock and live execution are explicitly separated in the UI.
- Persisted job `1a8e951b-5c01-4315-89ec-51c97a1fb765` passed citation, serialization-residue, terminology, and verified-stack checks.
- Persisted job `2fb3e320-608b-4f60-a428-5e52454532de` demonstrated The Collaborative Partner behavior: one explicit feedback entry produced one adapted sourced recommendation, one targeted clarification, and one visible Activity event.
- Conditional persistence prevents stale workers from overwriting cancellation or terminal state.
- Transient Gemini `429`/`5xx` retries are bounded; schema and semantic validation failures are not retried.

## Runtime path

`POST /api/scans` creates a job and accepts one hackathon URL, builder context, and up to five optional public project URLs. The server retrieves bounded public text, records provenance and timestamps, invokes Gemini through the Google GenAI SDK, validates structured output, and records visible lifecycle events. `GET /api/scans/:id` returns state and `POST /api/scans/:id/cancel` requests cancellation. In the current local correction slice, `POST /api/scans/:id/retry-analysis` permits one deliberate analysis retry after a model-validation rejection and reuses the preserved sources without retrieving them again.

Terminal states are `completed`, `partial`, `failed`, `cancelled`, and `needs_input`. A model failure after successful retrieval is `partial` so source evidence is preserved.

## Verified Cloud Run deployment — 13 August 2026

- Public service: `https://signal-scout-212660130578.australia-southeast1.run.app`
- Region: `australia-southeast1`; revision `signal-scout-00004-9hl` serves 100% of traffic.
- Scaling: minimum 0 (default), service maximum 2.
- Runtime identity: `signal-scout-runtime@gen-lang-client-0047054532.iam.gserviceaccount.com`.
- `GEMINI_API_KEY` is a Cloud Run Secret Manager reference to `signal-scout-gemini-api-key:latest`, not a plain environment value.
- The secret-level IAM policy grants `roles/secretmanager.secretAccessor` only to the runtime identity.
- Health and public UI returned HTTP 200.
- Firestore-backed scan `0938e5bf-4320-4a87-8455-2b95ecd5cb15` completed with a retrieved official source and validated analysis.
- One feedback turn persisted an adapted sourced recommendation and one clarifying question; a second feedback request returned HTTP 409.
- Two earlier deployed scans safely ended `partial` when semantic validation rejected model output; no credential, build, Firestore, or container failure occurred.

## Constraint-grounding revision — 14 August 2026

- Public revision `signal-scout-00007-vb6` serves 100% of traffic.
- Scaling remains minimum 0 and maximum 2; the dedicated runtime identity and Secret Manager reference are unchanged.
- The analysis and feedback prompts no longer receive Signal Scout runtime technologies as analyzed-project constraints.
- Project constraints are derived only from explicit builder context or collected project evidence.
- Collected sources persist an `event` or `project` evidence role; the field remains optional so earlier Firestore records remain readable.
- Combined requirement and current-project claims must cite both event and project evidence. Unsupported absence/current-state claims are rejected.
- Preflight passed with 51 tests before deployment.
- Neutral CALL-E scan `d6f4a2bb-ae51-4630-8323-98333bb35113` completed without Signal Scout runtime leakage or unsupported project-state claims.
- Rules-plus-repository scan `192b9f41-d20a-4727-b27b-95e98bbce8bf` completed with two evidence roles and dual-source grounding for combined gaps.
- One bounded feedback turn persisted on `192b9f41-d20a-4727-b27b-95e98bbce8bf`, preserved the verified project stack, and cited both sources.
- No error-severity logs were observed for revision `signal-scout-00007-vb6` during deployed verification.

## Judge-clarity and partial-result correction — local verification, 14 August 2026

- Live inputs now explain useful builder context and the public-only project URL boundary.
- User-facing `Patterns / Clusters and gaps` terminology is presented as `Findings / Requirements and strategic gaps`.
- Activity copy explains source checking, evidence analysis, validation, and source linking in outcome language while persisted lifecycle status values remain unchanged.
- A model-validation rejection still fails closed and preserves collected sources.
- The partial state leads with `Sources collected; recommendations withheld`, keeps exact validator text in secondary technical details, and links the preserved sources.
- One user-triggered analysis retry reuses the stored sources. A second deliberate retry is rejected, including when the first retry also fails validation.
- `npm run preflight` passed with 55 tests: typecheck, complete regression suite, and production build.
- The production UI loaded locally with the revised live-input presentation and no browser console warnings or errors.
- This correction slice was subsequently deployed as part of revision `signal-scout-00009-wrp` and verified on 15 August 2026.

## Submission-readiness guard and responsive slice — deployed 15 August 2026

- scan creation, deliberate analysis retry, and feedback now pass through an injected usage guard;
- Firestore mode uses an atomic UTC-day counter; the deployed default is 50 costly actions per day;
- a process-local per-client window allows three costly actions over ten minutes before returning HTTP `429`, `Retry-After`, `DEMO_CAPACITY_REACHED`, and judge-facing mock guidance;
- event sources are restricted to configured Devpost hosts and project sources to configured GitHub hosts in the deployed configuration;
- the role-specific host policy is reapplied on redirects and hostnames resolving to private/local addresses are rejected before fetch;
- the 390 px intrinsic-width defect is corrected by constraining the responsive grid/sidebar and allowing only the navigation strip to scroll;
- Node 22 is aligned across package metadata, CI, Docker, and setup instructions;
- `npm run preflight` passed with 63 tests plus typecheck and both production builds;
- an isolated dependency-free candidate copy completed `npm ci` and reproduced the same 63 tests and production bundle hashes;
- the production bundle passed 1440×900, 1280×720, 768×1024, and 390×844 browser checks with no page-level overflow or console warnings/errors;
- revision `signal-scout-00009-wrp` serves 100% traffic with min 0, max 2, the dedicated runtime identity, and the existing Secret Manager reference;
- golden scan `b66b7629-26ce-41e6-b9b9-4b6477f56b07` completed with event/project evidence roles and dual-source grounding for both strategic gaps;
- one feedback turn persisted an adapted recommendation with two sources and one clarification; the second turn returned `409`;
- the fourth costly request returned `429 DEMO_CAPACITY_REACHED`, while the Firestore usage document recorded the three admitted actions;
- the deployed four-viewport matrix passed with no page overflow or console warnings/errors;
- no error-severity logs were observed for `signal-scout-00009-wrp` after verification.

Budget evidence note: the project owner verified an alerts-only USD $25 monthly project budget with actual-spend thresholds at 50%, 80%, and 100%. Redacted configuration screenshots are preserved under `docs/evidence/cloud-budget/`.

## Walkthrough correction slice — deployed 16 August 2026

- the live sidebar uses a neutral identity before analysis, adopts the validated event name after analysis, and clears stale identity as soon as the event input changes;
- finding and feedback citations identify Devpost event evidence separately from the relevant GitHub repository evidence;
- prompt and semantic validation treat explicitly completed public Cloud Run deployment work as complete while still allowing proof-capture recommendations;
- the default golden-run builder context accurately states the current deployed implementation and asks for only genuinely outstanding work;
- a live event-timeout walkthrough exposed that project-only evidence could still reach event analysis; the runner now preserves project evidence but withholds all event requirements and recommendations when no official event source is collected;
- `npm run preflight` passed with 68 tests, typecheck, and both production builds;
- revision `signal-scout-00011-zx8` serves 100% traffic with max 2, default min 0, the dedicated runtime identity, the existing Secret Manager reference, and a passing health route;
- local and deployed live-entry screens showed the neutral `Public hackathon scan` identity with no console warnings or errors; the local 390 px check had no page-level overflow.
- corrected golden scan `e543fe32-96fa-458c-af5e-a9ea61706a58` completed with both event and project evidence, five requirements, three judging criteria, and two dual-source gaps limited to genuinely outstanding submission work;
- one feedback turn adapted the recommendation toward the smallest demonstrable feedback loop, explained the change, cited both sources, and asked one targeted clarification.

## Local live-mode setup

1. Copy `.env.example` to `.env` without committing it.
2. Set `GEMINI_API_KEY` to a server-side key and confirm the organizer-supported Gemini model identifier in `GEMINI_MODEL`.
3. Run `npm run build`.
4. Load the environment variables in your shell and run `npm start`.
5. Verify `GET http://localhost:8080/api/health`.

The browser never receives Gemini or Google Cloud credentials.

## Firestore mode

Set `SCAN_STORE=firestore` and use Application Default Credentials. On Cloud Run, assign a narrowly scoped service account with Firestore access. Do not package service-account JSON into the image.

## Container

Build with `docker build -t signal-scout .`. The resulting container serves the built frontend and API on `PORT`. Cloud Build successfully built and deployed this container from the secret-excluding `.gcloudignore` context.

## Retrieval boundary

- HTTP/HTTPS public inputs only
- one official URL plus at most five project URLs
- local, private literal IP, `.local`, and `.internal` targets blocked
- redirects validated and capped at three
- HTML and plain text only
- configurable timeout and 500 KB default response limit
- extracted content is labelled untrusted in the Gemini prompt

DNS resolution and an explicit deployment allowlist remain candidates for an additional hardening pass.

## Known dependency risk

- `npm audit --omit=dev` reports six moderate transitive `uuid` findings through Firebase Admin's Google Cloud Storage dependency. The suggested forced remediation downgrades Firebase Admin across a breaking boundary, so it has not been applied without a compatibility review.

## Accepted dependency risk — 13 August 2026

The six moderate transitive `uuid` findings are accepted as a documented, non-blocking risk for the current deployment verification. Do not apply the breaking Firebase Admin downgrade. Reassess after deployed verification, or sooner if the findings affect Cloud Build, runtime behavior, security requirements, or submission eligibility.
