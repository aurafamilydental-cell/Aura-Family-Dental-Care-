import { NextRequest, NextResponse } from "next/server";
import { bookAppointment, BookingDetails } from "@/lib/googleCalendar";
import { appendBookingToSheet } from "@/lib/googleSheets";

// Simple in-memory rate limiting map
// Maps IP to { count, lastResetTime }
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

const RATE_LIMIT = 3; // Max 3 bookings
const TIME_WINDOW_MS = 24 * 60 * 60 * 1000; // 24 hours in milliseconds

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);

  if (!record) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // If the time window has passed, reset the counter
  if (now - record.timestamp > TIME_WINDOW_MS) {
    rateLimitMap.set(ip, { count: 1, timestamp: now });
    return true;
  }

  // If within the time window, check the count
  if (record.count >= RATE_LIMIT) {
    return false;
  }

  // Otherwise, increment the count
  record.count += 1;
  return true;
}

export async function POST(request: NextRequest) {
  try {
    const ip = request.headers.get("x-forwarded-for") || "unknown-ip";
    
    // Only apply rate limit if we can identify the IP
    if (ip !== "unknown-ip" && !checkRateLimit(ip)) {
      return NextResponse.json(
        { error: "You have reached the maximum number of online bookings allowed per day. Please call the clinic directly to book." },
        { status: 429 }
      );
    }

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
      // Log to Google Sheets (await to prevent serverless suspension before completion)
      await appendBookingToSheet(body);

      return NextResponse.json({ success: true, message: "Appointment booked successfully!" });
    } else {
      return NextResponse.json({ error: "Failed to schedule appointment in the system." }, { status: 500 });
    }
  } catch (error: unknown) {
    console.error("Booking API Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to process booking" }, { status: 500 });
  }
}
