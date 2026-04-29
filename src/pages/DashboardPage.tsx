import { cards, courses } from '../mocks/data'

export function DashboardPage() {
  return (
    <main className="grid gap-4 p-4 lg:grid-cols-[260px_1fr_300px]">
      <aside className="panel">
        <h2 className="text-2xl font-semibold">Learn AI. Build Skills. Create Impact.</h2>
        <p className="muted mt-3">Practical courses, real projects, and expert guidance.</p>
        <button className="btn mt-5">Start Learning</button>
        <div className="mt-8">
          <p className="muted">Your Progress</p>
          <div className="mt-2 text-3xl font-bold text-cyan">72%</div>
        </div>
      </aside>

      <section className="panel">
        <input className="input" placeholder="Search courses, topics, skills..." />
        <h2 className="mt-6 text-4xl md:text-5xl font-bold">Master AI. Shape the Future.</h2>
        <div className="mt-6 grid gap-4 md:grid-cols-3">
          {cards.map((card) => (
            <article key={card.title} className="card">
              <h3 className="text-xl font-semibold">{card.title}</h3>
              <p className="muted mt-2">{card.desc}</p>
            </article>
          ))}
        </div>
      </section>

      <aside className="panel">
        <h3 className="text-2xl font-semibold">Daily Goal</h3>
        <p className="mt-2 text-4xl font-bold">45 min</p>
        <div className="mt-4 h-2 rounded bg-slate-700"><div className="h-2 w-3/4 rounded bg-neon" /></div>
        <h4 className="mt-8 text-xl font-semibold">Continue Learning</h4>
        <div className="mt-3 space-y-3">
          {courses.map((c) => (
            <div key={c.title} className="card">
              <p>{c.title}</p>
              <div className="mt-2 h-2 rounded bg-slate-700">
                <div className="h-2 rounded bg-cyan" style={{ width: `${c.progress}%` }} />
              </div>
            </div>
          ))}
        </div>
      </aside>
    </main>
  )
}
