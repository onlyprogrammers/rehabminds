'use client'

import Link from 'next/link'
import { usePathname, useRouter } from 'next/navigation'
import { useState } from 'react'
import {
  BarChart3,
  CreditCard,
  FileCheck,
  LayoutDashboard,
  LogOut,
  Menu,
  Users,
  X,
  GraduationCap,
  Eye,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const links = [
  { href: '/admin', label: 'Dashboard', icon: LayoutDashboard },
  { href: '/admin/analytics', label: 'Visitor Analytics', icon: Eye },
  { href: '/admin/payments', label: 'Payments', icon: CreditCard },
  { href: '/admin/materials', label: 'Materials Approval', icon: FileCheck },
  { href: '/admin/users', label: 'Users', icon: Users },
]

export function AdminNavbar() {
  const pathname = usePathname()
  const router = useRouter()
  const [open, setOpen] = useState(false)

  async function handleLogout() {
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  const NavLinks = () => (
    <nav className="flex flex-col gap-1">
      {links.map((link) => {
        const active = pathname === link.href
        return (
          <Link
            key={link.href}
            href={link.href}
            onClick={() => setOpen(false)}
            className={cn(
              'flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all',
              active
                ? 'bg-blue-600 text-white shadow-md'
                : 'text-slate-300 hover:bg-slate-700 hover:text-white'
            )}
          >
            <link.icon className="h-4 w-4 shrink-0" />
            {link.label}
          </Link>
        )
      })}
    </nav>
  )

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex flex-col w-56 shrink-0 bg-slate-900 min-h-screen border-r border-slate-700">
        <div className="flex items-center gap-2 px-4 py-5 border-b border-slate-700">
          <GraduationCap className="h-6 w-6 text-blue-400" />
          <div>
            <p className="text-white font-bold text-sm leading-tight">Admin Panel</p>
            <p className="text-slate-400 text-xs">Ignou Study Guide</p>
          </div>
        </div>
        <div className="flex-1 px-3 py-4">
          <NavLinks />
        </div>
        <div className="px-3 py-4 border-t border-slate-700">
          <Link href="/" className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 mb-1 transition-all">
            <BarChart3 className="h-4 w-4" />
            View Site
          </Link>
          <Button
            variant="ghost"
            size="sm"
            className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4 mr-3" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Mobile Top Bar */}
      <div className="lg:hidden flex items-center justify-between bg-slate-900 border-b border-slate-700 px-4 py-3 sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <GraduationCap className="h-5 w-5 text-blue-400" />
          <span className="text-white font-bold text-sm">Admin Panel</span>
        </div>
        <Button variant="ghost" size="icon" className="text-slate-300 hover:text-white h-8 w-8" onClick={() => setOpen(true)}>
          <Menu className="h-5 w-5" />
        </Button>
      </div>

      {/* Mobile Drawer */}
      {open && (
        <div className="lg:hidden fixed inset-0 z-50 flex">
          <div className="absolute inset-0 bg-black/50" onClick={() => setOpen(false)} />
          <div className="relative flex flex-col w-64 bg-slate-900 border-r border-slate-700 min-h-full">
            <div className="flex items-center justify-between px-4 py-4 border-b border-slate-700">
              <div className="flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-blue-400" />
                <span className="text-white font-bold text-sm">Admin Panel</span>
              </div>
              <Button variant="ghost" size="icon" className="text-slate-400 h-7 w-7" onClick={() => setOpen(false)}>
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="flex-1 px-3 py-4">
              <NavLinks />
            </div>
            <div className="px-3 py-4 border-t border-slate-700">
              <Link href="/" onClick={() => setOpen(false)} className="flex items-center gap-3 rounded-lg px-3 py-2 text-sm text-slate-400 hover:text-white hover:bg-slate-700 mb-1 transition-all">
                <BarChart3 className="h-4 w-4" />
                View Site
              </Link>
              <Button
                variant="ghost"
                size="sm"
                className="w-full justify-start text-red-400 hover:text-red-300 hover:bg-red-900/20 px-3"
                onClick={() => { setOpen(false); handleLogout() }}
              >
                <LogOut className="h-4 w-4 mr-3" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
