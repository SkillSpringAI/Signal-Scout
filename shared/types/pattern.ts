import type { Confidence, EntityId } from './domain'

export interface Pattern {
  id: EntityId
  domainId: EntityId
  name: string
  summary: string
  signalIds: EntityId[]
  gap?: string
  confidence: Confidence
}
