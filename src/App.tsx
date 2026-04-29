import { NavLink, Navigate, Route, Routes } from 'react-router-dom'
import { DashboardPage } from './pages/DashboardPage'
import { WorkspacePage } from './pages/WorkspacePage'

export function App() {
  return (
    <div className="min-h-screen bg-bg text-slate-100">
      <header className="border-b border-border px-6 py-4 flex items-center justify-between">
        <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white">Intern Sim</h1>
        <nav className="flex gap-3 text-sm">
          <NavLink to="/dashboard" className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-neon text-white' : 'bg-panel'}`}>Dashboard</NavLink>
          <NavLink to="/workspace" className={({ isActive }) => `px-3 py-1 rounded ${isActive ? 'bg-cyan text-bg' : 'bg-panel'}`}>Workspace</NavLink>
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
