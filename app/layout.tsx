import type { Metadata } from 'next'
import { Bricolage_Grotesque, Inter, JetBrains_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import './globals.css'
import { SITE } from '@/lib/site-config'

const fontDisplay = Bricolage_Grotesque({
  subsets: ['latin'],
  variable: '--font-display',
})

const fontBody = Inter({
  subsets: ['latin'],
  variable: '--font-body',
})

const fontMono = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-mono',
})

export const metadata: Metadata = {
  metadataBase: new URL(SITE.domain),
  title:
    'BEST Marketing Agency Barrie | Delawala Marketing | looking for an online marketing agency near me for SEO, Google Ads or local SEO? We put your business in the top 3 of Google',
  description:
    'Delawala Marketing gets local businesses into the top 3 on Google Maps for $500 a month. Top 3 in 6 months, or your money back. Google Ads and Meta ads available as add-ons.',
  keywords: [
    'marketing agency Barrie',
    'best marketing agency Barrie',
    'online marketing agency near me',
    'SEO Barrie',
    'local SEO Barrie',
    'Google Ads management Barrie',
    'Meta ads agency Canada',
    'top 3 of Google local ranking',
    'Google Business Profile optimization Barrie',
    'local service business marketing Ontario',
  ],
  authors: [{ name: SITE.name }],
  openGraph: {
    title:
      'BEST Marketing Agency Barrie | Delawala Marketing | looking for an online marketing agency near me for SEO, Google Ads or local SEO? We put your business in the top 3 of Google',
    description:
      'Delawala Marketing gets local businesses into the top 3 on Google Maps for $500 a month. Top 3 in 6 months, or your money back. Google Ads and Meta ads available as add-ons.',
    url: SITE.domain,
    siteName: SITE.name,
    locale: 'en_CA',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title:
      'BEST Marketing Agency Barrie | Delawala Marketing | looking for an online marketing agency near me for SEO, Google Ads or local SEO? We put your business in the top 3 of Google',
    description:
      'Delawala Marketing gets local businesses into the top 3 on Google Maps for $500 a month. Top 3 in 6 months, or your money back. Google Ads and Meta ads available as add-ons.',
    creator: '@delawalamarketing',
  },
  icons: {
    icon: [
      { url: '/icon-light-32x32.png', media: '(prefers-color-scheme: light)' },
      { url: '/icon-dark-32x32.png', media: '(prefers-color-scheme: dark)' },
    ],
    apple: '/apple-icon.png',
  },
  alternates: {
    canonical: SITE.domain,
  },
}

import { Toaster } from '@/components/ui/sonner'
import { Clarity } from '@/components/analytics/clarity'
import { UTMCapture } from '@/components/analytics/utm-capture'
import { GoogleTagManager, GoogleAnalytics } from '@next/third-parties/google'

const GTM_ID = process.env.NEXT_PUBLIC_GTM_ID || 'GTM-5XNK87NW'
const GA_ID = process.env.NEXT_PUBLIC_GA_ID || 'G-HVDW3ZD8X1'

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${fontDisplay.variable} ${fontBody.variable} ${fontMono.variable} bg-background`}>
      <GoogleTagManager gtmId={GTM_ID} />
      <GoogleAnalytics gaId={GA_ID} />
      <body className="font-sans antialiased min-h-screen">
        <UTMCapture />
        <Clarity />
        {children}
        <Toaster position="bottom-left" />
        {process.env.NODE_ENV === 'production' && <Analytics />}
        <SpeedInsights />
      </body>
    </html>
  )
}
