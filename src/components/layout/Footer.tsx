import React from 'react'
import Link from 'next/link'
import { Scale, ShieldCheck, Mail, MapPin, Phone } from 'lucide-react'

export function Footer() {
  return (
    <footer className="border-t border-slate-200 bg-[#0B1F3A] text-slate-300">
      <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-4 lg:grid-cols-5">
          {/* Col 1: Brand & Identity */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-2 text-white">
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#C9A84C] text-[#0B1F3A]">
                <Scale className="h-5 w-5" />
              </div>
              <span className="font-hero text-2xl font-bold tracking-tight">
                Legal<span className="text-[#C9A84C]">Ease</span>
              </span>
            </div>
            <p className="mt-3 max-w-sm text-sm leading-6 text-slate-400">
              India&apos;s most comprehensive legal consultation marketplace. Connecting citizens
              with verified advocates and law students across 28 states & union territories.
            </p>
            <div className="mt-4 flex items-center gap-2 text-xs text-[#C9A84C]">
              <ShieldCheck className="h-4 w-4" />
              <span>Bar Council of India Rule 36 Compliant Platform</span>
            </div>
          </div>

          {/* Col 2: Legal Practice Areas */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Practice Areas
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/search?category=Property" className="hover:text-white transition">
                  Property & RERA
                </Link>
              </li>
              <li>
                <Link href="/search?category=Family" className="hover:text-white transition">
                  Family & Divorce
                </Link>
              </li>
              <li>
                <Link href="/search?category=Criminal" className="hover:text-white transition">
                  Criminal Defense & Bail
                </Link>
              </li>
              <li>
                <Link href="/search?category=Labour" className="hover:text-white transition">
                  Labour & Employment
                </Link>
              </li>
              <li>
                <Link href="/search?category=Consumer" className="hover:text-white transition">
                  Consumer Disputes
                </Link>
              </li>
              <li>
                <Link href="/search?category=Corporate" className="hover:text-white transition">
                  Startup & Corporate
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 3: Key Features */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Platform
            </h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <Link href="/pricing" className="hover:text-white transition">
                  Legal Shield Plans
                </Link>
              </li>
              <li>
                <Link href="/emergency" className="hover:text-white transition">
                  24/7 Emergency Lawyer
                </Link>
              </li>
              <li>
                <Link href="/templates" className="hover:text-white transition">
                  Document Vault
                </Link>
              </li>
              <li>
                <Link href="/forum" className="hover:text-white transition">
                  Citizen Q&A Forum
                </Link>
              </li>
              <li>
                <Link href="/news" className="hover:text-white transition">
                  Legal News & Insights
                </Link>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact & Office */}
          <div>
            <h3 className="text-xs font-semibold uppercase tracking-wider text-white">
              Headquarters
            </h3>
            <div className="mt-3 space-y-2.5 text-sm text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="h-4 w-4 mt-0.5 text-[#C9A84C] shrink-0" />
                <span>Hyderabad, Telangana, 500081</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-[#C9A84C] shrink-0" />
                <a href="mailto:hello@legalease.in" className="hover:text-white">
                  hello@legalease.in
                </a>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="h-4 w-4 text-[#C9A84C] shrink-0" />
                <span>+91 40 2345 6789</span>
              </div>
            </div>
          </div>
        </div>

        {/* Legal Disclaimer Required by BCI */}
        <div className="mt-10 border-t border-slate-800 pt-6 text-[11px] leading-relaxed text-slate-400">
          <p>
            <strong>Disclaimer:</strong> As per the rules of the Bar Council of India, advocates are
            not permitted to solicit work or advertise. LegalEase is an information-exchange and
            consultation management platform and does not provide legal representation directly.
            Transmission, receipt, or use of this marketplace does not constitute or create a
            lawyer-client relationship with LegalEase.
          </p>
          <div className="mt-4 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400">
            <p>© {new Date().getFullYear()} LegalEase Technologies Pvt Ltd. All rights reserved.</p>
            <div className="mt-2 sm:mt-0 flex gap-4">
              <Link href="/privacy" className="hover:text-white">
                Privacy Policy
              </Link>
              <Link href="/terms" className="hover:text-white">
                Terms of Service
              </Link>
              <Link href="/refunds" className="hover:text-white">
                Refund Policy
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
