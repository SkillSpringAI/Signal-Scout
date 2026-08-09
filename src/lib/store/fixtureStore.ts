import type { Actor, Domain, Item, MemoryEntry, Opportunity, Pattern, Signal } from '../../../shared/types'
import { demoDataset, type SeedDataset } from '../../data/seed'
import { assertValidDataset } from '../../../shared/schemas/datasetValidation'

export interface FixtureStore {
  readonly domains: Domain[]
  readonly actors: Actor[]
  readonly items: Item[]
  readonly signals: Signal[]
  readonly patterns: Pattern[]
  readonly opportunities: Opportunity[]
  readonly memory: MemoryEntry[]
}

export function createFixtureStore(dataset: SeedDataset = demoDataset): FixtureStore {
  assertValidDataset(dataset)
  return dataset
}
