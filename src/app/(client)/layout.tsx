'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
  LayoutDashboard,
  Briefcase,
  CalendarCheck,
  FolderLock,
  MessageSquare,
  ShieldAlert,
  Settings,
  PlusCircle,
  Menu,
  X,
  Scale,
  Bell,
  ArrowRight,
  LogOut,
} from 'lucide-react'

const CLIENT_NAV_ITEMS = [
  { name: 'Overview', href: '/dashboard', icon: LayoutDashboard },
  { name: 'My Cases', href: '/dashboard/cases', icon: Briefcase },
  { name: 'Consultations', href: '/dashboard/bookings', icon: CalendarCheck },
  { name: 'Document Vault', href: '/dashboard/documents', icon: FolderLock },
  { name: 'Messages', href: '/dashboard/messages', icon: MessageSquare },
  { name: 'LexPlus Subscription', href: '/dashboard/subscription', icon: ShieldAlert },
  { name: 'Account Settings', href: '/dashboard/settings', icon: Settings },
]

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-50">
      {/* Mobile sidebar backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-slate-900/50 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-200 bg-white transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="space-y-6">
            {/* Sidebar header (mobile only close button) */}
            <div className="flex items-center justify-between lg:hidden pb-3 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <Scale className="h-5 w-5 text-[#C9A84C]" />
                <span className="font-bold text-[#0B1F3A]">Client Portal</span>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-500 hover:text-slate-900"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            {/* Quick Action: New Consultation */}
            <Link
              href="/search"
              className="flex items-center justify-center gap-2 w-full rounded-xl bg-[#0B1F3A] px-4 py-2.5 text-xs font-bold text-white shadow-sm transition hover:bg-[#1a3a6b]"
            >
              <PlusCircle className="h-4 w-4 text-[#C9A84C]" />
              <span>Book Consultation</span>
            </Link>

            {/* Nav link list */}
            <nav className="space-y-1">
              {CLIENT_NAV_ITEMS.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (item.href !== '/dashboard' && pathname.startsWith(item.href))
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#0B1F3A] text-white shadow-sm'
                        : 'text-slate-600 hover:bg-slate-100 hover:text-[#0B1F3A]'
                    }`}
                  >
                    <Icon className={`h-4 w-4 ${isActive ? 'text-[#C9A84C]' : 'text-slate-400'}`} />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          {/* User profile footer */}
          <div className="border-t border-slate-200 pt-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2.5 overflow-hidden">
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-[#0B1F3A] text-xs font-bold text-[#C9A84C]">
                  {user?.name?.charAt(0) || 'U'}
                </div>
                <div className="truncate">
                  <p className="truncate text-xs font-bold text-[#0B1F3A]">
                    {user?.name || 'Rahul Kumar'}
                  </p>
                  <p className="truncate text-[10px] text-slate-500">Client Account</p>
                </div>
              </div>
              <button
                onClick={() => signOut({ callbackUrl: '/' })}
                title="Sign out"
                className="p-1.5 text-slate-400 hover:text-red-600 transition"
              >
                <LogOut className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </aside>

      {/* Main Content Area */}
      <div className="flex flex-1 flex-col overflow-hidden">
        {/* Top mobile bar */}
        <div className="flex h-14 items-center justify-between border-b border-slate-200 bg-white px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-slate-600 hover:text-[#0B1F3A]"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold text-sm text-[#0B1F3A]">Client Dashboard</span>
          <Link href="/dashboard" className="p-1 text-slate-500">
            <Bell className="h-4 w-4" />
          </Link>
        </div>

        {/* Content body */}
        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">{children}</main>
      </div>
    </div>
  )
}
