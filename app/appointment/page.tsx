"use client"

import { useState } from "react"
import Link from "next/link"
import { useFormState } from "react-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Clock, MapPin, Phone, Mail, Loader2, CheckCircle, AlertCircle } from "lucide-react"
import { bookAppointment } from "../actions/appointment"
import { formatDate, getTomorrowDate, getMaxDate } from "@/lib/utils"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"

export default function AppointmentPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [formState, formAction] = useFormState(bookAppointment, {
    errors: {},
    message: "",
    success: false,
  })

  const handleSubmit = async (formData: FormData) => {
    setIsSubmitting(true)
    await formAction(formData)
    setIsSubmitting(false)
  }

  const tomorrow = getTomorrowDate()
  const maxDate = getMaxDate()

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground py-16 md:py-24">
        <div className="container">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">Book an Appointment</h1>
            <p className="text-xl text-primary-foreground/90 mb-8">
              Take the first step towards mental wellness by scheduling a consultation with our specialists.
            </p>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-16 container">
        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <Card className="border-accent/50 shadow-md">
              <CardHeader>
                <CardTitle>Schedule Your Appointment</CardTitle>
                <CardDescription>
                  Fill out the form below to request an appointment. Our team will contact you to confirm the details.
                </CardDescription>
              </CardHeader>
              <CardContent>
                {formState.success ? (
                  <div className="space-y-6">
                    <Alert className="bg-green-50 border-green-200">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <AlertTitle className="text-green-800">Appointment Booked!</AlertTitle>
                      <AlertDescription className="text-green-700">{formState.message}</AlertDescription>
                    </Alert>
                    <div className="flex justify-center">
                      <Button onClick={() => window.location.reload()}>Book Another Appointment</Button>
                    </div>
                  </div>
                ) : (
                  <form action={handleSubmit} className="space-y-6">
                    {formState.errors?._form && (
                      <Alert variant="destructive">
                        <AlertCircle className="h-4 w-4" />
                        <AlertTitle>Error</AlertTitle>
                        <AlertDescription>{formState.errors._form}</AlertDescription>
                      </Alert>
                    )}

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          First Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="firstName"
                          name="firstName"
                          placeholder="Enter your first name"
                          className={formState.errors?.firstName ? "border-red-500" : ""}
                        />
                        {formState.errors?.firstName && (
                          <p className="text-sm text-red-500">{formState.errors.firstName[0]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          Last Name <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="lastName"
                          name="lastName"
                          placeholder="Enter your last name"
                          className={formState.errors?.lastName ? "border-red-500" : ""}
                        />
                        {formState.errors?.lastName && (
                          <p className="text-sm text-red-500">{formState.errors.lastName[0]}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="email">
                          Email <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="email"
                          name="email"
                          type="email"
                          placeholder="Enter your email"
                          className={formState.errors?.email ? "border-red-500" : ""}
                        />
                        {formState.errors?.email && <p className="text-sm text-red-500">{formState.errors.email[0]}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone">
                          Phone Number <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          placeholder="Enter your phone number"
                          className={formState.errors?.phone ? "border-red-500" : ""}
                        />
                        {formState.errors?.phone && <p className="text-sm text-red-500">{formState.errors.phone[0]}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label>
                        Preferred Appointment Type <span className="text-red-500">*</span>
                      </Label>
                      <RadioGroup defaultValue="in-person" name="appointmentType" className="flex flex-col space-y-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="in-person" id="in-person" />
                          <Label htmlFor="in-person" className="font-normal">
                            In-Person Consultation
                          </Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="virtual" id="virtual" />
                          <Label htmlFor="virtual" className="font-normal">
                            Virtual/Online Session
                          </Label>
                        </div>
                      </RadioGroup>
                      {formState.errors?.appointmentType && (
                        <p className="text-sm text-red-500">{formState.errors.appointmentType[0]}</p>
                      )}
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="specialist">
                          Preferred Specialist <span className="text-red-500">*</span>
                        </Label>
                        <Select name="specialist" defaultValue="any">
                          <SelectTrigger id="specialist">
                            <SelectValue placeholder="Select a specialist" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="any">No Preference</SelectItem>
                            <SelectItem value="kiran-kumari">Dr. Kiran Kumari</SelectItem>
                            <SelectItem value="ananya-sharma">Dr. Ananya Sharma</SelectItem>
                            <SelectItem value="rajiv-mehta">Dr. Rajiv Mehta</SelectItem>
                            <SelectItem value="priya-desai">Dr. Priya Desai</SelectItem>
                            <SelectItem value="sanjay-kumar">Dr. Sanjay Kumar</SelectItem>
                            <SelectItem value="meera-patel">Dr. Meera Patel</SelectItem>
                          </SelectContent>
                        </Select>
                        {formState.errors?.specialist && (
                          <p className="text-sm text-red-500">{formState.errors.specialist[0]}</p>
                        )}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="service">
                          Service Type <span className="text-red-500">*</span>
                        </Label>
                        <Select name="service" defaultValue="initial-consultation">
                          <SelectTrigger id="service">
                            <SelectValue placeholder="Select a service" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="initial-consultation">Initial Consultation</SelectItem>
                            <SelectItem value="therapy">Therapy & Counseling</SelectItem>
                            <SelectItem value="disorder-treatment">Disorder Treatment</SelectItem>
                            <SelectItem value="child-adolescent">Child & Adolescent Services</SelectItem>
                            <SelectItem value="psychometric">Psychometric & Clinical</SelectItem>
                            <SelectItem value="workshop">Workshop & Programs</SelectItem>
                          </SelectContent>
                        </Select>
                        {formState.errors?.service && (
                          <p className="text-sm text-red-500">{formState.errors.service[0]}</p>
                        )}
                      </div>
                    </div>

                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="date">
                          Preferred Date <span className="text-red-500">*</span>
                        </Label>
                        <Input
                          id="date"
                          name="date"
                          type="date"
                          min={formatDate(tomorrow)}
                          max={formatDate(maxDate)}
                          className={formState.errors?.date ? "border-red-500" : ""}
                        />
                        {formState.errors?.date && <p className="text-sm text-red-500">{formState.errors.date[0]}</p>}
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="time">
                          Preferred Time <span className="text-red-500">*</span>
                        </Label>
                        <Select name="time" defaultValue="morning">
                          <SelectTrigger id="time">
                            <SelectValue placeholder="Select a time" />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="morning">Morning (9 AM - 12 PM)</SelectItem>
                            <SelectItem value="afternoon">Afternoon (12 PM - 3 PM)</SelectItem>
                            <SelectItem value="evening">Evening (3 PM - 6 PM)</SelectItem>
                          </SelectContent>
                        </Select>
                        {formState.errors?.time && <p className="text-sm text-red-500">{formState.errors.time[0]}</p>}
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="message">Additional Information</Label>
                      <Textarea
                        id="message"
                        name="message"
                        placeholder="Please share any specific concerns or information that would help us prepare for your appointment."
                        rows={4}
                      />
                      {formState.errors?.message && (
                        <p className="text-sm text-red-500">{formState.errors.message[0]}</p>
                      )}
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-secondary text-secondary-foreground hover:bg-secondary/90"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        "Request Appointment"
                      )}
                    </Button>

                    <p className="text-sm text-muted-foreground text-center">
                      By submitting this form, you agree to our{" "}
                      <Link href="/privacy" className="underline text-primary hover:text-primary/80">
                        Privacy Policy
                      </Link>{" "}
                      and{" "}
                      <Link href="/terms" className="underline text-primary hover:text-primary/80">
                        Terms of Service
                      </Link>
                      .
                    </p>
                  </form>
                )}
              </CardContent>
            </Card>
          </div>

          <div>
            <div className="space-y-6">
              <Card className="border-accent/50 shadow-md">
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-start gap-3">
                    <Phone className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Phone</p>
                      <p className="text-muted-foreground">+1 (234) 567-890</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Mail className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Email</p>
                      <p className="text-muted-foreground">appointments@rehabminds.com</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <MapPin className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Location</p>
                      <p className="text-muted-foreground">123 Wellness Street, Gurgaon, India</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <Clock className="h-5 w-5 text-primary mt-0.5" />
                    <div>
                      <p className="font-medium">Office Hours</p>
                      <p className="text-muted-foreground">Monday - Friday: 9 AM - 6 PM</p>
                      <p className="text-muted-foreground">Saturday: 9 AM - 2 PM</p>
                      <p className="text-muted-foreground">Sunday: Closed</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/50 shadow-md">
                <CardHeader>
                  <CardTitle>Emergency Support</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    If you're experiencing a mental health emergency, please contact:
                  </p>
                  <div className="space-y-2">
                    <p className="font-medium">Mental Health Crisis Hotline:</p>
                    <p className="text-muted-foreground">+1 (800) 123-4567</p>
                    <p className="text-sm text-muted-foreground mt-4">Available 24/7 for immediate support</p>
                  </div>
                </CardContent>
              </Card>

              <Card className="border-accent/50 shadow-md">
                <CardHeader>
                  <CardTitle>Insurance Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground mb-4">
                    We accept various insurance plans. Please contact our office for specific information about your
                    coverage.
                  </p>
                  <Link href="/faq#insurance">
                    <Button variant="outline" className="w-full">
                      Learn More About Insurance
                    </Button>
                  </Link>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-accent/30">
        <div className="container">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">Frequently Asked Questions</h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Find answers to common questions about appointments and consultations.
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            <Card className="border-accent/50 shadow-md">
              <CardHeader>
                <CardTitle>What should I bring to my first appointment?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Please bring your identification, insurance card (if applicable), any relevant medical records, and a
                  list of current medications. If you've completed any previous psychological assessments, those would
                  be helpful as well.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/50 shadow-md">
              <CardHeader>
                <CardTitle>How long will my appointment last?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Initial consultations typically last 60-90 minutes to allow for a comprehensive assessment. Follow-up
                  therapy sessions are usually 45-60 minutes, depending on the type of service.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/50 shadow-md">
              <CardHeader>
                <CardTitle>What if I need to cancel or reschedule?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  We understand that circumstances change. We request at least 24 hours' notice for cancellations or
                  rescheduling to avoid any cancellation fees and to allow us to offer the time slot to another patient.
                </p>
              </CardContent>
            </Card>

            <Card className="border-accent/50 shadow-md">
              <CardHeader>
                <CardTitle>Is my information kept confidential?</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">
                  Absolutely. We adhere to strict confidentiality standards and comply with all privacy laws. Your
                  personal information and the content of your sessions are kept private and secure.
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="text-center mt-10">
            <Link href="/faq">
              <Button variant="outline" className="border-primary text-primary hover:bg-primary/10">
                View All FAQs
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
