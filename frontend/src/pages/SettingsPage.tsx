import React, { useState } from 'react'
import { Settings, ShieldCheck, Sliders, Save, CheckCircle2, MapPin, Crosshair, Map } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

export const SettingsPage: React.FC = () => {
  const [criticalThreshold, setCriticalThreshold] = useState(90)
  const [warningThreshold, setWarningThreshold] = useState(75)
  const [autoLocate, setAutoLocate] = useState<boolean>(() => {
    return localStorage.getItem('clearnova_auto_locate') === 'true'
  })
  const [saved, setSaved] = useState(false)

  const handleSave = () => {
    localStorage.setItem('clearnova_auto_locate', String(autoLocate))
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="space-y-6 font-sans select-none pb-12">
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <Settings className="w-4 h-4 text-emerald-400" />
            <span>Platform Rule Engine & UI Settings</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">System Settings & Map Configuration</h2>
          <p className="text-sm text-slate-300">Configure GIS Map current location preferences and SWM 2026 rule parameters.</p>
        </div>

        <Button onClick={handleSave} className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]">
          <Save className="w-4 h-4" />
          <span>{saved ? 'Saved Successfully!' : 'Save Configuration'}</span>
        </Button>
      </div>



      {/* GIS MAP & CURRENT LOCATION SETTINGS CARD */}
      <Card className="glass-panel border-sky-500/30 rounded-3xl p-6">
        <div className="mb-4">
          <h3 className="text-base font-extrabold text-white flex items-center gap-2">
            <Map className="w-5 h-5 text-sky-400" />
            <span>GIS Map & Location Settings</span>
          </h3>
          <p className="text-xs text-slate-400">Configure map location options and device GPS auto-detection.</p>
        </div>

        <div className="space-y-4">
          <div className="p-4 rounded-2xl bg-slate-950 border border-slate-800 flex items-center justify-between">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-bold text-white text-sm">
                <Crosshair className="w-4 h-4 text-sky-400" />
                <span>Default Map Location Setting</span>
              </div>
              <p className="text-xs text-slate-400">Automatically acquire device GPS and fly-to user's current location when opening the map.</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input
                type="checkbox"
                checked={autoLocate}
                onChange={(e) => {
                  setAutoLocate(e.target.checked)
                  localStorage.setItem('clearnova_auto_locate', String(e.target.checked))
                }}
                className="sr-only peer"
              />
              <div className="w-11 h-6 bg-slate-800 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-slate-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-sky-500" />
            </label>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <Card className="glass-panel border-emerald-500/20 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base text-white">Bin Threshold Triggers</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Configure capacity thresholds for automatic task creation</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Critical Breach Threshold (%):</span>
                <span className="font-mono text-rose-400 font-bold">{criticalThreshold}%</span>
              </div>
              <input
                type="range"
                min="80"
                max="98"
                value={criticalThreshold}
                onChange={(e) => setCriticalThreshold(Number(e.target.value))}
                className="w-full accent-rose-500 bg-slate-950"
              />
            </div>

            <div className="space-y-2">
              <div className="flex justify-between">
                <span className="text-slate-300">Warning Threshold (%):</span>
                <span className="font-mono text-amber-400 font-bold">{warningThreshold}%</span>
              </div>
              <input
                type="range"
                min="60"
                max="85"
                value={warningThreshold}
                onChange={(e) => setWarningThreshold(Number(e.target.value))}
                className="w-full accent-amber-500 bg-slate-950"
              />
            </div>
          </CardContent>
        </Card>

        <Card className="glass-panel border-emerald-500/20 rounded-3xl">
          <CardHeader>
            <CardTitle className="text-base text-white">SWM 2026 Compliance Mode</CardTitle>
            <CardDescription className="text-slate-400 text-xs">Regulatory Framework Flags</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            <div className="p-3 rounded-xl bg-emerald-950/40 border border-emerald-500/30 flex items-center justify-between">
              <span className="text-white font-bold">Mandatory 4-Stream Source Segregation:</span>
              <span className="font-mono text-emerald-400 font-bold">ENABLED</span>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between">
              <span className="text-slate-300">AI Uncertainty Rejection Threshold:</span>
              <span className="font-mono text-emerald-400">0.60 Entropy</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
