import { createContext, useContext, useReducer, type Dispatch, type ReactNode } from 'react'
import { dummyCourse } from '../mocks/dummyData'
import type { Course } from '../types/schema'

interface AppState {
  courses: Course[]
  activeCourseId: string | null
  activeLessonId: number | null
  userProgress: Record<string, number[]>
}

type AppAction =
  | { type: 'SET_ACTIVE_COURSE'; payload: string }
  | { type: 'SET_ACTIVE_LESSON'; payload: number }
  | { type: 'COMPLETE_LESSON'; payload: number }

const initialState: AppState = {
  courses: [dummyCourse],
  activeCourseId: null,
  activeLessonId: null,
  userProgress: {},
}

function getFirstLessonId(course: Course) {
  return course.lessons[0]?.id ?? null
}

function reducer(state: AppState, action: AppAction): AppState {
  switch (action.type) {
    case 'SET_ACTIVE_COURSE': {
      const course = state.courses.find((item) => item.id === action.payload)
      if (!course) return state
      return {
        ...state,
        activeCourseId: course.id,
        activeLessonId: getFirstLessonId(course),
      }
    }
    case 'SET_ACTIVE_LESSON':
      return {
        ...state,
        activeLessonId: action.payload,
      }
    case 'COMPLETE_LESSON': {
      if (!state.activeCourseId) return state
      const completed = state.userProgress[state.activeCourseId] ?? []
      const alreadyDone = completed.includes(action.payload)
      if (alreadyDone) return state

      return {
        ...state,
        userProgress: {
          ...state.userProgress,
          [state.activeCourseId]: [...completed, action.payload],
        },
      }
    }
    default:
      return state
  }
}

const AppStateContext = createContext<{
  state: AppState
  dispatch: Dispatch<AppAction>
} | null>(null)

export function AppStateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState)

  return <AppStateContext.Provider value={{ state, dispatch }}>{children}</AppStateContext.Provider>
}

export function useAppState() {
  const context = useContext(AppStateContext)
  if (!context) {
    throw new Error('useAppState must be used within AppStateProvider')
  }
  return context
}
