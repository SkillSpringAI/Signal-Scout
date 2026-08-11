import { describe, expect, it } from 'vitest'
import { createAppStore } from './createStore'
import { MockAgent } from '../../services/agent/mockAgent'
import type { StorageAdapter } from './storeTypes'

class MemoryStorage implements StorageAdapter {
  private values = new Map<string, string>()
  getItem(key: string) { return this.values.get(key) ?? null }
  setItem(key: string, value: string) { this.values.set(key, value) }
  removeItem(key: string) { this.values.delete(key) }
}

describe('app store persistence', () => {
  it('hydrates a valid session from the injected storage adapter', () => {
    const storage = new MemoryStorage()
    const first = createAppStore(undefined, { storage })
    new MockAgent(first).runIntake('evaluation')
    const second = createAppStore(undefined, { storage })

    expect(second.getState().userContext.interests).toBe('evaluation')
    expect(second.getState().tasks.length).toBeGreaterThan(1)
  })

  it('exports, imports, and resets a versioned state envelope', () => {
    const storage = new MemoryStorage()
    const source = createAppStore(undefined, { storage })
    new MockAgent(source).runIntake('trustworthy agents')
    const exported = source.exportState()
    const target = createAppStore(undefined, { persist: false })

    target.importState(exported)
    expect(target.getState().userContext.interests).toBe('trustworthy agents')
    expect(() => target.importState('{"version":999,"state":{}}')).toThrow('unsupported version')

    target.reset()
    expect(target.getState().userContext.interests).toBe('')
    expect(target.getState().tasks).toHaveLength(1)
    expect(storage.getItem('signal-scout:app-state:v1')).not.toBeNull()
    source.reset()
    expect(storage.getItem('signal-scout:app-state:v1')).toBeNull()
  })
})
