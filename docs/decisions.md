# Decisions

This file records project decisions so we do not keep reopening the same questions while building.

## Product Positioning

Decision:

Signal Scout is a reusable agentic discovery framework, first demonstrated as a hackathon scouting assistant.

Reason:

The hackathon use case gives the demo focus, while the domain-neutral model makes the repo easier to fork for conferences, research, open-source scouting, career exploration, and other discovery workflows.

## First Preset

Decision:

The first domain pack is `hackathon`.

Reason:

It fits the All Things Agentic Hackathon, supports a strong demo story, and connects to the user's actual goal: learning from other projects and finding meaningful networking opportunities.

## Primary Language

Decision:

Use TypeScript across the app.

Reason:

The project needs a polished web interface, structured route outputs, schemas, task logs, permissions, and shared types. TypeScript keeps frontend and backend aligned.

## App Framework

Decision:

Use Vite + React for the frontend and a Node TypeScript API service for the backend.

Reason:

This keeps the prototype fast, explicit, and easy to reason about. It also gives a clear path to serving the app and API from Cloud Run.

## Agent Integration Order

Decision:

Start with mocked structured agent outputs, then add Gemini later.

Reason:

The product value depends on workflow, review, memory, and reporting. Mock mode lets us build those foundations before credits and cloud setup are finished.

## Cloud Target

Decision:

Use Google Cloud Run and Firestore for the cloud version.

Reason:

This aligns with hackathon requirements while keeping deployment and persistence understandable.

## Activity Review

Decision:

Activity is a first-class user-facing area, not a debug log.

Reason:

The user needs to review what the agent has done. This also supports trust, permission boundaries, fallback visibility, and judging criteria around production readiness.

## Permission Model

Decision:

Use `observe`, `suggest`, and `act_with_approval` modes.

Reason:

The agent should be useful without being reckless. It can inspect and synthesize, but external impact requires approval.

## MVP Boundary

Decision:

The MVP does not require perfect live scraping.

Reason:

Manual links, pasted text, and seed data are enough to prove the workflow. This protects the demo from brittle websites and keeps the build focused.

## Final Artifact

Decision:

The main generated artifact is a `Field Report`.

Reason:

It gives the product a clear output and makes the demo feel complete.
