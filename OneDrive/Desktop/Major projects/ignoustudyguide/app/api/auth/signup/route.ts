import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, hashPassword, SESSION_COOKIE } from '@/lib/auth'
import { query } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const firstName = String(body.firstName || '').trim()
    const lastName = String(body.lastName || '').trim()
    const email = String(body.email || '').trim().toLowerCase()
    const phone = String(body.phone || '').trim()
    const enrollmentNumber = String(body.enrollmentNumber || '').trim()
    const programme = String(body.programme || '').trim()
    const password = String(body.password || '')

    if (!firstName || !email || !password) {
      return NextResponse.json({ error: 'Name, email and password are required' }, { status: 400 })
    }

    if (password.length < 8) {
      return NextResponse.json({ error: 'Password must be at least 8 characters' }, { status: 400 })
    }

    const result = await query<{ id: string; role: string }>(
      `insert into users
        (first_name, last_name, email, phone, enrollment_number, programme, password_hash)
       values ($1, $2, $3, $4, $5, $6, $7)
       returning id, role`,
      [
        firstName,
        lastName || null,
        email,
        phone || null,
        enrollmentNumber || null,
        programme || null,
        hashPassword(password),
      ]
    )

    const user = result.rows[0]
    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email, role: user.role },
    })

    response.cookies.set(SESSION_COOKIE, createSessionToken({ userId: user.id, email, role: user.role }), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (error: any) {
    if (error?.code === '23505') {
      return NextResponse.json({ error: 'Account already exists for this email or enrollment number' }, { status: 409 })
    }

    console.error('Signup failed:', error)
    return NextResponse.json({ error: 'Signup failed. Check database setup.' }, { status: 500 })
  }
}

