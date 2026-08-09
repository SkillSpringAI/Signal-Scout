import { describe, expect, it } from 'vitest'
import { demoDataset } from '../../src/data/seed'
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
})
