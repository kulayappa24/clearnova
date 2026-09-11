import React from 'react'
import { Sparkles, Leaf, ArrowRight, Camera, Compass, Radio } from 'lucide-react'
import { Link } from 'react-router-dom'

interface HeroHeaderProps {
  title: string
  subtitle: string
  tag?: string
}

export const HeroHeader: React.FC<HeroHeaderProps> = ({ title, subtitle, tag = 'CLEARNOVA PLATFORM' }) => {
  return (
    <div className="relative p-8 rounded-3xl bg-gradient-to-r from-emerald-100 via-teal-50 to-emerald-100 border-2 border-emerald-300 shadow-[0_10px_30px_rgba(16,185,129,0.12)] overflow-hidden group">
      {/* Background Cyber Grid & Orbs */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.08)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.08)_1px,transparent_1px)] bg-[size:3rem_3rem]" />
      <div className="absolute -top-24 -left-24 w-80 h-80 bg-emerald-300/30 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -right-24 w-80 h-80 bg-teal-300/25 rounded-full blur-3xl pointer-events-none" />

      {/* Laser Beam Accent */}
      <div className="absolute left-0 w-full h-1 bg-gradient-to-r from-transparent via-emerald-500 to-transparent opacity-60 animate-laser pointer-events-none" />

      <div className="relative z-10 flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6">
        <div className="space-y-3 max-w-2xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-200/80 border border-emerald-400 text-emerald-950 text-[11px] font-mono font-extrabold tracking-wider uppercase shadow-sm">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700 animate-pulse" />
            <span>{tag}</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-600 animate-ping" />
            <span>SWM Rules 2026 Mandate</span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black tracking-tight text-slate-900 leading-tight">
            {title}
          </h1>

          <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-semibold">
            {subtitle}
          </p>

          <div className="pt-1 flex flex-wrap items-center gap-3 text-xs font-mono text-emerald-950 font-bold">
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm text-emerald-900">
              <Radio className="w-3.5 h-3.5 text-emerald-600 animate-pulse" />
              <span>15 IoT Bins Live</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm text-emerald-900">
              <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
              <span>94.8% AI Classifier</span>
            </span>
            <span className="flex items-center gap-1.5 bg-white px-3.5 py-1.5 rounded-xl border border-emerald-300 shadow-sm text-emerald-900">
              <Compass className="w-3.5 h-3.5 text-emerald-600" />
              <span>TSP Route Solver</span>
            </span>
          </div>
        </div>

        {/* Hero Visualizer Card & Action Buttons */}
        <div className="flex flex-col sm:flex-row lg:flex-col items-center lg:items-end gap-3 shrink-0 w-full lg:w-auto">
          <div className="p-4 rounded-2xl bg-white border border-emerald-300 flex items-center gap-3 shadow-md w-full sm:w-auto">
            <img src="/logo.png" alt="ClearNova Logo" className="w-12 h-12 object-contain rounded-xl border-2 border-emerald-300 p-0.5 bg-white shadow-sm animate-float" />
            <div>
              <div className="text-xs font-black text-slate-900">4-Stream AI Segregation</div>
              <div className="text-[10px] font-mono text-emerald-900 font-extrabold">🟢 Wet • 🔵 Dry • 🟡 Sanit • 🔴 Special</div>
            </div>
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <Link
              to="/ai-detection"
              className="flex-1 sm:flex-initial px-5 py-3 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold text-xs shadow-md transition-all hover:scale-[1.03] flex items-center justify-center gap-2"
            >
              <Camera className="w-4 h-4" />
              <span>AI Waste Scanner</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
