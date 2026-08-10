import type { AppAction, AppState } from './storeTypes'

export function reduceAppState(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_USER_CONTEXT':
      return { ...state, userContext: { ...state.userContext, ...action.payload } }
    case 'ADD_TASK':
      return { ...state, tasks: [...state.tasks, action.task] }
    case 'UPDATE_TASK':
      return { ...state, tasks: state.tasks.map((task) => task.id === action.taskId ? { ...task, ...action.patch } : task) }
    case 'ADD_TASK_EVENT':
      return { ...state, tasks: state.tasks.map((task) => task.id === action.taskId ? { ...task, events: [...task.events, action.event] } : task) }
    case 'SET_MEMORY_STATUS':
      return { ...state, memory: state.memory.map((entry) => entry.id === action.memoryId ? { ...entry, status: action.status } : entry) }
    case 'SAVE_OPPORTUNITY':
      return { ...state, opportunities: state.opportunities.map((opportunity) => opportunity.id === action.opportunityId ? { ...opportunity, status: 'saved' } : opportunity) }
    case 'UPDATE_OPPORTUNITY':
      return { ...state, opportunities: state.opportunities.map((opportunity) => opportunity.id === action.opportunityId ? { ...opportunity, ...action.patch } : opportunity) }
    case 'SET_PLAN':
      return { ...state, plans: [...state.plans.filter((plan) => plan.id !== action.plan.id), action.plan] }
    case 'SET_REPORT':
      return { ...state, report: action.report }
  }
}
