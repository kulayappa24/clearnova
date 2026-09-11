import React, { useState } from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Bell, Search, Sparkles, Menu, Home, Trash2, Map, Trophy, Settings } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { LlmAssistantModal } from '@/components/common/LlmAssistantModal'
import { cn } from '@/lib/utils'

const pageTitles: Record<string, string> = {
  '/dashboard': 'Clean Cities • Green Future',
  '/bins': 'Smart Waste Bins Network',
  '/ai-detection': 'AI Waste Classifier Scanner',
  '/map': 'Find Nearby Facilities & Live GIS Grid',
  '/complaints': 'Sanitization Desk & Priority Tickets',
  '/analytics': 'Impact Analytics & Eco Insights',
  '/workers': 'Sanitation Workers Directory',
  '/collections': 'Collection Queues & Optimization',
  '/routes': 'TSP Route Optimizer (Green Solutions)',
  '/disposal': 'Waste Recycling & Facility Tracking',
  '/notifications': 'Alerts & System Notifications',
  '/settings': 'Platform Configurations',
  '/leaderboard': 'Green Points & Leaderboard',
}

const mobileBottomNavItems = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'AI Scanner', path: '/ai-detection', icon: Trash2 },
  { label: 'Live Map', path: '/map', icon: Map },
  { label: 'Leaderboard', path: '/leaderboard', icon: Trophy },
  { label: 'Settings', path: '/settings', icon: Settings },
]

export const AppLayout: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()
  const [isMobileOpen, setIsMobileOpen] = useState(false)
  const title = pageTitles[location.pathname] || 'ClearNova Platform'

  return (
    <div className="flex h-screen bg-[#f3f6f5] text-slate-900 overflow-hidden font-sans select-none relative">
      {/* Sidebar with mobile drawer support */}
      <Sidebar isMobileOpen={isMobileOpen} onClose={() => setIsMobileOpen(false)} />

      <div className="flex-1 flex flex-col min-w-0 overflow-hidden pb-16 lg:pb-0">
        {/* Top Header Navbar */}
        <header className="h-16 bg-white border-b border-[#e2ece8] px-4 sm:px-8 flex items-center justify-between shrink-0 z-10 shadow-xs gap-3">
          {/* Hamburger Menu Toggle (Mobile Only) */}
          <button
            onClick={() => setIsMobileOpen(true)}
            className="lg:hidden p-2 text-slate-700 hover:text-emerald-700 hover:bg-[#f3f6f5] rounded-xl border border-slate-200 shrink-0 transition-colors"
            aria-label="Open Navigation Menu"
          >
            <Menu className="w-5 h-5" />
          </button>

          {/* Mobile Brand Title (Small Screens Only) */}
          <div className="flex items-center gap-2 sm:hidden shrink-0">
            <img src="/logo.svg" alt="ClearNova Logo" className="w-7 h-7 object-contain" />
            <span className="font-extrabold text-sm text-slate-900 tracking-tight">ClearNova</span>
          </div>

          {/* Search Bar (Desktop & Tablet) */}
          <div className="flex-1 max-w-xl relative hidden sm:block">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search waste info, green tips, facilities..."
              className="w-full bg-[#f8faf9] text-xs text-slate-800 pl-10 pr-4 py-2.5 rounded-full border border-[#d6e5df] focus:outline-none focus:border-[#059669] placeholder:text-slate-400 font-medium transition-all"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-2 sm:gap-4 ml-auto">
            <Link
              to="/ai-detection"
              className="flex items-center gap-1.5 px-3 py-1.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] rounded-full text-xs font-bold hover:bg-[#d1fae5] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span className="hidden sm:inline">AI Classifier</span>
              <span className="sm:hidden">AI</span>
            </Link>

            {/* Notification Bell */}
            <Link
              to="/notifications"
              className="p-2 text-slate-600 hover:text-slate-900 bg-[#f3f6f5] hover:bg-[#e2ece8] border border-[#d6e5df] rounded-full relative transition-colors"
              title="Notifications"
            >
              <Bell className="w-4 h-4" />
              <span className="absolute top-1 right-1 w-2 h-2 bg-[#059669] rounded-full animate-pulse" />
            </Link>

            {/* User Profile Badge */}
            {user && (
              <div className="flex items-center gap-2 pl-1">
                <div className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-[#047857]">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'S'}
                </div>
                <div className="hidden md:block text-left">
                  <div className="text-xs font-extrabold text-slate-900">
                    Hi, {user.fullName ? user.fullName.split(' ')[0] : 'Srinu'}!
                  </div>
                  <div className="text-[10px] text-[#059669] font-semibold">Make an impact</div>
                </div>
              </div>
            )}
          </div>
        </header>

        {/* Page Content Viewport */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-8 bg-[#f3f6f5]">
          <Outlet />
        </main>
      </div>

      {/* Mobile Bottom Navigation Bar (Phone Native UI) */}
      <div className="fixed bottom-0 left-0 right-0 h-16 bg-white border-t border-[#e2ece8] flex items-center justify-around z-30 lg:hidden shadow-lg px-2">
        {mobileBottomNavItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex flex-col items-center justify-center gap-0.5 py-1 px-3 rounded-xl transition-all',
                isActive ? 'text-[#059669] font-extrabold scale-105' : 'text-slate-500 font-medium hover:text-slate-800'
              )}
            >
              <Icon className={cn('w-5 h-5', isActive ? 'text-[#059669]' : 'text-slate-400')} />
              <span className="text-[10px] tracking-tight">{item.label}</span>
            </Link>
          )
        })}
      </div>

      {/* Floating Interactive LLM EcoBot AI Assistant */}
      <LlmAssistantModal />
    </div>
  )
}
