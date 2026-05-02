import { NextResponse, NextRequest } from 'next/server'
import { getDistinctProgrammes } from '@/lib/materials'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const materialType = request.nextUrl.searchParams.get('type') || undefined
  const rows = await getDistinctProgrammes(materialType)
  return NextResponse.json({
    programmes: rows.map(r => ({
      programme: r.programme,
      count: parseInt(r.count, 10),
    })),
  })
}
