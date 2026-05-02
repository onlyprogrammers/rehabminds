import { AdminNavbar } from '@/components/admin-navbar'

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-slate-950 text-white flex flex-col lg:flex-row">
      <AdminNavbar />
      <main className="flex-1 overflow-auto">{children}</main>
    </div>
  )
}
