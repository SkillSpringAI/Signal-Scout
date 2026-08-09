import type { Confidence, EntityId } from './domain'

export interface Opportunity {
  id: EntityId
  domainId: EntityId
  kind: 'build' | 'learn' | 'follow_up' | 'compare' | 'refine'
  title: string
  explanation: string
  whyNow: string
  confidence: Confidence
  evidenceIds: EntityId[]
  actorIds: EntityId[]
  status: 'proposed' | 'saved' | 'dismissed'
}
