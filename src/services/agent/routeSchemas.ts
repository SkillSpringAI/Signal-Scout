import type { RouteName } from './agentTypes'

export interface IntakeRouteInput { route: 'intake'; interests: string }
export interface ItemScoutRouteInput { route: 'itemScout'; domainId: string; itemIds: string[] }
export interface PatternMapRouteInput { route: 'patternMap'; domainId: string; signalIds: string[] }
export interface RelationshipScoutRouteInput { route: 'relationshipScout'; domainId: string; actorIds: string[] }
export interface OpportunityRefineRouteInput { route: 'opportunityRefine'; domainId: string; opportunityId?: string }
export interface LearningPlanRouteInput { route: 'learningPlan'; domainId: string; goal?: string }
export interface FieldReportRouteInput { route: 'fieldReport'; domainId: string }
export interface MemoryReviewRouteInput { route: 'memoryReview'; memoryId: string; decision: 'accepted' | 'rejected' }
export interface OpportunitySaveRouteInput { route: 'opportunitySave'; opportunityId: string }

export type RouteInput = IntakeRouteInput | ItemScoutRouteInput | PatternMapRouteInput | RelationshipScoutRouteInput | OpportunityRefineRouteInput | LearningPlanRouteInput | FieldReportRouteInput | MemoryReviewRouteInput | OpportunitySaveRouteInput

const routeNames: RouteName[] = ['intake', 'itemScout', 'patternMap', 'relationshipScout', 'opportunityRefine', 'learningPlan', 'fieldReport', 'memoryReview', 'opportunitySave']
const isRecord = (value: unknown): value is Record<string, unknown> => typeof value === 'object' && value !== null
const isStringArray = (value: unknown): value is string[] => Array.isArray(value) && value.every((entry) => typeof entry === 'string' && entry.length > 0)

export function validateRouteInput(value: unknown): string[] {
  if (!isRecord(value)) return ['route input must be an object']
  if (typeof value.route !== 'string' || !routeNames.includes(value.route as RouteName)) return ['route input has an unknown route']
  switch (value.route) {
    case 'intake': return typeof value.interests === 'string' ? [] : ['intake.interests must be a string']
    case 'itemScout': return [typeof value.domainId === 'string' && value.domainId ? '' : 'itemScout.domainId must be a non-empty string', isStringArray(value.itemIds) ? '' : 'itemScout.itemIds must be a non-empty string array'].filter(Boolean)
    case 'patternMap': return [typeof value.domainId === 'string' && value.domainId ? '' : 'patternMap.domainId must be a non-empty string', isStringArray(value.signalIds) ? '' : 'patternMap.signalIds must be a non-empty string array'].filter(Boolean)
    case 'relationshipScout': return [typeof value.domainId === 'string' && value.domainId ? '' : 'relationshipScout.domainId must be a non-empty string', isStringArray(value.actorIds) ? '' : 'relationshipScout.actorIds must be a non-empty string array'].filter(Boolean)
    case 'opportunityRefine': return [typeof value.domainId === 'string' && value.domainId ? '' : 'opportunityRefine.domainId must be a non-empty string', value.opportunityId === undefined || (typeof value.opportunityId === 'string' && value.opportunityId.length > 0) ? '' : 'opportunityRefine.opportunityId must be a non-empty string when supplied'].filter(Boolean)
    case 'learningPlan': return [typeof value.domainId === 'string' && value.domainId ? '' : 'learningPlan.domainId must be a non-empty string', value.goal === undefined || typeof value.goal === 'string' ? '' : 'learningPlan.goal must be a string when supplied'].filter(Boolean)
    case 'fieldReport': return typeof value.domainId === 'string' && value.domainId ? [] : ['fieldReport.domainId must be a non-empty string']
    case 'memoryReview': return [typeof value.memoryId === 'string' && value.memoryId ? '' : 'memoryReview.memoryId must be a non-empty string', value.decision === 'accepted' || value.decision === 'rejected' ? '' : 'memoryReview.decision must be accepted or rejected'].filter(Boolean)
    case 'opportunitySave': return typeof value.opportunityId === 'string' && value.opportunityId ? [] : ['opportunitySave.opportunityId must be a non-empty string']
  }
  return ['route input is invalid']
}

export function assertValidRouteInput(value: unknown): asserts value is RouteInput {
  const errors = validateRouteInput(value)
  if (errors.length > 0) throw new Error(`Invalid route input:\n- ${errors.join('\n- ')}`)
}
