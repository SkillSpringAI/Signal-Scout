import type { Actor, Domain, Item, MemoryEntry, Opportunity, Pattern, Signal, SourceReference } from '../../../shared/types'
import { allThingsAgentic } from './allThingsAgentic'
import { actors, items, opportunities, patterns, signals } from './demoProjects'
import { demoMemory } from './demoMemory'
import { demoSources } from './demoSources'

export interface SeedDataset {
  sources: SourceReference[]
  domains: Domain[]
  actors: Actor[]
  items: Item[]
  signals: Signal[]
  patterns: Pattern[]
  opportunities: Opportunity[]
  memory: MemoryEntry[]
}

export const demoDataset: SeedDataset = {
  sources: demoSources, domains: [allThingsAgentic], actors, items, signals, patterns, opportunities, memory: demoMemory,
}
