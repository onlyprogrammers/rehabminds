import Link from "next/link";
import { ArrowRight, GraduationCap, Star } from "lucide-react";

const quickLinks = [
  { label: "Assignments", href: "/assignments" },
  { label: "Study Notes", href: "/notes" },
  { label: "Synopsis Help", href: "/services" },
  { label: "Grade Cards", href: "/gradecard" },
  { label: "Exam Updates", href: "/services" },
]

const supportLinks = [
  { label: "Help Center", href: "/faq" },
  { label: "Contact Us", href: "/contact" },
  { label: "FAQ", href: "/faq" },
  { label: "Live Chat", href: "/contact" },
  { label: "WhatsApp Support", href: "/contact" },
]

export default function Footer() {
    return (
        <footer className="relative bg-gray-900 text-white py-10 px-4">
            <div className="container mx-auto">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-6 md:gap-8">
                    <div className="col-span-2 md:col-span-1">
                        <div className="flex items-center space-x-3 mb-4">
                            <GraduationCap className="h-7 w-7 text-blue-400" />
                            <span className="text-xl font-bold">Ignou Study Guide</span>
                        </div>
                        <p className="text-gray-400 mb-4 leading-relaxed text-sm">
                            Your trusted partner for IGNOU academic success. Quality study materials, expert guidance,
                            and comprehensive support to help you achieve your educational goals.
                        </p>
                        <div className="flex space-x-1">
                            {[...Array(5)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                            ))}
                            <span className="text-gray-400 ml-2 text-xs">4.8/5 (2,500+ reviews)</span>
                        </div>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-base">Quick Links</h4>
                        <ul className="space-y-2 text-gray-400">
                            {quickLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="hover:text-white transition-colors flex items-center space-x-2 text-sm">
                                        <ArrowRight className="h-3 w-3" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-base">Support</h4>
                        <ul className="space-y-2 text-gray-400">
                            {supportLinks.map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} className="hover:text-white transition-colors flex items-center space-x-2 text-sm">
                                        <ArrowRight className="h-3 w-3" />
                                        <span>{item.label}</span>
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="font-semibold mb-4 text-base">Contact Info</h4>
                        <div className="space-y-3 text-gray-400 text-sm">
                            <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-blue-600 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs">📞</span>
                                </div>
                                <span>+91 9876543210</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-green-600 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs">📧</span>
                                </div>
                                <span>support@ignoustudyguide.com</span>
                            </div>
                            <div className="flex items-center space-x-3">
                                <div className="w-7 h-7 bg-purple-600 rounded-full flex items-center justify-center shrink-0">
                                    <span className="text-xs">📍</span>
                                </div>
                                <span>New Delhi, India</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-800 mt-8 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-gray-400 text-sm">
                    <p>&copy; {new Date().getFullYear()} Ignou Study Guide. All rights reserved.</p>
                    <div className="flex gap-4">
                        <Link href="/faq" className="hover:text-white transition-colors">Privacy Policy</Link>
                        <Link href="/faq" className="hover:text-white transition-colors">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
