# Signal Scout License Decision

> **Status:** decided and implemented on 13 August 2026. Canonical MIT text is present at repository root with `Copyright (c) 2026 Isac Thompson`.

## Preferred option

**MIT License** (`SPDX-License-Identifier: MIT`).

Why it fits the stated project posture:

- simple, widely recognized, and easy for judges and future users to understand;
- permits use, copying, modification, distribution, sublicensing, and sale;
- requires preservation of the copyright and permission notice;
- includes an as-is warranty and liability disclaimer;
- fits a hackathon project and semi-personal tool when broad reuse is acceptable;
- does not require derivative projects to publish their source code.

## Tradeoff to approve intentionally

MIT permits commercial reuse, closed-source derivatives, hosted services, and competing products. It does not impose attribution beyond retaining the included copyright/license notice, and it does not require contributors or downstream users to return improvements.

If those permissions are broader than intended, choose a different license rather than adding restrictions to the MIT text. A modified “MIT” license should not be labelled MIT.

## Prior-work relationship

PathWarden uses a separate custom source-available/non-commercial license. The repository comparison found no PathWarden implementation or asset incorporated into Signal Scout, so that license does not currently appear to constrain Signal Scout’s choice. Reopen this conclusion if incorporated PathWarden material is later identified.

Quantum Pacing written material was not incorporated and does not affect the license decision.

## Final decisions

- Final choice: MIT.
- Copyright holder: Isac Thompson.
- Copyright year: 2026.
- Repository documentation references the root license file. No badge or per-file SPDX headers are required for this slice.

## Verification

- unmodified canonical MIT license text is at repository root as `LICENSE`;
- `README.md` contains a short license reference;
- `docs/decisions.md` records the decision;
- verify tracked third-party assets and dependencies are compatible with repository distribution;
- source and third-party rights verification remains a separate compliance item.
