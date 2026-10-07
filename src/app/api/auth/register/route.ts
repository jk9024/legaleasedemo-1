import { NextResponse } from 'next/server'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import { registerSchema } from '@/lib/utils/validators'
import { rateLimit } from '@/lib/redis'

/**
 * User registration API route handler.
 * Creates CLIENT, LAWYER, or STUDENT profiles with bcrypt hashed passwords.
 * Enforces Zod validation and Redis rate limiting.
 */
export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || '127.0.0.1'
    const limit = await rateLimit(`register:${ip}`, 5, 60)
    if (!limit.success) {
      return NextResponse.json(
        { error: 'Too many registration attempts. Please wait 1 minute.' },
        { status: 429 }
      )
    }

    const body = await req.json()
    const validation = registerSchema.safeParse(body)

    if (!validation.success) {
      const firstError = validation.error.issues?.[0]?.message || 'Validation error'
      return NextResponse.json({ error: firstError }, { status: 400 })
    }

    const { name, email, password, phone, role, city, state } = validation.data

    // Check existing email
    const existing = await prisma.user.findUnique({
      where: { email },
    })

    if (existing) {
      return NextResponse.json(
        { error: 'An account with this email address already exists.' },
        { status: 409 }
      )
    }

    const hashedPassword = await bcrypt.hash(password, 10)

    const user = await prisma.user.create({
      data: {
        name,
        email,
        phone,
        password: hashedPassword,
        role,
        city,
        state,
        language: 'English',
        isActive: true,
      },
    })

    // If LAWYER or STUDENT, initialize their profile record
    if (role === 'LAWYER') {
      await prisma.lawyer.create({
        data: {
          userId: user.id,
          barCouncilId: `PENDING/${new Date().getFullYear()}/${Math.floor(1000 + Math.random() * 9000)}`,
          enrollmentYear: new Date().getFullYear(),
          specializations: ['General Practice'],
          experienceYears: 1,
          court: `${city} District Court`,
          bio: 'Practicing advocate registered on LegalEase.',
          education: 'LLB Graduate',
          feePerHour: 499,
          feePerMinute: 10,
          pricingModel: 'PER_HOUR',
          minimumMinutes: 15,
          emergencyFee: 799,
          consultationTypes: ['VIDEO', 'PHONE'],
          languages: ['English'],
          isVerified: false,
          referralCode: `LE${Math.random().toString(36).substring(2, 7).toUpperCase()}`,
        },
      })
    } else if (role === 'STUDENT') {
      await prisma.student.create({
        data: {
          userId: user.id,
          university: 'Law University',
          yearOfStudy: 4,
          graduationYear: new Date().getFullYear() + 1,
          specializations: ['Legal Research', 'RTI'],
          feePerHour: 149,
          feePerMinute: 3,
          pricingModel: 'PER_MINUTE',
          minimumMinutes: 10,
          languages: ['English'],
          isVerified: false,
        },
      })
    }

    return NextResponse.json(
      {
        success: true,
        message: 'Account created successfully',
        userId: user.id,
      },
      { status: 201 }
    )
  } catch (error) {
    console.error('[Registration Error]', error)
    return NextResponse.json(
      { error: 'An unexpected internal error occurred during registration.' },
      { status: 500 }
    )
  }
}
