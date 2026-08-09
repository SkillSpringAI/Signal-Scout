import type { EntityId } from './domain'

export interface PlanStep {
  id: EntityId
  title: string
  detail: string
  kind: 'build' | 'learn' | 'network'
  order: number
  done: boolean
}

export interface Plan {
  id: EntityId
  domainId: EntityId
  title: string
  summary: string
  steps: PlanStep[]
}
