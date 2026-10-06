/**
 * Single source of truth for editable site copy, pricing, and the guarantee.
 *
 * Change a number here once and it updates everywhere it's referenced.
 *
 * ── THIS SITE SELLS ONE THING ─────────────────────────────────────────────
 * local.delawalamarketing.com is the Google Business Profile ranking offer:
 * $500/month, sold as "Top 3, or your money back". The landing page (/) and
 * its booking page (/apply) live here. Everything else - the blog, services,
 * case studies - lives on the main site, www.delawalamarketing.com, which is
 * a separate project. Link to it with mainSite() below, never a bare path.
 *
 * Do not reintroduce a second pricing model here without also rewriting the
 * home page, /apply and /terms, which are all written around one offer.
 */

/**
 * The guarantee. Top 3 on Google Maps for the money keyword within six months,
 * or every dollar paid comes back. Say it the same way everywhere - read these
 * fields rather than retyping them.
 *
 * TWO THINGS TO KEEP IN MIND:
 *
 *   1. "Top 3 on Google" is a performance claim. Under the Competition Act a
 *      performance claim needs substantiation of its own - the refund does not
 *      cure an unsubstantiated one. The geo-grid exports are the substantiation;
 *      keep them.
 *
 *   2. The conditions are what make this claimable either way. The client
 *      and we both have to be able to point at the same map and agree. If
 *      you change them, change /terms in the same commit.
 */
const GUARANTEE = {
  months: 6,
  short: 'Top 3, or your money back',
  /** The hero label. */
  headline: 'Top 3 on Google in 6 months, or your money back',
  statement:
    'If you’re not in the top 3 on Google Maps for your main keyword within 6 months, we give back every dollar you paid.',
  conditions:
    'We check it on our ranking map, searching from your business address. It counts if you stayed with us for the full 6 months and kept our access to your Google profile.',
}

/** Published price, CAD. One offer, no build fee, no second model. */
const PRICING = {
  monthly: '$500',
  /** Numeric form for analytics values - keeps the pixel from drifting. */
  monthlyValue: 500,
  currencyNote: 'Prices in CAD.',
}

/** Contact details, shown throughout the site. */
const CONTACT = {
  email: 'rizwan@delawalamarketing.com',
  phone: '+1 (249) 877-7908',
  phoneHref: '+12498777908', // E.164 for tel: links
}

export const SITE = {
  name: 'Delawala Marketing',
  /** This site. Drives metadataBase, canonicals, og:url and the sitemap. */
  domain: 'https://local.delawalamarketing.com',
  /** The main agency site: blog, services, case studies. See mainSite(). */
  mainSiteUrl: 'https://www.delawalamarketing.com',

  /** One-line positioning. Reuse verbatim so every surface reads the same. */
  positioning:
    'We get local service businesses into the top 3 on Google Maps',
  /** Where we are and who we serve. Used in footers, bios, and metadata. */
  locationLine:
    'We’re based in Barrie, Ontario. We work with local service businesses and trades in Simcoe County, the GTA and across Canada.',

  /** Primary CTA target. Calendly URL also lives in NEXT_PUBLIC_CALENDLY_URL;
   *  use getCalendlyUrl() from lib/calendly.ts to build prefilled links. */
  calendlyUrl:
    process.env.NEXT_PUBLIC_CALENDLY_URL ??
    'https://calendly.com/rizwan-delawalamarketing/book-a-call',

  /** Engagement terms. */
  terms: {
    note: 'Month-to-month. Cancel anytime, no hard feelings.',
    /* Reads as a promise to the reader rather than a policy about us.
     * Wherever this appears it carries an asterisk pointing at territoryNote -
     * the exclusivity lasts exactly as long as the engagement, and saying so
     * up front avoids an argument later. */
    territory: 'We don’t work with your competitor',
    territoryNote: 'One business per industry per city, for as long as we work together.',
    /** The full rule, in one place. */
    exclusivity:
      'We work with one business per industry per city. From the day you sign, we won’t work with anyone else in your industry in your city. It’s written into your agreement. If you leave, the spot opens back up.',
  },

  /** How often clients hear from us. */
  reporting: {
    short: 'Weekly updates',
    long: 'Every week, you get an update on the work we did. Every month, you get a map showing where you show up on Google.',
  },

  /** Everything the $500 covers. Listed in the home page's pricing section. */
  included: [
    'We find your main keyword and build it into your Google profile and website',
    'We study the businesses already ranking for that search',
    'We set up your whole Google profile: categories, services, hours, description and photos',
    'We write your review requests and tell you when to send them',
    'Regular posts and fresh photos on your Google profile',
    'Blog posts and links from other trusted websites',
    'A monthly map showing where you show up on Google',
    'A weekly update on the work we did',
  ],
  addOns: ['We write and post replies to your reviews: $200/month'],

  /** Published price. Laid out in full in the home page's pricing section. */
  pricing: PRICING,

  /** The Top 3 guarantee. */
  guarantee: GUARANTEE,

  contact: CONTACT,

  /** Social handles. `twitter` is the og/twitter card creator attribution. */
  social: {
    twitter: '@delawalamarketing',
  },

  cta: {
    primary: 'Book Your Free Map Ranking Call',
    primaryShort: 'Book Free Call', // compact spaces (top-nav pill, floating pill)
    secondary: 'See the offer',
    exclusivityCheck: 'Check if your city is open',
  },

  /**
   * The registered entity behind the trade name, used by the footer and by the
   * Privacy Policy and Terms pages.
   *
   * "Delawala Marketing" is a trade name, not a legal person. The Terms name
   * the party a customer actually contracts with, and PIPEDA expects the
   * accountable organization to be identifiable in the Privacy Policy, so both
   * pages render `legalName` rather than the brand.
   *
   * Have a lawyer review the generated legal pages - they are a solid starting
   * template, not advice.
   */
  legal: {
    /** Federal corporation. The contracting and accountable party. */
    corporationName: '18213640 CANADA INC.',
    /** Trade name it operates under. */
    operatingName: 'Delawala Marketing',
    /** Business Identification Number. */
    bin: '1001736502',
    /** Full form. Use wherever the legal entity has to be named outright. */
    legalName: '18213640 CANADA INC. o/a Delawala Marketing',
    contactEmail: CONTACT.email,
    governingLaw: 'the Province of Ontario, Canada',
    /**
     * Street address. DELIBERATELY NOT SHOWN ON THE WEBSITE - the site publishes
     * `cityProvince` only. This exists because CASL requires a mailing address
     * in every commercial electronic message, so whatever sends the emails must
     * include it. Keep any copy there in sync with this one.
     */
    mailingAddress: '23 Harrogate Crt., Barrie, ON, Canada L4M 0B9',
    /** What the website shows instead of the street address. */
    cityProvince: 'Barrie, Ontario, Canada',
    /**
     * Rendered as "Last updated" on both legal pages. Bump it whenever the
     * documents change materially - a changed policy under a stale date
     * misrepresents it.
     */
    effectiveDate: 'September 25, 2026',
  },
} as const

/**
 * Absolute URL on the main site, for links to pages that do not exist here
 * (blog, services, case studies). `path` takes a leading slash.
 */
export function mainSite(path: string) {
  return `${SITE.mainSiteUrl}${path}`
}
