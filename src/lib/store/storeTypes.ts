import type { ActivityTask, ApprovalRequest, FieldReport, MemoryEntry, Opportunity, Plan } from '../../../shared/types'
import type { SeedDataset } from '../../data/seed'

export interface UserContext {
  interests: string
  projectIdea: string
  networkingIntent: string
  timeAvailable: string
}

export interface AppState extends SeedDataset {
  activeDomainId: string
  userContext: UserContext
  tasks: ActivityTask[]
  approvals: ApprovalRequest[]
  plans: Plan[]
  report?: FieldReport
}

export type AppAction =
  | { type: 'SET_USER_CONTEXT'; payload: Partial<UserContext> }
  | { type: 'ADD_TASK'; task: ActivityTask }
  | { type: 'UPDATE_TASK'; taskId: string; patch: Partial<Pick<ActivityTask, 'status' | 'outputIds' | 'sourceIds'>> }
  | { type: 'ADD_TASK_EVENT'; taskId: string; event: ActivityTask['events'][number] }
  | { type: 'SET_MEMORY_STATUS'; memoryId: string; status: MemoryEntry['status'] }
  | { type: 'SAVE_OPPORTUNITY'; opportunityId: string }
  | { type: 'UPDATE_OPPORTUNITY'; opportunityId: string; patch: Partial<Pick<Opportunity, 'explanation' | 'whyNow' | 'confidence'>> }
  | { type: 'SET_PLAN'; plan: Plan }
  | { type: 'SET_REPORT'; report: FieldReport }

export interface AppStore {
  getState(): AppState
  dispatch(action: AppAction): void
  subscribe(listener: () => void): () => void
}
