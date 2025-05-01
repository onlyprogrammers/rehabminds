"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"

// Mock data for demonstration
const mockAppointments = [
  {
    id: "1",
    patientName: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 234-567-8901",
    date: "2025-05-15",
    time: "morning",
    specialist: "Dr. Kiran Kumari",
    service: "Initial Consultation",
    type: "in-person",
    status: "confirmed",
  },
  {
    id: "2",
    patientName: "Jane Smith",
    email: "jane.smith@example.com",
    phone: "+1 234-567-8902",
    date: "2025-05-16",
    time: "afternoon",
    specialist: "Dr. Ananya Sharma",
    service: "Therapy & Counseling",
    type: "virtual",
    status: "pending",
  },
  {
    id: "3",
    patientName: "Robert Johnson",
    email: "robert.johnson@example.com",
    phone: "+1 234-567-8903",
    date: "2025-05-17",
    time: "evening",
    specialist: "Dr. Rajiv Mehta",
    service: "Disorder Treatment",
    type: "in-person",
    status: "confirmed",
  },
]

export default function AdminAppointmentsPage() {
  const [appointments] = useState(mockAppointments)

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-6">Appointment Management</h1>

      <Card className="mb-8">
        <CardHeader>
          <CardTitle>Upcoming Appointments</CardTitle>
          <CardDescription>View and manage all scheduled appointments</CardDescription>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Patient</TableHead>
                <TableHead>Date & Time</TableHead>
                <TableHead>Specialist</TableHead>
                <TableHead>Service</TableHead>
                <TableHead>Type</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {appointments.map((appointment) => (
                <TableRow key={appointment.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.patientName}</p>
                      <p className="text-sm text-muted-foreground">{appointment.email}</p>
                      <p className="text-sm text-muted-foreground">{appointment.phone}</p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{appointment.date}</p>
                      <p className="text-sm text-muted-foreground capitalize">{appointment.time}</p>
                    </div>
                  </TableCell>
                  <TableCell>{appointment.specialist}</TableCell>
                  <TableCell>{appointment.service}</TableCell>
                  <TableCell>
                    <Badge variant={appointment.type === "virtual" ? "secondary" : "outline"}>
                      {appointment.type === "virtual" ? "Virtual" : "In-Person"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge
                      className={
                        appointment.status === "confirmed"
                          ? "bg-green-100 text-green-800 hover:bg-green-200"
                          : "bg-yellow-100 text-yellow-800 hover:bg-yellow-200"
                      }
                    >
                      {appointment.status === "confirmed" ? "Confirmed" : "Pending"}
                    </Badge>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  )
}
