import { NextRequest, NextResponse } from 'next/server'
import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { z } from 'zod'

const schema = z.object({
  bookingId: z.string().uuid()
})

/**
 * POST /api/session/activate
 * Called when participants connect to Google Meet room.
 * Marks sessionActive = true and sets sessionStartedAt = new Date(),
 * enabling session extensions.
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

    const { bookingId } = parseResult.data

    const booking = await prisma.booking.findUnique({
      where: { id: bookingId }
    })

    if (!booking) {
      return NextResponse.json(
        { success: false, error: 'Booking not found' },
        { status: 404 }
      )
    }

    // Only client, lawyer, or student participant of this booking can activate
    const isParticipant =
      booking.clientId === session.user.id ||
      booking.lawyerId === session.user.id ||
      booking.lawyerId === session.user.lawyerProfileId ||
      booking.studentId === session.user.id ||
      booking.studentId === session.user.studentProfileId

    if (!isParticipant) {
      return NextResponse.json(
        { success: false, error: 'Forbidden' },
        { status: 403 }
      )
    }

    await prisma.booking.update({
      where: { id: bookingId },
      data: {
        sessionActive: true,
        sessionStartedAt: booking.sessionStartedAt || new Date(),
        status: 'CONFIRMED'
      }
    })

    return NextResponse.json({
      success: true,
      message: 'Session activated — extensions now available'
    })
  } catch (error) {
    console.error('Session activate error:', error)
    return NextResponse.json(
      { success: false, error: 'Server error' },
      { status: 500 }
    )
  }
}
