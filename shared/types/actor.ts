import type { EntityId } from './domain'

export interface Actor {
  id: EntityId
  name: string
  role: 'builder' | 'team' | 'sponsor' | 'speaker' | 'organization'
  bio: string
  itemIds: EntityId[]
  contactHint?: string
}
