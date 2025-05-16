"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight } from "lucide-react"
import mentalhelth from "@/components/images/mental health.png"
import team from "@/components/images/team.jpg"
import care from "@/components/images/care.jpg"

interface Slide {
  image: any
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
    image: care,
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
    image: team,
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
    image: mentalhelth,
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

export default function ModernHero() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  const nextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

  const prevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1))
    setTimeout(() => setIsAnimating(false), 500)
  }

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
  }, [])

  // Calculate positions for the circular arrangement
  const getCirclePosition = (index: number, total: number) => {
    // Adjust these values to control the size and position of the circle
    const radius = 180
    const centerX = 0
    const centerY = 0

    // Calculate angle based on index and total number of slides
    // Start from the top (270 degrees) and go clockwise
    const angle = (index / total) * 2 * Math.PI + (3 * Math.PI) / 2

    const x = centerX + radius * Math.cos(angle)
    const y = centerY + radius * Math.sin(angle)

    return { x, y }
  }

  return (
    <section className="py-16 md:py-24 overflow-hidden bg-gradient-to-br from-white to-accent/10">
      <div className="container">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left side: Content */}
          <div className="order-2 lg:order-1">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentSlide}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.5 }}
                className="space-y-6"
              >
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-primary leading-tight">
                  {slides[currentSlide].title}
                </h1>
                <p className="text-xl text-muted-foreground">{slides[currentSlide].subtitle}</p>
                <div className="flex flex-col sm:flex-row gap-4 pt-4">
                  <Link href={slides[currentSlide].cta.primary.link}>
                    <Button
                      size="lg"
                      className="bg-secondary text-secondary-foreground hover:bg-secondary/90 font-medium px-8"
                    >
                      {slides[currentSlide].cta.primary.text}
                    </Button>
                  </Link>
                  <Link href={slides[currentSlide].cta.secondary.link}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="border-primary text-primary hover:bg-primary/10 font-medium"
                    >
                      {slides[currentSlide].cta.secondary.text}
                    </Button>
                  </Link>
                </div>
              </motion.div>
            </AnimatePresence>

            {/* Slider controls */}
            <div className="flex items-center gap-4 mt-12">
              <Button
                onClick={prevSlide}
                variant="outline"
                size="icon"
                className="rounded-full border-primary text-primary hover:bg-primary/10"
                aria-label="Previous slide"
              >
                <ChevronLeft className="h-5 w-5" />
              </Button>

              <div className="flex gap-2">
                {slides.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToSlide(index)}
                    className={`w-3 h-3 rounded-full transition-all ${
                      index === currentSlide ? "bg-primary scale-125" : "bg-primary/30 hover:bg-primary/50"
                    }`}
                    aria-label={`Go to slide ${index + 1}`}
                  />
                ))}
              </div>

              <Button
                onClick={nextSlide}
                variant="outline"
                size="icon"
                className="rounded-full border-primary text-primary hover:bg-primary/10"
                aria-label="Next slide"
              >
                <ChevronRight className="h-5 w-5" />
              </Button>
            </div>
          </div>

          {/* Right side: Circular image arrangement */}
          <div className="order-1 lg:order-2 relative h-[400px] md:h-[500px]">
            <div className="absolute inset-0 flex items-center justify-center">
              {/* Main center image */}
              <AnimatePresence mode="wait">
                <motion.div
                  key={currentSlide}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.8 }}
                  transition={{ duration: 0.5 }}
                  className="relative w-[250px] h-[250px] md:w-[300px] md:h-[300px] rounded-full overflow-hidden border-4 border-white shadow-xl z-10"
                >
                  <Image
                    src={slides[currentSlide].image}
                    alt={slides[currentSlide].title}
                    fill
                    className=" h-100"
                    priority
                  />
                </motion.div>
              </AnimatePresence>

              {/* Circle of images */}
              <div className="absolute inset-0 flex items-center justify-center">
                {slides.map((slide, index) => {
                  if (index === currentSlide) return null

                  const position = getCirclePosition(index, slides.length)

                  return (
                    <motion.div
                      key={index}
                      className="absolute w-[100px] h-[100px] rounded-full overflow-hidden border-2 border-white shadow-md cursor-pointer"
                      style={{
                        left: "calc(50% + " + position.x + "px)",
                        top: "calc(50% + " + position.y + "px)",
                        transform: "translate(-50%, -50%)",
                      }}
                      whileHover={{ scale: 1.1 }}
                      onClick={() => goToSlide(index)}
                    >
                      <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover opacity-60 hover:opacity-80 transition-opacity w-full h-full"
                      />
                    </motion.div>
                  )
                })}
              </div>

              {/* Decorative circle */}
              <div className="absolute w-[400px] h-[400px] md:w-[500px] md:h-[500px] border-2 border-dashed border-primary/30 rounded-full"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
