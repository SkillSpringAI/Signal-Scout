# Safety And Permissions

## Principle

Signal Scout should practice bounded autonomy.

```txt
observe -> suggest -> approve -> log
```

The agent can explore public or user-provided information and produce recommendations. Anything with external impact needs explicit approval.

## Permission Modes

### Observe

Allowed:

- read public pages
- analyze pasted text
- summarize hackathon rules
- summarize user-provided project links
- extract signals and patterns
- create temporary session notes

Not allowed:

- contact people
- submit forms
- join events
- scrape private or logged-in data
- impersonate the user
- write long-term memory without review

### Suggest

Allowed:

- recommend projects to study
- recommend people or teams to follow up with
- draft outreach messages
- suggest project pivots
- suggest learning plans
- propose memory entries

Not allowed:

- send messages
- post publicly
- modify repositories
- deploy infrastructure
- spend money
- store sensitive personal data

### Act With Approval

Allowed only after explicit user confirmation:

- save long-term memory
- export a report
- create a public post draft
- deploy infrastructure
- send or publish content if future integrations are added

## External-Impact Checks

Before any tool runs, check whether it:

- contacts another person
- publishes content
- submits a form
- modifies user data
- modifies a repository
- creates or changes cloud infrastructure
- spends money or consumes notable credits
- reads private data
- stores long-term memory

If yes, require approval or block the action.

## Blocked Actions

The agent should refuse or redirect requests to:

- scrape account-only data without authorization
- mass-message participants
- impersonate the user
- collect unrelated personal information
- rank people using sensitive traits
- submit hackathon entries automatically
- spend credits without confirmation
- access private repos or docs without permission
- produce spammy outreach

## Memory Rules

Memory must be:

- inspectable
- editable
- deletable
- tied to evidence when practical
- saved only after review or clear user consent

Memory should avoid:

- sensitive personal data
- unnecessary third-party personal details
- private information from logged-in pages
- hidden inferences the user cannot inspect

## Activity Log Rules

Every meaningful agent task should create an Activity entry.

Activity entries should include:

- task title
- route
- status
- permission mode
- sources used
- outputs produced
- memory changes proposed or saved
- approvals requested
- fallback events
- errors

## Outreach Rules

For MVP, outreach is draft-only.

Drafts should:

- be specific
- be humane
- explain genuine interest
- avoid exaggeration
- avoid pressure
- avoid mass-send language

Sending messages is out of scope unless a future integration is added and the user explicitly approves the action.

## Demo Framing

The safety story is part of the product:

> Signal Scout can explore and synthesize independently, but it leaves a visible trail and asks permission before affecting people, accounts, infrastructure, spending, publishing, or memory.
