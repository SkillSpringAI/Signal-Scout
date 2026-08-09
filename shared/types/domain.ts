export type EntityId = string
export type PermissionMode = 'observe' | 'suggest' | 'act_with_approval'
export type Confidence = 'low' | 'medium' | 'high'

export interface Domain {
  id: EntityId
  kind: 'hackathon' | 'conference' | 'research' | 'open_source' | 'career'
  name: string
  summary: string
  sourceUrl?: string
  constraints: string[]
  judgingCriteria: string[]
  requiredTechnologies: string[]
  deadlines: { label: string; date: string }[]
}
