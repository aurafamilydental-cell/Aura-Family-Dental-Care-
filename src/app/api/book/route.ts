import { NextRequest, NextResponse } from "next/server";
import { bookAppointment, BookingDetails } from "@/lib/googleCalendar";

export async function POST(request: NextRequest) {
  try {
    const body = await request.json() as BookingDetails;

    // Basic Validation
    if (!body.patientType || !body.name || !body.email || !body.phone || !body.reason || !body.timeSlot) {
      return NextResponse.json({ error: "Missing required booking fields." }, { status: 400 });
    }

    if (body.patientType === "child" && (!body.childName || !body.childAge)) {
      return NextResponse.json({ error: "Child name and age are required for minor bookings." }, { status: 400 });
    }

    if (body.patientType === "family" && !body.familyMembers) {
      return NextResponse.json({ error: "Family members list is required for family group bookings." }, { status: 400 });
    }

    const success = await bookAppointment(body);

    if (success) {
      return NextResponse.json({ success: true, message: "Appointment booked successfully!" });
    } else {
      return NextResponse.json({ error: "Failed to schedule appointment in the system." }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error.message || "Failed to process booking" }, { status: 500 });
  }
}
