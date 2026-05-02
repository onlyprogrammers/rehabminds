'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { FileCheck, Loader2, CheckCircle, XCircle, Clock, ExternalLink } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'

type Material = {
  id: string
  title: string
  material_type: string
  programme: string | null
  course_code: string | null
  price_paise: number
  seller_name: string | null
  seller_email: string | null
  status: string
  created_at: string
  file_url: string
}

export default function AdminMaterialsPage() {
  const router = useRouter()
  const [materials, setMaterials] = useState<Material[]>([])
  const [loading, setLoading] = useState(true)
  const [updating, setUpdating] = useState<string | null>(null)
  const [filter, setFilter] = useState<'all' | 'pending' | 'approved' | 'rejected'>('all')

  async function load() {
    const res = await fetch('/api/admin/materials')
    if (res.status === 401) { router.push('/admin'); return }
    const data = await res.json()
    if (data?.materials) setMaterials(data.materials)
    setLoading(false)
  }

  async function updateStatus(id: string, status: string) {
    setUpdating(id)
    await fetch('/api/admin/materials', {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id, status }),
    })
    setMaterials((prev) => prev.map((m) => m.id === id ? { ...m, status } : m))
    setUpdating(null)
  }

  useEffect(() => { load() }, [])

  const filtered = filter === 'all' ? materials : materials.filter((m) => m.status === filter)
  const counts = {
    all: materials.length,
    pending: materials.filter((m) => m.status === 'pending').length,
    approved: materials.filter((m) => m.status === 'approved').length,
    rejected: materials.filter((m) => m.status === 'rejected').length,
  }

  function statusBadge(status: string) {
    const map: Record<string, string> = {
      approved: 'bg-green-900/50 text-green-300 border-green-700',
      pending: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      rejected: 'bg-red-900/50 text-red-300 border-red-700',
    }
    return map[status] || 'bg-slate-700 text-slate-300 border-slate-600'
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
    </div>
  )

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <FileCheck className="h-6 w-6 text-green-400" /> Materials Approval
        </h1>
        <p className="text-slate-400 text-sm mt-1">Review and approve uploaded study materials</p>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
        {(['all', 'pending', 'approved', 'rejected'] as const).map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`rounded-xl border p-4 text-left transition-all ${
              filter === s
                ? 'border-blue-600 bg-blue-900/30'
                : 'border-slate-700 bg-slate-900 hover:border-slate-500'
            }`}
          >
            <p className="text-xl font-bold">{counts[s]}</p>
            <p className="text-xs text-slate-400 capitalize mt-1">{s === 'all' ? 'All Materials' : s}</p>
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
          <h2 className="font-semibold text-sm capitalize">{filter} Materials</h2>
          <Badge variant="outline" className="ml-auto border-slate-600 text-slate-400 text-xs">{filtered.length}</Badge>
        </div>
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-500 text-sm">No materials found.</div>
        ) : (
          <div className="divide-y divide-slate-800">
            {filtered.map((m) => (
              <div key={m.id} className="px-5 py-4 hover:bg-slate-800/50 transition-colors">
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 flex-wrap mb-1">
                      <p className="font-semibold text-sm truncate">{m.title}</p>
                      <Badge variant="outline" className={`text-xs shrink-0 ${statusBadge(m.status)}`}>{m.status}</Badge>
                    </div>
                    <div className="flex items-center gap-3 text-xs text-slate-400 flex-wrap">
                      <span className="capitalize">{m.material_type}</span>
                      {m.programme && <span>· {m.programme.toUpperCase()}</span>}
                      {m.course_code && <span>· {m.course_code}</span>}
                      {m.price_paise > 0 && <span className="text-green-400">· ₹{(m.price_paise / 100).toFixed(0)}</span>}
                      {m.price_paise === 0 && <span className="text-blue-400">· Free</span>}
                    </div>
                    {m.seller_name && (
                      <p className="text-xs text-slate-500 mt-1">by {m.seller_name} {m.seller_email ? `(${m.seller_email})` : ''}</p>
                    )}
                    <p className="text-xs text-slate-600 mt-1">
                      {new Date(m.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </p>
                  </div>
                  <div className="flex items-center gap-2 shrink-0">
                    {m.file_url && (
                      <a href={m.file_url} target="_blank" rel="noopener noreferrer">
                        <Button size="sm" variant="ghost" className="text-slate-400 hover:text-white h-8 w-8 p-0">
                          <ExternalLink className="h-3.5 w-3.5" />
                        </Button>
                      </a>
                    )}
                    {m.status !== 'approved' && (
                      <Button
                        size="sm"
                        className="bg-green-700 hover:bg-green-600 text-white h-7 px-2 text-xs"
                        onClick={() => updateStatus(m.id, 'approved')}
                        disabled={updating === m.id}
                      >
                        {updating === m.id ? <Loader2 className="h-3 w-3 animate-spin" /> : <CheckCircle className="h-3 w-3 mr-1" />}
                        Approve
                      </Button>
                    )}
                    {m.status !== 'rejected' && (
                      <Button
                        size="sm"
                        variant="outline"
                        className="border-red-700 text-red-400 hover:bg-red-900/20 h-7 px-2 text-xs"
                        onClick={() => updateStatus(m.id, 'rejected')}
                        disabled={updating === m.id}
                      >
                        <XCircle className="h-3 w-3 mr-1" />
                        Reject
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
