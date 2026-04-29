import { useNavigate } from 'react-router-dom'
import { ArrowRight, BookOpen, Box, BrainCircuit, ChartNoAxesColumnIncreasing, Code2, Rocket, Search, Sparkles } from 'lucide-react'
import { cards } from '../mocks/data'
import { useAppState } from '../state/appState'

const cardIcons = [BookOpen, Box, Rocket]
const courseIcons = [BrainCircuit, ChartNoAxesColumnIncreasing, Code2]

export function DashboardPage() {
  const { state, dispatch } = useAppState()
  const navigate = useNavigate()

  const courses = state.courses
  const heroProgress = Math.min(Math.round((courses[0]?.lessons.length ?? 0) * 20), 100)

  return (
    <main className="grid gap-4 p-4 sm:p-6 lg:grid-cols-[minmax(240px,280px)_1fr_minmax(280px,320px)] xl:gap-5">
      <aside className="panel flex min-h-[520px] flex-col justify-between overflow-hidden">
        <div>
          <div className="mb-12 flex items-center gap-3">
            <div className="grid h-12 w-12 place-items-center rounded-2xl bg-gradient-to-br from-neon to-[#fb7185] shadow-[0_0_28px_rgba(124,58,237,0.32)]">
              <Sparkles className="h-6 w-6 text-white" aria-hidden="true" />
            </div>
            <p className="text-lg font-semibold text-white">Intern Sim</p>
          </div>
          <h2 className="text-3xl font-bold leading-tight text-white">
            Learn <span className="text-neon">AI.</span><br />
            Build <span className="text-cyan">Skills.</span><br />
            Create <span className="text-[#fb7185]">Impact.</span>
          </h2>
          <p className="muted mt-6 max-w-[16rem] leading-7">Practical courses, real projects, and expert guidance to accelerate your AI career.</p>
          <button className="btn mt-8 w-full sm:w-auto">
            Start Learning
            <ArrowRight className="h-4 w-4" aria-hidden="true" />
          </button>
        </div>

        <div className="mt-12 border-t border-gray-800/80 pt-6">
          <p className="font-semibold text-white">Your Progress</p>
          <div
            className="mx-auto mt-6 grid h-36 w-36 place-items-center rounded-full"
            style={{ background: `conic-gradient(#38bdf8 0deg, #7c3aed ${heroProgress * 3.6}deg, rgba(30,41,59,0.9) ${heroProgress * 3.6}deg)` }}
          >
            <div className="grid h-28 w-28 place-items-center rounded-full bg-bg shadow-[inset_0_0_28px_rgba(0,0,0,0.45)]">
              <span className="text-3xl font-bold text-white">{heroProgress}%</span>
            </div>
          </div>
          <p className="muted mt-4 text-center text-sm">Course Progress</p>
        </div>
      </aside>

      <section className="panel overflow-hidden">
        <div className="relative">
          <Search className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-slate-400" aria-hidden="true" />
          <input className="input pl-12 pr-14" placeholder="Search courses, topics, skills..." />
          <div className="absolute right-2 top-1/2 grid h-10 w-10 -translate-y-1/2 place-items-center rounded-full bg-gradient-to-br from-neon to-[#fb7185] shadow-[0_0_24px_rgba(251,113,133,0.28)]">
            <Search className="h-4 w-4 text-white" aria-hidden="true" />
          </div>
        </div>
        <div className="mx-auto mt-12 max-w-3xl text-center">
          <h2 className="text-4xl font-bold leading-tight text-white md:text-6xl">
            Master <span className="text-neon">AI.</span><br />
            Shape the <span className="text-transparent bg-gradient-to-r from-neon via-cyan to-[#fb7185] bg-clip-text">Future.</span>
          </h2>
          <p className="muted mx-auto mt-5 max-w-xl text-lg leading-8">From fundamentals to advanced simulations, build the technical judgment employers expect.</p>
        </div>
        <div className="mx-auto mt-10 grid max-w-4xl gap-4 md:grid-cols-3">
          {cards.map((card, index) => {
            const Icon = cardIcons[index] ?? BookOpen
            return (
            <article key={card.title} className="card interactive-card min-h-40">
              <div className="grid h-12 w-12 place-items-center rounded-2xl border border-neon/30 bg-neon/15 text-neon shadow-[0_0_24px_rgba(124,58,237,0.18)]">
                <Icon className="h-6 w-6" aria-hidden="true" />
              </div>
              <h3 className="mt-5 text-xl font-semibold text-white">{card.title}</h3>
              <p className="muted mt-2 leading-6">{card.desc}</p>
            </article>
            )
          })}
        </div>
      </section>

      <aside className="panel">
        <div className="flex items-center justify-between">
          <h3 className="text-xl font-semibold text-white">Continue Learning</h3>
          <span className="text-slate-500">•••</span>
        </div>
        <div className="mt-5 space-y-4">
          {courses.map((course, index) => {
            const completed = state.userProgress[course.id]?.length ?? 0
            const progress = Math.round((completed / course.totalLessons) * 100)
            const Icon = courseIcons[index] ?? BrainCircuit
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => {
                  dispatch({ type: 'SET_ACTIVE_COURSE', payload: course.id })
                  navigate('/workspace')
                }}
                className="card interactive-card w-full text-left"
              >
                <div className="flex items-center gap-3">
                  <div className="grid h-14 w-14 shrink-0 place-items-center rounded-2xl border border-cyan/20 bg-cyan/10 text-cyan">
                    <Icon className="h-6 w-6" aria-hidden="true" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-semibold text-white">{course.title}</p>
                    <p className="muted text-sm">{progress}% complete</p>
                  </div>
                </div>
                <div className="progress-track mt-4">
                  <div className="progress-fill" style={{ width: `${progress}%` }} />
                </div>
              </button>
            )
          })}
        </div>
        <button className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-neon transition-all duration-200 ease-in-out hover:translate-x-1 hover:text-cyan">
          View all courses
          <ArrowRight className="h-4 w-4" aria-hidden="true" />
        </button>
      </aside>
    </main>
  )
}
