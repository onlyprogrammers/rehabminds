"use client"

import { useState, useEffect, useCallback } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ChevronLeft, ChevronRight } from "lucide-react"

interface Slide {
  image: string
  title: string
  subtitle: string
  cta: {
    primary: {
      text: string
      link: string
    }
    secondary: {
      text: string
      link: string
    }
  }
}

const slides: Slide[] = [
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "Compassionate Care for Mental Wellness",
    subtitle:
      "Professional psychiatric services dedicated to helping you achieve mental well-being through personalized care.",
    cta: {
      primary: {
        text: "Book Appointment",
        link: "/appointment",
      },
      secondary: {
        text: "Our Services",
        link: "/services",
      },
    },
  },
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "Expert Team of Mental Health Specialists",
    subtitle:
      "Our qualified psychiatrists and psychologists are here to provide the support you need on your journey to wellness.",
    cta: {
      primary: {
        text: "Meet Our Team",
        link: "/specialists",
      },
      secondary: {
        text: "Learn More",
        link: "/about",
      },
    },
  },
  {
    image: "/placeholder.svg?height=600&width=1200",
    title: "Comprehensive Mental Health Services",
    subtitle:
      "From therapy and counseling to specialized treatments, we offer a wide range of services to address your needs.",
    cta: {
      primary: {
        text: "Explore Services",
        link: "/services",
      },
      secondary: {
        text: "Contact Us",
        link: "/contact",
      },
    },
  },
]

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const prevSlide = useCallback(() => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }, [isAnimating])

  const goToSlide = (index: number) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  useEffect(() => {
    const interval = setInterval(() => {
      nextSlide()
    }, 6000)

    return () => clearInterval(interval)
  }, [nextSlide])

  return (
    <div className="hero-slider relative overflow-hidden h-[600px] md:h-[700px]">
      {slides.map((slide, index) => (
        <div
          key={index}
          className={`slide absolute inset-0 transition-opacity duration-1000 ${
            index === currentSlide ? "opacity-100 z-10" : "opacity-0 z-0"
          }`}
        >
          <div className="slide-overlay absolute inset-0 bg-gradient-to-r from-primary/80 to-primary/40"></div>
          <Image
            src={slide.image || "/placeholder.svg"}
            alt={slide.title}
            fill
            className="slide-image object-cover"
            priority
          />
          <div className="container relative z-20 h-full flex flex-col justify-center">
            <div className="max-w-3xl animate-fade-in">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-blue mb-6 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl text-blue/90 mb-8 max-w-2xl">{slide.subtitle}</p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href={slide.cta.primary.link}>
                  <Button
                    size="lg"
                    className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium px-8"
                  >
                    {slide.cta.primary.text}
                  </Button>
                </Link>
                <Link href={slide.cta.secondary.link}>
                  <Button size="lg" variant="outline" className="border-white text-blue hover:bg-white/10 font-medium">
                    {slide.cta.secondary.text}
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6 text-white" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/30 rounded-full p-2 backdrop-blur-sm transition-all"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6 text-white" />
      </button>

      {/* Dots */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-2">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-3 h-3 rounded-full transition-all ${
              index === currentSlide ? "bg-white scale-125" : "bg-white/50 hover:bg-white/70"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
