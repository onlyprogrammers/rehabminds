'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  BarChart3,
  CreditCard,
  Database,
  FileCheck,
  Loader2,
  ShieldCheck,
  Users,
  Eye,
  ArrowRight,
  TrendingUp,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Badge } from '@/components/ui/badge'

type Summary = {
  users_count: string
  materials_count: string
  pending_materials_count: string
  payments_count: string
  cache_count: string
}

export default function AdminDashboard() {
  const router = useRouter()
  const [summary, setSummary] = useState<Summary | null>(null)
  const [authed, setAuthed] = useState<boolean | null>(null)
  const [login, setLogin] = useState({ email: 'admin@ignoustudyguide.com', password: 'admin123' })
  const [message, setMessage] = useState('')
  const [signingIn, setSigningIn] = useState(false)

  async function loadSummary() {
    const res = await fetch('/api/admin/summary')
    const data = await res.json()
    if (res.ok) {
      setSummary(data.summary)
      setAuthed(true)
    } else {
      setAuthed(false)
      setMessage(data.error || 'Admin login required')
    }
  }

  async function signin() {
    setSigningIn(true)
    const res = await fetch('/api/auth/signin', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ login: login.email, password: login.password }),
    })
    const data = await res.json()
    setSigningIn(false)
    if (res.ok) {
      loadSummary()
    } else {
      setMessage(data.error || 'Sign in failed')
    }
  }

  useEffect(() => { loadSummary() }, [])

  const statCards = [
    { label: 'Total Users', value: summary?.users_count || '—', icon: Users, color: 'text-blue-400', href: '/admin/users' },
    { label: 'Total Materials', value: summary?.materials_count || '—', icon: BarChart3, color: 'text-green-400', href: '/admin/materials' },
    { label: 'Pending Review', value: summary?.pending_materials_count || '—', icon: ShieldCheck, color: 'text-yellow-400', href: '/admin/materials' },
    { label: 'Total Payments', value: summary?.payments_count || '—', icon: CreditCard, color: 'text-purple-400', href: '/admin/payments' },
    { label: 'Scrape Cache', value: summary?.cache_count || '—', icon: Database, color: 'text-slate-400', href: '/admin/analytics' },
  ]

  const quickActions = [
    { label: 'Visitor Analytics', icon: Eye, href: '/admin/analytics', desc: 'View site traffic and visit patterns' },
    { label: 'Payment Reports', icon: CreditCard, href: '/admin/payments', desc: 'Track all transactions and revenue' },
    { label: 'Approve Materials', icon: FileCheck, href: '/admin/materials', desc: 'Review and approve uploaded content' },
    { label: 'Manage Users', icon: Users, href: '/admin/users', desc: 'View and manage student accounts' },
  ]

  if (authed === null) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
      </div>
    )
  }

  if (!authed) {
    return (
      <div className="flex items-center justify-center min-h-[80vh] px-4">
        <div className="w-full max-w-md rounded-xl border border-slate-700 bg-slate-900 p-6">
          <h1 className="text-xl font-bold mb-1">Admin Sign In</h1>
          <p className="text-sm text-slate-400 mb-5">Enter admin credentials to access the panel</p>
          <div className="space-y-4">
            <div className="space-y-1">
              <Label htmlFor="email" className="text-slate-300">Email</Label>
              <Input
                id="email"
                value={login.email}
                onChange={(e) => setLogin((p) => ({ ...p, email: e.target.value }))}
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>
            <div className="space-y-1">
              <Label htmlFor="password" className="text-slate-300">Password</Label>
              <Input
                id="password"
                type="password"
                value={login.password}
                onChange={(e) => setLogin((p) => ({ ...p, password: e.target.value }))}
                className="bg-slate-950 border-slate-700 text-white"
              />
            </div>
            <Button className="w-full" onClick={signin} disabled={signingIn}>
              {signingIn && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Sign In as Admin
            </Button>
            {message && <p className="text-sm text-red-400">{message}</p>}
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <p className="text-slate-400 text-sm mt-1">Welcome to the Ignou Study Guide admin panel</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {statCards.map((card) => (
          <Link key={card.label} href={card.href}>
            <div className="rounded-xl border border-slate-700 bg-slate-900 p-4 hover:border-slate-500 transition-colors">
              <card.icon className={`h-5 w-5 mb-3 ${card.color}`} />
              <p className="text-2xl font-bold">{card.value}</p>
              <p className="text-xs text-slate-400 mt-1">{card.label}</p>
            </div>
          </Link>
        ))}
      </div>

      {Number(summary?.pending_materials_count) > 0 && (
        <div className="rounded-xl border border-yellow-700/50 bg-yellow-900/20 px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <ShieldCheck className="h-5 w-5 text-yellow-400" />
            <div>
              <p className="text-sm font-semibold text-yellow-300">
                {summary?.pending_materials_count} material{Number(summary?.pending_materials_count) !== 1 ? 's' : ''} awaiting approval
              </p>
              <p className="text-xs text-yellow-500">Review and approve uploaded study materials</p>
            </div>
          </div>
          <Link href="/admin/materials">
            <Button size="sm" className="bg-yellow-600 hover:bg-yellow-700 text-white text-xs">
              Review <ArrowRight className="ml-1 h-3 w-3" />
            </Button>
          </Link>
        </div>
      )}

      <div>
        <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {quickActions.map((action) => (
            <Link key={action.label} href={action.href}>
              <div className="rounded-xl border border-slate-700 bg-slate-900 p-5 hover:border-blue-600/50 hover:bg-slate-800 transition-all group">
                <action.icon className="h-6 w-6 text-blue-400 mb-3 group-hover:scale-110 transition-transform" />
                <p className="font-semibold text-sm mb-1">{action.label}</p>
                <p className="text-xs text-slate-500">{action.desc}</p>
                <ArrowRight className="h-3 w-3 text-slate-500 mt-3 group-hover:text-blue-400 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <div className="flex items-center gap-2 mb-3">
          <TrendingUp className="h-5 w-5 text-green-400" />
          <h2 className="font-semibold">System Overview</h2>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800">
            <span className="text-slate-400">Total Revenue</span>
            <Badge variant="outline" className="border-green-700 text-green-400">View in Payments</Badge>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800">
            <span className="text-slate-400">Cache Entries</span>
            <span className="font-semibold">{summary?.cache_count || '0'}</span>
          </div>
          <div className="flex items-center justify-between p-3 rounded-lg bg-slate-800">
            <span className="text-slate-400">Platform Status</span>
            <Badge className="bg-green-800 text-green-300 border-0">Operational</Badge>
          </div>
        </div>
      </div>
    </div>
  )
}
