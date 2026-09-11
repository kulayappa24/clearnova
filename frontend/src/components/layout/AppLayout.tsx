import React from 'react'
import { Outlet, useLocation, Link } from 'react-router-dom'
import { Sidebar } from './Sidebar'
import { Bell, Search, Globe, User, Sparkles, Leaf } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { LlmAssistantModal } from '@/components/common/LlmAssistantModal'

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

export const AppLayout: React.FC = () => {
  const location = useLocation()
  const { user } = useAuth()
  const title = pageTitles[location.pathname] || 'ClearNova Platform'

  return (
    <div className="flex h-screen bg-[#f3f6f5] text-slate-900 overflow-hidden font-sans select-none">
      <Sidebar />
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        {/* Top Header Navbar (Matching Uploaded Mockup Photo) */}
        <header className="h-16 bg-white border-b border-[#e2ece8] px-8 flex items-center justify-between shrink-0 z-10 shadow-xs">
          {/* Search Bar (Center Piece of Mockup) */}
          <div className="flex-1 max-w-xl relative">
            <Search className="w-4 h-4 absolute left-3.5 top-3 text-slate-400" />
            <input
              type="text"
              placeholder="Search for waste info, green tips, or nearby facilities..."
              className="w-full bg-[#f8faf9] text-xs text-slate-800 pl-10 pr-4 py-2.5 rounded-full border border-[#d6e5df] focus:outline-none focus:border-[#059669] placeholder:text-slate-400 font-medium transition-all"
            />
          </div>

          {/* Right Header Controls */}
          <div className="flex items-center gap-4">
            <Link
              to="/ai-detection"
              className="hidden sm:flex items-center gap-1.5 px-3.5 py-1.5 bg-[#ecfdf5] text-[#047857] border border-[#a7f3d0] rounded-full text-xs font-bold hover:bg-[#d1fae5] transition-colors"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#059669]" />
              <span>AI Classifier</span>
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

            {/* Language Selector Pill */}
            <div className="hidden md:flex items-center gap-1 px-3 py-1 bg-[#f3f6f5] border border-[#d6e5df] rounded-full text-xs font-bold text-slate-700 cursor-pointer">
              <span>EN</span>
              <span className="text-[10px] text-slate-400">▼</span>
            </div>

            {/* User Profile Header Badge (Matching Srinu in Mockup) */}
            {user && (
              <div className="flex items-center gap-2.5 pl-2">
                <div className="w-9 h-9 rounded-full bg-[#059669] text-white flex items-center justify-center font-bold text-xs shadow-sm border border-[#047857]">
                  {user.fullName ? user.fullName[0].toUpperCase() : 'S'}
                </div>
                <div className="hidden sm:block text-left">
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
        <main className="flex-1 overflow-y-auto p-8 bg-[#f3f6f5]">
          <Outlet />
        </main>
      </div>

      {/* Floating Interactive LLM EcoBot AI Assistant */}
      <LlmAssistantModal />
    </div>
  )
}
