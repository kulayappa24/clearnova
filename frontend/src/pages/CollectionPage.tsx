import React from 'react'
import { Truck, CheckCircle2, AlertTriangle, Clock, MapPin, UserCheck, ShieldCheck } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const mockTasks = [
  { id: 'TSK-901', binCode: 'BIN-HYD-007', location: 'Charminar Monument North', priority: 'CRITICAL', fill: '96.5%', estWeight: '48.2 kg', assignedTo: 'Ramesh Kumar', status: 'IN_PROGRESS' },
  { id: 'TSK-902', binCode: 'BIN-HYD-011', location: 'Secunderabad Railway Station', priority: 'CRITICAL', fill: '93.0%', estWeight: '52.4 kg', assignedTo: 'Suresh Babu', status: 'ASSIGNED' },
  { id: 'TSK-903', binCode: 'BIN-HYD-002', location: 'Jubilee Hills Checkpost', priority: 'HIGH', fill: '91.0%', estWeight: '34.1 kg', assignedTo: 'Priya Devi', status: 'PENDING' },
  { id: 'TSK-904', binCode: 'BIN-HYD-005', location: 'Madhapur Mindspace', priority: 'HIGH', fill: '88.0%', estWeight: '31.0 kg', assignedTo: 'Unassigned', status: 'PENDING' },
]

export const CollectionPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <Truck className="w-4 h-4 text-emerald-400" />
            <span>Automated Collection Dispatch Subsystem</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Garbage Collection Queue</h2>
          <p className="text-sm text-slate-300">Priority-driven task queue generated automatically by IoT fill sensors & prediction AI.</p>
        </div>

        <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 font-mono text-xs">
          4 Tasks Enqueued
        </Badge>
      </div>

      {/* Task Queue List */}
      <div className="space-y-3">
        {mockTasks.map((t) => (
          <Card key={t.id} className="glass-panel border-emerald-500/20 rounded-2xl hover:border-emerald-500/40 transition-all">
            <CardContent className="p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-mono font-extrabold text-emerald-400 text-sm">{t.id}</span>
                  <Badge className={t.priority === 'CRITICAL' ? 'bg-rose-500/10 text-rose-400 border border-rose-500/30' : 'bg-amber-500/10 text-amber-400 border border-amber-500/30'}>
                    {t.priority}
                  </Badge>
                  <span className="font-mono text-xs text-slate-400">{t.binCode}</span>
                </div>
                <div className="text-xs text-white font-semibold flex items-center gap-1.5">
                  <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                  <span>{t.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-6 text-xs">
                <div className="text-right font-mono">
                  <div className="text-rose-400 font-extrabold">{t.fill} Full</div>
                  <div className="text-slate-400 text-[10px]">{t.estWeight}</div>
                </div>

                <div className="text-right text-[11px]">
                  <div className="text-slate-300 font-semibold">{t.assignedTo}</div>
                  <div className="text-emerald-400 font-mono text-[10px]">{t.status}</div>
                </div>

                <Button size="sm" className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl">
                  {t.status === 'IN_PROGRESS' ? 'Complete' : 'Start Task'}
                </Button>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
