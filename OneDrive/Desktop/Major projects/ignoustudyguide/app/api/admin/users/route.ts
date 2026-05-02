import { NextRequest, NextResponse } from 'next/server'
import { readSessionToken, SESSION_COOKIE } from '@/lib/auth'
import { queryOptional } from '@/lib/db'

export const runtime = 'nodejs'

function isAdmin(request: NextRequest) {
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  const demoEmail = (process.env.ADMIN_DEMO_EMAIL || 'admin@ignoustudyguide.com').toLowerCase()
  return session?.role === 'admin' || session?.email === demoEmail
}

export async function GET(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
  }

  const result = await queryOptional<{
    id: string
    first_name: string
    last_name: string | null
    email: string
    phone: string | null
    enrollment_number: string | null
    programme: string | null
    role: string
    created_at: string
  }>(
    `select id, first_name, last_name, email, phone, enrollment_number, programme, role, created_at
     from users order by created_at desc limit 100`
  )

  return NextResponse.json({ users: result?.rows || [] })
}
