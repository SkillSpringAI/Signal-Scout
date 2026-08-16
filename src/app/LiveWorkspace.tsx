import { useEffect, useRef, useState } from 'react'
import type { ScanJob } from '../../server/contracts'
import { LiveScanApi } from '../services/liveScanApi'
import { evidenceLinkLabel, liveWorkspaceSummary, type LiveWorkspaceSummary } from './livePresentation'

type LiveView = 'overview' | 'field' | 'patterns' | 'opportunities' | 'memory' | 'activity' | 'report'
const api = new LiveScanApi()

export function LiveWorkspace({ view, onNavigate, onSummaryChange }: { view: LiveView; onNavigate(view: LiveView): void; onSummaryChange(summary: LiveWorkspaceSummary): void }) {
  const [hackathonUrl, setHackathonUrl] = useState('https://allthingsagentichackathon.devpost.com/')
  const [builderContext, setBuilderContext] = useState('I am building Signal Scout as a Collaborative Partner that guides hackathon builders through sourced findings, targeted clarification, feedback, and actionable project and learning decisions. I have completed and publicly deployed the Gemini 3.5 Flash, Google GenAI SDK, Cloud Run, and Firestore implementation with bounded public-demo cost controls. The current correction slice, architecture evidence, and responsive checks are complete. I am now preparing the final walkthrough, demo video, and submission materials; identify only genuinely outstanding demo-critical work.')
  const [projectUrls, setProjectUrls] = useState('')
  const [job, setJob] = useState<ScanJob>()
  const [error, setError] = useState('')
  const controller = useRef<AbortController | undefined>(undefined)

  useEffect(() => () => controller.current?.abort(), [])
  useEffect(() => onSummaryChange(liveWorkspaceSummary(hackathonUrl, job)), [hackathonUrl, job, onSummaryChange])

  const start = async () => {
    controller.current?.abort()
    controller.current = new AbortController()
    setError('')
    setJob(undefined)
    try {
      const created = await api.createScan({ hackathonUrl, builderContext, projectUrls: projectUrls.split('\n').map((url) => url.trim()).filter(Boolean) })
      setJob(created)
      await api.waitForTerminal(created.id, setJob, controller.current.signal)
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === 'AbortError') return
      setError(caught instanceof Error ? caught.message : 'The live scan failed.')
    }
  }

  const cancel = async () => {
    if (!job) return
    try { const cancelled = await api.cancelScan(job.id); controller.current?.abort(); setJob(cancelled) }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Cancellation failed.') }
  }

  const retryAnalysis = async () => {
    if (!job) return
    controller.current?.abort()
    controller.current = new AbortController()
    setError('')
    try {
      const retrying = await api.retryAnalysis(job.id)
      setJob(retrying)
      await api.waitForTerminal(retrying.id, setJob, controller.current.signal)
    } catch (caught) {
      if (caught instanceof DOMException && caught.name === 'AbortError') return
      setError(caught instanceof Error ? caught.message : 'Analysis could not be retried.')
    }
  }

  const applyFeedback = async (feedback: string) => {
    if (!job) return
    setError('')
    try { setJob(await api.submitFeedback(job.id, feedback)) }
    catch (caught) { setError(caught instanceof Error ? caught.message : 'Feedback could not be applied.') }
  }

  if (view === 'overview') return <LiveOverview url={hackathonUrl} setUrl={setHackathonUrl} context={builderContext} setContext={setBuilderContext} projectUrls={projectUrls} setProjectUrls={setProjectUrls} job={job} error={error} start={start} cancel={cancel} />
  if (!job) return <LiveEmpty returnToInput={() => onNavigate('overview')} />
  if (view === 'field') return <LiveField job={job} />
  if (view === 'patterns') return <LivePatterns job={job} retryAnalysis={retryAnalysis} />
  if (view === 'opportunities') return <LivePlan job={job} />
  if (view === 'memory') return <LiveContext job={job} error={error} applyFeedback={applyFeedback} />
  if (view === 'activity') return <LiveActivity job={job} error={error} cancel={cancel} retryAnalysis={retryAnalysis} />
  return <LiveReport job={job} retryAnalysis={retryAnalysis} />
}

const running = (job?: ScanJob) => !!job && !['completed', 'partial', 'failed', 'cancelled', 'needs_input'].includes(job.status)

function LiveOverview(props: { url: string; setUrl(value: string): void; context: string; setContext(value: string): void; projectUrls: string; setProjectUrls(value: string): void; job?: ScanJob; error: string; start(): void; cancel(): void }) {
  return <><div className="live-banner"><strong>LIVE SCAN</strong><span>Real public sources · Gemini 3.5 Flash · server-side credentials</span></div><div className="grid two"><article className="panel"><p className="eyebrow">REAL INPUT</p><h3>Start a sourced scan</h3><label className="field-label">Official hackathon URL<input value={props.url} onChange={(event) => props.setUrl(event.target.value)} /></label><label className="field-label">Builder context<span className="field-help">Briefly describe what you are building, work already completed, your goals, chosen technologies or constraints, and any decision you want help making.</span><textarea value={props.context} onChange={(event) => props.setContext(event.target.value)} /></label><label className="field-label">Optional public project URLs, one per line<span className="field-help">Add a public GitHub repository or project page so Signal Scout can compare event requirements with evidence of your current implementation. Private or sign-in-only resources cannot be inspected.</span><textarea value={props.projectUrls} onChange={(event) => props.setProjectUrls(event.target.value)} placeholder="https://github.com/your-name/your-project" /></label><div className="button-row"><button className="primary" onClick={props.start} disabled={running(props.job)}>{running(props.job) ? 'Scan running…' : 'Run live scan →'}</button>{running(props.job) && <button className="save-button" onClick={props.cancel}>Cancel</button>}</div>{props.error && <p className="error-notice">{props.error}</p>}</article><article className="panel"><p className="eyebrow">LIVE STATUS</p><h3>{props.job ? props.job.status.replace('_', ' ') : 'Ready for real input'}</h3><p className="section-lead">{props.job ? `${props.job.events.length} real activity events · ${props.job.sources.length} retrieved sources` : 'Nothing on this screen comes from the synthetic fixture store.'}</p>{props.job?.sources.map((source) => <p key={source.url}><a href={source.url} target="_blank" rel="noreferrer">{source.title}</a><br /><small>Collected {new Date(source.collectedAt).toLocaleString()} · {source.byteLength} bytes</small></p>)}</article></div></>
}

function LiveEmpty({ returnToInput }: { returnToInput(): void }) { return <article className="panel"><span className="pill">LIVE MODE</span><h3>No live scan in this browser session</h3><p className="section-lead">Return to Domain brief to review the public inputs before starting a billable live scan.</p><button className="primary" onClick={returnToInput}>Return to Domain brief →</button></article> }

function LiveField({ job }: { job: ScanJob }) { return <div className="stack-layout"><div className="live-banner"><strong>REAL EVIDENCE</strong><span>{job.sources.length} public sources preserved</span></div>{job.sources.map((source) => <article className="panel" key={source.url}><a href={source.url} target="_blank" rel="noreferrer"><h3>{source.title}</h3></a><p>{source.excerpt.slice(0, 700)}{source.excerpt.length > 700 ? '…' : ''}</p><small>Collected {source.collectedAt} · {source.contentType} · {source.byteLength} bytes</small></article>)}{job.analysis && <article className="panel"><h3>Verified extraction</h3><h4>Requirements</h4><ul>{job.analysis.requirements.map((item) => <li key={item}>{item}</li>)}</ul><h4>Judging criteria</h4><ul>{job.analysis.judgingCriteria.map((item) => <li key={item}>{item}</li>)}</ul></article>}</div> }

function LivePatterns({ job, retryAnalysis }: { job: ScanJob; retryAnalysis(): void }) { return <div className="stack-layout"><div className="live-banner"><strong>REQUIREMENTS AND STRATEGIC GAPS</strong><span>Each finding links to supporting evidence</span></div>{job.analysis?.strategicGaps.map((gap, index) => <article className="pattern-row" key={gap.title}><span className="pattern-number">0{index + 1}</span><div><span className="tag">{gap.confidence} confidence</span><h2>{gap.title}</h2><p>{gap.rationale}</p><div className="evidence-links">{gap.sourceUrls.map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" title={job.sources.find((source) => source.url === url)?.title}>{evidenceLinkLabel(job.sources, url)} ↗</a>)}</div></div></article>) ?? <NoAnalysis job={job} retryAnalysis={retryAnalysis} />}</div> }

function LivePlan({ job }: { job: ScanJob }) { return <div className="grid two"><article className="panel"><p className="eyebrow">LEARNING SHORTLIST</p>{job.analysis?.learningShortlist.map((item, index) => <p key={item}><strong>{index + 1}.</strong> {item}</p>) ?? <NoAnalysis job={job} />}</article><article className="panel"><p className="eyebrow">ACTIONABLE BUILD PLAN</p>{job.analysis?.buildPlan.map((item, index) => <p key={item}><strong>{index + 1}.</strong> {item}</p>) ?? <NoAnalysis job={job} />}</article></div> }

function LiveContext({ job, error, applyFeedback }: { job: ScanJob; error: string; applyFeedback(feedback: string): Promise<void> }) {
  const [feedback, setFeedback] = useState('I have limited time, so prioritize the smallest demo-critical implementation that proves guided adaptation.')
  const [submitting, setSubmitting] = useState(false)
  const submit = async () => { setSubmitting(true); try { await applyFeedback(feedback) } finally { setSubmitting(false) } }
  const latest = job.feedback?.[job.feedback.length - 1]
  return <div className="stack-layout"><article className="panel"><div className="live-banner"><strong>GUIDED FEEDBACK</strong><span>Explicit feedback is persisted with this scan</span></div><h3>Builder context</h3><p>{job.request.builderContext}</p><label className="field-label">What should Signal Scout adapt?<textarea value={feedback} onChange={(event) => setFeedback(event.target.value)} disabled={Boolean(latest)} /></label><button className="primary" disabled={submitting || Boolean(latest) || feedback.trim().length < 10} onClick={submit}>{submitting ? 'Adapting…' : latest ? 'Feedback turn complete' : 'Apply feedback to one recommendation →'}</button>{error && <p className="error-notice">{error}</p>}<p className="section-lead">This bounded interaction adapts one recommendation and asks one targeted follow-up. It is not a general chat system or an automatic durable-memory grant.</p></article>{latest && <article className="panel"><p className="eyebrow">ADAPTED RECOMMENDATION</p><h3>{latest.adaptedRecommendation.title}</h3><p>{latest.adaptedRecommendation.explanation}</p><p><strong>Changed because:</strong> {latest.adaptedRecommendation.changedBecause}</p><span className="tag">{latest.adaptedRecommendation.confidence} confidence</span><h4>One targeted clarification</h4><p>{latest.nextClarifyingQuestion}</p><div className="evidence-links">{latest.adaptedRecommendation.sourceUrls.map((url) => <a key={url} href={url} target="_blank" rel="noreferrer" title={job.sources.find((source) => source.url === url)?.title}>{evidenceLinkLabel(job.sources, url)} ↗</a>)}</div></article>}</div>
}

function LiveActivity({ job, error, cancel, retryAnalysis }: { job: ScanJob; error: string; cancel(): void; retryAnalysis(): void }) { const withheld = isWithheldAnalysis(job); return <div className="activity-list"><div className="activity-header"><div><span className="pill">LIVE / {job.status}</span><p className="section-lead">These events show what Signal Scout completed for this scan.</p></div>{running(job) && <button className="save-button" onClick={cancel}>Cancel scan</button>}</div>{withheld && <PartialAnalysisNotice job={job} retryAnalysis={retryAnalysis} />}{job.events.map((event) => <article className="activity-event" key={event.id}><span className="timeline-dot" /><div><div className="card-top"><strong>{activityLabel(event.stage, event.message)}</strong><span className="muted">{event.kind} · {new Date(event.at).toLocaleTimeString()}</span></div><p>{withheld && event.kind === 'error' ? 'Recommendations were withheld because the analysis did not pass validation.' : event.message}</p></div></article>)}{error && <p className="error-notice">{error}</p>}</div> }

function activityLabel(stage: ScanJob['status'], message: string) {
  if (stage === 'retrieving') return message.startsWith('Collected') ? 'Source collected' : message.startsWith('Could not collect') ? 'Source unavailable' : 'Checking sources'
  if (stage === 'extracting') return 'Analyzing evidence'
  if (stage === 'validating') return 'Checking findings'
  if (stage === 'synthesizing') return 'Preparing recommendations'
  return stage.replace('_', ' ')
}

function LiveReport({ job, retryAnalysis }: { job: ScanJob; retryAnalysis(): void }) { if (!job.analysis) return <NoAnalysis job={job} retryAnalysis={retryAnalysis} />; return <article className="report"><div className="report-cover"><p className="eyebrow">SIGNAL SCOUT / LIVE FIELD REPORT</p><h2>{job.analysis.eventName}</h2><p>{job.analysis.summary}</p></div><div className="report-section"><h3>Sourced strategic gaps</h3>{job.analysis.strategicGaps.map((gap) => <p key={gap.title}><strong>{gap.title}</strong><br />{gap.rationale}</p>)}</div><div className="report-columns"><div><h3>Learning shortlist</h3>{job.analysis.learningShortlist.map((item) => <p key={item}>{item}</p>)}</div><div><h3>Build plan</h3>{job.analysis.buildPlan.map((item) => <p key={item}>{item}</p>)}</div></div><div className="report-section"><h3>Uncertainties</h3>{job.analysis.uncertainties.map((item) => <p key={item}>{item}</p>)}</div><div className="report-footer">{job.sources.length} real sources · {job.events.length} activity events · {job.status} · live mode</div></article> }

function NoAnalysis({ job, retryAnalysis }: { job: ScanJob; retryAnalysis?: () => void }) { if (isWithheldAnalysis(job)) return <PartialAnalysisNotice job={job} retryAnalysis={retryAnalysis} />; return <article className="panel"><h3>No validated analysis available</h3><p>The job ended as <strong>{job.status}</strong>. Retrieved sources and Activity remain available.</p>{job.error && <details className="technical-detail"><summary>Technical details</summary><p>{job.error.message}</p></details>}</article> }

const isWithheldAnalysis = (job: ScanJob) => job.status === 'partial' && job.error?.code === 'MODEL_FAILED' && job.sources.length > 0
const hasUsedAnalysisRetry = (job: ScanJob) => job.events.some((event) => event.message === 'Retrying analysis once with the preserved sources.')

function PartialAnalysisNotice({ job, retryAnalysis }: { job: ScanJob; retryAnalysis?: () => void }) {
  const retryUsed = hasUsedAnalysisRetry(job)
  return <article className="panel partial-notice"><p className="eyebrow">SAFE PARTIAL RESULT</p><h3>Sources collected; recommendations withheld</h3><p>Signal Scout collected and preserved {job.sources.length} public source{job.sources.length === 1 ? '' : 's'}, but did not expose recommendations because analysis validation detected an unsupported or conflicting claim. Source collection succeeded.</p><div className="preserved-sources">{job.sources.map((source) => <a key={source.url} href={source.url} target="_blank" rel="noreferrer" title={source.title}>{evidenceLinkLabel(job.sources, source.url)} ↗</a>)}</div>{retryAnalysis && !retryUsed && <div className="button-row"><button className="primary" onClick={retryAnalysis}>Retry analysis with the same sources →</button></div>}{retryUsed && <p className="section-lead">The single analysis retry has been used. Preserved sources remain available for review.</p>}{job.error && <details className="technical-detail"><summary>Technical details</summary><p>{job.error.message}</p></details>}</article>
}
