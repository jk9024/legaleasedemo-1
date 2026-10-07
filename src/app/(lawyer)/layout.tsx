'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
  LayoutDashboard,
  CalendarCheck,
  Users,
  BookOpen,
  IndianRupee,
  BarChart3,
  Share2,
  CalendarDays,
  Settings,
  Scale,
  Menu,
  X,
  ShieldCheck,
  LogOut,
  Power,
} from 'lucide-react'

const LAWYER_NAV_ITEMS = [
  { name: 'Overview', href: '/portal', icon: LayoutDashboard },
  { name: 'Consultations', href: '/portal/bookings', icon: CalendarCheck },
  { name: 'My Clients', href: '/portal/clients', icon: Users },
  { name: 'Knowledge Base', href: '/portal/knowledge-base', icon: BookOpen },
  { name: 'Earnings & Escrow', href: '/portal/earnings', icon: IndianRupee },
  { name: 'Analytics', href: '/portal/analytics', icon: BarChart3 },
  { name: 'Advocate Referrals', href: '/portal/referrals', icon: Share2 },
  { name: 'Working Calendar', href: '/portal/calendar', icon: CalendarDays },
  { name: 'Practice Settings', href: '/portal/settings', icon: Settings },
]

export default function LawyerPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)
  const [isOnline, setIsOnline] = useState(true)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-[#0B1F3A] text-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0B1F3A]">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white tracking-wide">Advocate Portal</h2>
                  <p className="text-[10px] text-slate-400">Practice Management</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Online / Offline status toggle */}
            <div className="flex items-center justify-between rounded-xl bg-slate-800/80 p-3 border border-slate-700 text-xs">
              <div className="flex items-center gap-2">
                <span
                  className={`h-2.5 w-2.5 rounded-full ${
                    isOnline ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'
                  }`}
                />
                <span className="font-semibold text-slate-200">
                  {isOnline ? 'Online for Consults' : 'Offline / In Court'}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setIsOnline(!isOnline)}
                className={`p-1 rounded-md transition ${
                  isOnline ? 'text-emerald-400 hover:text-emerald-300' : 'text-slate-400'
                }`}
                title="Toggle Online Status"
              >
                <Power className="h-4 w-4" />
              </button>
            </div>

            {/* Nav links */}
            <nav className="space-y-1">
              {LAWYER_NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/portal' && pathname.startsWith(item.href))
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#C9A84C] text-[#0B1F3A] font-bold shadow-sm'
                        : 'text-slate-300 hover:bg-slate-800 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4 shrink-0" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* Advocate footer card */}
          <div className="border-t border-slate-800 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#C9A84C] text-xs font-bold text-[#0B1F3A]">
                  PS
                </div>
                <div className="truncate">
                  <p className="truncate text-xs font-bold text-white">
                    {user?.name || 'Adv. Priya Sharma'}
                  </p>
                  <p className="truncate text-[10px] text-slate-400">High Court Advocate</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-red-400 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Mobile top bar */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-slate-600 hover:text-[#0B1F3A]"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold text-sm text-[#0B1F3A]">Advocate Portal</span>
          <span className="h-2.5 w-2.5 rounded-full bg-emerald-500" />
        </div>

        {/* Content View */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
