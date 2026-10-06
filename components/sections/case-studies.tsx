'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import {
  MapPin,
  Target,
  TrendingDown,
  TrendingUp,
  Star,
  ArrowRight,
  type LucideIcon,
} from 'lucide-react'
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from '@/components/ui/carousel'
import { Card, CardContent } from '@/components/ui/card'
import { Pill } from '@/components/ui/pill'
import { HOME_SERVICE_SLUG } from '@/lib/services'
import { mainSite } from '@/lib/site-config'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { SectionShell } from '@/components/ui/section-shell'

/**
 * Real client case studies, summarised from the full studies on the main site
 * (content/case-studies in its repo). Keep the two in sync: each entry's `slug`
 * is the URL of its full study, www.delawalamarketing.com/case-studies/<slug>.
 *
 * Every card is anonymised. Written consent is the only thing that puts a
 * trading name back here. Being a real client is not consent.
 *
 * Claims must come from the full study. Do not add a number or a rank the
 * study does not back up.
 *
 * `services` lists the service pages this study belongs to, and is how each
 * service page picks its own studies. The home page shows all of them, with the
 * GBP studies first.
 */
const CASE_STUDIES: {
  title: string
  industry: string
  slug: string
  services: string[]
  servicesUsed: string[]
  metrics: { label: string; value: string; icon: LucideIcon }[]
  description: string
  result: string
}[] = [
  {
    title: 'Local Foot Clinic',
    industry: 'Foot Care',
    slug: 'foot-clinic-google-ads-3x-roas',
    services: ['gbp-rankings', 'website-design', 'google-ads'],
    servicesUsed: ['Google Business Profile', 'Website', 'Google Ads'],
    metrics: [
      { label: 'Return on ad spend', value: '3x', icon: TrendingUp },
      { label: 'On Google vs. 10+ year rivals', value: 'Page 1', icon: MapPin },
    ],
    description:
      'Gaps in the calendar, and rivals with 10+ years on Google. We fixed their profile, rebuilt the website with a page for every service, and built Google Ads that lead straight to booking.',
    result: 'Page 1 on Google and 3x return on ad spend.',
  },
  {
    title: 'Shawarma Restaurant in Barrie',
    industry: 'Restaurant',
    slug: 'shawarma-restaurant-barrie-top-3-google-maps',
    services: ['gbp-rankings'],
    servicesUsed: ['Google Business Profile'],
    metrics: [
      { label: 'On Google Maps in Barrie', value: 'Top 3', icon: MapPin },
      { label: '5-star reviews in 1 year', value: '600+', icon: Star },
    ],
    description:
      'Lost among fast food spots on Google. We fixed their Google Business Profile and set up a simple way to get reviews.',
    result: 'Top 3 on Google Maps and 600+ five-star reviews in one year.',
  },
  {
    title: 'New Physiotherapy Clinic',
    industry: 'Physiotherapy',
    slug: 'new-physiotherapy-clinic-number-1-google-ai',
    services: ['gbp-rankings', 'website-design'],
    servicesUsed: ['Google Business Profile', 'Website'],
    metrics: [
      { label: 'On Google for their services', value: 'Not found → #1', icon: MapPin },
      { label: 'In AI search answers', value: '#1', icon: Target },
    ],
    description:
      'Invisible on Google, with a website that didn’t feel like the clinic. We optimized their profile, rebuilt the website, and set it up for AI search.',
    result: '#1 for their services on Google and in AI answers.',
  },
  {
    title: 'Local Community Center',
    industry: 'Community & Religious',
    slug: 'community-center-number-1-google-reviews',
    services: ['gbp-rankings', 'website-design'],
    servicesUsed: ['Google Business Profile', 'Website'],
    metrics: [
      { label: 'In the whole city on Google', value: '#1', icon: MapPin },
      { label: '100% organic results', value: 'No ads', icon: Target },
    ],
    description:
      'Hard to find on Google, and its reviews went unanswered. We fixed their profile and website and took over review care.',
    result: '#1 in the city on Google, with no paid ads.',
  },
  {
    title: 'Local Butcher Shop and Afghan Restaurant',
    industry: 'Butcher & Restaurant',
    slug: 'butcher-shop-afghan-restaurant-google-categories',
    services: ['gbp-rankings'],
    servicesUsed: ['Google Business Profile'],
    metrics: [
      { label: 'For butcher searches', value: 'Top 3', icon: MapPin },
      { label: 'For Afghan restaurant searches', value: 'Top 3', icon: MapPin },
    ],
    description:
      'Google listed them as only a restaurant, so people looking for fresh meat never found them. We fixed their profile so Google understood both.',
    result: 'Top 3 on Google Maps for both butcher and Afghan restaurant searches.',
  },
  {
    title: 'Local Contractor',
    industry: 'Contracting',
    slug: 'contractor-word-of-mouth-to-found-on-google',
    services: ['gbp-rankings', 'website-design'],
    servicesUsed: ['Google Business Profile', 'Website'],
    metrics: [
      { label: 'On Google', value: 'Not found → Found', icon: MapPin },
      { label: 'Leads, wrong fits filtered out', value: 'Better fit', icon: Target },
    ],
    description:
      'Every job came from word of mouth, with no real online presence. We optimized their profile and built a website that attracts the right clients and filters out the wrong ones.',
    result: 'From word of mouth only to found on Google.',
  },
  // GBP studies come first on the home page. The add-on studies follow.
  {
    title: 'Local Taxi Company',
    industry: 'Taxi',
    slug: 'taxi-company-google-ads-50-percent-lower-cost-per-lead',
    services: ['website-design', 'google-ads'],
    servicesUsed: ['Website', 'Google Ads'],
    metrics: [
      { label: 'Cost per lead', value: '50% lower', icon: TrendingDown },
      { label: 'Steady leads', value: 'Day & night', icon: Target },
    ],
    description:
      'A website that brought in nothing, and a Google Ads budget that ran out early each day. We fixed the site, rebuilt the ads for every service, and spread the budget across the day.',
    result: 'Leads day and night at half the cost per lead.',
  },
  {
    title: 'Local Organic Cosmetics Manufacturer',
    industry: 'Beauty & Cosmetics',
    slug: 'organic-cosmetics-brand-amazon-to-shopify',
    services: ['website-design'],
    servicesUsed: ['Website'],
    metrics: [
      { label: 'A store they own', value: 'Amazon → Shopify', icon: Target },
      { label: 'Average order value up', value: 'Bigger orders', icon: TrendingUp },
    ],
    description:
      'Great products, but no brand of their own. We launched their Amazon listings, then moved them to their own Shopify store.',
    result: 'Their own store and bigger orders, with big retail stores in progress.',
  },
]

export function CaseStudies({
  serviceSlug = HOME_SERVICE_SLUG,
}: {
  /** Which service's studies to show. Defaults to the GBP offer. */
  serviceSlug?: string
}) {
  const isHome = serviceSlug === HOME_SERVICE_SLUG
  // Home shows every study (GBP first). Service pages show their own.
  const studies = isHome ? CASE_STUDIES : CASE_STUDIES.filter((s) => s.services.includes(serviceSlug))
  if (studies.length === 0) return null

  return (
    <SectionShell id="case-studies" tone="paper" className="overflow-hidden">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16 flex flex-col gap-8"
      >
        <div className="mx-auto max-w-2xl text-center">
          <motion.h2
            variants={fadeInUp}
            className="text-display-h2 font-display text-foreground"
          >
            {isHome ? 'Real problems we fixed for local businesses' : 'Results from this work'}
          </motion.h2>
          <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
            What was wrong, what we did, and what changed. Names are hidden
            until each client says we can share them.
          </motion.p>
        </div>
      </motion.div>

      <Carousel opts={{ align: 'start', loop: true }} className="w-full">
        <CarouselContent className="-ml-4">
          {studies.map((study, index) => (
            <CarouselItem key={index} className="pl-4 md:basis-1/2 lg:basis-1/3">
              <Card hover className="h-full">
                <CardContent className="flex h-full flex-col p-8">
                  <Pill tone="neutral" className="mb-4 w-fit">
                    {study.industry}
                  </Pill>

                  <h3 className="text-display-h3 font-display text-foreground">
                    {study.title}
                  </h3>

                  <div className="mt-3 flex flex-wrap gap-1.5">
                    {study.servicesUsed.map((s) => (
                      <span
                        key={s}
                        className="rounded-pill border border-line px-2.5 py-0.5 text-eyebrow text-muted-foreground"
                      >
                        {s}
                      </span>
                    ))}
                  </div>

                  <p className="mb-8 mt-4 flex-grow text-sm text-muted-foreground">
                    {study.description}
                  </p>

                  <div className="mb-8 grid grid-cols-2 gap-4">
                    {study.metrics.map((metric, mIndex) => (
                      <div key={mIndex} className="rounded-xl bg-muted p-4">
                        <metric.icon className="mb-2 h-4 w-4 text-primary" />
                        <div className="text-lg font-bold text-success">{metric.value}</div>
                        <div className="text-eyebrow text-muted-foreground">
                          {metric.label}
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-line pt-6">
                    <p className="text-sm font-semibold text-foreground">{study.result}</p>
                    <div className="mt-4 flex flex-wrap gap-x-5 gap-y-2">
                      <Link
                        href={mainSite(`/case-studies/${study.slug}`)}
                        className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
                      >
                        Read the case study
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                      {isHome && (
                        <Link
                          href="#pricing"
                          className="inline-flex items-center gap-1 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                        >
                          See the offer
                        </Link>
                      )}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </CarouselItem>
          ))}
        </CarouselContent>
        {/* Mobile controls: sized to a 44px tap target, not the 32px desktop default. */}
        <div className="mt-8 flex justify-center gap-3 md:hidden">
          <CarouselPrevious className="static size-11 translate-y-0" />
          <CarouselNext className="static size-11 translate-y-0" />
        </div>
        <CarouselPrevious className="hidden md:flex -left-12" />
        <CarouselNext className="hidden md:flex -right-12" />
      </Carousel>
      {isHome && (
        <div className="mt-8 text-center">
          <Link
            href={mainSite('/case-studies')}
            className="inline-flex items-center gap-1 text-sm font-medium text-primary transition-colors hover:text-primary/80"
          >
            See all case studies
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      )}
    </SectionShell>
  )
}
