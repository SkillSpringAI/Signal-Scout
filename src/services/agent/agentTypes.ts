import type { PermissionMode } from '../../../shared/types'

export type RouteName = 'intake' | 'itemScout' | 'patternMap' | 'relationshipScout' | 'opportunityRefine' | 'learningPlan' | 'fieldReport' | 'memoryReview' | 'opportunitySave'

export interface RouteRunResult {
  taskId: string
  route: RouteName
  status: 'completed' | 'needs_input' | 'failed'
  outputIds: string[]
  warnings: string[]
}

export interface AgentRunOptions {
  permissionMode?: PermissionMode
  now?: () => string
  failRoutes?: RouteName[]
}

export function assertValidRouteResult(value: RouteRunResult): RouteRunResult {
  const routes: RouteName[] = ['intake', 'itemScout', 'patternMap', 'relationshipScout', 'opportunityRefine', 'learningPlan', 'fieldReport', 'memoryReview', 'opportunitySave']
  if (!value.taskId || !routes.includes(value.route) || !Array.isArray(value.outputIds) || !Array.isArray(value.warnings)) throw new Error('Invalid mock route result: missing task, route, outputs, or warnings.')
  return value
}
