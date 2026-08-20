# Demo Video Script — Product Demo Draft

**Target runtime:** 3:30–3:40, leaving at least 20 seconds of margin.

**Track:** The Collaborative Partner.

**Live candidate:** Cloud Run revision `signal-scout-00016-c9x`.

**Golden fallback:** scan `c3c0f521-0b3d-41ea-855d-83a42db22df8`.

This is a product story, not a technical walkthrough. Speak conversationally. Let the interface prove the detail, and use technical names only where they establish eligibility, trust, or Google Cloud deployment.

## Spoken script

### 0:00–0:22 — The problem

**Screen:** Deployed Signal Scout in Live mode with prepared inputs visible.

> Hackathon builders often lose valuable build time reading long rule pages, checking their repository, and deciding what actually needs attention. Signal Scout turns that work into a clear, sourced plan, then adapts one recommendation when the builder explains what matters most.

### 0:22–0:42 — Start the Live scan

**Action:** Point briefly to the Devpost URL, GitHub URL, and builder context. Click **Run live scan**.

> I’ll give it the official event page, my public project, and a short description of what is already complete. This is the deployed Live experience, not the sample data. From this click through the result, the recording is continuous.

### 0:42–1:08 — Show the work happening

**Screen:** Activity while the scan runs. If needed, show the architecture tab during the wait and return to Activity.

> Signal Scout checks both public sources, keeps a visible record of each step, and separates event requirements from evidence about the current project. It only presents recommendations after the result passes its evidence checks. If a source is unavailable, it says so instead of inventing an answer.

### 1:08–1:45 — The useful result

**Action:** Show Project field, one requirements view, one dual-source Finding, Opportunities, uncertainty, and Field Report.

> Here, the requirements are grounded in the event, while claims about completed work are grounded in the repository. Each important gap links back to the evidence supporting it. The builder gets a short list of next actions, with uncertainties kept separate, and the Field Report brings the decision into one clear view.

### 1:45–2:12 — Adapt to the builder

**Action:** Open Memory, show the prepared feedback, and submit it once.

> Now I can add a real constraint: “I have limited time, so prioritize the smallest demo-critical implementation that proves guided adaptation.” Signal Scout updates one recommendation to match that priority instead of adding another competing plan.

### 2:12–2:40 — Brief architecture and Google Cloud proof

**Screen:** Show the compact README architecture, then the sanitized Cloud Run service view or approved proof.

> The browser is intentionally simple. The real work runs in a private backend on Google Cloud Run. It collects the public evidence, uses Gemini 3.5 Flash through Google’s GenAI SDK, checks the result, and saves the scan and feedback in Firestore. Secret Manager keeps the Gemini key out of the browser. This is the live Cloud Run service at one hundred percent traffic, with the public dot run dot app address visible.

### 2:40–3:16 — Show what changed and answer

**Action:** Return to Memory. Show the adapted recommendation, `Changed because`, confidence, both evidence links, and targeted question. If the verified question appears, enter `No, the above advice is sufficient.`; otherwise give a short truthful answer that directly fits the displayed question. Press Enter once.

> The updated recommendation explains what changed and why, keeps the supporting sources, and asks one focused follow-up question. I’ll answer it directly. The answer is saved with this scan without starting another AI request. The interaction is deliberately limited to one adaptation and one clarification response.

### 3:16–3:36 — Close on value and honesty

**Screen:** Recorded clarification, then Field Report or architecture.

> Signal Scout helps a builder move from scattered rules and project evidence to a decision they can trust and act on. It keeps uncertainty visible, preserves useful evidence when only part of a scan succeeds, and clearly reports when it cannot produce a valid result. The public repository includes the complete implementation, setup instructions, and architecture.

## Exact locked inputs

**Event URL**

```text
https://allthingsagentichackathon.devpost.com/
```

**Project URL**

```text
https://github.com/SkillSpringAI/Signal-Scout
```

**Builder context**

```text
I am building Signal Scout as a Collaborative Partner that guides hackathon builders through sourced findings, targeted clarification, feedback, and actionable project and learning decisions. I have completed and publicly deployed the Gemini 3.5 Flash, Google GenAI SDK, Cloud Run, and Firestore implementation with bounded public-demo cost controls. The current correction slice, architecture evidence, and responsive checks are complete. I am now preparing the final walkthrough, demo video, and submission materials; identify only genuinely outstanding demo-critical work.
```

**Feedback**

```text
I have limited time, so prioritize the smallest demo-critical implementation that proves guided adaptation.
```

**Preferred clarification answer for the verified golden scenario**

```text
No, the above advice is sufficient.
```

If a fresh Live run asks a materially different question, answer that question naturally instead of forcing the preferred line.

## Requirement and judging coverage

Requirements were rechecked against the [official Devpost overview](https://allthingsagentichackathon.devpost.com/) on 20 August 2026.

| Requirement or criterion | Where the video proves it |
|---|---|
| Short problem overview | 0:00–0:22 |
| Value proposition | 0:00–0:22 and 3:16–3:36 |
| Application working live | continuous segment from the scan click to terminal result; feedback and clarification follow in the same recording |
| Collaborative Partner guidance, feedback, adaptation, and clarification | 1:45–3:16 |
| Gemini 3.5+ and Google agent framework | brief proof at 2:12–2:40 |
| Google Cloud backend | visible `.run.app` URL, Cloud Run revision/traffic, and Firestore architecture at 2:12–2:40 |
| Architecture diagram | 2:12–2:40 and the repository README |
| Reproducible spin-up instructions | stated in the close; fully shown in the README |
| Innovation and operational utility — 40% | evidence comparison becomes a prioritized decision rather than a chat response |
| Architectural discipline — 30% | server-side credentials, saved state, evidence checks, and honest failure handling |
| Demo and production readiness — 30% | continuous Live segment, public deployment proof, readable diagram, repository, and clear boundaries |

## Submission details that do not need narration

Keep these in the Devpost form or repository rather than spending video time reading them:

- Category: **The Collaborative Partner** — selected in project records; user must reconfirm it in the final form.
- Hosted project URL: `https://signal-scout-212660130578.australia-southeast1.run.app`.
- Public repository URL: `https://github.com/SkillSpringAI/Signal-Scout`.
- Text description must separately cover features and functionality, technologies used, public data sources, and findings/learnings.
- README contains clean-checkout spin-up instructions and Cloud Run deployment guidance.
- Compact architecture PNG/SVG is present and rendered in the README.
- Video URL remains pending until the approved take is uploaded.
- Optional article, social-post, and additional-model bonuses remain unclaimed unless completed later.

## Recording acceptance

- Public YouTube or Vimeo video; no longer than four minutes.
- Clear English narration and accurate English subtitles.
- One continuous Live-action segment is visibly unedited.
- Public `.run.app` URL and sanitized Cloud Run revision/traffic proof are visible.
- No secret values, credentials, account email, billing identifiers, unrelated Firestore records, notifications, or private browser tabs are visible.
- Architecture remains readable at normal playback size.
- Optional article, social-post, and additional-model bonuses are not mentioned unless completed and claimed.
