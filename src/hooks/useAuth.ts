'use client'

import { useSession, signIn, signOut } from 'next-auth/react'

/**
 * Custom authentication hook for LegalEase.
 * Wraps NextAuth v5 useSession with typed role helpers.
 */
export function useAuth() {
  const { data: session, status, update } = useSession()

  const isLoading = status === 'loading'
  const isAuthenticated = status === 'authenticated'
  const user = session?.user

  const role = user?.role
  const isClient = role === 'CLIENT'
  const isLawyer = role === 'LAWYER'
  const isStudent = role === 'STUDENT'
  const isAdmin = role === 'ADMIN'

  return {
    session,
    user,
    role,
    status,
    isLoading,
    isAuthenticated,
    isClient,
    isLawyer,
    isStudent,
    isAdmin,
    signIn,
    signOut,
    updateSession: update,
  }
}
