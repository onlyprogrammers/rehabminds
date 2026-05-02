'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { CreditCard, IndianRupee, Loader2, TrendingUp, CheckCircle, Clock, XCircle } from 'lucide-react'
import { Badge } from '@/components/ui/badge'

type Payment = {
  id: string
  user_email: string | null
  material_title: string | null
  amount_paise: number
  currency: string
  status: string
  created_at: string
}

export default function AdminPaymentsPage() {
  const router = useRouter()
  const [payments, setPayments] = useState<Payment[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch('/api/admin/payments')
      .then((r) => {
        if (r.status === 401) { router.push('/admin'); return null }
        return r.json()
      })
      .then((data) => {
        if (data?.payments) setPayments(data.payments)
      })
      .finally(() => setLoading(false))
  }, [router])

  const totalRevenue = payments
    .filter((p) => p.status === 'completed' || p.status === 'paid')
    .reduce((sum, p) => sum + p.amount_paise, 0)

  const statusCount = (s: string) => payments.filter((p) => p.status === s).length

  const topStats = [
    { label: 'Total Transactions', value: payments.length, icon: CreditCard, color: 'text-blue-400' },
    { label: 'Revenue (INR)', value: `₹${(totalRevenue / 100).toFixed(0)}`, icon: IndianRupee, color: 'text-green-400' },
    { label: 'Completed', value: statusCount('completed') + statusCount('paid'), icon: CheckCircle, color: 'text-green-400' },
    { label: 'Pending', value: statusCount('created') + statusCount('pending'), icon: Clock, color: 'text-yellow-400' },
  ]

  function statusBadge(status: string) {
    const map: Record<string, string> = {
      completed: 'bg-green-900/50 text-green-300 border-green-700',
      paid: 'bg-green-900/50 text-green-300 border-green-700',
      created: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      pending: 'bg-yellow-900/50 text-yellow-300 border-yellow-700',
      failed: 'bg-red-900/50 text-red-300 border-red-700',
      cancelled: 'bg-slate-700 text-slate-300 border-slate-600',
    }
    return map[status] || 'bg-slate-700 text-slate-300 border-slate-600'
  }

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
    </div>
  )

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-8">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2">
          <CreditCard className="h-6 w-6 text-purple-400" /> Payment Analytics
        </h1>
        <p className="text-slate-400 text-sm mt-1">All transactions and revenue overview</p>
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

      <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
          <TrendingUp className="h-4 w-4 text-green-400" />
          <h2 className="font-semibold text-sm">All Payments</h2>
          <Badge variant="outline" className="ml-auto border-slate-600 text-slate-400 text-xs">{payments.length} records</Badge>
        </div>
        {payments.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-500 text-sm">No payment records found.</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs text-slate-400">
                  <th className="text-left px-5 py-3">User</th>
                  <th className="text-left px-5 py-3">Material</th>
                  <th className="text-left px-5 py-3">Amount</th>
                  <th className="text-left px-5 py-3">Status</th>
                  <th className="text-left px-5 py-3">Date</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((p) => (
                  <tr key={p.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3 text-slate-300 max-w-[150px] truncate">{p.user_email || '—'}</td>
                    <td className="px-5 py-3 text-slate-300 max-w-[180px] truncate">{p.material_title || '—'}</td>
                    <td className="px-5 py-3 text-green-300 font-mono font-semibold">₹{(p.amount_paise / 100).toFixed(0)}</td>
                    <td className="px-5 py-3">
                      <Badge variant="outline" className={`text-xs ${statusBadge(p.status)}`}>{p.status}</Badge>
                    </td>
                    <td className="px-5 py-3 text-slate-400 text-xs">
                      {new Date(p.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  )
}
