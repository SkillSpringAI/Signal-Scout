import { describe, expect, it } from 'vitest'
import { DemoCapacityError, InMemoryDailyUsageStore, PublicDemoUsageGuard } from './usageGuard.js'

describe('PublicDemoUsageGuard', () => {
  it('enforces the durable daily action limit', async () => {
    const guard = new PublicDemoUsageGuard(new InMemoryDailyUsageStore(), { dailyLimit: 2, burstLimit: 10, burstWindowMs: 600_000, now: () => new Date('2026-08-15T12:00:00.000Z') })
    await guard.consume('one', 'scan')
    await guard.consume('two', 'feedback')
    await expect(guard.consume('three', 'analysis_retry')).rejects.toMatchObject({ name: 'DemoCapacityError', retryAfterSeconds: 43_200 })
  })

  it('enforces a per-client burst without consuming another daily unit', async () => {
    let current = new Date('2026-08-15T12:00:00.000Z')
    const store = new InMemoryDailyUsageStore()
    const guard = new PublicDemoUsageGuard(store, { dailyLimit: 3, burstLimit: 1, burstWindowMs: 60_000, now: () => current })
    await guard.consume('same-client', 'scan')
    await expect(guard.consume('same-client', 'feedback')).rejects.toBeInstanceOf(DemoCapacityError)
    current = new Date('2026-08-15T12:01:01.000Z')
    await guard.consume('same-client', 'feedback')
    await guard.consume('another-client', 'scan')
  })
})
