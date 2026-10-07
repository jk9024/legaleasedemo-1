import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

/**
 * Google Drive integration for LegalEase.
 * Handles saving and retrieving Google Meet recording files.
 * Recordings are auto-saved to the lawyer's Google Drive when consent is given.
 */

/**
 * Get authenticated OAuth2 client for Google Drive API.
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
 * Check if Google Drive API credentials are configured.
 */
function isConfigured(): boolean {
  return !!(
    process.env.GOOGLE_CLIENT_ID &&
    process.env.GOOGLE_CLIENT_SECRET &&
    process.env.GOOGLE_REFRESH_TOKEN
  )
}

/** Drive file metadata */
interface DriveFile {
  id: string
  name: string
  mimeType: string
  webViewLink: string
  size: string
}

/**
 * Get a recording file from Google Drive by meeting event ID.
 * Searches for Meet recordings matching the booking reference.
 *
 * @param bookingRef - Booking reference to search for
 * @returns Drive file metadata or null if not found
 */
export async function getRecording(bookingRef: string): Promise<DriveFile | null> {
  if (!isConfigured()) {
    console.warn('[GoogleDrive] API not configured')
    return null
  }

  try {
    const drive = google.drive({
      version: 'v3',
      auth: getAuth(),
    })

    const response = await drive.files.list({
      q: `name contains '${bookingRef}' and mimeType contains 'video'`,
      fields: 'files(id, name, mimeType, webViewLink, size)',
      orderBy: 'createdTime desc',
      pageSize: 1,
    })

    const files = response.data.files
    if (!files || files.length === 0) return null

    const file = files[0]
    return {
      id: file.id ?? '',
      name: file.name ?? '',
      mimeType: file.mimeType ?? '',
      webViewLink: file.webViewLink ?? '',
      size: file.size ?? '0',
    }
  } catch (error) {
    console.error('[GoogleDrive] getRecording error:', error)
    return null
  }
}

/**
 * Save a recording URL to the database after the call ends.
 * In production, this retrieves the auto-saved Meet recording from Drive.
 *
 * @param bookingRef - Booking reference
 * @param driveFileId - Google Drive file ID of the recording
 * @returns Web view link for the recording
 */
export async function getRecordingLink(driveFileId: string): Promise<string> {
  if (!isConfigured()) {
    console.warn('[GoogleDrive] API not configured')
    return ''
  }

  try {
    const drive = google.drive({
      version: 'v3',
      auth: getAuth(),
    })

    const file = await drive.files.get({
      fileId: driveFileId,
      fields: 'webViewLink',
    })

    return file.data.webViewLink ?? ''
  } catch (error) {
    console.error('[GoogleDrive] getRecordingLink error:', error)
    return ''
  }
}

/**
 * Share a Drive file with a specific email.
 *
 * @param fileId - Google Drive file ID
 * @param email - Email to share with
 * @param role - Permission role (reader, writer)
 */
export async function shareFile(
  fileId: string,
  email: string,
  role: 'reader' | 'writer' = 'reader'
): Promise<void> {
  if (!isConfigured()) {
    console.warn('[GoogleDrive] API not configured')
    return
  }

  try {
    const drive = google.drive({
      version: 'v3',
      auth: getAuth(),
    })

    await drive.permissions.create({
      fileId,
      requestBody: {
        type: 'user',
        role,
        emailAddress: email,
      },
      sendNotificationEmail: true,
    })
  } catch (error) {
    console.error('[GoogleDrive] shareFile error:', error)
  }
}
