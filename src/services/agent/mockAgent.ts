import type { ActivityTask, FieldReport, PermissionMode, Plan } from '../../../shared/types'
import type { AppStore } from '../../lib/store/storeTypes'
import type { AgentRunOptions, RouteRunResult } from './agentTypes'

let sequence = 0
function id(prefix: string) { sequence += 1; return `${prefix}-${sequence}` }

export class MockAgent {
  constructor(private readonly store: AppStore, private readonly options: AgentRunOptions = {}) {}

  private now() { return this.options.now?.() ?? new Date().toISOString() }

  private startTask(title: string, route: string, mode: PermissionMode, sourceIds: string[] = []): ActivityTask {
    const task: ActivityTask = { id: id('task'), title, route, status: 'running', permissionMode: mode, sourceIds, outputIds: [], events: [] }
    this.store.dispatch({ type: 'ADD_TASK', task })
    this.event(task, `Started ${route} in ${mode} mode.`, 'observation')
    return task
  }

  private event(task: ActivityTask, message: string, kind: ActivityTask['events'][number]['kind']) {
    this.store.dispatch({ type: 'ADD_TASK_EVENT', taskId: task.id, event: { id: id('event'), taskId: task.id, timestamp: this.now(), message, kind } })
  }

  private complete(task: ActivityTask, outputIds: string[]) {
    this.store.dispatch({ type: 'UPDATE_TASK', taskId: task.id, patch: { status: 'completed', outputIds } })
    this.event(task, 'Completed with structured output available for review.', 'suggestion')
    return { taskId: task.id, route: task.route, status: 'completed' as const }
  }

  runIntake(interests: string, mode: PermissionMode = this.options.permissionMode ?? 'observe'): RouteRunResult {
    const task = this.startTask('Capture builder context', 'intake', mode)
    this.store.dispatch({ type: 'SET_USER_CONTEXT', payload: { interests } })
    if (!interests.trim()) { this.event(task, 'Interests are missing; using the seed field without personalization.', 'fallback'); return { taskId: task.id, route: task.route, status: 'needs_input' } }
    this.event(task, `Captured interests: ${interests.trim()}`, 'observation')
    return this.complete(task, ['user-context'])
  }

  runItemScout(mode: PermissionMode = this.options.permissionMode ?? 'observe'): RouteRunResult {
    const state = this.store.getState()
    const task = this.startTask('Scout project field', 'itemScout', mode, state.items.map((item) => item.id))
    this.event(task, `Reviewed ${state.items.length} seeded projects against the builder context.`, 'observation')
    return this.complete(task, state.items.map((item) => item.id))
  }

  runPatternMap(mode: PermissionMode = this.options.permissionMode ?? 'observe'): RouteRunResult {
    const state = this.store.getState()
    const task = this.startTask('Map field patterns', 'patternMap', mode, state.signals.map((signal) => signal.id))
    this.event(task, `Linked ${state.signals.length} signals into ${state.patterns.length} pattern clusters.`, 'suggestion')
    return this.complete(task, state.patterns.map((pattern) => pattern.id))
  }

  runRelationshipScout(mode: PermissionMode = this.options.permissionMode ?? 'suggest'): RouteRunResult {
    const state = this.store.getState()
    const actorIds = state.actors.filter((actor) => actor.contactHint).map((actor) => actor.id)
    const task = this.startTask('Scout useful relationships', 'relationshipScout', mode, actorIds)
    this.event(task, `Found ${actorIds.length} builders or teams with a specific learning reason.`, 'suggestion')
    return this.complete(task, actorIds)
  }

  runOpportunityRefine(mode: PermissionMode = this.options.permissionMode ?? 'suggest'): RouteRunResult {
    const state = this.store.getState()
    const opportunity = state.opportunities.find((candidate) => candidate.kind === 'build') ?? state.opportunities[0]
    const task = this.startTask('Refine project opportunities', 'opportunityRefine', mode, opportunity ? opportunity.evidenceIds : [])
    if (!opportunity) {
      this.event(task, 'No opportunities were available to refine.', 'fallback')
      return { taskId: task.id, route: task.route, status: 'needs_input' }
    }
    this.store.dispatch({ type: 'UPDATE_OPPORTUNITY', opportunityId: opportunity.id, patch: { explanation: `${opportunity.explanation} This is especially relevant to the current builder context.`, whyNow: 'It connects the field evidence to a concrete next project decision.', confidence: 'high' } })
    this.event(task, `Refined ${opportunity.title} against the current builder context.`, 'suggestion')
    return this.complete(task, [opportunity.id])
  }

  runLearningPlan(mode: PermissionMode = this.options.permissionMode ?? 'suggest'): RouteRunResult {
    const state = this.store.getState()
    const task = this.startTask('Build learning and networking plan', 'learningPlan', mode)
    const plan: Plan = { id: id('plan'), domainId: state.activeDomainId, title: 'A practical next-week learning loop', summary: 'Turn the strongest field signals into one build action, one study action, and one humane conversation.', steps: [
      { id: id('step'), title: 'Study inspectable autonomy', detail: 'Compare evidence and approval patterns across the top two projects.', kind: 'learn', order: 1, done: false },
      { id: id('step'), title: 'Prototype a Field Report moment', detail: 'Make the synthesis of evidence and next moves visible in the demo.', kind: 'build', order: 2, done: false },
      { id: id('step'), title: 'Follow up with one builder', detail: 'Use a specific learning question; do not send a generic outreach message.', kind: 'network', order: 3, done: false },
    ] }
    this.store.dispatch({ type: 'SET_PLAN', plan })
    this.event(task, `Created ${plan.steps.length} sequenced learning, build, and networking steps.`, 'suggestion')
    return this.complete(task, [plan.id])
  }

  runFieldReport(mode: PermissionMode = this.options.permissionMode ?? 'suggest'): RouteRunResult {
    const state = this.store.getState()
    const task = this.startTask('Generate Field Report', 'fieldReport', mode)
    const acceptedMemoryIds = state.memory.filter((entry) => entry.status === 'accepted').map((entry) => entry.id)
    const report: FieldReport = { id: id('report'), domainId: state.activeDomainId, generatedAt: this.now(), title: 'What the agentic field is teaching us', executiveSignal: 'Inspectable autonomy is the opening.', patternIds: state.patterns.map((pattern) => pattern.id), opportunityIds: state.opportunities.map((opportunity) => opportunity.id), actorIds: state.actors.map((actor) => actor.id), planIds: state.plans.map((plan) => plan.id), acceptedMemoryIds, activityTaskIds: state.tasks.map((existingTask) => existingTask.id).concat(task.id) }
    this.store.dispatch({ type: 'SET_REPORT', report })
    this.event(task, `Generated a report from ${state.items.length} projects, ${state.signals.length} signals, and ${state.patterns.length} patterns.`, 'suggestion')
    return this.complete(task, [report.id])
  }

  reviewMemory(memoryId: string, status: 'accepted' | 'rejected'): RouteRunResult {
    const task = this.startTask('Review proposed memory', 'memoryReview', 'act_with_approval')
    this.store.dispatch({ type: 'SET_MEMORY_STATUS', memoryId, status })
    this.event(task, `${status === 'accepted' ? 'Accepted' : 'Rejected'} memory entry ${memoryId}.`, status === 'accepted' ? 'approval' : 'observation')
    return this.complete(task, [memoryId])
  }

  saveOpportunity(opportunityId: string): RouteRunResult {
    const task = this.startTask('Save opportunity', 'opportunitySave', 'suggest')
    this.store.dispatch({ type: 'SAVE_OPPORTUNITY', opportunityId })
    this.event(task, `Saved opportunity ${opportunityId} for the next plan review.`, 'suggestion')
    return this.complete(task, [opportunityId])
  }

  runScoutingWorkflow(interests: string, mode: PermissionMode = this.options.permissionMode ?? 'observe'): RouteRunResult[] {
    const results = [this.runIntake(interests, mode)]
    if (results[0].status === 'needs_input') return results
    results.push(this.runItemScout(mode), this.runPatternMap(mode), this.runRelationshipScout('suggest'), this.runOpportunityRefine('suggest'), this.runLearningPlan('suggest'), this.runFieldReport('suggest'))
    return results
  }
}
