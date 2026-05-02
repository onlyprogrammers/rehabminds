'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import {
  Eye,
  TrendingUp,
  Globe,
  Smartphone,
  Monitor,
  Loader2,
  Activity,
} from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Visit = {
  id: string
  path: string
  user_agent: string | null
  ip_address: string | null
  created_at: string
}

type PageStat = { path: string; count: number }

export default function AdminAnalyticsPage() {
  const router = useRouter()
  const [visits, setVisits] = useState<Visit[]>([])
  const [loading, setLoading] = useState(true)
  const [authed, setAuthed] = useState(true)

  useEffect(() => {
    fetch('/api/admin/summary')
      .then((r) => {
        if (r.status === 401) { setAuthed(false); router.push('/admin'); return null }
        return fetch('/api/admin/analytics')
      })
      .then((r) => {
        if (!r) return null
        return r.json()
      })
      .then((data) => {
        if (data?.visits) setVisits(data.visits)
      })
      .catch(() => {})
      .finally(() => setLoading(false))
  }, [router])

  const pageStats: PageStat[] = visits.reduce<PageStat[]>((acc, v) => {
    const existing = acc.find((x) => x.path === v.path)
    if (existing) existing.count++
    else acc.push({ path: v.path, count: 1 })
    return acc
  }, []).sort((a, b) => b.count - a.count).slice(0, 10)

  const mobileCount = visits.filter((v) => v.user_agent?.toLowerCase().includes('mobile')).length
  const desktopCount = visits.length - mobileCount

  const topStats = [
    { label: 'Total Visits', value: visits.length, icon: Eye, color: 'text-blue-400' },
    { label: 'Unique Paths', value: new Set(visits.map((v) => v.path)).size, icon: Globe, color: 'text-green-400' },
    { label: 'Mobile Visitors', value: mobileCount, icon: Smartphone, color: 'text-purple-400' },
    { label: 'Desktop Visitors', value: desktopCount, icon: Monitor, color: 'text-orange-400' },
  ]

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
    </div>
  )

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <Activity className="h-6 w-6 text-blue-400" /> Visitor Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">Track admin panel visits and page activity</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        {topStats.map((s) => (
          <div key={s.label} className="rounded-xl border border-slate-700 bg-slate-900 p-4">
            <s.icon className={`h-5 w-5 mb-3 ${s.color}`} />
            <p className="text-2xl font-bold">{s.value}</p>
            <p className="text-xs text-slate-400 mt-1">{s.label}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <div className="flex items-center gap-2 mb-4">
            <TrendingUp className="h-5 w-5 text-green-400" />
            <h2 className="font-semibold">Top Pages</h2>
          </div>
          {pageStats.length === 0 ? (
            <p className="text-slate-500 text-sm">No visit data yet. Admin visits are recorded automatically.</p>
          ) : (
            <div className="space-y-2">
              {pageStats.map((p) => (
                <div key={p.path} className="flex items-center justify-between p-2 rounded-lg bg-slate-800">
                  <span className="text-sm text-slate-300 font-mono truncate max-w-[180px]">{p.path}</span>
                  <Badge variant="outline" className="border-blue-700 text-blue-400 text-xs">{p.count} visits</Badge>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
          <div className="flex items-center gap-2 mb-4">
            <Eye className="h-5 w-5 text-purple-400" />
            <h2 className="font-semibold">Recent Visits</h2>
          </div>
          {visits.length === 0 ? (
            <p className="text-slate-500 text-sm">No recent admin visits recorded.</p>
          ) : (
            <div className="space-y-2 max-h-72 overflow-y-auto">
              {visits.slice(0, 20).map((v) => (
                <div key={v.id} className="flex items-center justify-between p-2 rounded-lg bg-slate-800 text-xs">
                  <span className="text-slate-300 font-mono">{v.path}</span>
                  <span className="text-slate-500 shrink-0 ml-2">
                    {new Date(v.created_at).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 p-5">
        <h2 className="font-semibold mb-3">Device Breakdown</h2>
        {visits.length > 0 ? (
          <div className="flex gap-6">
            <div className="flex items-center gap-3">
              <Monitor className="h-5 w-5 text-orange-400" />
              <div>
                <p className="text-lg font-bold">{desktopCount}</p>
                <p className="text-xs text-slate-400">Desktop</p>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Smartphone className="h-5 w-5 text-purple-400" />
              <div>
                <p className="text-lg font-bold">{mobileCount}</p>
                <p className="text-xs text-slate-400">Mobile</p>
              </div>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-slate-500">
                {visits.length > 0 ? Math.round((mobileCount / visits.length) * 100) : 0}% mobile traffic
              </p>
            </div>
          </div>
        ) : (
          <p className="text-slate-500 text-sm">No device data available yet.</p>
        )}
      </div>
    </div>
  )
}
