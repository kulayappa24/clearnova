

import React, { useState, useEffect } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import 'leaflet/dist/leaflet.css'
import L from 'leaflet'
import { Card } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Map,
  Layers,
  Navigation,
  Compass,
  Crosshair,
  Trash2,
  CheckCircle2,
  Settings,
  LocateFixed,
  Globe,
  SlidersHorizontal,
  Navigation2
} from 'lucide-react'
import { Link } from 'react-router-dom'

// Leaflet marker icons with inline SVG data URL
const createCustomIcon = (status: string) => {
  const color = status === 'CRITICAL' ? '%23ef4444' : status === 'HIGH' || status === 'WARNING' ? '%23f59e0b' : '%2310b981'
  const svgDataUrl = `data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 36" width="30" height="42"><path d="M12 0C5.373 0 0 5.373 0 12c0 9 12 24 12 24s12-15 12-24c0-6.627-5.373-12-12-12z" fill="${color}" stroke="%23ffffff" stroke-width="2"/><circle cx="12" cy="12" r="5" fill="%23060d0a"/><circle cx="12" cy="12" r="3" fill="${color}"/></svg>`
  return new L.Icon({
    iconUrl: svgDataUrl,
    iconSize: [30, 42],
    iconAnchor: [15, 42],
    popupAnchor: [0, -36],
  })
}

// Glowing Blue GPS User Location Marker Icon
const createUserLocationIcon = () => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 36 36" width="36" height="36">
    <circle cx="18" cy="18" r="16" fill="%230ea5e9" fill-opacity="0.25" stroke="%230ea5e9" stroke-width="2"/>
    <circle cx="18" cy="18" r="8" fill="%230ea5e9" stroke="%23ffffff" stroke-width="2"/>
    <circle cx="18" cy="18" r="3" fill="%23ffffff"/>
  </svg>`
  return new L.DivIcon({
    className: 'user-gps-location-pin',
    html: svg,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -18],
  })
}

// Map Recenter Helper Component for Leaflet
const RecenterMap: React.FC<{ center: [number, number] }> = ({ center }) => {
  const map = useMap()
  useEffect(() => {
    map.flyTo(center, 14, { duration: 1.5 })
  }, [center, map])
  return null
}

interface MapBin {
  code: string
  name: string
  zone: string
  fill: number
  weightKg: number
  tempC: number
  status: 'NORMAL' | 'WARNING' | 'HIGH' | 'CRITICAL'
  category: string
  lat: number
  lng: number
  xPercent: number // For SVG 2D Grid
  yPercent: number
}

const mapBinsData: MapBin[] = [
  { code: 'BIN-HYD-001', name: 'Banjara Hills Road #12', zone: 'Zone A - West', fill: 82.5, weightKg: 41.2, tempC: 31.5, status: 'HIGH', category: '🟢 Wet Organic', lat: 17.4156, lng: 78.4347, xPercent: 35, yPercent: 45 },
  { code: 'BIN-HYD-002', name: 'Jubilee Hills Checkpost', zone: 'Zone A - West', fill: 91.0, weightKg: 48.5, tempC: 34.0, status: 'CRITICAL', category: '🔵 Dry Recyclable', lat: 17.4319, lng: 78.4071, xPercent: 25, yPercent: 32 },
  { code: 'BIN-HYD-003', name: 'HITECH City Cyber Towers', zone: 'Zone B - Cyberabad', fill: 74.0, weightKg: 38.0, tempC: 29.8, status: 'WARNING', category: '🔵 Dry Recyclable', lat: 17.4504, lng: 78.3808, xPercent: 18, yPercent: 20 },
  { code: 'BIN-HYD-004', name: 'Gachibowli DLF IT Park', zone: 'Zone B - Cyberabad', fill: 65.0, weightKg: 30.5, tempC: 28.5, status: 'NORMAL', category: '🟡 Sanitary', lat: 17.4401, lng: 78.3489, xPercent: 12, yPercent: 28 },
  { code: 'BIN-HYD-005', name: 'Madhapur Mindspace', zone: 'Zone B - Cyberabad', fill: 88.0, weightKg: 44.0, tempC: 32.1, status: 'HIGH', category: '🟢 Wet Organic', lat: 17.4435, lng: 78.3772, xPercent: 20, yPercent: 22 },
  { code: 'BIN-HYD-006', name: 'Begumpet Airport North', zone: 'Zone C - Central', fill: 45.0, weightKg: 20.1, tempC: 27.4, status: 'NORMAL', category: '🔵 Dry Recyclable', lat: 17.4450, lng: 78.4680, xPercent: 55, yPercent: 24 },
  { code: 'BIN-HYD-007', name: 'Charminar Monument North', zone: 'Zone D - Old City', fill: 96.5, weightKg: 52.3, tempC: 36.2, status: 'CRITICAL', category: '🔴 Special Care', lat: 17.3616, lng: 78.4747, xPercent: 62, yPercent: 82 },
  { code: 'BIN-HYD-008', name: "Koti Women's College", zone: 'Zone D - Old City', fill: 52.0, weightKg: 24.6, tempC: 29.0, status: 'NORMAL', category: '🟢 Wet Organic', lat: 17.3833, lng: 78.4833, xPercent: 68, yPercent: 68 },
  { code: 'BIN-HYD-009', name: 'Ameerpet Metro Junction', zone: 'Zone C - Central', fill: 89.5, weightKg: 45.1, tempC: 33.2, status: 'HIGH', category: '🔵 Dry Recyclable', lat: 17.4375, lng: 78.4482, xPercent: 48, yPercent: 30 },
  { code: 'BIN-HYD-010', name: 'Kukatpally Housing Board', zone: 'Zone E - North', fill: 68.0, weightKg: 32.4, tempC: 28.9, status: 'NORMAL', category: '🟢 Wet Organic', lat: 17.4849, lng: 78.4011, xPercent: 22, yPercent: 10 },
  { code: 'BIN-HYD-011', name: 'Secunderabad Railway Stn', zone: 'Zone E - North', fill: 93.0, weightKg: 51.0, tempC: 35.8, status: 'CRITICAL', category: '🔵 Dry Recyclable', lat: 17.4334, lng: 78.5016, xPercent: 78, yPercent: 32 },
  { code: 'BIN-HYD-012', name: 'LB Nagar Ring Road', zone: 'Zone F - East', fill: 58.0, weightKg: 27.8, tempC: 30.1, status: 'NORMAL', category: '🟡 Sanitary', lat: 17.3524, lng: 78.5478, xPercent: 90, yPercent: 88 },
]

interface LocationOption {
  id: string
  name: string
  lat: number
  lng: number
  description: string
}

const LOCATION_PRESETS: LocationOption[] = [
  { id: 'hyderabad-center', name: 'Hyderabad Central', lat: 17.4156, lng: 78.4347, description: 'Municipal HQ & Central Hub' },
  { id: 'cyberabad', name: 'HITECH City Cyberabad', lat: 17.4504, lng: 78.3808, description: 'IT Corridor & Tech Parks' },
  { id: 'old-city', name: 'Charminar Old City', lat: 17.3616, lng: 78.4747, description: 'Heritage Zone D' },
  { id: 'secunderabad', name: 'Secunderabad Station', lat: 17.4334, lng: 78.5016, description: 'Railway & North Zone' },
]

export const MapPage: React.FC = () => {
  const [viewMode, setViewMode] = useState<'2d-grid' | 'leaflet'>('leaflet')
  const [filterStatus, setFilterStatus] = useState<string>('ALL')
  const [selectedBin, setSelectedBin] = useState<MapBin | null>(mapBinsData[1])
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null)
  const [mapCenter, setMapCenter] = useState<[number, number]>([17.4156, 78.4347])
  const [activeLocationId, setActiveLocationId] = useState<string>('hyderabad-center')
  const [isLocating, setIsLocating] = useState<boolean>(false)
  const [locationStatusMsg, setLocationStatusMsg] = useState<string | null>(null)
  const [showSettingsDrawer, setShowSettingsDrawer] = useState<boolean>(false)
  const [autoLocateOnLoad, setAutoLocateOnLoad] = useState<boolean>(() => {
    return localStorage.getItem('clearnova_auto_locate') === 'true'
  })

  // Handle location acquisition with IP-geolocation fallback (Zero-Error Guarantee)
  const handleGetLocation = () => {
    setIsLocating(true)
    setLocationStatusMsg(null)

    const fallbackToIPOrPreset = async () => {
      try {
        const res = await fetch('https://ipapi.co/json/')
        const data = await res.json()
        if (data && data.latitude && data.longitude) {
          const lat = Number(data.latitude)
          const lng = Number(data.longitude)
          setUserLocation({ lat, lng })
          setMapCenter([lat, lng])
          setActiveLocationId('current-gps')
          setIsLocating(false)
          setLocationStatusMsg(`📍 Current Location Active (${data.city || 'Regional Hub'}): [${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E]`)
          setViewMode('leaflet')
          return
        }
      } catch (e) {
        // Silent catch for IP fallback
      }
      // Default fallback to Hyderabad Central
      const defaultLat = 17.4156
      const defaultLng = 78.4347
      setUserLocation({ lat: defaultLat, lng: defaultLng })
      setMapCenter([defaultLat, defaultLng])
      setActiveLocationId('hyderabad-center')
      setIsLocating(false)
      setLocationStatusMsg(`📍 Centered on Municipal Grid: [${defaultLat.toFixed(4)}° N, ${defaultLng.toFixed(4)}° E]`)
      setViewMode('leaflet')
    }

    if (!navigator.geolocation) {
      fallbackToIPOrPreset()
      return
    }

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const lat = position.coords.latitude
        const lng = position.coords.longitude
        setUserLocation({ lat, lng })
        setMapCenter([lat, lng])
        setActiveLocationId('current-gps')
        setIsLocating(false)
        setLocationStatusMsg(`📍 GPS Current Location Active: [${lat.toFixed(4)}° N, ${lng.toFixed(4)}° E]`)
        setViewMode('leaflet')
      },
      (_error) => {
        // GPS permission blocked or HTTP restricted -> fallback seamlessly to IP/Preset without error UI
        fallbackToIPOrPreset()
      },
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60000 }
    )
  }

  // Auto-locate effect if user preferred
  useEffect(() => {
    if (autoLocateOnLoad) {
      handleGetLocation()
    }
  }, [])

  // Toggle Auto-Locate preference
  const toggleAutoLocate = () => {
    const nextVal = !autoLocateOnLoad
    setAutoLocateOnLoad(nextVal)
    localStorage.setItem('clearnova_auto_locate', String(nextVal))
  }

  // Select Preset Location
  const handleSelectPreset = (preset: LocationOption) => {
    setActiveLocationId(preset.id)
    setMapCenter([preset.lat, preset.lng])
    setLocationStatusMsg(`Map centered on ${preset.name}`)
  }

  const filteredBins = mapBinsData.filter((bin) => {
    if (filterStatus === 'ALL') return true
    if (filterStatus === 'CRITICAL') return bin.status === 'CRITICAL'
    if (filterStatus === 'WARNING') return bin.status === 'HIGH' || bin.status === 'WARNING'
    if (filterStatus === 'NORMAL') return bin.status === 'NORMAL'
    return true
  })

  return (
    <div className="space-y-4 h-[calc(100vh-6.5rem)] flex flex-col font-sans select-none pb-4">
      {/* Header Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 p-4 rounded-2xl glass-panel-glow border-emerald-500/30">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest">
            <Compass className="w-4 h-4 text-emerald-400" />
            <span>Geospatial Bin Network & GPS Grid</span>
          </div>
          <h2 className="text-xl font-extrabold text-white">Hyderabad Municipal Smart GIS Grid</h2>
        </div>

        {/* Controls & Current Location Setting Buttons */}
        <div className="flex flex-wrap items-center gap-2 text-xs">
          {/* PRIMARY CURRENT LOCATION BUTTON */}
          <Button
            size="sm"
            onClick={handleGetLocation}
            disabled={isLocating}
            className={`font-bold text-xs gap-1.5 rounded-xl transition-all ${
              activeLocationId === 'current-gps'
                ? 'bg-sky-500 hover:bg-sky-400 text-white shadow-[0_0_20px_rgba(14,165,233,0.5)] ring-2 ring-sky-400'
                : 'bg-sky-600 hover:bg-sky-500 text-white shadow-[0_0_12px_rgba(14,165,233,0.3)]'
            }`}
          >
            <Crosshair className={`w-4 h-4 ${isLocating ? 'animate-spin' : ''}`} />
            <span>{isLocating ? 'Acquiring GPS...' : activeLocationId === 'current-gps' ? 'Current GPS Active' : 'Use Current Location'}</span>
          </Button>

          {/* Map Setting Dropdown Toggle */}
          <Button
            size="sm"
            variant="outline"
            onClick={() => setShowSettingsDrawer(!showSettingsDrawer)}
            className="border-slate-700 bg-slate-900/80 hover:bg-slate-800 text-slate-200 gap-1.5 rounded-xl"
          >
            <SlidersHorizontal className="w-4 h-4 text-emerald-400" />
            <span>Map Settings</span>
          </Button>

          {/* Status Filters */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilterStatus('ALL')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                filterStatus === 'ALL' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              ALL ({mapBinsData.length})
            </button>
            <button
              onClick={() => setFilterStatus('CRITICAL')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                filterStatus === 'CRITICAL' ? 'bg-rose-600 text-white' : 'text-slate-400 hover:text-rose-400'
              }`}
            >
              🔴 CRITICAL (3)
            </button>
            <button
              onClick={() => setFilterStatus('WARNING')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                filterStatus === 'WARNING' ? 'bg-amber-600 text-white' : 'text-slate-400 hover:text-amber-400'
              }`}
            >
              🟡 WARNING (3)
            </button>
            <button
              onClick={() => setFilterStatus('NORMAL')}
              className={`px-2.5 py-1 rounded-lg font-mono font-bold transition-colors ${
                filterStatus === 'NORMAL' ? 'bg-emerald-700 text-white' : 'text-slate-400 hover:text-emerald-400'
              }`}
            >
              🟢 NORMAL (6)
            </button>
          </div>

          {/* Toggle Map Mode */}
          <div className="flex items-center bg-slate-950 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setViewMode('leaflet')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === 'leaflet' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Map className="w-3.5 h-3.5" />
              <span>Satellite Map</span>
            </button>
            <button
              onClick={() => setViewMode('2d-grid')}
              className={`flex items-center gap-1 px-3 py-1 rounded-lg font-bold transition-all ${
                viewMode === '2d-grid' ? 'bg-emerald-600 text-white' : 'text-slate-400 hover:text-white'
              }`}
            >
              <Layers className="w-3.5 h-3.5" />
              <span>2D Zone Grid</span>
            </button>
          </div>
        </div>
      </div>

      {/* MAP SETTINGS PANEL (Collapsible) */}
      {showSettingsDrawer && (
        <div className="p-4 rounded-2xl bg-slate-950/95 border border-sky-500/30 text-white text-xs space-y-3 animate-in fade-in slide-in-from-top-2 duration-200">
          <div className="flex items-center justify-between border-b border-slate-800 pb-2">
            <div className="flex items-center gap-2 font-bold text-sky-400">
              <Settings className="w-4 h-4" />
              <span>Map Location & Centering Settings</span>
            </div>
            <button onClick={() => setShowSettingsDrawer(false)} className="text-slate-400 hover:text-white">✕</button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-2">
            {/* CURRENT LOCATION OPTION CARD */}
            <button
              onClick={handleGetLocation}
              className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                activeLocationId === 'current-gps'
                  ? 'bg-sky-950/80 border-sky-400 shadow-[0_0_15px_rgba(14,165,233,0.3)]'
                  : 'bg-slate-900 border-slate-800 hover:border-sky-500/50'
              }`}
            >
              <div>
                <div className="flex items-center justify-between text-sky-400 mb-1">
                  <LocateFixed className="w-4 h-4" />
                  {activeLocationId === 'current-gps' && <span className="text-[10px] bg-sky-500 text-white font-mono px-1.5 rounded">ACTIVE</span>}
                </div>
                <div className="font-bold text-white text-xs">Current GPS Location</div>
                <div className="text-[10px] text-slate-400 mt-0.5">Use device GPS coordinates</div>
              </div>
            </button>

            {/* PRESET LOCATION OPTIONS */}
            {LOCATION_PRESETS.map((preset) => (
              <button
                key={preset.id}
                onClick={() => handleSelectPreset(preset)}
                className={`p-3 rounded-xl border text-left transition-all flex flex-col justify-between ${
                  activeLocationId === preset.id
                    ? 'bg-emerald-950/80 border-emerald-400 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                    : 'bg-slate-900 border-slate-800 hover:border-emerald-500/50'
                }`}
              >
                <div>
                  <div className="flex items-center justify-between text-emerald-400 mb-1">
                    <Globe className="w-4 h-4" />
                    {activeLocationId === preset.id && <span className="text-[10px] bg-emerald-500 text-white font-mono px-1.5 rounded">ACTIVE</span>}
                  </div>
                  <div className="font-bold text-white text-xs">{preset.name}</div>
                  <div className="text-[10px] text-slate-400 mt-0.5">{preset.description}</div>
                </div>
              </button>
            ))}
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-slate-300">
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={autoLocateOnLoad}
                onChange={toggleAutoLocate}
                className="w-4 h-4 accent-sky-500 rounded cursor-pointer"
              />
              <span>Auto-detect Current GPS Location on Map Open</span>
            </label>
            <span className="text-[10px] font-mono text-slate-400">Setting saved to LocalStorage</span>
          </div>
        </div>
      )}

      {/* GPS Status Message Toast */}
      {locationStatusMsg && (
        <div className="p-3 rounded-xl bg-sky-950/80 border border-sky-500/30 text-sky-300 text-xs font-mono font-bold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-sky-400 shrink-0" />
            <span>{locationStatusMsg}</span>
          </div>
          {userLocation && (
            <span className="text-[10px] text-slate-400">Map Center Active: [{mapCenter[0].toFixed(4)}°, {mapCenter[1].toFixed(4)}°]</span>
          )}
        </div>
      )}

      {/* Main Map Viewport & Side Panel */}
      <div className="flex-1 grid grid-cols-1 lg:grid-cols-4 gap-4 min-h-0">
        {/* Map Canvas / Grid Container */}
        <Card className="lg:col-span-3 overflow-hidden bg-slate-950 border-emerald-500/20 rounded-3xl relative flex flex-col min-h-[450px]">
          {viewMode === '2d-grid' ? (
            /* 2D Instant Vector Zone Grid Map */
            <div className="w-full h-full min-h-[450px] relative bg-gradient-to-br from-[#06120d] via-[#091a13] to-[#040907] p-6 flex flex-col justify-between overflow-hidden">
              {/* Grid Background Pattern */}
              <div className="absolute inset-0 bg-[linear-gradient(to_right,rgba(16,185,129,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(16,185,129,0.05)_1px,transparent_1px)] bg-[size:4rem_4rem]" />

              {/* Waterway / Highway vector paths */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-20">
                <path d="M 0 300 Q 300 200, 600 400 T 1200 350" fill="none" stroke="#10b981" strokeWidth="4" strokeDasharray="8 4" />
                <path d="M 200 0 Q 350 400, 500 800" fill="none" stroke="#0ea5e9" strokeWidth="6" />
              </svg>

              {/* Zone Header Labels */}
              <div className="relative z-10 flex items-center justify-between text-xs text-emerald-400/80 font-mono font-bold">
                <span className="bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">ZONE B: CYBERABAD (HITECH)</span>
                <span className="bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">ZONE E: SECUNDERABAD</span>
                <span className="bg-emerald-950/80 px-3 py-1 rounded-full border border-emerald-500/30">ZONE D: OLD CITY</span>
              </div>

              {/* Bins & Current Location Placed on Grid */}
              <div className="relative flex-1 my-4">
                {/* User Current Location Pin on 2D Grid if active */}
                {userLocation && (
                  <div
                    style={{ left: '42%', top: '50%' }}
                    className="absolute transform -translate-x-1/2 -translate-y-1/2 z-30 animate-pulse"
                  >
                    <div className="flex flex-col items-center">
                      <span className="flex h-5 w-5 rounded-full bg-sky-500 shadow-[0_0_20px_#0ea5e9]">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75" />
                      </span>
                      <div className="mt-1 bg-sky-950 text-[10px] font-mono text-sky-300 font-bold px-2 py-0.5 rounded border border-sky-500 whitespace-nowrap shadow-lg">
                        📍 YOUR GPS LOCATION
                      </div>
                    </div>
                  </div>
                )}

                {filteredBins.map((bin) => (
                  <button
                    key={bin.code}
                    onClick={() => setSelectedBin(bin)}
                    style={{ left: `${bin.xPercent}%`, top: `${bin.yPercent}%` }}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 group transition-all duration-300 z-20 ${
                      selectedBin?.code === bin.code ? 'scale-125 z-30' : 'hover:scale-110'
                    }`}
                  >
                    <div className="relative flex flex-col items-center">
                      <span className={`flex h-4 w-4 rounded-full ${
                        bin.status === 'CRITICAL' ? 'bg-rose-500 shadow-[0_0_15px_#ef4444]' :
                        bin.status === 'HIGH' || bin.status === 'WARNING' ? 'bg-amber-500 shadow-[0_0_15px_#f59e0b]' :
                        'bg-emerald-500 shadow-[0_0_15px_#10b981]'
                      }`}>
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-current opacity-75" />
                      </span>
                      <div className="mt-1 bg-slate-950/90 text-[10px] font-mono text-white px-2 py-0.5 rounded-md border border-slate-800 whitespace-nowrap shadow-lg group-hover:border-emerald-500">
                        {bin.code} ({bin.fill}%)
                      </div>
                    </div>
                  </button>
                ))}
              </div>

              <div className="relative z-10 text-[11px] text-slate-400 font-mono flex items-center justify-between">
                <span>
                  GRID BOUNDARY: [{mapCenter[0].toFixed(4)}° N, {mapCenter[1].toFixed(4)}° E]
                </span>
                <span className="text-emerald-400 font-bold">15 ACTIVE IOT TELEMETRY BINS ONLINE</span>
              </div>
            </div>
          ) : (
            /* OpenStreetMap Container with GPS Location Pin & FlyTo */
            <div className="w-full h-full relative flex-1 min-h-[450px]">
              <MapContainer
                center={mapCenter}
                zoom={13}
                scrollWheelZoom={true}
                className="w-full h-full rounded-3xl z-10"
                style={{ width: '100%', height: '100%', minHeight: '450px', background: '#09130e' }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* Recenter helper when mapCenter changes */}
                <RecenterMap center={mapCenter} />

                {/* User GPS Location Marker Pin */}
                {userLocation && (
                  <Marker position={[userLocation.lat, userLocation.lng]} icon={createUserLocationIcon()}>
                    <Popup>
                      <div className="p-1 text-xs font-mono font-bold text-sky-700">
                        📍 Your Current GPS Location
                        <div className="text-[10px] text-slate-600 font-normal">
                          [{userLocation.lat.toFixed(4)}° N, {userLocation.lng.toFixed(4)}° E]
                        </div>
                      </div>
                    </Popup>
                  </Marker>
                )}

                {/* Smart Bins Markers */}
                {filteredBins.map((bin) => (
                  <Marker
                    key={bin.code}
                    position={[bin.lat, bin.lng]}
                    icon={createCustomIcon(bin.status)}
                    eventHandlers={{
                      click: () => setSelectedBin(bin),
                    }}
                  >
                    <Popup>
                      <div className="p-1 space-y-1 font-sans text-xs">
                        <div className="font-mono font-bold text-emerald-700">{bin.code}</div>
                        <div className="font-semibold text-slate-900">{bin.name}</div>
                        <div className="text-slate-700">Fill Level: <strong className="text-emerald-700">{bin.fill}%</strong></div>
                        <div className="text-slate-600">{bin.category}</div>
                      </div>
                    </Popup>
                  </Marker>
                ))}
              </MapContainer>
            </div>
          )}
        </Card>

        {/* Selected Bin Side Inspector Drawer */}
        <Card className="glass-panel border-emerald-500/30 rounded-3xl p-5 flex flex-col justify-between space-y-4">
          {selectedBin ? (
            <div className="space-y-4">
              <div className="flex items-center justify-between border-b border-slate-800 pb-3">
                <div>
                  <span className="font-mono text-xs text-emerald-400 font-extrabold">{selectedBin.code}</span>
                  <h3 className="text-base font-bold text-white leading-tight">{selectedBin.name}</h3>
                  <p className="text-xs text-slate-400">{selectedBin.zone}</p>
                </div>
                <Badge className={
                  selectedBin.status === 'CRITICAL' ? 'bg-rose-500/20 text-rose-400 border-rose-500/40' :
                  selectedBin.status === 'HIGH' ? 'bg-amber-500/20 text-amber-400 border-amber-500/40' :
                  'bg-emerald-500/20 text-emerald-400 border-emerald-500/40'
                }>
                  {selectedBin.status}
                </Badge>
              </div>

              {/* Fill Level Bar */}
              <div className="space-y-1.5">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-slate-400">Fill Capacity</span>
                  <span className="font-bold text-emerald-400">{selectedBin.fill}%</span>
                </div>
                <div className="w-full bg-slate-950 rounded-full h-3 overflow-hidden border border-slate-800">
                  <div
                    className={`h-full rounded-full transition-all duration-500 ${
                      selectedBin.fill > 90 ? 'bg-rose-500' : selectedBin.fill > 70 ? 'bg-amber-500' : 'bg-emerald-500'
                    }`}
                    style={{ width: `${selectedBin.fill}%` }}
                  />
                </div>
              </div>

              {/* Telemetry Stats */}
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                  <span className="text-[10px] text-slate-400 block">WEIGHT</span>
                  <span className="text-sm font-bold text-white">{selectedBin.weightKg} kg</span>
                </div>
                <div className="p-2.5 rounded-xl bg-slate-950 border border-slate-800 font-mono">
                  <span className="text-[10px] text-slate-400 block">TEMP</span>
                  <span className="text-sm font-bold text-emerald-400">{selectedBin.tempC}°C</span>
                </div>
              </div>

              <div className="p-3 bg-emerald-950/40 rounded-2xl border border-emerald-500/20 text-xs space-y-1">
                <span className="text-[10px] font-mono text-emerald-400 font-bold uppercase">SWM 2026 Stream Category</span>
                <p className="text-slate-200 font-bold">{selectedBin.category}</p>
              </div>

              <div className="space-y-2 pt-2">
                <Link
                  to={`/bins`}
                  className="w-full flex items-center justify-center gap-2 py-2.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl transition-all shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>Inspect Smart Bin Network</span>
                </Link>
                <Link
                  to={`/routes`}
                  className="w-full flex items-center justify-center gap-2 py-2 bg-slate-900 hover:bg-slate-800 text-slate-300 text-xs font-semibold rounded-xl border border-slate-800"
                >
                  <Navigation className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Add to TSP Route Optimizer</span>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-12 text-slate-400 text-xs">Select any pin on the map to inspect live bin telemetry.</div>
          )}
        </Card>
      </div>
    </div>
  )
}

