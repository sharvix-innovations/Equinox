import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import Topbar from './Topbar'

export default function DashboardLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="app-canvas min-h-screen lg:p-4 xl:p-5">
      <div className="mx-auto flex min-h-screen w-full max-w-[112rem] overflow-hidden bg-surface lg:h-[calc(100vh-2rem)] lg:min-h-0 lg:rounded-[28px] lg:border lg:border-white/60 lg:shadow-[0_30px_70px_-40px_rgba(16,51,30,0.4)] xl:h-[calc(100vh-2.5rem)]">
        <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar onMenu={() => setSidebarOpen(true)} />
          <main className="flex-1 overflow-y-auto bg-surface px-4 py-6 sm:px-6 lg:px-8">
            <Outlet />
          </main>
        </div>
      </div>
    </div>
  )
}
