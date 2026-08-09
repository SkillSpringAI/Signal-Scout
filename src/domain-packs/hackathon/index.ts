import type { DomainPack } from '../types'
import { hackathonLabels } from './labels'
import { hackathonRankingCriteria } from './criteria'
import { hackathonPrompts } from './prompts'

export const hackathonPack: DomainPack = {
  id: 'hackathon',
  displayName: 'Hackathon Scout',
  labels: hackathonLabels,
  rankingCriteria: [...hackathonRankingCriteria],
  prompts: hackathonPrompts,
  accepts: (item) => item.type === 'project',
  summarizeSignal: (signal) => `${signal.title}: ${signal.observation}`,
}
