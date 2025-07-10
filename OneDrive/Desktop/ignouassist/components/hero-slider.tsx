"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ChevronLeft, ChevronRight, Play, Zap, Star, BookOpen, Trophy, Users } from "lucide-react"

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isMobile, setIsMobile] = useState(false)
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 508)
    }
    handleResize() // Initial check
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const slides = [
    {
      id: 1,
      title: "Master Your IGNOU Journey",
      subtitle: "AI-Powered Learning Platform",
      description:
        "Experience the future of distance learning with our advanced AI-driven study materials and personalized guidance.",
      image: "/placeholder.svg?height=400&width=600",
      gradient: "from-blue-600 via-purple-600 to-cyan-500",
      stats: { students: "50K+", success: "95%", courses: "500+" },
      cta: "Start Learning",
      ctaIcon: Play,
    },
    {
      id: 2,
      title: "Premium Assignments Hub",
      subtitle: "Expert-Crafted Solutions",
      description:
        "Get access to premium assignments written by subject experts with guaranteed high scores and instant delivery.",
      image: "/placeholder.svg?height=400&width=600",
      gradient: "from-emerald-500 via-teal-500 to-blue-600",
      stats: { assignments: "10K+", rating: "4.9★", delivery: "24h" },
      cta: "Get Assignments",
      ctaIcon: BookOpen,
    },
    {
      id: 3,
      title: "Academic Excellence Portal",
      subtitle: "Your Success Gateway",
      description:
        "Track your progress, access grade cards, and connect with fellow students in our comprehensive academic ecosystem.",
      image: "/placeholder.svg?height=400&width=600",
      gradient: "from-pink-500 via-red-500 to-orange-500",
      stats: { grades: "A+", community: "25K", support: "24/7" },
      cta: "View Results",
      ctaIcon: Trophy,
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
    <div className="relative h-full md:h-[80vh] overflow-hidden bg-black" style={{ fontFamily: "Markazi Text", }}>
      {/* Animated Background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-900/20 to-purple-900/20"></div>

        {/* Floating Particles */}
        <div className="absolute inset-0">
          {[...Array(30)].map((_, i) => (
            <div
              key={i}
              className="absolute w-1 h-1 bg-white rounded-full opacity-30 animate-pulse"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDelay: `${Math.random() * 3}s`,
                animationDuration: `${2 + Math.random() * 3}s`,
              }}
            />
          ))}
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div
            className="h-full w-full"
            style={{
              backgroundImage: `
              linear-gradient(rgba(255,255,255,0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(255,255,255,0.1) 1px, transparent 1px)
            `,
              backgroundSize: "50px 50px",
            }}
          />
        </div>
      </div>

      {/* Slider Content */}
      <div className="relative h-full flex items-center my-12">
        <div className="container mx-auto px-2 md:px-2">
          <div className="grid lg:grid-cols-2 gap-2 md:gap-8 items-center" style={{display: isMobile ? 'flex' : 'auto', flexDirection: isMobile ? 'column-reverse' : 'row'}}>
            {/* Left Content */}
            <div className="text-white space-y-4 md:space-y-6 z-10">
              <div className="space-y-2 md:space-y-3">
                <Badge
                  className={`bg-gradient-to-r ${slides[currentSlide].gradient} text-white border-0 px-2 py-1 text-xs font-medium`}
                >
                  <Zap className="mr-1 h-3 w-3" />
                  {slides[currentSlide].subtitle}
                </Badge>

                <h1 className="text-2xl md:text-4xl lg:text-5xl font-bold leading-tight">
                  <span className={`bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent`}>
                    {slides[currentSlide].title}
                  </span>
                </h1>

                <p className="text-sm md:text-base lg:text-lg text-gray-300 leading-relaxed max-w-xl">
                  {slides[currentSlide].description}
                </p>
              </div>

              {/* Stats */}
              <div className="grid grid-cols-3 gap-3 md:gap-4">
                {Object.entries(slides[currentSlide].stats).map(([key, value], index) => (
                  <div key={key} className="text-center">
                    <div
                      className={`text-lg md:text-xl lg:text-2xl font-bold bg-gradient-to-r ${slides[currentSlide].gradient} bg-clip-text text-transparent`}
                    >
                      {value}
                    </div>
                    <div className="text-xs text-gray-400 capitalize">{key}</div>
                  </div>
                ))}
              </div>

              {/* CTA Buttons - Now flex-row */}
              <div className="flex flex-row gap-2 md:gap-3">
                <Button
                  size="sm"
                  className={`bg-gradient-to-r ${slides[currentSlide].gradient} hover:opacity-90 text-white border-0 px-4 py-2 text-sm font-medium transform hover:scale-105 transition-all duration-300 shadow-2xl flex-1 md:flex-none`}
                >
                  {(() => {
                    const IconComponent = slides[currentSlide].ctaIcon
                    return <IconComponent className="mr-1 h-4 w-4" />
                  })()}
                  {slides[currentSlide].cta}
                </Button>

                <Button
                  size="sm"
                  variant="outline"
                  className="border-2 border-white/30 text-white hover:bg-white/10 px-4 py-2 text-sm font-medium backdrop-blur-sm flex-1 md:flex-none bg-transparent"
                >
                  <Users className="mr-1 h-4 w-4" />
                  Join
                </Button>
              </div>
            </div>

            {/* Right Content - Smaller Image */}
            <div className="relative">
              <div className="relative group">
                {/* Glowing Border */}
                <div
                  className={`absolute -inset-1 bg-gradient-to-r ${slides[currentSlide].gradient} rounded-xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-pulse`}
                ></div>

                {/* Image Container - Reduced size */}
                <div className="relative bg-black rounded-xl overflow-hidden">
                  <img
                    src={slides[currentSlide].image || "/placeholder.svg"}
                    alt={slides[currentSlide].title}
                    className="w-full h-48 md:h-64 lg:h-80 object-cover transform group-hover:scale-105 transition-transform duration-700"
                    style={{width:isMobile ? '90vw' : '40vw'}}
                  />

                  {/* Overlay */}
                  <div
                    className={`absolute inset-0 bg-gradient-to-t ${slides[currentSlide].gradient} opacity-20`}
                  ></div>

                  {/* Floating Elements */}
                  <div className="absolute top-2 right-2">
                    <div className="bg-white/10 backdrop-blur-sm rounded-full p-2">
                      <Star className="h-4 w-4 text-yellow-400 fill-yellow-400" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Cards - Smaller */}
              <div className="absolute -bottom-3 -left-3 bg-white/10 backdrop-blur-sm rounded-lg p-2 border border-white/20">
                <div className="flex items-center space-x-2">
                  <div
                    className={`w-2 h-2 rounded-full bg-gradient-to-r ${slides[currentSlide].gradient} animate-pulse`}
                  ></div>
                  <span className="text-white font-medium text-xs">Live Support</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex items-center space-x-3">
        <Button
          variant="ghost"
          size="icon"
          onClick={prevSlide}
          className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm h-8 w-8"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>

        {/* Dots */}
        <div className="flex space-x-1">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => setCurrentSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide
                  ? `bg-gradient-to-r ${slides[currentSlide].gradient}`
                  : "bg-white/30 hover:bg-white/50"
              }`}
            />
          ))}
        </div>

        <Button
          variant="ghost"
          size="icon"
          onClick={nextSlide}
          className="text-white hover:bg-white/10 border border-white/20 backdrop-blur-sm h-8 w-8"
        >
          <ChevronRight className="h-4 w-4" />
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 w-full h-0.5 bg-white/10">
        <div
          className={`h-full bg-gradient-to-r ${slides[currentSlide].gradient} transition-all duration-5000 ease-linear`}
          style={{ width: `${((currentSlide + 1) / slides.length) * 100}%` }}
        />
      </div>
    </div>
  )
}
