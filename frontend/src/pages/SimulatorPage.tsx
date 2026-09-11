import React, { useState } from 'react'
import { Sliders, Sparkles, AlertTriangle, Play, RefreshCw, Zap, CheckCircle2 } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label'

export const SimulatorPage: React.FC = () => {
  const [selectedBin, setSelectedBin] = useState('BIN-HYD-001')
  const [simFillLevel, setSimFillLevel] = useState(95)
  const [simWeight, setSimWeight] = useState(45.0)
  const [simTemp, setSimTemp] = useState(32.0)
  const [statusMessage, setStatusMessage] = useState('')
  const [isSimulating, setIsSimulating] = useState(false)

  const handleSimulateFill = () => {
    setIsSimulating(true)
    setStatusMessage('')
    setTimeout(() => {
      setIsSimulating(false)
      setStatusMessage(`Successfully simulated fill level update for ${selectedBin}: ${simFillLevel}% fill, ${simWeight}kg weight. Backend triggered alert event.`)
    }, 800)
  }

  const handleSimulateRandomTelemetry = () => {
    setIsSimulating(true)
    setStatusMessage('')
    setTimeout(() => {
      setIsSimulating(false)
      setStatusMessage(`Published random telemetry batch across all 15 smart bins via MQTT. Check Dashboard live feed!`)
    }, 1000)
  }

  return (
    <div className="space-y-6 font-sans">
      {/* Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-amber-950 via-slate-900 to-slate-900 border border-amber-500/30 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-semibold uppercase tracking-wider mb-1">
            <Sliders className="w-4 h-4" />
            <span>Interactive Demo & Control Panel</span>
          </div>
          <h2 className="text-2xl font-bold text-white">Hardware & Telemetry Simulator</h2>
          <p className="text-sm text-slate-300">Simulation control panel allowing administrators to test hardware failure modes, MQTT telemetry, and threshold triggers.</p>
        </div>
      </div>

      {statusMessage && (
        <div className="p-4 bg-emerald-500/10 border border-emerald-500/30 rounded-xl text-emerald-400 text-xs flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4 shrink-0" />
          <span>{statusMessage}</span>
        </div>
      )}

      {/* Simulator Controls */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bin Telemetry Override Card */}
        <Card className="bg-slate-900 border-slate-800">
          <CardHeader>
            <CardTitle className="text-base text-white">Simulate Bin Fill Level Breach</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Manually inject distance/fill level readings to trigger threshold alerts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label className="text-xs text-slate-300">Target Smart Bin</Label>
              <select
                value={selectedBin}
                onChange={(e) => setSelectedBin(e.target.value)}
                className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
              >
                <option value="BIN-HYD-001">BIN-HYD-001 - Banjara Hills Road #12</option>
                <option value="BIN-HYD-002">BIN-HYD-002 - Jubilee Hills Checkpost</option>
                <option value="BIN-HYD-007">BIN-HYD-007 - Charminar Monument North</option>
                <option value="BIN-HYD-011">BIN-HYD-011 - Secunderabad Railway Station</option>
              </select>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">Fill Level Override:</span>
                <span className="font-mono text-amber-400 font-bold">{simFillLevel}%</span>
              </div>
              <input
                type="range"
                min="0"
                max="100"
                value={simFillLevel}
                onChange={(e) => setSimFillLevel(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950"
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">Payload Weight (kg)</Label>
                <input
                  type="number"
                  value={simWeight}
                  onChange={(e) => setSimWeight(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
              <div className="space-y-1">
                <Label className="text-xs text-slate-400">Temperature (°C)</Label>
                <input
                  type="number"
                  value={simTemp}
                  onChange={(e) => setSimTemp(Number(e.target.value))}
                  className="w-full p-2 bg-slate-950 border border-slate-800 rounded-lg text-xs text-white"
                />
              </div>
            </div>

            <Button
              onClick={handleSimulateFill}
              disabled={isSimulating}
              className="w-full bg-amber-600 hover:bg-amber-500 text-slate-950 font-bold gap-2"
            >
              {isSimulating ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Play className="w-4 h-4 fill-current" />}
              <span>Trigger Telemetry Event</span>
            </Button>
          </CardContent>
        </Card>

        {/* Global MQTT Network Actions */}
        <Card className="bg-slate-900 border-slate-800 flex flex-col justify-between">
          <CardHeader>
            <CardTitle className="text-base text-white">Grid-Wide Simulation Actions</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Simulate batch operations & network anomaly events</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 flex-1">
            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <Zap className="w-4 h-4 text-emerald-400" />
                <span>Publish Random MQTT Telemetry</span>
              </div>
              <p className="text-xs text-slate-400">Generates randomized realistic sensor noise across all 15 smart bins in the Hyderabad grid.</p>
              <Button
                onClick={handleSimulateRandomTelemetry}
                disabled={isSimulating}
                variant="outline"
                className="w-full border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10 text-xs"
              >
                Simulate 15 Bins Pulse
              </Button>
            </div>

            <div className="p-3 bg-slate-950 rounded-xl border border-slate-800 space-y-2">
              <div className="flex items-center gap-2 text-xs font-semibold text-slate-200">
                <AlertTriangle className="w-4 h-4 text-rose-400" />
                <span>Simulate Sensor Fault / Anomaly</span>
              </div>
              <p className="text-xs text-slate-400">Injects an out-of-range temperature (&gt;45°C) reading to trigger critical heat safety notifications.</p>
              <Button
                onClick={() => {
                  setSimTemp(48.5)
                  handleSimulateFill()
                }}
                disabled={isSimulating}
                variant="outline"
                className="w-full border-rose-500/40 text-rose-400 hover:bg-rose-500/10 text-xs"
              >
                Inject Heat Anomaly
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
