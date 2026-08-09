import type { EntityId } from './domain'

export interface ApprovalRequest {
  id: EntityId
  action: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  relatedMemoryId?: EntityId
}
