/**
 * Brevo (formerly Sendinblue) email integration for LegalEase.
 * Free tier: 300 emails per day — sufficient for early stage.
 * Uses Brevo HTTP API for transactional emails.
 *
 * Email types:
 * - Welcome email (on registration)
 * - Booking confirmation
 * - Booking reminder (1 hour before)
 * - Call summary delivery
 * - Session extension notification
 * - Case update notification
 * - Password reset
 * - Invoice delivery
 */

/** Check if Brevo API is configured */
function isConfigured(): boolean {
  return !!process.env.BREVO_API_KEY
}

/** Email sending parameters */
interface SendEmailParams {
  to: string
  name?: string
  subject: string
  htmlContent: string
}

/**
 * Send a transactional email via Brevo HTTP API.
 *
 * @param params - Email parameters (to, subject, htmlContent)
 */
export async function sendEmail(params: SendEmailParams): Promise<void> {
  if (!isConfigured()) {
    console.warn('[Brevo] API key not configured — email not sent')
    console.log(`[Brevo] Would send to: ${params.to} | Subject: ${params.subject}`)
    return
  }

  try {
    const response = await fetch('https://api.brevo.com/v3/smtp/email', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        sender: {
          name: 'LegalEase',
          email: 'hello@legalease.in',
        },
        to: [{ email: params.to, name: params.name ?? params.to }],
        subject: params.subject,
        htmlContent: params.htmlContent,
      }),
    })

    if (!response.ok) {
      const errorBody = await response.text()
      throw new Error(`Brevo API error ${response.status}: ${errorBody}`)
    }
  } catch (error) {
    console.error('[Brevo] sendEmail error:', error)
  }
}

/**
 * Send booking confirmation email.
 */
export async function sendBookingConfirmation(params: {
  clientEmail: string
  clientName: string
  lawyerName: string
  date: string
  time: string
  bookingRef: string
  meetLink: string
  totalAmount: number
}): Promise<void> {
  await sendEmail({
    to: params.clientEmail,
    name: params.clientName,
    subject: `✅ Booking Confirmed — ${params.bookingRef} | LegalEase`,
    htmlContent: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1F3A; padding: 24px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">LegalEase</h1>
          <p style="color: #fff; margin: 8px 0 0;">Legal Help Made Easy</p>
        </div>
        <div style="padding: 32px; background: #fff;">
          <h2 style="color: #0B1F3A; margin-top: 0;">Booking Confirmed ✅</h2>
          <p>Hi ${params.clientName},</p>
          <p>Your consultation has been confirmed. Here are the details:</p>
          <table style="width: 100%; border-collapse: collapse; margin: 16px 0;">
            <tr><td style="padding: 8px 0; color: #475569;">Booking ID</td><td style="padding: 8px 0; font-weight: 600;">${params.bookingRef}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Lawyer</td><td style="padding: 8px 0; font-weight: 600;">${params.lawyerName}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Date</td><td style="padding: 8px 0; font-weight: 600;">${params.date}</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Time</td><td style="padding: 8px 0; font-weight: 600;">${params.time} IST</td></tr>
            <tr><td style="padding: 8px 0; color: #475569;">Amount Paid</td><td style="padding: 8px 0; font-weight: 600; color: #0D7A55;">₹${params.totalAmount.toLocaleString('en-IN')}</td></tr>
          </table>
          <a href="${params.meetLink}" style="display: inline-block; background: #0B1F3A; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; margin: 16px 0;">Join Google Meet</a>
          <p style="color: #475569; font-size: 14px; margin-top: 24px;">You will also receive a calendar invite with the Meet link. Please join on time.</p>
        </div>
        <div style="background: #F8FAFC; padding: 16px; text-align: center; color: #475569; font-size: 12px;">
          <p>LegalEase — India's Trusted Legal Platform</p>
          <p>© ${new Date().getFullYear()} LegalEase. All rights reserved.</p>
        </div>
      </div>
    `,
  })
}

/**
 * Send call summary email to client.
 */
export async function sendCallSummaryEmail(params: {
  clientEmail: string
  clientName: string
  lawyerName: string
  bookingRef: string
  summaryPdfUrl?: string
  issueDiscussed: string
  nextSteps: string[]
}): Promise<void> {
  const nextStepsHtml = params.nextSteps
    .map((step) => `<li style="padding: 4px 0;">${step}</li>`)
    .join('')

  await sendEmail({
    to: params.clientEmail,
    name: params.clientName,
    subject: `📋 Consultation Summary — ${params.bookingRef} | LegalEase`,
    htmlContent: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1F3A; padding: 24px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">LegalEase</h1>
        </div>
        <div style="padding: 32px; background: #fff;">
          <h2 style="color: #0B1F3A; margin-top: 0;">Consultation Summary 📋</h2>
          <p>Hi ${params.clientName},</p>
          <p>Here is a summary of your consultation with <strong>${params.lawyerName}</strong>:</p>
          <div style="background: #F8FAFC; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="margin-top: 0; color: #0B1F3A;">Issue Discussed</h3>
            <p>${params.issueDiscussed}</p>
          </div>
          <div style="background: #e6f4f0; padding: 16px; border-radius: 8px; margin: 16px 0;">
            <h3 style="margin-top: 0; color: #0D7A55;">Next Steps</h3>
            <ol style="padding-left: 20px;">${nextStepsHtml}</ol>
          </div>
          ${params.summaryPdfUrl ? `<a href="${params.summaryPdfUrl}" style="display: inline-block; background: #0B1F3A; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none;">Download Full PDF</a>` : ''}
        </div>
        <div style="background: #F8FAFC; padding: 16px; text-align: center; color: #475569; font-size: 12px;">
          <p>This is a confidential document. Do not share without authorization.</p>
        </div>
      </div>
    `,
  })
}

/**
 * Send welcome email to new users.
 */
export async function sendWelcomeEmail(params: {
  email: string
  name: string
  role: string
}): Promise<void> {
  await sendEmail({
    to: params.email,
    name: params.name,
    subject: `Welcome to LegalEase! 🎉`,
    htmlContent: `
      <div style="font-family: 'Segoe UI', sans-serif; max-width: 600px; margin: 0 auto;">
        <div style="background: #0B1F3A; padding: 24px; text-align: center;">
          <h1 style="color: #C9A84C; margin: 0; font-size: 24px;">LegalEase</h1>
          <p style="color: #fff; margin: 8px 0 0;">Legal Help Made Easy</p>
        </div>
        <div style="padding: 32px; background: #fff;">
          <h2 style="color: #0B1F3A; margin-top: 0;">Welcome, ${params.name}! 🎉</h2>
          <p>Your ${params.role.toLowerCase()} account has been created successfully.</p>
          <p>With LegalEase, you can:</p>
          <ul style="color: #475569;">
            <li>Search 500+ verified lawyers across India</li>
            <li>Book video consultations via Google Meet</li>
            <li>Track your cases in real-time</li>
            <li>Access legal document templates</li>
          </ul>
          <a href="${process.env.NEXT_PUBLIC_APP_URL}" style="display: inline-block; background: #0B1F3A; color: #fff; padding: 12px 32px; border-radius: 8px; text-decoration: none; margin: 16px 0;">Explore LegalEase</a>
        </div>
        <div style="background: #F8FAFC; padding: 16px; text-align: center; color: #475569; font-size: 12px;">
          <p>© ${new Date().getFullYear()} LegalEase. All rights reserved.</p>
        </div>
      </div>
    `,
  })
}
