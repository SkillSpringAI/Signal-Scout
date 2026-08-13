import { describe, expect, it } from 'vitest'
import { demoDataset } from '../../src/data/seed'
import { fallbackFixtures } from '../../src/data/seed/fallbacks'
import { assertValidDataset, validateDataset } from './datasetValidation'

describe('demo dataset', () => {
  it('is internally consistent', () => {
    expect(validateDataset(demoDataset)).toEqual([])
    expect(() => assertValidDataset(demoDataset)).not.toThrow()
  })

  it('reports broken references', () => {
    const broken = { ...demoDataset, items: demoDataset.items.map((item, index) => index === 0 ? { ...item, domainId: 'missing-domain' } : item) }
    expect(validateDataset(broken).some((error) => error.includes('missing domain'))).toBe(true)
  })

  it('keeps representative fallback fixtures available for demos', () => {
    expect(fallbackFixtures.map((fixture) => fixture.route)).toEqual(['intake', 'itemScout', 'fieldReport'])
    expect(fallbackFixtures.every((fixture) => fixture.preservedValue.length > 0)).toBe(true)
  })

  it('requires verified official sources for the domain and source references for synthetic projects', () => {
    expect(demoDataset.sources.length).toBeGreaterThan(0)
    expect(demoDataset.domains[0]?.researchStatus).toBe('verified')
    expect(demoDataset.items.every((item) => item.sourceIds.length > 0)).toBe(true)
    expect(demoDataset.signals.every((signal) => signal.evidence.every((evidence) => evidence.sourceIds.length > 0))).toBe(true)
  })
})
