import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { 
  Sparkles, 
  ArrowRight, 
  Play, 
  Trash2, 
  Cpu, 
  Layers, 
  Truck, 
  Wifi, 
  Leaf, 
  Users, 
  ShieldCheck, 
  Recycle, 
  MapPin, 
  CheckCircle2, 
  TrendingUp, 
  TrendingDown, 
  Star, 
  Search, 
  Clock, 
  AlertTriangle,
  Send,
  Heart,
  Globe,
  Share2
} from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const DashboardPage: React.FC = () => {
  const { user } = useAuth()
  const [emailSub, setEmailSub] = useState('')
  const [subDone, setSubDone] = useState(false)
  const [selectedFacility, setSelectedFacility] = useState<string | null>('Recycling Center - HITECH City')

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault()
    if (!emailSub.trim()) return
    setSubDone(true)
    setTimeout(() => {
      setSubDone(false)
      setEmailSub('')
    }, 3000)
  }

  return (
    <div className="space-y-10 font-sans select-none pb-12">
      
      {/* =========================================================================
          1. HERO BANNER SECTION (MATCHING UPLOADED MOCKUP PHOTO EXACTLY)
         ========================================================================= */}
      <div className="relative p-8 md:p-12 rounded-3xl bg-white border border-[#e2ece8] shadow-sm overflow-hidden">
        {/* Subtle Ambient Eco Glows */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#ecfdf5] rounded-full blur-3xl -z-0 opacity-70" />
        <div className="absolute bottom-0 left-1/3 w-80 h-80 bg-[#f0fdf4] rounded-full blur-3xl -z-0 opacity-80" />

        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left Hero Content */}
          <div className="lg:col-span-7 space-y-6">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#ecfdf5] border border-[#a7f3d0] text-[#047857] text-xs font-extrabold tracking-wide uppercase">
              <Leaf className="w-4 h-4 text-[#059669]" />
              <span>AI Powered • Smart • Sustainable</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-slate-900 leading-none tracking-tight">
              Clean Cities <br />
              <span className="text-[#059669]">Green Future</span>
            </h1>

            <p className="text-sm sm:text-base text-slate-600 leading-relaxed font-medium max-w-xl">
              Smart waste management + clean technology for healthier communities and a greener planet.
              We use AI, IoT and smart systems to help you segregate waste, track collection, and support sustainable living — for a cleaner, healthier tomorrow.
            </p>

            <div className="pt-2 flex flex-wrap items-center gap-4">
              <Link to="/ai-detection">
                <Button className="green-pill-btn px-7 py-6 text-sm font-extrabold flex items-center gap-2 shadow-md">
                  <span>Get Started</span>
                  <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>

              <Link to="/routes">
                <Button variant="outline" className="px-6 py-6 rounded-full border border-[#d6e5df] text-slate-700 font-bold text-sm hover:bg-[#f3f6f5] flex items-center gap-2">
                  <Play className="w-4 h-4 text-[#059669] fill-current" />
                  <span>Watch How It Works</span>
                </Button>
              </Link>
            </div>
          </div>

          {/* Right Visualizer Hero Box (3 Waste Bins Graphic + Planet Together Floating Card) */}
          <div className="lg:col-span-5 relative">
            <div className="p-6 rounded-3xl bg-gradient-to-b from-[#f0fdf4] to-[#e6f4ee] border border-[#cce5dc] relative shadow-md">
              
              {/* 3 Colorful Bins Stand (Wet, Dry, Other) */}
              <div className="flex items-end justify-center gap-4 py-4">
                {/* 🟢 Wet Bin */}
                <div className="w-24 bg-[#059669] text-white p-3 rounded-2xl flex flex-col items-center justify-between h-40 shadow-lg border border-[#047857] hover:scale-105 transition-transform">
                  <div className="w-8 h-2 bg-[#047857] rounded-full" />
                  <div className="text-center space-y-1">
                    <span className="text-2xl">🥬</span>
                    <p className="text-xs font-black">Wet</p>
                    <p className="text-[9px] opacity-80 font-mono">(Organic)</p>
                  </div>
                  <div className="w-full bg-[#047857]/50 py-1 text-center rounded text-[9px] font-mono font-bold">🟢 45%</div>
                </div>

                {/* 🔵 Dry Bin */}
                <div className="w-24 bg-[#0284c7] text-white p-3 rounded-2xl flex flex-col items-center justify-between h-40 shadow-lg border border-[#0369a1] hover:scale-105 transition-transform">
                  <div className="w-8 h-2 bg-[#0369a1] rounded-full" />
                  <div className="text-center space-y-1">
                    <span className="text-2xl">📦</span>
                    <p className="text-xs font-black">Dry</p>
                    <p className="text-[9px] opacity-80 font-mono">(Recyclable)</p>
                  </div>
                  <div className="w-full bg-[#0369a1]/50 py-1 text-center rounded text-[9px] font-mono font-bold">🔵 40%</div>
                </div>

                {/* 🔴 Other Bin */}
                <div className="w-24 bg-[#dc2626] text-white p-3 rounded-2xl flex flex-col items-center justify-between h-40 shadow-lg border border-[#b91c1c] hover:scale-105 transition-transform">
                  <div className="w-8 h-2 bg-[#b91c1c] rounded-full" />
                  <div className="text-center space-y-1">
                    <span className="text-2xl">🔋</span>
                    <p className="text-xs font-black">Other</p>
                    <p className="text-[9px] opacity-80 font-mono">(Hazardous)</p>
                  </div>
                  <div className="w-full bg-[#b91c1c]/50 py-1 text-center rounded text-[9px] font-mono font-bold">🔴 15%</div>
                </div>
              </div>

              {/* Floating Eco Card Top Right */}
              <div className="absolute -top-4 -right-4 p-4 rounded-2xl bg-white border border-[#cce5dc] shadow-xl max-w-[200px] space-y-2 animate-float">
                <div className="flex items-center gap-2 text-slate-900 font-extrabold text-xs">
                  <div className="w-6 h-6 rounded-full bg-[#ecfdf5] text-[#059669] flex items-center justify-center">
                    <Leaf className="w-3.5 h-3.5" />
                  </div>
                  <span>Cleaner Planet Together</span>
                </div>
                <div className="space-y-1 text-[10px] text-slate-600 font-semibold">
                  <p className="flex items-center gap-1.5">💧 Less Pollution</p>
                  <p className="flex items-center gap-1.5">🩺 Better Health</p>
                  <p className="flex items-center gap-1.5">🌳 Greener Cities</p>
                  <p className="flex items-center gap-1.5">♻️ Sustainable Future</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* =========================================================================
          2. "WHY CHOOSE CLEARNOVA?" 6-FEATURE GRID
         ========================================================================= */}
      <div className="space-y-6">
        <div>
          <h2 className="text-2xl font-extrabold text-slate-900">Why Choose ClearNova?</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">Simple. Smart. Sustainable.</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
          {[
            { icon: Cpu, title: 'AI-Powered Segregation', desc: 'Uses AI camera to identify and sort waste accurately.' },
            { icon: Wifi, title: 'Smart Monitoring', desc: 'Track bin levels, collection status & real-time alerts.' },
            { icon: Leaf, title: 'Cleaner Environment', desc: 'Reduces pollution, recycles more, keeps cities clean.' },
            { icon: Users, title: 'Community Driven', desc: 'Report issues, give feedback, and be part of the change.' },
            { icon: ShieldCheck, title: 'Healthier Living', desc: 'Less waste, less disease, cleaner surroundings.' },
            { icon: Recycle, title: 'Sustainable Future', desc: 'For a greener planet, for future generations.' },
          ].map((item, idx) => {
            const Icon = item.icon
            return (
              <Card key={idx} className="card-clean p-4 flex flex-col justify-between hover:border-[#059669] hover:shadow-md transition-all group">
                <div className="space-y-3">
                  <div className="w-10 h-10 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] text-[#059669] flex items-center justify-center group-hover:scale-110 transition-transform">
                    <Icon className="w-5 h-5" />
                  </div>
                  <h3 className="font-extrabold text-xs text-slate-900 leading-snug">{item.title}</h3>
                  <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{item.desc}</p>
                </div>
              </Card>
            )
          })}
        </div>
      </div>

      {/* =========================================================================
          3. "HOW IT WORKS" 4-STEPPER PROCESS FLOW
         ========================================================================= */}
      <Card className="card-clean p-6 lg:p-8 space-y-6">
        <div>
          <h2 className="text-xl font-extrabold text-slate-900">How It Works</h2>
          <p className="text-xs text-slate-500 font-medium mt-0.5">A simple process for a cleaner tomorrow.</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative">
          {[
            { step: '1', title: 'Throw Waste', desc: 'Put waste in the right bin / app.', icon: Trash2 },
            { step: '2', title: 'AI Identifies', desc: 'Camera classifies the waste.', icon: Cpu },
            { step: '3', title: 'Smart Sorting', desc: 'Moves to the right compartment.', icon: Layers },
            { step: '4', title: 'Collection & Tracking', desc: 'Optimized routes for clean & green cities.', icon: Truck },
          ].map((s, idx) => {
            const Icon = s.icon
            return (
              <div key={idx} className="flex flex-col items-center text-center space-y-3 p-4 rounded-2xl bg-[#f8faf9] border border-[#e2ece8] relative">
                <div className="relative">
                  <div className="w-12 h-12 rounded-full bg-[#059669] text-white font-black text-sm flex items-center justify-center shadow-md">
                    {s.step}
                  </div>
                  <div className="w-6 h-6 rounded-full bg-white border border-[#a7f3d0] text-[#059669] flex items-center justify-center absolute -bottom-1 -right-1 shadow-xs">
                    <Icon className="w-3.5 h-3.5" />
                  </div>
                </div>
                <h3 className="font-extrabold text-xs text-slate-900">{s.title}</h3>
                <p className="text-[11px] text-slate-500 leading-relaxed font-medium">{s.desc}</p>
              </div>
            )
          })}
        </div>
      </Card>

      {/* =========================================================================
          4. MAIN DASHBOARD GRID (INNER DASHBOARD, MAP WIDGET & JOIN MOVEMENT)
         ========================================================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        
        {/* Left Column (Welcome & Metrics & Donut Chart & Activity) */}
        <div className="lg:col-span-7 space-y-6">
          <Card className="card-clean p-6 space-y-6">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-[#e2ece8] pb-4">
              <div>
                <h3 className="font-extrabold text-base text-slate-900">
                  Welcome back, {user ? user.fullName : 'Srinu'}!
                </h3>
                <p className="text-xs text-slate-500 font-medium">Together we make a cleaner tomorrow</p>
              </div>
              <div className="text-right font-mono text-[11px] text-slate-500 font-bold bg-[#f8faf9] px-3 py-1.5 rounded-xl border border-[#e2ece8]">
                Tue, 9 Sep 2026 • 28°C Clear
              </div>
            </div>

            {/* 4 Metric Mini-Cards */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              <div className="p-3.5 rounded-2xl bg-[#f8faf9] border border-[#e2ece8] space-y-1">
                <p className="text-[10px] text-slate-500 font-extrabold uppercase font-mono">Total Waste Today</p>
                <p className="text-lg font-black text-slate-900">24.6 kg</p>
                <p className="text-[10px] text-[#059669] font-mono font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> 12%
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#ecfdf5] border border-[#a7f3d0] space-y-1">
                <p className="text-[10px] text-[#047857] font-extrabold uppercase font-mono">Recycled</p>
                <p className="text-lg font-black text-[#047857]">15.2 kg</p>
                <p className="text-[10px] text-[#047857] font-mono font-bold flex items-center gap-0.5">
                  <TrendingUp className="w-3 h-3" /> 18%
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fff1f2] border border-[#fecdd3] space-y-1">
                <p className="text-[10px] text-[#9f1239] font-extrabold uppercase font-mono">Pending Collection</p>
                <p className="text-lg font-black text-[#9f1239]">0.8 kg</p>
                <p className="text-[10px] text-[#9f1239] font-mono font-bold flex items-center gap-0.5">
                  <TrendingDown className="w-3 h-3" /> 5%
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-[#fffbeb] border border-[#fde68a] space-y-1">
                <p className="text-[10px] text-[#92400e] font-extrabold uppercase font-mono">Green Points</p>
                <p className="text-lg font-black text-[#92400e]">320 ⭐</p>
                <p className="text-[10px] text-[#92400e] font-mono font-bold">+20 this week</p>
              </div>
            </div>

            {/* Waste Segregation Breakdown & Recent Activity */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-2">
              {/* Donut Chart Visual */}
              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2ece8] space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900">Waste Segregation Overview</h4>
                <div className="flex items-center gap-4">
                  <div className="relative w-24 h-24 rounded-full border-8 border-[#059669] border-t-[#0284c7] border-r-[#dc2626] flex items-center justify-center shrink-0">
                    <span className="text-xs font-black text-slate-900">100%</span>
                  </div>
                  <div className="space-y-1.5 text-xs font-semibold">
                    <p className="flex items-center justify-between gap-4"><span className="text-[#059669] font-bold">🟢 Wet</span> <span>45%</span></p>
                    <p className="flex items-center justify-between gap-4"><span className="text-[#0284c7] font-bold">🔵 Dry</span> <span>40%</span></p>
                    <p className="flex items-center justify-between gap-4"><span className="text-[#dc2626] font-bold">🔴 Other</span> <span>15%</span></p>
                  </div>
                </div>
              </div>

              {/* Activity Stream */}
              <div className="p-4 rounded-2xl bg-[#f8faf9] border border-[#e2ece8] space-y-3">
                <h4 className="font-extrabold text-xs text-slate-900">Recent Activity</h4>
                <div className="space-y-2 text-xs">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#059669] mt-1 shrink-0" />
                    <div>
                      <p className="font-extrabold text-slate-900 text-[11px]">Bin #3 filled (Wet Waste)</p>
                      <p className="text-[10px] text-slate-400 font-mono">2 hours ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-[#0284c7] mt-1 shrink-0" />
                    <div>
                      <p className="font-extrabold text-slate-900 text-[11px]">Collection completed</p>
                      <p className="text-[10px] text-slate-400 font-mono">Today, 10:15 AM</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 rounded-full bg-amber-500 mt-1 shrink-0" />
                    <div>
                      <p className="font-extrabold text-slate-900 text-[11px]">You earned 10 green points!</p>
                      <p className="text-[10px] text-slate-400 font-mono">Yesterday</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>

        {/* Right Column: Find Nearby Facilities Map Widget & Join Movement Banner */}
        <div className="lg:col-span-5 space-y-6">
          
          {/* Find Nearby Facilities Map Widget (Matching Mockup Photo) */}
          <Card className="card-clean p-6 space-y-4">
            <div>
              <h3 className="font-extrabold text-base text-slate-900">Find Nearby Facilities</h3>
              <p className="text-xs text-slate-500 font-medium">Locate dustbins, recycling centers & collection points.</p>
            </div>

            {/* Search Input */}
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
              <input
                type="text"
                placeholder="Search your area..."
                className="w-full bg-[#f8faf9] text-xs text-slate-800 pl-9 pr-3 py-2 rounded-xl border border-[#d6e5df] focus:outline-none focus:border-[#059669] font-medium"
              />
            </div>

            {/* Legend Pins */}
            <div className="grid grid-cols-2 gap-2 text-[10px] font-bold">
              <span className="flex items-center gap-1.5 text-[#059669]"><span className="w-2 h-2 rounded-full bg-[#059669]" /> Smart Bins</span>
              <span className="flex items-center gap-1.5 text-[#0284c7]"><span className="w-2 h-2 rounded-full bg-[#0284c7]" /> Recycling Centers</span>
              <span className="flex items-center gap-1.5 text-[#d97706]"><span className="w-2 h-2 rounded-full bg-[#d97706]" /> Collection Points</span>
              <span className="flex items-center gap-1.5 text-[#dc2626]"><span className="w-2 h-2 rounded-full bg-[#dc2626]" /> Nearby Alerts</span>
            </div>

            {/* Interactive Map Visual Box */}
            <div className="relative h-44 rounded-2xl bg-[#e2ece8] border border-[#cce5dc] overflow-hidden flex flex-col items-center justify-center p-4 text-center">
              <div className="absolute inset-0 bg-[radial-gradient(#059669_1px,transparent_1px)] [background-size:16px_16px] opacity-20" />
              
              {/* Map Pin Highlights */}
              <div className="absolute top-6 left-8 bg-[#059669] text-white p-1.5 rounded-full shadow-md animate-bounce">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute bottom-8 right-12 bg-[#0284c7] text-white p-1.5 rounded-full shadow-md">
                <MapPin className="w-4 h-4" />
              </div>
              <div className="absolute top-12 right-20 bg-[#d97706] text-white p-1.5 rounded-full shadow-md">
                <MapPin className="w-4 h-4" />
              </div>

              {/* Selected Pin Popup Card Overlay */}
              <div className="relative z-10 p-3 rounded-xl bg-white border border-[#cce5dc] shadow-lg text-left max-w-xs space-y-1.5">
                <div className="text-xs font-extrabold text-slate-900 flex items-center justify-between">
                  <span>Recycling Center</span>
                  <span className="text-[10px] text-[#059669] font-mono">1.2 km • 5 min</span>
                </div>
                <Link to="/map">
                  <Button size="sm" className="w-full bg-[#059669] hover:bg-[#047857] text-white font-extrabold text-[10px] py-1 h-7 rounded-lg">
                    View Details
                  </Button>
                </Link>
              </div>
            </div>
          </Card>

          {/* Join the Movement Banner Card */}
          <div className="p-6 rounded-3xl bg-gradient-to-br from-[#062319] via-[#0b3b2b] to-[#041a12] text-white space-y-4 shadow-xl relative overflow-hidden">
            <div className="space-y-2">
              <div className="inline-flex items-center gap-1.5 text-[#10b981] font-bold text-xs">
                <Heart className="w-4 h-4 fill-current text-rose-500" />
                <span>Join the Movement</span>
              </div>
              <h3 className="text-xl font-black text-white leading-snug">
                A cleaner earth is in our hands ♡
              </h3>
              <p className="text-xs text-[#a8d5c3] font-medium leading-relaxed">
                Be a part of the change. Together we can build cleaner, greener and healthier cities.
              </p>
            </div>

            <Link to="/ai-detection">
              <Button className="green-pill-btn px-6 py-5 text-xs font-extrabold flex items-center gap-2 shadow-md">
                <span>Start Now</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* =========================================================================
          5. FOOTER BANNER (MATCHING UPLOADED MOCKUP PHOTO EXACTLY)
         ========================================================================= */}
      <footer className="rounded-3xl bg-[#062319] text-white p-8 space-y-6 shadow-xl border border-[#0d402e]">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-center border-b border-[#0d402e] pb-6">
          {/* Left Title */}
          <div className="md:col-span-5 space-y-1">
            <div className="flex items-center gap-2 text-[#10b981]">
              <Leaf className="w-6 h-6" />
              <span className="text-xl font-black text-white">ClearNova</span>
            </div>
            <p className="text-sm font-bold text-[#c2e5d6]">
              Cleaner Cities. Healthier People. A Greener Planet.
            </p>
          </div>

          {/* Center Subscribe Form */}
          <div className="md:col-span-5 space-y-2">
            <p className="text-xs font-bold text-[#a8d5c3]">Stay Updated</p>
            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                value={emailSub}
                onChange={(e) => setEmailSub(e.target.value)}
                placeholder="Enter your email address"
                className="bg-[#0b3325] text-xs text-white px-4 py-2.5 rounded-full border border-[#1ab882]/30 flex-1 focus:outline-none focus:border-[#10b981] placeholder:text-[#6cb898]"
                required
              />
              <Button type="submit" className="green-pill-btn px-5 text-xs">
                {subDone ? 'Subscribed!' : 'Subscribe'}
              </Button>
            </form>
          </div>

          {/* Right Social Icons */}
          <div className="md:col-span-2 flex items-center justify-start md:justify-end gap-3 text-[#a8d5c3]">
            <a href="#" className="p-2 bg-[#0b3325] hover:bg-[#10b981] hover:text-[#062319] rounded-full transition-colors" title="Global Network"><Globe className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-[#0b3325] hover:bg-[#10b981] hover:text-[#062319] rounded-full transition-colors" title="Share Community"><Share2 className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-[#0b3325] hover:bg-[#10b981] hover:text-[#062319] rounded-full transition-colors" title="Contact Us"><Send className="w-4 h-4" /></a>
            <a href="#" className="p-2 bg-[#0b3325] hover:bg-[#10b981] hover:text-[#062319] rounded-full transition-colors" title="Eco Platform"><Leaf className="w-4 h-4" /></a>
          </div>
        </div>

        {/* Footer Bottom Links & Copyright */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 text-[11px] text-[#7ec2a6] font-medium">
          <p>© 2026 ClearNova. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <Link to="/dashboard" className="hover:text-white transition-colors">Home</Link>
            <Link to="/ai-detection" className="hover:text-white transition-colors">AI Segregation</Link>
            <Link to="/map" className="hover:text-white transition-colors">GIS Map</Link>
            <Link to="/complaints" className="hover:text-white transition-colors">Sanitization</Link>
            <Link to="/routes" className="hover:text-white transition-colors">Green Solutions</Link>
          </div>
          <p className="font-mono">Powered by Clean Technology • SWM 2026</p>
        </div>
      </footer>
    </div>
  )
}
