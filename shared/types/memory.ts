import type { EntityId } from './domain'

export interface MemoryEntry {
  id: EntityId
  text: string
  category: 'interest' | 'goal' | 'preference' | 'reflection'
  status: 'proposed' | 'accepted' | 'rejected'
  evidenceIds: EntityId[]
  createdAt: string
}
