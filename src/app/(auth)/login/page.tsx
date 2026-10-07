'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { signIn } from 'next-auth/react'
import { Scale, Lock, Mail, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'

export default function LoginPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const callbackUrl = searchParams.get('callbackUrl') || '/'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await signIn('credentials', {
        redirect: false,
        email,
        password,
      })

      if (res?.error) {
        setError('Invalid email or password. Check demo credentials below.')
      } else {
        // If a specific callbackUrl was given (other than root), use it
        if (callbackUrl && callbackUrl !== '/') {
          router.push(callbackUrl)
        } else {
          // Route to role-specific dashboard based on account
          const lowerEmail = email.toLowerCase()
          if (lowerEmail.includes('admin')) {
            router.push('/admin')
          } else if (lowerEmail.includes('priya') || lowerEmail.includes('lawyer') || lowerEmail.includes('rohan')) {
            router.push('/portal')
          } else {
            router.push('/dashboard')
          }
        }
        router.refresh()
      }
    } catch (err) {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
  }

  const fillDemo = (demoEmail: string, demoPass: string) => {
    setEmail(demoEmail)
    setPassword(demoPass)
    setError(null)
  }

  return (
    <div className="flex min-h-[calc(100vh-8rem)] items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-md space-y-8">
        <div className="text-center">
          <Link href="/" className="inline-flex items-center gap-2 mb-2">
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-[#C9A84C]">
              <Scale className="h-5 w-5" />
            </div>
            <span className="font-hero text-2xl font-bold text-[#0B1F3A]">
              Legal<span className="text-[#C9A84C]">Ease</span>
            </span>
          </Link>
          <h2 className="mt-2 text-2xl font-bold tracking-tight text-[#0B1F3A]">
            Sign in to your account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Or{' '}
            <Link href="/register" className="font-semibold text-[#0B1F3A] hover:underline">
              create a new account
            </Link>
          </p>
        </div>

        <div className="rounded-2xl border border-slate-200 bg-white p-8 shadow-sm">
          {error && (
            <div className="mb-6 flex items-center gap-2 rounded-lg bg-red-50 p-3 text-xs font-medium text-red-700 border border-red-200">
              <AlertCircle className="h-4 w-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Google OAuth Button */}
          <button
            type="button"
            onClick={() => signIn('google', { callbackUrl })}
            className="flex w-full items-center justify-center gap-3 rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 shadow-sm"
          >
            <svg className="h-4 w-4" viewBox="0 0 24 24">
              <path
                fill="#4285F4"
                d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.67v3.05h3.88c2.27-2.09 3.66-5.17 3.66-9.16z"
              />
              <path
                fill="#34A853"
                d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.24v3.15C3.26 21.36 7.33 24 12 24z"
              />
              <path
                fill="#FBBC05"
                d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.24C.45 8.16 0 9.97 0 12s.45 3.84 1.24 5.42l4.04-3.15z"
              />
              <path
                fill="#EA4335"
                d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.33 0 3.26 2.64 1.24 6.58l4.04 3.15c.95-2.83 3.6-4.98 6.72-4.98z"
              />
            </svg>
            <span>Continue with Google</span>
          </button>

          <div className="relative my-6 text-center">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200" />
            </div>
            <span className="relative bg-white px-3 text-xs text-slate-400 uppercase">
              Or with email
            </span>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="name@example.com"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-xs font-semibold text-slate-700">Password</label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-medium text-slate-500 hover:text-[#0B1F3A]"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a3a6b] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Signing In...</span>
                </>
              ) : (
                <>
                  <span>Sign In</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>

          {/* Quick Demo Logins per AGENTS.md Seed Data */}
          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-xs font-semibold text-slate-500 mb-2">⚡ Quick 1-Click Demo Fill:</p>
            <div className="grid grid-cols-2 gap-2 text-xs">
              <button
                type="button"
                onClick={() => fillDemo('rahul@test.com', 'Test@123')}
                className="rounded border border-slate-200 bg-slate-50 p-2 text-left hover:bg-slate-100 transition"
              >
                <p className="font-bold text-[#0B1F3A]">Client (Rahul)</p>
                <p className="text-[10px] text-slate-500">rahul@test.com</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('priya@legalease.in', 'Lawyer@123')}
                className="rounded border border-slate-200 bg-slate-50 p-2 text-left hover:bg-slate-100 transition"
              >
                <p className="font-bold text-[#0B1F3A]">Advocate (Priya)</p>
                <p className="text-[10px] text-slate-500">priya@legalease.in</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('rohan@legalease.in', 'Student@123')}
                className="rounded border border-slate-200 bg-slate-50 p-2 text-left hover:bg-slate-100 transition"
              >
                <p className="font-bold text-[#0B1F3A]">Student (Rohan)</p>
                <p className="text-[10px] text-slate-500">rohan@legalease.in</p>
              </button>
              <button
                type="button"
                onClick={() => fillDemo('admin@legalease.in', 'Admin@123')}
                className="rounded border border-slate-200 bg-slate-50 p-2 text-left hover:bg-slate-100 transition"
              >
                <p className="font-bold text-[#0B1F3A]">Administrator</p>
                <p className="text-[10px] text-slate-500">admin@legalease.in</p>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
