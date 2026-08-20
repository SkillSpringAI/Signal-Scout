# Final candidate evidence — 20 August 2026

This directory preserves the sanitized judge-facing evidence captured from Cloud Run revision `signal-scout-00016-c9x` at 100% traffic.

## Named scans

| Purpose | Scan ID | Result | Preserved proof |
|---|---|---|---|
| Golden workflow | `c3c0f521-0b3d-41ea-855d-83a42db22df8` | `completed` | 2 sources (`event`, `project`), 9 Activity events, validated analysis, one feedback adaptation, one recorded clarification |
| Honest partial | `2f6c053a-5fdf-4bde-ac0b-5723a61259b8` | `partial` | 1 project source retained, 4 Activity events, no validated analysis, recommendations withheld with `EVENT_SOURCE_UNAVAILABLE` |
| Honest failure | `c716b724-684c-46f3-92e2-f9a21d42cf80` | `failed` | 0 sources, 3 Activity events, no analysis, explicit no-report result with `RETRIEVAL_FAILED` |

## Folder guide

- `Live/`: the complete golden workflow, from Live entry through evidence, analysis, Activity, feedback adaptation, clarification recording, and Field Report.
- `live partial fail/`: a nondestructive event-source failure in which the public project source is retained and recommendations are withheld.
- `full fail/`: a zero-source failure with an explicit no-report result. The final Memory image separately records the browser burst-limit guard and is capacity evidence, not part of the zero-source failure sequence.
- `Mock/`: supporting screenshots proving the fixture workflow remains visibly distinct from Live mode.
- `powershell/`: sanitized Cloud Run and named Firestore metadata proof.
- `github/`: public repository checkpoint `2b08d14`, rendered MIT license, and the compact README architecture diagram.

## Sanitization and verification notes

- `powershell/Screenshot 2026-08-20 152033.png` shows the service URL, final revision, 100% traffic, maximum scale 2, dedicated runtime identity, Firestore mode, Gemini model identifier, and Secret Manager reference name. It does not show a secret value.
- `powershell/Screenshot 2026-08-20 153730.png` shows only the named golden scan metadata: timestamps, source count and roles, Activity count, analysis presence, feedback count, and clarification presence. It does not enumerate unrelated Firestore records.
- `github/01-public-repository-checkpoint-2b08d14.png`, `02-mit-license.png`, and `03-architecture-at-a-glance.png` complete the final public-repository, licensing, and architecture evidence without displaying account settings or private data.
- Public event/project URLs and public organizer addresses visible in the application output are sourced submission evidence, not private credentials.
- A post-run check on 20 August returned HTTP health `{ "ok": true, "service": "signal-scout-api" }`, confirmed revision `signal-scout-00016-c9x` at 100% traffic, and found no error-severity logs for that revision from `2026-08-20T02:50:00Z` onward.
- Browser screenshots use local New Zealand time; persisted timestamps shown by the metadata proof are UTC.
