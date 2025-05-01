"use server"

import { z } from "zod"

// Define the schema for form validation
const appointmentSchema = z.object({
  firstName: z.string().min(1, "First name is required"),
  lastName: z.string().min(1, "Last name is required"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  appointmentType: z.enum(["in-person", "virtual"]),
  specialist: z.string(),
  service: z.string(),
  date: z.string().min(1, "Date is required"),
  time: z.string().min(1, "Time is required"),
  message: z.string().optional(),
})

export type AppointmentFormState = {
  errors?: {
    firstName?: string[]
    lastName?: string[]
    email?: string[]
    phone?: string[]
    appointmentType?: string[]
    specialist?: string[]
    service?: string[]
    date?: string[]
    time?: string[]
    message?: string[]
    _form?: string[]
  }
  message?: string
  success?: boolean
}

export async function bookAppointment(
  prevState: AppointmentFormState,
  formData: FormData,
): Promise<AppointmentFormState> {
  // Validate form data
  const validatedFields = appointmentSchema.safeParse({
    firstName: formData.get("firstName"),
    lastName: formData.get("lastName"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    appointmentType: formData.get("appointmentType"),
    specialist: formData.get("specialist"),
    service: formData.get("service"),
    date: formData.get("date"),
    time: formData.get("time"),
    message: formData.get("message"),
  })

  // If validation fails, return errors
  if (!validatedFields.success) {
    return {
      errors: validatedFields.error.flatten().fieldErrors,
      message: "Please correct the errors in the form.",
      success: false,
    }
  }

  // Simulate a delay to mimic server processing
  await new Promise((resolve) => setTimeout(resolve, 1500))

  try {
    // Extract validated data
    const data = validatedFields.data

    // Here you would typically:
    // 1. Save the appointment to your database
    // 2. Send confirmation emails
    // 3. Potentially integrate with a calendar system

    console.log("Appointment booked:", data)

    // For demonstration, we'll simulate sending an email
    await sendAppointmentConfirmation(data)

    // Return success state
    return {
      message: "Your appointment has been successfully booked. We'll send a confirmation to your email shortly.",
      success: true,
    }
  } catch (error) {
    // Handle any errors
    console.error("Error booking appointment:", error)
    return {
      errors: {
        _form: ["There was an error booking your appointment. Please try again later."],
      },
      success: false,
    }
  }
}

// Simulate sending a confirmation email
async function sendAppointmentConfirmation(data: any) {
  // In a real application, you would use a service like SendGrid, Mailgun, etc.
  console.log(`Sending confirmation email to ${data.email} for appointment on ${data.date} at ${data.time}`)

  // Simulate API call delay
  await new Promise((resolve) => setTimeout(resolve, 500))

  // Return success (in a real app, you'd handle errors from the email service)
  return true
}
