import "server-only";

import { google } from "googleapis";

export interface BookingDetails {
  patientType: "adult" | "child" | "family";
  name: string;
  email: string;
  phone: string;
  reason: string;
  timeSlot: string; // ISO String for start time
  durationMinutes?: number;
  // Dynamic fields
  childName?: string;
  childAge?: string;
  isFirstVisit?: boolean;
  familyMembers?: string;
  appointmentPref?: string;
}

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID || "primary";
export const CLINIC_TIME_ZONE = "Africa/Accra";

// Define working hours per day of week (0 = Sunday, 6 = Saturday)
const WORKING_HOURS: Record<number, { start: number; end: number } | null> = {
  0: null, // Sunday - Closed
  1: { start: 8, end: 18 }, // Monday: 8 AM - 6 PM
  2: { start: 8, end: 18 }, // Tuesday: 8 AM - 6 PM
  3: { start: 8, end: 18 }, // Wednesday: 8 AM - 6 PM
  4: { start: 8, end: 18 }, // Thursday: 8 AM - 6 PM
  5: { start: 8, end: 18 }, // Friday: 8 AM - 6 PM
  6: { start: 9, end: 14 }, // Saturday: 9 AM - 2 PM
};

function getClinicDate(dateStr: string, hour: number, minute: number = 0) {
  return new Date(`${dateStr}T${String(hour).padStart(2, "0")}:${String(minute).padStart(2, "0")}:00+00:00`);
}

/**
 * Initializes and returns the authenticated Google Calendar client
 */
function getCalendarClient() {
  if (!GOOGLE_CLIENT_ID || !GOOGLE_CLIENT_SECRET || !GOOGLE_REFRESH_TOKEN) {
    throw new Error("Missing Google OAuth credentials in env.");
  }

  const oauth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET
  );

  oauth2Client.setCredentials({
    refresh_token: GOOGLE_REFRESH_TOKEN,
  });

  return google.calendar({ version: "v3", auth: oauth2Client });
}

/**
 * Checks availability for a specific date (YYYY-MM-DD)
 */
export async function getCalendarAvailability(dateStr: string, durationMinutes: number = 60): Promise<string[]> {
  try {
    const targetDate = new Date(dateStr);
    const dayOfWeek = targetDate.getUTCDay();
    const hours = WORKING_HOURS[dayOfWeek];

    if (!hours) {
      return []; // Closed
    }

    const calendar = getCalendarClient();

    // Ghana uses GMT year-round. Keep the timezone explicit so clinic hours
    // remain tied to Africa/Accra instead of the server's local timezone.
    const timeMin = getClinicDate(dateStr, hours.start).toISOString();
    const timeMax = getClinicDate(dateStr, hours.end).toISOString();

    const response = await calendar.events.list({
      calendarId: GOOGLE_CALENDAR_ID,
      timeMin: timeMin,
      timeMax: timeMax,
      timeZone: CLINIC_TIME_ZONE,
      singleEvents: true,
      orderBy: "startTime",
    });

    const events = response.data.items || [];
    const workEndTime = new Date(timeMax);

    // Generate possible 30-minute slots
    const availableSlots: string[] = [];
    for (let hour = hours.start; hour < hours.end; hour++) {
      for (const minute of [0, 30]) {
        const slotStart = getClinicDate(dateStr, hour, minute);
        const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);

        // Don't generate slots that end after working hours
        if (slotEnd > workEndTime) continue;

        // Check if any event overlaps with this slot
        const isOverlapping = events.some((event) => {
          const eventStart = new Date(event.start?.dateTime || event.start?.date || "");
          const eventEnd = new Date(event.end?.dateTime || event.end?.date || "");

          // Overlap logic: Event starts before slot ends AND event ends after slot starts
          return eventStart < slotEnd && eventEnd > slotStart;
        });

        if (!isOverlapping) {
          availableSlots.push(slotStart.toISOString());
        }
      }
    }

    return availableSlots;
  } catch (error) {
    console.error("Error in getCalendarAvailability:", error);
    // Return mock data in development if credentials are missing
    if (!GOOGLE_CLIENT_ID) {
      console.warn("Using mock availability because credentials are missing.");
      return getMockAvailability(dateStr, durationMinutes);
    }
    throw error;
  }
}

/**
 * Book an appointment in Google Calendar
 */
export async function bookAppointment(details: BookingDetails): Promise<boolean> {
  try {
    const calendar = getCalendarClient();

    const start = new Date(details.timeSlot);
    const duration = details.durationMinutes || 60;
    const end = new Date(start.getTime() + duration * 60 * 1000);

    let summary = "";
    let description = "";
    const isFirstStr = details.isFirstVisit ? "This is their first visit to the clinic." : "This is not their first visit.";

    if (details.patientType === "child") {
      summary = `Aura Kid Booking: ${details.childName}`;
      description = `${details.name} booked a pediatric appointment for their ${details.childAge} child, ${details.childName}. The reason for the visit is a ${details.reason}. You can reach the parent at ${details.phone} or ${details.email}. ${isFirstStr}`;
    } else if (details.patientType === "family") {
      summary = `Aura Family Booking: ${details.name}`;
      description = `${details.name} booked a family appointment for a ${details.reason}. The family members attending are: ${details.familyMembers}. You can reach ${details.name.split(" ")[0]} at ${details.phone} or ${details.email}. ${isFirstStr}`;
    } else {
      summary = `Aura Booking: ${details.name}`;
      description = `${details.name} is booked for an adult ${details.reason}. You can reach them at ${details.phone} or ${details.email} if needed. ${isFirstStr}`;
    }

    const event = {
      summary,
      description,
      start: {
        dateTime: start.toISOString(),
        timeZone: CLINIC_TIME_ZONE,
      },
      end: {
        dateTime: end.toISOString(),
        timeZone: CLINIC_TIME_ZONE,
      },
      attendees: [
        { email: details.email } // This sends the Google Calendar invite automatically!
      ],
      reminders: {
        useDefault: true,
      },
    };

    const response = await calendar.events.insert({
      calendarId: GOOGLE_CALENDAR_ID,
      sendUpdates: "all",
      requestBody: event,
    });

    return !!response.data.id;
  } catch (error) {
    console.error("Error in bookAppointment:", error);
    if (!GOOGLE_CLIENT_ID) {
      console.warn("Simulating mock booking because credentials are missing.");
      return true;
    }
    throw error;
  }
}

/**
 * Fallback mock generator for local testing/development
 */
function getMockAvailability(dateStr: string, durationMinutes: number = 60): string[] {
  const day = new Date(`${dateStr}T00:00:00+00:00`).getUTCDay();
  if (day === 0) return []; // Sunday Closed

  const hours = WORKING_HOURS[day] || { start: 9, end: 17 };
  const mockSlots: string[] = [];
  const workEndTime = getClinicDate(dateStr, hours.end);
  
  for (let h = hours.start; h < hours.end; h++) {
    for (const m of [0, 30]) {
      const slotStart = getClinicDate(dateStr, h, m);
      const slotEnd = new Date(slotStart.getTime() + durationMinutes * 60 * 1000);
      
      if (slotEnd > workEndTime) continue;
      
      // Arbitrarily block 12 PM (lunch) and 2 PM (busy) for demonstration
      if (h !== 12 && h !== 14) {
        mockSlots.push(slotStart.toISOString());
      }
    }
  }
  return mockSlots;
}
