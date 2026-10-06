import type { Metadata } from 'next'
import { Navigation } from '@/components/layout/navigation'
import { GbpApplyClient } from '@/components/sections/gbp-apply-client'
import { Footer } from '@/components/layout/footer'
import { buildMetadata } from '@/lib/seo'
import SchemaMarkup from '@/components/seo/schema-markup'
import { applyFaqs } from '@/lib/apply-faqs'
import { APPLY_PATH } from '@/lib/apply-routes'

// noindex: this page is only reached from the home page. It is not in the
// sitemap and not disallowed in robots.ts, so crawlers can read the tag.
// The old /gbp-apply path redirects here (next.config.mjs).
export const metadata: Metadata = buildMetadata({
  path: APPLY_PATH,
  title:
    'Book a Free Map Ranking Call | Delawala Marketing Barrie | Top 3 on Google Maps in 6 months, or your money back',
  description:
    "Top 3 on Google Maps in 6 months, or every dollar back. $500 a month, one business per industry per city. Book a free 15-minute call to check if your city is open.",
  noindex: true,
})

export default function ApplyPage() {
  return (
    <>
      <SchemaMarkup faqs={applyFaqs} />
      <Navigation />
      <main id="apply-page-content">
        <GbpApplyClient />
      </main>
      <Footer />
    </>
  )
}
