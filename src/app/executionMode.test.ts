import { describe, expect, it, vi } from 'vitest'
import { executionModeStorageKey, persistExecutionMode, readExecutionMode } from './executionMode'

describe('execution mode persistence', () => {
  it('defaults first-time and invalid stored values to mock', () => {
    expect(readExecutionMode()).toBe('mock')
    expect(readExecutionMode({ getItem: () => 'unexpected' })).toBe('mock')
  })

  it('restores an explicitly selected live mode after refresh', () => {
    expect(readExecutionMode({ getItem: () => 'live' })).toBe('live')
  })

  it('persists explicit execution-mode changes', () => {
    const setItem = vi.fn()
    persistExecutionMode('live', { setItem })
    expect(setItem).toHaveBeenCalledWith(executionModeStorageKey, 'live')
  })

  it('fails safely when browser storage is unavailable', () => {
    expect(readExecutionMode({ getItem: () => { throw new Error('blocked') } })).toBe('mock')
    expect(() => persistExecutionMode('live', { setItem: () => { throw new Error('blocked') } })).not.toThrow()
  })
})
