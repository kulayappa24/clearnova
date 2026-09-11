import React from 'react'
import { Users, Phone, CheckCircle2, ShieldCheck, UserCheck, Clock, Award } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockWorkers = [
  { id: 'WRK-101', name: 'Ramesh Kumar', zone: 'Zone 1 - West (Canteen & Labs)', status: 'AVAILABLE', completed: 142, avgTime: '18 mins', phone: '+91 98765 43210' },
  { id: 'WRK-102', name: 'Suresh Babu', zone: 'Zone 2 - South (Hostel Block)', status: 'BUSY', completed: 128, avgTime: '22 mins', phone: '+91 98765 43211' },
  { id: 'WRK-103', name: 'Priya Devi', zone: 'Zone 3 - North (Academic Block)', status: 'AVAILABLE', completed: 156, avgTime: '15 mins', phone: '+91 98765 43212' },
  { id: 'WRK-104', name: 'Venkatesh K.', zone: 'Zone 4 - Central (Sports & Park)', status: 'BUSY', completed: 98, avgTime: '24 mins', phone: '+91 98765 43213' },
]

export const WorkersPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <Users className="w-4 h-4 text-emerald-400" />
            <span>Campus Sanitation Staff Roster</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Sanitation Field Operations Team</h2>
          <p className="text-sm text-slate-300">Live worker status, task completions, and average response times.</p>
        </div>

        <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 font-mono text-xs">
          4 Field Team Units Active
        </Badge>
      </div>

      {/* Staff Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {mockWorkers.map((w) => (
          <Card key={w.id} className="glass-panel border-emerald-500/20 rounded-3xl hover:border-emerald-500/40 transition-all">
            <CardHeader className="pb-2 flex flex-row items-start justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                  {w.name[0]}
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white text-sm">{w.name}</span>
                    <span className="font-mono text-[10px] text-emerald-400">{w.id}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{w.zone}</p>
                </div>
              </div>
              <Badge className={w.status === 'AVAILABLE' ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}>
                {w.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-3 text-xs pt-2">
              <div className="grid grid-cols-2 gap-2 text-[11px] p-2.5 rounded-xl bg-slate-950/60 border border-slate-800">
                <div>
                  <span className="text-slate-400">Completed Tasks:</span>
                  <span className="font-bold text-white font-mono ml-1">{w.completed}</span>
                </div>
                <div>
                  <span className="text-slate-400">Avg Response:</span>
                  <span className="font-bold text-emerald-400 font-mono ml-1">{w.avgTime}</span>
                </div>
              </div>

              <div className="flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1">
                  <Phone className="w-3 h-3 text-slate-500" />
                  <span>{w.phone}</span>
                </span>
                <span className="text-emerald-400 font-mono">Duty Shift: Morning</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
