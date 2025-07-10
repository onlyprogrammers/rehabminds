import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { GraduationCap, Search, HelpCircle, MessageCircle } from "lucide-react"
import { SlidingNavbar } from "@/components/sliding-navbar"

export default function FAQPage() {
  const faqCategories = [
    {
      category: "General Questions",
      questions: [
        {
          question: "What is IGNOU Hub?",
          answer:
            "IGNOU Hub is a comprehensive platform providing study materials, assignments, notes, and academic support services for IGNOU students. We help students excel in their distance learning journey with quality resources and expert guidance.",
        },
        {
          question: "How long have you been helping IGNOU students?",
          answer:
            "We have been serving IGNOU students since 2014, with over 10 years of experience in distance education support. We've helped more than 50,000 students achieve their academic goals.",
        },
        {
          question: "Are your services legitimate and safe?",
          answer:
            "Yes, absolutely. We are a registered educational service provider. All our materials are original, and we maintain strict confidentiality. We follow ethical practices and provide genuine academic support.",
        },
      ],
    },
    {
      category: "Assignments",
      questions: [
        {
          question: "Are the assignments plagiarism-free?",
          answer:
            "Yes, all our assignments are 100% original and plagiarism-free. We use advanced plagiarism detection tools to ensure content originality. Each assignment is written from scratch by our subject experts.",
        },
        {
          question: "How quickly can I get my assignment?",
          answer:
            "Premium assignments are delivered within 24-48 hours. Free assignments may take 5-7 days. Rush delivery is available for urgent requirements at additional cost.",
        },
        {
          question: "Do you provide revision support?",
          answer:
            "Yes, we provide free revisions for premium assignments within 7 days of delivery. Our experts will make necessary changes based on your feedback to ensure your satisfaction.",
        },
        {
          question: "What if my assignment gets rejected by IGNOU?",
          answer:
            "In the rare case of assignment rejection, we provide free rework based on the feedback from IGNOU. We also offer guidance on resubmission process.",
        },
      ],
    },
    {
      category: "Payment & Pricing",
      questions: [
        {
          question: "What payment methods do you accept?",
          answer:
            "We accept all major payment methods including UPI, Net Banking, Credit/Debit Cards, and digital wallets like Paytm, PhonePe, Google Pay, etc. International payments via PayPal are also accepted.",
        },
        {
          question: "Is there any refund policy?",
          answer:
            "Yes, we have a 7-day money-back guarantee if you're not satisfied with our services. Refunds are processed within 5-7 business days after approval.",
        },
        {
          question: "Do you offer any discounts?",
          answer:
            "Yes, we offer various discounts including bulk order discounts, student discounts, seasonal offers, and loyalty rewards. Follow us on social media for latest discount codes.",
        },
        {
          question: "Can I pay in installments?",
          answer:
            "For high-value services like complete program packages, we offer installment payment options. Contact our support team to discuss payment plans.",
        },
      ],
    },
    {
      category: "Study Materials",
      questions: [
        {
          question: "Are study notes available for all subjects?",
          answer:
            "We cover most popular IGNOU subjects across various programs. If you don't find notes for your specific subject, you can request custom notes preparation.",
        },
        {
          question: "In what format are the study materials provided?",
          answer:
            "Study materials are provided in multiple formats including PDF, Word documents, and mobile-friendly formats. Premium materials also include video explanations and interactive content.",
        },
        {
          question: "How often are the study materials updated?",
          answer:
            "We regularly update our study materials based on latest IGNOU syllabus changes and university notifications. Premium subscribers get automatic updates.",
        },
        {
          question: "Can I access materials offline?",
          answer:
            "Yes, once downloaded, all materials can be accessed offline. We also provide mobile apps for convenient offline studying.",
        },
      ],
    },
    {
      category: "Technical Support",
      questions: [
        {
          question: "I'm having trouble downloading materials. What should I do?",
          answer:
            "First, check your internet connection and try again. If the problem persists, clear your browser cache or try a different browser. Contact our technical support team if issues continue.",
        },
        {
          question: "How do I reset my password?",
          answer:
            "Click on 'Forgot Password' on the login page and enter your registered email. You'll receive a password reset link within a few minutes. Check your spam folder if you don't see the email.",
        },
        {
          question: "Can I access my account from multiple devices?",
          answer:
            "Yes, you can access your account from multiple devices. However, simultaneous logins from more than 3 devices may be restricted for security reasons.",
        },
        {
          question: "Is there a mobile app available?",
          answer:
            "Yes, we have mobile apps for both Android and iOS. You can download them from Google Play Store and Apple App Store respectively.",
        },
      ],
    },
    {
      category: "Grade Card & Results",
      questions: [
        {
          question: "How can I check my IGNOU results?",
          answer:
            "You can check your results through our Grade Card section by entering your enrollment number and program details. We also provide result notifications via email and SMS.",
        },
        {
          question: "Can I download my grade card?",
          answer:
            "Yes, once your results are declared, you can download your official grade card in PDF format from our platform.",
        },
        {
          question: "What if my results are not showing?",
          answer:
            "Results are updated as soon as IGNOU declares them. If your results are not showing, it might be that they haven't been declared yet. You can also check the official IGNOU website.",
        },
        {
          question: "Do you provide result analysis?",
          answer:
            "Yes, premium users get detailed result analysis including performance insights, improvement suggestions, and academic progress tracking.",
        },
      ],
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation */}
      <SlidingNavbar />

      {/* Hero Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h1>
          <p className="text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            Find answers to common questions about our services, payments, and IGNOU-related queries.
          </p>

          {/* Search Bar */}
          <div className="max-w-md mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input placeholder="Search for answers..." className="pl-10 pr-4 py-2" />
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Categories */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl">
          {faqCategories.map((category, categoryIndex) => (
            <Card key={categoryIndex} className="mb-8">
              <CardHeader>
                <CardTitle className="text-2xl flex items-center space-x-2">
                  <HelpCircle className="h-6 w-6 text-blue-600" />
                  <span>{category.category}</span>
                </CardTitle>
                <CardDescription>Common questions about {category.category.toLowerCase()}</CardDescription>
              </CardHeader>
              <CardContent>
                <Accordion type="single" collapsible className="w-full">
                  {category.questions.map((faq, faqIndex) => (
                    <AccordionItem key={faqIndex} value={`item-${categoryIndex}-${faqIndex}`}>
                      <AccordionTrigger className="text-left">{faq.question}</AccordionTrigger>
                      <AccordionContent className="text-gray-600">{faq.answer}</AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Quick Help Section */}
      <section className="py-16 px-4 bg-gray-50">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Need More Help?</h2>
          <div className="grid md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <Card className="text-center">
              <CardHeader>
                <MessageCircle className="h-12 w-12 text-blue-600 mx-auto mb-4" />
                <CardTitle>Live Chat</CardTitle>
                <CardDescription>Get instant answers from our support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Button className="w-full">Start Chat</Button>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <HelpCircle className="h-12 w-12 text-green-600 mx-auto mb-4" />
                <CardTitle>Help Center</CardTitle>
                <CardDescription>Browse our comprehensive help documentation</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/help">
                  <Button variant="outline" className="w-full">
                    Visit Help Center
                  </Button>
                </Link>
              </CardContent>
            </Card>

            <Card className="text-center">
              <CardHeader>
                <GraduationCap className="h-12 w-12 text-purple-600 mx-auto mb-4" />
                <CardTitle>Contact Support</CardTitle>
                <CardDescription>Reach out to our expert support team</CardDescription>
              </CardHeader>
              <CardContent>
                <Link href="/contact">
                  <Button variant="outline" className="w-full">
                    Contact Us
                  </Button>
                </Link>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Popular Topics */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">Popular Help Topics</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 max-w-4xl mx-auto">
            <Link href="/help/assignments">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-blue-600">Assignment Help</h3>
                  <p className="text-sm text-gray-600 mt-2">How to order and submit assignments</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/help/payments">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-green-600">Payment Issues</h3>
                  <p className="text-sm text-gray-600 mt-2">Payment methods and refund policies</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/help/account">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-purple-600">Account Management</h3>
                  <p className="text-sm text-gray-600 mt-2">Managing your account and profile</p>
                </CardContent>
              </Card>
            </Link>

            <Link href="/help/technical">
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardContent className="pt-6 text-center">
                  <h3 className="font-semibold text-orange-600">Technical Support</h3>
                  <p className="text-sm text-gray-600 mt-2">Troubleshooting and technical issues</p>
                </CardContent>
              </Card>
            </Link>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 px-4 bg-blue-600 text-white">
        <div className="container mx-auto text-center">
          <h3 className="text-3xl font-bold mb-4">Didn't Find Your Answer?</h3>
          <p className="text-xl mb-8 opacity-90">Our support team is always ready to help you with any questions</p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/contact">
              <Button size="lg" variant="secondary" className="text-lg px-8 py-3">
                Contact Support
              </Button>
            </Link>
            <Button
              size="lg"
              variant="outline"
              className="text-lg px-8 py-3 text-white border-white hover:bg-white hover:text-blue-600"
            >
              Call: +91 9876543210
            </Button>
          </div>
        </div>
      </section>
    </div>
  )
}
