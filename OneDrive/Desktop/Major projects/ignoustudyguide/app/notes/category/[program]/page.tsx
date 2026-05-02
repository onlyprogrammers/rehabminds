import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Search, Filter, GraduationCap, Download, IndianRupee } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"
import Link from "next/link"
import { getMaterialListings } from "@/lib/materials"

export default async function noteCategoryPage({ params }: { params: { program: string } }) {
  const programName = params.program.toUpperCase()
  const dbNotes = await getMaterialListings("notes", "approved", programName)

  return (
    <div className="min-h-screen bg-gray-50">
      <SlidingNavbar />

      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
          <div className="flex items-center gap-2 mb-2">
            <Link href="/notes" className="text-blue-600 hover:text-blue-800 text-sm">
              Notes
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-sm text-gray-600">{programName}</span>
          </div>
          <div className="flex items-center gap-3 mb-2 lg:mb-4">
            <GraduationCap className="h-6 w-6 lg:h-8 lg:w-8 text-blue-600" />
            <div>
              <h1 className="text-xl lg:text-3xl font-bold text-gray-900">{programName} Notes</h1>
              <p className="text-sm text-gray-500 mt-0.5">{dbNotes.length} note{dbNotes.length !== 1 ? 's' : ''} available</p>
            </div>
          </div>
          <p className="text-sm lg:text-lg text-gray-600">
            Notes for {programName} program from our database
          </p>
        </div>
      </div>

      <div className="bg-white border-b">
        <div className="container mx-auto px-2 lg:px-4 py-2 lg:py-4">
          <div className="flex flex-col lg:flex-row gap-2 lg:gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-2 lg:left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  placeholder={`Search ${programName} notes...`}
                  className="pl-8 lg:pl-10 h-8 lg:h-10 text-sm"
                />
              </div>
            </div>
            <div className="flex gap-2">
              <Select>
                <SelectTrigger className="w-24 lg:w-32 h-8 lg:h-10 text-xs lg:text-sm">
                  <SelectValue placeholder="Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="free">Free</SelectItem>
                  <SelectItem value="paid">Paid</SelectItem>
                </SelectContent>
              </Select>
              <Button variant="outline" size="sm" className="h-8 lg:h-10 px-2 lg:px-4 bg-transparent">
                <Filter className="h-3 w-3 lg:h-4 lg:w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-2 lg:px-4 py-3 lg:py-6">
        {dbNotes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {dbNotes.map((note) => (
              <article key={note.id} className="rounded-lg border border-gray-200 bg-white p-4 shadow-sm hover:shadow-md transition">
                <div className="flex flex-col gap-3">
                  <div>
                    <div className="mb-2 flex flex-wrap gap-2 text-xs text-gray-500">
                      <span className="rounded-md bg-blue-50 px-2 py-1 text-blue-700 font-medium">{note.material_type}</span>
                      {note.programme && <span className="rounded-md bg-gray-100 px-2 py-1">{note.programme}</span>}
                      {note.course_code && (
                        <span className="rounded-md bg-purple-50 px-2 py-1 text-purple-700">{note.course_code}</span>
                      )}
                    </div>
                    <h3 className="font-semibold text-gray-900 text-sm">{note.title}</h3>
                    {note.description && (
                      <p className="mt-1 text-xs text-gray-600 line-clamp-2">{note.description}</p>
                    )}
                    {note.seller_name && (
                      <p className="mt-2 text-xs text-gray-500">By {note.seller_name}</p>
                    )}
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-sm font-bold text-blue-600">
                      {note.price_paise === 0 ? 'Free' : `₹${note.price_paise / 100}`}
                    </span>
                    <a
                      href={note.file_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium px-3 py-1.5 rounded-lg transition"
                    >
                      {note.price_paise > 0 ? (
                        <><IndianRupee className="h-3 w-3" /> Buy</>
                      ) : (
                        <><Download className="h-3 w-3" /> Download</>
                      )}
                    </a>
                  </div>
                </div>
              </article>
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <GraduationCap className="h-16 w-16 text-gray-300 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 mb-2">No notes found</h3>
            <p className="text-gray-600 mb-4">No notes available for {programName} program yet.</p>
            <Link href="/materials">
              <Button>Upload Notes</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  )
}
