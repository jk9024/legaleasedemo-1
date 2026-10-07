'use client'

import React, { useState } from 'react'
import { Users, Shield, User, GraduationCap } from 'lucide-react'

export default function AdminUsersPage() {
  const users = [
    { id: 'u-1', name: 'LegalEase Administrator', email: 'admin@legalease.in', role: 'ADMIN', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-2', name: 'Adv. Priya Sharma', email: 'priya@legalease.in', role: 'LAWYER', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-3', name: 'Adv. Anjali Kapoor', email: 'anjali@legalease.in', role: 'LAWYER', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-4', name: 'Adv. Suresh Reddy', email: 'suresh@legalease.in', role: 'LAWYER', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-5', name: 'Adv. Fatima Khan', email: 'fatima@legalease.in', role: 'LAWYER', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-6', name: 'Adv. Kiran Kumar', email: 'kiran@legalease.in', role: 'LAWYER', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-7', name: 'Rohan Mehta', email: 'rohan@legalease.in', role: 'STUDENT', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-8', name: 'Vikram Singh', email: 'vikram@legalease.in', role: 'STUDENT', city: 'Hyderabad', status: 'ACTIVE' },
    { id: 'u-9', name: 'Rahul Kumar', email: 'rahul@test.com', role: 'CLIENT', city: 'Hyderabad', status: 'ACTIVE' },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-white">Platform Users Directory</h1>
        <p className="text-xs text-slate-400 mt-1">
          Role-based access control management across Clients, Advocates, Law Students, and Admins.
        </p>
      </div>

      <div className="rounded-2xl border border-slate-800 bg-slate-950 overflow-hidden shadow-sm">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="border-b border-slate-800 bg-slate-900 text-slate-400 uppercase tracking-wider font-semibold">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Email</th>
                <th className="p-4">System Role</th>
                <th className="p-4">Jurisdiction</th>
                <th className="p-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800 text-slate-200">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-slate-900/50">
                  <td className="p-4 font-bold text-white">{u.name}</td>
                  <td className="p-4 text-slate-400 font-mono text-[11px]">{u.email}</td>
                  <td className="p-4">
                    <span
                      className={`rounded px-2 py-0.5 text-[10px] font-bold ${
                        u.role === 'ADMIN'
                          ? 'bg-red-950 text-red-400 border border-red-800'
                          : u.role === 'LAWYER'
                          ? 'bg-amber-950 text-amber-400 border border-amber-800'
                          : u.role === 'STUDENT'
                          ? 'bg-blue-950 text-blue-400 border border-blue-800'
                          : 'bg-emerald-950 text-emerald-400 border border-emerald-800'
                      }`}
                    >
                      {u.role}
                    </span>
                  </td>
                  <td className="p-4">{u.city}</td>
                  <td className="p-4">
                    <span className="rounded bg-emerald-950 px-2 py-0.5 text-[10px] font-semibold text-emerald-400">
                      {u.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  )
}
