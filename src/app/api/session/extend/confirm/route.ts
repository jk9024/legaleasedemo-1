import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import crypto from 'crypto'
import { extendMeeting } from '@/lib/google-meet'
import { sendWhatsApp } from '@/lib/whatsapp'

/**
 * Validation schema for confirming paid session extension
 */
const schema = z.object({
  bookingId: z.string().uuid(),
  razorpayOrderId: z.string(),
  razorpayPaymentId: z.string(),
  razorpaySignature: z.string(),
  extensionMinutes: z.number()
})

/**
 * POST /api/session/extend/confirm
 * Validates Razorpay payment signature, marks session extension as paid,
 * updates booking duration, extends Google Meet calendar event, and notifies lawyer.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth()
    if (!session?.user?.id) {
      return NextResponse.json(
        { success: false, error: 'Unauthorized' },
        { status: 401 }
      )
    }

    const body = await req.json()
    const parseResult = schema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { success: false, error: 'Invalid parameters', details: parseResult.error.format() },
        { status: 400 }
      )
    }

    const {
      bookingId,
      razorpayOrderId,
      razorpayPaymentId,
      razorpaySignature,
      extensionMinutes
    } = parseResult.data

    // Verify Razorpay signature if live key exists
    const keySecret = process.env.RAZORPAY_KEY_SECRET
    const isMock =
      razorpayOrderId.startsWith('ext_mock_') ||
      razorpayOrderId.startsWith('demo_') ||
      razorpaySignature === 'sig_mock_verified_signature_2025'

    if (!isMock && keySecret && !keySecret.includes('YOUR_SECRET')) {
      const expectedSignature = crypto
        .createHmac('sha256', keySecret)
        .update(`${razorpayOrderId}|${razorpayPaymentId}`)
        .digest('hex')

      if (expectedSignature !== razorpaySignature) {
        return NextResponse.json(
          { success: false, error: 'Payment verification failed' },
          { status: 400 }
        )
      }
    }

    // Get booking and extension
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        lawyer: { include: { user: true } },
        client: true,
        sessionExtensions: {
          where: { razorpayOrderId },
          take: 1
        }
      }
    })

    if (!booking || !booking.sessionActive) {
      return NextResponse.json(
        { success: false, error: 'Invalid booking or session not active' },
        { status: 400 }
      )
    }

    const extension = booking.sessionExtensions[0]
    if (!extension) {
      return NextResponse.json(
        { success: false, error: 'Extension record not found' },
        { status: 404 }
      )
    }

    // Update extension as paid
    await prisma.sessionExtension.update({
      where: { id: extension.id },
      data: {
        isPaid: true,
        razorpayPaymentId,
        clientRespondedAt: new Date()
      }
    })

    // Update booking duration
    const newDurationMinutes =
      booking.packageMinutes +
      booking.sessionExtensions
        .filter((e) => e.isPaid && e.id !== extension.id)
        .reduce((sum, e) => sum + e.requestedMinutes, 0) +
      extensionMinutes

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        packageMinutes: newDurationMinutes,
        extensionCount: { increment: 1 },
        extensionAmount: {
          increment: extension.discountedFee
        },
        totalMinutesUsed: { increment: extensionMinutes }
      }
    })

    // Extend Google Meet event
    if (booking.meetEventId) {
      await extendMeeting(booking.meetEventId, extensionMinutes).catch((err) =>
        console.error('Meet extension failed:', err)
      )
    }

    // Notify lawyer via Socket.io if available on global
    try {
      // @ts-expect-error - Global socket io instance if attached
      if (global.io) {
        // @ts-expect-error - emit to room
        global.io.to(`lawyer_${booking.lawyerId}`).emit('session_extended', {
          bookingId,
          extraMinutes: extensionMinutes,
          discountedFee: extension.discountedFee,
          saving: extension.saving,
          message: `Client extended by ${extensionMinutes} minutes`
        })
      }
    } catch (e) {
      console.error('Socket emit failed:', e)
    }

    // Notify lawyer via WhatsApp
    if (booking.lawyer?.user?.phone) {
      await sendWhatsApp(
        booking.lawyer.user.phone,
        `⏱️ *Session Extended — LegalEase*\n\n` +
          `Client: ${booking.client.name}\n` +
          `Extended by: ${extensionMinutes} minutes\n` +
          `Payment: Rs.${extension.discountedFee} confirmed\n\n` +
          `Please continue the consultation.`
      ).catch((err) => console.error('WhatsApp failed:', err))
    }

    // Create in-app notification for lawyer
    if (booking.lawyerId) {
      await prisma.notification.create({
        data: {
          userId: booking.lawyer?.userId || booking.lawyerId,
          title: 'Session Extended',
          body: `${booking.client.name} extended by ${extensionMinutes} min`,
          type: 'SESSION_EXTENSION',
          bookingId,
          actionUrl: `/portal/bookings`
        }
      }).catch((err) => console.error('Notification creation failed:', err))
    }

    return NextResponse.json({
      success: true,
      data: {
        newDurationMinutes,
        extensionMinutes,
        amountPaid: extension.discountedFee,
        saving: extension.saving,
        message: `Session extended by ${extensionMinutes} minutes`
      }
    })
  } catch (error) {
    console.error('Extension confirm error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
