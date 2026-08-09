import type { MemoryEntry } from '../../../shared/types'

export const demoMemory: MemoryEntry[] = [
  { id: 'memory-growth', text: 'I want to get better at designing trustworthy agent workflows.', category: 'goal', status: 'accepted', evidenceIds: [], createdAt: '2026-08-09' },
  { id: 'memory-interest', text: 'I am especially interested in evidence, evaluation, and human approval patterns.', category: 'interest', status: 'accepted', evidenceIds: ['signal-evidence', 'signal-eval'], createdAt: '2026-08-09' },
  { id: 'memory-proposed', text: 'Consider community access as a possible project direction.', category: 'reflection', status: 'proposed', evidenceIds: ['signal-access'], createdAt: '2026-08-09' },
]
