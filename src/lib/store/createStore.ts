import { assertValidDataset } from '../../../shared/schemas/datasetValidation'
import type { ActivityTask } from '../../../shared/types'
import { demoDataset, type SeedDataset } from '../../data/seed'
import { reduceAppState } from './actions'
import type { AppState, AppStore } from './storeTypes'

function createSeedTask(): ActivityTask {
  return {
    id: 'task-seed-load',
    title: 'Load offline seed field',
    route: 'intake',
    status: 'completed',
    permissionMode: 'observe',
    sourceIds: ['domain-all-things-agentic'],
    outputIds: ['domain-all-things-agentic'],
    events: [{ id: 'event-seed-load', taskId: 'task-seed-load', timestamp: new Date().toISOString(), message: 'Loaded the offline hackathon field without network access.', kind: 'observation' }],
  }
}

export function createAppStore(dataset: SeedDataset = demoDataset): AppStore {
  assertValidDataset(dataset)
  let state: AppState = {
    ...dataset,
    activeDomainId: dataset.domains[0]?.id ?? '',
    userContext: { interests: '', projectIdea: '', networkingIntent: '', timeAvailable: '' },
    tasks: [createSeedTask()],
    approvals: [],
    plans: [],
  }
  const listeners = new Set<() => void>()

  return {
    getState: () => state,
    dispatch: (action) => { state = reduceAppState(state, action); listeners.forEach((listener) => listener()) },
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener) },
  }
}
