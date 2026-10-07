import { NextRequest, NextResponse } from 'next/server'
import { z } from 'zod'
import { prisma } from '@/lib/prisma'
import { rateLimit } from '@/lib/redis'
import { ApiResponse } from '@/types/api'

interface RouteParams {
  params: {
    id: string
  }
}

const availabilityQuerySchema = z.object({
  date: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, 'Date must be formatted as YYYY-MM-DD')
    .optional(),
  type: z.enum(['VIDEO', 'PHONE', 'INPERSON', 'EMERGENCY']).optional().default('VIDEO'),
})

export interface ConsultationSlot {
  slotId: string
  time: string
  startTime: string
  endTime: string
  available: boolean
  isPeakHour?: boolean
}

export interface DayAvailability {
  date: string
  dayOfWeek: string
  isWorkingDay: boolean
  slots: {
    morning: ConsultationSlot[]
    afternoon: ConsultationSlot[]
    evening: ConsultationSlot[]
  }
}

/**
 * Standard working time slots for legal consultations.
 */
const DEFAULT_MORNING_TIMES = ['10:00 AM', '10:45 AM', '11:30 AM', '12:15 PM']
const DEFAULT_AFTERNOON_TIMES = ['02:00 PM', '02:45 PM', '03:30 PM', '04:15 PM']
const DEFAULT_EVENING_TIMES = ['05:00 PM', '05:45 PM', '06:30 PM', '07:15 PM']

const DAYS_OF_WEEK = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']

/**
 * GET /api/lawyers/[id]/availability
 * Returns available consultation time slots for a given advocate and date.
 */
export async function GET(req: NextRequest, { params }: RouteParams) {
  try {
    const { id } = params
    if (!id) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Lawyer ID is required' },
        { status: 400 }
      )
    }

    // Rate limiting
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limitRes = await rateLimit(`lawyer-avail:${ip}`, 120, 60)
    if (!limitRes.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: 'Too many requests. Please slow down.' },
        { status: 429 }
      )
    }

    const url = new URL(req.url)
    const parseResult = availabilityQuerySchema.safeParse({
      date: url.searchParams.get('date') || undefined,
      type: url.searchParams.get('type') || undefined,
    })

    if (!parseResult.success) {
      return NextResponse.json<ApiResponse>(
        { success: false, error: parseResult.error.issues[0]?.message || 'Invalid parameters' },
        { status: 400 }
      )
    }

    const targetDateStr = parseResult.data.date || new Date().toISOString().split('T')[0]
    const targetDate = new Date(targetDateStr)
    const dayOfWeek = DAYS_OF_WEEK[targetDate.getDay()]

    // Check lawyer's available days
    let availableDays = ['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT']
    let isEmergencyAvailable = true

    try {
      const lawyer = await prisma.lawyer.findFirst({
        where: { OR: [{ id }, { barCouncilId: id }] },
        select: { availableDays: true, isEmergencyAvailable: true },
      })
      if (lawyer?.availableDays && lawyer.availableDays.length > 0) {
        availableDays = lawyer.availableDays
        isEmergencyAvailable = lawyer.isEmergencyAvailable
      }
    } catch {
      // Fallback
    }

    const isWorkingDay = availableDays.includes(dayOfWeek)

    const createSlots = (times: string[], period: string): ConsultationSlot[] => {
      return times.map((t, idx) => {
        // Deterministic pseudo-booked pattern for realistic UI demo
        const isBooked = isWorkingDay && ((targetDate.getDate() + idx) % 5 === 0)
        return {
          slotId: `${targetDateStr}-${period}-${idx}`,
          time: t,
          startTime: `${targetDateStr}T${t}`,
          endTime: `${targetDateStr}T${t}`,
          available: isWorkingDay && !isBooked,
          isPeakHour: period === 'evening',
        }
      })
    }

    const result: DayAvailability = {
      date: targetDateStr,
      dayOfWeek,
      isWorkingDay,
      slots: {
        morning: createSlots(DEFAULT_MORNING_TIMES, 'morning'),
        afternoon: createSlots(DEFAULT_AFTERNOON_TIMES, 'afternoon'),
        evening: createSlots(DEFAULT_EVENING_TIMES, 'evening'),
      },
    }

    return NextResponse.json({
      success: true,
      data: {
        ...result,
        isEmergencyAvailable,
        timezone: 'Asia/Kolkata (IST)',
      },
    })
  } catch (error) {
    console.error('[Lawyer Availability API GET] Unhandled error:', error)
    return NextResponse.json<ApiResponse>(
      { success: false, error: 'Internal server error while fetching advocate availability.' },
      { status: 500 }
    )
  }
}
