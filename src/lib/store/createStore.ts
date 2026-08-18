import { assertValidDataset, validateDataset } from '../../../shared/schemas/datasetValidation'
import type { ActivityTask } from '../../../shared/types'
import { demoDataset, type SeedDataset } from '../../data/seed'
import { reduceAppState } from './actions'
import type { AppState, AppStore, StorageAdapter } from './storeTypes'

const STORAGE_KEY = 'signal-scout:app-state:v1'
const STORAGE_VERSION = 1

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

function defaultStorage(): StorageAdapter | undefined {
  if (typeof window === 'undefined' || !window.localStorage) return undefined
  return window.localStorage
}

function validateAppState(value: unknown): value is AppState {
  if (typeof value !== 'object' || value === null) return false
  const candidate = value as Partial<AppState>
  if (candidate.activeDomainId === undefined || typeof candidate.activeDomainId !== 'string') return false
  if (!candidate.userContext || typeof candidate.userContext !== 'object') return false
  if (!Array.isArray(candidate.tasks) || !Array.isArray(candidate.approvals) || !Array.isArray(candidate.plans)) return false
  return ['interests', 'projectIdea', 'networkingIntent', 'timeAvailable'].every((key) => typeof candidate.userContext?.[key as keyof AppState['userContext']] === 'string') && validateDataset(candidate as AppState).length === 0
}

function parsePersistedState(serialized: string): AppState {
  const envelope = JSON.parse(serialized) as { version?: unknown; state?: unknown }
  if (envelope.version !== STORAGE_VERSION || !validateAppState(envelope.state)) throw new Error('Stored Signal Scout state is invalid or from an unsupported version.')
  return envelope.state
}

export interface AppStoreOptions {
  storage?: StorageAdapter
  persist?: boolean
}

export function createAppStore(dataset: SeedDataset = demoDataset, options: AppStoreOptions = {}): AppStore {
  assertValidDataset(dataset)
  const storage = options.persist === false ? undefined : options.storage ?? defaultStorage()
  const createInitialState = (): AppState => ({
    ...dataset,
    activeDomainId: dataset.domains[0]?.id ?? '',
    userContext: { interests: '', projectIdea: '', networkingIntent: '', timeAvailable: '' },
    tasks: [createSeedTask()],
    approvals: [{ id: 'approval-memory-proposed', scope: 'memory', action: 'Record concept memory decision', reason: 'This synthetic reflection changes only local mock state after your review.', status: 'pending', requestedAt: '2026-08-11', relatedMemoryId: 'memory-proposed' }],
    plans: [],
  })
  let state: AppState = createInitialState()
  const persisted = storage?.getItem(STORAGE_KEY)
  if (persisted) {
    try {
      const hydrated = parsePersistedState(persisted)
      if (hydrated.activeDomainId === state.activeDomainId) state = hydrated
    } catch {
      storage?.removeItem(STORAGE_KEY)
    }
  }
  const listeners = new Set<() => void>()
  const notify = () => listeners.forEach((listener) => listener())
  const persist = () => storage?.setItem(STORAGE_KEY, JSON.stringify({ version: STORAGE_VERSION, state }))

  return {
    getState: () => state,
    dispatch: (action) => { state = reduceAppState(state, action); persist(); notify() },
    reset: () => { state = createInitialState(); storage?.removeItem(STORAGE_KEY); notify() },
    exportState: () => JSON.stringify({ version: STORAGE_VERSION, state }, null, 2),
    importState: (serialized) => { const imported = parsePersistedState(serialized); if (imported.activeDomainId !== state.activeDomainId) throw new Error('Imported state belongs to a different active domain.'); state = imported; persist(); notify() },
    subscribe: (listener) => { listeners.add(listener); return () => listeners.delete(listener) },
  }
}
