import type { Domain, Item, Signal } from '../types'

export function isDomain(value: unknown): value is Domain {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<Domain>
  return typeof candidate.id === 'string' && candidate.kind !== undefined && typeof candidate.name === 'string' && Array.isArray(candidate.constraints) && Array.isArray(candidate.judgingCriteria) && Array.isArray(candidate.requiredTechnologies) && Array.isArray(candidate.deadlines) && Array.isArray(candidate.sourceIds) && Array.isArray(candidate.researchNotes)
}

export function isItem(value: unknown): value is Item {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<Item>
  return typeof candidate.id === 'string' && typeof candidate.domainId === 'string' && typeof candidate.title === 'string' && typeof candidate.summary === 'string' && Array.isArray(candidate.stack) && Array.isArray(candidate.actorIds) && Array.isArray(candidate.signalIds) && Array.isArray(candidate.sourceIds) && Array.isArray(candidate.tags)
}

export function isSignal(value: unknown): value is Signal {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<Signal>
  return typeof candidate.id === 'string' && typeof candidate.domainId === 'string' && typeof candidate.title === 'string' && typeof candidate.observation === 'string' && Array.isArray(candidate.itemIds) && Array.isArray(candidate.evidence) && ['low', 'medium', 'high'].includes(candidate.confidence ?? '')
}
