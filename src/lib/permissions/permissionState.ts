import type { PermissionMode } from '../../../shared/types'

export type PermissionDecision = 'allowed' | 'approval_required' | 'blocked'

export function getRoutePermission(route: string, mode: PermissionMode): { decision: PermissionDecision; explanation: string } {
  if (route === 'memoryReview') return mode === 'act_with_approval'
    ? { decision: 'allowed', explanation: 'A concept approval is being recorded for this local mock memory change.' }
    : { decision: 'approval_required', explanation: 'Changing concept memory in the local mock requires explicit review.' }
  if (mode === 'observe' || mode === 'suggest') return { decision: 'allowed', explanation: `This route runs in ${mode} mode and has no external impact.` }
  return { decision: 'approval_required', explanation: 'This route is prepared for review before any external-impact action.' }
}
