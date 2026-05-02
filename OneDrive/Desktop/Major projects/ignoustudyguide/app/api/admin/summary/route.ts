import { NextRequest, NextResponse } from 'next/server'
import { readSessionToken, SESSION_COOKIE } from '@/lib/auth'
import { queryOptional } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  const demoAdminEmail = (process.env.ADMIN_DEMO_EMAIL || 'admin@ignoustudyguide.com').toLowerCase()
  const isAdmin = session?.role === 'admin' || session?.email === demoAdminEmail

  if (!isAdmin) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
  }

  const result = await queryOptional<{
    users_count: string
    materials_count: string
    pending_materials_count: string
    payments_count: string
    cache_count: string
  }>(
    `select
      (select count(*) from users)::text as users_count,
      (select count(*) from marketplace_materials)::text as materials_count,
      (select count(*) from marketplace_materials where status = 'pending')::text as pending_materials_count,
      (select count(*) from payments)::text as payments_count,
      (select count(*) from scrape_cache)::text as cache_count`
  )

  return NextResponse.json({
    summary: result?.rows[0] || {
      users_count: '0',
      materials_count: '0',
      pending_materials_count: '0',
      payments_count: '0',
      cache_count: '0',
    },
  })
}
