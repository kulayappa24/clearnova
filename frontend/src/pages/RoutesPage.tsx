import React from 'react'
import { Route as RouteIcon, MapPin, Truck, Play, RefreshCw, Zap, Navigation, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

export const RoutesPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <RouteIcon className="w-4 h-4 text-emerald-400" />
            <span>Nearest-Neighbor TSP Route Optimization Subsystem</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Smart Garbage Route Optimizer</h2>
          <p className="text-sm text-slate-300">Haversine distance matrix solver minimizing fuel consumption & collection turnaround time.</p>
        </div>

        <Button className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]">
          <Zap className="w-4 h-4" />
          <span>Recalculate TSP Route</span>
        </Button>
      </div>

      {/* Optimized Route Cards */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="lg:col-span-2 glass-panel border-emerald-500/20 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Navigation className="w-4 h-4 text-emerald-400" />
              <span>Active Optimized Route: Hyderabad Zone 1 & 2</span>
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">Total distance: 14.8 km • Vehicle Capacity Utilization: 84.2%</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 flex items-center justify-between text-xs font-mono">
              <span className="text-slate-400">Assigned Vehicle:</span>
              <span className="font-bold text-emerald-400">TS-09-EV-2026 (Electric Truck)</span>
            </div>

            {/* Waypoints Timeline */}
            <div className="space-y-3 relative pl-6 border-l-2 border-emerald-500/30">
              {[
                { stop: 1, name: 'Charminar Monument North (BIN-HYD-007)', fill: '96.5%', dist: 'Start Depot → 3.2 km' },
                { stop: 2, name: 'Secunderabad Railway Station (BIN-HYD-011)', fill: '93.0%', dist: '4.1 km next' },
                { stop: 3, name: 'Jubilee Hills Checkpost (BIN-HYD-002)', fill: '91.0%', dist: '3.8 km next' },
                { stop: 4, name: 'Madhapur Mindspace (BIN-HYD-005)', fill: '88.0%', dist: '3.7 km → Disposal Plant' },
              ].map((wp) => (
                <div key={wp.stop} className="relative">
                  <div className="absolute -left-[31px] top-1.5 w-4 h-4 rounded-full bg-emerald-500 text-slate-950 text-[10px] font-bold flex items-center justify-center font-mono">
                    {wp.stop}
                  </div>
                  <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-xs">
                    <div className="flex justify-between items-center">
                      <span className="font-bold text-white">{wp.name}</span>
                      <span className="font-mono text-rose-400 font-bold">{wp.fill}</span>
                    </div>
                    <span className="text-[10px] text-slate-400 font-mono mt-0.5 block">{wp.dist}</span>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Efficiency Stats */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base text-white">TSP Savings Metric</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Compared to static daily routes</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="p-4 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-center space-y-1">
              <div className="text-xs text-emerald-400 font-bold uppercase font-mono">Fuel Savings</div>
              <div className="text-3xl font-extrabold text-white font-mono">31.4%</div>
              <p className="text-[10px] text-slate-300">Reduced carbon footprint by 142 kg/day</p>
            </div>

            <div className="p-4 rounded-2xl bg-sky-950/40 border border-sky-500/30 text-center space-y-1">
              <div className="text-xs text-sky-400 font-bold uppercase font-mono">Time Saved</div>
              <div className="text-3xl font-extrabold text-white font-mono">48 Mins</div>
              <p className="text-[10px] text-slate-300">Faster pickup before overflow incidents</p>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
