import React from 'react'
import type { Metadata } from 'next'
import Link from 'next/link'
import { Shield, Scale, FileText, CheckCircle2, AlertTriangle, ArrowRight, BookOpen } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Terms of Service — LegalEase India',
  description:
    'LegalEase terms and conditions of platform usage, Bar Council of India Rule 36 compliance, escrow dispute resolution, and advocate engagement terms.',
}

/**
 * Terms of Service Page for LegalEase
 * Fully compliant with Bar Council of India regulations, Indian Contract Act 1872,
 * Information Technology Act 2000, and Bharatiya Sakshya Adhiniyam (BSA) 2023.
 */
export default function TermsOfServicePage() {
  const sections = [
    { id: 'bci-disclaimer', title: '1. Bar Council of India Statutory Disclaimer' },
    { id: 'platform-nature', title: '2. Nature of LegalEase Platform & Non-Solicitation' },
    { id: 'user-eligibility', title: '3. User Eligibility & Account Responsibilities' },
    { id: 'advocate-engagement', title: '4. Advocate Independence & Professional Conduct' },
    { id: 'escrow-billing', title: '5. Fees, Escrow Protection & Razorpay Processing' },
    { id: 'confidentiality', title: '6. Confidentiality & Legal Privilege (BSA Sec 126)' },
    { id: 'document-analyzer', title: '7. AI Tools & Document Audit Disclaimers' },
    { id: 'intellectual-property', title: '8. Intellectual Property Rights' },
    { id: 'limitation-liability', title: '9. Limitation of Liability & Indemnification' },
    { id: 'governing-law', title: '10. Dispute Resolution & Hyderabad Jurisdiction' },
  ]

  return (
    <div className="min-h-screen bg-[#F8FAFC] py-12 px-4 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        {/* Breadcrumb Header */}
        <div className="mb-6 flex items-center gap-2 text-xs font-medium text-slate-500">
          <Link href="/" className="hover:text-[#0B1F3A] transition">Home</Link>
          <span>/</span>
          <span className="text-[#0B1F3A] font-semibold">Terms of Service</span>
        </div>

        {/* Hero Section */}
        <div className="rounded-2xl bg-gradient-to-br from-[#0B1F3A] via-[#132A4A] to-[#0B1F3A] p-8 sm:p-12 text-white shadow-xl relative overflow-hidden mb-12">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C9A84C]/10 rounded-full blur-3xl pointer-events-none" />
          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#C9A84C]/20 border border-[#C9A84C]/40 text-[#C9A84C] text-xs font-bold tracking-wide uppercase mb-4">
              <Scale className="h-3.5 w-3.5" />
              <span>Legal Regulatory Compliance</span>
            </div>
            <h1 className="font-hero text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4">
              Terms of Service & Platform Rules
            </h1>
            <p className="text-slate-300 text-sm sm:text-base leading-relaxed">
              Effective Date: 1st January 2025 • Last Updated: October 2025. Please review these terms carefully before scheduling consultations, uploading confidential documents, or retaining advocates through the LegalEase technology platform.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sticky Table of Contents */}
          <aside className="lg:col-span-1 hidden lg:block">
            <div className="sticky top-24 rounded-xl border border-slate-200 bg-white p-5 shadow-sm">
              <h2 className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-3 flex items-center gap-1.5">
                <BookOpen className="h-4 w-4 text-[#C9A84C]" />
                Index of Terms
              </h2>
              <nav className="space-y-1.5 text-xs">
                {sections.map((sec) => (
                  <a
                    key={sec.id}
                    href={`#${sec.id}`}
                    className="block py-1 text-slate-600 hover:text-[#0B1F3A] hover:font-semibold transition line-clamp-1"
                  >
                    {sec.title}
                  </a>
                ))}
              </nav>
              <div className="mt-6 pt-4 border-t border-slate-100">
                <Link
                  href="/refunds"
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-[#0B1F3A] hover:text-[#C9A84C] transition"
                >
                  <span>Refund Policy</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </div>
            </div>
          </aside>

          {/* Legal Text Content */}
          <main className="lg:col-span-3 space-y-10">
            {/* 1. BCI Disclaimer */}
            <section id="bci-disclaimer" className="rounded-xl border border-amber-200 bg-amber-50/70 p-6 shadow-sm">
              <div className="flex items-start gap-3">
                <AlertTriangle className="h-6 w-6 text-amber-600 shrink-0 mt-0.5" />
                <div>
                  <h2 className="text-lg font-bold text-amber-950 mb-2">
                    1. Bar Council of India Statutory Disclaimer (Rule 36 Compliance)
                  </h2>
                  <p className="text-xs leading-relaxed text-amber-900 mb-3">
                    In strict accordance with <strong>Rule 36 of Chapter II, Part VI of the Bar Council of India Rules</strong> governing professional conduct and etiquette, advocates enrolled with any State Bar Council are strictly prohibited from soliciting work, advertising, or creating touting arrangements.
                  </p>
                  <p className="text-xs leading-relaxed text-amber-900">
                    <strong>LegalEase Technologies Private Limited</strong> operates exclusively as an internet-based software bridge and client-advocate communications platform. LegalEase is <em>not</em> a law firm and does not provide legal representation. Information displayed on advocate profiles is user-directed information provided solely upon the client&apos;s voluntary initiative.
                  </p>
                </div>
              </div>
            </section>

            {/* 2. Platform Nature */}
            <section id="platform-nature" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                2. Nature of LegalEase Platform & Non-Solicitation
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  The LegalEase platform facilitates tele-consultation infrastructure, digital appointment booking, per-minute billing mechanisms, automated call summaries via artificial intelligence, and digital case docket management.
                </p>
                <p>
                  By accessing LegalEase, you explicitly acknowledge that:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
                  <li>There has been no advertisement, personal communication, solicitation, or inducement of any sort whatsoever by any advocate listed on the platform or by LegalEase.</li>
                  <li>You wish to obtain information about advocates and practice areas of your own volition and accord.</li>
                  <li>The information provided on the platform is made available exclusively for informational purposes at your specific request.</li>
                  <li>No advocate-client relationship is formed between LegalEase and the user. The advocate-client privilege arises strictly between the verified advocate and the client.</li>
                </ul>
              </div>
            </section>

            {/* 3. User Eligibility */}
            <section id="user-eligibility" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                3. User Eligibility & Account Responsibilities
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  To register an account or book an advocate consultation, you must be at least eighteen (18) years of age and competent to enter into a legally binding contract under the <strong>Indian Contract Act, 1872</strong>.
                </p>
                <p>
                  You agree to provide true, accurate, current, and complete information during registration and booking. Impersonation of any person or entity or misrepresenting your identity or authorization to retain legal counsel on behalf of a third party is strictly prohibited and constitutes a material breach of these Terms.
                </p>
              </div>
            </section>

            {/* 4. Advocate Engagement */}
            <section id="advocate-engagement" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                4. Advocate Independence & Professional Conduct
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  All advocates listed on LegalEase are independent professionals registered with their respective State Bar Councils (such as the Bar Council of Telangana, Bar Council of Maharashtra & Goa, Bar Council of Delhi, etc.).
                </p>
                <p>
                  LegalEase does not interfere with the independent legal judgment, advice, trial strategy, or professional discretion of any advocate. In accordance with BCI ethical guidelines:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-xs text-slate-700">
                  <li>LegalEase does not engage in fee-splitting or contingent percentage fee arrangements forbidden by the Advocates Act, 1961.</li>
                  <li>All legal fees for consultation are determined independently by the respective advocate or according to standard per-minute rates agreed upon prior to the call.</li>
                  <li>LegalEase charges a transparent technology convenience fee for cloud infrastructure, video teleconferencing, and AI transcription services.</li>
                </ul>
              </div>
            </section>

            {/* 5. Escrow Billing */}
            <section id="escrow-billing" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                5. Fees, Escrow Protection & Razorpay Processing
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  All payments are securely processed through Reserve Bank of India (RBI) authorized payment gateway partner <strong>Razorpay Software Private Limited</strong>.
                </p>
                <div className="rounded-lg bg-slate-50 p-4 border border-slate-200">
                  <h3 className="text-xs font-bold text-[#0B1F3A] uppercase tracking-wider mb-2 flex items-center gap-1.5">
                    <CheckCircle2 className="h-4 w-4 text-[#0D7A55]" />
                    The LegalEase 100% Escrow Mechanism
                  </h3>
                  <p className="text-xs text-slate-600 leading-relaxed">
                    When you schedule a consultation, your payment is placed into a secured intermediary escrow vault. The advocate is only paid after the consultation is completed in good faith. If an advocate fails to join the Google Meet session within 10 minutes of the scheduled start time, the full consultation amount is automatically refunded to your original payment method.
                  </p>
                </div>
                <p className="text-xs text-slate-500">
                  Detailed refund criteria and dispute escalation protocols are codified in our dedicated <Link href="/refunds" className="text-[#0B1F3A] font-semibold underline">Escrow Refund Policy</Link>.
                </p>
              </div>
            </section>

            {/* 6. Confidentiality */}
            <section id="confidentiality" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                6. Confidentiality & Legal Privilege (BSA Sec 126)
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  Communications between a client and an advocate made for the purpose of seeking professional legal advice are privileged communications under <strong>Section 126 of the Indian Evidence Act, 1872</strong> and its corresponding provision in the <strong>Bharatiya Sakshya Adhiniyam, 2023</strong>.
                </p>
                <p>
                  LegalEase employs 256-bit AES encryption at rest and TLS 1.3 in transit for all case documents uploaded to our secure document vault. LegalEase personnel are contractually barred from inspecting client case documents unless legally subpoenaed by a competent court of law.
                </p>
              </div>
            </section>

            {/* 7. AI Tools */}
            <section id="document-analyzer" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                7. AI Document Audit & Matchmaking Disclaimers
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  LegalEase provides algorithmic tools powered by Google Gemini and Google Cloud Vision OCR, including our AI Document Risk Analyzer and Lawyer Matchmaker.
                </p>
                <p className="text-xs text-slate-700 font-medium">
                  <strong>Important AI Advisory:</strong> AI-generated outputs, clause risk scores, and suggested legal statutes are intended exclusively as assistive informational summaries to help you prepare for your consultation. AI summaries do not constitute formal legal opinions or legal advice. You must consult a qualified human advocate before executing legal agreements or initiating litigation.
                </p>
              </div>
            </section>

            {/* 8. IP */}
            <section id="intellectual-property" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                8. Intellectual Property Rights
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                The LegalEase platform, including its software architecture, user interfaces, branding, visual identity, proprietary algorithms, and legal template vault are the exclusive intellectual property of LegalEase Technologies Private Limited, protected under the <strong>Copyright Act, 1957</strong> and <strong>Trade Marks Act, 1999</strong>.
              </p>
            </section>

            {/* 9. Liability */}
            <section id="limitation-liability" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                9. Limitation of Liability & Indemnification
              </h2>
              <p className="text-sm text-slate-600 leading-relaxed">
                To the maximum extent permitted by applicable Indian law, LegalEase shall not be liable for any indirect, incidental, punitive, or consequential damages resulting from the outcome of any judicial proceeding, court verdict, or dispute between a user and an advocate. In no event shall LegalEase&apos;s aggregate liability exceed the total technology platform fees received from you in the three (3) months preceding the claim.
              </p>
            </section>

            {/* 10. Governing Law */}
            <section id="governing-law" className="rounded-xl border border-slate-200 bg-white p-6 sm:p-8 shadow-sm">
              <h2 className="font-hero text-xl font-bold text-[#0B1F3A] mb-4">
                10. Dispute Resolution & Hyderabad Jurisdiction
              </h2>
              <div className="space-y-3 text-sm text-slate-600 leading-relaxed">
                <p>
                  These Terms of Service and any contractual relationship arising out of your use of the platform shall be governed by and construed in accordance with the substantive laws of the Republic of India.
                </p>
                <p>
                  Any dispute, controversy, or claim arising out of or relating to this contract shall first be referred to mutual conciliation for thirty (30) days. Failing amicable resolution, disputes shall be submitted to binding arbitration in Hyderabad under the <strong>Arbitration and Conciliation Act, 1996</strong>, before a sole arbitrator appointed by LegalEase.
                </p>
                <p>
                  Subject to arbitration, the courts having jurisdiction in <strong>Hyderabad, Telangana, India</strong> shall have exclusive jurisdiction over all legal proceedings.
                </p>
              </div>
            </section>

            {/* Contact Grievance Officer */}
            <div className="rounded-xl border border-slate-200 bg-slate-900 text-white p-6 sm:p-8 shadow-md">
              <h3 className="font-hero text-lg font-bold text-[#C9A84C] mb-2">
                Statutory Grievance Officer
              </h3>
              <p className="text-xs text-slate-300 leading-relaxed mb-4">
                In compliance with the Information Technology Act, 2000 and Information Technology (Intermediary Guidelines and Digital Media Ethics Code) Rules, 2021:
              </p>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs text-slate-300">
                <div>
                  <span className="block text-slate-400">Designated Officer:</span>
                  <span className="font-semibold text-white">Grievance Officer, LegalEase Technologies</span>
                </div>
                <div>
                  <span className="block text-slate-400">Official Email:</span>
                  <a href="mailto:grievance@legalease.in" className="text-[#C9A84C] font-semibold hover:underline">
                    grievance@legalease.in
                  </a>
                </div>
                <div>
                  <span className="block text-slate-400">Registered Office:</span>
                  <span>Financial District, Gachibowli, Hyderabad, Telangana 500081</span>
                </div>
                <div>
                  <span className="block text-slate-400">Resolution SLA:</span>
                  <span>Acknowledgment in 24 hrs • Resolution within 15 working days</span>
                </div>
              </div>
            </div>
          </main>
        </div>
      </div>
    </div>
  )
}
