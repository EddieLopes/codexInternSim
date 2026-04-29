import { useMemo, useState } from 'react'
import { CheckCircle2, Lock, Menu, PanelLeftClose, PlayCircle, Sparkles } from 'lucide-react'
import { useAppState } from '../state/appState'
import { WorkspaceRenderer } from '../components/WorkspaceRenderer'
import type { Lesson } from '../types/schema'

export function WorkspacePage() {
  const { state, dispatch } = useAppState()
  const [sidebarOpen, setSidebarOpen] = useState(false)
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
    <main className="min-h-[calc(100vh-65px)] p-4 sm:p-6">
      <div className="mb-4 flex items-center justify-between lg:hidden">
        <button
          type="button"
          onClick={() => setSidebarOpen((open) => !open)}
          className="inline-flex items-center gap-2 rounded-xl border border-gray-800 bg-panel/80 px-4 py-2 text-sm font-semibold text-white shadow-[0_0_22px_rgba(124,58,237,0.12)] transition-all duration-200 ease-in-out hover:border-cyan/50"
        >
          {sidebarOpen ? <PanelLeftClose className="h-4 w-4" aria-hidden="true" /> : <Menu className="h-4 w-4" aria-hidden="true" />}
          Lessons
        </button>
        <span className="eyebrow">Workspace</span>
      </div>

      <div className="grid gap-4 lg:grid-cols-[320px_1fr]">
      <aside className={`panel max-h-[calc(100vh-112px)] overflow-auto ${sidebarOpen ? 'block' : 'hidden lg:block'}`}>
        <div className="flex items-center gap-3">
          <div className="grid h-16 w-16 shrink-0 place-items-center rounded-3xl border border-neon/30 bg-gradient-to-br from-neon/25 to-cyan/10 shadow-[0_0_26px_rgba(124,58,237,0.20)]">
            <Sparkles className="h-7 w-7 text-cyan" aria-hidden="true" />
          </div>
          <div className="min-w-0">
            <p className="eyebrow">Current course</p>
            <h2 className="mt-1 text-2xl font-semibold leading-tight text-white">{course.title}</h2>
          </div>
        </div>

        <p className="muted mt-4 leading-7">{course.description}</p>

        <div className="mt-6 rounded-3xl border border-gray-800/90 bg-[#0f172a]/70 p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.03)]">
          <div className="flex items-center justify-between text-sm text-slate-400">
            <span>Progress</span>
            <span className="font-semibold text-white">{currentProgress}%</span>
          </div>
          <div className="progress-track mt-3">
            <div className="progress-fill" style={{ width: `${currentProgress}%` }} />
          </div>
        </div>

        <div className="mt-6 space-y-3">
          {course.lessons.map((lesson) => {
            const unlocked = canOpenLesson(lesson)
            const active = lesson.id === activeLesson.id
            return (
              <button
                key={lesson.id}
                type="button"
                onClick={() => {
                  if (!unlocked) return
                  dispatch({ type: 'SET_ACTIVE_LESSON', payload: lesson.id })
                  setSidebarOpen(false)
                }}
                className={`card relative w-full overflow-hidden text-left ${
                  active
                    ? 'border-cyan/70 bg-cyan/10 pl-5 shadow-[0_0_30px_rgba(56,189,248,0.14)] before:absolute before:left-0 before:top-3 before:h-[calc(100%-1.5rem)] before:w-1 before:rounded-r-full before:bg-gradient-to-b before:from-cyan before:to-neon'
                    : unlocked
                      ? 'interactive-card'
                      : 'cursor-not-allowed opacity-50'
                }`}
              >
                <div className="flex items-center justify-between gap-3">
                  <div className="min-w-0">
                    <p className="font-semibold text-white">{lesson.title}</p>
                    <p className="muted text-sm">{lesson.type.replace('-', ' ')}</p>
                  </div>
                  <span className={`inline-flex items-center gap-1 rounded-full border px-2 py-1 text-xs uppercase ${
                    isCompleted(lesson)
                      ? 'border-emerald-400/30 bg-emerald-400/10 text-emerald-300'
                      : unlocked
                        ? 'border-cyan/30 bg-cyan/10 text-cyan'
                        : 'border-slate-700 bg-slate-900 text-slate-500'
                  }`}>
                    {isCompleted(lesson) ? <CheckCircle2 className="h-3 w-3" aria-hidden="true" /> : unlocked ? <PlayCircle className="h-3 w-3" aria-hidden="true" /> : <Lock className="h-3 w-3" aria-hidden="true" />}
                    {isCompleted(lesson) ? 'Done' : unlocked ? 'Open' : 'Locked'}
                  </span>
                </div>
              </button>
            )
          })}
        </div>
      </aside>

      <section className="grid gap-4 lg:grid-rows-[1fr_auto]">
        <WorkspaceRenderer
          lesson={activeLesson}
          completed={isCompleted(activeLesson)}
          onComplete={() => dispatch({ type: 'COMPLETE_LESSON', payload: activeLesson.id })}
        />

        <div className="panel grid gap-4">
          <div>
            <h3 className="text-xl font-semibold text-white">Lesson summary</h3>
            <p className="muted mt-2 leading-7">Follow the course flow from the sidebar and complete each lesson to unlock the next experience.</p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-800/90 bg-[#0f172a]/70 p-4">
              <p className="text-sm text-slate-400">Active lesson</p>
              <p className="mt-2 font-semibold text-white">{activeLesson.title}</p>
            </div>
            <div className="rounded-3xl border border-gray-800/90 bg-[#0f172a]/70 p-4">
              <p className="text-sm text-slate-400">Completed lessons</p>
              <p className="mt-2 font-semibold text-white">{completed.length} / {course.totalLessons}</p>
            </div>
          </div>
        </div>
      </section>
      </div>
    </main>
  )
}
