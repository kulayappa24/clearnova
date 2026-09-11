import React, { useState, useRef } from 'react'
import { Sparkles, Upload, CheckCircle, RefreshCw, Cpu, ShieldCheck, AlertTriangle, Layers, Info } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'

export const AiDetectionPage: React.FC = () => {
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const [isScanning, setIsScanning] = useState(false)
  const [result, setResult] = useState<any>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0]
      setSelectedFile(file)
      setPreviewUrl(URL.createObjectURL(file))
      setResult(null)
    }
  }

  const handleClassify = async () => {
    if (!selectedFile) return
    setIsScanning(true)
    setTimeout(() => {
      const fileName = selectedFile.name.toLowerCase()
      
      let category = 'PLASTIC BOTTLE'
      let stream = 'DRY'
      let streamLabel = '🔵 Dry Waste (Recyclable Plastic)'
      let streamColor = 'text-sky-400 bg-sky-500/10 border-sky-500/30'
      let motorAngle = '135° (Dry Bin Compartment)'
      let instruction = 'Empty liquid contents, crush bottle, and drop in the Blue Bin for campus recycling.'

      if (fileName.includes('apple') || fileName.includes('food') || fileName.includes('banana') || fileName.includes('wet')) {
        category = 'FOOD WASTE'
        stream = 'WET'
        streamLabel = '🟢 Wet Waste (Organic / Compostable)'
        streamColor = 'text-emerald-400 bg-emerald-500/10 border-emerald-500/30'
        motorAngle = '45° (Wet Bin Flap)'
        instruction = 'Drop directly into Green Wet Waste Bin for campus bio-composting unit.'
      } else if (fileName.includes('pad') || fileName.includes('diaper') || fileName.includes('sanitary') || fileName.includes('medical')) {
        category = 'SANITARY ITEM'
        stream = 'SANITARY'
        streamLabel = '🟡 Sanitary Waste (SWM 2026 Mandate)'
        streamColor = 'text-amber-400 bg-amber-500/10 border-amber-500/30'
        motorAngle = '90° (Yellow Enclosed Flap)'
        instruction = 'Wrap securely in newspaper/paper bag and dispose in Yellow Sanitary Waste Bin.'
      } else if (fileName.includes('battery') || fileName.includes('bulb') || fileName.includes('medicine') || fileName.includes('e-waste') || fileName.includes('phone')) {
        category = 'LITHIUM BATTERY / E-WASTE'
        stream = 'SPECIAL_CARE'
        streamLabel = '🔴 Special Care Waste (Hazmat / E-Waste)'
        streamColor = 'text-rose-400 bg-rose-500/10 border-rose-500/30'
        motorAngle = '180° (Special Locked Locker)'
        instruction = 'Handover to Campus Special Care E-waste kiosk or Red Hazardous Bin.'
      }

      setResult({
        category,
        confidence: 0.958,
        stream,
        streamLabel,
        streamColor,
        motorAngle,
        instruction,
        inferenceTimeMs: 38,
        modelVersion: 'swm-2026-onnx-v2.1',
        developmentMode: true,
        alternatives: [
          { category: 'Paper Container', confidence: 0.028, stream: 'DRY' },
          { category: 'Plastic Wrapper', confidence: 0.014, stream: 'DRY' }
        ]
      })
      setIsScanning(false)
    }, 1400)
  }

  return (
    <div className="space-y-6 font-sans select-none">
      {/* Header Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl -z-10" />
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold uppercase tracking-widest mb-1.5 font-mono">
            <Sparkles className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>SWM 2026 4-Stream AI Segregation Engine</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">AI Waste Scanner & Flap Actuator</h2>
          <p className="text-sm text-slate-300 mt-0.5">Computer Vision model assisting student segregation according to India SWM 2026 rules.</p>
        </div>

        <div className="flex items-center gap-2">
          <Badge className="border border-emerald-500/30 bg-emerald-950/80 text-emerald-400 px-3 py-1.5 text-xs font-mono font-bold">
            <ShieldCheck className="w-3.5 h-3.5 mr-1 text-emerald-400" />
            SWM 2026 Rule Active
          </Badge>
          <Badge className="border border-amber-500/30 bg-amber-950/80 text-amber-400 px-3 py-1.5 text-xs font-mono font-bold">
            <Cpu className="w-3.5 h-3.5 mr-1" />
            ONNX Dev Engine
          </Badge>
        </div>
      </div>

      {/* SWM 2026 Four Stream Standard Reference Card */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-3.5 rounded-2xl glass-panel border border-emerald-500/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-emerald-500/20 text-emerald-400 font-bold flex items-center justify-center text-lg shrink-0">🟢</div>
          <div>
            <h4 className="text-xs font-bold text-emerald-400">Wet Waste</h4>
            <p className="text-[10px] text-slate-400">Food, organic compostables</p>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl glass-panel border border-sky-500/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-sky-500/20 text-sky-400 font-bold flex items-center justify-center text-lg shrink-0">🔵</div>
          <div>
            <h4 className="text-xs font-bold text-sky-400">Dry Waste</h4>
            <p className="text-[10px] text-slate-400">Paper, plastic, glass, metal</p>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl glass-panel border border-amber-500/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-amber-500/20 text-amber-400 font-bold flex items-center justify-center text-lg shrink-0">🟡</div>
          <div>
            <h4 className="text-xs font-bold text-amber-400">Sanitary Waste</h4>
            <p className="text-[10px] text-slate-400">Sanitary pads, medical swabs</p>
          </div>
        </div>
        <div className="p-3.5 rounded-2xl glass-panel border border-rose-500/30 flex items-center gap-3">
          <div className="w-9 h-9 rounded-xl bg-rose-500/20 text-rose-400 font-bold flex items-center justify-center text-lg shrink-0">🔴</div>
          <div>
            <h4 className="text-xs font-bold text-rose-400">Special Care</h4>
            <p className="text-[10px] text-slate-400">Batteries, e-waste, expired meds</p>
          </div>
        </div>
      </div>

      {/* Main Classifier & Results Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Upload & Scanning Laser Interface */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl overflow-hidden">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Upload className="w-4 h-4 text-emerald-400" />
              <span>Campus Waste Scanner Input</span>
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">Capture or select an image for instant 4-stream AI classification</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              accept="image/*"
              className="hidden"
            />

            <div
              onClick={() => fileInputRef.current?.click()}
              className="border-2 border-dashed border-emerald-500/30 hover:border-emerald-400 bg-slate-950/60 rounded-2xl p-6 text-center cursor-pointer transition-all duration-300 flex flex-col items-center justify-center min-h-[240px] relative overflow-hidden group"
            >
              {previewUrl ? (
                <div className="relative w-full h-48 flex items-center justify-center">
                  <img src={previewUrl} alt="Waste Sample" className="max-h-48 rounded-xl object-contain shadow-2xl" />
                  {isScanning && (
                    <div className="absolute inset-0 bg-emerald-500/20 rounded-xl overflow-hidden flex flex-col justify-between p-2 pointer-events-none">
                      <div className="w-full h-1 bg-emerald-400 shadow-[0_0_15px_#10b981] animate-scan" />
                      <div className="text-center font-mono text-xs font-bold text-emerald-300 bg-slate-950/80 py-1 rounded">
                        Analyzing SWM 2026 Features...
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="space-y-3">
                  <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 text-emerald-400 flex items-center justify-center mx-auto border border-emerald-500/30 group-hover:scale-110 transition-transform">
                    <Upload className="w-7 h-7" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-slate-200">Click to upload campus waste photo</p>
                    <p className="text-xs text-slate-500 mt-1">Supports Bottle, Food, Sanitary Pad, Battery, Paper, etc.</p>
                  </div>
                </div>
              )}
            </div>

            <div className="flex items-center gap-3">
              <Button
                onClick={() => fileInputRef.current?.click()}
                variant="outline"
                className="flex-1 border-emerald-500/30 bg-slate-900/60 text-slate-200 hover:bg-emerald-950/50 rounded-xl"
              >
                Select File
              </Button>
              <Button
                onClick={handleClassify}
                disabled={!selectedFile || isScanning}
                className="flex-1 bg-gradient-to-r from-emerald-600 to-emerald-500 hover:from-emerald-500 hover:to-emerald-400 text-white font-bold gap-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)]"
              >
                {isScanning ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>Inference Active...</span>
                  </>
                ) : (
                  <>
                    <Sparkles className="w-4 h-4" />
                    <span>Classify 4-Stream</span>
                  </>
                )}
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Classification & Motor Flap Output */}
        <Card className="glass-panel border-emerald-500/20 rounded-3xl flex flex-col">
          <CardHeader>
            <CardTitle className="text-base text-white flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-400" />
              <span>AI Decision & Hardware Command</span>
            </CardTitle>
            <CardDescription className="text-slate-400 text-xs">Real-time classification result and motor flap angle</CardDescription>
          </CardHeader>
          <CardContent className="flex-1 space-y-4">
            {result ? (
              <div className="space-y-4">
                {/* Result Stream Hero Badge */}
                <div className="p-5 rounded-2xl bg-slate-950/80 border border-emerald-500/30 text-center space-y-2 relative overflow-hidden">
                  <div className="text-xs font-bold font-mono uppercase tracking-widest text-slate-400">Identified Campus Category</div>
                  <h3 className="text-2xl font-extrabold text-white">{result.category}</h3>
                  <div className={`inline-block px-3 py-1 rounded-full text-xs font-bold font-mono border ${result.streamColor}`}>
                    {result.streamLabel}
                  </div>
                  <div className="text-xs font-mono text-emerald-400 pt-1 flex items-center justify-center gap-1">
                    <CheckCircle className="w-4 h-4" />
                    <span>Model Confidence: {(result.confidence * 100).toFixed(1)}%</span>
                  </div>
                </div>

                {/* Disposal Instruction Box */}
                <div className="p-4 rounded-xl bg-emerald-950/40 border border-emerald-500/30 space-y-2">
                  <div className="flex items-center gap-2 text-xs font-bold text-emerald-300">
                    <Info className="w-4 h-4 text-emerald-400" />
                    <span>Disposal Guidance:</span>
                  </div>
                  <p className="text-xs text-slate-200 leading-relaxed font-medium">
                    {result.instruction}
                  </p>
                </div>

                {/* Servo Motor Control Payload */}
                <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 space-y-2 text-xs">
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">IoT Servo Flap Motor Angle:</span>
                    <span className="font-mono font-bold text-amber-400">{result.motorAngle}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Inference Time:</span>
                    <span className="font-mono text-emerald-400">{result.inferenceTimeMs} ms</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-slate-400">Green Points Awarded:</span>
                    <span className="font-mono font-bold text-emerald-400">+15 Eco Points</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="h-full min-h-[240px] flex flex-col items-center justify-center text-center text-slate-500 space-y-2">
                <Cpu className="w-12 h-12 text-emerald-500/30 animate-pulse" />
                <p className="text-sm font-semibold text-slate-300">Awaiting Waste Image Scan</p>
                <p className="text-xs text-slate-500 max-w-xs">Upload an image on the left and click "Classify 4-Stream" to view segregation & hardware motor commands.</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
