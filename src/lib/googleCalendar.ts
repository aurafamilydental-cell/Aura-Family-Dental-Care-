import crypto from "crypto";

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

const GOOGLE_CLIENT_EMAIL = process.env.GOOGLE_CLIENT_EMAIL;
const GOOGLE_PRIVATE_KEY = process.env.GOOGLE_PRIVATE_KEY;
const GOOGLE_CALENDAR_ID = process.env.GOOGLE_CALENDAR_ID;

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

/**
 * Generates a signed JWT and exchanges it for a Google OAuth2 access token.
 */
async function getAccessToken(): Promise<string> {
  if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
    throw new Error("Missing Google Calendar service account credentials in env.");
  }

  const header = {
    alg: "RS256",
    typ: "JWT",
  };

  const now = Math.floor(Date.now() / 1000);
  const claimSet = {
    iss: GOOGLE_CLIENT_EMAIL,
    scope: "https://www.googleapis.com/auth/calendar",
    aud: "https://oauth2.googleapis.com/token",
    exp: now + 3600,
    iat: now,
  };

  const encodedHeader = Buffer.from(JSON.stringify(header)).toString("base64url");
  const encodedClaimSet = Buffer.from(JSON.stringify(claimSet)).toString("base64url");

  const sign = crypto.createSign("RSA-SHA256");
  sign.update(`${encodedHeader}.${encodedClaimSet}`);

  // Handle newlines in private key if it has escaped \n
  const formattedKey = GOOGLE_PRIVATE_KEY.replace(/\\n/g, "\n");
  const signature = sign.sign(formattedKey, "base64url");

  const jwt = `${encodedHeader}.${encodedClaimSet}.${signature}`;

  const response = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
      assertion: jwt,
    }),
  });

  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Failed to exchange JWT for access token: ${errorText}`);
  }

  const data = await response.json();
  return data.access_token;
}

/**
 * Checks availability for a specific date (YYYY-MM-DD)
 */
export async function getCalendarAvailability(dateStr: string): Promise<string[]> {
  try {
    const targetDate = new Date(dateStr);
    const dayOfWeek = targetDate.getUTCDay();
    const hours = WORKING_HOURS[dayOfWeek];

    if (!hours) {
      return []; // Closed
    }

    const token = await getAccessToken();
    const calendarId = GOOGLE_CALENDAR_ID || "primary";

    // Set time limits for our query (start of work day to end of work day in UTC/local)
    const timeMin = new Date(`${dateStr}T${String(hours.start).padStart(2, "0")}:00:00Z`).toISOString();
    const timeMax = new Date(`${dateStr}T${String(hours.end).padStart(2, "0")}:00:00Z`).toISOString();

    const url = new URL(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events`);
    url.searchParams.append("timeMin", timeMin);
    url.searchParams.append("timeMax", timeMax);
    url.searchParams.append("singleEvents", "true");
    url.searchParams.append("orderBy", "startTime");

    const response = await fetch(url.toString(), {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to list calendar events: ${errorText}`);
    }

    const data = await response.json();
    const events = data.items || [];

    // Generate possible 1-hour slots
    const availableSlots: string[] = [];
    for (let hour = hours.start; hour < hours.end; hour++) {
      const slotStart = new Date(`${dateStr}T${String(hour).padStart(2, "0")}:00:00Z`);
      const slotEnd = new Date(`${dateStr}T${String(hour + 1).padStart(2, "0")}:00:00Z`);

      // Check if any event overlaps with this slot
      const isOverlapping = events.some((event: unknown) => {
        const eventStart = new Date(event.start.dateTime || event.start.date);
        const eventEnd = new Date(event.end.dateTime || event.end.date);

        // Overlap logic: Event starts before slot ends AND event ends after slot starts
        return eventStart < slotEnd && eventEnd > slotStart;
      });

      if (!isOverlapping) {
        availableSlots.push(slotStart.toISOString());
      }
    }

    return availableSlots;
  } catch (error) {
    console.error("Error in getCalendarAvailability:", error);
    // Return mock data in development if credentials are missing
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.warn("Using mock availability because credentials are missing.");
      return getMockAvailability(dateStr);
    }
    throw error;
  }
}

/**
 * Book an appointment in Google Calendar
 */
export async function bookAppointment(details: BookingDetails): Promise<boolean> {
  try {
    const token = await getAccessToken();
    const calendarId = GOOGLE_CALENDAR_ID || "primary";

    const start = new Date(details.timeSlot);
    const duration = details.durationMinutes || 60;
    const end = new Date(start.getTime() + duration * 60 * 1000);

    let summary = `Aura Booking: ${details.name}`;
    let description = `Type: ${details.patientType.toUpperCase()}\n`;
    description += `Reason: ${details.reason}\n`;
    description += `Phone: ${details.phone}\n`;
    description += `Email: ${details.email}\n`;

    if (details.patientType === "child") {
      summary = `Aura Kid Booking: ${details.childName}`;
      description += `Child Age: ${details.childAge}\n`;
      description += `First Visit: ${details.isFirstVisit ? "Yes" : "No"}\n`;
      description += `Parent/Guardian: ${details.name}\n`;
    } else if (details.patientType === "family") {
      summary = `Aura Family Booking: ${details.name}`;
      description += `Family Members: ${details.familyMembers}\n`;
      description += `Preference: ${details.appointmentPref}\n`;
    }

    const event = {
      summary,
      description,
      start: {
        dateTime: start.toISOString(),
      },
      end: {
        dateTime: end.toISOString(),
      },
      attendees: [
        { email: details.email } // This sends the Google Calendar invite automatically!
      ],
      reminders: {
        useDefault: true,
      },
    };

    const response = await fetch(`https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?sendUpdates=all`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(event),
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(`Failed to create calendar event: ${errorText}`);
    }

    return true;
  } catch (error) {
    console.error("Error in bookAppointment:", error);
    if (!GOOGLE_CLIENT_EMAIL || !GOOGLE_PRIVATE_KEY) {
      console.warn("Simulating mock booking because credentials are missing.");
      return true;
    }
    throw error;
  }
}

/**
 * Fallback mock generator for local testing/development
 */
function getMockAvailability(dateStr: string): string[] {
  const day = new Date(dateStr).getDay();
  if (day === 0) return []; // Sunday Closed

  const hours = WORKING_HOURS[day] || { start: 9, end: 17 };
  const mockSlots: string[] = [];
  
  for (let h = hours.start; h < hours.end; h++) {
    // Arbitrarily block 12 PM (lunch) and 2 PM (busy) for demonstration
    if (h !== 12 && h !== 14) {
      mockSlots.push(new Date(`${dateStr}T${String(h).padStart(2, "0")}:00:00.000Z`).toISOString());
    }
  }
  return mockSlots;
}
