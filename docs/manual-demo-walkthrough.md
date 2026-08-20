# Manual Demo Walkthrough

Run this checklist against the final local production build first, then repeat the golden path and guarded failures against Cloud Run revision `signal-scout-00016-c9x`. The final verified golden scan is `c3c0f521-0b3d-41ea-855d-83a42db22df8`; the honest partial and failed scans are `2f6c053a-5fdf-4bde-ac0b-5723a61259b8` and `c716b724-684c-46f3-92e2-f9a21d42cf80`. Record exact revision, scan ID, timestamps, status, source count, and screenshots in the evidence ledger. Never capture secrets or unrelated Firestore records.

## Viewport and accessibility matrix

Check `1440×900`, `1280×720`, `768×1024`, and `390×844` in both mock and live entry screens.

- document width does not exceed viewport width;
- only the narrow navigation strip scrolls horizontally;
- active navigation, headings, labels, help text, links, cards, banners, technical details, and buttons remain readable;
- Tab order follows execution selector, navigation, fields, and primary actions; focus is visibly outlined;
- no console warnings/errors, failed application assets, clipped dialogs, or inaccessible controls;
- live and synthetic content remain unmistakably separated.

## Golden live path

1. Select **Live scan** and confirm the banner says real public sources, Gemini 3.5 Flash, and server-side credentials.
2. Use `https://allthingsagentichackathon.devpost.com/` as the event URL.
3. Use `https://github.com/SkillSpringAI/Signal-Scout` as the project URL.
4. Use accurate context describing the Collaborative Partner workflow, completed Gemini/Firestore/Cloud Run implementation, constraints, and the demo-readiness decision.
5. Start one uninterrupted scan and follow Activity until terminal state.
6. Confirm the Project field shows both event and project evidence roles and collection metadata.
7. Confirm Findings exposes dual-source links for combined requirement/current-project claims.
8. Inspect Opportunities, uncertainties, and the Field Report without unsupported or competing recommendations.
9. Apply: `I have limited time, so prioritize the smallest demo-critical implementation that proves guided adaptation.`
10. Confirm one adapted recommendation, `Changed because`, supporting sources, and one targeted clarification.
11. Answer the targeted clarification with: `No, the above advice is sufficient.`
12. Confirm the answer is recorded with the scan without another Gemini call, the controls are disabled, and a direct second clarification request returns `409`.

## Recording rehearsal

1. Follow the product narration in `docs/demo-video-script.md` and the operator cues in `docs/demo-screenplay.md`.
2. Rehearse navigation in Mock mode first; do not present Mock output as Live evidence.
3. Perform at least one timed Live rehearsal, then allow the browser burst window to clear before the final take.
4. Target 3:30–3:40 and reject any take that reaches 3:55 before the closing line.
5. Verify the segment from **Run live scan** to terminal scan result has no cut.
6. Confirm the `.run.app` URL, revision `signal-scout-00016-c9x`, and 100% traffic are visible without secret values or private account details.

## Guarded failure matrix

| Case | Expected result |
|---|---|
| Event URL outside Devpost | request retrieves nothing; Activity explains the event host is unavailable in the public demo |
| Project URL outside GitHub | event evidence remains; project warning is visible; result is honest `partial` when analysis succeeds |
| Host resolves private/local | retrieval is rejected before fetch |
| Unreachable source | warning retains URL; no false source record |
| No retrieved sources | terminal `failed` with `RETRIEVAL_FAILED` |
| Cancel during collection/analysis | terminal `cancelled`; later worker writes cannot overwrite it |
| Model/schema/semantic rejection | sources remain; recommendations are withheld; technical detail is secondary |
| First deliberate analysis retry | same preserved sources are reused without recollection |
| Second deliberate analysis retry | HTTP `409`; no new model work |
| Poll limit/API unavailable | client stops honestly without implying completion |
| Per-client burst exhausted | HTTP `429`, `Retry-After`, and mock-demo guidance |
| Daily capacity exhausted | atomic counter rejects before costly work and resets next UTC day |

Container interruption remains a documented prototype limitation. Do not deliberately interrupt the public service merely to create evidence.
