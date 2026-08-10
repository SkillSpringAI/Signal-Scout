import type { EntityId } from './domain'

export interface FieldReport {
  id: EntityId
  domainId: EntityId
  generatedAt: string
  title: string
  executiveSignal: string
  patternIds: EntityId[]
  opportunityIds: EntityId[]
  actorIds: EntityId[]
  planIds: EntityId[]
  acceptedMemoryIds: EntityId[]
  activityTaskIds: EntityId[]
}
