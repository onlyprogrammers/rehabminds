import { NextResponse, NextRequest } from 'next/server'
import { getAllProgrammes, findProgramme, getProgrammeSemesters, findCourseInProgrammes } from '@/lib/programmes'

export const runtime = 'nodejs'

export async function GET(request: NextRequest) {
  const code = request.nextUrl.searchParams.get('code')
  const courseCode = request.nextUrl.searchParams.get('courseCode')

  const programmes = getAllProgrammes()

  if (courseCode) {
    const result = findCourseInProgrammes(programmes, courseCode)
    if (result) {
      return NextResponse.json(result)
    }
    return NextResponse.json({ semester: null, programmeCode: null })
  }

  if (!code) {
    return NextResponse.json({ error: 'code or courseCode param required' }, { status: 400 })
  }

  const prog = findProgramme(programmes, code)
  if (!prog) {
    return NextResponse.json({ error: 'Programme not found' }, { status: 404 })
  }

  const semesters = getProgrammeSemesters(prog)

  return NextResponse.json({
    code: prog.programme_code,
    name: prog.title,
    semesters,
  })
}
