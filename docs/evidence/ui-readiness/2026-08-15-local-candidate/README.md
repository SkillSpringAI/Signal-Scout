# Local Responsive Verification — 15 August 2026

Target: rebuilt production bundle served with `vite preview`. This is local candidate evidence, not Cloud Run deployment proof.

| Viewport | Browser viewport | Document width | Navigation behavior | Result |
|---|---:|---:|---|---|
| Desktop | 1440 | 1440 | contained sidebar | pass |
| Demo recording | 1280 | 1280 less 15 px scrollbar | contained sidebar | pass |
| Tablet | 768 | 768 less 15 px scrollbar | navigation strip scrolls; page does not | pass |
| Mobile | 390 | 390 less 15 px scrollbar | navigation strip scrolls; page does not | pass |

Additional checks:

- live/mock distinction and live entry controls visible at every viewport;
- no browser console warnings or errors;
- visiting a live section without a scan shows `Return to Domain brief` and cannot start billable work;
- keyboard focus outline verified on the execution selector;
- desktop and mobile screenshots are stored beside this record.
