'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { Scale, Lock, Mail, User, Phone, ArrowRight, AlertCircle, Loader2 } from 'lucide-react'

export default function RegisterPage() {
  const router = useRouter()
  const [role, setRole] = useState<'CLIENT' | 'LAWYER' | 'STUDENT'>('CLIENT')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [password, setPassword] = useState('')
  const [city, setCity] = useState('Hyderabad')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)
    setError(null)

    try {
      const res = await fetch('/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name,
          email,
          phone,
          password,
          role,
          city,
          state: 'Telangana',
        }),
      })

      const data = await res.json()

      if (!res.ok) {
        setError(data.error || 'Registration failed. Please check inputs.')
      } else {
        setSuccess(true)
        setTimeout(() => {
          router.push('/login?registered=true')
        }, 1500)
      }
    } catch {
      setError('An unexpected error occurred. Please try again.')
    } finally {
      setIsLoading(false)
    }
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
            Create your account
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Already have an account?{' '}
            <Link href="/login" className="font-semibold text-[#0B1F3A] hover:underline">
              Sign in here
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

          {success && (
            <div className="mb-6 rounded-lg bg-emerald-50 p-3 text-xs font-medium text-emerald-800 border border-emerald-200 text-center">
              Account created successfully! Redirecting to sign in...
            </div>
          )}

          {/* Role selector tab */}
          <div className="mb-6 grid grid-cols-3 gap-2 rounded-lg bg-slate-100 p-1">
            <button
              type="button"
              onClick={() => setRole('CLIENT')}
              className={`rounded-md py-1.5 text-xs font-semibold transition ${
                role === 'CLIENT' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Client
            </button>
            <button
              type="button"
              onClick={() => setRole('LAWYER')}
              className={`rounded-md py-1.5 text-xs font-semibold transition ${
                role === 'LAWYER' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Advocate
            </button>
            <button
              type="button"
              onClick={() => setRole('STUDENT')}
              className={`rounded-md py-1.5 text-xs font-semibold transition ${
                role === 'STUDENT' ? 'bg-white text-[#0B1F3A] shadow-sm' : 'text-slate-600 hover:text-slate-900'
              }`}
            >
              Law Student
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <div className="relative">
                <User className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Rahul Kumar"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
                />
              </div>
            </div>

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
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (+91)
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="tel"
                  required
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="9876543210"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <input
                  type="password"
                  required
                  minLength={8}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="At least 8 characters"
                  className="w-full rounded-lg border border-slate-300 pl-9 pr-3 py-2 text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Jurisdiction
              </label>
              <input
                type="text"
                required
                value={city}
                onChange={(e) => setCity(e.target.value)}
                placeholder="e.g. Hyderabad"
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-sm text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || success}
              className="flex w-full items-center justify-center gap-2 rounded-lg bg-[#0B1F3A] py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#1a3a6b] disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  <span>Creating Account...</span>
                </>
              ) : (
                <>
                  <span>Create Account</span>
                  <ArrowRight className="h-4 w-4" />
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
