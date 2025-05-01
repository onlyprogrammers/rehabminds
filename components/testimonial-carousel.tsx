"use client"

import { useState, useEffect } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, Quote } from "lucide-react"

const testimonials = [
  {
    id: 1,
    name: "Priya S.",
    text: "Dr. Kiran's approach to therapy completely changed my perspective on mental health. After struggling with anxiety for years, I finally feel like I have the tools to manage it effectively.",
    rating: 5,
  },
  {
    id: 2,
    name: "Rahul M.",
    text: "The family counseling services at Rehab Minds helped us navigate a difficult period in our lives. The therapist was compassionate, insightful, and provided practical strategies that worked for our family.",
    rating: 5,
  },
  {
    id: 3,
    name: "Anjali K.",
    text: "I was hesitant to seek help for my depression, but the team at Rehab Minds made me feel comfortable from day one. Their personalized approach to treatment has made a significant difference in my life.",
    rating: 5,
  },
  {
    id: 4,
    name: "Vikram T.",
    text: "The child psychology services have been invaluable for my son. The specialists truly understand how to connect with children and provide effective support for behavioral challenges.",
    rating: 4,
  },
  {
    id: 5,
    name: "Meera P.",
    text: "After trying various approaches to manage my OCD, the treatment plan developed by Rehab Minds finally gave me relief. Their expertise in evidence-based therapies is exceptional.",
    rating: 5,
  },
]

export default function TestimonialCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [visibleTestimonials, setVisibleTestimonials] = useState<typeof testimonials>([])

  useEffect(() => {
    // Determine how many testimonials to show based on screen size
    const handleResize = () => {
      let count = 1
      if (window.innerWidth >= 1024) {
        count = 3
      } else if (window.innerWidth >= 768) {
        count = 2
      }

      const visible = []
      for (let i = 0; i < count; i++) {
        const index = (currentIndex + i) % testimonials.length
        visible.push(testimonials[index])
      }
      setVisibleTestimonials(visible)
    }

    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [currentIndex])

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? testimonials.length - 1 : prevIndex - 1))
  }

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length)
  }

  const renderStars = (rating: number) => {
    return Array(5)
      .fill(0)
      .map((_, i) => (
        <svg
          key={i}
          className={`h-5 w-5 ${i < rating ? "text-secondary" : "text-gray-300"}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))
  }

  return (
    <div className="relative">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Patient Testimonials</h3>
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="icon"
            onClick={handlePrevious}
            aria-label="Previous testimonial"
            className="rounded-full"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>
          <Button
            variant="outline"
            size="icon"
            onClick={handleNext}
            aria-label="Next testimonial"
            className="rounded-full"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {visibleTestimonials.map((testimonial) => (
          <Card key={testimonial.id} className="h-full hover:shadow-lg transition-all border-accent/50">
            <CardContent className="pt-8">
              <Quote className="h-10 w-10 text-secondary/30 mb-6" />
              <p className="mb-6 italic text-lg">{testimonial.text}</p>
              <div className="mt-auto">
                <div className="flex items-center mb-3">{renderStars(testimonial.rating)}</div>
                <p className="font-semibold text-lg">{testimonial.name}</p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
