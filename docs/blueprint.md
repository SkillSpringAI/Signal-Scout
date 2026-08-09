# Product Blueprint

## Name

Signal Scout

## One-Line Description

An agentic discovery companion that helps builders explore a hackathon ecosystem, extract meaningful signals, and turn them into learning, networking, and project strategy.

## North Star Question

What should I notice, learn from, and act on in this ecosystem?

## Product Thesis

Most builders browse hackathons passively. They scan the rules, look at a few projects, maybe submit something, then move on.

Signal Scout treats the hackathon itself as a learning field. It helps the user understand what is happening around them: what people are building, which patterns are emerging, where there are gaps, who is worth learning from, and how those observations should shape the user's own next steps.

## Target User

A builder who wants more from a hackathon than a single submission.

They may want to:

- discover what other people are building
- sharpen their own project idea
- grow in an uncertain area of interest
- find people or projects to follow up with
- turn scattered inspiration into a concrete plan

## Core Loop

```txt
explore -> extract -> cluster -> rank -> plan -> review
```

## Trust Loop

```txt
observe -> suggest -> approve -> log
```

The agent should do useful work independently, while making external impact and long-term memory changes visible and reviewable.

## Semantic Objects

`Domain`
The ecosystem being explored. The first domain is a hackathon.

`Item`
An object inside the domain. For hackathons, items are projects.

`Actor`
A person, team, sponsor, speaker, maintainer, author, or organization connected to an item.

`Signal`
A meaningful observation extracted from a domain or item.

`Pattern`
A cluster of related signals.

`Opportunity`
A possible next action for the user: learn, build, follow up, compare, refine, or save.

`Plan`
A practical set of next steps.

`Memory`
User-owned preferences, interests, saved observations, and feedback.

`Activity`
A log entry showing what the agent did, what it used, what it produced, and whether anything needs review.

## Initial Routes

### Intake

Understands the user's current context.

Inputs:

- hackathon URL or pasted description
- current project idea, if any
- interests and skill-growth goals
- networking intent
- time available

Outputs:

- user intent profile
- curiosity map
- recommended starting route

### Domain Analyze

Understands the hackathon or other ecosystem.

Tasks:

- summarize rules and requirements
- extract deadlines and submission artifacts
- identify judging criteria
- identify required technologies
- surface strategic implications

Outputs:

- event brief
- constraints checklist
- judging-alignment notes

### Item Scout

Analyzes projects or other domain items.

Tasks:

- summarize each item
- classify domain, audience, stack, maturity, and agent behavior
- detect missing fields
- rank relevance to the user's interests

Outputs:

- item cards
- relevance ranking
- study shortlist

### Pattern Map

Synthesizes the field.

Tasks:

- cluster repeated themes
- identify gaps
- compare the user's project idea to the field
- surface surprising or contrarian opportunities

Outputs:

- pattern map
- whitespace opportunities
- project refinement prompts

### Relationship Scout

Finds people, teams, or projects worth following.

Tasks:

- suggest relevant actors
- explain why each match matters
- draft humane outreach
- avoid mass or spammy messaging

Outputs:

- follow-up shortlist
- conversation openers
- learning notes

### Opportunity Refine

Improves the user's own project direction.

Tasks:

- test the idea against judging criteria
- sharpen the MVP
- identify demo moments
- recommend architecture
- highlight risks

Outputs:

- refined project thesis
- MVP boundary
- demo outline
- technical checklist

### Learning Plan

Turns discoveries into growth.

Tasks:

- recommend what to study
- sequence next actions
- preserve reflections
- connect learning goals to projects and people

Outputs:

- short action plan
- learning queue
- networking plan

## Final Artifact

The app should produce a `Field Report`.

For the hackathon preset, the report includes:

- event brief
- constraints checklist
- project field summary
- signal and pattern map
- top projects to study
- follow-up opportunities
- project refinement advice
- learning and networking plan
- activity summary

## Reuse Strategy

The UI can speak specifically about hackathons, but core code and data should remain domain-neutral.

Use generic internal names:

- domain
- item
- actor
- signal
- pattern
- opportunity
- plan
- activity

The hackathon-specific behavior should live in a domain pack.
