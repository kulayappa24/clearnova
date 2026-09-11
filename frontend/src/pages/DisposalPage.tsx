import React from 'react'
import { Recycle, Truck, CheckCircle2, ShieldCheck, Factory, Layers } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockBatches = [
  { id: 'BATCH-2026-01', stream: '🟢 WET', weight: '240.5 kg', facility: 'Jawaharnagar Bio-Composting Unit', status: 'PROCESSED', outcome: 'Composted into 180 kg organic fertilizer' },
  { id: 'BATCH-2026-02', stream: '🔵 DRY', weight: '310.0 kg', facility: 'Gachibowli Material Recovery Facility', status: 'RECEIVED_AT_FACILITY', outcome: 'Undergoing optical sorting & plastic baling' },
  { id: 'BATCH-2026-03', stream: '🔴 SPECIAL', weight: '45.0 kg', facility: 'TS Hazmat & E-Waste Kiosk', status: 'TRANSPORTED', outcome: 'Batteries sent to authorized recycler' },
]

export const DisposalPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <Recycle className="w-4 h-4 text-emerald-400" />
            <span>Closed-Loop Waste Lifecycle Tracking</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Disposal & Processing Facilities</h2>
          <p className="text-sm text-slate-300">Auditable chain-of-custody for 4-stream waste batches from collection to final recycling.</p>
        </div>

        <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1.5 font-mono text-xs">
          3 Processing Facilities Active
        </Badge>
      </div>

      {/* Lifecycle Batches */}
      <div className="space-y-4">
        {mockBatches.map((b) => (
          <Card key={b.id} className="glass-panel border-emerald-500/20 rounded-3xl">
            <CardHeader className="pb-2 flex flex-row items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-sm border border-emerald-500/30">
                  <Factory className="w-5 h-5" />
                </div>
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-mono font-bold text-white text-sm">{b.id}</span>
                    <span className="text-xs font-mono font-bold text-emerald-400">{b.stream}</span>
                  </div>
                  <p className="text-xs text-slate-400 mt-0.5">{b.facility}</p>
                </div>
              </div>
              <Badge className="bg-emerald-500/10 text-emerald-400 border border-emerald-500/30 font-mono text-xs">
                {b.status}
              </Badge>
            </CardHeader>
            <CardContent className="space-y-2 text-xs pt-2">
              <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex items-center justify-between">
                <span className="text-slate-400">Total Batch Weight:</span>
                <span className="font-bold text-white font-mono">{b.weight}</span>
              </div>
              <div className="p-3 rounded-xl bg-emerald-950/30 border border-emerald-500/20 text-emerald-300">
                🌱 <strong>Processing Outcome:</strong> {b.outcome}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
