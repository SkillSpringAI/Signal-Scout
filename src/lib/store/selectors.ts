import type { AppState } from './storeTypes'

export const selectDomain = (state: AppState) => state.domains.find((domain) => domain.id === state.activeDomainId) ?? state.domains[0]
export const selectPendingMemory = (state: AppState) => state.memory.filter((entry) => entry.status === 'proposed')
export const selectActivityTasks = (state: AppState) => [...state.tasks].reverse()
export const selectSavedOpportunities = (state: AppState) => state.opportunities.filter((opportunity) => opportunity.status === 'saved')
export const selectCompletedRoutes = (state: AppState) => state.tasks.filter((task) => task.status === 'completed').map((task) => task.route)
