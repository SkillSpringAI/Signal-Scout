import type { EntityId } from './domain'

export type SourceKind = 'official_event' | 'event_listing' | 'project_link' | 'user_provided' | 'demo_fixture'
export type SourceVerification = 'verified' | 'secondary' | 'illustrative' | 'unverified'

export interface SourceReference {
  id: EntityId
  title: string
  url?: string
  kind: SourceKind
  verification: SourceVerification
  collectedAt: string
  notes?: string
}
