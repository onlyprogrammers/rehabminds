import Link from "next/link"
import Image from "next/image"
import { Facebook, Instagram, Twitter, Mail, Phone } from "lucide-react"

{/* Footer component for the website */}

import mainlogo from "@/components/images/logos/mainlogo.png"

export default function Footer() {
  return (
    <footer className="bg-primary text-primary-foreground">
      <div className="container py-16 md:py-20">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-4">
          <div className="space-y-6">
            <div className="flex items-center gap-3">
              <Image
                src={mainlogo}
                alt="Rehab Minds Logo"
                width={150}
                height={50}
                className="h-12 w-auto p-1"
              />
              <span className="text-1xl font-bold">Rehab Minds</span>
            </div>
            <p className="text-base text-primary-foreground/80">Compassionate Care for Mental Wellness</p>
            <div className="flex gap-5">
              <Link href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Facebook className="h-6 w-6" />
                <span className="sr-only">Facebook</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Instagram className="h-6 w-6" />
                <span className="sr-only">Instagram</span>
              </Link>
              <Link href="#" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                <Twitter className="h-6 w-6" />
                <span className="sr-only">Twitter</span>
              </Link>
            </div>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Quick Links</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link href="/" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/specialists" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Our Specialists
                </Link>
              </li>
              <li>
                <Link href="/services" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Services
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/faq" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  FAQ
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Services</h3>
            <ul className="space-y-3 text-base">
              <li>
                <Link
                  href="/services#therapy"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Therapy & Counseling
                </Link>
              </li>
              <li>
                <Link
                  href="/services#disorders"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Disorder Treatment
                </Link>
              </li>
              <li>
                <Link
                  href="/services#child"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Child & Adolescent
                </Link>
              </li>
              <li>
                <Link
                  href="/services#psychometric"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Psychometric & Clinical
                </Link>
              </li>
              <li>
                <Link
                  href="/services#workshops"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  Workshops & Programs
                </Link>
              </li>
            </ul>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-semibold">Contact Us</h3>
            <ul className="space-y-3 text-base">
              <li className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-secondary" />
                <a
                  href="mailto:info@rehabminds.com"
                  className="text-primary-foreground/80 hover:text-secondary transition-colors"
                >
                  info@rehabminds.com
                </a>
              </li>
              <li className="flex items-center gap-3">
                <Phone className="h-5 w-5 text-secondary" />
                <a href="tel:+1234567890" className="text-primary-foreground/80 hover:text-secondary transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
            </ul>
            <div className="pt-4">
              <Link
                href="/appointment"
                className="bg-secondary text-primary px-6 py-3 rounded-md text-base font-medium hover:bg-secondary/90 transition-colors inline-block"
              >
                Book Appointment
              </Link>
            </div>
          </div>
        </div>

        <div className="mt-16 border-t border-primary-foreground/20 pt-8 text-center text-sm text-primary-foreground/60">
          <p>&copy; {new Date().getFullYear()} Rehab Minds. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}
