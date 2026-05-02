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
  }>(
    `select id, title, material_type, programme, course_code, price_paise,
            seller_name, seller_email, status, created_at, file_url
     from marketplace_materials order by created_at desc limit 200`
  )

  return NextResponse.json({ materials: result?.rows || [] })
}

export async function PATCH(request: NextRequest) {
  if (!isAdmin(request)) {
    return NextResponse.json({ error: 'Admin access required' }, { status: 401 })
  }

  const body = await request.json()
  const { id, status } = body

  if (!id || !['approved', 'rejected', 'pending'].includes(status)) {
    return NextResponse.json({ error: 'Invalid request' }, { status: 400 })
  }

  await queryOptional(
    `update marketplace_materials set status = $1, updated_at = now() where id = $2`,
    [status, id]
  )

  return NextResponse.json({ success: true })
}
