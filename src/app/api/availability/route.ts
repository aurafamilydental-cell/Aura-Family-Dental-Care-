import { NextRequest, NextResponse } from "next/server";
import { getCalendarAvailability } from "@/lib/googleCalendar";

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams;
    const date = searchParams.get("date"); // Expects YYYY-MM-DD

    if (!date) {
      return NextResponse.json({ error: "Date parameter is required (format: YYYY-MM-DD)" }, { status: 400 });
    }

    // Basic date format validation
    const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
    if (!dateRegex.test(date)) {
      return NextResponse.json({ error: "Invalid date format. Use YYYY-MM-DD." }, { status: 400 });
    }

    const availableSlots = await getCalendarAvailability(date);
    return NextResponse.json({ slots: availableSlots });
  } catch (error: unknown) {
    console.error("Availability API Error:", error);
    return NextResponse.json({ error: error instanceof Error ? error.message : "Failed to fetch availability" }, { status: 500 });
  }
}
