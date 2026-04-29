import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { Blocks, LayoutDashboard, MonitorPlay } from 'lucide-react'
import { DashboardPage } from './pages/DashboardPage'
import { WorkspacePage } from './pages/WorkspacePage'

export function App() {
  return (
    <div className="min-h-screen overflow-x-hidden bg-bg text-slate-100">
      <header className="sticky top-0 z-30 flex items-center justify-between border-b border-gray-800/80 bg-bg/80 px-4 py-3 backdrop-blur-xl sm:px-6">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 place-items-center rounded-2xl border border-neon/30 bg-gradient-to-br from-neon/30 to-cyan/10 shadow-[0_0_24px_rgba(124,58,237,0.22)]">
            <Blocks className="h-5 w-5 text-cyan" aria-hidden="true" />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-white md:text-2xl">Intern Sim</h1>
        </div>
        <nav className="flex gap-2 text-sm">
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 ease-in-out ${
                isActive
                  ? 'bg-neon/20 text-white shadow-[0_0_24px_rgba(124,58,237,0.24)] ring-1 ring-neon/40'
                  : 'bg-panel/60 text-slate-300 ring-1 ring-gray-800/80 hover:text-white hover:ring-cyan/40'
              }`
            }
          >
            <LayoutDashboard className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Dashboard</span>
          </NavLink>
          <NavLink
            to="/workspace"
            className={({ isActive }) =>
              `inline-flex items-center gap-2 rounded-xl px-3 py-2 transition-all duration-200 ease-in-out ${
                isActive
                  ? 'bg-cyan/20 text-white shadow-[0_0_24px_rgba(56,189,248,0.22)] ring-1 ring-cyan/40'
                  : 'bg-panel/60 text-slate-300 ring-1 ring-gray-800/80 hover:text-white hover:ring-cyan/40'
              }`
            }
          >
            <MonitorPlay className="h-4 w-4" aria-hidden="true" />
            <span className="hidden sm:inline">Workspace</span>
          </NavLink>
        </nav>
      </header>

      <Routes>
        <Route path="/dashboard" element={<DashboardPage />} />
        <Route path="/workspace" element={<WorkspacePage />} />
        <Route path="*" element={<Navigate to="/dashboard" replace />} />
      </Routes>
    </div>
  )
}
