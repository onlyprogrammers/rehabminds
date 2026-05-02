"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight, ArrowRight, BookOpen, TrendingUp } from "lucide-react"
import slider1 from '@/components/images/logos/slider1.png'
import slider2 from '@/components/images/logos/slider2.png'
import slider3 from '@/components/images/logos/slider3.png'
import Image from "next/image"
import Link from "next/link"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      id: 1,
      title: "Master Your IGNOU Journey",
      subtitle: "Comprehensive Learning Platform",
      description: "Access expertly curated study materials, assignments, and resources designed to help you succeed in your distance learning program.",
      image: slider1,
      stats: { students: "50K+", success: "95%", resources: "500+" },
      cta: "Start Learning",
      ctaIcon: BookOpen,
      href: "/browse"
    },
    {
      id: 2,
      title: "Premium Assignments Solution",
      subtitle: "Expert-Verified Content",
      description: "Get comprehensive assignments written by subject matter experts with detailed explanations and guaranteed accuracy for your academic success.",
      image: slider2,
      stats: { assignments: "10K+", rating: "4.9★", delivery: "Instant" },
      cta: "Get Assignments",
      ctaIcon: ArrowRight,
      href: "/assignments"
    },
    {
      id: 3,
      title: "Track Your Academic Progress",
      subtitle: "Complete Academic Hub",
      description: "View your grades, track assignments, access previous question papers, and connect with our student community all in one place.",
      image: slider3,
      stats: { grades: "Real-time", community: "25K+", support: "24/7" },
      cta: "Access Dashboard",
      ctaIcon: TrendingUp,
      href: "/gradecard"
    },
  ]

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length)
    }, 5000)
    return () => clearInterval(timer)
  }, [slides.length])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <div className="relative h-auto md:h-[70vh] bg-gradient-to-br from-slate-950 via-slate-900 to-slate-800 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: 'url("data:image/svg+xml,%3Csvg width="60" height="60" viewBox="0 0 60 60" xmlns="http://www.w3.org/2000/svg"%3E%3Cg fill="none" fill-rule="evenodd"%3E%3Cg fill="%23ffffff" fill-opacity="0.1"%3E%3Cpath d="M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z"/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")'
        }} />
      </div>

      {/* Slide Content - Merged */}
      <div className="relative h-full flex items-center justify-center py-4 md:py-0">
        <div className="container mx-auto px-3 w-full">
          {/* Merged Container - Image with Text Overlay */}
          <div className="relative w-full h-full md:h-96 rounded-xl overflow-hidden group">
            {/* Background Image */}
            <Image
              src={slides[currentSlide].image}
              alt={slides[currentSlide].title}
              className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
            />

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-r from-slate-950/90 via-slate-900/80 to-slate-950/70" />

            {/* Glowing Border */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-blue-600 to-slate-600 rounded-xl blur opacity-30 group-hover:opacity-50 transition duration-700 pointer-events-none" />

            {/* Content Overlay */}
            <div className="relative h-full flex items-center px-4 md:px-8 py-4 md:py-6">
              <div className="space-y-2 md:space-y-3 text-white max-w-lg">
                {/* Badge */}
                <div className="inline-block">
                  <span className="text-[10px] sm:text-xs font-semibold text-blue-300 bg-blue-950/40 px-2 sm:px-2.5 py-0.5 sm:py-1 rounded-full border border-blue-900/50">
                    {slides[currentSlide].subtitle}
                  </span>
                </div>

                {/* Title */}
                <h1 className="text-lg sm:text-xl md:text-2xl lg:text-3xl font-bold leading-snug tracking-tight">
                  {slides[currentSlide].title}
                </h1>

                {/* Description */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed">
                  {slides[currentSlide].description}
                </p>

                {/* Stats - Compact */}
                <div className="grid grid-cols-3 gap-2 pt-1 md:pt-2">
                  {Object.entries(slides[currentSlide].stats).map(([key, value]) => (
                    <div key={key} className="text-center">
                      <div className="text-sm sm:text-base md:text-lg font-bold text-white">
                        {value}
                      </div>
                      <div className="text-[10px] sm:text-xs text-slate-300 capitalize mt-0.5 truncate">
                        {key}
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA Buttons - Compact */}
                <div className="flex flex sm:flex-row gap-1.5 md:gap-2 pt-2 md:pt-3">
                  <Link href={slides[currentSlide].href} className="flex-1 sm:flex-none">
                    <Button className="w-full sm:w-auto bg-blue-600 hover:bg-blue-700 text-white font-semibold px-4 sm:px-5 py-1.5 sm:py-2 text-xs sm:text-sm rounded-md transition-all duration-300 shadow-lg hover:shadow-xl">
                      {(() => {
                        const IconComponent = slides[currentSlide].ctaIcon
                        return <IconComponent className="mr-1 h-3 w-3" />
                      })()}
                      {slides[currentSlide].cta}
                    </Button>
                  </Link>

                
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
<br />
      {/* Navigation Controls - Compact */}
      <div className="absolute bottom-3 md:bottom-4 left-0 right-0 flex items-center justify-center gap-2 md:gap-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="h-8 w-8 md:h-9 md:w-9 text-white border border-slate-600 hover:bg-slate-700/50 hover:border-slate-500 rounded-full transition-all duration-300"
        >
          <ChevronLeft className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </Button>

        {/* Slide Indicators */}
        <div className="flex gap-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? "bg-blue-500 w-4 md:w-5 h-1.5 md:h-2"
                  : "bg-slate-600 hover:bg-slate-500 w-1.5 md:w-2 h-1.5 md:h-2"
              }`}
              aria-label={`Go to slide ${index + 1}`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="h-8 w-8 md:h-9 md:w-9 text-white border border-slate-600 hover:bg-slate-700/50 hover:border-slate-500 rounded-full transition-all duration-300"
        >
          <ChevronRight className="h-3.5 w-3.5 md:h-4 md:w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-slate-700">
        <div
          className="h-full bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-[5000ms] ease-linear"
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
