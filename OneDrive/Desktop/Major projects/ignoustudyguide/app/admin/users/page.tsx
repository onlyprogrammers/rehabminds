'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import { Users, Loader2, GraduationCap, Shield } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Input } from '@/components/ui/input'

type User = {
  id: string
  first_name: string
  last_name: string | null
  email: string
  phone: string | null
  enrollment_number: string | null
  programme: string | null
  role: string
  created_at: string
}

export default function AdminUsersPage() {
  const router = useRouter()
  const [users, setUsers] = useState<User[]>([])
  const [loading, setLoading] = useState(true)
  const [search, setSearch] = useState('')

  useEffect(() => {
    fetch('/api/admin/users')
      .then((r) => {
        if (r.status === 401) { router.push('/admin'); return null }
        return r.json()
      })
      .then((data) => {
        if (data?.users) setUsers(data.users)
      })
      .finally(() => setLoading(false))
  }, [router])

  const filtered = users.filter((u) => {
    const q = search.toLowerCase()
    return (
      u.email.toLowerCase().includes(q) ||
      u.first_name.toLowerCase().includes(q) ||
      (u.last_name?.toLowerCase().includes(q) ?? false) ||
      (u.enrollment_number?.toLowerCase().includes(q) ?? false)
    )
  })

  if (loading) return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <Loader2 className="h-8 w-8 animate-spin text-blue-400" />
    </div>
  )

  return (
    <div className="px-4 py-6 lg:px-8 lg:py-8 space-y-6">
      <div className="flex items-start justify-between flex-wrap gap-3">
        <div>
          <h1 className="text-2xl font-bold flex items-center gap-2">
            <Users className="h-6 w-6 text-blue-400" /> Users
          </h1>
          <p className="text-slate-400 text-sm mt-1">{users.length} registered students</p>
        </div>
        <Input
          placeholder="Search by name, email, enrollment..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-slate-900 border-slate-700 text-white placeholder:text-slate-500 max-w-xs"
        />
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <Users className="h-5 w-5 mb-3 text-blue-400" />
          <p className="text-2xl font-bold">{users.length}</p>
          <p className="text-xs text-slate-400 mt-1">Total Users</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <GraduationCap className="h-5 w-5 mb-3 text-green-400" />
          <p className="text-2xl font-bold">{users.filter((u) => u.role === 'student').length}</p>
          <p className="text-xs text-slate-400 mt-1">Students</p>
        </div>
        <div className="rounded-xl border border-slate-700 bg-slate-900 p-4">
          <Shield className="h-5 w-5 mb-3 text-purple-400" />
          <p className="text-2xl font-bold">{users.filter((u) => u.role === 'admin').length}</p>
          <p className="text-xs text-slate-400 mt-1">Admins</p>
        </div>
      </div>

      <div className="rounded-xl border border-slate-700 bg-slate-900 overflow-hidden">
        <div className="px-5 py-4 border-b border-slate-700 flex items-center gap-2">
          <h2 className="font-semibold text-sm">All Users</h2>
          <Badge variant="outline" className="ml-auto border-slate-600 text-slate-400 text-xs">{filtered.length}</Badge>
        </div>
        {filtered.length === 0 ? (
          <div className="px-5 py-10 text-center text-slate-500 text-sm">
            {search ? 'No users match your search.' : 'No users registered yet.'}
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-slate-700 text-xs text-slate-400">
                  <th className="text-left px-5 py-3">Name</th>
                  <th className="text-left px-5 py-3">Email</th>
                  <th className="text-left px-5 py-3">Enrollment</th>
                  <th className="text-left px-5 py-3">Programme</th>
                  <th className="text-left px-5 py-3">Role</th>
                  <th className="text-left px-5 py-3">Joined</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((u) => (
                  <tr key={u.id} className="border-b border-slate-800 hover:bg-slate-800/50 transition-colors">
                    <td className="px-5 py-3 font-medium">{u.first_name} {u.last_name || ''}</td>
                    <td className="px-5 py-3 text-slate-300 max-w-[200px] truncate">{u.email}</td>
                    <td className="px-5 py-3 text-slate-400 font-mono text-xs">{u.enrollment_number || '—'}</td>
                    <td className="px-5 py-3 text-slate-400 uppercase text-xs">{u.programme || '—'}</td>
                    <td className="px-5 py-3">
                      <Badge
                        variant="outline"
                        className={u.role === 'admin' ? 'border-purple-700 text-purple-300 text-xs' : 'border-slate-600 text-slate-400 text-xs'}
                      >
                        {u.role}
                      </Badge>
                    </td>
                    <td className="px-5 py-3 text-slate-500 text-xs">
                      {new Date(u.created_at).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' })}
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
