import React, { useState } from 'react'
import { Trash2, Search, Filter, AlertTriangle, ArrowUpDown, RefreshCw } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

const mockBins = [
  { code: 'BIN-HYD-001', name: 'Banjara Hills Road #12', zone: 'Zone 1 - West', fill: 82.5, weight: '28.4 kg', temp: '31.2°C', status: 'HIGH', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-002', name: 'Jubilee Hills Checkpost', zone: 'Zone 1 - West', fill: 91.0, weight: '34.1 kg', temp: '32.5°C', status: 'CRITICAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-003', name: 'HITECH City Cyber Towers', zone: 'Zone 1 - West', fill: 74.0, weight: '42.0 kg', temp: '30.8°C', status: 'WARNING', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-004', name: 'Gachibowli DLF IT Park', zone: 'Zone 1 - West', fill: 65.0, weight: '21.5 kg', temp: '29.5°C', status: 'NORMAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-005', name: 'Madhapur Mindspace', zone: 'Zone 1 - West', fill: 88.0, weight: '31.0 kg', temp: '33.1°C', status: 'HIGH', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-006', name: 'Kondapur Botanical Garden', zone: 'Zone 1 - West', fill: 45.0, weight: '14.2 kg', temp: '28.4°C', status: 'NORMAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-007', name: 'Charminar Monument North', zone: 'Zone 2 - South', fill: 96.5, weight: '48.2 kg', temp: '35.4°C', status: 'CRITICAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-008', name: 'Koti Women\'s College', zone: 'Zone 2 - South', fill: 52.0, weight: '18.0 kg', temp: '30.1°C', status: 'NORMAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-009', name: 'Abids Commercial Complex', zone: 'Zone 2 - South', fill: 68.0, weight: '24.8 kg', temp: '31.0°C', status: 'WARNING', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-010', name: 'Begumpet Airport Plaza', zone: 'Zone 3 - North', fill: 38.0, weight: '11.5 kg', temp: '29.0°C', status: 'NORMAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-011', name: 'Secunderabad Railway Station', zone: 'Zone 3 - North', fill: 93.0, weight: '52.4 kg', temp: '34.0°C', status: 'CRITICAL', connectivity: 'ONLINE' },
  { code: 'BIN-HYD-012', name: 'Ameerpet Metro Station', zone: 'Zone 3 - North', fill: 81.0, weight: '29.6 kg', temp: '32.0°C', status: 'HIGH', connectivity: 'ONLINE' },
]

export const BinsPage: React.FC = () => {
  const [search, setSearch] = useState('')

  const filteredBins = mockBins.filter(b => 
    b.code.toLowerCase().includes(search.toLowerCase()) || 
    b.name.toLowerCase().includes(search.toLowerCase()) ||
    b.zone.toLowerCase().includes(search.toLowerCase())
  )

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'CRITICAL':
        return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/40">CRITICAL</Badge>
      case 'HIGH':
        return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40">HIGH</Badge>
      case 'WARNING':
        return <Badge className="bg-yellow-500/20 text-yellow-400 border border-yellow-500/40">WARNING</Badge>
      default:
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40">NORMAL</Badge>
    }
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Search & Filters */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
        <div className="relative w-full sm:w-80">
          <Search className="w-4 h-4 absolute left-3 top-3 text-slate-500" />
          <Input
            placeholder="Search by code, location, zone..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-900 border-slate-800 text-white"
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 gap-2">
            <Filter className="w-4 h-4" />
            <span>Filter Zone</span>
          </Button>
          <Button variant="outline" className="border-slate-800 bg-slate-900 text-slate-300 gap-2">
            <RefreshCw className="w-4 h-4" />
            <span>Refresh</span>
          </Button>
        </div>
      </div>

      {/* Bins Table Card */}
      <Card className="bg-slate-900 border-slate-800">
        <CardHeader>
          <CardTitle className="text-base text-white">Smart Bins Directory ({filteredBins.length})</CardTitle>
          <CardDescription className="text-slate-400 text-xs">Live fill level progress, payload weight, and telemetry connection status.</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950 text-slate-400 uppercase font-mono text-[10px] border-y border-slate-800">
              <tr>
                <th className="py-3 px-4">Bin Code</th>
                <th className="py-3 px-4">Location Name</th>
                <th className="py-3 px-4">Zone</th>
                <th className="py-3 px-4">Fill Level</th>
                <th className="py-3 px-4">Weight</th>
                <th className="py-3 px-4">Temp</th>
                <th className="py-3 px-4">Status</th>
                <th className="py-3 px-4">Connection</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/60">
              {filteredBins.map((bin) => (
                <tr key={bin.code} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-emerald-400">{bin.code}</td>
                  <td className="py-3 px-4 font-medium text-slate-200">{bin.name}</td>
                  <td className="py-3 px-4 text-slate-400">{bin.zone}</td>
                  <td className="py-3 px-4">
                    <div className="flex items-center gap-2">
                      <div className="w-24 bg-slate-950 rounded-full h-2 overflow-hidden border border-slate-800">
                        <div
                          className={`h-full rounded-full ${
                            bin.fill >= 90 ? 'bg-rose-500' : bin.fill >= 80 ? 'bg-amber-500' : 'bg-emerald-500'
                          }`}
                          style={{ width: `${bin.fill}%` }}
                        />
                      </div>
                      <span className="font-mono text-xs text-slate-200">{bin.fill}%</span>
                    </div>
                  </td>
                  <td className="py-3 px-4 font-mono text-slate-300">{bin.weight}</td>
                  <td className="py-3 px-4 font-mono text-slate-400">{bin.temp}</td>
                  <td className="py-3 px-4">{getStatusBadge(bin.status)}</td>
                  <td className="py-3 px-4">
                    <span className="inline-flex items-center gap-1.5 text-emerald-400 text-[11px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      MQTT Online
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
