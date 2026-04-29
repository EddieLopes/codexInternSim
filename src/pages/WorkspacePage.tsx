import { useMemo } from 'react'
import { useAppState } from '../state/appState'
import { WorkspaceRenderer } from '../components/WorkspaceRenderer'
import type { Lesson } from '../types/schema'

export function WorkspacePage() {
  const { state, dispatch } = useAppState()
  const course = state.courses.find((item) => item.id === state.activeCourseId) ?? state.courses[0]
  const completed = state.userProgress[course.id] ?? []
  const activeLesson = course.lessons.find((lesson) => lesson.id === state.activeLessonId) ?? course.lessons[0]

  const unlockThreshold = useMemo(() => {
    if (completed.length === 0) return course.lessons[0]?.id ?? 1
    return Math.max(...completed) + 1
  }, [completed, course.lessons])

  const canOpenLesson = (lesson: Lesson) => lesson.id <= unlockThreshold
  const isCompleted = (lesson: Lesson) => completed.includes(lesson.id)

  const currentProgress = Math.round((completed.length / course.totalLessons) * 100)

  return (
    <main className="grid min-h-[calc(100vh-73px)] gap-4 p-4 lg:grid-cols-[300px_1fr]">
      <aside className="panel overflow-auto">
        <div className="flex items-center gap-3">
          <div className="h-16 w-16 rounded-3xl bg-cover bg-center" style={{ backgroundImage: `url(${course.thumbnail})` }} />
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-cyan">Current course</p>
            <h2 className="text-2xl font-semibold">{course.title}</h2>
          </div>
        </div>

        <p className="muted mt-4">{course.description}</p>

        <div className="mt-6 rounded-3xl border border-border bg-[#0f172a] p-4">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Progress</span>
            <span>{currentProgress}%</span>
          </div>
          <div className="mt-3 h-2 rounded-full bg-slate-700">
            <div className="h-2 rounded-full bg-neon" style={{ width: `${currentProgress}%` }} />
          </div>
        </div>

        <div className="mt-6 space-y-2">
          {course.lessons.map((lesson) => {
            const unlocked = canOpenLesson(lesson)
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => unlocked && dispatch({ type: 'SET_ACTIVE_LESSON', payload: lesson.id })}
                className={`card w-full text-left ${unlocked ? 'hover:border-cyan' : 'opacity-60 cursor-not-allowed'}`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-semibold">{lesson.title}</p>
                    <p className="muted text-sm">{lesson.type.replace('-', ' ')}</p>
                  </div>
                  <span className="rounded-full border border-border px-2 py-1 text-xs uppercase text-slate-400">
                    {isCompleted(lesson) ? 'Done' : unlocked ? 'Open' : 'Locked'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      <section className="grid gap-4 grid-rows-[1fr_auto]">
        <WorkspaceRenderer
          lesson={activeLesson}
          completed={isCompleted(activeLesson)}
          onComplete={() => dispatch({ type: 'COMPLETE_LESSON', payload: activeLesson.id })}
        />

        <div className="panel grid gap-4">
          <div>
            <h3 className="text-xl font-semibold">Lesson summary</h3>
            <p className="muted mt-2">Follow the course flow from the sidebar and complete each lesson to unlock the next experience.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-border bg-[#0f172a] p-4">
              <p className="text-sm text-slate-400">Active lesson</p>
              <p className="mt-2 font-semibold">{activeLesson.title}</p>
            </div>
            <div className="rounded-3xl border border-border bg-[#0f172a] p-4">
              <p className="text-sm text-slate-400">Completed lessons</p>
              <p className="mt-2 font-semibold">{completed.length} / {course.totalLessons}</p>
            </div>
          </div>
        </div>
      </section>
    </main>
  )
}
