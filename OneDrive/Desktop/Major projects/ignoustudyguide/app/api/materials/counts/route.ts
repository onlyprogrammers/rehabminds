import { NextRequest, NextResponse } from 'next/server'
import { getMaterialCountsByProgramme } from '@/lib/materials'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const programme = request.nextUrl.searchParams.get('programme')
  const materialType = request.nextUrl.searchParams.get('type') || undefined

  if (!programme) {
    return NextResponse.json({ error: 'programme query param is required' }, { status: 400 })
  }

  const counts = await getMaterialCountsByProgramme(programme, materialType)
  const countsMap: Record<string, number> = {}
  for (const row of counts) {
    countsMap[row.course_code] = parseInt(row.count, 10)
  }

  return NextResponse.json({ programme: programme.toUpperCase(), counts: countsMap })
}
