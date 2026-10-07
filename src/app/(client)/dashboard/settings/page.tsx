'use client'

import React, { useState } from 'react'
import { User, Bell, Lock, Globe, Save, CheckCircle2 } from 'lucide-react'

export default function ClientSettingsPage() {
  const [name, setName] = useState('Rahul Kumar')
  const [email] = useState('rahul@test.com')
  const [phone, setPhone] = useState('+91 98765 43210')
  const [city, setCity] = useState('Hyderabad')
  const [language, setLanguage] = useState('Telugu')

  const [whatsappNotifications, setWhatsappNotifications] = useState(true)
  const [smsNotifications, setSmsNotifications] = useState(true)
  const [emailReminders, setEmailReminders] = useState(true)
  const [saved, setSaved] = useState(false)

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault()
    setSaved(true)
    setTimeout(() => setSaved(false), 2500)
  }

  return (
    <div className="max-w-3xl space-y-8">
      <div>
        <h1 className="font-hero text-2xl font-bold text-[#0B1F3A]">Account Settings</h1>
        <p className="text-xs text-slate-500 mt-1">
          Manage your personal details, language preferences, and notification channels.
        </p>
      </div>

      {saved && (
        <div className="flex items-center gap-2 rounded-xl bg-emerald-50 p-4 text-xs font-semibold text-[#0D7A55] border border-emerald-200">
          <CheckCircle2 className="h-4 w-4 shrink-0" />
          <span>Profile and preferences updated successfully!</span>
        </div>
      )}

      <form onSubmit={handleSave} className="space-y-6">
        {/* Personal Details Card */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <User className="h-4 w-4 text-[#0B1F3A]" />
            <h2 className="text-sm font-bold text-[#0B1F3A]">Personal Profile</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Email Address
              </label>
              <input
                type="email"
                disabled
                value={email}
                className="w-full rounded-lg border border-slate-200 bg-slate-50 px-3 py-2 text-xs text-slate-500 cursor-not-allowed"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                Mobile Number (+91)
              </label>
              <input
                type="text"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-slate-700 mb-1">
                City / Jurisdiction
              </label>
              <input
                type="text"
                value={city}
                onChange={(e) => setCity(e.target.value)}
                className="w-full rounded-lg border border-slate-300 px-3 py-2 text-xs text-[#0B1F3A] focus:border-[#0B1F3A] focus:outline-none"
              />
            </div>
          </div>
        </div>

        {/* Language & Localisation */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Globe className="h-4 w-4 text-[#0B1F3A]" />
            <h2 className="text-sm font-bold text-[#0B1F3A]">Preferred Consultation Language</h2>
          </div>

          <div className="grid grid-cols-3 gap-3 text-xs">
            {['Telugu', 'English', 'Hindi'].map((lang) => (
              <button
                key={lang}
                type="button"
                onClick={() => setLanguage(lang)}
                className={`rounded-xl border p-3 text-center font-semibold transition ${
                  language === lang
                    ? 'border-[#0B1F3A] bg-[#0B1F3A] text-white'
                    : 'border-slate-200 bg-white text-slate-700 hover:bg-slate-50'
                }`}
              >
                {lang}
              </button>
            ))}
          </div>
        </div>

        {/* Notification Channels */}
        <div className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm space-y-4">
          <div className="flex items-center gap-2 pb-3 border-b border-slate-100">
            <Bell className="h-4 w-4 text-[#0B1F3A]" />
            <h2 className="text-sm font-bold text-[#0B1F3A]">Multi-Channel Notifications</h2>
          </div>

          <div className="space-y-3">
            <label className="flex items-center justify-between cursor-pointer">
              <div>
                <p className="text-xs font-bold text-[#0B1F3A]">WhatsApp Case Updates</p>
                <p className="text-[11px] text-slate-500">
                  Receive instant alerts when advocate updates case stage or uploads legal notices.
                </p>
              </div>
              <input
                type="checkbox"
                checked={whatsappNotifications}
                onChange={(e) => setWhatsappNotifications(e.target.checked)}
                className="h-4 w-4 rounded text-[#0B1F3A] accent-[#0B1F3A]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-[#0B1F3A]">SMS Consultation Alerts</p>
                <p className="text-[11px] text-slate-500">
                  Receive 10-minute Google Meet joining reminders and OTP authentications.
                </p>
              </div>
              <input
                type="checkbox"
                checked={smsNotifications}
                onChange={(e) => setSmsNotifications(e.target.checked)}
                className="h-4 w-4 rounded text-[#0B1F3A] accent-[#0B1F3A]"
              />
            </label>

            <label className="flex items-center justify-between cursor-pointer pt-3 border-t border-slate-100">
              <div>
                <p className="text-xs font-bold text-[#0B1F3A]">Email Tax Invoices & Summaries</p>
                <p className="text-[11px] text-slate-500">
                  Receive GST tax invoices and Gemini AI call summaries as downloadable PDFs.
                </p>
              </div>
              <input
                type="checkbox"
                checked={emailReminders}
                onChange={(e) => setEmailReminders(e.target.checked)}
                className="h-4 w-4 rounded text-[#0B1F3A] accent-[#0B1F3A]"
              />
            </label>
          </div>
        </div>

        <button
          type="submit"
          className="flex items-center gap-2 rounded-xl bg-[#0B1F3A] px-6 py-2.5 text-xs font-bold text-white shadow-sm hover:bg-[#1a3a6b] transition"
        >
          <Save className="h-4 w-4 text-[#C9A84C]" />
          <span>Save Changes</span>
        </button>
      </form>
    </div>
  )
}
