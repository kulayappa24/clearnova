import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Mail, Lock, ArrowRight, ShieldCheck } from 'lucide-react'
import { useAuth } from '@/contexts/AuthContext'
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'

export const LoginPage: React.FC = () => {
  const [email, setEmail] = useState('admin@clearnova.in')
  const [password, setPassword] = useState('admin123')
  const [error, setError] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const { login } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError(null)
    setIsLoading(true)

    try {
      await login({ email, password })
      navigate('/dashboard')
    } catch (err: any) {
      setError(err?.response?.data?.message || 'Invalid email or password. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemoRole = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail)
    setPassword(demoPass)
  }

  return (
    <div className="min-h-screen bg-[#f8faf9] flex items-center justify-center p-4 relative overflow-hidden font-sans select-none">
      {/* Background Cyber Glow */}
      <div className="absolute -top-40 -left-40 w-96 h-96 bg-emerald-200/50 rounded-full blur-3xl" />
      <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-teal-200/50 rounded-full blur-3xl" />

      <div className="w-full max-w-md space-y-6 relative z-10">
        {/* Brand Logo */}
        <div className="text-center space-y-2">
          <div className="inline-flex p-2 bg-white border-2 border-emerald-300 rounded-3xl shadow-md mb-2">
            <img src="/logo.svg" alt="ClearNova Logo" className="w-16 h-16 object-contain" />
          </div>
          <h1 className="text-4xl font-black text-slate-900 tracking-tight">ClearNova</h1>
          <p className="text-xs text-slate-600 font-semibold">AI + IoT Intelligent Waste Segregation & Management</p>
        </div>

        {/* Login Card */}
        <Card className="bg-white border-2 border-emerald-200 shadow-xl rounded-3xl">
          <CardHeader>
            <CardTitle className="text-xl text-slate-900 font-black">Sign In to Dashboard</CardTitle>
            <CardDescription className="text-slate-600 text-xs font-medium">
              Access the municipal waste monitoring and segregation grid.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {error && (
                <div className="p-3 bg-rose-50 border border-rose-300 rounded-xl text-rose-700 text-xs font-bold">
                  {error}
                </div>
              )}

              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-800 font-bold text-xs">Email Address</Label>
                <div className="relative">
                  <Mail className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-9 bg-slate-50 border-slate-300 text-slate-900 font-medium"
                    placeholder="user@clearnova.in"
                    required
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-800 font-bold text-xs">Password</Label>
                <div className="relative">
                  <Lock className="w-4 h-4 absolute left-3 top-3 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-9 bg-slate-50 border-slate-300 text-slate-900 font-medium"
                    placeholder="••••••••"
                    required
                  />
                </div>
              </div>

              <Button
                type="submit"
                disabled={isLoading}
                className="w-full bg-emerald-600 hover:bg-emerald-500 text-white font-extrabold py-2.5 rounded-xl transition-colors flex items-center justify-center gap-2 shadow-md"
              >
                <span>{isLoading ? 'Authenticating...' : 'Sign In'}</span>
                <ArrowRight className="w-4 h-4" />
              </Button>
            </form>
          </CardContent>
        </Card>

        {/* Quick Demo Fill Buttons */}
        <div className="p-4 bg-white border-2 border-emerald-100 rounded-3xl space-y-3 shadow-sm">
          <div className="flex items-center gap-2 text-xs font-black text-emerald-900">
            <ShieldCheck className="w-4 h-4 text-emerald-700" />
            <span>Demo Quick-Fill Credentials</span>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => fillDemoRole('admin@clearnova.in', 'admin123')}
              className="px-2.5 py-1.5 bg-emerald-50 hover:bg-emerald-100 text-slate-900 text-xs rounded-xl border border-emerald-200 text-left transition-colors cursor-pointer"
            >
              <div className="font-black text-emerald-800">Admin</div>
              <div className="text-[10px] text-slate-600 font-mono font-bold">admin@clearnova.in</div>
            </button>
            <button
              onClick={() => fillDemoRole('officer@clearnova.in', 'officer123')}
              className="px-2.5 py-1.5 bg-sky-50 hover:bg-sky-100 text-slate-900 text-xs rounded-xl border border-sky-200 text-left transition-colors cursor-pointer"
            >
              <div className="font-black text-sky-800">Sanitation Officer</div>
              <div className="text-[10px] text-slate-600 font-mono font-bold">officer@clearnova.in</div>
            </button>
            <button
              onClick={() => fillDemoRole('worker@clearnova.in', 'worker123')}
              className="px-2.5 py-1.5 bg-amber-50 hover:bg-amber-100 text-slate-900 text-xs rounded-xl border border-amber-200 text-left transition-colors cursor-pointer"
            >
              <div className="font-black text-amber-800">Field Worker</div>
              <div className="text-[10px] text-slate-600 font-mono font-bold">worker@clearnova.in</div>
            </button>
            <button
              onClick={() => fillDemoRole('citizen@clearnova.in', 'citizen123')}
              className="px-2.5 py-1.5 bg-indigo-50 hover:bg-indigo-100 text-slate-900 text-xs rounded-xl border border-indigo-200 text-left transition-colors cursor-pointer"
            >
              <div className="font-black text-indigo-800">Citizen</div>
              <div className="text-[10px] text-slate-600 font-mono font-bold">citizen@clearnova.in</div>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
