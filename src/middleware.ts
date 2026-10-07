import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { getToken } from 'next-auth/jwt'

/**
 * Middleware for route protection and role-based access control.
 * Rules:
 * - /dashboard/* : Requires authenticated user (Role: CLIENT, LAWYER, STUDENT, ADMIN)
 * - /portal/*    : Requires LAWYER or STUDENT or ADMIN
 * - /admin/*     : Requires ADMIN role
 * - /book/*      : Requires authenticated user
 * - /video/*     : Requires authenticated user
 */
export async function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl

  // Protected route prefixes
  const isDashboardRoute = pathname.startsWith('/dashboard')
  const isPortalRoute = pathname.startsWith('/portal')
  const isAdminRoute = pathname.startsWith('/admin')
  const isBookingFlow = pathname.startsWith('/book')
  const isVideoRoom = pathname.startsWith('/video')

  const requiresAuth = isDashboardRoute || isPortalRoute || isAdminRoute

  if (!requiresAuth) {
    return NextResponse.next()
  }

  const token = await getToken({
    req,
    secret: process.env.NEXTAUTH_SECRET || 'legalease_secret_2025_dev_key_change_in_production'
  })

  // If unauthenticated, redirect to login
  if (!token) {
    const loginUrl = new URL('/login', req.url)
    loginUrl.searchParams.set('callbackUrl', req.nextUrl.pathname)
    return NextResponse.redirect(loginUrl)
  }

  const role = token.role as string

  // Admin route protection
  if (isAdminRoute && role !== 'ADMIN') {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  // Lawyer Portal protection (LAWYER, STUDENT, or ADMIN)
  if (isPortalRoute && !['LAWYER', 'STUDENT', 'ADMIN'].includes(role)) {
    return NextResponse.redirect(new URL('/dashboard', req.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: [
    '/dashboard/:path*',
    '/portal/:path*',
    '/admin/:path*',
    '/book/:path*',
    '/video/:path*'
  ]
}
