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
    path: string
    user_agent: string | null
    ip_address: string | null
    created_at: string
  }>(
    `select id, path, user_agent, ip_address, created_at
     from admin_visits order by created_at desc limit 500`
  )

  return NextResponse.json({ visits: result?.rows || [] })
}
