# Safety and Permissions

> **Current status:** permission modes are partly presentational. The local route policy enforces approval for mock memory review, but it does not provide a general tool-execution security boundary.

## Enforceable MVP policy

- Public-source retrieval, extraction, synthesis, and report generation may run inside a user-started scan once the backend exists.
- Durable memory changes require explicit approval. The current prototype implements this only for its session-local mock memory review.
- External messaging is draft-only and out of scope.
- Publishing, spending, infrastructure mutation from the application, and automatic outreach are out of scope.
- Private or logged-in data retrieval, impersonation, and mass messaging are prohibited.
- The public demo accepts Devpost event hosts and GitHub project hosts by default, reapplies role-specific policy after redirects, and rejects private/local DNS resolutions.
- Scan creation, analysis retry, and feedback consume bounded demo capacity before costly work. The deployed default is 50 actions per UTC day plus three actions per client over ten minutes.

## Current UI modes

The `observe`, `suggest`, and `act_with_approval` selector communicates intent but does not comprehensively gate route execution. The UI and documentation must not imply otherwise. Before the live route exists, enforcement must happen server-side before any affected operation runs.

## Live retrieval safeguards

The live path restricts accepted host roles, URL schemes, resolved addresses, redirects, response types and sizes; applies explicit timeouts and retry limits; treats retrieved text as untrusted data rather than instructions; validates model output; and preserves partial results and visible failure states.

## Deferred governance

General external-action approval, repository mutation, cloud deployment from the app, generalized long-term memory, and broader governance architectures are post-hackathon work unless directly required and demonstrably enforced.
