'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  GraduationCap,
  Mail,
  Phone,
  BookOpen,
  Hash,
  Shield,
  CalendarDays,
  LogOut,
  Loader2,
  UserCircle,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { SlidingNavbar } from '@/components/sliding-navbar'

type UserProfile = {
  id: string
  firstName: string
  lastName: string | null
  email: string
  phone: string | null
  enrollmentNumber: string | null
  programme: string | null
  role: string
  createdAt: string | null
}

export default function MyAccountPage() {
  const router = useRouter()
  const [profile, setProfile] = useState<UserProfile | null>(null)
  const [loading, setLoading] = useState(true)
  const [loggingOut, setLoggingOut] = useState(false)

  useEffect(() => {
    fetch('/api/user/profile')
      .then((r) => {
        if (r.status === 401) {
          router.push('/signin')
          return null
        }
        return r.json()
      })
      .then((data) => {
        if (data) setProfile(data.user)
      })
      .catch(() => router.push('/signin'))
      .finally(() => setLoading(false))
  }, [router])

  async function handleLogout() {
    setLoggingOut(true)
    await fetch('/api/auth/logout', { method: 'POST' })
    router.push('/')
    router.refresh()
  }

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
      </div>
    )
  }

  if (!profile) return null

  const fullName = [profile.firstName, profile.lastName].filter(Boolean).join(' ')
  const joinedDate = profile.createdAt
    ? new Date(profile.createdAt).toLocaleDateString('en-IN', { year: 'numeric', month: 'long', day: 'numeric' })
    : null

  return (
    <>
      <SlidingNavbar />
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-10 px-4">
        <div className="container mx-auto max-w-2xl space-y-6">
          <Card className="shadow-md">
            <CardHeader className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-t-lg text-white pb-8 pt-6">
              <div className="flex items-center space-x-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-full bg-white/20 shadow-inner">
                  <UserCircle className="h-10 w-10 text-white" />
                </div>
                <div>
                  <CardTitle className="text-2xl font-bold">{fullName}</CardTitle>
                  <p className="text-blue-100 text-sm mt-1">{profile.email}</p>
                  <Badge className="mt-2 bg-white/20 text-white border-0 capitalize">
                    {profile.role}
                  </Badge>
                </div>
              </div>
            </CardHeader>

            <CardContent className="pt-6 space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <InfoRow icon={Mail} label="Email" value={profile.email} />
                <InfoRow icon={Phone} label="Phone" value={profile.phone ?? '—'} />
                <InfoRow icon={Hash} label="Enrollment Number" value={profile.enrollmentNumber ?? '—'} />
                <InfoRow icon={BookOpen} label="Programme" value={profile.programme ? profile.programme.toUpperCase() : '—'} />
                <InfoRow icon={Shield} label="Role" value={profile.role.charAt(0).toUpperCase() + profile.role.slice(1)} />
                {joinedDate && <InfoRow icon={CalendarDays} label="Member Since" value={joinedDate} />}
              </div>

              <div className="pt-4 flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  className="flex-1 border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700"
                  onClick={handleLogout}
                  disabled={loggingOut}
                >
                  {loggingOut ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <LogOut className="mr-2 h-4 w-4" />
                  )}
                  Logout
                </Button>
                <Link href="/" className="flex-1">
                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <GraduationCap className="mr-2 h-4 w-4" />
                    Go to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  )
}

function InfoRow({ icon: Icon, label, value }: { icon: React.ElementType; label: string; value: string }) {
  return (
    <div className="flex items-start space-x-3 rounded-lg border bg-gray-50 p-3">
      <Icon className="mt-0.5 h-4 w-4 text-blue-500 shrink-0" />
      <div>
        <p className="text-xs text-gray-500 font-medium">{label}</p>
        <p className="text-sm text-gray-800 font-semibold">{value}</p>
      </div>
    </div>
  )
}
