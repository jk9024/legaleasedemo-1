import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/redis'
import { generateCallSummary, SummaryData } from '@/lib/utils/call-summary'
import { ApiResponse } from '@/types/api'

interface RouteParams {
  params: {
    bookingId: string
  }
}

const summaryRequestSchema = z.object({
  issueDescription: z.string().optional().default('Property boundary dispute and title verification'),
  issueCategory: z.string().optional().default('Property Law'),
  transcript: z.string().optional(),
})

/**
 * POST /api/consultations/[bookingId]/summary
 * Generates an AI structured legal summary for a concluded consultation via Gemini 1.5 Flash.
 */
export async function POST(req: NextRequest, { params }: RouteParams) {
  try {
    const { bookingId } = params
    if (!bookingId) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Booking ID is required' },
        { status: 400 }
      )
    }

    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limitRes = await rateLimit(`call-summary:${ip}`, 20, 60)
    if (!limitRes.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Summary generation rate limit reached.' },
        { status: 429 }
      )
    }

    const body = await req.json().catch(() => ({}))
    const parseResult = summaryRequestSchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: parseResult.error.issues[0]?.message || 'Invalid summary request data' },
        { status: 400 }
      )
    }

    const { issueDescription, issueCategory, transcript } = parseResult.data

    // 1. Generate structured legal consultation summary using Gemini 1.5 Flash
    const summary: SummaryData = await generateCallSummary(
      issueDescription,
      issueCategory,
      transcript
    )

    // 2. Persist to DB if valid booking exists
    try {
      const booking = await prisma.booking.findFirst({
        where: { OR: [{ id: bookingId }, { bookingReference: bookingId }] },
      })

      if (booking) {
        await prisma.callSummary.upsert({
          where: { bookingId: booking.id },
          create: {
            bookingId: booking.id,
            clientId: booking.clientId,
            lawyerId: booking.lawyerId,
            issueDiscussed: summary.issueDiscussed,
            keyFacts: summary.keyFacts,
            adviceGiven: summary.adviceGiven,
            legalSectionsReferenced: summary.legalSectionsReferenced,
            nextStepsForClient: summary.nextStepsForClient,
            durationMinutes: booking.durationMinutes,
            aiGenerated: true,
          },
          update: {
            issueDiscussed: summary.issueDiscussed,
            keyFacts: summary.keyFacts,
            adviceGiven: summary.adviceGiven,
            legalSectionsReferenced: summary.legalSectionsReferenced,
            nextStepsForClient: summary.nextStepsForClient,
          },
        })
      }
    } catch (dbErr) {
      console.warn('[CallSummary] DB persistence non-fatal warning:', dbErr)
    }

    return NextResponse.json({
      success: true,
      data: summary,
    })
  } catch (error) {
    console.error('[Call Summary API POST] Unhandled error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal server error while synthesizing consultation summary.' },
      { status: 500 }
    )
  }
}
