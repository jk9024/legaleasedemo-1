import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/redis'
import { createOrder } from '@/lib/razorpay'
import { ApiResponse } from '@/types/api'

const createOrderSchema = z.object({
  bookingId: z.string().optional(),
  bookingRef: z.string().min(3),
  amount: z.number().positive(),
})

/**
 * POST /api/bookings/create-order
 * Generates a Razorpay Order ID for escrow payment processing.
 */
export async function POST(req: NextRequest) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limitRes = await rateLimit(`create-order:${ip}`, 40, 60)
    if (!limitRes.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Too many payment requests. Please try again shortly.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const parseResult = createOrderSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: parseResult.error.issues[0]?.message || 'Invalid order parameters' },
        { status: 400 }
      )
    }

    const { bookingId, bookingRef, amount } = parseResult.data

    // 1. Create order in Razorpay (or mock in test/dev)
    const orderResult = await createOrder(amount, bookingRef, {
      bookingId: bookingId || '',
      type: 'CONSULTATION_ESCROW',
    })

    if (!orderResult) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Failed to create payment order with gateway.' },
        { status: 500 }
      )
    }

    // 2. Persist order ID to booking in DB if bookingId exists
    if (bookingId && !bookingId.startsWith('book-')) {
      try {
        await prisma.booking.update({
          where: { id: bookingId },
          data: { razorpayOrderId: orderResult.orderId },
        })
      } catch (dbErr) {
        console.warn('[Create Order] DB update skipped:', dbErr)
      }
    }

    return NextResponse.json({
      success: true,
      data: {
        orderId: orderResult.orderId,
        amount: orderResult.amount,
        currency: orderResult.currency,
        keyId: orderResult.keyId,
        bookingId: bookingId || `book-${Date.now()}`,
        bookingRef,
      },
    })
  } catch (error) {
    console.error('[Create Order API POST] Unhandled error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal server error while initializing payment order.' },
      { status: 500 }
    )
  }
}
