import React from 'react'
import { SITE } from '@/lib/site-config'

type Faq = { question: string; answer: string }

/**
 * `faqs` must be the questions the page visibly shows. Google requires FAQPage
 * markup to match on-page content, so each page passes its own list rather
 * than sharing one.
 */
export default function SchemaMarkup({ faqs }: { faqs: Faq[] }) {
  /**
   * The organization node. It is the same business as the main site, so its
   * @id, url and logo point at www.delawalamarketing.com - the main site's
   * service pages and blog posts reference that @id, and both sites must
   * describe one entity rather than two. Only the offer points here.
   *
   * Values come from SITE wherever one exists, so the structured data cannot
   * drift from what the page actually says.
   *
   * NOTE: address carries no street. That is deliberate and matches the rest of
   * the site - the mailing address is published only in the email templates,
   * where CASL requires it.
   */
  const business = {
    '@context': 'https://schema.org',
    '@type': 'ProfessionalService',
    name: SITE.legal.operatingName,
    legalName: SITE.legal.corporationName,
    image: `${SITE.mainSiteUrl}/logo.png`,
    '@id': `${SITE.mainSiteUrl}/#organization`,
    url: SITE.mainSiteUrl,
    telephone: SITE.contact.phoneHref,
    /** Ties the trade name to the registered entity. */
    identifier: {
      '@type': 'PropertyValue',
      name: 'Business Identification Number (BIN)',
      value: SITE.legal.bin,
    },
    priceRange: '$$',
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Barrie',
      addressRegion: 'ON',
      addressCountry: 'CA',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: 44.3894,
      longitude: -79.6903,
    },
    areaServed: [
      {
        '@type': 'City',
        name: 'Barrie',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Simcoe County',
      },
      {
        '@type': 'AdministrativeArea',
        name: 'Ontario',
      },
      {
        '@type': 'Country',
        name: 'Canada',
      },
    ],
    /* The published price, in structured form. The whole positioning is that
     * we publish what the category hides behind a discovery call, so the
     * machine-readable version should say it too. */
    makesOffer: {
      '@type': 'Offer',
      name: 'Google Business Profile Ranking',
      description:
        'Google Business Profile work to get a local business into the top 3 on Google Maps. Billed monthly, no setup fee. Top 3 in 6 months, or your money back.',
      price: SITE.pricing.monthlyValue,
      priceCurrency: 'CAD',
      priceSpecification: {
        '@type': 'UnitPriceSpecification',
        price: SITE.pricing.monthlyValue,
        priceCurrency: 'CAD',
        unitCode: 'MON',
        billingIncrement: 1,
      },
      availability: 'https://schema.org/InStock',
      url: SITE.domain,
    },
    knowsAbout: [
      'Google Business Profile Optimization',
      'Google Maps Ranking',
      'Local Map Pack Rankings',
      'Local SEO Canada',
      'Google Business Profile Categories and Services',
      'Local Review Generation and Management',
      'Local Citations and Business Listings',
      'Geo-grid Rank Tracking',
    ],
    description:
      'Delawala Marketing is a Barrie-based local SEO agency. We get local service businesses and trades into the top 3 on Google Maps for the searches that bring them customers.',
    sameAs: [
      'https://maps.app.goo.gl/CR8KurddBezK6uh26',
      'https://www.youtube.com/@DelawalaMarketing',
      'https://www.instagram.com/delawalamarketing/',
      'https://www.facebook.com/delawalamarketing1',
      'https://www.linkedin.com/company/delawalamarketing/',
    ],
    contactPoint: {
      '@type': 'ContactPoint',
      telephone: SITE.contact.phoneHref,
      contactType: 'sales',
      areaServed: ['CA'],
      availableLanguage: 'en',
    },
  }

  const faqPage = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.question,
      acceptedAnswer: { '@type': 'Answer', text: f.answer },
    })),
  }

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(business) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(faqPage) }}
      />
    </>
  )
}
