import { describe, expect, it } from 'vitest'
import { createAppStore } from '../../lib/store/createStore'
import { MockAgent } from './mockAgent'
import { selectCompletedRoutes } from '../../lib/store/selectors'
import { getRoutePermission } from '../../lib/permissions/permissionState'

describe('mock scouting workflow', () => {
  it('runs intake through field report and records every route', () => {
    const store = createAppStore()
    const agent = new MockAgent(store, { now: () => '2026-08-10T09:00:00.000Z' })

    const results = agent.runScoutingWorkflow('trustworthy agents and evaluation')
    const state = store.getState()

    expect(results).toHaveLength(7)
    expect(results.every((result) => result.status === 'completed')).toBe(true)
    expect(selectCompletedRoutes(state)).toEqual(['intake', 'intake', 'itemScout', 'patternMap', 'relationshipScout', 'opportunityRefine', 'learningPlan', 'fieldReport'])
    expect(state.userContext.interests).toContain('trustworthy agents')
    expect(state.report?.patternIds).toHaveLength(state.patterns.length)
    expect(state.report?.planIds).toHaveLength(1)
    expect(state.plans[0]?.steps).toHaveLength(3)
    expect(state.tasks.every((task) => task.events.length > 0)).toBe(true)
  })

  it('stops at intake when the user context is empty', () => {
    const store = createAppStore()
    const agent = new MockAgent(store)

    const results = agent.runScoutingWorkflow('')

    expect(results).toEqual([{ taskId: expect.any(String), route: 'intake', status: 'needs_input', outputIds: [], warnings: ['Interests are missing; using the seed field without personalization.'] }])
    expect(store.getState().report).toBeUndefined()
    const lastTask = store.getState().tasks[store.getState().tasks.length - 1]
    expect(lastTask?.events[lastTask.events.length - 1]?.kind).toBe('fallback')
  })

  it('logs memory review and opportunity save actions', () => {
    const store = createAppStore()
    const agent = new MockAgent(store)

    agent.reviewMemory('memory-proposed', 'accepted')
    agent.saveOpportunity('opportunity-report')

    expect(store.getState().memory.find((entry) => entry.id === 'memory-proposed')?.status).toBe('accepted')
    expect(store.getState().approvals.find((entry) => entry.id === 'approval-memory-proposed')?.status).toBe('approved')
    expect(store.getState().opportunities.find((entry) => entry.id === 'opportunity-report')?.status).toBe('saved')
    expect(store.getState().tasks.slice(-2).map((task) => task.route)).toEqual(['memoryReview', 'opportunitySave'])
  })

  it('resets session state without replacing the seed dataset', () => {
    const store = createAppStore()
    const agent = new MockAgent(store)
    agent.runScoutingWorkflow('evaluation')

    store.reset()

    expect(store.getState().tasks).toHaveLength(1)
    expect(store.getState().report).toBeUndefined()
    expect(store.getState().userContext.interests).toBe('')
    expect(store.getState().items).toHaveLength(3)
    expect(store.getState().approvals[0]?.status).toBe('pending')
  })

  it('keeps memory changes approval-gated', () => {
    expect(getRoutePermission('memoryReview', 'suggest').decision).toBe('approval_required')
    expect(getRoutePermission('memoryReview', 'act_with_approval').decision).toBe('allowed')
    expect(getRoutePermission('itemScout', 'observe').decision).toBe('allowed')
  })

  it('preserves prior value and continues after a non-blocking route failure', () => {
    const store = createAppStore()
    const agent = new MockAgent(store, { failRoutes: ['patternMap'] })

    const results = agent.runScoutingWorkflow('evaluation')
    const failedTask = store.getState().tasks.find((task) => task.route === 'patternMap')

    expect(results.find((result) => result.route === 'patternMap')?.status).toBe('failed')
    expect(results.find((result) => result.route === 'fieldReport')?.status).toBe('completed')
    expect(store.getState().report).toBeDefined()
    expect(store.getState().patterns.length).toBeGreaterThan(0)
    expect(failedTask?.status).toBe('failed')
    expect(failedTask?.events.some((event) => event.kind === 'error')).toBe(true)
  })
})
