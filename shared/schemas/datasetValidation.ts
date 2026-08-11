import type { Actor, Domain, Item, MemoryEntry, Opportunity, Pattern, Signal, SourceReference } from '../types'

export interface DatasetLike {
  sources: SourceReference[]
  domains: Domain[]
  actors: Actor[]
  items: Item[]
  signals: Signal[]
  patterns: Pattern[]
  opportunities: Opportunity[]
  memory: MemoryEntry[]
}

function requireUniqueIds(collection: { id: string }[], label: string, errors: string[]) {
  const ids = new Set<string>()
  for (const entry of collection) {
    if (!entry.id) errors.push(`${label} contains an entry without an id`)
    if (ids.has(entry.id)) errors.push(`${label} contains duplicate id ${entry.id}`)
    ids.add(entry.id)
  }
}

function requireRefs(collection: { id: string }[], refs: string[], targetIds: Set<string>, label: string, errors: string[]) {
  for (const ref of refs) if (!targetIds.has(ref)) errors.push(`${label} ${collection[0]?.id ?? 'entry'} references missing id ${ref}`)
}

export function validateDataset(dataset: DatasetLike): string[] {
  const errors: string[] = []
  requireUniqueIds(dataset.domains, 'domains', errors)
  requireUniqueIds(dataset.sources, 'sources', errors)
  requireUniqueIds(dataset.actors, 'actors', errors)
  requireUniqueIds(dataset.items, 'items', errors)
  requireUniqueIds(dataset.signals, 'signals', errors)
  requireUniqueIds(dataset.patterns, 'patterns', errors)
  requireUniqueIds(dataset.opportunities, 'opportunities', errors)
  requireUniqueIds(dataset.memory, 'memory', errors)

  const domainIds = new Set(dataset.domains.map((entry) => entry.id))
  const sourceIds = new Set(dataset.sources.map((entry) => entry.id))
  const actorIds = new Set(dataset.actors.map((entry) => entry.id))
  const itemIds = new Set(dataset.items.map((entry) => entry.id))
  const signalIds = new Set(dataset.signals.map((entry) => entry.id))
  const patternIds = new Set(dataset.patterns.map((entry) => entry.id))

  for (const item of dataset.items) {
    if (!domainIds.has(item.domainId)) errors.push(`item ${item.id} references missing domain ${item.domainId}`)
    requireRefs([item], item.sourceIds, sourceIds, 'item', errors)
    requireRefs([item], item.actorIds, actorIds, 'item', errors)
    requireRefs([item], item.signalIds, signalIds, 'item', errors)
  }
  for (const domain of dataset.domains) {
    requireRefs([domain], domain.sourceIds, sourceIds, 'domain', errors)
    if (domain.researchStatus !== 'verified' && domain.researchNotes.length === 0) errors.push(`domain ${domain.id} needs research notes when not fully verified`)
  }
  for (const actor of dataset.actors) requireRefs([actor], actor.itemIds, itemIds, 'actor', errors)
  for (const signal of dataset.signals) {
    if (!domainIds.has(signal.domainId)) errors.push(`signal ${signal.id} references missing domain ${signal.domainId}`)
    requireRefs([signal], signal.itemIds, itemIds, 'signal', errors)
    for (const evidence of signal.evidence) requireRefs([signal], evidence.sourceIds, sourceIds, 'signal evidence', errors)
  }
  for (const pattern of dataset.patterns) {
    if (!domainIds.has(pattern.domainId)) errors.push(`pattern ${pattern.id} references missing domain ${pattern.domainId}`)
    requireRefs([pattern], pattern.signalIds, signalIds, 'pattern', errors)
  }
  for (const opportunity of dataset.opportunities) {
    if (!domainIds.has(opportunity.domainId)) errors.push(`opportunity ${opportunity.id} references missing domain ${opportunity.domainId}`)
    requireRefs([opportunity], opportunity.evidenceIds, new Set([...signalIds, ...patternIds]), 'opportunity', errors)
    requireRefs([opportunity], opportunity.actorIds, actorIds, 'opportunity', errors)
  }
  for (const memory of dataset.memory) requireRefs([memory], memory.evidenceIds, new Set([...signalIds, ...patternIds]), 'memory', errors)
  return errors
}

export function assertValidDataset(dataset: DatasetLike): void {
  const errors = validateDataset(dataset)
  if (errors.length > 0) throw new Error(`Invalid dataset:\n- ${errors.join('\n- ')}`)
}
