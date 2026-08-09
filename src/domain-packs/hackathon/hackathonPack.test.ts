import { describe, expect, it } from 'vitest'
import { hackathonPack } from './index'
import { items, signals } from '../../data/seed/demoProjects'

describe('hackathon domain pack', () => {
  it('accepts project items and exposes reusable analysis configuration', () => {
    expect(hackathonPack.id).toBe('hackathon')
    expect(hackathonPack.accepts(items[0])).toBe(true)
    expect(hackathonPack.rankingCriteria.length).toBeGreaterThan(2)
    expect(hackathonPack.summarizeSignal(signals[0])).toContain(signals[0].title)
  })
})
