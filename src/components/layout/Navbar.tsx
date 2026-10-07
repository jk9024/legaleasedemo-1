'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { useAuth } from '@/hooks/useAuth'
import { Scale, PhoneCall, User, Shield, Menu, X, Bell } from 'lucide-react'

export function Navbar() {
  const { user, isAuthenticated, signOut, role } = useAuth()
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)

  const dashboardHref =
    role === 'ADMIN'
      ? '/admin'
      : role === 'LAWYER' || role === 'STUDENT'
      ? '/portal'
      : '/dashboard'

  return (
    <header className="sticky top-0 z-50 w-full border-b border-slate-200 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/80">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        {/* Brand Logo */}
        <Link href="/" className="flex items-center gap-2.5">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#0B1F3A] text-[#C9A84C] shadow-sm">
            <Scale className="h-5 w-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-hero text-xl font-bold tracking-tight text-[#0B1F3A]">
              Legal<span className="text-[#C9A84C]">Ease</span>
            </span>
            <span className="text-[10px] font-semibold uppercase tracking-wider text-slate-500">
              India&apos;s Legal Portal
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-5 text-sm font-medium text-slate-700">
          <Link href="/search" className="transition hover:text-[#0B1F3A]">
            Find Lawyers
          </Link>
          <Link href="/analyze" className="transition hover:text-[#0B1F3A] flex items-center gap-1 font-semibold text-[#0B1F3A]">
            <span>AI Audit</span>
            <span className="rounded bg-[#C9A84C]/20 text-[#0B1F3A] px-1.5 py-0.2 text-[9px] font-bold">OCR</span>
          </Link>
          <Link href="/pricing" className="transition hover:text-[#0B1F3A]">
            Subscriptions
          </Link>
          <Link href="/forum" className="transition hover:text-[#0B1F3A]">
            Q&A Forum
          </Link>
          <Link href="/templates" className="transition hover:text-[#0B1F3A]">
            Templates
          </Link>
          <Link href="/news" className="transition hover:text-[#0B1F3A]">
            News
          </Link>
          <Link
            href="/emergency"
            className="flex items-center gap-1.5 rounded-full bg-red-50 px-3 py-1 text-xs font-semibold text-red-600 transition hover:bg-red-100"
          >
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75"></span>
              <span className="relative inline-flex h-2 w-2 rounded-full bg-red-500"></span>
            </span>
            24/7 Emergency
          </Link>
        </nav>

        {/* Desktop Actions */}
        <div className="hidden md:flex items-center gap-3">
          {isAuthenticated ? (
            <div className="flex items-center gap-3">
              <Link
                href="/dashboard"
                className="relative p-2 text-slate-600 hover:text-[#0B1F3A] transition"
                title="Notifications"
              >
                <Bell className="h-5 w-5" />
                <span className="absolute top-1.5 right-1.5 h-2 w-2 rounded-full bg-[#0D7A55]"></span>
              </Link>
              <Link
                href={dashboardHref}
                className="flex items-center gap-2 rounded-lg border border-slate-200 px-3 py-1.5 text-xs font-semibold text-[#0B1F3A] hover:bg-slate-50 transition"
              >
                <User className="h-4 w-4 text-[#C9A84C]" />
                <span>{user?.name || 'Account'}</span>
                <span className="rounded bg-[#0B1F3A] px-1.5 py-0.5 text-[10px] text-white">
                  {role}
                </span>
              </Link>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                className="rounded-lg px-3 py-1.5 text-xs font-medium text-slate-600 hover:text-red-600 transition"
              >
                Sign Out
              </button>
            </div>
          ) : (
            <div className="flex items-center gap-2.5">
              <Link
                href="/login"
                className="rounded-lg px-3.5 py-2 text-sm font-semibold text-[#0B1F3A] hover:bg-slate-100 transition"
              >
                Sign In
              </Link>
              <Link
                href="/register"
                className="rounded-lg bg-[#0B1F3A] px-4 py-2 text-sm font-semibold text-white shadow-sm hover:bg-[#1a3a6b] transition"
              >
                Get Started
              </Link>
            </div>
          )}
        </div>

        {/* Mobile menu button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex p-2 text-slate-700 md:hidden"
          aria-label="Toggle menu"
        >
          {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
        </button>
      </div>

      {/* Mobile Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="border-b border-slate-200 bg-white px-4 pt-3 pb-6 md:hidden">
          <div className="flex flex-col gap-3">
            <Link
              href="/search"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-sm font-medium text-slate-700"
            >
              Find Lawyers
            </Link>
            <Link
              href="/pricing"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-sm font-medium text-slate-700"
            >
              Subscriptions
            </Link>
            <Link
              href="/forum"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-sm font-medium text-slate-700"
            >
              Q&A Forum
            </Link>
            <Link
              href="/templates"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1.5 text-sm font-medium text-slate-700"
            >
              Legal Templates
            </Link>
            <Link
              href="/emergency"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center gap-2 py-1.5 text-sm font-semibold text-red-600"
            >
              <PhoneCall className="h-4 w-4" /> 24/7 Emergency Advocate
            </Link>
            <div className="mt-3 border-t border-slate-100 pt-3">
              {isAuthenticated ? (
                <div className="flex flex-col gap-2">
                  <Link
                    href={dashboardHref}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between rounded-lg bg-slate-50 p-2 text-sm font-semibold text-[#0B1F3A]"
                  >
                    <span>{user?.name}</span>
                    <span className="rounded bg-[#0B1F3A] px-2 py-0.5 text-xs text-white">
                      {role}
                    </span>
                  </Link>
                  <button
                    onClick={() => {
                      setMobileMenuOpen(false)
                      signOut({ callbackUrl: '/' })
                    }}
                    className="text-left text-sm font-medium text-red-600 py-1"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <div className="flex flex-col gap-2">
                  <Link
                    href="/login"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center rounded-lg border border-slate-200 py-2 text-sm font-semibold text-[#0B1F3A]"
                  >
                    Sign In
                  </Link>
                  <Link
                    href="/register"
                    onClick={() => setMobileMenuOpen(false)}
                    className="text-center rounded-lg bg-[#0B1F3A] py-2 text-sm font-semibold text-white"
                  >
                    Get Started
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
