import { DefaultSession } from 'next-auth'
import { JWT as DefaultJWT } from 'next-auth/jwt'
import { Role } from '@prisma/client'

declare module 'next-auth' {
  interface Session {
    user: {
      id: string
      role: Role
      phone?: string | null
      city?: string | null
      state?: string | null
      language?: string | null
      lawyerProfileId?: string | null
      studentProfileId?: string | null
      plan?: string
    } & DefaultSession['user']
  }

  interface User {
    id?: string
    role?: Role
    phone?: string | null
    city?: string | null
    state?: string | null
    language?: string | null
    lawyerProfileId?: string | null
    studentProfileId?: string | null
    plan?: string
  }
}

declare module 'next-auth/jwt' {
  interface JWT extends DefaultJWT {
    id?: string
    role?: Role
    phone?: string | null
    city?: string | null
    state?: string | null
    language?: string | null
    lawyerProfileId?: string | null
    studentProfileId?: string | null
    plan?: string
  }
}
