import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

/**
 * Google Meet integration via Google Calendar API.
 * Creates, extends, and deletes Google Meet rooms for video consultations.
 * Google Calendar creates events with automatic Meet links.
 * Both parties receive calendar invites + email notifications.
 *
 * Flow:
 * 1. Booking confirmed → createMeetRoom() → Meet link stored in Booking
 * 2. Session extended → extendMeeting() → Calendar event end time updated
 * 3. Booking cancelled → deleteMeetRoom() → Calendar event removed
 */

/**
 * Get authenticated OAuth2 client for Google Calendar API.
 * Uses refresh token to maintain persistent access.
 */
function getAuth(): OAuth2Client {
  const auth = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN,
  })
  return auth
}

/**
 * Check if Google Calendar API credentials are configured.
 * @returns True if all required env vars are present
 */
function isConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  )
}

/** Result of creating a Meet room */
interface MeetRoomResult {
  meetLink: string
  eventId: string
}

/**
 * Create a Google Meet room via Google Calendar API.
 * Creates a calendar event with conference data, sends invites to both parties.
 *
 * @param bookingRef - Unique booking reference (used as conference request ID)
 * @param lawyerEmail - Lawyer's email address
 * @param clientEmail - Client's email address
 * @param startTime - Scheduled consultation start time
 * @param durationMinutes - Consultation duration in minutes (default: 60)
 * @returns Object containing Meet link and Calendar event ID
 */
export async function createMeetRoom(
  bookingRef: string,
  lawyerEmail: string,
  clientEmail: string,
  startTime: Date,
  durationMinutes: number = 60
): Promise<MeetRoomResult> {
  if (!isConfigured()) {
    console.warn('[GoogleMeet] API not configured — returning placeholder')
    return {
      meetLink: `https://meet.google.com/placeholder-${bookingRef}`,
      eventId: `placeholder-event-${bookingRef}`,
    }
  }

  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: getAuth(),
    })

    const endTime = new Date(startTime.getTime() + durationMinutes * 60 * 1000)

    const event = await calendar.events.insert({
      calendarId: 'primary',
      conferenceDataVersion: 1,
      sendUpdates: 'all',
      requestBody: {
        summary: `LegalEase Consultation — ${bookingRef}`,
        description: `Secure legal consultation via LegalEase.\nBooking ID: ${bookingRef}\n\nJoin the meeting using the Google Meet link below.`,
        start: {
          dateTime: startTime.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        end: {
          dateTime: endTime.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
        attendees: [
          { email: lawyerEmail, displayName: 'Lawyer' },
          { email: clientEmail, displayName: 'Client' },
        ],
        conferenceData: {
          createRequest: {
            requestId: bookingRef,
            conferenceSolutionKey: {
              type: 'hangoutsMeet',
            },
          },
        },
        reminders: {
          useDefault: false,
          overrides: [
            { method: 'email', minutes: 60 },
            { method: 'popup', minutes: 10 },
          ],
        },
      },
    })

    const meetLink = event.data.conferenceData?.entryPoints?.[0]?.uri ?? ''
    const eventId = event.data.id ?? ''

    return { meetLink, eventId }
  } catch (error) {
    console.error('[GoogleMeet] createMeetRoom error:', error)
    return {
      meetLink: `https://meet.google.com/fallback-${bookingRef}`,
      eventId: `fallback-event-${bookingRef}`,
    }
  }
}

/**
 * Extend a Google Meet session by updating the Calendar event end time.
 * Called when a client extends their consultation session.
 *
 * @param eventId - Google Calendar event ID
 * @param additionalMinutes - Minutes to add to the session
 */
export async function extendMeeting(
  eventId: string,
  additionalMinutes: number
): Promise<void> {
  if (!isConfigured() || eventId.startsWith('placeholder') || eventId.startsWith('fallback')) {
    console.warn('[GoogleMeet] Skipping extend — not configured or placeholder event')
    return
  }

  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: getAuth(),
    })

    const existing = await calendar.events.get({
      calendarId: 'primary',
      eventId,
    })

    const currentEnd = new Date(existing.data.end?.dateTime ?? '')
    const newEnd = new Date(currentEnd.getTime() + additionalMinutes * 60 * 1000)

    await calendar.events.patch({
      calendarId: 'primary',
      eventId,
      sendUpdates: 'all',
      requestBody: {
        end: {
          dateTime: newEnd.toISOString(),
          timeZone: 'Asia/Kolkata',
        },
      },
    })
  } catch (error) {
    console.error('[GoogleMeet] extendMeeting error:', error)
  }
}

/**
 * Delete a Google Meet room by removing the Calendar event.
 * Called when a booking is cancelled.
 *
 * @param eventId - Google Calendar event ID to delete
 */
export async function deleteMeetRoom(eventId: string): Promise<void> {
  if (!isConfigured() || eventId.startsWith('placeholder') || eventId.startsWith('fallback')) {
    console.warn('[GoogleMeet] Skipping delete — not configured or placeholder event')
    return
  }

  try {
    const calendar = google.calendar({
      version: 'v3',
      auth: getAuth(),
    })

    await calendar.events.delete({
      calendarId: 'primary',
      eventId,
      sendUpdates: 'all',
    })
  } catch (error) {
    console.error('[GoogleMeet] deleteMeetRoom error:', error)
  }
}
