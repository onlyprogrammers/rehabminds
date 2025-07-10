"use client"

import { useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { Badge } from "@/components/ui/badge"
import {
  GraduationCap,
  Menu,
  Home,
  BookOpen,
  FileText,
  Trophy,
  Users,
  Phone,
  HelpCircle,
  Star,
  Zap,
  Gift,
  Calendar,
} from "lucide-react"

export function SlidingNavbar() {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { href: "/", label: "Home", icon: Home },
    { href: "/services", label: "Services", icon: BookOpen },
    { href: "/assignments", label: "Assignments", icon: FileText, badge: "Popular" },
    { href: "/notes", label: "Study Notes", icon: BookOpen },
    { href: "/previous-papers", label: "Question Papers", icon: Calendar, badge: "New" },
    { href: "/gradecard", label: "Grade Card", icon: Trophy },
    { href: "/about", label: "About Us", icon: Users },
    { href: "/contact", label: "Contact", icon: Phone },
    { href: "/faq", label: "FAQ", icon: HelpCircle },
  ]

  return (
    <>
      {/* Desktop Navigation */}
      <nav className="hidden lg:block border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-3 group">
              <div className="relative">
                <GraduationCap className="h-10 w-10 text-blue-600 group-hover:text-blue-700 transition-colors" />
                <div className="absolute -top-1 -right-1 w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <span className="text-1xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  IGNOU Hub
                </span>
                <div className="text-xs text-gray-500 font-medium">Your Success Partner</div>
              </div>
            </Link>

            <div className="flex items-center space-x-2">
              {navItems.slice(0, 7).map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="relative group flex items-center space-x-1 text-gray-600 hover:text-blue-600 transition-all duration-300 font-small"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                  {item.badge && (
                    <Badge variant="secondary" className="ml-1 text-xs bg-blue-100 text-blue-700">
                      {item.badge}
                    </Badge>
                  )}
                  <div className="absolute -bottom-1 left-0 w-0 h-0.5 bg-blue-600 group-hover:w-full transition-all duration-300"></div>
                </Link>
              ))}
            </div>

            <div className="flex items-center space-x-3">
              <Link href="/signin">
                <Button
                  variant="outline"
                  className="hover:bg-blue-50 hover:border-blue-300 transition-all duration-300 bg-transparent"
                >
                  Sign In
                </Button>
              </Link>
              <Link href="/signup">
                <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-xl">
                  <Zap className="mr-2 h-4 w-4" />
                  Get Started
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Navigation */}
      <nav className="lg:hidden border-b bg-white/95 backdrop-blur-sm sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-3 py-3">
          <div className="flex items-center justify-between">
            <Link href="/" className="flex items-center space-x-2">
              <GraduationCap className="h-7 w-7 text-blue-600" />
              <span className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                IGNOU Hub
              </span>
            </Link>

            <Sheet open={isOpen} onOpenChange={setIsOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="hover:bg-blue-50 h-8 w-8">
                  <Menu className="h-5 w-5" />
                </Button>
              </SheetTrigger>
              <SheetContent side="left" className="w-72 p-0">
                <div className="flex flex-col h-full bg-gradient-to-b from-blue-50 to-white">
                  {/* Header - Reduced padding */}
                  <div className="p-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                    <div className="flex items-center space-x-2">
                      <GraduationCap className="h-8 w-8" />
                      <div>
                        <h2 className="text-lg font-bold">IGNOU Hub</h2>
                        <p className="text-blue-100 text-xs">Your Success Partner</p>
                      </div>
                    </div>
                  </div>

                  {/* Navigation Items - Reduced spacing */}
                  <div className="flex-1 py-3">
                    <div className="space-y-1 px-3">
                      {navItems.map((item, index) => (
                        <Link
                          key={item.href}
                          href={item.href}
                          onClick={() => setIsOpen(false)}
                          className="flex items-center space-x-2 px-3 py-2 rounded-lg hover:bg-blue-100 transition-all duration-300 group"
                          style={{ animationDelay: `${index * 50}ms` }}
                        >
                          <div className="p-1.5 rounded-lg bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                            <item.icon className="h-4 w-4 text-blue-600" />
                          </div>
                          <div className="flex-1">
                            <span className="text-sm font-medium text-gray-700 group-hover:text-blue-700">
                              {item.label}
                            </span>
                            {item.badge && (
                              <Badge variant="secondary" className="ml-1 text-xs bg-blue-100 text-blue-700">
                                {item.badge}
                              </Badge>
                            )}
                          </div>
                        </Link>
                      ))}
                    </div>

                    {/* Special Offers - Reduced padding */}
                    <div className="mx-3 mt-4 p-3 bg-gradient-to-r from-green-100 to-blue-100 rounded-lg border border-green-200">
                      <div className="flex items-center space-x-2 mb-1">
                        <Gift className="h-4 w-4 text-green-600" />
                        <span className="text-sm font-semibold text-green-800">Special Offer!</span>
                      </div>
                      <p className="text-xs text-green-700 mb-2">Get 50% off on premium assignments this month!</p>
                      <Button size="sm" className="w-full bg-green-600 hover:bg-green-700 text-xs py-1">
                        Claim Offer
                      </Button>
                    </div>
                  </div>

                  {/* Footer - Reduced padding */}
                  <div className="p-4 border-t bg-gray-50">
                    <div className="space-y-2">
                      <Link href="/signin" onClick={() => setIsOpen(false)}>
                        <Button variant="outline" className="w-full bg-transparent text-sm py-2">
                          Sign In
                        </Button>
                      </Link>
                      <Link href="/signup" className="py-3" onClick={() => setIsOpen(false)}>
                        <Button className="w-full bg-gradient-to-r  from-blue-600 to-purple-600 text-sm py-2">
                          <Star className="mr-1 h-3 w-3" />
                          Get Started Free
                        </Button>
                      </Link>
                    </div>

                    <div className="mt-3 text-center">
                      <p className="text-xs text-gray-500">Trusted by 50,000+ students</p>
                      <div className="flex justify-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="h-2.5 w-2.5 fill-yellow-400 text-yellow-400" />
                        ))}
                        <span className="ml-1 text-xs text-gray-600">4.8/5</span>
                      </div>
                    </div>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </nav>
    </>
  )
}
