import React, { useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { Trash2, ArrowLeft, Thermometer, Weight, Activity, RefreshCw, Zap, AlertTriangle, ShieldCheck, MapPin, Clock, Truck, Navigation } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

const sampleBinsMap: Record<string, any> = {
  'BIN-HYD-001': { code: 'BIN-HYD-001', name: 'Banjara Hills Road #12', zone: 'Zone A - West', fill: 82.5, weightKg: 41.2, tempC: 31.5, battery: 94, status: 'HIGH', category: '🟢 Wet Organic', lat: 17.4156, lng: 78.4347 },
  'BIN-HYD-002': { code: 'BIN-HYD-002', name: 'Jubilee Hills Checkpost', zone: 'Zone A - West', fill: 91.0, weightKg: 48.5, tempC: 34.0, battery: 88, status: 'CRITICAL', category: '🔵 Dry Recyclable', lat: 17.4319, lng: 78.4071 },
  'BIN-HYD-003': { code: 'BIN-HYD-003', name: 'HITECH City Cyber Towers', zone: 'Zone B - Cyberabad', fill: 74.0, weightKg: 38.0, tempC: 29.8, battery: 92, status: 'WARNING', category: '🔵 Dry Recyclable', lat: 17.4504, lng: 78.3808 },
  'BIN-HYD-007': { code: 'BIN-HYD-007', name: 'Charminar Monument North', zone: 'Zone D - Old City', fill: 96.5, weightKg: 52.3, tempC: 36.2, battery: 76, status: 'CRITICAL', category: '🔴 Special Care', lat: 17.3616, lng: 78.4747 },
}

export const BinDetailPage: React.FC = () => {
  const { id } = useParams<{ id: string }>()
  const binCode = id || 'BIN-HYD-001'
  const bin = sampleBinsMap[binCode] || {
    code: binCode,
    name: `Smart Bin ${binCode}`,
    zone: 'Zone A - Hyderabad Central',
    fill: 85.0,
    weightKg: 42.0,
    tempC: 32.0,
    battery: 90,
    status: 'HIGH',
    category: '🟢 Wet Organic',
    lat: 17.4156,
    lng: 78.4347
  }

  const [simulatedFill, setSimulatedFill] = useState(bin.fill)

  const handleSimulateFull = () => {
    setSimulatedFill(95.5)
  }

  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Header Bar */}
      <div className="flex items-center justify-between">
        <Link
          to="/bins"
          className="flex items-center gap-2 text-slate-400 hover:text-emerald-400 text-xs font-semibold font-mono transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Smart Bins Network</span>
        </Link>
        <div className="flex items-center gap-2">
          <Badge className="bg-emerald-950 text-emerald-400 border border-emerald-500/30 px-3 py-1 font-mono text-xs">
            MQTT Sensor Connected
          </Badge>
        </div>
      </div>

      {/* Bin Title & Main Info Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="font-mono text-sm font-extrabold text-emerald-400">{bin.code}</span>
            <Badge className={
              bin.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40 font-mono text-xs' :
              bin.status === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40 font-mono text-xs' :
              'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 font-mono text-xs'
            }>
              {bin.status}
            </Badge>
          </div>
          <h2 className="text-2xl font-extrabold text-white">{bin.name}</h2>
          <p className="text-xs text-slate-400 flex items-center gap-1.5 mt-1">
            <MapPin className="w-3.5 h-3.5 text-emerald-400" />
            <span>{bin.zone} — Coordinates: [{bin.lat}° N, {bin.lng}° E]</span>
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Button
            onClick={handleSimulateFull}
            className="bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs gap-1.5 rounded-xl"
          >
            <Zap className="w-3.5 h-3.5" />
            <span>Simulate Overflow (95.5%)</span>
          </Button>
          <Link
            to="/routes"
            className="px-4 py-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center gap-1.5 shadow-[0_0_15px_rgba(16,185,129,0.3)]"
          >
            <Truck className="w-3.5 h-3.5" />
            <span>Dispatch Route</span>
          </Link>
        </div>
      </div>

      {/* Main Grid: Telemetry Gauges + Prediction & Compartment Info */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Fill Gauge Card */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between items-center text-center">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase w-full text-left mb-4">LIVE ULTRASONIC FILL GAUGE</h3>

          {/* Large Circular Fill Visualizer */}
          <div className="relative w-44 h-44 flex items-center justify-center my-2">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="42" stroke="#0f291e" strokeWidth="8" fill="none" />
              <circle
                cx="50"
                cy="50"
                r="42"
                stroke={simulatedFill > 90 ? '#ef4444' : simulatedFill > 70 ? '#f59e0b' : '#10b981'}
                strokeWidth="8"
                strokeDasharray="263.89"
                strokeDashoffset={263.89 - (263.89 * simulatedFill) / 100}
                strokeLinecap="round"
                fill="none"
                className="transition-all duration-1000"
              />
            </svg>
            <div className="absolute inset-0 flex flex-col items-center justify-center font-mono">
              <span className="text-4xl font-extrabold text-white">{simulatedFill}%</span>
              <span className="text-[10px] text-slate-400 uppercase">CAPACITY</span>
            </div>
          </div>

          <div className="w-full pt-4 border-t border-slate-800 text-xs font-mono flex items-center justify-between text-slate-400">
            <span>HC-SR04 Sensor Distance:</span>
            <span className="text-emerald-400 font-bold">{Math.round(40 - (40 * simulatedFill) / 100)} cm</span>
          </div>
        </Card>

        {/* Telemetry Metrics & Battery */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">IOT SENSOR TELEMETRY</h3>

          <div className="space-y-3 my-2">
            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Weight className="w-4 h-4 text-emerald-400" />
                <span className="text-xs text-slate-300 font-semibold">Load Cell Weight</span>
              </div>
              <span className="text-base font-extrabold text-white font-mono">{bin.weightKg} kg</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Thermometer className="w-4 h-4 text-amber-400" />
                <span className="text-xs text-slate-300 font-semibold">Internal Temperature</span>
              </div>
              <span className="text-base font-extrabold text-amber-400 font-mono">{bin.tempC}°C</span>
            </div>

            <div className="p-3.5 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Zap className="w-4 h-4 text-sky-400" />
                <span className="text-xs text-slate-300 font-semibold">Solar Li-Ion Battery</span>
              </div>
              <span className="text-base font-extrabold text-sky-400 font-mono">{bin.battery}%</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/20 text-xs text-emerald-300">
            🟢 <strong>Connectivity Status:</strong> ESP32 WiFi Signal -64 dBm (Stable).
          </div>
        </Card>

        {/* AI Overflow Forecast & SWM Stream */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl p-6 flex flex-col justify-between">
          <h3 className="text-xs font-mono font-bold text-slate-400 uppercase mb-2">AI OVERFLOW FORECASTING</h3>

          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 space-y-2">
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Estimated Overflow:</span>
              <span className="font-mono font-bold text-rose-400">In 2.4 Hours</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">Growth Rate:</span>
              <span className="font-mono text-emerald-400">+5.2% / hour</span>
            </div>
            <div className="flex justify-between text-xs">
              <span className="text-slate-400">SWM 2026 Compartment:</span>
              <span className="font-bold text-white">{bin.category}</span>
            </div>
          </div>

          <div className="p-3 rounded-2xl bg-emerald-950/40 border border-emerald-500/30 text-xs text-slate-300 space-y-1">
            <span className="font-mono text-[10px] text-emerald-400 font-bold uppercase">Servo Motor Angle</span>
            <p className="font-mono font-bold text-white text-sm">45° Flap (Wet Stream Activated)</p>
          </div>

          <div className="pt-2">
            <Link
              to="/ai-detection"
              className="w-full py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl flex items-center justify-center gap-1.5 shadow-md"
            >
              <span>Test AI Camera Classification</span>
            </Link>
          </div>
        </Card>
      </div>
    </div>
  )
}
