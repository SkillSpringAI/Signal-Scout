export type ExecutionMode = 'mock' | 'live'

export const executionModeStorageKey = 'signal-scout:execution-mode'

type ReadableStorage = Pick<Storage, 'getItem'>
type WritableStorage = Pick<Storage, 'setItem'>

export function readExecutionMode(storage?: ReadableStorage): ExecutionMode {
  if (!storage) return 'mock'
  try {
    return storage.getItem(executionModeStorageKey) === 'live' ? 'live' : 'mock'
  } catch {
    return 'mock'
  }
}

export function persistExecutionMode(mode: ExecutionMode, storage?: WritableStorage): void {
  if (!storage) return
  try {
    storage.setItem(executionModeStorageKey, mode)
  } catch {
    // Storage can be unavailable in hardened or quota-limited browsers.
  }
}

function getBrowserStorage(): Storage | undefined {
  if (typeof window === 'undefined') return undefined
  try {
    return window.localStorage
  } catch {
    return undefined
  }
}

export function readBrowserExecutionMode(): ExecutionMode {
  return readExecutionMode(getBrowserStorage())
}

export function persistBrowserExecutionMode(mode: ExecutionMode): void {
  persistExecutionMode(mode, getBrowserStorage())
}
