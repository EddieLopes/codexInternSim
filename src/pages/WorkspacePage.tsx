import { chats } from '../mocks/data'

export function WorkspacePage() {
  return (
    <main className="grid h-[calc(100vh-73px)] p-4 gap-4 lg:grid-cols-[280px_1fr]">
      <aside className="panel overflow-auto">
        <button className="btn w-full">+ New Chat</button>
        <div className="mt-4 space-y-2">
          {chats.map((chat) => (
            <div key={chat} className="card">{chat}</div>
          ))}
        </div>
      </aside>

      <section className="grid gap-4 grid-rows-[1fr_220px]">
        <div className="panel">
          <div className="flex gap-2 text-sm">
            <span className="tab active">Dashboard.jsx</span>
            <span className="tab">styles.css</span>
          </div>
          <pre className="mt-4 text-slate-400">{`const modules = [
  { title: 'Prompting' },
  { title: 'Debugging' },
]`}</pre>
        </div>

        <div className="panel">
          <h3 className="text-lg font-semibold">AI Assistant / Terminal</h3>
          <p className="muted mt-2">Mock response stream for Phase 1 UI validation.</p>
          <input className="input mt-4" placeholder="Ask anything..." />
        </div>
      </section>
    </main>
  )
}
