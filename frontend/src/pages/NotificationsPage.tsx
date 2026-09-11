import React from 'react'
import { Bell, AlertTriangle, Sparkles, CheckCircle2, ShieldCheck, Clock } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockLogs = [
  { id: 'LOG-1', type: 'THRESHOLD_BREACH', title: 'Critical Fill Breach: BIN-HYD-007', msg: 'Charminar North bin reached 96.5% capacity. Priority collection ticket generated.', time: '5 mins ago', read: false },
  { id: 'LOG-2', type: 'AI_DETECTION', title: 'SWM 2026 AI Classification', msg: 'Classified PLASTIC BOTTLE (95.8% confidence) -> DRY Waste bin flap opened.', time: '12 mins ago', read: true },
  { id: 'LOG-3', type: 'SANITATION_TICKET', title: 'Washroom Sanitization Request', msg: 'New ticket SAN-1025 reported for Central Canteen. Assigned to Team 01.', time: '28 mins ago', read: true },
  { id: 'LOG-4', type: 'ROUTE_GENERATED', title: 'TSP Optimized Route Calculated', msg: 'Route for Vehicle TS-09-EV-2026 computed saving 31.4% fuel.', time: '1 hour ago', read: true },
]

export const NotificationsPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans select-none pb-12">
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <Bell className="w-4 h-4 text-emerald-400" />
            <span>System Telemetry & Alert Stream</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">System Notifications</h2>
          <p className="text-sm text-slate-300">Live logs from IoT sensors, AI classifier, and collection dispatchers.</p>
        </div>

        <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 font-mono text-xs">
          1 Unread Alert
        </Badge>
      </div>

      <div className="space-y-3">
        {mockLogs.map((log) => (
          <Card key={log.id} className={`glass-panel rounded-2xl transition-all ${!log.read ? 'border-emerald-500/40 bg-emerald-950/20' : 'border-slate-800'}`}>
            <CardContent className="p-4 flex items-start gap-4">
              <div className="p-2.5 rounded-xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shrink-0">
                <Bell className="w-5 h-5" />
              </div>
              <div className="space-y-1 flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <h4 className="font-bold text-white text-xs">{log.title}</h4>
                  <span className="text-[10px] font-mono text-slate-400">{log.time}</span>
                </div>
                <p className="text-xs text-slate-300">{log.msg}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
