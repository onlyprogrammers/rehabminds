import { NextRequest, NextResponse } from 'next/server'
import { createMaterialListing, getMaterialListings } from '@/lib/materials'
import { readSessionToken, SESSION_COOKIE } from '@/lib/auth'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const materialType = request.nextUrl.searchParams.get('type') || undefined
  const status = request.nextUrl.searchParams.get('status') || 'approved'
  const programme = request.nextUrl.searchParams.get('programme') || undefined
  const mine = request.nextUrl.searchParams.get('mine') === 'true'

  let userId: string | undefined
  if (mine) {
    const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value)
    userId = session?.id
  }

  const materials = await getMaterialListings(materialType, status, programme, userId)
  return NextResponse.json({ materials })
}

export async function POST(request: NextRequest) {
  try {
    const session = readSessionToken(request.cookies.get(SESSION_COOKIE)?.value)
    const body = await request.json()
    const title = String(body.title || '').trim()
    const fileUrl = String(body.fileUrl || '').trim()
    const materialType = String(body.materialType || 'assignment').trim()

    if (!title || !fileUrl) {
      return NextResponse.json({ error: 'Title and file URL are required' }, { status: 400 })
    }

    const priceRupees = Number(body.price || 0)
    const listing = await createMaterialListing({
      userId: session?.id,
      title,
      description: String(body.description || '').trim(),
      materialType,
      programme: String(body.programme || '').trim(),
      courseCode: String(body.courseCode || '').trim().toUpperCase(),
      semester: String(body.semester || '').trim() || undefined,
      pricePaise: Math.max(0, Math.round(priceRupees * 100)),
      currency: String(body.currency || 'INR').trim().toUpperCase(),
      fileUrl,
      previewUrl: String(body.previewUrl || '').trim(),
      sellerName: String(body.sellerName || '').trim(),
      sellerEmail: String(body.sellerEmail || '').trim(),
    })

    if (!listing) {
      return NextResponse.json({ error: 'Database is not enabled or listing could not be saved' }, { status: 503 })
    }

    return NextResponse.json({ success: true, listing }, { status: 201 })
  } catch (error) {
    console.error('Material upload failed:', error)
    return NextResponse.json({ error: 'Material upload failed' }, { status: 500 })
  }
}
