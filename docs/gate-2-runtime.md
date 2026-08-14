# Gate 2 Runtime Guide

> Status: local and deployed runtime verified through Google GenAI SDK, Gemini 3.5 Flash, Firestore Native, and Cloud Run on 13 August 2026.

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

`POST /api/scans` creates a job and accepts one hackathon URL, builder context, and up to five optional public project URLs. The server retrieves bounded public text, records provenance and timestamps, invokes Gemini through the Google GenAI SDK, validates structured output, and records visible lifecycle events. `GET /api/scans/:id` returns state and `POST /api/scans/:id/cancel` requests cancellation.

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
