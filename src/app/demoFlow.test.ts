import { describe, expect, it } from 'vitest'
import { createAppStore } from '../lib/store/createStore'
import { MockAgent } from '../services/agent/mockAgent'
import { selectActivityTasks, selectPendingApprovals, selectSavedOpportunities } from '../lib/store/selectors'

describe('local MVP demo flow', () => {
  it('moves from intake through review and report regeneration', () => {
    const store = createAppStore(undefined, { persist: false })
    const agent = new MockAgent(store, { now: () => '2026-08-11T10:00:00.000Z' })

    store.reset()
    const workflow = agent.runScoutingWorkflow('trustworthy agents, evaluation, and learning')
    expect(workflow.every((result) => result.status === 'completed')).toBe(true)
    expect(selectActivityTasks(store.getState()).length).toBeGreaterThanOrEqual(8)
    expect(store.getState().plans[0]?.steps.map((step) => step.kind)).toEqual(['learn', 'build', 'network'])
    expect(selectPendingApprovals(store.getState())).toHaveLength(1)

    agent.saveOpportunity('opportunity-report')
    agent.reviewMemory('memory-proposed', 'accepted')
    agent.runFieldReport('suggest')

    expect(selectSavedOpportunities(store.getState()).map((opportunity) => opportunity.id)).toContain('opportunity-report')
    expect(selectPendingApprovals(store.getState())).toHaveLength(0)
    expect(store.getState().report?.acceptedMemoryIds).toContain('memory-proposed')
    expect(store.getState().report?.activityTaskIds.length).toBeGreaterThanOrEqual(10)

    store.reset()
    expect(store.getState().report).toBeUndefined()
    expect(selectActivityTasks(store.getState())).toHaveLength(1)
    expect(selectSavedOpportunities(store.getState())).toHaveLength(0)
  })
})
