import type { Confidence, EntityId } from './domain'

export interface Evidence {
  label: string
  detail: string
  sourceIds: EntityId[]
  quality?: 'high' | 'medium' | 'low' | 'illustrative'
}

export interface Signal {
  id: EntityId
  domainId: EntityId
  itemIds: EntityId[]
  title: string
  observation: string
  category: 'theme' | 'technology' | 'audience' | 'gap' | 'behavior'
  confidence: Confidence
  evidence: Evidence[]
}
