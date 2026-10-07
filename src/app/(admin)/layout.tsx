'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import {
  LayoutDashboard,
  ShieldCheck,
  CalendarCheck,
  Users,
  IndianRupee,
  FileCheck,
  Scale,
  Menu,
  X,
  LogOut,
  Sliders,
} from 'lucide-react'

const ADMIN_NAV_ITEMS = [
  { name: 'Platform Overview', href: '/admin', icon: LayoutDashboard },
  { name: 'Lawyer Approvals', href: '/admin/lawyers', icon: ShieldCheck },
  { name: 'Bookings & Escrow', href: '/admin/bookings', icon: CalendarCheck },
  { name: 'Users & Roles', href: '/admin/users', icon: Users },
  { name: 'Revenue & GST', href: '/admin/revenue', icon: IndianRupee },
  { name: 'Content Moderation', href: '/admin/content', icon: FileCheck },
]

export default function AdminPortalLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const pathname = usePathname()
  const { user, signOut } = useAuth()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  return (
    <div className="flex min-h-[calc(100vh-4rem)] bg-slate-900 text-white">
      {/* Mobile backdrop */}
      {sidebarOpen && (
        <div
          onClick={() => setSidebarOpen(false)}
          className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
        />
      )}

      {/* Sidebar navigation */}
      <aside
        className={`fixed inset-y-0 left-0 z-50 w-64 transform border-r border-slate-800 bg-slate-950 transition-transform duration-200 ease-in-out lg:static lg:translate-x-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}
      >
        <div className="flex h-full flex-col justify-between p-4">
          <div className="space-y-6">
            <div className="flex items-center justify-between pb-3 border-b border-slate-800">
              <div className="flex items-center gap-2">
                <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0B1F3A]">
                  <Scale className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-xs font-bold text-white tracking-wide">LegalEase Admin</h2>
                  <p className="text-[10px] text-amber-400 font-semibold">Master Controller</p>
                </div>
              </div>
              <button
                onClick={() => setSidebarOpen(false)}
                className="p-1 text-slate-400 hover:text-white lg:hidden"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="space-y-1">
              {ADMIN_NAV_ITEMS.map((item) => {
                const isActive = pathname === item.href
                const Icon = item.icon

                return (
                  <Link
                    key={item.name}
                    href={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`flex items-center gap-3 rounded-lg px-3 py-2 text-xs font-semibold transition ${
                      isActive
                        ? 'bg-[#C9A84C] text-[#0B1F3A] font-bold shadow-sm'
                        : 'text-slate-400 hover:bg-slate-900 hover:text-white'
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    <span>{item.name}</span>
                  </Link>
                )
              })}
            </nav>
          </div>

          <div className="border-t border-slate-800 pt-4 flex items-center justify-between">
            <div className="flex items-center gap-2 overflow-hidden">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-red-600 text-xs font-bold text-white">
                AD
              </div>
              <div className="truncate">
                <p className="truncate text-xs font-bold text-white">Administrator</p>
                <p className="truncate text-[10px] text-slate-400">admin@legalease.in</p>
              </div>
            </div>
            <button
              onClick={() => signOut({ callbackUrl: '/' })}
              className="p-1.5 text-slate-400 hover:text-red-400 transition"
              title="Sign out"
            >
              <LogOut className="h-4 w-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* Main Content */}
      <div className="flex flex-1 flex-col overflow-hidden bg-slate-900">
        <div className="flex h-14 items-center justify-between border-b border-slate-800 bg-slate-950 px-4 lg:hidden">
          <button
            onClick={() => setSidebarOpen(true)}
            className="p-1.5 text-slate-400 hover:text-white"
          >
            <Menu className="h-5 w-5" />
          </button>
          <span className="font-bold text-sm text-white">Admin Controller</span>
          <span className="rounded bg-red-900/60 px-2 py-0.5 text-[10px] font-bold text-red-300">
            ROOT
          </span>
        </div>

        <main className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8 text-slate-100">{children}</main>
      </div>
    </div>
  )
}
