import React from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home,
  LayoutDashboard, 
  Trash2, 
  Sparkles, 
  Map, 
  MessageSquareWarning, 
  BarChart3, 
  Users, 
  Truck, 
  Route, 
  Recycle, 
  Settings, 
  LogOut,
  Leaf,
  Trophy,
  ShieldCheck,
  Zap,
  BookOpen,
  Heart,
  UserCheck,
  Globe
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { cn } from '@/lib/utils'

interface NavItem {
  label: string
  path: string
  icon: React.ElementType
  badge?: string
}

const mainNavItems: NavItem[] = [
  { label: 'Home', path: '/dashboard', icon: Home },
  { label: 'Waste Segregation', path: '/ai-detection', icon: Trash2, badge: 'AI ML' },
  { label: 'Live GIS Map', path: '/map', icon: Map },
  { label: 'Sanitization Tickets', path: '/complaints', icon: MessageSquareWarning },
  { label: 'Green Solutions', path: '/routes', icon: Route },
  { label: 'Waste Analytics', path: '/analytics', icon: BarChart3 },
  { label: 'Green Leaderboard', path: '/leaderboard', icon: Trophy, badge: 'SWM 2026' },
  { label: 'Disposal & Facility', path: '/disposal', icon: Recycle },
  { label: 'System Settings', path: '/settings', icon: Settings },
]

export const Sidebar: React.FC = () => {
  const location = useLocation()
  const { user, logout } = useAuth()

  return (
    <aside className="w-64 bg-[#062319] text-[#e2f1eb] flex flex-col h-screen shrink-0 select-none z-20 shadow-xl border-r border-[#0d402e]">
      {/* Brand Header */}
      <div className="h-20 flex items-center px-6 gap-3 border-b border-[#0d402e]">
        <div className="w-10 h-10 rounded-xl bg-[#0e4d37] border border-[#1ab882]/40 flex items-center justify-center text-[#10b981] shadow-md shrink-0">
          <Leaf className="w-6 h-6 text-[#10b981] animate-pulse" />
        </div>
        <div>
          <h1 className="font-extrabold text-xl tracking-tight text-white flex items-center gap-1">
            <span>ClearNova</span>
          </h1>
          <p className="text-[10px] text-[#7ec2a6] font-mono tracking-wider">Clean Today • Green Tomorrow</p>
        </div>
      </div>

      {/* Nav List */}
      <div className="flex-1 overflow-y-auto py-5 px-4 space-y-1.5">
        {mainNavItems.map((item) => {
          const isActive = location.pathname === item.path || (item.path !== '/' && location.pathname.startsWith(item.path))
          const Icon = item.icon
          return (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                'flex items-center justify-between px-4 py-3 rounded-xl text-xs font-bold transition-all duration-200 group',
                isActive
                  ? 'bg-[#0e4d37] text-white shadow-md border border-[#1ab882]/30 scale-[1.02]'
                  : 'text-[#a8d5c3] hover:bg-[#0b3325] hover:text-white hover:translate-x-1'
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn('w-4 h-4 transition-transform group-hover:scale-110', isActive ? 'text-[#10b981]' : 'text-[#6cb898]')} />
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={cn(
                  'text-[9px] font-mono px-2 py-0.5 rounded-full font-bold',
                  isActive ? 'bg-[#10b981] text-[#062319]' : 'bg-[#0d402e] text-[#10b981] border border-[#1ab882]/20'
                )}>
                  {item.badge}
                </span>
              )}
            </Link>
          )
        })}
      </div>

      {/* Sidebar Bottom Promo Banner (Matching Mockup Photo) */}
      <div className="mx-4 mb-4 p-4 rounded-2xl bg-gradient-to-br from-[#0c3828] to-[#062319] border border-[#1ab882]/30 text-xs text-white space-y-2 relative overflow-hidden shadow-lg">
        <div className="flex items-center gap-2 text-[#10b981] font-bold text-xs">
          <Leaf className="w-4 h-4 shrink-0 text-[#10b981]" />
          <span>Eco Action</span>
        </div>
        <p className="text-[11px] text-[#c2e5d6] font-medium leading-relaxed">
          Small actions create a big green future.
        </p>
        <div className="pt-1 flex items-center justify-between text-[10px] text-[#7ec2a6] font-mono font-bold">
          <span>SWM 2026 Compliant</span>
          <span className="w-2 h-2 rounded-full bg-[#10b981] animate-ping" />
        </div>
      </div>

      {/* User Profile Footer */}
      {user && (
        <div className="p-4 border-t border-[#0d402e] bg-[#041a12] flex items-center justify-between">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-full bg-[#0e4d37] border border-[#1ab882]/40 text-[#10b981] font-black text-xs flex items-center justify-center shrink-0 shadow-sm">
              {user.fullName ? user.fullName[0].toUpperCase() : 'S'}
            </div>
            <div className="min-w-0 flex-1">
              <p className="text-xs font-bold text-white truncate">{user.fullName || user.email}</p>
              <p className="text-[10px] text-[#7ec2a6] font-mono truncate">{user.role}</p>
            </div>
          </div>
          <button
            onClick={logout}
            className="p-1.5 text-[#a8d5c3] hover:text-rose-400 hover:bg-rose-950/40 rounded-lg transition-colors cursor-pointer"
            title="Logout"
          >
            <LogOut className="w-4 h-4" />
          </button>
        </div>
      )}
    </aside>
  )
}
