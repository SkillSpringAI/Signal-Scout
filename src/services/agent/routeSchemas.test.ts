import { describe, expect, it } from 'vitest'
import { assertValidRouteInput, validateRouteInput } from './routeSchemas'

describe('mock route input contracts', () => {
  it('accepts the supported route shapes', () => {
    expect(validateRouteInput({ route: 'intake', interests: '' })).toEqual([])
    expect(validateRouteInput({ route: 'itemScout', domainId: 'domain-1', itemIds: ['item-1'] })).toEqual([])
    expect(validateRouteInput({ route: 'memoryReview', memoryId: 'memory-1', decision: 'accepted' })).toEqual([])
  })

  it('reports route-specific field errors', () => {
    expect(validateRouteInput({ route: 'itemScout', domainId: '', itemIds: ['item-1'] })).toContain('itemScout.domainId must be a non-empty string')
    expect(validateRouteInput({ route: 'memoryReview', memoryId: 'memory-1', decision: 'maybe' })).toContain('memoryReview.decision must be accepted or rejected')
    expect(validateRouteInput({ route: 'unknown' })).toContain('route input has an unknown route')
  })

  it('throws a useful error when a route boundary is invalid', () => {
    expect(() => assertValidRouteInput({ route: 'fieldReport', domainId: '' })).toThrow('fieldReport.domainId')
  })
})
