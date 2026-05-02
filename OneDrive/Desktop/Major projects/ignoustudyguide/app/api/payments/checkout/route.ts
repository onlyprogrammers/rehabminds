import { NextRequest, NextResponse } from 'next/server'
import { queryOptional } from '@/lib/db'

export const runtime = 'nodejs'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const materialId = String(body.materialId || '').trim()

    if (!materialId) {
      return NextResponse.json({ error: 'materialId is required' }, { status: 400 })
    }

    if (!process.env.STRIPE_SECRET_KEY) {
      return NextResponse.json({ error: 'Stripe is not configured' }, { status: 503 })
    }

    const materialResult = await queryOptional<{
      id: string
      title: string
      price_paise: number
      currency: string
    }>(
      `select id, title, price_paise, currency
       from marketplace_materials
       where id = $1 and status = 'approved'
       limit 1`,
      [materialId]
    )

    const material = materialResult?.rows[0]
    if (!material) {
      return NextResponse.json({ error: 'Material not found' }, { status: 404 })
    }

    if (material.price_paise <= 0) {
      return NextResponse.json({ free: true, url: `/materials?download=${material.id}` })
    }

    const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || request.nextUrl.origin

    const stripeBody = new URLSearchParams()
    stripeBody.set('mode', 'payment')
    stripeBody.set('line_items[0][price_data][currency]', material.currency.toLowerCase())
    stripeBody.set('line_items[0][price_data][product_data][name]', material.title)
    stripeBody.set('line_items[0][price_data][unit_amount]', String(material.price_paise))
    stripeBody.set('line_items[0][quantity]', '1')
    stripeBody.set('success_url', `${siteUrl}/materials?payment=success&session_id={CHECKOUT_SESSION_ID}`)
    stripeBody.set('cancel_url', `${siteUrl}/materials?payment=cancelled`)
    stripeBody.set('metadata[materialId]', material.id)

    const stripeResponse = await fetch('https://api.stripe.com/v1/checkout/sessions', {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.STRIPE_SECRET_KEY}`,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: stripeBody,
    })

    const session = await stripeResponse.json()
    if (!stripeResponse.ok) {
      return NextResponse.json({ error: session.error?.message || 'Stripe checkout failed' }, { status: 502 })
    }

    await queryOptional(
      `insert into payments
        (material_id, stripe_checkout_session_id, amount_paise, currency, status)
       values ($1, $2, $3, $4, 'created')`,
      [material.id, session.id, material.price_paise, material.currency]
    )

    return NextResponse.json({ url: session.url })
  } catch (error) {
    console.error('Checkout failed:', error)
    return NextResponse.json({ error: 'Checkout failed' }, { status: 500 })
  }
}
