import React from 'react'
import Link from 'next/link'
import { Shield, Lock } from 'lucide-react'

export default function PrivacyPolicyPage() {
  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto rounded-3xl border border-slate-200 bg-white p-8 sm:p-12 shadow-sm space-y-6 text-slate-700 text-xs sm:text-sm leading-relaxed">
        <div className="flex items-center gap-2 text-[#0B1F3A]">
          <Shield className="h-6 w-6 text-[#C9A84C]" />
          <h1 className="font-hero text-2xl sm:text-3xl font-extrabold">
            Privacy Policy & Data Protection
          </h1>
        </div>
        <p className="text-slate-400 text-xs">
          Last Updated: October 2025 • Compliant with Information Technology Act, 2000 & SPDI Rules, 2011
        </p>

        <section className="space-y-2">
          <h2 className="font-hero text-base font-bold text-[#0B1F3A]">1. Attorney-Client Privilege Protection</h2>
          <p>
            LegalEase recognizes the sanctity of legal consultations under Section 126 of the Indian Evidence Act, 1872. All client notes, uploaded documents in the Document Vault, and consultation communications are encrypted end-to-end (256-bit AES) and accessible only to you and your assigned advocate.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-hero text-base font-bold text-[#0B1F3A]">2. Information We Collect</h2>
          <p>
            We collect personal identity details (Name, Email, WhatsApp Phone number) solely to schedule appointments, issue GST tax invoices, and send appointment reminders via Fast2SMS and WhatsApp Cloud API.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-hero text-base font-bold text-[#0B1F3A]">3. Video Consultation Privacy</h2>
          <p>
            Video consultations are conducted over encrypted Google Meet rooms. Consultation recordings require explicit mutual consent from both client and advocate before activation. Recordings are saved directly to encrypted Google Drive storage.
          </p>
        </section>

        <section className="space-y-2">
          <h2 className="font-hero text-base font-bold text-[#0B1F3A]">4. Grievance Officer</h2>
          <p>
            In accordance with the Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021, our Grievance Officer is:
            <br />
            <strong>Grievance Officer:</strong> LegalEase Technologies Pvt Ltd, Madhapur, Hyderabad, Telangana - 500081. Email: grievance@legalease.in
          </p>
        </section>
      </div>
    </div>
  )
}
