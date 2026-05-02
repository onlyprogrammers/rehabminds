import { readFileSync } from 'fs'
import { join } from 'path'

export interface ProgrammeCourse {
  course_title: string
  course_code: string
  credit: number
  semester: string
}

export interface ProgrammeEntry {
  title: string
  programme_code: string
  courses: ProgrammeCourse[]
}

export interface SemesterGroup {
  id: string
  name: string
  subjects: { code: string; name: string }[]
}

let cached: ProgrammeEntry[] | null = null

export function getAllProgrammes(): ProgrammeEntry[] {
  if (!cached) {
    const path = join(process.cwd(), 'public', 'programmes_with_courses.json')
    cached = JSON.parse(readFileSync(path, 'utf8'))
  }
  return cached!
}

export function findProgramme(programmes: ProgrammeEntry[], code: string): ProgrammeEntry | null {
  const upper = code.toUpperCase()
  let found = programmes.find(p => p.programme_code.toUpperCase() === upper)
  if (found) return found
  found = programmes.find(p => {
    const base = p.programme_code.toUpperCase()
      .replace(/_NEWOL$/, '')
      .replace(/_NEW$/, '')
      .replace(/OL$/, '')
    return base === upper
  })
  return found ?? null
}

const SEMESTER_ORDER = [
  'Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6',
  'Yearly 1', 'Yearly 2', 'Half Yearly 1', 'Half Yearly 2',
  'Six monlhly 1', 'Six monlhly 2',
]

export function getProgrammeSemesters(prog: ProgrammeEntry): SemesterGroup[] {
  const semesterMap = new Map<string, { code: string; name: string }[]>()
  for (const course of prog.courses) {
    if (!semesterMap.has(course.semester)) {
      semesterMap.set(course.semester, [])
    }
    semesterMap.get(course.semester)!.push({
      code: course.course_code,
      name: course.course_title,
    })
  }

  return Array.from(semesterMap.entries())
    .sort(([a], [b]) => {
      const ai = SEMESTER_ORDER.indexOf(a)
      const bi = SEMESTER_ORDER.indexOf(b)
      if (ai !== -1 && bi !== -1) return ai - bi
      if (ai !== -1) return -1
      if (bi !== -1) return 1
      return a.localeCompare(b)
    })
    .map(([name, subjects]) => ({
      id: name.toLowerCase().replace(/\s+/g, '-'),
      name,
      subjects,
    }))
}

export function findCourseInProgrammes(
  programmes: ProgrammeEntry[],
  courseCode: string
): { semester: string; programmeCode: string; programmeTitle: string; courseTitle: string } | null {
  const normalizedCC = courseCode.toUpperCase().replace(/[-\s]/g, '')
  for (const prog of programmes) {
    const course = prog.courses.find(
      c => c.course_code.toUpperCase().replace(/[-\s]/g, '') === normalizedCC
    )
    if (course) {
      return {
        semester: course.semester,
        programmeCode: prog.programme_code,
        programmeTitle: prog.title,
        courseTitle: course.course_title,
      }
    }
  }
  return null
}

export function getProgrammeFullName(programmes: ProgrammeEntry[], code: string): string {
  const prog = findProgramme(programmes, code)
  return prog?.title ?? code
}
