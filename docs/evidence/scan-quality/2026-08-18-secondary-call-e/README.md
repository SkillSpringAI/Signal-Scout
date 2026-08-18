# Secondary project verification — CALL-E

Verified 18 August 2026 against Cloud Run revision `signal-scout-00014-rhj`.

## Inputs

- Event: `https://call-e.devpost.com`
- Project: `https://github.com/SkillSpringAI/CALL-E-Devpost-Project`
- Deployed scan: `17372c88-3d09-4e8e-84e7-d30d37c92dc3`
- Builder context: No-show Rescuer using mock data, requiring a focused path to live CALL-E integration and submission readiness.

## Verified result

- status `completed`;
- event identity changed to `CALL-E: Your Code Is Calling`;
- two sources with distinct event/project evidence roles;
- 5 event-specific requirements and 4 event-specific judging criteria;
- 3 CALL-E/project-specific strategic gaps, each linked to event and project evidence;
- 3 learning items, 7 build-plan steps, and 3 uncertainties;
- 7 scan Activity events before collaboration, then 9 after feedback and clarification;
- one high-confidence adapted recommendation with `Changed because` and two supporting sources;
- one targeted clarification answer persisted without another Gemini call;
- complete persisted JSON contained no `All Things Agentic` string.

## Evidence sequence

1. `01-live-call-e-input.png` — CALL-E and No-show Rescuer inputs.
2. `02-completed-call-e-sources.png` — completed state and changed sidebar/event identity.
3. `03-event-and-project-evidence.png` — both public evidence sources.
4. `04-call-e-requirements-and-criteria.png` — event-specific extraction.
5. `05-call-e-findings-1-2.png` and `06-call-e-finding-3.png` — sourced CALL-E/project gaps.
6. `07-call-e-learning-and-build-plan.png` — event/project-responsive recommendations.
7. `08-call-e-activity.png` and `09-call-e-activity-complete.png` — visible lifecycle.
8. `10-call-e-field-report-overview.png`, `11-call-e-field-report-plan.png`, and `12-call-e-uncertainties.png` — full report output.
9. `13-call-e-feedback-input.png` — explicit builder feedback.
10. `14-call-e-adaptation-and-clarification.png` — adapted recommendation and enabled clarification input.
11. `15-call-e-clarification-recorded.png` — persisted clarification answer.

## Scope of proof

This proves that Signal Scout handles a second real event/project pair rather than replaying the All Things Agentic fixture. It does **not** complete the exact Gate Five controlled comparison, which requires changing the hackathon while keeping the Signal Scout repository constant.

The screenshots contain no API keys, secret values, billing identifiers, or supplied account email address. Some captures are cropped or use browser zoom; retain them as engineering evidence rather than assuming every image is a final polished demo asset.
