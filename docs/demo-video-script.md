# Demo Video Script — Target 3:40–3:50

## 0:00–0:25 — Problem and value

Hackathon builders lose time translating dense rules into grounded project decisions. Signal Scout is a Collaborative Partner that inspects an official event and public project evidence, produces sourced findings and a build plan, then adapts one recommendation from explicit feedback.

## 0:25–2:25 — Unedited live execution

- Show Live mode, the official Devpost URL, public Signal Scout repository, and builder context.
- Start the scan without cutting the execution segment.
- While it runs, point out visible Activity and the separation between collected event and project evidence.
- On completion, show requirements, dual-source findings, confidence, next actions, uncertainties, and the Field Report.

## 2:25–3:10 — Collaborative adaptation

- Apply the prepared limited-time feedback.
- Show the adapted recommendation, what changed and why, supporting sources, and one targeted clarification.
- Briefly show that the single feedback boundary is enforced.

## 3:10–3:35 — Architecture and Google Cloud proof

- Show the architecture image and explain React → Cloud Run Node API → bounded retrieval → Google GenAI SDK/Gemini → schema/semantic validation → Firestore.
- Show only the Cloud Run service/revision, `.run.app` URL, Firestore proof record for the named scan, and safe log summary.
- Mention Secret Manager and the dedicated runtime identity without displaying secret values or unrelated records.

## 3:35–3:50 — Honest close

State that Signal Scout is a bounded public demo: it scales to zero, enforces host and usage limits, preserves partial evidence, and does not claim production-grade job recovery or multi-agent behavior.

Recording acceptance: public YouTube or Vimeo, English or English subtitles, no longer than four minutes, unedited live-action segment present, and backend-on-Google-Cloud proof visible.
