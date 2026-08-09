import type { Actor, Domain, Item, MemoryEntry, Opportunity, Pattern, Signal } from '../../../shared/types'
import { allThingsAgentic } from './allThingsAgentic'
import { actors, items, opportunities, patterns, signals } from './demoProjects'
import { demoMemory } from './demoMemory'

export interface SeedDataset {
  domains: Domain[]
  actors: Actor[]
  items: Item[]
  signals: Signal[]
  patterns: Pattern[]
  opportunities: Opportunity[]
  memory: MemoryEntry[]
}

export const demoDataset: SeedDataset = {
  domains: [allThingsAgentic], actors, items, signals, patterns, opportunities, memory: demoMemory,
}
