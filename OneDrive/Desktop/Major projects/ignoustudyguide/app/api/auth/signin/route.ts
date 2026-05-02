import { NextRequest, NextResponse } from 'next/server'
import { createSessionToken, SESSION_COOKIE, verifyPassword } from '@/lib/auth'
import { queryOptional } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const login = String(body.login || body.email || '').trim().toLowerCase()
    const password = String(body.password || '')

    if (!login || !password) {
      return NextResponse.json({ error: 'Email/enrollment and password are required' }, { status: 400 })
    }

    const demoEmail = (process.env.ADMIN_DEMO_EMAIL || 'admin@ignoustudyguide.com').toLowerCase()
    const demoPassword = process.env.ADMIN_DEMO_PASSWORD || 'admin123'

    if (login === demoEmail && password === demoPassword) {
      const response = NextResponse.json({
        success: true,
        user: { id: 'demo-admin', email: demoEmail, role: 'admin' },
      })
      response.cookies.set(SESSION_COOKIE, createSessionToken({ userId: 'demo-admin', email: demoEmail, role: 'admin' }), {
        httpOnly: true,
        sameSite: 'lax',
        secure: process.env.NODE_ENV === 'production',
        path: '/',
        maxAge: 60 * 60 * 24,
      })
      return response
    }

    const result = await queryOptional<{
      id: string
      email: string
      role: string
      password_hash: string
    }>(
      `select id, email, role, password_hash
       from users
       where lower(email) = $1 or lower(coalesce(enrollment_number, '')) = $1
       limit 1`,
      [login]
    )

    const user = result?.rows[0]
    if (!user || !verifyPassword(password, user.password_hash)) {
      return NextResponse.json({ error: 'Invalid login details' }, { status: 401 })
    }

    const response = NextResponse.json({
      success: true,
      user: { id: user.id, email: user.email, role: user.role },
    })

    response.cookies.set(SESSION_COOKIE, createSessionToken({ userId: user.id, email: user.email, role: user.role }), {
      httpOnly: true,
      sameSite: 'lax',
      secure: process.env.NODE_ENV === 'production',
      path: '/',
      maxAge: 60 * 60 * 24 * 30,
    })

    return response
  } catch (error) {
    console.error('Signin failed:', error)
    return NextResponse.json({ error: 'Signin failed. Check database setup.' }, { status: 500 })
  }
}

