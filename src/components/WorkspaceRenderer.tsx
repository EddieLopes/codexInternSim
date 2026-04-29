import type { Lesson } from '../types/schema'

interface WorkspaceRendererProps {
  lesson: Lesson
  completed: boolean
  onComplete: () => void
}

export function WorkspaceRenderer({ lesson, completed, onComplete }: WorkspaceRendererProps) {
  return (
    <div className="panel h-full flex flex-col gap-4">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-sm uppercase tracking-[0.2em] text-cyan">Lesson type</p>
          <h2 className="text-2xl font-semibold mt-1">{lesson.title}</h2>
        </div>
        <span className="rounded-full border border-border bg-[#111827] px-3 py-1 text-xs uppercase tracking-[0.2em] text-slate-300">
          {lesson.type.replace('-', ' ')}
        </span>
      </div>

      {lesson.type === 'code-editor' && (
        <textarea
          className="h-[320px] w-full rounded-3xl border border-border bg-[#0e1627] p-4 font-mono text-sm leading-6 text-slate-200"
          value={lesson.startingState}
          readOnly
        />
      )}

      {lesson.type === 'terminal' && (
        <div className="rounded-3xl border border-border bg-[#08121f] p-4 text-sm text-slate-300">
          <div className="mb-4 font-semibold text-cyan">Terminal Preview</div>
          <pre className="whitespace-pre-wrap">{lesson.startingState}</pre>
          <div className="mt-4 rounded-xl bg-[#0f182b] p-3 text-slate-400">$ Use the terminal to install dependencies and start your workspace.</div>
        </div>
      )}

      {lesson.type === 'quiz' && (
        <div className="space-y-4 rounded-3xl border border-border bg-[#0a1320] p-6">
          <p className="text-slate-300">{lesson.startingState}</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-xl border border-border bg-[#0f172a] p-3">
              <input type="radio" name="quiz" value="a" />
              <span>Dark Matter visuals should feel deep, modern, and polished.</span>
            </label>
            <label className="flex items-center gap-3 rounded-xl border border-border bg-[#0f172a] p-3">
              <input type="radio" name="quiz" value="b" />
              <span>Use bright gradients and maximal motion for the core interface.</span>
            </label>
          </div>
        </div>
      )}

      {lesson.type === 'chat-only' && (
        <div className="space-y-4 rounded-3xl border border-border bg-[#0b1624] p-6">
          <div className="space-y-3">
            <div className="rounded-3xl bg-[#121d37] p-4 text-slate-200">AI Mentor: The next step is to confirm your workspace flow and ask for feedback.</div>
            <div className="rounded-3xl bg-[#0f172a] p-4 text-slate-300">You: {lesson.startingState}</div>
          </div>
          <input className="input w-full" placeholder="Type a question for the AI mentor..." />
        </div>
      )}

      <div className="mt-auto flex items-center justify-between gap-3">
        <span className="text-slate-400">Lesson status: {completed ? 'Completed' : 'In progress'}</span>
        <button
          type="button"
          className="btn rounded-xl px-5 py-2"
          onClick={onComplete}
          disabled={completed}
        >
          {completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  )
}
