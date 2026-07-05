import { google } from "googleapis";
import { BookingDetails } from "./googleCalendar";

const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const GOOGLE_REFRESH_TOKEN = process.env.GOOGLE_REFRESH_TOKEN;
const GOOGLE_SHEET_ID = process.env.GOOGLE_SHEET_ID;

/**
 * Initializes and returns the authenticated Google Sheets client
 */
function getSheetsClient() {
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

  return google.sheets({ version: "v4", auth: oauth2Client });
}

/**
 * Appends booking details as a new row in Google Sheets
 */
export async function appendBookingToSheet(details: BookingDetails): Promise<boolean> {
  try {
    if (!GOOGLE_SHEET_ID) {
      console.warn("Skipping Sheets logging: GOOGLE_SHEET_ID is not defined in env.");
      return false; // Fail silently if not configured so booking isn't interrupted
    }

    const sheets = getSheetsClient();
    
    // Format the date/time nicely
    const submissionDate = new Date().toISOString();
    const appointmentTime = new Date(details.timeSlot).toLocaleString();

    // Create a structured row array
    const row = [
      submissionDate, // 1. Timestamp
      details.name, // 2. Full Name
      details.phone, // 3. Phone Number
      details.email, // 4. Email
      details.reason, // 5. Treatment Type
      appointmentTime, // 6. Appointment Date & Time
      details.isFirstVisit !== undefined ? (details.isFirstVisit ? "Yes" : "No") : "N/A", // 7. First Visit
      "", // 8. Conversation Summary (AI Only)
      details.patientType.toUpperCase(), // 9. Patient Type
      details.childName || "N/A", // 10. Child Name
      details.childAge || "N/A", // 11. Child Age
      details.familyMembers || "N/A", // 12. Family Members
      "Website" // 13. Booking Source
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: GOOGLE_SHEET_ID,
      range: "Sheet1!A1", // Assumes the first sheet is named Sheet1
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("Successfully logged booking to Google Sheets.");
    return true;
  } catch (error) {
    console.error("Error appending to Google Sheets:", error);
    // We do not throw the error here because we don't want a Sheets API failure 
    // to prevent the user from successfully booking their appointment in the calendar.
    return false;
  }
}
