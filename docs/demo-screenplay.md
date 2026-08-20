# Demo Screenplay — Rough Shot Plan

This is the operator’s shot sheet for `demo-video-script.md`. The product remains the focus; technical proof is confined to one short segment.

## Before recording

- Record at 1920×1080 where practical. Use 100% browser zoom unless a rehearsed 90% view is necessary to avoid scrolling.
- Use a clean browser profile or Incognito window. Hide bookmarks, notifications, account menus, unrelated tabs, and autofill suggestions.
- Pre-open only three tabs:
  1. deployed Signal Scout Live screen;
  2. GitHub README at **Architecture at a glance**;
  3. sanitized Cloud Run service/revision view or the approved Cloud Run proof.
- Confirm the address bar visibly contains the public `.run.app` host.
- Pre-fill the event URL, project URL, and builder context. Do not click **Run live scan** before recording.
- Confirm revision `signal-scout-00016-c9x` has 100% traffic and health is passing.
- Do not consume the three-action browser burst allowance during the ten minutes immediately before the final take. A normal take uses one scan and one feedback action.
- Keep golden fallback scan `c3c0f521-0b3d-41ea-855d-83a42db22df8` and final evidence available off-screen, without exposing local paths.

## Shot sequence

| Time | Picture and operator action | Product point | Pass cue |
|---|---|---|---|
| 0:00–0:22 | Live entry with prepared inputs | builder problem and value | Live mode and primary action are visible |
| 0:22–0:42 | Point to Devpost, GitHub, context; start scan | real inputs and continuous Live segment | click is visible; no edit before terminal scan state |
| 0:42–1:08 | Activity; optionally architecture during wait | trustworthy visible progress | event/project collection or progress is visible |
| 1:08–1:22 | Project field and requirements | sourced understanding | collection metadata is legible |
| 1:22–1:45 | Finding → Opportunities → uncertainty → Field Report | actionable decision | one dual-source finding and one uncertainty are visible |
| 1:45–2:12 | Memory; submit locked feedback | builder controls the priority | exact prepared feedback is visible before submission |
| 2:12–2:27 | Compact README architecture | simple product architecture | diagram is readable |
| 2:27–2:40 | Sanitized Cloud Run proof | deployed Google Cloud backend | `.run.app`, revision, and 100% traffic visible; no secrets |
| 2:40–3:03 | Return to Memory; adapted result | recommendation changed for the builder | `Changed because` and both sources visible |
| 3:03–3:16 | Answer clarification once | focused follow-up and saved answer | recorded-answer state visible |
| 3:16–3:36 | Field Report or diagram | value and honest boundaries | closing line ends before 3:40 |

## Timing behavior

- If the scan is still running at 1:08, keep the take continuous and use the architecture/Cloud proof lines early. Return to Activity before the terminal state appears.
- If feedback is still running at 2:40, finish the architecture and trust explanation, then return to Memory as soon as it completes.
- Do not speed up, fabricate completion, or narrate a failed state as success.
- If either Live request makes the take likely to exceed 3:55, stop and discard the take. Wait for the browser burst window before retrying. Do not edit out a failure and describe the segment as unedited.
- If a source genuinely fails, preserve the honest state. Record a later clean take for the primary submission and retain the failed take only as supporting evidence.
- Use `No, the above advice is sufficient.` only when it fits the displayed clarification. If the generated question changes, answer it briefly and truthfully.

## Presentation language

- Say what the builder gains before naming the technology that provides it.
- Use “checks the evidence” rather than “semantic validation” in narration.
- Use “saves the scan and feedback” rather than “durable state persistence.”
- Use “one focused update” rather than “bounded adaptation turn,” except when explaining the cost/safety limit if asked.
- Do not explain APIs, schemas, DNS checks, redirects, retry algorithms, status codes, or internal queues in the primary video.
- Name Gemini 3.5 Flash, Google GenAI SDK, Cloud Run, Firestore, and Secret Manager once in the proof segment because they establish eligibility and trust.

## Cursor and navigation

- Keep the cursor still while speaking; point once, then stop.
- Scroll to one representative item per section rather than sweeping across every card.
- Pause for roughly one second on evidence links, `Changed because`, the clarification answer, revision, and traffic percentage.
- Avoid opening technical details unless a visible failure requires explanation.
- Do not show Mock mode in the primary video. It is a synthetic orientation, not Live submission evidence.

## End-of-take review

- Runtime is below four minutes.
- No jump cut appears inside the declared continuous Live segment.
- Spoken claims match what is visible.
- Problem, value, Live action, Google Cloud proof, architecture, feedback adaptation, clarification, and honest limitation are present.
- Required text is readable at normal playback size.
- Audio is intelligible and subtitles are accurate.
- No credential, secret, personal email, billing detail, unrelated Firestore record, notification, or private tab appears.
