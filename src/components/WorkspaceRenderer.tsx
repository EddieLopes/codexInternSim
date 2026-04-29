import { FormEvent, useState } from 'react'
import type { Lesson } from '../types/schema'
import { CheckCircle2, Play, Send, Terminal, WandSparkles } from 'lucide-react'
import { generateMentorResponse } from '../lib/gemini'

interface WorkspaceRendererProps {
  lesson: Lesson
  completed: boolean
  onComplete: () => void
}

type ChatMessage = {
  role: 'user' | 'ai'
  content: string
}

export function WorkspaceRenderer({ lesson, completed, onComplete }: WorkspaceRendererProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [chatInput, setChatInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState('')

  const defaultMessages: ChatMessage[] = [
    {
      role: 'ai',
      content: 'The next step is to confirm your workspace flow and ask for feedback.',
    },
    {
      role: 'user',
      content: lesson.startingState,
    },
  ]
  const visibleMessages = messages.length > 0 ? messages : defaultMessages

  const handleMentorSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    const prompt = chatInput.trim()
    if (!prompt || isLoading) return

    const userMessage: ChatMessage = { role: 'user', content: prompt }
    setMessages((current) => [...current, userMessage])
    setChatInput('')
    setError('')
    setIsLoading(true)

    try {
      const response = await generateMentorResponse(prompt)
      setMessages((current) => [...current, { role: 'ai', content: response }])
    } catch (err) {
      const message = err instanceof Error ? err.message : 'AI mentor is unavailable right now. Please try again.'
      setError(message)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="panel flex h-full min-h-[520px] flex-col gap-4">
      <div className="flex flex-col gap-4 border-b border-gray-800/80 pb-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <p className="eyebrow">Lesson type</p>
          <h2 className="mt-1 text-2xl font-semibold text-white">{lesson.title}</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="rounded-full border border-gray-800/90 bg-[#111827]/80 px-3 py-1 text-xs uppercase tracking-[0.18em] text-slate-300">
            {lesson.type.replace('-', ' ')}
          </span>
          <button className="btn px-3 py-2 text-sm">
            <Play className="h-4 w-4" aria-hidden="true" />
            Run Code
          </button>
        </div>
      </div>

      {lesson.type === 'code-editor' && (
        <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="overflow-hidden rounded-3xl border border-gray-800/90 bg-[#080d18]/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
            <div className="flex items-center justify-between border-b border-gray-800/80 px-4 py-3">
              <div className="flex items-center gap-2 text-sm font-semibold text-white">
                <WandSparkles className="h-4 w-4 text-cyan" aria-hidden="true" />
                Workspace.jsx
              </div>
              <div className="flex gap-1">
                <span className="h-2 w-2 rounded-full bg-[#fb7185]" />
                <span className="h-2 w-2 rounded-full bg-neon" />
                <span className="h-2 w-2 rounded-full bg-cyan" />
              </div>
            </div>
            <textarea
              className="h-[380px] w-full resize-none bg-transparent p-5 font-mono text-sm leading-7 text-slate-200 outline-none selection:bg-neon/30"
              value={lesson.startingState}
              readOnly
            />
          </div>
          <div className="rounded-3xl border border-gray-800/90 bg-[#0f172a]/70 p-5">
            <div className="mb-5 flex items-center gap-3">
              <div className="grid h-11 w-11 place-items-center rounded-full border border-neon/40 bg-neon/15 shadow-[0_0_26px_rgba(124,58,237,0.26)]">
                <WandSparkles className="h-5 w-5 text-cyan" aria-hidden="true" />
              </div>
              <div>
                <p className="font-semibold text-white">AI Assistant</p>
                <p className="text-sm text-slate-400">Ready to review your next step.</p>
              </div>
            </div>
            <p className="leading-7 text-slate-300">Use the lesson workspace to inspect the starter state, then mark the lesson complete when the simulation objective is clear.</p>
            {messages.length > 0 && (
              <div className="mt-5 max-h-56 space-y-3 overflow-auto">
                {messages.map((message, index) => (
                  <div
                    key={`${message.role}-${index}`}
                    className={`rounded-3xl border p-4 text-sm ${
                      message.role === 'ai'
                        ? 'border-neon/20 bg-[#121d37]/90 text-slate-200'
                        : 'border-gray-800 bg-[#0f172a]/80 text-slate-300'
                    }`}
                  >
                    {message.role === 'ai' ? 'AI Mentor: ' : 'You: '}
                    {message.content}
                  </div>
                ))}
              </div>
            )}
            {isLoading && <p className="mt-3 text-sm text-slate-400">AI mentor is thinking...</p>}
            {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
            <form onSubmit={handleMentorSubmit} className="mt-6 flex items-center gap-2 rounded-2xl border border-gray-800 bg-bg/70 p-2">
              <input
                className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-500"
                placeholder="Ask for a hint..."
                value={chatInput}
                onChange={(event) => setChatInput(event.target.value)}
                disabled={isLoading}
              />
              <button
                type="submit"
                disabled={isLoading}
                className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-neon text-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0_0_22px_rgba(124,58,237,0.36)] disabled:cursor-not-allowed disabled:opacity-60"
              >
                <Send className="h-4 w-4" aria-hidden="true" />
              </button>
            </form>
          </div>
        </div>
      )}

      {lesson.type === 'terminal' && (
        <div className="flex-1 rounded-3xl border border-gray-800/90 bg-[#08121f]/90 p-5 text-sm text-slate-300 shadow-[inset_0_1px_0_rgba(255,255,255,0.04)]">
          <div className="mb-4 flex items-center gap-2 font-semibold text-cyan">
            <Terminal className="h-4 w-4" aria-hidden="true" />
            Terminal Preview
          </div>
          <pre className="whitespace-pre-wrap">{lesson.startingState}</pre>
          <div className="mt-4 rounded-2xl border border-gray-800 bg-[#0f182b]/80 p-3 text-slate-400">$ Use the terminal to install dependencies and start your workspace.</div>
        </div>
      )}

      {lesson.type === 'quiz' && (
        <div className="flex-1 space-y-4 rounded-3xl border border-gray-800/90 bg-[#0a1320]/80 p-6">
          <p className="text-slate-300">{lesson.startingState}</p>
          <div className="space-y-3">
            <label className="flex items-center gap-3 rounded-2xl border border-gray-800/90 bg-[#0f172a]/80 p-4 transition-all duration-200 ease-in-out hover:border-cyan/50">
              <input type="radio" name="quiz" value="a" />
              <span>Dark Matter visuals should feel deep, modern, and polished.</span>
            </label>
            <label className="flex items-center gap-3 rounded-2xl border border-gray-800/90 bg-[#0f172a]/80 p-4 transition-all duration-200 ease-in-out hover:border-cyan/50">
              <input type="radio" name="quiz" value="b" />
              <span>Use bright gradients and maximal motion for the core interface.</span>
            </label>
          </div>
        </div>
      )}

      {lesson.type === 'chat-only' && (
        <div className="flex-1 space-y-4 rounded-3xl border border-gray-800/90 bg-[#0b1624]/80 p-6">
          <div className="space-y-3">
            {visibleMessages.map((message, index) => (
              <div
                key={`${message.role}-${index}`}
                className={`rounded-3xl border p-4 ${
                  message.role === 'ai'
                    ? 'border-neon/20 bg-[#121d37]/90 text-slate-200'
                    : 'border-gray-800 bg-[#0f172a]/80 text-slate-300'
                }`}
              >
                {message.role === 'ai' ? 'AI Mentor: ' : 'You: '}
                {message.content}
              </div>
            ))}
          </div>
          {isLoading && <p className="text-sm text-slate-400">AI mentor is thinking...</p>}
          {error && <p className="text-sm text-red-300">{error}</p>}
          <form onSubmit={handleMentorSubmit} className="flex items-center gap-2 rounded-2xl border border-gray-800 bg-bg/70 p-2">
            <input
              className="min-w-0 flex-1 bg-transparent px-3 py-2 text-sm text-slate-200 outline-none placeholder:text-slate-500"
              placeholder="Type a question for the AI mentor..."
              value={chatInput}
              onChange={(event) => setChatInput(event.target.value)}
              disabled={isLoading}
            />
            <button
              type="submit"
              disabled={isLoading}
              className="grid h-9 w-9 shrink-0 place-items-center rounded-xl bg-neon text-white transition-all duration-200 ease-in-out hover:scale-105 hover:shadow-[0_0_22px_rgba(124,58,237,0.36)] disabled:cursor-not-allowed disabled:opacity-60"
            >
              <Send className="h-4 w-4" aria-hidden="true" />
            </button>
          </form>
        </div>
      )}

      <div className="mt-auto flex flex-col gap-3 border-t border-gray-800/80 pt-4 sm:flex-row sm:items-center sm:justify-between">
        <span className="inline-flex items-center gap-2 text-slate-400">
          <CheckCircle2 className={`h-4 w-4 ${completed ? 'text-emerald-300' : 'text-slate-500'}`} aria-hidden="true" />
          Lesson status: {completed ? 'Completed' : 'In progress'}
        </span>
        <button
          type="button"
          className="btn px-5 py-2"
          onClick={onComplete}
          disabled={completed}
        >
          {completed ? 'Completed' : 'Mark Complete'}
        </button>
      </div>
    </div>
  )
}
