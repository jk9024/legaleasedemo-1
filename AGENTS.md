<USER_REQUEST>
# AGENTS.md — LegalEase Production Build
# Read this file before every single task.
# Every agent follows every rule here always.

=====================================================
PROJECT IDENTITY
=====================================================

Name:        LegalEase
Type:        Legal consultation marketplace PWA
Goal:        Production-ready, real users in India
Stack:       Next.js 14 + TypeScript + PostgreSQL
             100% Google ecosystem where possible
Launch:      Pan-India — online first
Founder:     Jashwanth — NIAT x CDU, Hyderabad

=====================================================
ABSOLUTE CODING RULES — NEVER BREAK
=====================================================

1.  Write every file complete — never truncate
2.  Never write // TODO or placeholder comments
3.  Every function has JSDoc comments
4.  Every API route: try/catch + Zod validation
5.  Every component: loading + error + empty state
6.  TypeScript strict mode — zero `any` types
7.  Mobile-first — test at 375px always first
8.  Never hardcode secrets — always .env.local
9.  Always verify auth before data access
10. Rate-limit all API routes via Redis
11. PWA: every page works offline
12. Indian formats: Rs. | DD/MM/YYYY |
    +91 phone | 1,00,000 numbers
13. WCAG 2.1 AA on every component
14. generateMetadata on every page
15. After every feature: test in browser,
    fix all errors before continuing

=====================================================
TECH STACK — LOCKED
=====================================================

Framework:      Next.js 14 App Router + TypeScript
Styling:        Tailwind CSS + shadcn/ui
Database:       PostgreSQL + Prisma ORM
DB Host:        Neon (serverless PostgreSQL)
Auth:           NextAuth.js v5
                (credentials + Google OAuth)
State:          Zustand + React Query
Forms:          React Hook Form + Zod
Search:         PostgreSQL full-text search
                (pg_trgm + to_tsvector)
Cache:          Redis via Upstash
Queue:          BullMQ background jobs
Socket:         Socket.io real-time
Charts:         Recharts
Maps:           Google Maps JavaScript API
Files:          Cloudinary (25GB free)
OCR:            Google Cloud Vision API
PDF:            @react-pdf/renderer
i18n:           next-intl (English/Hindi/Telugu)
PWA:            next-pwa
Analytics:      Google Analytics 4 (free forever)
Monitoring:     Sentry (free tier)
Testing:        Vitest + Playwright
Deploy:         Vercel

--- GOOGLE ECOSYSTEM SERVICES ---
AI:             Google Gemini 1.5 Flash (FREE)
                Gemini 1.5 Pro (complex tasks)
Video:          Google Meet API (FREE)
Calendar:       Google Calendar API (FREE)
OCR:            Google Cloud Vision API
Drive:          Google Drive API (15GB free)
Auth:           Google OAuth (via NextAuth)
Maps:           Google Maps API
Analytics:      Google Analytics 4
Email service:  Gmail SMTP or Google Workspace

--- INDIAN-OPTIMIZED SERVICES ---
Payments:       Razorpay (only India option)
Email:          Brevo (300 free emails/day)
SMS/OTP:        Fast2SMS (Rs.0.10/SMS)
WhatsApp:       Meta WhatsApp Cloud API
Storage:        Cloudinary (25GB free)

WHY THESE CHOICES:
Gemini: Free tier 15 req/min, India CDN,
        equal quality to GPT-4, zero cost
Google Meet: Every Indian lawyer already 
        uses it, free, trusted, recordings
        auto-save to Google Drive
Fast2SMS: Indian company, Rs.0.10/SMS vs
        Rs.0.60 Twilio — 6x cheaper
Brevo: 300 emails/day free forever vs 
       Resend which charges after 3,000/month
Cloudinary: 25GB free vs Uploadthing 2GB
PostgreSQL FTS: Zero extra cost, already
        in your DB, sufficient for early stage

MONTHLY COST WITH THIS STACK:
Gemini AI:      Rs.0 (free tier)
Google Meet:    Rs.0 (free)
Brevo Email:    Rs.0 (300/day free)
Fast2SMS:       Rs.300 (2,500 SMS)
Meta WA API:    Rs.500 (500 messages)
Cloudinary:     Rs.0 (25GB free)
PG Search:      Rs.0 (in your DB)
GA4:            Rs.0 (free forever)
Neon DB:        Rs.0 (free tier)
Upstash Redis:  Rs.0 (10K req/day free)
Vercel:         Rs.0 (free hobby tier)
TOTAL:          Rs.800/month only

=====================================================
DESIGN SYSTEM — NEVER DEVIATE
=====================================================

Colors:
  --navy:        #0B1F3A
  --gold:        #C9A84C
  --green:       #0D7A55
  --red:         #DC2626
  --bg:          #F8FAFC
  --white:       #FFFFFF
  --gray:        #475569
  --border:      #E2E8F0
  --navy-light:  #1a3a6b
  --gold-light:  #fef9ec
  --green-light: #e6f4f0
  --red-light:   #fee2e2

Dark mode:
  --bg:          #0f172a
  --white:       #1e293b
  --gray:        #cbd5e1
  --border:      #334155

Typography:
  Hero titles:   Playfair Display (Google Fonts)
  All other:     Sora (Google Fonts)

UI rules:
  Card radius:   12px
  Button radius: 8px
  Input radius:  8px
  Modal radius:  16px
  Card shadow:   0 4px 24px rgba(0,0,0,0.08)
  Hover shadow:  0 8px 40px rgba(0,0,0,0.12)
  Transitions:   all 0.2s ease

=====================================================
FOLDER STRUCTURE
=====================================================

legalease/
├── AGENTS.md
├── .env.local
├── .env.example
├── next.config.js
├── tailwind.config.ts
├── tsconfig.json
├── prisma/
│   ├── schema.prisma
│   └── seed.ts
├── public/
│   ├── manifest.json
│   ├── sw.js
│   ├── offline.html
│   └── icons/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   ├── globals.css
│   │   ├── manifest.ts
│   │   ├── sitemap.ts
│   │   ├── robots.ts
│   │   ├── offline/page.tsx
│   │   ├── (auth)/
│   │   │   ├── login/page.tsx
│   │   │   └── register/page.tsx
│   │   ├── (public)/
│   │   │   ├── search/page.tsx
│   │   │   ├── lawyer/[id]/page.tsx
│   │   │   ├── compare/page.tsx
│   │   │   ├── forum/page.tsx
│   │   │   ├── forum/[id]/page.tsx
│   │   │   ├── templates/page.tsx
│   │   │   ├── news/page.tsx
│   │   │   ├── news/[slug]/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── emergency/page.tsx
│   │   ├── book/[lawyerId]/page.tsx
│   │   ├── video/[bookingId]/page.tsx
│   │   ├── (client)/dashboard/
│   │   │   ├── page.tsx
│   │   │   ├── cases/[id]/page.tsx
│   │   │   ├── bookings/page.tsx
│   │   │   ├── documents/page.tsx
│   │   │   ├── messages/page.tsx
│   │   │   ├── subscription/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (lawyer)/portal/
│   │   │   ├── page.tsx
│   │   │   ├── bookings/page.tsx
│   │   │   ├── clients/page.tsx
│   │   │   ├── knowledge-base/page.tsx
│   │   │   ├── earnings/page.tsx
│   │   │   ├── analytics/page.tsx
│   │   │   ├── referrals/page.tsx
│   │   │   ├── calendar/page.tsx
│   │   │   └── settings/page.tsx
│   │   ├── (admin)/admin/
│   │   │   ├── page.tsx
│   │   │   ├── lawyers/page.tsx
│   │   │   ├── bookings/page.tsx
│   │   │   ├── users/page.tsx
│   │   │   ├── revenue/page.tsx
│   │   │   └── content/page.tsx
│   │   └── api/
│   │       ├── auth/[...nextauth]/route.ts
│   │       ├── lawyers/route.ts
│   │       ├── lawyers/[id]/route.ts
│   │       ├── lawyers/[id]/availability/route.ts
│   │       ├── lawyers/[id]/reviews/route.ts
│   │       ├── bookings/route.ts
│   │       ├── bookings/[id]/route.ts
│   │       ├── bookings/create-order/route.ts
│   │       ├── bookings/verify-payment/route.ts
│   │       ├── bookings/release-escrow/route.ts
│   │       ├── cases/route.ts
│   │       ├── cases/[id]/route.ts
│   │       ├── cases/[id]/stage/route.ts
│   │       ├── knowledge-base/route.ts
│   │       ├── knowledge-base/[id]/route.ts
│   │       ├── call-summary/route.ts
│   │       ├── call-summary/[bookingId]/route.ts
│   │       ├── session/extend/route.ts
│   │       ├── session/extend/confirm/route.ts
│   │       ├── session/timer/route.ts
│   │       ├── ai/match/route.ts
│   │       ├── ai/chat/route.ts
│   │       ├── ai/predict-timeline/route.ts
│   │       ├── ai/generate-summary/route.ts
│   │       ├── ai/find-similar-cases/route.ts
│   │       ├── video/create-meeting/route.ts
│   │       ├── video/end-meeting/route.ts
│   │       ├── subscriptions/route.ts
│   │       ├── forum/route.ts
│   │       ├── templates/route.ts
│   │       ├── documents/route.ts
│   │       ├── news/route.ts
│   │       ├── notifications/route.ts
│   │       ├── search/route.ts
│   │       ├── upload/route.ts
│   │       ├── admin/route.ts
│   │       └── webhooks/
│   │           ├── razorpay/route.ts
│   │           └── whatsapp/route.ts
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── MobileNav.tsx
│   │   │   └── InstallPrompt.tsx
│   │   ├── ui/
│   │   │   └── (all shadcn components)
│   │   ├── home/
│   │   │   ├── HeroSection.tsx
│   │   │   ├── AISearchBar.tsx
│   │   │   ├── CategoryGrid.tsx
│   │   │   ├── HowItWorks.tsx
│   │   │   ├── FeaturedLawyers.tsx
│   │   │   ├── SubscriptionPreview.tsx
│   │   │   ├── EmergencyBanner.tsx
│   │   │   ├── StudentSection.tsx
│   │   │   ├── ForumPreview.tsx
│   │   │   ├── NewsPreview.tsx
│   │   │   ├── Testimonials.tsx
│   │   │   ├── TrustBadges.tsx
│   │   │   ├── StatsCounter.tsx
│   │   │   ├── MapSection.tsx
│   │   │   └── CTASection.tsx
│   │   ├── lawyers/
│   │   │   ├── LawyerCard.tsx
│   │   │   ├── LawyerFilter.tsx
│   │   │   ├── LawyerGrid.tsx
│   │   │   ├── AIMatchBadge.tsx
│   │   │   ├── CompatibilityScore.tsx
│   │   │   └── LawyerCompareTool.tsx
│   │   ├── booking/
│   │   │   ├── BookingFlow.tsx
│   │   │   ├── Step1ConsultType.tsx
│   │   │   ├── Step2DateTime.tsx
│   │   │   ├── Step3Details.tsx
│   │   │   ├── Step4Payment.tsx
│   │   │   └── BookingConfirm.tsx
│   │   ├── session/
│   │   │   ├── SessionTimer.tsx
│   │   │   ├── ExtensionPrompt.tsx
│   │   │   ├── PerMinuteTracker.tsx
│   │   │   └── SessionSummary.tsx
│   │   ├── knowledge-base/
│   │   │   ├── KnowledgeBase.tsx
│   │   │   ├── KBCaseCard.tsx
│   │   │   ├── SimilarCases.tsx
│   │   │   └── KBSearch.tsx
│   │   ├── case/
│   │   │   ├── CaseTracker.tsx
│   │   │   ├── CaseTimeline.tsx
│   │   │   └── CaseDocuments.tsx
│   │   ├── video/
│   │   │   ├── MeetingRoom.tsx
│   │   │   ├── MeetingControls.tsx
│   │   │   ├── MeetingChat.tsx
│   │   │   └── RecordingConsent.tsx
│   │   ├── ai/
│   │   │   ├── GeminiAssistant.tsx
│   │   │   └── ChatBot.tsx
│   │   └── shared/
│   │       ├── StarRating.tsx
│   │       ├── LanguageSwitcher.tsx
│   │       ├── NotificationBell.tsx
│   │       ├── OfflineBanner.tsx
│   │       ├── InstallBanner.tsx
│   │       ├── EmptyState.tsx
│   │       ├── LoadingSkeleton.tsx
│   │       └── ShareButton.tsx
│   ├── lib/
│   │   ├── prisma.ts
│   │   ├── auth.ts
│   │   ├── gemini.ts          ← AI (replaces OpenAI)
│   │   ├── google-meet.ts     ← Video (replaces Daily.co)
│   │   ├── google-drive.ts    ← Files
│   │   ├── google-vision.ts   ← OCR
│   │   ├── razorpay.ts
│   │   ├── brevo.ts           ← Email (replaces Resend)
│   │   ├── fast2sms.ts        ← SMS (replaces Twilio SMS)
│   │   ├── whatsapp.ts        ← Meta Cloud API
│   │   ├── cloudinary.ts      ← Files (replaces Uploadthing)
│   │   ├── redis.ts
│   │   ├── socket.ts
│   │   ├── queue.ts
│   │   └── utils/
│   │       ├── fees.ts
│   │       ├── per-minute.ts
│   │       ├── session-extension.ts
│   │       ├── call-summary.ts
│   │       ├── knowledge-base.ts
│   │       ├── compatibility.ts
│   │       ├── formatters.ts
│   │       ├── validators.ts
│   │       ├── notifications.ts
│   │       └── pdf.ts
│   ├── hooks/
│   │   ├── useAuth.ts
│   │   ├── useLawyers.ts
│   │   ├── useBooking.ts
│   │   ├── useCases.ts
│   │   ├── useSocket.ts
│   │   ├── useSessionTimer.ts
│   │   ├── usePerMinute.ts
│   │   ├── useNotifications.ts
│   │   ├── useGeolocation.ts
│   │   ├── usePWA.ts
│   │   ├── useOffline.ts
│   │   └── useDebounce.ts
│   ├── store/
│   │   ├── useAuthStore.ts
│   │   ├── useBookingStore.ts
│   │   ├── useSessionStore.ts
│   │   └── useNotifStore.ts
│   ├── types/
│   │   ├── index.ts
│   │   ├── api.ts
│   │   └── next-auth.d.ts
│   ├── i18n/
│   │   ├── config.ts
│   │   ├── en.json
│   │   ├── hi.json
│   │   └── te.json
│   └── emails/
│       ├── BookingConfirm.tsx
│       ├── BookingReminder.tsx
│       ├── CaseUpdate.tsx
│       ├── CallSummary.tsx
│       ├── SessionExtension.tsx
│       ├── WelcomeEmail.tsx
│       ├── InvoiceEmail.tsx
│       └── PasswordReset.tsx

=====================================================
SERVICE IMPLEMENTATIONS
=====================================================

--- src/lib/gemini.ts ---
import { GoogleGenerativeAI } from '@google/generative-ai'

const genAI = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY!
)

// Free tier: gemini-1.5-flash (15 req/min)
// Paid tier: gemini-1.5-pro (complex tasks)
export const flashModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-flash'
})

export const proModel = genAI.getGenerativeModel({
  model: 'gemini-1.5-pro'
})

export async function generateText(
  prompt: string,
  usePro = false
): Promise<string> {
  const model = usePro ? proModel : flashModel
  const result = await model.generateContent(prompt)
  return result.response.text()
}

export async function generateJSON<T>(
  prompt: string
): Promise<T> {
  const fullPrompt = prompt + 
    '\n\nRespond with ONLY valid JSON. No markdown.'
  const text = await generateText(fullPrompt)
  const clean = text
    .replace(/```json/g, '')
    .replace(/```/g, '')
    .trim()
  return JSON.parse(clean) as T
}

--- src/lib/google-meet.ts ---
import { google } from 'googleapis'
import { OAuth2Client } from 'google-auth-library'

function getAuth(): OAuth2Client {
  const auth = new OAuth2Client(
    process.env.GOOGLE_CLIENT_ID,
    process.env.GOOGLE_CLIENT_SECRET
  )
  auth.setCredentials({
    refresh_token: process.env.GOOGLE_REFRESH_TOKEN
  })
  return auth
}

export async function createMeetRoom(
  bookingRef: string,
  lawyerEmail: string,
  clientEmail: string,
  startTime: Date,
  durationMinutes: number = 60
): Promise<{ meetLink: string; eventId: string }> {
  const calendar = google.calendar({
    version: 'v3',
    auth: getAuth()
  })

  const endTime = new Date(
    startTime.getTime() + durationMinutes * 60 * 1000
  )

  const event = await calendar.events.insert({
    calendarId: 'primary',
    conferenceDataVersion: 1,
    sendUpdates: 'all',
    requestBody: {
      summary: `LegalEase Consultation — ${bookingRef}`,
      description: `Secure legal consultation via LegalEase.\nBooking ID: ${bookingRef}`,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: 'Asia/Kolkata'
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: 'Asia/Kolkata'
      },
      attendees: [
        { email: lawyerEmail, displayName: 'Lawyer' },
        { email: clientEmail, displayName: 'Client' }
      ],
      conferenceData: {
        createRequest: {
          requestId: bookingRef,
          conferenceSolutionKey: {
            type: 'hangoutsMeet'
          }
        }
      },
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 },
          { method: 'popup', minutes: 10 }
        ]
      }
    }
  })

  const meetLink =
    event.data.conferenceData?.entryPoints?.[0]?.uri || ''
  const eventId = event.data.id || ''

  return { meetLink, eventId }
}

export async function extendMeeting(
  eventId: string,
  additionalMinutes: number
): Promise<void> {
  const calendar = google.calendar({
    version: 'v3',
    auth: getAuth()
  })
  const existing = await calendar.events.get({
    calendarId: 'primary',
    eventId
  })
  const currentEnd = new Date(
    existing.data.end?.dateTime || ''
  )
  const newEnd = new Date(
    currentEnd.getTime() + additionalMinutes * 60 * 1000
  )
  await calendar.events.patch({
    calendarId: 'primary',
    eventId,
    requestBody: {
      end: {
        dateTime: newEnd.toISOString(),
        timeZone: 'Asia/Kolkata'
      }
    }
  })
}

export async function deleteMeetRoom(
  eventId: string
): Promise<void> {
  const calendar = google.calendar({
    version: 'v3',
    auth: getAuth()
  })
  await calendar.events.delete({
    calendarId: 'primary',
    eventId
  })
}

--- src/lib/brevo.ts ---
// Brevo (formerly Sendinblue) — 300 emails/day free

export async function sendEmail({
  to,
  subject,
  htmlContent,
  name
}: {
  to: string
  name?: string
  subject: string
  htmlContent: string
}): Promise<void> {
  const response = await fetch(
    'https://api.brevo.com/v3/smtp/email',
    {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'api-key': process.env.BREVO_API_KEY!,
        'content-type': 'application/json'
      },
      body: JSON.stringify({
        sender: {
          name: 'LegalEase',
          email: 'hello@legalease.in'
        },
        to: [{ email: to, name: name || to }],
        subject,
        htmlContent
      })
    }
  )
  if (!response.ok) {
    throw new Error(`Brevo error: ${response.status}`)
  }
}

--- src/lib/fast2sms.ts ---
// Fast2SMS — Rs.0.10/SMS, Indian company

export async function sendSMS(
  phone: string,
  message: string
): Promise<void> {
  const cleanPhone = phone.replace(/^\+91/, '').trim()
  const response = await fetch(
    'https://www.fast2sms.com/dev/bulkV2',
    {
      method: 'POST',
      headers: {
        authorization: process.env.FAST2SMS_KEY!,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        route: 'q',
        message,
        language: 'english',
        flash: 0,
        numbers: cleanPhone
      })
    }
  )
  if (!response.ok) {
    throw new Error(`Fast2SMS error: ${response.status}`)
  }
}

export async function sendOTP(
  phone: string,
  otp: string
): Promise<void> {
  await sendSMS(
    phone,
    `Your LegalEase OTP is ${otp}. Valid for 10 minutes. Do not share with anyone.`
  )
}

--- src/lib/whatsapp.ts ---
// Meta WhatsApp Cloud API

export async function sendWhatsApp(
  phone: string,
  message: string
): Promise<void> {
  const cleanPhone = phone.startsWith('+')
    ? phone.slice(1)
    : '91' + phone
  await fetch(
    `https://graph.facebook.com/v18.0/${process.env.WHATSAPP_PHONE_ID}/messages`,
    {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${process.env.WHATSAPP_CLOUD_TOKEN}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        messaging_product: 'whatsapp',
        to: cleanPhone,
        type: 'text',
        text: { body: message }
      })
    }
  )
}

export async function notifyBookingConfirmed(
  clientPhone: string,
  lawyerName: string,
  date: string,
  time: string,
  meetLink: string,
  bookingRef: string
): Promise<void> {
  await sendWhatsApp(
    clientPhone,
    `✅ *Booking Confirmed — LegalEase*\n\n` +
    `Lawyer: ${lawyerName}\n` +
    `Date: ${date}\n` +
    `Time: ${time} IST\n` +
    `Mode: Google Meet\n` +
    `Join: ${meetLink}\n` +
    `Booking ID: ${bookingRef}\n\n` +
    `_Reply HELP for support_`
  )
}

export async function notifyCaseUpdate(
  clientPhone: string,
  lawyerName: string,
  stageName: string,
  notes: string,
  caseUrl: string
): Promise<void> {
  await sendWhatsApp(
    clientPhone,
    `📋 *Case Update — LegalEase*\n\n` +
    `Lawyer: ${lawyerName}\n` +
    `Status: ${stageName}\n` +
    `Note: ${notes}\n\n` +
    `Track your case: ${caseUrl}\n` +
    `_Reply STATUS to get full case details_`
  )
}

export async function notifySessionExtension(
  lawyerPhone: string,
  clientName: string,
  extraMinutes: number
): Promise<void> {
  await sendWhatsApp(
    lawyerPhone,
    `⏱️ *Session Extended — LegalEase*\n\n` +
    `Client ${clientName} has extended ` +
    `the session by ${extraMinutes} minutes.\n` +
    `Payment confirmed. Please continue.`
  )
}

--- src/lib/cloudinary.ts ---
import { v2 as cloudinary } from 'cloudinary'

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
})

export async function uploadFile(
  buffer: Buffer,
  fileName: string,
  folder: string = 'legalease'
): Promise<{ url: string; publicId: string }> {
  return new Promise((resolve, reject) => {
    cloudinary.uploader
      .upload_stream(
        {
          folder,
          resource_type: 'auto',
          public_id: fileName,
          overwrite: true
        },
        (error, result) => {
          if (error) reject(error)
          else
            resolve({
              url: result!.secure_url,
              publicId: result!.public_id
            })
        }
      )
      .end(buffer)
  })
}

export async function deleteFile(
  publicId: string
): Promise<void> {
  await cloudinary.uploader.destroy(publicId)
}

--- src/lib/google-vision.ts ---
// Google Cloud Vision API for OCR
// Replaces Tesseract.js

import vision from '@google-cloud/vision'

const client = new vision.ImageAnnotatorClient({
  keyFilename: process.env.GOOGLE_APPLICATION_CREDENTIALS
})

export async function extractTextFromImage(
  imageUrl: string
): Promise<string> {
  const [result] = await client.textDetection(imageUrl)
  const detections = result.textAnnotations
  return detections?.[0]?.description || ''
}

export async function extractTextFromBuffer(
  buffer: Buffer
): Promise<string> {
  const [result] = await client.textDetection({
    image: { content: buffer }
  })
  const detections = result.textAnnotations
  return detections?.[0]?.description || ''
}

--- src/lib/utils/fees.ts ---

export interface FeeBreakdown {
  lawyerFee: number
  platformFee: number
  serviceCharge: number
  gst: number
  total: number
  discount: number
  platformPercent: number
}

export function calculateFees(
  lawyerFee: number,
  lawyerType: 'lawyer' | 'student',
  userPlan: string
): FeeBreakdown {
  let platformPercent: number
  if (lawyerType === 'student')   platformPercent = 15
  else if (lawyerFee < 599)       platformPercent = 12
  else if (lawyerFee <= 1500)     platformPercent = 10
  else                            platformPercent = 8

  let discount = 0
  const discountPlans = ['LEGAL_SHIELD','FAMILY','BUSINESS']
  if (discountPlans.includes(userPlan)) {
    discount = Math.round(lawyerFee * 0.20)
    lawyerFee -= discount
  }

  const platformFee = Math.round(
    lawyerFee * (platformPercent / 100))
  const serviceCharge = 19
  const gst = Math.round(
    (platformFee + serviceCharge) * 0.18)
  const total = lawyerFee + platformFee +
    serviceCharge + gst

  return {
    lawyerFee, platformFee, serviceCharge,
    gst, total, discount, platformPercent
  }
}

--- src/lib/utils/per-minute.ts ---

export function calcPerMinuteFee(
  ratePerMinute: number,
  actualSeconds: number
): number {
  const minutes = Math.ceil(actualSeconds / 60)
  return minutes * ratePerMinute
}

export function calcPreAuth(
  ratePerMinute: number,
  minimumMinutes: number
): number {
  return Math.ceil(ratePerMinute * minimumMinutes * 1.3)
}

export function calcRefund(
  preAuthorized: number,
  actualCharge: number
): number {
  return Math.max(0, preAuthorized - actualCharge)
}

--- src/lib/utils/session-extension.ts ---

export function calcExtensionFee(
  lawyerFeePerHour: number,
  extensionMinutes: number,
  extensionNumber: number
): {
  originalFee: number
  discountPct: number
  discountedFee: number
  saving: number
} {
  const ratePerMinute = lawyerFeePerHour / 60
  const originalFee = Math.round(
    ratePerMinute * extensionMinutes)
  const discountPct = extensionNumber === 1 ? 33 : 20
  const discountedFee = Math.round(
    originalFee * (1 - discountPct / 100))
  return {
    originalFee,
    discountPct,
    discountedFee,
    saving: originalFee - discountedFee
  }
}

--- src/lib/utils/call-summary.ts ---

import { generateJSON } from '@/lib/gemini'

interface SummaryData {
  issueDiscussed: string
  keyFacts: string[]
  adviceGiven: string
  legalSectionsReferenced: string[]
  nextStepsForClient: string[]
  followUpRecommended: boolean
  followUpTimeline: string
}

export async function generateCallSummary(
  issueDescription: string,
  issueCategory: string,
  transcript?: string
): Promise<SummaryData> {
  const prompt = `
  Generate a structured legal consultation summary.
  
  Issue category: ${issueCategory}
  Client issue: ${issueDescription}
  ${transcript ? 'Transcript:\n' + transcript : ''}
  
  Return JSON only:
  {
    "issueDiscussed": "2-3 sentence summary",
    "keyFacts": ["fact1", "fact2", "fact3"],
    "adviceGiven": "detailed paragraph of advice",
    "legalSectionsReferenced": ["IPC 420", "CPC 9"],
    "nextStepsForClient": ["step1", "step2", "step3"],
    "followUpRecommended": true,
    "followUpTimeline": "30 days"
  }`

  return generateJSON<SummaryData>(prompt)
}

--- src/lib/utils/knowledge-base.ts ---

import { generateJSON } from '@/lib/gemini'

export async function findSimilarCases(
  newIssue: string,
  lawyerId: string
) {
  const existingCases = await prisma.caseKnowledge
    .findMany({
      where: { lawyerId },
      take: 50,
      orderBy: { createdAt: 'desc' }
    })

  if (existingCases.length === 0) return []

  const caseSummaries = existingCases.map(c => ({
    id: c.id,
    title: c.caseTitle,
    issue: c.issueDescription.substring(0, 200),
    category: c.caseCategory,
    tags: c.tags
  }))

  const prompt = `
  New legal issue: "${newIssue}"
  
  Past cases (JSON array):
  ${JSON.stringify(caseSummaries)}
  
  Find the top 3 most similar past cases.
  Return JSON only:
  {
    "matches": [
      { "id": "case-id", "similarityScore": 92,
        "reason": "why similar in one sentence" }
    ]
  }`

  const result = await generateJSON<{
    matches: Array<{
      id: string
      similarityScore: number
      reason: string
    }>
  }>(prompt)

  const matchedCases = await Promise.all(
    result.matches.map(async m => {
      const kbCase = await prisma.caseKnowledge
        .findUnique({ where: { id: m.id } })
      return { ...kbCase, ...m }
    })
  )

  return matchedCases.filter(Boolean)
}

--- src/lib/utils/compatibility.ts ---

export function calcCompatibility(
  clientLanguage: string,
  clientCity: string,
  issueCategory: string,
  lawyer: {
    languages: string[]
    city: string
    specializations: string[]
    experienceYears: number
    rating: number
  }
): number {
  let score = 0
  if (lawyer.languages.includes(clientLanguage))
    score += 25
  if (lawyer.city === clientCity)
    score += 20
  if (lawyer.specializations.some(s =>
    s.toLowerCase().includes(issueCategory.toLowerCase())
  )) score += 30
  if (lawyer.experienceYears >= 5)      score += 15
  else if (lawyer.experienceYears >= 2) score += 8
  score += Math.round((lawyer.rating / 5) * 10)
  return Math.min(score, 100)
}

export function getCompatibilityColor(
  score: number
): string {
  if (score >= 80) return '#0D7A55'  // green
  if (score >= 60) return '#D97706'  // yellow
  return '#94A3B8'                   // gray
}

export function getCompatibilityLabel(
  score: number
): string {
  if (score >= 80) return 'Great Match'
  if (score >= 60) return 'Good Match'
  return 'Partial Match'
}

--- src/lib/utils/notifications.ts ---

import { sendWhatsApp } from '@/lib/whatsapp'
import { sendSMS } from '@/lib/fast2sms'
import { sendEmail } from '@/lib/brevo'

export async function notifyBooking(params: {
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
}) {
  await Promise.allSettled([
    sendWhatsApp(
      params.clientPhone,
      `✅ Booking Confirmed!\n` +
      `Lawyer: ${params.lawyerName}\n` +
      `Date: ${params.date} at ${params.time} IST\n` +
      `Join Meet: ${params.meetLink}\n` +
      `ID: ${params.bookingRef}`
    ),
    sendSMS(
      params.clientPhone,
      `LegalEase: Booking confirmed with ` +
      `${params.lawyerName} on ${params.date}. ` +
      `Join: ${params.meetLink}`
    ),
  ])
}

=====================================================
PRISMA SCHEMA (complete)
=====================================================

generator client {
  provider = "prisma-client-js"
}

datasource db {
  provider = "postgresql"
  url      = env("DATABASE_URL")
}

enum Role {
  CLIENT LAWYER STUDENT ADMIN
}
enum ConsultationType {
  VIDEO INPERSON PHONE DOCUMENT EMERGENCY
}
enum BookingStatus {
  PENDING CONFIRMED COMPLETED CANCELLED NO_SHOW
}
enum PaymentStatus {
  PENDING PAID REFUNDED FAILED
}
enum SubscriptionPlan {
  NONE LEGAL_SHIELD FAMILY BUSINESS
}
enum LawyerPlan {
  FREE PRO ELITE FIRM
}
enum PricingModel {
  PER_HOUR PER_MINUTE
}

model User {
  id                 String           @id @default(uuid())
  name               String
  email              String           @unique
  emailVerified      DateTime?
  phone              String?          @unique
  phoneVerified      Boolean          @default(false)
  password           String?
  image              String?
  role               Role             @default(CLIENT)
  city               String?
  state              String?
  language           String           @default("English")
  isActive           Boolean          @default(true)
  lastLoginAt        DateTime?
  subscriptionPlan   SubscriptionPlan @default(NONE)
  subscriptionExpiry DateTime?
  loyaltyPoints      Int              @default(0)
  referralCode       String?          @unique
  fcmToken           String?
  createdAt          DateTime         @default(now())
  updatedAt          DateTime         @updatedAt

  accounts           Account[]
  sessions           Session[]
  lawyerProfile      Lawyer?
  studentProfile     Student?
  clientBookings     Booking[]        @relation("ClientBookings")
  clientCases        Case[]           @relation("ClientCases")
  documents          Document[]
  reviewsGiven       Review[]         @relation("ReviewsGiven")
  forumQuestions     ForumQuestion[]
  forumAnswers       ForumAnswer[]
  subscription       Subscription?
  notifications      Notification[]
  newsArticles       NewsArticle[]
  sentMessages       Message[]        @relation("SentMessages")
}

model Account {
  id                String  @id @default(uuid())
  userId            String
  type              String
  provider          String
  providerAccountId String
  refresh_token     String? @db.Text
  access_token      String? @db.Text
  expires_at        Int?
  token_type        String?
  scope             String?
  id_token          String? @db.Text
  session_state     String?
  user              User    @relation(
    fields: [userId], references: [id],
    onDelete: Cascade)
  @@unique([provider, providerAccountId])
}

model Session {
  id           String   @id @default(uuid())
  sessionToken String   @unique
  userId       String
  expires      DateTime
  user         User     @relation(
    fields: [userId], references: [id],
    onDelete: Cascade)
}

model Lawyer {
  id                    String       @id @default(uuid())
  userId                String       @unique
  barCouncilId          String       @unique
  enrollmentYear        Int
  specializations       String[]
  experienceYears       Int          @default(0)
  court                 String
  bio                   String       @db.Text
  education             String
  feePerHour            Int
  feePerMinute          Int?
  pricingModel          PricingModel @default(PER_HOUR)
  minimumMinutes        Int          @default(15)
  emergencyFee          Int          @default(1999)
  consultationTypes     String[]
  languages             String[]
  isVerified            Boolean      @default(false)
  isOnline              Boolean      @default(false)
  isEmergencyAvailable  Boolean      @default(false)
  extensionAutoApprove  Boolean      @default(false)
  subscriptionPlan      LawyerPlan   @default(FREE)
  rating                Float        @default(0)
  reviewCount           Int          @default(0)
  successRate           Float        @default(0)
  responseTime          Float        @default(0)
  totalEarnings         Int          @default(0)
  totalConsultations    Int          @default(0)
  profileViews          Int          @default(0)
  availableDays         String[]
  availableHours        Json?
  blockedDates          DateTime[]
  latitude              Float?
  longitude             Float?
  address               String?
  referralCode          String       @unique
  googleRefreshToken    String?
  createdAt             DateTime     @default(now())
  updatedAt             DateTime     @updatedAt

  user                  User         @relation(
    fields: [userId], references: [id])
  bookings              Booking[]    @relation("LawyerBookings")
  cases                 Case[]       @relation("LawyerCases")
  reviews               Review[]     @relation("LawyerReviews")
  knowledgeBase         CaseKnowledge[]
  referralsMade         Referral[]   @relation("ReferralsMade")
  referralsReceived     Referral[]   @relation("ReferralsReceived")
  supervisedStudents    Student[]
}

model Student {
  id                  String       @id @default(uuid())
  userId              String       @unique
  university          String
  yearOfStudy         Int
  graduationYear      Int
  studentIdUrl        String?
  specializations     String[]
  feePerHour          Int          @default(149)
  feePerMinute        Int?
  pricingModel        PricingModel @default(PER_HOUR)
  minimumMinutes      Int          @default(15)
  languages           String[]
  supervisingLawyerId String?
  isVerified          Boolean      @default(false)
  rating              Float        @default(0)
  reviewCount         Int          @default(0)
  createdAt           DateTime     @default(now())
  updatedAt           DateTime     @updatedAt

  user                User         @relation(
    fields: [userId], references: [id])
  supervisingLawyer   Lawyer?      @relation(
    fields: [supervisingLawyerId], references: [id])
  bookings            Booking[]    @relation("StudentBookings")
}

model Booking {
  id                    String           @id @default(uuid())
  bookingReference      String           @unique
  clientId              String
  lawyerId              String?
  studentId             String?
  date                  DateTime
  timeSlot              String
  durationMinutes       Int              @default(60)
  actualDurationSeconds Int?
  consultationType      ConsultationType
  pricingModel          PricingModel     @default(PER_HOUR)
  status                BookingStatus    @default(PENDING)
  fee                   Int
  platformFee           Int
  serviceCharge         Int              @default(19)
  gst                   Int
  totalAmount           Int
  discount              Int              @default(0)
  extensionAmount       Int              @default(0)
  extensionCount        Int              @default(0)
  preAuthorizedAmount   Int?
  refundAmount          Int?
  paymentStatus         PaymentStatus    @default(PENDING)
  razorpayOrderId       String?
  razorpayPaymentId     String?
  issueDescription      String           @db.Text
  issueCategory         String?
  documentUrls          String[]
  meetLink              String?
  meetEventId           String?
  recordingConsent      Boolean          @default(false)
  recordingDriveUrl     String?
  transcript            String?          @db.Text
  isEmergency           Boolean          @default(false)
  isEscrowReleased      Boolean          @default(false)
  reminderSent          Boolean          @default(false)
  invoiceUrl            String?
  cancelReason          String?
  createdAt             DateTime         @default(now())
  updatedAt             DateTime         @updatedAt

  client                User             @relation(
    "ClientBookings", fields: [clientId], references: [id])
  lawyer                Lawyer?          @relation(
    "LawyerBookings", fields: [lawyerId], references: [id])
  student               Student?         @relation(
    "StudentBookings", fields: [studentId], references: [id])
  case                  Case?
  review                Review?
  callSummary           CallSummary?
  sessionExtensions     SessionExtension[]
  messages              Message[]
  notifications         Notification[]
}

model SessionExtension {
  id                String   @id @default(uuid())
  bookingId         String
  extensionNumber   Int
  minutes           Int
  originalFee       Int
  discountPercent   Int
  discountedFee     Int
  razorpayOrderId   String?
  razorpayPaymentId String?
  isPaid            Boolean  @default(false)
  lawyerAccepted    Boolean  @default(false)
  requestedAt       DateTime @default(now())
  acceptedAt        DateTime?
  booking           Booking  @relation(
    fields: [bookingId], references: [id])
}

model CallSummary {
  id                      String   @id @default(uuid())
  bookingId               String   @unique
  lawyerId                String?
  clientId                String
  issueDiscussed          String   @db.Text
  keyFacts                String[]
  adviceGiven             String   @db.Text
  legalSectionsReferenced String[]
  nextStepsForClient      String[]
  followUpRecommended     Boolean  @default(false)
  followUpTimeline        String?
  durationMinutes         Int
  aiGenerated             Boolean  @default(false)
  pdfUrl                  String?
  driveUrl                String?
  isSharedWithClient      Boolean  @default(true)
  createdAt               DateTime @default(now())
  booking                 Booking  @relation(
    fields: [bookingId], references: [id])
}

model CaseKnowledge {
  id                  String   @id @default(uuid())
  lawyerId            String
  bookingId           String?  @unique
  caseTitle           String
  caseCategory        String
  issueDescription    String   @db.Text
  keyFacts            String[]
  solutionSummary     String   @db.Text
  legalSectionsUsed   String[]
  actsReferenced      String[]
  outcome             String
  resolutionMonths    Int?
  complexity          String
  courtName           String?
  tags                String[]
  isPrivate           Boolean  @default(true)
  viewCount           Int      @default(0)
  createdAt           DateTime @default(now())
  updatedAt           DateTime @updatedAt
  lawyer              Lawyer   @relation(
    fields: [lawyerId], references: [id])
}

model Case {
  id                 String       @id @default(uuid())
  bookingId          String       @unique
  clientId           String
  lawyerId           String?
  currentStage       Int          @default(0)
  title              String
  description        String       @db.Text
  category           String?
  predictedMinMonths Int?
  predictedMaxMonths Int?
  hearingDate        DateTime?
  courtName          String?
  caseNumber         String?
  isActive           Boolean      @default(true)
  resolvedAt         DateTime?
  createdAt          DateTime     @default(now())
  updatedAt          DateTime     @updatedAt

  booking            Booking      @relation(
    fields: [bookingId], references: [id])
  client             User         @relation(
    "ClientCases", fields: [clientId], references: [id])
  lawyer             Lawyer?      @relation(
    "LawyerCases", fields: [lawyerId], references: [id])
  updates            CaseUpdate[]
  documents          Document[]
}

model CaseUpdate {
  id          String   @id @default(uuid())
  caseId      String
  stage       Int
  stageName   String
  notes       String   @db.Text
  updatedById String
  attachments String[]
  createdAt   DateTime @default(now())
  case        Case     @relation(
    fields: [caseId], references: [id])
}

model Document {
  id                 String   @id @default(uuid())
  caseId             String?
  userId             String
  fileName           String
  fileUrl            String
  cloudinaryPublicId String?
  fileType           String
  fileSize           Int
  ocrText            String?  @db.Text
  isSharedWithLawyer Boolean  @default(false)
  category           String?
  tags               String[]
  uploadedAt         DateTime @default(now())
  case               Case?    @relation(
    fields: [caseId], references: [id])
  user               User     @relation(
    fields: [userId], references: [id])
}

model Review {
  id                String   @id @default(uuid())
  bookingId         String   @unique
  clientId          String
  lawyerId          String?
  rating            Int
  reviewText        String   @db.Text
  proofImageUrl     String?
  isVerifiedBooking Boolean  @default(true)
  lawyerResponse    String?  @db.Text
  helpfulCount      Int      @default(0)
  sentimentScore    Float?
  createdAt         DateTime @default(now())
  booking           Booking  @relation(
    fields: [bookingId], references: [id])
  client            User     @relation(
    "ReviewsGiven", fields: [clientId], references: [id])
  lawyer            Lawyer?  @relation(
    "LawyerReviews", fields: [lawyerId], references: [id])
}

model ForumQuestion {
  id          String        @id @default(uuid())
  userId      String
  title       String
  body        String        @db.Text
  category    String
  state       String?
  tags        String[]
  isAnonymous Boolean       @default(false)
  views       Int           @default(0)
  isResolved  Boolean       @default(false)
  createdAt   DateTime      @default(now())
  updatedAt   DateTime      @updatedAt
  user        User          @relation(
    fields: [userId], references: [id])
  answers     ForumAnswer[]
}

model ForumAnswer {
  id         String        @id @default(uuid())
  questionId String
  lawyerId   String
  body       String        @db.Text
  isPriority Boolean       @default(false)
  isAccepted Boolean       @default(false)
  upvotes    Int           @default(0)
  createdAt  DateTime      @default(now())
  question   ForumQuestion @relation(
    fields: [questionId], references: [id])
  lawyer     User          @relation(
    fields: [lawyerId], references: [id])
}

model Subscription {
  id                 String           @id @default(uuid())
  userId             String           @unique
  plan               SubscriptionPlan
  price              Int
  startDate          DateTime
  expiryDate         DateTime
  consultationsUsed  Int              @default(0)
  consultationsLimit Int
  linkedMembers      String[]
  isActive           Boolean          @default(true)
  autoRenew          Boolean          @default(true)
  createdAt          DateTime         @default(now())
  user               User             @relation(
    fields: [userId], references: [id])
}

model Template {
  id             String   @id @default(uuid())
  title          String
  category       String
  state          String
  language       String   @default("English")
  description    String   @db.Text
  fileUrl        String
  cloudinaryId   String?
  isPremium      Boolean  @default(false)
  price          Int      @default(0)
  downloadCount  Int      @default(0)
  createdAt      DateTime @default(now())
}

model NewsArticle {
  id          String   @id @default(uuid())
  slug        String   @unique
  title       String
  body        String   @db.Text
  summary     String
  category    String
  tags        String[]
  authorId    String
  thumbnail   String?
  readTime    Int      @default(5)
  isPublished Boolean  @default(false)
  views       Int      @default(0)
  publishedAt DateTime?
  createdAt   DateTime @default(now())
  updatedAt   DateTime @updatedAt
  author      User     @relation(
    fields: [authorId], references: [id])
}

model Referral {
  id               String   @id @default(uuid())
  referrerId       String
  referredLawyerId String
  clientId         String?
  bookingId        String?
  commissionAmount Int      @default(0)
  isPaid           Boolean  @default(false)
  status           String   @default("PENDING")
  createdAt        DateTime @default(now())
  referrer         Lawyer   @relation(
    "ReferralsMade", fields: [referrerId],
    references: [id])
  referredLawyer   Lawyer   @relation(
    "ReferralsReceived", fields: [referredLawyerId],
    references: [id])
}

model Notification {
  id        String   @id @default(uuid())
  userId    String
  title     String
  body      String
  type      String
  bookingId String?
  isRead    Boolean  @default(false)
  actionUrl String?
  createdAt DateTime @default(now())
  user      User     @relation(
    fields: [userId], references: [id])
  booking   Booking? @relation(
    fields: [bookingId], references: [id])
}

model Message {
  id        String   @id @default(uuid())
  bookingId String
  senderId  String
  body      String   @db.Text
  isRead    Boolean  @default(false)
  fileUrl   String?
  createdAt DateTime @default(now())
  booking   Booking  @relation(
    fields: [bookingId], references: [id])
  sender    User     @relation(
    "SentMessages", fields: [senderId],
    references: [id])
}

model Waitlist {
  id        String   @id @default(uuid())
  email     String   @unique
  name      String?
  role      String?
  city      String?
  phone     String?
  createdAt DateTime @default(now())
}

=====================================================
CASE STAGES
=====================================================

export const CASE_STAGES = [
  { id:0, icon:'📅', label:'Consultation Booked',
    desc:'Appointment confirmed, lawyer notified' },
  { id:1, icon:'📎', label:'Documents Submitted',
    desc:'Client uploaded relevant documents' },
  { id:2, icon:'🔍', label:'Under Review',
    desc:'Lawyer reviewing the case details' },
  { id:3, icon:'📬', label:'Legal Notice Sent',
    desc:'Notice sent to opposite party' },
  { id:4, icon:'⚖️', label:'Court Filing Done',
    desc:'Case filed, hearing date assigned' },
  { id:5, icon:'🗓️', label:'Next Hearing',
    desc:'Upcoming court date scheduled' },
  { id:6, icon:'✅', label:'Case Resolved',
    desc:'Matter settled or judgment received' }
]

=====================================================
SEED DATA
=====================================================

Run: npx prisma db seed
Order: Admin → Lawyers → Students → Client
       → Bookings → Cases → KB → Forum
       → Templates → News → Reviews → Notifs

ADMIN:
  email: admin@legalease.in
  password: Admin@123
  role: ADMIN

LAWYERS (5, Hyderabad, isVerified:true):

1. Adv. Priya Sharma
   email: priya@legalease.in / Lawyer@123
   barCouncilId: BAR/TS/2012/001
   spec: [Civil Law, Property Law, RERA,
          Land Acquisition, Tenant Rights]
   court: Telangana High Court
   fee/hr: 599 | fee/min: 12
   pricingModel: PER_HOUR
   exp: 12 | rating: 4.9 | reviews: 312
   langs: [Telugu, Hindi, English]
   emergency: true | plan: PRO | success: 87
   extensionAutoApprove: true
   bio: Senior advocate specialising in
   property disputes. 500+ cases at
   Telangana High Court since 2012.
   education: NALSAR University of Law, 2012

2. Adv. Anjali Kapoor
   email: anjali@legalease.in / Lawyer@123
   barCouncilId: BAR/TS/2016/042
   spec: [Family Law, Divorce, Child Custody,
          Domestic Violence, Alimony]
   court: Hyderabad Family Court
   fee/hr: 799 | fee/min: 15
   pricingModel: PER_HOUR
   exp: 8 | rating: 4.8 | reviews: 245
   langs: [Telugu, Hindi, English, Urdu]
   emergency: false | plan: ELITE | success: 91
   extensionAutoApprove: false

3. Adv. Suresh Reddy
   email: suresh@legalease.in / Lawyer@123
   barCouncilId: BAR/TS/2018/089
   spec: [Labour Law, Employment, PF, ESIC]
   court: Hyderabad Labour Court
   fee/hr: 499 | fee/min: 10
   pricingModel: PER_MINUTE (primary)
   minimumMinutes: 15
   exp: 6 | rating: 4.7 | reviews: 189
   langs: [Telugu, English]
   emergency: true | plan: PRO | success: 83
   extensionAutoApprove: true

4. Adv. Fatima Khan
   email: fatima@legalease.in / Lawyer@123
   spec: [Consumer Law, RERA, Builder Disputes]
   fee/hr: 449 | fee/min: 9
   pricingModel: PER_HOUR
   exp: 5 | rating: 4.5 | reviews: 134
   langs: [Urdu, Hindi, English, Telugu]
   emergency: false | plan: FREE | success: 79

5. Adv. Kiran Kumar
   email: kiran@legalease.in / Lawyer@123
   spec: [Criminal Law, Bail, FIR, Sessions]
   fee/hr: 699 | fee/min: 13
   pricingModel: PER_HOUR
   exp: 10 | rating: 4.6 | reviews: 201
   langs: [Telugu, Hindi, English]
   emergency: true | plan: PRO | success: 85
   extensionAutoApprove: true

STUDENTS (2):
1. Rohan Mehta | rohan@legalease.in | Student@123
   NALSAR University | Year 5
   fee/hr: 199 | fee/min: 4
   spec: [Consumer, RTI, Labour]
   isVerified: true

2. Vikram Singh | vikram@legalease.in | Student@123
   Symbiosis Law | Year 4
   fee/hr: 149 | fee/min: 3
   spec: [Criminal, FIR, Police]
   isVerified: true

CLIENT:
  Rahul Kumar | rahul@test.com | Test@123
  Hyderabad | Telangana | Telugu

BOOKINGS (3 for Rahul):

Booking 1: Rahul → Priya
  ref: LX-2025-847291
  date: 3 days from now | 11:00 AM
  type: VIDEO | pricingModel: PER_HOUR
  status: CONFIRMED | paymentStatus: PAID
  fee: 599 | total: 741
  meetLink: (create via Google Meet API)
  issue: Property boundary dispute.
  Neighbour built wall on my land in Kompally.
  extensionCount: 1
  extensionAmount: 199
  Add SessionExtension:
    minutes: 30 | extensionNumber: 1
    originalFee: 299 | discountPct: 33
    discountedFee: 199 | isPaid: true

Booking 2: Rahul → Anjali
  ref: LX-2025-623847
  date: 7 days from now | 3:00 PM
  type: INPERSON | status: CONFIRMED
  fee: 799 | total: 958 | PAID
  issue: Divorce filing and child custody.

Booking 3: Rahul → Vikram
  ref: LX-2025-512034
  date: 10 days ago | 5:00 PM
  type: PHONE | status: COMPLETED
  pricingModel: PER_MINUTE
  actualDurationSeconds: 2843
  fee: 149 (pre-auth) | charged: 142
  refundAmount: 7 | isEscrowReleased: true
  Add CallSummary:
    issueDiscussed: RTI for road construction
    status in Kompally, Hyderabad
    keyFacts: [Resident 5 years, Road dug
    Jan 2025, No completion date given]
    adviceGiven: File RTI with GHMC PWD dept.
    Request road work timeline and contractor.
    legalSections: [RTI Act 2005 S.6,
    GHMC Act 1955 S.98]
    nextSteps: [Draft RTI, Submit to GHMC PIO,
    Wait 30 days, File first appeal if needed]
    followUpRecommended: true
    followUpTimeline: 35 days

CASES (2 active):
Case 1 for Booking 1:
  title: Property Boundary Dispute
  currentStage: 2
  predictedMin: 4 | predictedMax: 8
  Updates:
  - Stage 0: Consultation booked. Upload
    sale deed and survey map.
  - Stage 1: Documents received. Sale deed
    confirms your boundary clearly.
  - Stage 2: Reviewing map vs actual boundary.
    Sending legal notice next week.

Case 2 for Booking 2:
  title: Divorce Consultation
  currentStage: 0

KNOWLEDGE BASE (2 for Priya):
1. title: Property Boundary Dispute
   category: Property Law
   issue: Neighbour built wall on client land
   solution: Legal notice under TPA 1882 S.5.
   Revenue Dept survey requested.
   Wall removed after notice served.
   legalSections: [TPA 1882 S.5, CrPC S.145]
   outcome: Resolved — wall removed
   months: 2 | complexity: medium
   tags: [boundary, neighbour, notice, HMDA]

2. title: RERA Complaint vs Builder
   category: Consumer Law
   issue: Builder delayed flat 18 months
   solution: RERA complaint filed. Interest
   at 10.95% pa claimed. Rs.50K compensation
   for harassment also claimed.
   legalSections: [RERA 2016 S.18,
   Consumer Protection 2019 S.35]
   outcome: Rs.1.8L compensation awarded
   months: 4 | complexity: high
   tags: [RERA, builder, delay, compensation]

FORUM (3 questions with answers)
TEMPLATES (4 — 3 free, 1 premium)
NEWS (3 articles, published)
REVIEWS (2 for Priya, verified)
NOTIFICATIONS (3 for Rahul, unread)

=====================================================
ENVIRONMENT VARIABLES (.env.local)
=====================================================

# App
NEXT_PUBLIC_APP_URL=http://localhost:3000
NEXT_PUBLIC_APP_NAME=LegalEase
NODE_ENV=development

# Database (Neon)
DATABASE_URL=postgresql://user:pass@host/legalease

# NextAuth
NEXTAUTH_SECRET=legalease_secret_2025
NEXTAUTH_URL=http://localhost:3000

# Google OAuth (used for auth + Meet + Drive)
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
GOOGLE_REFRESH_TOKEN=your_refresh_token

# Google APIs
GEMINI_API_KEY=your_gemini_api_key
NEXT_PUBLIC_GOOGLE_MAPS_KEY=your_maps_key
GOOGLE_APPLICATION_CREDENTIALS=./service-account.json

# Razorpay
RAZORPAY_KEY_ID=rzp_test_YOUR_KEY
RAZORPAY_KEY_SECRET=YOUR_SECRET
NEXT_PUBLIC_RAZORPAY_KEY_ID=rzp_test_YOUR_KEY

# Brevo (email — free 300/day)
BREVO_API_KEY=your_brevo_api_key

# Fast2SMS (Indian SMS — Rs.0.10/SMS)
FAST2SMS_KEY=your_fast2sms_key

# Meta WhatsApp Cloud API
WHATSAPP_CLOUD_TOKEN=your_meta_token
WHATSAPP_PHONE_ID=your_phone_number_id
WHATSAPP_VERIFY_TOKEN=legalease_verify_2025

# Cloudinary (file storage — 25GB free)
CLOUDINARY_CLOUD_NAME=your_cloud_name
CLOUDINARY_API_KEY=your_api_key
CLOUDINARY_API_SECRET=your_api_secret

# Redis (Upstash — free tier)
UPSTASH_REDIS_REST_URL=your_upstash_url
UPSTASH_REDIS_REST_TOKEN=your_upstash_token

# Google Analytics 4
NEXT_PUBLIC_GA_MEASUREMENT_ID=G-XXXXXXXXXX

# Sentry
SENTRY_DSN=your_sentry_dsn
NEXT_PUBLIC_SENTRY_DSN=your_sentry_dsn

# PWA Push Notifications (VAPID)
NEXT_PUBLIC_VAPID_KEY=your_vapid_public_key
VAPID_PRIVATE_KEY=your_vapid_private_key
</USER_REQUEST>
<ADDITIONAL_METADATA>
The current local time is: 2026-10-05T19:51:09+05:30.
</ADDITIONAL_METADATA>