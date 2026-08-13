# Gate 2 Runtime Guide

> Status: local runtime spine and credentialed Gemini execution verified. The official stable model identifier `gemini-3.5-flash` and structured-output support were rechecked in Google documentation on 13 August 2026. Firestore integration, UI live-mode integration, Cloud Run deployment, and deployment evidence remain unverified.

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

## Runtime path

`POST /api/scans` creates a job and accepts one hackathon URL, builder context, and up to five optional public project URLs. The server retrieves bounded public text, records provenance and timestamps, invokes Gemini through the Google GenAI SDK, validates structured output, and records visible lifecycle events. `GET /api/scans/:id` returns state and `POST /api/scans/:id/cancel` requests cancellation.

Terminal states are `completed`, `partial`, `failed`, `cancelled`, and `needs_input`. A model failure after successful retrieval is `partial` so source evidence is preserved.

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

Build with `docker build -t signal-scout .`. The resulting container serves the built frontend and API on `PORT`. Cloud Run deployment remains an evidence-gated step and must not be marked complete until a real deployment and scan are captured.

## Retrieval boundary

- HTTP/HTTPS public inputs only
- one official URL plus at most five project URLs
- local, private literal IP, `.local`, and `.internal` targets blocked
- redirects validated and capped at three
- HTML and plain text only
- configurable timeout and 500 KB default response limit
- extracted content is labelled untrusted in the Gemini prompt

DNS resolution and an explicit deployment allowlist should receive an additional hardening pass before public exposure.

## Known local environment gaps

- Neither Docker nor the Google Cloud CLI is installed in the current environment, so the container and Cloud Run path cannot yet be executed locally.
- `npm audit --omit=dev` reports six moderate transitive `uuid` findings through Firebase Admin's Google Cloud Storage dependency. The suggested forced remediation downgrades Firebase Admin across a breaking boundary, so it has not been applied without a compatibility review.
