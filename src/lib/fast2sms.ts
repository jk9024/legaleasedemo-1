/**
 * Fast2SMS integration for LegalEase.
 * Indian SMS service at Rs.0.10 per SMS — 6x cheaper than Twilio.
 * Used for OTP verification and critical notifications.
 */

/** Check if Fast2SMS is configured */
function isConfigured(): boolean {
  return !!process.env.FAST2SMS_KEY
}

/**
 * Send an SMS message via Fast2SMS API.
 *
 * @param phone - Indian phone number (with or without +91 prefix)
 * @param message - SMS message content
 */
export async function sendSMS(phone: string, message: string): Promise<void> {
  const cleanPhone = phone.replace(/^\+91/, '').replace(/\s/g, '').trim()

  if (!isConfigured()) {
    console.warn('[Fast2SMS] API key not configured — SMS not sent')
    console.log(`[Fast2SMS] Would send to: ${cleanPhone} | Message: ${message}`)
    return
  }

  try {
    const response = await fetch('https://www.fast2sms.com/dev/bulkV2', {
      method: 'POST',
      headers: {
        authorization: process.env.FAST2SMS_KEY!,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        route: 'q',
        message,
        language: 'english',
        flash: 0,
        numbers: cleanPhone,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Fast2SMS error ${response.status}: ${errorBody}`)
    }
  } catch (error) {
    console.error('[Fast2SMS] sendSMS error:', error)
  }
}

/**
 * Generate a 6-digit OTP.
 * @returns 6-digit numeric OTP string
 */
export function generateOTP(): string {
  return Math.floor(100000 + Math.random() * 900000).toString()
}

/**
 * Send OTP via SMS for phone verification.
 *
 * @param phone - Indian phone number
 * @param otp - 6-digit OTP code
 */
export async function sendOTP(phone: string, otp: string): Promise<void> {
  await sendSMS(
    phone,
    `Your LegalEase OTP is ${otp}. Valid for 10 minutes. Do not share with anyone. — LegalEase`
  )
}

/**
 * Send booking confirmation SMS.
 */
export async function sendBookingConfirmationSMS(params: {
  phone: string
  lawyerName: string
  date: string
  time: string
  bookingRef: string
}): Promise<void> {
  await sendSMS(
    params.phone,
    `LegalEase: Booking confirmed with ${params.lawyerName} on ${params.date} at ${params.time} IST. ID: ${params.bookingRef}. Join via Meet link in your email.`
  )
}

/**
 * Send case update SMS.
 */
export async function sendCaseUpdateSMS(params: {
  phone: string
  stageName: string
  caseTitle: string
}): Promise<void> {
  await sendSMS(
    params.phone,
    `LegalEase: Your case "${params.caseTitle}" has been updated to "${params.stageName}". Check your dashboard for details.`
  )
}
