import React, { useState } from 'react'
import { MessageSquareWarning, Plus, Search, CheckCircle2, Clock, AlertTriangle, ShieldCheck, User, MapPin, Sparkles, Filter, Check, UserCheck, ShieldAlert } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

interface Ticket {
  id: string
  locationCategory: string
  locationDetail: string
  description: string
  priorityScore: number
  priorityLevel: 'CRITICAL' | 'HIGH' | 'MEDIUM' | 'LOW'
  status: 'REPORTED' | 'ASSIGNED' | 'IN_PROGRESS' | 'RESOLVED'
  reportedBy: string
  assignedStaff: string
  createdAt: string
  resolvedAt?: string
}

const mockTickets: Ticket[] = [
  {
    id: 'SAN-1025',
    locationCategory: 'CANTEEN',
    locationDetail: 'Central Canteen Dining Area Bin #3',
    description: 'Food spill near recycling point requiring immediate mop and bin clear.',
    priorityScore: 98.0,
    priorityLevel: 'CRITICAL',
    status: 'IN_PROGRESS',
    reportedBy: 'Rahul Verma (Faculty)',
    assignedStaff: 'Team 01 (Suresh & Sanitation Team)',
    createdAt: '15 mins ago',
  },
  {
    id: 'SAN-1024',
    locationCategory: 'WASHROOM',
    locationDetail: 'Block B - 2nd Floor Main Washroom',
    description: 'Soap dispenser empty and floor requires sanitization after heavy morning rush.',
    priorityScore: 92.5,
    priorityLevel: 'HIGH',
    status: 'ASSIGNED',
    reportedBy: 'Kavita Roy (Student)',
    assignedStaff: 'Team 02 (Ramesh)',
    createdAt: '25 mins ago',
  },
  {
    id: 'SAN-1023',
    locationCategory: 'DRINKING_WATER',
    locationDetail: 'Library Ground Floor Water Cooler',
    description: 'Overflowing paper cup bin near water dispenser.',
    priorityScore: 88.0,
    priorityLevel: 'HIGH',
    status: 'REPORTED',
    reportedBy: 'Aman Deep (Student)',
    assignedStaff: 'Unassigned',
    createdAt: '40 mins ago',
  },
  {
    id: 'SAN-1022',
    locationCategory: 'LABORATORY',
    locationDetail: 'Chemistry Department Lab 3',
    description: 'Special care glass vial disposal box near full.',
    priorityScore: 78.4,
    priorityLevel: 'MEDIUM',
    status: 'RESOLVED',
    reportedBy: 'Dr. Mehta (Prof)',
    assignedStaff: 'Team 04 (Hazmat Spec)',
    createdAt: '2 hours ago',
    resolvedAt: '30 mins ago',
  },
  {
    id: 'SAN-1020',
    locationCategory: 'HOSTEL',
    locationDetail: 'Hostel Block 4 Entrance Bin',
    description: 'Overflowing paper waste box after weekend delivery.',
    priorityScore: 84.1,
    priorityLevel: 'HIGH',
    status: 'RESOLVED',
    reportedBy: 'Ankit Kumar (Resident)',
    assignedStaff: 'Team 03 (Venkatesh)',
    createdAt: '3 hours ago',
    resolvedAt: '1 hour ago',
  },
]

export const ComplaintsPage: React.FC = () => {
  const [tickets, setTickets] = useState<Ticket[]>(mockTickets)
  const [search, setSearch] = useState('')
  const [statusFilter, setStatusFilter] = useState<string>('ALL')
  const [showModal, setShowModal] = useState(false)
  const [newLocation, setNewLocation] = useState('')
  const [newCategory, setNewCategory] = useState('WASHROOM')
  const [newDesc, setNewDesc] = useState('')
  const [assigningTicketId, setAssigningTicketId] = useState<string | null>(null)

  const handleCreateTicket = (e: React.FormEvent) => {
    e.preventDefault()
    if (!newDesc || !newLocation) return

    const newTicket: Ticket = {
      id: `SAN-${Math.floor(1026 + Math.random() * 8973)}`,
      locationCategory: newCategory,
      locationDetail: newLocation,
      description: newDesc,
      priorityScore: newCategory === 'WASHROOM' || newCategory === 'CANTEEN' ? 94.2 : 82.5,
      priorityLevel: newCategory === 'WASHROOM' || newCategory === 'CANTEEN' ? 'CRITICAL' : 'HIGH',
      status: 'REPORTED',
      reportedBy: 'You (Student / Staff)',
      assignedStaff: 'Unassigned',
      createdAt: 'Just now',
    }

    setTickets([newTicket, ...tickets])
    setNewDesc('')
    setNewLocation('')
    setShowModal(false)
  }

  const handleStatusChange = (ticketId: string, nextStatus: Ticket['status'], staffName?: string) => {
    setTickets(tickets.map(t => {
      if (t.id === ticketId) {
        return {
          ...t,
          status: nextStatus,
          assignedStaff: staffName || t.assignedStaff,
          resolvedAt: nextStatus === 'RESOLVED' ? 'Just now' : t.resolvedAt
        }
      }
      return t
    }))
    setAssigningTicketId(null)
  }

  const filteredTickets = tickets.filter(t => {
    const matchesSearch = t.id.toLowerCase().includes(search.toLowerCase()) ||
      t.locationDetail.toLowerCase().includes(search.toLowerCase()) ||
      t.description.toLowerCase().includes(search.toLowerCase())
    
    if (statusFilter === 'ALL') return matchesSearch
    return matchesSearch && t.status === statusFilter
  })

  const getPriorityBadge = (level: Ticket['priorityLevel']) => {
    switch (level) {
      case 'CRITICAL':
        return <Badge className="bg-rose-500/20 text-rose-400 border border-rose-500/40 font-mono text-[10px]">CRITICAL</Badge>
      case 'HIGH':
        return <Badge className="bg-amber-500/20 text-amber-400 border border-amber-500/40 font-mono text-[10px]">HIGH</Badge>
      default:
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px]">MEDIUM</Badge>
    }
  }

  const getStatusBadge = (status: Ticket['status']) => {
    switch (status) {
      case 'REPORTED':
        return <Badge className="bg-rose-500/10 text-rose-400 border border-rose-500/30 font-mono text-[10px]">REPORTED</Badge>
      case 'ASSIGNED':
        return <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 font-mono text-[10px]">ASSIGNED</Badge>
      case 'IN_PROGRESS':
        return <Badge className="bg-sky-500/10 text-sky-400 border border-sky-500/30 font-mono text-[10px]">IN PROGRESS</Badge>
      case 'RESOLVED':
        return <Badge className="bg-emerald-500/20 text-emerald-400 border border-emerald-500/40 font-mono text-[10px]">RESOLVED</Badge>
    }
  }

  return (
    <div className="space-y-6 font-sans select-none pb-12">
      {/* Banner Header */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-emerald-400 text-xs font-bold font-mono uppercase tracking-widest mb-1">
            <MessageSquareWarning className="w-4 h-4 text-emerald-400 animate-pulse" />
            <span>AI Priority-Scored Sanitization Ticket Desk</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Campus Sanitization & Hygiene Reports</h2>
          <p className="text-sm text-slate-300">Automated dispatch system prioritising washroom, laboratory & dining hall hygiene issues.</p>
        </div>

        <Button
          onClick={() => setShowModal(true)}
          className="bg-emerald-600 hover:bg-emerald-500 text-white font-bold gap-2 rounded-xl shadow-[0_0_20px_rgba(16,185,129,0.3)] transition-all"
        >
          <Plus className="w-4 h-4" />
          <span>New Sanitization Ticket</span>
        </Button>
      </div>

      {/* KPI Row */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        <div className="p-4 rounded-2xl glass-panel border-emerald-500/20">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">ACTIVE TICKETS</span>
          <div className="text-2xl font-extrabold text-white mt-1">{tickets.filter(t => t.status !== 'RESOLVED').length}</div>
        </div>
        <div className="p-4 rounded-2xl glass-panel border-emerald-500/20">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">CRITICAL PRIORITY</span>
          <div className="text-2xl font-extrabold text-rose-400 mt-1">{tickets.filter(t => t.priorityLevel === 'CRITICAL' && t.status !== 'RESOLVED').length}</div>
        </div>
        <div className="p-4 rounded-2xl glass-panel border-emerald-500/20">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">AVG RESOLUTION TIME</span>
          <div className="text-2xl font-extrabold text-emerald-400 font-mono mt-1">14.2 mins</div>
        </div>
        <div className="p-4 rounded-2xl glass-panel border-emerald-500/20">
          <span className="text-[10px] font-mono font-bold text-slate-400 uppercase">RESOLVED TODAY</span>
          <div className="text-2xl font-extrabold text-sky-400 mt-1">{tickets.filter(t => t.status === 'RESOLVED').length}</div>
        </div>
      </div>

      {/* New Ticket Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <Card className="glass-panel-glow border-emerald-500/40 w-full max-w-lg rounded-3xl shadow-2xl">
            <CardHeader>
              <CardTitle className="text-lg text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-emerald-400" />
                <span>Report Sanitization Issue</span>
              </CardTitle>
              <CardDescription className="text-slate-400 text-xs">Submit location details. AI engine will calculate priority score automatically.</CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleCreateTicket} className="space-y-4 text-xs">
                <div className="space-y-1">
                  <Label className="text-slate-300">Location Category</Label>
                  <select
                    value={newCategory}
                    onChange={(e) => setNewCategory(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:border-emerald-500 focus:outline-none font-sans"
                  >
                    <option value="WASHROOM">Washroom / Hygiene Area (Highest Priority)</option>
                    <option value="CANTEEN">Canteen & Dining Hall</option>
                    <option value="CLASSROOM">Classroom Block</option>
                    <option value="LABORATORY">Laboratory Area</option>
                    <option value="HOSTEL">Student Hostel Block</option>
                    <option value="DRINKING_WATER">Drinking Water Station</option>
                  </select>
                </div>

                <div className="space-y-1">
                  <Label className="text-slate-300">Specific Location Detail</Label>
                  <Input
                    value={newLocation}
                    onChange={(e) => setNewLocation(e.target.value)}
                    className="bg-slate-950 border-slate-800 text-white rounded-xl"
                    placeholder="e.g. Block B, 2nd floor near Room 204"
                    required
                  />
                </div>

                <div className="space-y-1">
                  <Label className="text-slate-300">Issue Description</Label>
                  <textarea
                    rows={3}
                    value={newDesc}
                    onChange={(e) => setNewDesc(e.target.value)}
                    className="w-full p-2.5 bg-slate-950 border border-slate-800 rounded-xl text-white focus:outline-none focus:border-emerald-500 font-sans"
                    placeholder="Describe the sanitation issue..."
                    required
                  />
                </div>

                <div className="p-3 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-[11px] text-emerald-300 flex items-start gap-2">
                  <ShieldAlert className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                  <span><strong>AI Priority Scoring Engine:</strong> High foot-traffic areas like washrooms and canteens automatically trigger priority score &gt; 90.0 for immediate worker dispatch.</span>
                </div>

                <div className="flex items-center gap-3 pt-2">
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => setShowModal(false)}
                    className="flex-1 border-slate-800 bg-slate-900 text-slate-300 rounded-xl"
                  >
                    Cancel
                  </Button>
                  <Button
                    type="submit"
                    className="flex-1 bg-emerald-600 hover:bg-emerald-500 text-white font-bold rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                  >
                    Submit Ticket
                  </Button>
                </div>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Filter Tabs & Search Bar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-slate-900/60 p-3 rounded-2xl border border-slate-800">
        <div className="flex items-center gap-1 overflow-x-auto w-full sm:w-auto">
          {['ALL', 'REPORTED', 'ASSIGNED', 'IN_PROGRESS', 'RESOLVED'].map((st) => (
            <button
              key={st}
              onClick={() => setStatusFilter(st)}
              className={`px-3 py-1.5 rounded-xl text-xs font-mono font-bold transition-colors whitespace-nowrap ${
                statusFilter === st ? 'bg-emerald-600 text-white shadow-md' : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>

        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-2.5 text-slate-500" />
          <Input
            placeholder="Search tickets by ID, location..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9 bg-slate-950 border-slate-800 text-white rounded-xl text-xs"
          />
        </div>
      </div>

      {/* Tickets List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {filteredTickets.map((t) => (
          <Card key={t.id} className="glass-panel border-emerald-500/20 rounded-3xl hover:border-emerald-500/40 transition-all flex flex-col justify-between">
            <div>
              <CardHeader className="pb-2 flex flex-row items-start justify-between gap-2">
                <div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="font-mono font-extrabold text-emerald-400 text-sm">{t.id}</span>
                    {getPriorityBadge(t.priorityLevel)}
                    {getStatusBadge(t.status)}
                  </div>
                  <CardTitle className="text-sm text-white mt-1.5 flex items-center gap-1.5">
                    <MapPin className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{t.locationDetail}</span>
                  </CardTitle>
                </div>
                <div className="text-right font-mono text-[11px] text-emerald-400 font-bold bg-emerald-950/80 px-2.5 py-1 rounded-xl border border-emerald-500/30 shrink-0">
                  Priority: {t.priorityScore}
                </div>
              </CardHeader>
              <CardContent className="space-y-3 text-xs">
                <p className="text-slate-300 leading-relaxed bg-slate-950/60 p-3 rounded-2xl border border-slate-800">
                  {t.description}
                </p>

                <div className="grid grid-cols-2 gap-2 text-[11px] text-slate-400">
                  <div className="flex items-center gap-1">
                    <User className="w-3 h-3 text-slate-500" />
                    <span className="truncate">{t.reportedBy}</span>
                  </div>
                  <div className="flex items-center gap-1 font-mono text-emerald-400 justify-end">
                    <Clock className="w-3 h-3" />
                    <span>{t.createdAt}</span>
                  </div>
                </div>

                <div className="p-2 rounded-xl bg-slate-950 border border-slate-800 text-[11px] flex items-center justify-between text-slate-300 font-mono">
                  <span>Assigned Staff:</span>
                  <span className="text-emerald-400 font-bold">{t.assignedStaff}</span>
                </div>
              </CardContent>
            </div>

            {/* Interactive Worker Actions Footer */}
            <div className="px-6 pb-4 pt-2 border-t border-slate-800/60 flex items-center justify-between gap-2 text-xs">
              {t.status === 'REPORTED' && (
                <div className="w-full flex items-center gap-2">
                  <Button
                    size="sm"
                    onClick={() => handleStatusChange(t.id, 'ASSIGNED', 'Team 01 (Suresh)')}
                    className="flex-1 bg-amber-600 hover:bg-amber-500 text-white font-bold text-xs rounded-xl"
                  >
                    <UserCheck className="w-3.5 h-3.5 mr-1" /> Assign Team 01
                  </Button>
                </div>
              )}

              {t.status === 'ASSIGNED' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(t.id, 'IN_PROGRESS')}
                  className="w-full bg-sky-600 hover:bg-sky-500 text-white font-bold text-xs rounded-xl"
                >
                  <Clock className="w-3.5 h-3.5 mr-1" /> Start Sanitization
                </Button>
              )}

              {t.status === 'IN_PROGRESS' && (
                <Button
                  size="sm"
                  onClick={() => handleStatusChange(t.id, 'RESOLVED')}
                  className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(16,185,129,0.3)]"
                >
                  <CheckCircle2 className="w-3.5 h-3.5 mr-1" /> Mark Resolved
                </Button>
              )}

              {t.status === 'RESOLVED' && (
                <div className="w-full text-center text-xs font-mono text-emerald-400 font-bold flex items-center justify-center gap-1.5 py-1 bg-emerald-950/40 rounded-xl border border-emerald-500/20">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span>Sanitization Verified & Completed ({t.resolvedAt})</span>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}
