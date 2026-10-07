import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/redis'
import { verifyPayment } from '@/lib/razorpay'
import { createMeetRoom } from '@/lib/google-meet'
import { notifyBooking } from '@/lib/utils/notifications'
import { ApiResponse } from '@/types/api'

const verifyPaymentSchema = z.object({
  bookingId: z.string().min(1),
  bookingRef: z.string().optional(),
  razorpayOrderId: z.string().min(1),
  razorpayPaymentId: z.string().min(1),
  razorpaySignature: z.string().min(1),
  clientName: z.string().optional().default('Client'),
  clientPhone: z.string().optional().default('+919876543210'),
  clientEmail: z.string().optional().default('client@test.com'),
  lawyerName: z.string().optional().default('Adv. Priya Sharma'),
  lawyerPhone: z.string().optional().default('+919876543201'),
  lawyerEmail: z.string().optional().default('priya@legalease.in'),
  scheduledAt: z.string().optional(),
  totalFee: z.number().optional().default(599),
})

/**
 * POST /api/bookings/verify-payment
 * Verifies Razorpay HMAC signature, locks escrow, creates Google Meet room, and dispatches alerts.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limitRes = await rateLimit(`verify-payment:${ip}`, 30, 60)
    if (!limitRes.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Too many verification attempts.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parseResult = verifyPaymentSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: parseResult.error.issues[0]?.message || 'Invalid payment verification payload' },
        { status: 400 }
      )
    }

    const {
      bookingId,
      bookingRef: passedRef,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      clientName,
      clientPhone,
      clientEmail,
      lawyerName,
      lawyerPhone,
      lawyerEmail,
      scheduledAt,
      totalFee,
    } = parseResult.data

    // 1. Verify Razorpay cryptographic signature
    const isAuthentic = verifyPayment(razorpayOrderId, razorpayPaymentId, razorpaySignature)
    if (!isAuthentic) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Payment signature verification failed. Untrusted transaction.' },
        { status: 400 }
      )
    }

    const bookingRef = passedRef || `LX-${new Date().getFullYear()}-${Math.floor(100000 + Math.random() * 900000)}`

    // 2. Generate Google Meet encrypted consultation room
    const startTime = scheduledAt ? new Date(scheduledAt) : new Date(Date.now() + 3600000)
    const meetResult = await createMeetRoom(
      bookingRef,
      lawyerEmail,
      clientEmail,
      startTime,
      30
    )

    const meetLink = meetResult.meetLink

    // 3. Update DB if active booking
    if (bookingId && !bookingId.startsWith('book-')) {
      try {
        await prisma.booking.update({
          where: { id: bookingId },
          data: {
            status: 'CONFIRMED',
            paymentStatus: 'PAID',
            razorpayPaymentId,
            razorpayOrderId,
            meetLink,
            meetEventId: meetResult.eventId,
            isEscrowReleased: false,
          },
        })
      } catch (dbErr) {
        console.warn('[Verify Payment] DB status update failed, continuing:', dbErr)
      }
    }

    // 4. Dispatch Multi-Channel Notifications (WhatsApp + SMS + Email)
    const dateFormatted = startTime.toLocaleDateString('en-IN', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    })
    const timeFormatted = startTime.toLocaleTimeString('en-IN', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    })

    try {
      await notifyBooking({
        clientPhone,
        clientEmail,
        lawyerPhone,
        lawyerEmail,
        lawyerName,
        clientName,
        date: dateFormatted,
        time: timeFormatted,
        meetLink,
        bookingRef,
        fee: totalFee,
      })
    } catch (notifErr) {
      console.warn('[Verify Payment] Notification dispatch non-fatal error:', notifErr)
    }

    return NextResponse.json({
      success: true,
      data: {
        bookingId,
        bookingRef,
        status: 'CONFIRMED',
        paymentStatus: 'PAID',
        meetLink,
        isEscrowReleased: false,
        escrowHoldHours: 48,
        disputeWindowClosesAt: new Date(Date.now() + 48 * 3600000).toISOString(),
      },
    })
  } catch (error) {
    console.error('[Verify Payment API POST] Unhandled error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal server error while completing payment verification.' },
      { status: 500 }
    )
  }
}
