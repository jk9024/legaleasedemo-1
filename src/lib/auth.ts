import NextAuth from 'next-auth'
import type { NextAuthConfig } from 'next-auth'
import CredentialsProvider from 'next-auth/providers/credentials'
import GoogleProvider from 'next-auth/providers/google'
import bcrypt from 'bcryptjs'
import { prisma } from '@/lib/prisma'
import type { Role } from '@prisma/client'

/**
 * Seeded Demo Accounts for local development, offline mode, and testing.
 * Strictly matches prisma/seed.ts credentials.
 */
interface DemoUserRecord {
  id: string
  email: string
  name: string
  role: Role
  passwordPlain: string
  phone: string
  city: string
  state: string
  language: string
  lawyerProfileId?: string
  studentProfileId?: string
}

const DEMO_USERS: Record<string, DemoUserRecord> = {
  'rahul@test.com': {
    id: 'user-rahul-001',
    email: 'rahul@test.com',
    name: 'Rahul Kumar',
    role: 'CLIENT',
    passwordPlain: 'Test@123',
    phone: '+919876543210',
    city: 'Hyderabad',
    state: 'Telangana',
    language: 'Telugu',
  },
  'priya@legalease.in': {
    id: 'user-priya-001',
    email: 'priya@legalease.in',
    name: 'Adv. Priya Sharma',
    role: 'LAWYER',
    passwordPlain: 'Lawyer@123',
    phone: '+919876543201',
    city: 'Hyderabad',
    state: 'Telangana',
    language: 'Telugu',
    lawyerProfileId: 'lawyer-priya-001',
  },
  'rohan@legalease.in': {
    id: 'user-rohan-001',
    email: 'rohan@legalease.in',
    name: 'Rohan Verma',
    role: 'STUDENT',
    passwordPlain: 'Student@123',
    phone: '+919876543206',
    city: 'Hyderabad',
    state: 'Telangana',
    language: 'Hindi',
    studentProfileId: 'student-rohan-001',
  },
  'admin@legalease.in': {
    id: 'user-admin-001',
    email: 'admin@legalease.in',
    name: 'LegalEase Administrator',
    role: 'ADMIN',
    passwordPlain: 'Admin@123',
    phone: '+919876543200',
    city: 'Hyderabad',
    state: 'Telangana',
    language: 'English',
  },
}

/**
 * NextAuth v5 configuration for LegalEase.
 * Supports:
 * - Email/password login with bcrypt verification & demo seed fallback
 * - Google OAuth for frictionless signup/login
 * - Pure JWT strategy for edge compatibility & resilience
 * - Role-based session augmentation (CLIENT, LAWYER, STUDENT, ADMIN)
 */
export const authConfig: NextAuthConfig = {
  secret: process.env.AUTH_SECRET || process.env.NEXTAUTH_SECRET || 'legalease_secret_2025_dev_key_change_in_production',
  session: {
    strategy: 'jwt',
    maxAge: 30 * 24 * 60 * 60, // 30 days
  },
  pages: {
    signIn: '/login',
    error: '/login',
  },
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID ?? '',
      clientSecret: process.env.GOOGLE_CLIENT_SECRET ?? '',
      allowDangerousEmailAccountLinking: true,
    }),
    CredentialsProvider({
      name: 'credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          throw new Error('Email and password are required')
        }

        const email = (credentials.email as string).trim().toLowerCase()
        const password = credentials.password as string

        // 1. Attempt database lookup if database is reachable
        try {
          const user = await prisma.user.findUnique({
            where: { email },
            include: {
              lawyerProfile: { select: { id: true } },
              studentProfile: { select: { id: true } },
            },
          })

          if (user && user.password) {
            const isValid = await bcrypt.compare(password, user.password)
            if (isValid) {
              if (!user.isActive) {
                throw new Error('Your account has been deactivated')
              }

              try {
                await prisma.user.update({
                  where: { id: user.id },
                  data: { lastLoginAt: new Date() },
                })
              } catch {
                // Non-fatal if update fails
              }

              return {
                id: user.id,
                email: user.email,
                name: user.name,
                image: user.image,
                role: user.role,
                phone: user.phone,
                city: user.city,
                state: user.state,
                language: user.language,
                lawyerProfileId: user.lawyerProfile?.id ?? null,
                studentProfileId: user.studentProfile?.id ?? null,
              }
            }
          }
        } catch (dbError) {
          console.warn('[NextAuth] Database unreachable, checking demo seed registry:', (dbError as Error).message)
        }

        // 2. Demo Seed Fallback: Check if matching pre-seeded demo accounts
        const demoUser = DEMO_USERS[email]
        if (demoUser && demoUser.passwordPlain === password) {
          return {
            id: demoUser.id,
            email: demoUser.email,
            name: demoUser.name,
            image: null,
            role: demoUser.role,
            phone: demoUser.phone,
            city: demoUser.city,
            state: demoUser.state,
            language: demoUser.language,
            lawyerProfileId: demoUser.lawyerProfileId ?? null,
            studentProfileId: demoUser.studentProfileId ?? null,
          }
        }

        throw new Error('Invalid email or password')
      },
    }),
  ],
  callbacks: {
    async jwt({ token, user, trigger, session }) {
      if (user) {
        const u = user as unknown as {
          id: string
          role: Role
          phone: string | null
          city: string | null
          state: string | null
          language: string
          lawyerProfileId: string | null
          studentProfileId: string | null
        }
        token.id = u.id
        token.role = u.role
        token.phone = u.phone
        token.city = u.city
        token.state = u.state
        token.language = u.language
        token.lawyerProfileId = u.lawyerProfileId
        token.studentProfileId = u.studentProfileId
      }

      if (trigger === 'update' && session) {
        token.name = session.name ?? token.name
        token.city = session.city ?? token.city
        token.state = session.state ?? token.state
        token.language = session.language ?? token.language
        token.image = session.image ?? token.image
      }

      return token
    },
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = (token.id as string) || session.user.id
        session.user.role = (token.role as Role) || 'CLIENT'
        session.user.phone = (token.phone as string | null) ?? null
        session.user.city = (token.city as string | null) ?? null
        session.user.state = (token.state as string | null) ?? null
        session.user.language = (token.language as string | null) ?? null
        session.user.lawyerProfileId = (token.lawyerProfileId as string | null) ?? null
        session.user.studentProfileId = (token.studentProfileId as string | null) ?? null
      }
      return session
    },
    async signIn({ user, account }) {
      if (account?.provider === 'google') {
        try {
          const existingUser = await prisma.user.findUnique({
            where: { email: user.email ?? '' },
          })

          if (!existingUser) {
            await prisma.user.create({
              data: {
                email: user.email ?? '',
                name: user.name ?? 'User',
                image: user.image,
                emailVerified: new Date(),
                role: 'CLIENT',
              },
            })
          }
        } catch {
          // Gracefully continue even if offline DB
        }
      }
      return true
    },
  },
}

export const { handlers, auth, signIn, signOut } = NextAuth(authConfig)
