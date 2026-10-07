import { sendWhatsApp, notifyBookingConfirmed, notifyCaseUpdate } from '@/lib/whatsapp'
import { sendSMS } from '@/lib/fast2sms'
import { sendEmail, sendBookingConfirmation } from '@/lib/brevo'

/**
 * Multi-channel notification dispatcher for LegalEase.
 * Coordinates WhatsApp, SMS, and transactional Email with graceful fallbacks.
 * From AGENTS.md lines 1025-1058.
 */

export interface BookingNotificationParams {
  clientPhone: string
  clientEmail: string
  lawyerPhone: string
  lawyerEmail: string
  lawyerName: string
  clientName: string
  date: string
  time: string
  meetLink: string
  bookingRef: string
  fee: number
}

/**
 * Dispatches multi-channel confirmation upon successful booking and escrow lock.
 * @param params - Booking and participant details
 */
export async function notifyBooking(params: BookingNotificationParams): Promise<void> {
  await Promise.allSettled([
    // 1. WhatsApp to Client
    notifyBookingConfirmed({
      clientPhone: params.clientPhone,
      lawyerName: params.lawyerName,
      date: params.date,
      time: params.time,
      meetLink: params.meetLink,
      bookingRef: params.bookingRef,
    }),

    // 2. WhatsApp alert to Lawyer
    sendWhatsApp(
      params.lawyerPhone,
      `💼 *New Consultation Booked — LegalEase*\n\n` +
      `Client: ${params.clientName}\n` +
      `Date: ${params.date} at ${params.time} IST\n` +
      `Mode: Google Meet\n` +
      `Booking Ref: ${params.bookingRef}\n` +
      `Join: ${params.meetLink}`
    ),

    // 3. SMS to Client (Fast2SMS)
    sendSMS(
      params.clientPhone,
      `LegalEase: Consultation confirmed with ${params.lawyerName} on ${params.date} at ${params.time}. Meet: ${params.meetLink}`
    ),

    // 4. Email to Client
    sendBookingConfirmation({
      clientEmail: params.clientEmail,
      clientName: params.clientName,
      lawyerName: params.lawyerName,
      date: params.date,
      time: params.time,
      meetLink: params.meetLink,
      bookingRef: params.bookingRef,
      totalAmount: params.fee,
    }),
  ])
}

/**
 * Dispatches case progression updates to client across WhatsApp and Email.
 */
export async function notifyCaseProgression(params: {
  clientPhone: string
  clientEmail: string
  clientName: string
  lawyerName: string
  caseTitle: string
  stageName: string
  stageDesc: string
  caseUrl: string
}): Promise<void> {
  await Promise.allSettled([
    notifyCaseUpdate({
      clientPhone: params.clientPhone,
      lawyerName: params.lawyerName,
      stageName: params.stageName,
      notes: params.stageDesc,
      caseUrl: params.caseUrl,
    }),
    sendEmail({
      to: params.clientEmail,
      name: params.clientName,
      subject: `Case Update: ${params.caseTitle} — ${params.stageName}`,
      htmlContent: `
        <div style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #E2E8F0; border-radius: 8px;">
          <h2 style="color: #0B1F3A;">LegalEase Case Tracker Update</h2>
          <p>Dear ${params.clientName},</p>
          <p>Your lawyer <strong>${params.lawyerName}</strong> has updated your case status:</p>
          <div style="background-color: #F8FAFC; padding: 16px; border-left: 4px solid #0D7A55; margin: 20px 0;">
            <h3 style="margin: 0 0 8px 0; color: #0B1F3A;">${params.stageName}</h3>
            <p style="margin: 0; color: #475569;">${params.stageDesc}</p>
          </div>
          <p><a href="${params.caseUrl}" style="background-color: #0B1F3A; color: #ffffff; padding: 10px 20px; text-decoration: none; border-radius: 6px; display: inline-block;">View Case Details</a></p>
        </div>
      `,
    }),
  ])
}
