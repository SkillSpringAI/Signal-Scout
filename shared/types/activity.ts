import type { EntityId, PermissionMode } from './domain'

export type ActivityStatus = 'queued' | 'running' | 'completed' | 'needs_input' | 'failed'

export interface ActivityEvent {
  id: EntityId
  taskId: EntityId
  timestamp: string
  message: string
  kind: 'observation' | 'suggestion' | 'fallback' | 'approval' | 'error'
}

export interface ActivityTask {
  id: EntityId
  title: string
  route: string
  status: ActivityStatus
  permissionMode: PermissionMode
  sourceIds: EntityId[]
  outputIds: EntityId[]
  events: ActivityEvent[]
}
