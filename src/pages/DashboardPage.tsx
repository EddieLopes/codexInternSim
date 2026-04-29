import { useNavigate } from 'react-router-dom'
import { cards } from '../mocks/data'
import { useAppState } from '../state/appState'

export function DashboardPage() {
  const { state, dispatch } = useAppState()
  const navigate = useNavigate()

  const courses = state.courses

  return (
    <main className="grid gap-4 p-4 lg:grid-cols-[280px_1fr_320px]">
      <aside className="panel">
        <h2 className="text-2xl font-semibold">Learn AI. Build Skills. Create Impact.</h2>
        <p className="muted mt-3">Practical courses, real projects, and expert guidance.</p>
        <button className="btn mt-5">Start Learning</button>
        <div className="mt-8">
          <p className="muted">Your Progress</p>
          <div className="mt-2 text-3xl font-bold text-cyan">{Math.round((courses[0]?.lessons.length ?? 0) * 20)}%</div>
        </div>
      </aside>

      <section className="panel">
        <input className="input" placeholder="Search courses, topics, skills..." />
        <h2 className="mt-6 text-4xl md:text-5xl font-bold">Master AI. Shape the Future.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-2 xl:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="card">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="muted mt-2">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="panel">
        <h3 className="text-2xl font-semibold">Available Courses</h3>
        <div className="mt-4 space-y-4">
          {courses.map((course) => {
            const completed = state.userProgress[course.id]?.length ?? 0
            const progress = Math.round((completed / course.totalLessons) * 100)
            return (
              <button
                key={course.id}
                type="button"
                onClick={() => {
                  dispatch({ type: 'SET_ACTIVE_COURSE', payload: course.id })
                  navigate('/workspace')
                }}
                className="card w-full text-left hover:border-cyan"
              >
                <div className="flex items-center gap-3">
                  <div className="h-14 w-14 rounded-3xl bg-slate-900 bg-cover bg-center" style={{ backgroundImage: `url(${course.thumbnail})` }} />
                  <div>
                    <p className="font-semibold">{course.title}</p>
                    <p className="muted text-sm">{progress}% complete</p>
                  </div>
                </div>
                <div className="mt-3 h-2 rounded-full bg-slate-700">
                  <div className="h-2 rounded-full bg-cyan" style={{ width: `${progress}%` }} />
                </div>
              </button>
            )
          })}
        </div>
      </aside>
    </main>
  )
}
