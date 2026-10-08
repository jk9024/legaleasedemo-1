import type { Metadata, Viewport } from 'next'
import { Playfair_Display, Sora } from 'next/font/google'
import './globals.css'
import { AuthProvider } from '@/components/providers/AuthProvider'
import { QueryProvider } from '@/components/providers/QueryProvider'
import { Navbar } from '@/components/layout/Navbar'
import { Footer } from '@/components/layout/Footer'
import { ServiceWorkerRegister } from '@/components/pwa/ServiceWorkerRegister'
import { GoogleAnalytics } from '@next/third-parties/google'
import Script from 'next/script'

const playfair = Playfair_Display({
  subsets: ['latin'],
  variable: '--font-playfair',
  display: 'swap',
})

const sora = Sora({
  subsets: ['latin'],
  variable: '--font-sora',
  display: 'swap',
})

export const viewport: Viewport = {
  themeColor: '#0B1F3A',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
}

export const metadata: Metadata = {
  title: 'LegalEase — India’s Most Trusted Legal Consultation Marketplace & PWA',
  description:
    'Consult verified High Court & District Court advocates online via Google Meet. Instant bookings, per-minute billing, 7-stage case tracking, and AI legal search.',
  manifest: '/manifest.json',
  icons: {
    icon: '/favicon.ico',
    apple: '/icons/icon-192x192.png',
  },
  keywords: [
    'Legal consultation India',
    'Online lawyer consultation',
    'High Court advocate Hyderabad',
    'RERA lawyer',
    'Divorce advocate',
    'LegalEase',
    'Property dispute advocate',
  ],
  authors: [{ name: 'LegalEase Team' }],
  openGraph: {
    title: 'LegalEase — Legal Consultations Online in India',
    description: 'Instant video consultations with verified Indian advocates from ₹149.',
    url: 'https://legalease.in',
    siteName: 'LegalEase',
    locale: 'en_IN',
    type: 'website',
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${sora.variable}`}>
      <body className="min-h-screen bg-[#F8FAFC] font-sans antialiased text-[#0B1F3A] flex flex-col justify-between">
        <AuthProvider>
          <QueryProvider>
            <Navbar />
            <main className="flex-1">{children}</main>
            <Footer />
            <ServiceWorkerRegister />
          </QueryProvider>
        </AuthProvider>
        {process.env.NEXT_PUBLIC_GA_ID && (
          <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID} />
        )}
        <Script src="https://checkout.razorpay.com/v1/checkout.js" strategy="afterInteractive" />
      </body>
    </html>
  )
}
