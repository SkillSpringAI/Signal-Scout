import type { EntityId } from './domain'

export interface Item {
  id: EntityId
  domainId: EntityId
  type: 'project' | 'talk' | 'paper' | 'repository'
  title: string
  summary: string
  url?: string
  audience: string
  stack: string[]
  maturity: 'idea' | 'prototype' | 'working' | 'production'
  relevance: number
  actorIds: EntityId[]
  signalIds: EntityId[]
  tags: string[]
}
