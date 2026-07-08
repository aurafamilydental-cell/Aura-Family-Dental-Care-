# Aura Family Dental Care Clinic

Next.js website for Aura Family Dental Care, a dental clinic serving patients in Koforidua, Ghana. The site includes marketing pages, service pages, patient comfort content, and an online booking drawer connected to Google Calendar and optional Google Sheets logging.

## Tech Stack

- Next.js 16 App Router
- React 19
- Tailwind CSS 4
- TypeScript
- Google Calendar API
- Google Sheets API
- Vercel Analytics and Speed Insights

## Local Development

Install dependencies:

```bash
npm install
```

Run the development server:

```bash
npm run dev
```

Open `http://localhost:3000`.

Use `npm.cmd` instead of `npm` in PowerShell if script execution policy blocks `npm.ps1`:

```bash
npm.cmd run dev
```

## Environment Variables

Create `.env.local` in the project root. Next.js only loads env files from the root, not from `src`.

Required for live Google Calendar booking:

```bash
GOOGLE_CLIENT_ID=
GOOGLE_CLIENT_SECRET=
GOOGLE_REFRESH_TOKEN=
GOOGLE_CALENDAR_ID=
```

Optional for Google Sheets booking logs:

```bash
GOOGLE_SHEET_ID=
```

If Google credentials are missing in local development, the booking helpers fall back to mock availability and simulated bookings so the UI can still be tested.

## Booking Flow

1. The user opens the booking drawer and selects patient details, treatment reason, date, and time.
2. The browser calls `/api/availability` to get available appointment slots.
3. The browser posts the completed booking to `/api/book`.
4. The server creates the appointment in Google Calendar.
5. If `GOOGLE_SHEET_ID` is configured, the server also appends the booking to Google Sheets.

Google Calendar and Sheets helpers are marked server-only. They must stay behind API routes and must not be imported into client components.

## Clinic Timezone

The clinic timezone is set to `Africa/Accra`.

Ghana uses GMT year-round, so appointment slots are generated and stored against Accra local clinic hours without daylight-saving shifts.

## Fonts

The header uses a local Inter variable font file stored at:

```txt
public/fonts/inter-latin-wght-normal.woff2
```

This avoids production builds depending on a live Google Fonts request.

## Useful Commands

```bash
npm run lint
npm run build
npm run start
```

In PowerShell:

```bash
npm.cmd run lint
npm.cmd run build
npm.cmd run start
```

## Deployment

The project is intended for Vercel deployment. Configure the same Google environment variables in the Vercel project settings before enabling live booking.

After deployment, test:

- Homepage and route navigation
- Booking availability lookup
- Booking submission
- Google Calendar event creation
- Google Sheets row logging, if enabled
