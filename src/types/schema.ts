export type LessonType = 'code-editor' | 'terminal' | 'quiz' | 'chat-only'

export interface Lesson {
  id: number
  title: string
  type: LessonType
  startingState: string
  isLocked: boolean
}

export interface Course {
  id: string
  title: string
  description: string
  thumbnail: string
  totalLessons: number
  lessons: Lesson[]
}
