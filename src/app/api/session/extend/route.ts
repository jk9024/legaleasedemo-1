import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'
import Razorpay from 'razorpay'
import { calcExtensionFee } from '@/lib/utils/pricing'

/**
 * Validation schema for requesting a session extension
 */
const schema = z.object({
  bookingId: z.string().uuid(),
  extensionMinutes: z.union([
    z.literal(15),
    z.literal(20),
    z.literal(30),
    z.literal(45),
    z.literal(60),
    z.enum(['15', '20', '30', '45', '60']).transform(Number)
  ])
})

/**
 * POST /api/session/extend
 * Creates a pending extension record and Razorpay order for an active consultation session.
 * CRITICAL RULE: Extension is ONLY permitted when sessionActive === true.
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

    const { bookingId, extensionMinutes } = parseResult.data

    // Fetch booking details with extensions
    const booking = await prisma.booking.findUnique({
      where: { id: bookingId },
      include: {
        lawyer: true,
        student: true,
        sessionExtensions: {
          orderBy: { createdAt: 'desc' }
        }
      }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // ── CRITICAL CHECK ──────────────────────────
    // Extension ONLY allowed when call is active
    if (!booking.sessionActive) {
      return NextResponse.json(
        {
          success: false,
          error: 'Extension only available during live call',
          code: 'SESSION_NOT_ACTIVE'
        },
        { status: 400 }
      )
    }

    // Verify client owns this booking
    if (booking.clientId !== session.user.id) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    // Emergency bookings cannot be extended
    if (booking.isEmergency) {
      return NextResponse.json(
        {
          success: false,
          error: 'Emergency bookings cannot be extended',
          code: 'EMERGENCY_NO_EXTENSION'
        },
        { status: 400 }
      )
    }

    // Get extension number (1st, 2nd, 3rd)
    const extensionNumber = booking.sessionExtensions.length + 1

    // Get lawyer rate per minute
    const ratePerMinute = booking.lawyer?.ratePerMinute
      || booking.student?.feePerMinute
      || 10

    // Calculate fee breakdown
    const feeCalc = calcExtensionFee(
      ratePerMinute,
      extensionMinutes,
      extensionNumber
    )

    let orderId = `ext_${bookingId.substring(0, 8)}_${extensionNumber}_${Date.now()}`

    // Create Razorpay order if keys configured
    const keyId = process.env.RAZORPAY_KEY_ID || process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID
    const keySecret = process.env.RAZORPAY_KEY_SECRET

    if (keyId && keySecret && !keyId.includes('YOUR_KEY') && !keySecret.includes('YOUR_SECRET')) {
      try {
        const razorpay = new Razorpay({
          key_id: keyId,
          key_secret: keySecret
        })

        const order = await razorpay.orders.create({
          amount: Math.round(feeCalc.discountedFee * 100), // in paise
          currency: 'INR',
          receipt: `ext_${bookingId.slice(0, 8)}_${extensionNumber}`.slice(0, 40),
          notes: {
            bookingId,
            extensionNumber: extensionNumber.toString(),
            extensionMinutes: extensionMinutes.toString(),
            originalFee: feeCalc.originalFee.toString(),
            discountPercent: feeCalc.discountPercent.toString()
          }
        })
        orderId = order.id
      } catch (razorErr) {
        console.warn('[Razorpay] Extension order creation fallback:', razorErr)
      }
    }

    // Create pending extension record
    await prisma.sessionExtension.create({
      data: {
        bookingId,
        extensionNumber,
        requestedMinutes: extensionMinutes,
        originalFee: feeCalc.originalFee,
        discountPercent: feeCalc.discountPercent,
        discountedFee: feeCalc.discountedFee,
        platformCut: feeCalc.platformCut,
        lawyerEarns: feeCalc.lawyerEarns,
        saving: feeCalc.saving,
        razorpayOrderId: orderId,
        promptShownAt: new Date(),
        promptExpiredAt: new Date(Date.now() + 2 * 60 * 1000)
      }
    })

    return NextResponse.json({
      success: true,
      data: {
        orderId,
        keyId: (keyId || '').trim(),
        extensionNumber,
        extensionMinutes,
        originalFee: feeCalc.originalFee,
        discountPercent: feeCalc.discountPercent,
        discountedFee: feeCalc.discountedFee,
        saving: feeCalc.saving,
        message: extensionNumber >= 3
          ? 'No discount on 3rd+ extensions'
          : `${feeCalc.discountPercent}% discount applied`
      }
    })

  } catch (error) {
    console.error('Extension error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
