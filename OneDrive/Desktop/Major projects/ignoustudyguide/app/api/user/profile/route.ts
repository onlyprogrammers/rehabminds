import { NextRequest, NextResponse } from 'next/server'
import { readSessionToken, SESSION_COOKIE } from '@/lib/auth'
import { queryOptional } from '@/lib/db'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value)
  if (!session) {
    return NextResponse.json({ error: 'Unauthorized' }, { status: 401 })
  }

  if (session.userId === 'demo-admin') {
    return NextResponse.json({
      user: {
        id: 'demo-admin',
        firstName: 'Admin',
        lastName: '',
        email: session.email,
        phone: null,
        enrollmentNumber: null,
        programme: null,
        role: session.role,
        createdAt: null,
      },
    })
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
     from users where id = $1 limit 1`,
    [session.userId]
  )

  const row = result?.rows[0]
  if (!row) {
    return NextResponse.json({ error: 'User not found' }, { status: 404 })
  }

  return NextResponse.json({
    user: {
      id: row.id,
      firstName: row.first_name,
      lastName: row.last_name,
      email: row.email,
      phone: row.phone,
      enrollmentNumber: row.enrollment_number,
      programme: row.programme,
      role: row.role,
      createdAt: row.created_at,
    },
  })
}
