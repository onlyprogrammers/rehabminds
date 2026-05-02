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
    user_email: string | null
    material_title: string | null
    amount_paise: number
    currency: string
    status: string
    created_at: string
  }>(
    `select p.id, u.email as user_email, m.title as material_title,
            p.amount_paise, p.currency, p.status, p.created_at
     from payments p
     left join users u on u.id = p.user_id
     left join marketplace_materials m on m.id = p.material_id
     order by p.created_at desc limit 200`
  )

  return NextResponse.json({ payments: result?.rows || [] })
}
