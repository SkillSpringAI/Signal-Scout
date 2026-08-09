import type { Domain, Item, Signal } from '../../shared/types'

export interface DomainPack {
  id: Domain['kind']
  displayName: string
  labels: Record<string, string>
  rankingCriteria: string[]
  prompts: {
    domainAnalyze: string
    itemScout: string
    patternMap: string
    fieldReport: string
  }
  accepts(item: Item): boolean
  summarizeSignal(signal: Signal): string
}
