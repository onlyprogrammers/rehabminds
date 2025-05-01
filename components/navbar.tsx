"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Menu, X } from "lucide-react"
import mainlogo from "@/components/images/logos/mainlogo.png"

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(true)

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true)
      } else {
        setIsScrolled(true)
      }
    }

    window.addEventListener("scroll", handleScroll)
    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled
          ? "bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 border-b"
          : "bg-transparent"
      }`}
    >
      <div className="container flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2">
          <Image src={mainlogo} alt="Rehab Minds Logo" width={50} height={50} className="h-12 w-auto" />
        </Link>

        <nav className="hidden md:flex gap-8">
          <Link
            href="/"
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"}`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"}`}
          >
            About Us
          </Link>
          <Link
            href="/specialists"
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"}`}
          >
            Our Specialists
          </Link>
          <Link
            href="/services"
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"}`}
          >
            Services
          </Link>
          <Link
            href="/resources"
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"}`}
          >
            Resources
          </Link>
          <Link
            href="/contact"
            className={`text-sm font-medium transition-colors ${isScrolled ? "text-foreground hover:text-primary" : "text-white/90 hover:text-white"}`}
          >
            Contact
          </Link>
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <Link href="/appointment">
            <Button
              variant={isScrolled ? "default" : "secondary"}
              className={isScrolled ? "" : "text-primary font-medium"}
            >
              Book Appointment
            </Button>
          </Link>
        </div>

        <button className={`md:hidden ${isScrolled ? "text-foreground" : "text-white"}`} onClick={toggleMenu}>
          {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {isMenuOpen && (
        <div className="md:hidden container py-6 bg-background shadow-lg rounded-b-lg">
          <nav className="flex flex-col gap-5">
            <Link href="/" className="text-base font-medium hover:text-primary" onClick={toggleMenu}>
              Home
            </Link>
            <Link href="/about" className="text-base font-medium hover:text-primary" onClick={toggleMenu}>
              About Us
            </Link>
            <Link href="/specialists" className="text-base font-medium hover:text-primary" onClick={toggleMenu}>
              Our Specialists
            </Link>
            <Link href="/services" className="text-base font-medium hover:text-primary" onClick={toggleMenu}>
              Services
            </Link>
            <Link href="/resources" className="text-base font-medium hover:text-primary" onClick={toggleMenu}>
              Resources
            </Link>
            <Link href="/contact" className="text-base font-medium hover:text-primary" onClick={toggleMenu}>
              Contact
            </Link>
            <Link href="/appointment" onClick={toggleMenu}>
              <Button variant="default" className="w-full mt-2">
                Book Appointment
              </Button>
            </Link>
          </nav>
        </div>
      )}
    </header>
  )
}
