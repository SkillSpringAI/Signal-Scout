# Scope Guardrails

## MVP Goal

Prove that a builder can enter a hackathon context, inspect the surrounding project field, and leave with a clearer project strategy, learning plan, and networking shortlist.

## In Scope

- local web app prototype
- hackathon domain pack
- manual hackathon URL or pasted-text intake
- manual project links or seed demo dataset
- event brief
- project/item cards
- signal extraction
- pattern clustering
- opportunity ranking
- learning and networking plan
- outreach drafts that are not sent automatically
- Activity review area
- inspectable memory panel
- permission states
- fallback states
- final Field Report view
- mock agent responses before Gemini setup is ready

## Out of Scope for MVP

- automated messaging
- automatic Devpost submission
- account creation
- private or logged-in scraping
- general-purpose web crawling
- full CRM functionality
- browser extension
- payment flows
- multi-user teams
- live collaboration
- production-grade auth
- large-scale background indexing
- fully automated cloud deployment from the app
- arbitrary third-party integrations

## Later, If Useful

- Google account auth
- direct Gemini-backed extraction
- Cloud Run deployment
- Firestore persistence
- Cloud Tasks or Pub/Sub scans
- Devpost-specific ingestor
- GitHub ingestor
- conference domain pack
- research domain pack
- open-source domain pack
- export to Markdown or PDF
- richer evaluation dashboard

## Non-Negotiables

- The app must preserve a visible Activity trail.
- Memory must be inspectable and editable.
- External-impact actions require explicit approval.
- Recommendations must include reasons.
- Failed extraction should preserve partial value.
- The system should work with seed data even if live pages fail.
- The internal model should remain domain-neutral where practical.

## Scope Creep Tests

Before adding a feature, ask:

1. Does this help the first hackathon demo?
2. Does this strengthen the reusable discovery framework?
3. Can it be shown clearly in under four minutes?
4. Does it fit the observe/suggest/approve/log trust model?
5. Can it be built without delaying the core Field Report?

If the answer is mostly no, defer it.

## MVP Success Criteria

The MVP succeeds if a demo can show:

- a hackathon context loaded
- user interests captured
- projects or seed items analyzed
- signals extracted
- patterns clustered
- opportunities ranked
- memory updated with review
- Activity log populated
- Field Report generated

The MVP does not need perfect live scraping to succeed.
