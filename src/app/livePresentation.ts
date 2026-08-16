import type { ScanJob, SourceRecord } from '../../server/contracts'

export type LiveWorkspaceSummary = {
  title: string
  detail: string
}

const normalizedUrl = (value: string) => {
  try {
    const url = new URL(value)
    url.hash = ''
    return url.toString().replace(/\/$/, '')
  } catch {
    return value.trim().replace(/\/$/, '')
  }
}

const sourceCount = (count: number) => `${count} source${count === 1 ? '' : 's'}`

export function liveWorkspaceSummary(hackathonUrl: string, job?: ScanJob): LiveWorkspaceSummary {
  const currentJob = job && normalizedUrl(job.request.hackathonUrl) === normalizedUrl(hackathonUrl) ? job : undefined
  if (!currentJob) return { title: 'Public hackathon scan', detail: 'Ready for public input' }

  const title = currentJob.analysis?.eventName.trim() || 'Public hackathon scan'
  const count = sourceCount(currentJob.sources.length)
  const detail = currentJob.status === 'completed'
    ? `Analysis complete · ${count}`
    : currentJob.status === 'partial'
      ? `Partial result · ${count}`
      : currentJob.status === 'failed'
        ? `Scan failed · ${count} preserved`
        : currentJob.status === 'cancelled'
          ? `Scan cancelled · ${count} preserved`
          : currentJob.status === 'needs_input'
            ? `Input needed · ${count} preserved`
            : `Working · ${count} collected`

  return { title, detail }
}

export function evidenceLinkLabel(sources: SourceRecord[], sourceUrl: string) {
  const source = sources.find((candidate) => normalizedUrl(candidate.url) === normalizedUrl(sourceUrl))
  if (!source) return 'Supporting evidence'

  if (source.evidenceRole === 'event') return 'Event evidence: Devpost'
  if (source.evidenceRole === 'project') {
    try {
      const url = new URL(source.url)
      const repository = url.pathname.split('/').filter(Boolean).slice(0, 2).join('/')
      return repository ? `Project evidence: ${repository}` : 'Project evidence: GitHub'
    } catch {
      return 'Project evidence'
    }
  }

  return source.title.trim() || 'Supporting evidence'
}
