import React from 'react'
import { Trophy, Award, Zap, Sparkles, ShieldCheck, CheckCircle2, TrendingUp } from 'lucide-react'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'

const mockLeaderboard = [
  { rank: 1, name: 'Aarav Sharma', dept: 'CSE - 3rd Year', points: 1240, badge: 'ECO_CHAMPION', scans: 84, reports: 12 },
  { rank: 2, name: 'Ananya Reddy', dept: 'ECE - 4th Year', points: 1100, badge: 'GREEN_AMBASSADOR', scans: 72, reports: 9 },
  { rank: 3, name: 'Vikram Verma', dept: 'MECH - 2nd Year', points: 950, badge: 'ECO_WARRIOR', scans: 61, reports: 7 },
  { rank: 4, name: 'Priya Nambiar', dept: 'EEE - 3rd Year', points: 880, badge: 'ECO_WARRIOR', scans: 55, reports: 6 },
  { rank: 5, name: 'Rahul Joshi', dept: 'CIVIL - 4th Year', points: 790, badge: 'RECYCLER', scans: 48, reports: 5 },
]

export const LeaderboardPage: React.FC = () => {
  return (
    <div className="space-y-6 font-sans select-none">
      {/* Banner */}
      <div className="p-6 rounded-3xl glass-panel-glow flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-amber-400 text-xs font-bold uppercase tracking-wider mb-1 font-mono">
            <Trophy className="w-4 h-4 text-amber-400" />
            <span>Campus Gamification & Student Engagement</span>
          </div>
          <h2 className="text-2xl font-extrabold text-white">Green Points & Eco Leaderboard</h2>
          <p className="text-sm text-slate-300">Rewarding students for correct 4-stream segregation and reporting sanitation issues.</p>
        </div>

        <div className="flex items-center gap-3">
          <div className="p-3 bg-amber-500/10 rounded-2xl border border-amber-500/30 text-amber-400 text-center">
            <div className="text-xs font-bold uppercase">Your Rank</div>
            <div className="text-xl font-extrabold text-white font-mono">#14</div>
          </div>
          <div className="p-3 bg-emerald-500/10 rounded-2xl border border-emerald-500/30 text-emerald-400 text-center">
            <div className="text-xs font-bold uppercase">Total Points</div>
            <div className="text-xl font-extrabold text-white font-mono">450 pts</div>
          </div>
        </div>
      </div>

      {/* Leaderboard Table */}
      <Card className="glass-panel border-emerald-500/20 rounded-3xl overflow-hidden">
        <CardHeader>
          <CardTitle className="text-base text-white flex items-center gap-2">
            <Award className="w-5 h-5 text-amber-400" />
            <span>Top Campus Eco Champions</span>
          </CardTitle>
          <CardDescription className="text-slate-400 text-xs">Updated in real-time based on verified segregation & report resolutions</CardDescription>
        </CardHeader>
        <CardContent className="p-0 overflow-x-auto">
          <table className="w-full text-left text-xs text-slate-300">
            <thead className="bg-slate-950/80 text-emerald-400 font-mono text-[10px] uppercase border-y border-emerald-500/20">
              <tr>
                <th className="py-3 px-4">Rank</th>
                <th className="py-3 px-4">Student Name</th>
                <th className="py-3 px-4">Department</th>
                <th className="py-3 px-4">Badge Title</th>
                <th className="py-3 px-4">AI Scans</th>
                <th className="py-3 px-4">Green Points</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-emerald-500/10">
              {mockLeaderboard.map((item) => (
                <tr key={item.rank} className="hover:bg-emerald-950/20 transition-colors">
                  <td className="py-3.5 px-4 font-mono font-extrabold">
                    {item.rank === 1 ? '🥇 #1' : item.rank === 2 ? '🥈 #2' : item.rank === 3 ? '🥉 #3' : `#${item.rank}`}
                  </td>
                  <td className="py-3.5 px-4 font-bold text-white">{item.name}</td>
                  <td className="py-3.5 px-4 text-slate-400">{item.dept}</td>
                  <td className="py-3.5 px-4">
                    <Badge className="bg-amber-500/10 text-amber-400 border border-amber-500/30 text-[10px] font-mono">
                      {item.badge}
                    </Badge>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-slate-300">{item.scans} scans</td>
                  <td className="py-3.5 px-4 font-mono font-extrabold text-emerald-400 text-sm">{item.points} pts</td>
                </tr>
              ))}
            </tbody>
          </table>
        </CardContent>
      </Card>
    </div>
  )
}
