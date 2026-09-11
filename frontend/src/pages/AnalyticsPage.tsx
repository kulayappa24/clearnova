import React, { useState } from 'react'
import { BarChart3, TrendingUp, PieChart, Recycle, ShieldCheck, Leaf, Sparkles, Download, Calendar, ArrowUpRight, Zap, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const zoneAnalytics = [
  { zone: 'Zone A - Banjara & Jubilee Hills', totalKg: 139.5, organicPercent: 42, recyclingRate: '88.4%', status: 'OPTIMAL' },
  { zone: 'Zone B - Cyberabad & HITECH City', totalKg: 182.0, organicPercent: 31, recyclingRate: '91.2%', status: 'OPTIMAL' },
  { zone: 'Zone C - Begumpet & Ameerpet', totalKg: 110.4, organicPercent: 45, recyclingRate: '79.5%', status: 'GOOD' },
  { zone: 'Zone D - Old City & Charminar', totalKg: 165.2, organicPercent: 52, recyclingRate: '72.1%', status: 'ACTION REQUIRED' },
  { zone: 'Zone E - Secunderabad Station', totalKg: 148.0, organicPercent: 38, recyclingRate: '81.0%', status: 'GOOD' },
]

const weeklyTrendData = [
  { day: 'Mon', wet: 92, dry: 105, sanitary: 22, special: 12 },
  { day: 'Tue', wet: 88, dry: 110, sanitary: 24, special: 14 },
  { day: 'Wed', wet: 96, dry: 112, sanitary: 25, special: 15 },
  { day: 'Thu', wet: 104, dry: 118, sanitary: 28, special: 18 },
  { day: 'Fri', wet: 115, dry: 125, sanitary: 30, special: 20 },
  { day: 'Sat', wet: 128, dry: 140, sanitary: 34, special: 22 },
  { day: 'Sun', wet: 110, dry: 120, sanitary: 26, special: 16 },
]

export const AnalyticsPage: React.FC = () => {
  const [timeRange, setTimeRange] = useState<'today' | '7days' | '30days'>('7days')

  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>India SWM Rules 2026 Campus Analytics Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Waste Generation & Recycling Intelligence</h2>
          <p className="text-sm text-slate-300">4-Stream daily metrics, ML classification accuracy, and carbon offset analytics.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="flex items-center bg-slate-950 p-1 rounded-2xl border border-slate-800 text-xs">
            <button
              onClick={() => setTimeRange('today')}
              className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all ${
                timeRange === 'today' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Today
            </button>
            <button
              onClick={() => setTimeRange('7days')}
              className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all ${
                timeRange === '7days' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Past 7 Days
            </button>
            <button
              onClick={() => setTimeRange('30days')}
              className={`px-3 py-1.5 rounded-xl font-mono font-bold transition-all ${
                timeRange === '30days' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              Monthly Summary
            </button>
          </div>

          <Button
            className="bg-emerald-600 hover:bg-emerald-500 text-white text-xs font-bold gap-1.5 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export Audit PDF</span>
          </Button>
        </div>
      </div>

      {/* Top Metric Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <Card className="glass-panel border-emerald-500/20 rounded-3xl">
          <CardContent className="p-5">
            <p className="text-xs font-bold text-slate-400 font-mono uppercase">Total Campus Waste</p>
            <h3 className="text-3xl font-extrabold text-white mt-1">248.5 kg</h3>
            <p className="text-xs text-emerald-400 font-mono mt-1 flex items-center gap-1">
              <TrendingUp className="w-3 h-3 text-emerald-400" />
              <span>↓ 12% vs last week</span>
            </p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-emerald-500/20 rounded-3xl">
          <CardContent className="p-5">
            <p className="text-xs font-bold text-slate-400 font-mono uppercase">🟢 Wet Organic Waste</p>
            <h3 className="text-3xl font-extrabold text-emerald-400 mt-1">96.2 kg</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">100% Bio-Composted</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-emerald-500/20 rounded-3xl">
          <CardContent className="p-5">
            <p className="text-xs font-bold text-slate-400 font-mono uppercase">🔵 Dry Recyclables</p>
            <h3 className="text-3xl font-extrabold text-sky-400 mt-1">112.0 kg</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">Paper, Plastic & Metals</p>
          </CardContent>
        </Card>

        <Card className="glass-panel border-emerald-500/20 rounded-3xl">
          <CardContent className="p-5">
            <p className="text-xs font-bold text-slate-400 font-mono uppercase">🔴 Sanitary & Special Care</p>
            <h3 className="text-3xl font-extrabold text-rose-400 mt-1">40.3 kg</h3>
            <p className="text-xs text-slate-400 font-mono mt-1">Hazmat & Diaper/Pad Bins</p>
          </CardContent>
        </Card>
      </div>

      {/* Interactive 7-Day Trend Chart & 4-Stream Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* SVG Responsive 7-Day Waste Trend Chart */}
        <Card className="lg:col-span-2 glass-panel border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <TrendingUp className="w-4 h-4 text-emerald-400" />
                <span>Daily 4-Stream Waste Generation Trend (kg)</span>
              </h3>
              <p className="text-xs text-slate-400">Comparing Wet, Dry, Sanitary, and Special Care volumes over 7 days</p>
            </div>
            <div className="flex items-center gap-2 text-[11px] font-mono">
              <span className="flex items-center gap-1 text-emerald-400"><span className="w-2 h-2 rounded-full bg-emerald-500" /> Wet</span>
              <span className="flex items-center gap-1 text-sky-400"><span className="w-2 h-2 rounded-full bg-sky-500" /> Dry</span>
              <span className="flex items-center gap-1 text-amber-400"><span className="w-2 h-2 rounded-full bg-amber-500" /> Sanitary</span>
            </div>
          </div>

          {/* SVG Bar Chart Visualization */}
          <div className="h-60 w-full flex items-end justify-between gap-3 pt-6 pb-2 px-2 bg-slate-950/60 rounded-2xl border border-slate-800 relative">
            {weeklyTrendData.map((d) => {
              const maxVal = 150
              const wetHeight = (d.wet / maxVal) * 100
              const dryHeight = (d.dry / maxVal) * 100
              const sanHeight = (d.sanitary / maxVal) * 100

              return (
                <div key={d.day} className="flex-1 flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="w-full flex items-end justify-center gap-1 h-full">
                    {/* Wet Bar */}
                    <div
                      style={{ height: `${wetHeight}%` }}
                      className="w-2.5 bg-emerald-500 rounded-t-sm transition-all duration-500 group-hover:bg-emerald-400 shadow-[0_0_8px_rgba(16,185,129,0.3)]"
                      title={`Wet: ${d.wet} kg`}
                    />
                    {/* Dry Bar */}
                    <div
                      style={{ height: `${dryHeight}%` }}
                      className="w-2.5 bg-sky-500 rounded-t-sm transition-all duration-500 group-hover:bg-sky-400 shadow-[0_0_8px_rgba(14,165,233,0.3)]"
                      title={`Dry: ${d.dry} kg`}
                    />
                    {/* Sanitary Bar */}
                    <div
                      style={{ height: `${sanHeight}%` }}
                      className="w-2.5 bg-amber-500 rounded-t-sm transition-all duration-500 group-hover:bg-amber-400"
                      title={`Sanitary: ${d.sanitary} kg`}
                    />
                  </div>
                  <span className="text-[11px] font-mono font-bold text-slate-400 group-hover:text-white transition-colors">
                    {d.day}
                  </span>
                </div>
              )
            })}
          </div>

          <div className="flex items-center justify-between text-xs font-mono text-slate-400 pt-3 border-t border-slate-800/80">
            <span>Peak Waste Day: <strong>Saturday (324 kg total)</strong></span>
            <span className="text-emerald-400 font-bold">AI Segregation Accuracy: 94.8%</span>
          </div>
        </Card>

        {/* 4-Stream Segregation Distribution */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between space-y-4">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2">
              <PieChart className="w-4 h-4 text-emerald-400" />
              <span>SWM 2026 Stream Share</span>
            </h3>
            <p className="text-xs text-slate-400">Source segregation distribution breakdown</p>
          </div>

          <div className="space-y-3 text-xs">
            <div>
              <div className="flex justify-between font-bold text-slate-200 mb-1">
                <span>🟢 Wet Organic Waste</span>
                <span className="font-mono text-emerald-400">38.7% (96.2 kg)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div className="bg-emerald-500 h-full rounded-full" style={{ width: '38.7%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-200 mb-1">
                <span>🔵 Dry Recyclables</span>
                <span className="font-mono text-sky-400">45.0% (112.0 kg)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div className="bg-sky-500 h-full rounded-full" style={{ width: '45%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-200 mb-1">
                <span>🟡 Sanitary Waste</span>
                <span className="font-mono text-amber-400">10.2% (25.3 kg)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div className="bg-amber-500 h-full rounded-full" style={{ width: '10.2%' }} />
              </div>
            </div>

            <div>
              <div className="flex justify-between font-bold text-slate-200 mb-1">
                <span>🔴 Special Care (Hazmat)</span>
                <span className="font-mono text-rose-400">6.1% (15.0 kg)</span>
              </div>
              <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                <div className="bg-rose-500 h-full rounded-full" style={{ width: '6.1%' }} />
              </div>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300">
            🎯 <strong>Recycling Efficiency Target:</strong> 76.4% achieved against 75% SWM 2026 mandate.
          </div>
        </Card>
      </div>

      {/* Zone Performance & Carbon Savings Row */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Zone Waste Generation Breakdown */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl p-6">
          <h3 className="text-base font-bold text-white mb-1">Hyderabad Municipal Zone Analytics</h3>
          <p className="text-xs text-slate-400 mb-4">Daily waste generation & recycling rate per zone</p>

          <div className="space-y-2.5">
            {zoneAnalytics.map((z) => (
              <div key={z.zone} className="p-3 rounded-2xl bg-slate-950/80 border border-slate-800 flex items-center justify-between text-xs">
                <div>
                  <div className="font-bold text-white">{z.zone}</div>
                  <div className="text-slate-400 text-[11px]">Organic ratio: {z.organicPercent}%</div>
                </div>
                <div className="text-right font-mono">
                  <div className="font-extrabold text-emerald-400 text-sm">{z.totalKg} kg</div>
                  <span className={`text-[10px] font-bold ${
                    z.status === 'OPTIMAL' ? 'text-emerald-400' : z.status === 'GOOD' ? 'text-sky-400' : 'text-amber-400'
                  }`}>
                    Recycle Rate: {z.recyclingRate}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Environmental Offset & CO2 Impact */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-bold text-white flex items-center gap-2 mb-1">
              <Leaf className="w-4 h-4 text-emerald-400" />
              <span>Campus Environmental Impact</span>
            </h3>
            <p className="text-xs text-slate-400 mb-4">Estimated Methane & Carbon Offset Metrics</p>

            <div className="p-5 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1 my-2">
              <div className="text-xs text-emerald-400 font-bold uppercase font-mono">CO2 Offset This Month</div>
              <div className="text-4xl font-extrabold text-white font-mono">1.84 Tons</div>
              <p className="text-xs text-slate-300">Equivalent to planting 82 trees on campus</p>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-slate-400 text-[11px]">Water Saved</div>
              <div className="text-xl font-extrabold text-sky-400 font-mono mt-0.5">14,200 L</div>
            </div>
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 text-center">
              <div className="text-slate-400 text-[11px]">Landfill Diverted</div>
              <div className="text-xl font-extrabold text-emerald-400 font-mono mt-0.5">84.2%</div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
