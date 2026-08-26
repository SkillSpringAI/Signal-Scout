# Signal Scout

> **Current verified status (20 August 2026):** Signal Scout is publicly deployed on Cloud Run revision `signal-scout-00016-c9x` from product commit `8307d80`. The final golden workflow, evidence package, honest partial state, and explicit failure state are preserved at repository checkpoint `6bd3027`. Current golden proof scan: `c3c0f521-0b3d-41ea-855d-83a42db22df8`.

Signal Scout turns a hackathon and a builder's goals into a sourced field analysis, strategic project gaps, a learning shortlist, and an actionable build plan, while preserving a visible trace of every source and processing step.

```text
official Devpost URL + builder context + optional public GitHub project URLs
  -> retrieve -> extract -> validate -> compare -> rank
  -> generate Field Report -> expose Activity and evidence
  -> adapt one sourced recommendation from explicit feedback
```

## Hackathon alignment

- Event: [All Things Agentic Hackathon](https://allthingsagentichackathon.devpost.com/)
- Category: **The Collaborative Partner**
- Required stack: Gemini 3.5+ through a qualifying Google agent framework and at least one Google Cloud infrastructure service
- Implemented stack: Gemini 3.5 Flash, Google GenAI SDK, Cloud Run, and Firestore Native
- Public verified deployment: https://signal-scout-212660130578.australia-southeast1.run.app
- Public repository: https://github.com/SkillSpringAI/Signal-Scout
- Published Devpost submission: https://devpost.com/software/signal-scout

The live path is the submission workflow. The deterministic mock is visibly labelled and exists only for tests, offline development, and a no-cost product orientation.

## Submission essentials

| Requirement | Signal Scout evidence |
|---|---|
| Spin-up instructions | Follow [Install and verify](#install-and-verify), then choose the deterministic Mock path or the Live local path below. Cloud deployment guidance is under [Container and Cloud Run](#container-and-cloud-run). |
| Architecture diagram | The diagram below explicitly connects the React frontend, Cloud Run backend, public sources, Gemini 3.5 Flash, Firestore, and Secret Manager. A [portable PNG](docs/architecture-diagram.png), [SVG](docs/architecture-diagram.svg), and [annotated architecture page](docs/architecture-diagram.md) are included. |
| Demonstration video | [Signal Scout: Your AI Hackathon Copilot \| Live Demo](https://youtu.be/Lc3Z60dAFNI) is public and runs 3:26. It explains the problem and value proposition, shows the application workflow, and includes Google Cloud deployment proof. |
| Devpost submission | [Signal Scout on Devpost](https://devpost.com/software/signal-scout) is published with the final project summary, repository, and demonstration video. |

## Architecture at a glance

![Signal Scout live architecture showing the browser, Cloud Run service, public sources, Gemini, Firestore, and Secret Manager](docs/architecture-diagram.png)

The browser receives structured results only. Retrieval, Gemini calls, validation, persistence, capacity checks, and credentials remain in the Cloud Run backend. The [architecture notes](docs/architecture-diagram.md) document the trust boundaries and prototype limitation without crowding the submission diagram.

## Prerequisites

- Node.js 22.x and npm 10+
- A Gemini API key for live-local mode
- Application Default Credentials and a Firestore Native database only when testing Firestore mode

Do not place API keys, service-account JSON, or ADC contents in the repository, browser, screenshots, or demo video.

## Install and verify

From a clean checkout:

```bash
npm ci
npm run preflight
```

`preflight` runs the TypeScript checks, complete Vitest suite, client production build, and server compilation.

## Run the deterministic mock

```bash
npm run dev
```

Open the local Vite URL, leave **Execution** set to **Mock demo**, and run the guided fixture. All mock projects, people, scores, signals, findings, and memory are synthetic and must not be used as submission evidence.

## Run the live workflow locally

1. Copy `.env.example` to `.env` without committing it.
2. Set `GEMINI_API_KEY` to a server-side key.
3. Keep `SCAN_STORE=memory` for an ephemeral local run, or set `SCAN_STORE=firestore` and configure Application Default Credentials.
4. Build and start the combined production UI/API:

```bash
npm run build
npm start
```

5. Verify `http://localhost:8080/api/health` returns:

```json
{ "ok": true, "service": "signal-scout-api" }
```

6. Open `http://localhost:8080`, select **Live scan**, and use a public Devpost event page plus optional public GitHub project URLs.

The default public-demo policy allows Devpost event hosts and GitHub project hosts, limits one request to one event plus five project URLs, permits 50 scan/retry/feedback actions per UTC day, and applies a three-action-per-client burst limit over ten minutes. Limits and host lists are configurable through `.env.example`. HTTP `429 DEMO_CAPACITY_REACHED` is an intentional safe state.

## Container and Cloud Run

Build the same multi-stage Node 22 image used by Cloud Run:

```bash
docker build -t signal-scout .
docker run --rm -p 8080:8080 --env-file .env signal-scout
```

For Cloud Run:

- set `SCAN_STORE=firestore`;
- use a dedicated runtime service account with only required Firestore and Secret Manager access;
- mount `GEMINI_API_KEY` from Secret Manager rather than a literal environment value;
- retain minimum instances `0` and maximum instances `2`;
- configure the demo usage and allowed-host variables from `.env.example`;
- verify the health route, one complete event-plus-project scan, one feedback turn, Firestore persistence, and error-severity logs after deployment.

The exact verified commands, revisions, identities, and proof jobs are recorded in [Gate 2 runtime guide](docs/gate-2-runtime.md). Never copy credentials or unrelated Firestore records into deployment evidence.

## Public API

- `POST /api/scans` — create a bounded scan
- `GET /api/scans/:id` — poll persisted state
- `POST /api/scans/:id/cancel` — request cancellation
- `POST /api/scans/:id/retry-analysis` — use the one preserved-source analysis retry when applicable
- `POST /api/scans/:id/feedback` — apply the one bounded feedback turn
- `POST /api/scans/:id/clarification` — persist one answer to the generated clarification without another model call

The client receives structured jobs and source evidence, never Gemini or Google Cloud credentials. Capacity guards return HTTP `429`, `Retry-After`, and `{ "error": "DEMO_CAPACITY_REACHED", "message": "..." }`.

## Known prototype limits

- Scan execution begins process-locally with `setImmediate`; completed and partial Firestore records are durable, but an in-flight job is not automatically resumed after container interruption.
- The public deployment is a bounded hackathon demo, not a production multi-tenant service or general crawler.
- Only one analysis retry and one feedback adaptation are permitted per applicable scan.
- Six moderate transitive `uuid` advisories currently arrive through Firebase Admin dependencies. The offered automated fix crosses a breaking Firebase Admin downgrade, so the risk is documented rather than force-fixed before the demo.
- Mock permission modes are presentational outside their explicitly tested mock-memory boundary.

## Public demo and submission

[![Watch the Signal Scout live demo](docs/assets/signal-scout-youtube-thumbnail.png)](https://youtu.be/Lc3Z60dAFNI)

- [Watch the 3:26 public demo](https://youtu.be/Lc3Z60dAFNI)
- [View the published Devpost submission](https://devpost.com/software/signal-scout)
- [Try the deployed application](https://signal-scout-212660130578.australia-southeast1.run.app)

The published video preserves the continuous Live workflow, sourced results, feedback adaptation, clarification, architecture, and sanitized Cloud Run proof. The project owner completed the final caption, rights, privacy, and secret-exposure review before submission.

## Project documentation

Current technical and submission references:

- [Architecture](docs/architecture.md) and [portable diagram](docs/architecture-diagram.md)
- [Gate 2 runtime and deployment guide](docs/gate-2-runtime.md)
- [Submission compliance record](docs/submission-compliance.md)
- [Safety and permissions](docs/safety-and-permissions.md)
- [Prior-work disclosure](docs/prior-work-disclosure.md)

Archived demo-production and verification records:

- [Final demo evidence ledger](docs/demo-evidence-ledger.md)
- [Demo narration script](docs/demo-video-script.md), [operator screenplay](docs/demo-screenplay.md), and [manual walkthrough](docs/manual-demo-walkthrough.md)
- [Final-candidate screenshots and sanitized runtime proof](docs/evidence/final-candidate/2026-08-20/README.md)
- [UI, scan-quality, cloud-budget, eligibility, and organizer-email evidence archive](docs/evidence/)
- [Historical implementation plans and handoff notes](docs/archive/README.md)
- [Hackathon execution plan](docs/hackathon-execution-plan.md)

Official Devpost requirements override repository notes. Organizer emails are retained separately as supplementary guidance and do not replace the official overview or rules.

## License

Signal Scout is available under the [MIT License](LICENSE). Copyright (c) 2026 Isac Thompson.
