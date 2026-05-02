import { Card, CardContent } from "@/components/ui/card"
import { SlidingNavbar } from "@/components/sliding-navbar"
import { GraduationCap, Search, Star } from "lucide-react"
import { Input } from "@/components/ui/input"
import Link from "next/link"
import { getDistinctProgrammes } from "@/lib/materials"
import { getAllProgrammes, getProgrammeFullName } from "@/lib/programmes"

const CARD_COLORS = [
  { color: "bg-blue-500" },
  { color: "bg-purple-500" },
  { color: "bg-green-500" },
  { color: "bg-orange-500" },
  { color: "bg-pink-500" },
]

const FALLBACK_POPULAR = [
  { code: "BCA", name: "Bachelor of Computer Applications", slug: "bca", count: 0 },
  { code: "MCA", name: "Master of Computer Applications", slug: "mca", count: 0 },
  { code: "BA", name: "Bachelor of Arts", slug: "ba", count: 0 },
  { code: "BCOM", name: "Bachelor of Commerce", slug: "bcom", count: 0 },
  { code: "BBA", name: "Bachelor of Business Administration", slug: "bba", count: 0 },
]

const FALLBACK_OTHER = [
  { code: "BSC", name: "Bachelor of Science", slug: "bsc" },
  { code: "MSC", name: "Master of Science", slug: "msc" },
  { code: "BED", name: "Bachelor of Education", slug: "bed" },
  { code: "MED", name: "Master of Education", slug: "med" },
  { code: "MBA", name: "Master of Business Administration", slug: "mba" },
  { code: "MCOM", name: "Master of Commerce", slug: "mcom" },
  { code: "BTS", name: "Bachelor of Tourism Studies", slug: "bts" },
  { code: "MTS", name: "Master of Tourism Studies", slug: "mts" },
  { code: "BLIS", name: "Bachelor of Library and Information Science", slug: "blis" },
  { code: "MLIS", name: "Master of Library and Information Science", slug: "mlis" },
  { code: "PGDCA", name: "Post Graduate Diploma in Computer Applications", slug: "pgdca" },
  { code: "PGDIBO", name: "Post Graduate Diploma in International Business Operations", slug: "pgdibo" },
]

export default async function NotesPage() {
  let popularPrograms = FALLBACK_POPULAR
  let otherPrograms: { code: string; name: string; slug: string; count?: number }[] = FALLBACK_OTHER

  try {
    const [dbRows, allProgrammes] = await Promise.all([
      getDistinctProgrammes('notes'),
      Promise.resolve(getAllProgrammes()),
    ])

    if (dbRows.length >= 1) {
      popularPrograms = dbRows.slice(0, 5).map(row => ({
        code: row.programme,
        name: getProgrammeFullName(allProgrammes, row.programme),
        slug: row.programme.toLowerCase(),
        count: parseInt(row.count, 10),
      }))

      const popularCodes = new Set(popularPrograms.map(p => p.code))
      const restFromDb = dbRows.slice(5).map(row => ({
        code: row.programme,
        name: getProgrammeFullName(allProgrammes, row.programme),
        slug: row.programme.toLowerCase(),
        count: parseInt(row.count, 10),
      }))
      const fallbackFiltered = FALLBACK_OTHER.filter(p => !popularCodes.has(p.code))
      otherPrograms = [
        ...restFromDb,
        ...fallbackFiltered.filter(f => !restFromDb.some(r => r.code === f.code)),
      ]
    }
  } catch {
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-indigo-50">
      <SlidingNavbar />

      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="container mx-auto px-4 py-4 lg:py-8">
          <div className="text-center">
            <div className="inline-flex items-center gap-2 bg-white/20 rounded-full px-4 py-2 mb-4">
              <GraduationCap className="h-5 w-5" />
              <span className="text-sm font-medium">NOTES</span>
            </div>
            <h1 className="text-lg lg:text-2xl font-bold mb-2">Find Your Program Notes</h1>
            <p className="text-blue-100 text-sm lg:text-xl max-w-2xl mx-auto">
              Download high-quality notes for all IGNOU programs with detailed solutions and explanations
            </p>
          </div>
        </div>
      </div>

      <div className="bg-white border-b shadow-sm">
        <div className="container mx-auto px-4 py-2">
          <div className="max-w-2xl mx-auto relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
            <Input
              placeholder="Search for programs, subjects, or note codes..."
              className="pl-12 h-12 text-base border-gray-300 focus:border-blue-500"
            />
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4 lg:py-12">
        <div className="mb-8">
          <div className="text-center mb-4">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">Popular Programs</h2>
            <p className="text-gray-600 text-lg">Most downloaded notes by our students</p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-5 gap-3 md:gap-6">
            {popularPrograms.map((program, idx) => (
              <Link key={program.code} href={`/notes/${program.slug}`}>
                <Card className="group hover:shadow-xl transition-all duration-300 cursor-pointer border-0 shadow-lg hover:scale-105">
                  <CardContent className="p-3 md:p-6 text-center">
                    <div
                      className={`w-12 h-12 md:w-16 md:h-16 ${CARD_COLORS[idx % CARD_COLORS.length].color} rounded-full flex items-center justify-center mx-auto mb-2 md:mb-4 group-hover:scale-110 transition-transform`}
                    >
                      <span className="text-white font-bold text-sm md:text-lg">{program.code}</span>
                    </div>
                    <h3 className="font-bold text-gray-900 text-xs md:text-sm mb-1 md:mb-2 line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {program.name}
                    </h3>
                    {(program.count ?? 0) > 0 && (
                      <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                        <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span>{program.count} notes</span>
                      </div>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div>
          <div className="text-center mb-8">
            <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-4">All Programs</h2>
            <p className="text-gray-600 text-lg">Browse notes for all IGNOU programs</p>
          </div>

          <div className="grid grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-3 md:gap-4">
            {otherPrograms.map((program) => (
              <Link key={program.code} href={`/notes/${program.slug}`}>
                <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105">
                  <CardContent className="p-3 md:p-4 text-center">
                    <div className="w-10 h-10 md:w-12 md:h-12 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-2 group-hover:bg-blue-100 transition-colors">
                      <span className="text-gray-600 font-semibold text-xs md:text-sm group-hover:text-blue-600">
                        {program.code}
                      </span>
                    </div>
                    <h3 className="font-medium text-gray-900 text-xs line-clamp-2 group-hover:text-blue-600 transition-colors">
                      {program.name}
                    </h3>
                    {(program.count ?? 0) > 0 && (
                      <p className="text-xs text-green-600 mt-1">{program.count} in DB</p>
                    )}
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>
        </div>

        <div className="mt-16 bg-white rounded-2xl shadow-lg p-6 lg:p-8">
          <div className="text-center mb-8">
            <h3 className="text-2xl lg:text-3xl font-bold text-gray-900 mb-2">Why Choose Our Notes?</h3>
            <p className="text-gray-600">Trusted by thousands of IGNOU students</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-blue-600 mb-2">500+</div>
              <div className="text-gray-600">Programs Covered</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-green-600 mb-2">10K+</div>
              <div className="text-gray-600">Notes</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-purple-600 mb-2">4.8</div>
              <div className="text-gray-600">Average Rating</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold text-orange-600 mb-2">95%</div>
              <div className="text-gray-600">Success Rate</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
