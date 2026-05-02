"use client"

import type React from "react"
import { useState, useRef, useEffect } from "react"
import { ChevronRight } from "lucide-react"
import ProductCard from "./product-card"

interface Assignment {
  id: string
  code: string
  title: string
  program: string
  semester: string
  price: number
  originalPrice?: number
  type: "free" | "premium"
  rating: number
  reviews: number
  downloads: number
  description: string
  image: string
  category: "assignment"
}

const fallbackAssignments: Assignment[] = [
  {
    id: "1",
    code: "MCS-011",
    title: "Problem Solving and Programming",
    program: "MCA",
    semester: "1st",
    price: 0,
    type: "free",
    rating: 4.8,
    reviews: 125,
    downloads: 2500,
    description: "Complete assignment solutions for MCS-011 with detailed explanations and code examples.",
    image: "/api/placeholder/300/200",
    category: "assignment"
  },
  {
    id: "2",
    code: "MCS-012",
    title: "Computer Organisation and Assembly Language Programming",
    program: "MCA",
    semester: "1st",
    price: 299,
    originalPrice: 399,
    type: "premium",
    rating: 4.9,
    reviews: 98,
    downloads: 1800,
    description: "Comprehensive solutions for MCS-012 including assembly code and organization concepts.",
    image: "/api/placeholder/300/200",
    category: "assignment"
  },
  {
    id: "3",
    code: "MCS-013",
    title: "Discrete Mathematics",
    program: "MCA",
    semester: "1st",
    price: 0,
    type: "free",
    rating: 4.7,
    reviews: 156,
    downloads: 3200,
    description: "Detailed solutions for discrete mathematics problems with step-by-step explanations.",
    image: "/api/placeholder/300/200",
    category: "assignment"
  },
  {
    id: "4",
    code: "MCS-014",
    title: "Systems Analysis and Design",
    program: "MCA",
    semester: "1st",
    price: 349,
    originalPrice: 449,
    type: "premium",
    rating: 4.6,
    reviews: 87,
    downloads: 1500,
    description: "Complete assignment solutions for systems analysis and design with case studies.",
    image: "/api/placeholder/300/200",
    category: "assignment"
  },
  {
    id: "5",
    code: "MCS-015",
    title: "Communication Skills",
    program: "MCA",
    semester: "1st",
    price: 0,
    type: "free",
    rating: 4.5,
    reviews: 203,
    downloads: 4100,
    description: "Communication skills assignments with practical examples and writing tips.",
    image: "/api/placeholder/300/200",
    category: "assignment"
  },
  {
    id: "6",
    code: "BCS-011",
    title: "Computer Basics and PC Software",
    program: "BCA",
    semester: "1st",
    price: 199,
    originalPrice: 299,
    type: "premium",
    rating: 4.8,
    reviews: 142,
    downloads: 2800,
    description: "Comprehensive solutions for BCS-011 covering computer basics and software applications.",
    image: "/api/placeholder/300/200",
    category: "assignment"
  },
]

interface DbAssignment {
  id: string
  title: string
  material_type: string
  description: string | null
  programme: string | null
  course_code: string | null
  price_paise: number
  file_url: string
  seller_name: string | null
}

function dbToAssignment(item: DbAssignment): Assignment {
  return {
    id: item.id,
    code: item.course_code || item.programme || "–",
    title: item.title,
    program: item.programme || "IGNOU",
    semester: "–",
    price: item.price_paise / 100,
    type: item.price_paise === 0 ? "free" : "premium",
    rating: 4.5,
    reviews: 0,
    downloads: 0,
    description: item.description || "",
    image: "/api/placeholder/300/200",
    category: "assignment",
  }
}

export default function ProductSlider() {
  const scrollContainerRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)
  const [isDragging, setIsDragging] = useState(false)
  const dragStartX = useRef(0)
  const scrollLeftStart = useRef(0)
  const [assignments, setAssignments] = useState<Assignment[]>(fallbackAssignments)

  useEffect(() => {
    const programmeCode = localStorage.getItem('userProgrammeCode')
    if (!programmeCode) return

    fetch(`/api/materials?type=assignment&programme=${encodeURIComponent(programmeCode)}&status=approved`)
      .then((r) => r.json())
      .then((data) => {
        const items: DbAssignment[] = data.materials || []
        if (items.length > 0) {
          setAssignments(items.map(dbToAssignment))
        }
      })
      .catch(() => {})
  }, [])

  const checkScroll = () => {
    if (scrollContainerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current
      setCanScrollLeft(scrollLeft > 0)
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10)
    }
  }

  useEffect(() => {
    checkScroll()
    const container = scrollContainerRef.current
    container?.addEventListener("scroll", checkScroll)
    return () => container?.removeEventListener("scroll", checkScroll)
  }, [assignments])

  const handleMouseDown = (e: React.MouseEvent) => {
    if (scrollContainerRef.current) {
      setIsDragging(true)
      dragStartX.current = e.clientX
      scrollLeftStart.current = scrollContainerRef.current.scrollLeft
    }
  }

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging || !scrollContainerRef.current) return
    const x = e.clientX - dragStartX.current
    scrollContainerRef.current.scrollLeft = scrollLeftStart.current - x
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const scroll = (direction: "left" | "right") => {
    if (scrollContainerRef.current) {
      const scrollAmount = 400
      scrollContainerRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      })
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative group">
        <div
          ref={scrollContainerRef}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
          className="flex gap-3 overflow-x-auto pb-4 cursor-grab pl-5"
          style={{userSelect:'none'}}
        >
          {assignments.map((assignment) => (
            <div key={assignment.id} className="flex-shrink-0 w-40">
              <ProductCard
                id={assignment.id}
                code={assignment.code}
                title={assignment.title}
                program={assignment.program}
                semester={assignment.semester}
                price={assignment.price}
                originalPrice={assignment.originalPrice}
                type={assignment.type}
                rating={assignment.rating}
                reviews={assignment.reviews}
                downloads={assignment.downloads}
                description={assignment.description}
                image={assignment.image}
                category={assignment.category}
                linkPrefix="/assignments"
              />
            </div>
          ))}
        </div>

        {canScrollLeft && (
          <button
            onClick={() => scroll("left")}
            className="absolute left-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-600 rotate-180" />
          </button>
        )}
        {canScrollRight && (
          <button
            onClick={() => scroll("right")}
            className="absolute right-0 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white shadow-lg rounded-full p-2 z-10 transition-all duration-200"
          >
            <ChevronRight className="h-5 w-5 text-gray-600" />
          </button>
        )}
      </div>
    </div>
  )
}
