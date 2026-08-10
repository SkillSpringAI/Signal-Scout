import type { PermissionMode } from '../../../shared/types'

export interface RouteRunResult {
  taskId: string
  route: string
  status: 'completed' | 'needs_input'
}

export interface AgentRunOptions {
  permissionMode?: PermissionMode
  now?: () => string
}
