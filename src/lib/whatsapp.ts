/**
 * Meta WhatsApp Cloud API integration for LegalEase.
 * Used for booking confirmations, case updates, session extensions,
 * and emergency consultation notifications.
 *
 * Cost: ~Rs.500/month for 500 messages.
 */

/** Check if WhatsApp API is configured */
function isConfigured(): boolean {
  return !!(process.env.WHATSAPP_CLOUD_TOKEN && process.env.WHATSAPP_PHONE_ID)
}

/**
 * Send a WhatsApp message via Meta Cloud API.
 *
 * @param phone - Phone number (with or without country code)
 * @param message - Message text (supports WhatsApp formatting)
 */
export async function sendWhatsApp(phone: string, message: string): Promise<void> {
  const cleanPhone = phone.startsWith('+') ? phone.slice(1) : '91' + phone.replace(/\s/g, '')

  if (!isConfigured()) {
    console.warn('[WhatsApp] API not configured — message not sent')
    console.log(`[WhatsApp] Would send to: ${cleanPhone} | Message: ${message}`)
    return
  }

  try {
    const response = await fetch(
      `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messaging_product: 'whatsapp',
          to: cleanPhone,
          type: 'text',
          text: { body: message },
        }),
      }
    )

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`WhatsApp API error ${response.status}: ${errorBody}`)
    }
  } catch (error) {
    console.error('[WhatsApp] sendWhatsApp error:', error)
  }
}

/**
 * Notify client about a confirmed booking via WhatsApp.
 */
export async function notifyBookingConfirmed(params: {
  clientPhone: string
  lawyerName: string
  date: string
  time: string
  meetLink: string
  bookingRef: string
}): Promise<void> {
  await sendWhatsApp(
    params.clientPhone,
    `✅ *Booking Confirmed — LegalEase*\n\n` +
      `Lawyer: ${params.lawyerName}\n` +
      `Date: ${params.date}\n` +
      `Time: ${params.time} IST\n` +
      `Mode: Google Meet\n` +
      `Join: ${params.meetLink}\n` +
      `Booking ID: ${params.bookingRef}\n\n` +
      `_Reply HELP for support_`
  )
}

/**
 * Notify client about a case update via WhatsApp.
 */
export async function notifyCaseUpdate(params: {
  clientPhone: string
  lawyerName: string
  stageName: string
  notes: string
  caseUrl: string
}): Promise<void> {
  await sendWhatsApp(
    params.clientPhone,
    `📋 *Case Update — LegalEase*\n\n` +
      `Lawyer: ${params.lawyerName}\n` +
      `Status: ${params.stageName}\n` +
      `Note: ${params.notes}\n\n` +
      `Track your case: ${params.caseUrl}\n` +
      `_Reply STATUS to get full case details_`
  )
}

/**
 * Notify lawyer about a session extension via WhatsApp.
 */
export async function notifySessionExtension(params: {
  lawyerPhone: string
  clientName: string
  extraMinutes: number
}): Promise<void> {
  await sendWhatsApp(
    params.lawyerPhone,
    `⏱️ *Session Extended — LegalEase*\n\n` +
      `Client ${params.clientName} has extended ` +
      `the session by ${params.extraMinutes} minutes.\n` +
      `Payment confirmed. Please continue.`
  )
}

/**
 * Notify lawyers about an emergency consultation request.
 */
export async function notifyEmergencyRequest(params: {
  lawyerPhone: string
  issueCategory: string
  description: string
  emergencyId: string
}): Promise<void> {
  await sendWhatsApp(
    params.lawyerPhone,
    `🚨 *Emergency Consultation — LegalEase*\n\n` +
      `Category: ${params.issueCategory}\n` +
      `Issue: ${params.description.substring(0, 200)}\n` +
      `Emergency ID: ${params.emergencyId}\n\n` +
      `Reply ACCEPT to take this case.\n` +
      `Fee: ₹1,999 (paid upfront by client)`
  )
}

/**
 * Send call summary notification via WhatsApp.
 */
export async function notifyCallSummary(params: {
  clientPhone: string
  lawyerName: string
  bookingRef: string
  dashboardUrl: string
}): Promise<void> {
  await sendWhatsApp(
    params.clientPhone,
    `📋 *Consultation Summary Ready — LegalEase*\n\n` +
      `Your summary from ${params.lawyerName} is ready.\n` +
      `Booking: ${params.bookingRef}\n\n` +
      `View: ${params.dashboardUrl}\n` +
      `_The PDF has also been sent to your email_`
  )
}
