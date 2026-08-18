# Signal Scout Architecture Diagram

> **Submission artifact:** verified against Cloud Run revision `signal-scout-00014-rhj` on 18 August 2026, including the public-demo guard, retrieval-policy slice, bounded feedback adaptation, persisted clarification response, and event-source fail-closed boundary.

Portable submission image: [architecture-diagram.png](architecture-diagram.png). Regenerate it from the Mermaid block whenever component boundaries or data flows change.

```mermaid
flowchart LR
    Judge["Builder / judge<br/>web browser"]

    subgraph CloudRun["Google Cloud Run — Signal Scout service"]
        UI["React + TypeScript UI<br/>Vite production bundle"]
        API["Node.js + TypeScript API<br/>Express"]
        Guard["Public demo usage guard<br/>daily capacity + burst limit"]
        Runner["Bounded scan runner<br/>retrieve → analyze → validate → synthesize"]
        Retriever["Safe public-source retriever<br/>role hosts, DNS, redirect,<br/>timeout, type + size limits"]
        GenAI["Google GenAI SDK<br/>structured Gemini requests"]
        Validator["Zod schema + semantic validation<br/>evidence roles, citations + project constraints"]
        Feedback["One bounded feedback turn<br/>adapt one recommendation + clarify"]
    end

    Sources["Public event and project pages<br/>untrusted evidence"]
    Gemini["Gemini 3.5 Flash<br/>Gemini API"]
    Firestore[("Firestore Native<br/>scan, sources, activity,<br/>analysis + feedback")]
    Usage[("Firestore usage counter<br/>atomic UTC-day capacity")]
    Secret["Secret Manager<br/>Gemini API key"]
    Identity["Dedicated Cloud Run<br/>runtime service identity"]
    Mock["Deterministic mock mode<br/>synthetic fixtures only"]

    Judge -->|"HTTPS"| UI
    UI -->|"/api/scans + /feedback"| API
    API --> Guard
    Guard -->|"capacity reserved"| Runner
    Guard -->|"atomic increment"| Usage
    Runner --> Retriever
    Retriever -->|"bounded HTTP(S)"| Sources
    Sources -->|"event / project evidence roles"| Retriever
    Retriever --> Runner
    Runner --> GenAI
    GenAI -->|"Gemini API"| Gemini
    Gemini -->|"structured response"| GenAI
    GenAI --> Validator
    Validator -->|"accepted analysis"| Runner
    Validator -.->|"reject unsafe or unsupported output"| Runner
    Runner -->|"durable state"| Firestore
    API -->|"poll persisted job"| Firestore
    API --> Feedback
    Feedback --> GenAI
    Feedback -->|"persist adapted recommendation"| Firestore
    Firestore --> API
    API --> UI
    Secret -->|"server-side secret reference"| GenAI
    Identity -->|"least-privilege access"| Secret
    Identity -->|"Firestore access"| Firestore
    Judge -.->|"offline demonstration"| Mock
    Mock -.->|"never live evidence"| UI
```

## Trust and evidence boundaries

- Credentials remain server-side. Cloud Run receives the Gemini key through a Secret Manager reference granted only to the dedicated runtime identity.
- Retrieved pages are untrusted input. The retriever enforces public HTTP/HTTPS, redirect, timeout, content-type, and size boundaries before content reaches Gemini.
- The public demo reserves capacity before scan, retry, or feedback work. Firestore provides the durable daily counter; a small process-local burst window dampens rapid repeated requests.
- Event sources are restricted to configured Devpost hosts and project sources to configured GitHub hosts in the deployed demo. Every redirect and DNS resolution is rechecked.
- Event and project sources retain distinct evidence roles. Event pages establish requirements and judging criteria; project pages establish current implementation state.
- Gemini output is accepted only after structured schema and semantic validation. Unsupported project-state claims and citations outside the collected source set are rejected.
- Firestore persists scan state, source metadata, Activity events, validated analysis, the single bounded feedback result, and one builder clarification response.
- Mock mode is deterministic, synthetic, and visibly separate from the live evidence path.

## Prototype limitation

Scan execution is started process-locally. Completed and partial records are durable in Firestore, but an in-flight job is not automatically resumed if its Cloud Run container stops.
