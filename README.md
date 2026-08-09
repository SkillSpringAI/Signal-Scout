# Signal Scout

Signal Scout is a reusable agentic discovery framework, first demonstrated as a hackathon scouting assistant.

The product helps builders turn a public ecosystem into clearer learning, networking, and project decisions. For the first preset, that ecosystem is a hackathon: the app analyzes event rules, project examples, themes, builders, and opportunities, then produces a field report and practical next steps.

## Product Thesis

Hackathons are not only useful because of the submitted project. They are also useful because they expose builders to other ideas, tools, people, and ways of thinking.

Signal Scout turns that passive exposure into an active loop:

```txt
explore -> extract -> cluster -> rank -> plan -> review
```

The agent should feel like a thinking partner, not a black-box scraper.

## First Use Case

The first preset is `Hackathon Scout`.

It helps a builder:

- understand a hackathon's rules, judging criteria, and strategic constraints
- analyze public projects or user-provided project links
- extract signals from the field
- cluster repeated patterns and underexplored gaps
- find projects and people worth learning from
- refine their own project idea
- produce a learning and networking plan

## Durable Shape

The repo should stay forkable beyond hackathons.

Core abstraction:

```txt
Domain -> Items -> Signals -> Patterns -> Opportunities -> Plan
```

For the initial demo:

```txt
Hackathon -> Projects -> Signals -> Patterns -> Build/Networking Opportunities -> Learning Plan
```

See [docs/blueprint.md](docs/blueprint.md) for the product blueprint.

## Current Decisions

- Primary language: TypeScript
- Frontend: Vite + React + TypeScript
- Backend: Node + TypeScript API, Express-style service
- Agent layer: Gemini through Google GenAI SDK or ADK
- Cloud target: Google Cloud Run
- Storage target: Firestore
- Async target: Cloud Tasks or Pub/Sub
- First implementation mode: local prototype with mocked agent outputs

See [docs/architecture.md](docs/architecture.md) for architecture notes.

## Scope Guardrail

The MVP is not a general web crawler, CRM, social platform, or automated outreach tool.

The MVP should prove one thing:

> A builder can enter a hackathon context, inspect the surrounding project field, and leave with a clearer project strategy, learning plan, and networking shortlist.

See [docs/scope.md](docs/scope.md) for what is in and out.

## Safety Model

The agent operates through bounded autonomy:

```txt
observe -> suggest -> approve -> log
```

It can inspect public or user-provided information, synthesize recommendations, and draft next steps. Anything that contacts people, publishes content, spends money, modifies infrastructure, or writes long-term memory requires explicit approval.

See [docs/safety-and-permissions.md](docs/safety-and-permissions.md).

## Build Phases

Credits and cloud setup can wait. The foundation can start locally with:

- domain model and schemas
- mock agent routes
- Activity review area
- memory panel
- hackathon domain pack
- seed demo dataset
- field report output
- permission and fallback states

See [docs/build-plan.md](docs/build-plan.md).

For the rough phase-by-phase implementation path and likely file layout, see [docs/implementation-roadmap.md](docs/implementation-roadmap.md).
