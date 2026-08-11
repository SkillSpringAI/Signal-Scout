import type { EntityId } from './domain'

export interface ApprovalRequest {
  id: EntityId
  scope: 'memory' | 'report_export' | 'external_impact'
  action: string
  reason: string
  status: 'pending' | 'approved' | 'rejected'
  requestedAt: string
  decidedAt?: string
  relatedMemoryId?: EntityId
}
