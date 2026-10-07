'use client'

import React, { useState } from 'react'
import { CalendarDays, Check, Clock, Save, ShieldCheck } from 'lucide-react'

export default function LawyerCalendarPage() {
  const [selectedDays, setSelectedDays] = useState(['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'])
  const [saved, setSaved] = useState(false)

  const toggleDay = (day: string) => {
    setSelectedDays((prev) =>
      prev.includes(day) ? prev.filter((d) => d !== day) : [...prev, day]
    )
  }

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2000)
  }

  return (
    <div className="max-w-3xl space-y-6">
      <div>
        <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Working Calendar & Availability</h1>
        <p className="text-xs text-slate-500 mt-1">
          Set your online consultation hours, block High Court hearing days, and sync Google Calendar.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
          <Check className="h-4 w-4" />
          <span>Calendar availability saved and synced with Google Calendar!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Working Days */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0B1F3A]">Available Days for Online Consultations</h2>
          <div className="grid grid-cols-3 sm:grid-cols-6 gap-2">
            {['MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'].map((day) => {
              const isSelected = selectedDays.includes(day)
              return (
                <button
                  key={day}
                  type="button"
                  onClick={() => toggleDay(day)}
                  className={`rounded-xl py-3 text-xs font-bold transition border ${
                    isSelected
                      ? 'bg-[#0B1F3A] text-white border-[#0B1F3A]'
                      : 'bg-white text-slate-600 border-slate-200 hover:bg-slate-50'
                  }`}
                >
                  {day}
                </button>
              )
            })}
          </div>
        </div>

        {/* Working Hours */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <h2 className="text-sm font-bold text-[#0B1F3A]">Daily Time Slots</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="block font-semibold text-slate-700 mb-1">Start Time (Morning)</label>
              <input
                type="time"
                defaultValue="10:00"
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-[#0B1F3A]"
              />
            </div>
            <div>
              <label className="block font-semibold text-slate-700 mb-1">End Time (Evening)</label>
              <input
                type="time"
                defaultValue="18:00"
                className="w-full rounded-lg border border-slate-300 p-2 text-xs text-[#0B1F3A]"
              />
            </div>
          </div>
        </div>

        {/* Google Calendar 2-Way Sync */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm flex items-center justify-between">
          <div>
            <h2 className="text-sm font-bold text-[#0B1F3A]">Google Calendar 2-Way Synchronization</h2>
            <p className="text-xs text-slate-500 mt-0.5">
              Consultations automatically block your Google Calendar and create Google Meet invites.
            </p>
          </div>
          <span className="rounded bg-emerald-50 px-3 py-1 text-xs font-bold text-[#0D7A55]">
            Connected (priya@legalease.in)
          </span>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
        >
          <Save className="h-4 w-4 text-[#C9A84C]" />
          <span>Save Availability</span>
        </button>
      </form>
    </div>
  )
}
