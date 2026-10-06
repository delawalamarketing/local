'use client'

import Link from 'next/link'
import { motion } from 'framer-motion'
import { Phone, Mail } from 'lucide-react'
import { fadeInUp } from '@/components/animations/motion-variants'
import { APPLY_PATH } from '@/lib/apply-routes'
import { SITE, mainSite } from '@/lib/site-config'

type FooterLink = {
  href: string
  label: string
  external?: boolean
  route?: boolean
}

const footerLinks: FooterLink[] = [
  { href: '#process', label: 'How it works' },
  { href: '#pricing', label: 'The Offer & Pricing' },
  { href: '#faq', label: 'FAQ' },
  { href: mainSite('/case-studies'), label: 'Case Studies', route: true },
  { href: mainSite('/blog'), label: 'Blog', route: true },
  { href: APPLY_PATH, label: 'Book a call', route: true },
  { href: '/privacy', label: 'Privacy Policy', route: true },
  { href: '/terms', label: 'Terms of Service', route: true },
]

/* GBP ranking is this site; every other service has its page on the main site. */
const serviceLinks = [
  { href: '/', label: 'GBP Rankings' },
  { href: mainSite('/services/google-ads'), label: 'Google Ads' },
  { href: mainSite('/services/facebook-ads'), label: 'Facebook Ads' },
  { href: mainSite('/services/website-design'), label: 'Website Design' },
  { href: mainSite('/services/ai-automations'), label: 'AI Automations' },
]


/* Read from SITE so a badge can never contradict the pricing or guarantee copy. */
const trustBadges = [
  SITE.guarantee.short,
  SITE.terms.territory.replace(/\.$/, ''),
  SITE.reporting.short,
]

export function Footer() {
  const scrollToSection = (href: string) => {
    if (href.startsWith('#')) {
      const element = document.querySelector(href)
      if (element) {
        element.scrollIntoView({ behavior: 'smooth' })
      } else {
        // Not on the home page - redirect to the homepage section
        window.location.href = `/${href}`
      }
    }
  }

  return (
    <footer className="relative bg-ink text-on-ink">
      {/* pb clears the fixed MobileActionBar. <main> has its own padding,
        * but the footer is outside it and is the last thing on the page,
        * so without this the bar sits on top of the legal entity lines. */}
      <div className="mx-auto max-w-7xl px-4 pt-12 pb-[calc(6rem+env(safe-area-inset-bottom))] sm:px-6 lg:px-8 lg:pb-12">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={fadeInUp}
          className="flex flex-col gap-8"
        >
          {/* Main Footer Content */}
          <div className="flex flex-col gap-8 md:flex-row md:items-start md:justify-between">
            {/* Brand */}
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-2.5">
                <img
                  src="/logo.png"
                  alt="Delawala Marketing Logo"
                  className="h-7 w-7 rounded-md object-contain"
                />
                <span className="font-display text-xl font-bold tracking-tight text-on-ink">
                  Delawala Marketing
                </span>
              </div>
              <span className="text-sm text-on-ink-muted">
                {SITE.positioning}. {SITE.locationLine}
              </span>
              <div className="mt-3 flex flex-col gap-1.5">
                <a
                  href={`tel:${SITE.contact.phoneHref}`}
                  className="inline-flex items-center gap-2 text-sm text-on-ink-muted transition-colors hover:text-on-ink"
                >
                  <Phone className="h-4 w-4 text-signal" />
                  {SITE.contact.phone}
                </a>
                <a
                  href={`mailto:${SITE.contact.email}`}
                  className="inline-flex items-center gap-2 text-sm text-on-ink-muted transition-colors hover:text-on-ink"
                >
                  <Mail className="h-4 w-4 text-signal" />
                  {SITE.contact.email}
                </a>
              </div>
              <span className="mt-3 text-eyebrow text-signal">
                Currently accepting new clients
              </span>
            </div>

            {/* Services */}
            <div className="flex flex-col gap-3">
              <span className="text-eyebrow text-on-ink-muted">Services</span>
              {serviceLinks.map((service) => (
                <Link
                  key={service.href}
                  href={service.href}
                  className="text-sm text-on-ink-muted transition-colors hover:text-on-ink"
                >
                  {service.label}
                </Link>
              ))}
              <Link
                href={mainSite('/services')}
                className="text-sm font-medium text-signal transition-colors hover:text-signal-strong"
              >
                All services
              </Link>
            </div>

            {/* Links */}
            <div className="flex flex-wrap gap-x-6 gap-y-3 md:flex-col md:flex-nowrap md:items-start md:gap-y-3">
              {footerLinks.map((link) =>
                link.external ? (
                  <a
                    key={link.label}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-left text-sm text-on-ink-muted transition-colors hover:text-on-ink"
                  >
                    {link.label}
                  </a>
                ) : link.route ? (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="text-left text-sm text-on-ink-muted transition-colors hover:text-on-ink"
                  >
                    {link.label}
                  </Link>
                ) : (
                  <button
                    key={link.label}
                    onClick={() => scrollToSection(link.href)}
                    className="text-left text-sm text-on-ink-muted transition-colors hover:text-on-ink"
                  >
                    {link.label}
                  </button>
                ),
              )}
            </div>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4">
            {trustBadges.map((badge) => (
              <span
                key={badge}
                className="inline-flex items-center rounded-pill bg-white/5 px-3 py-1 text-xs font-mono text-on-ink-muted"
              >
                {badge}
              </span>
            ))}
          </div>

          {/* Copyright */}
          {/* Legal identity. The registered entity, not just the trade name -
            * the same values the Privacy Policy and Terms are built on, so the
            * footer and the policies cannot drift apart. Street address is
            * deliberately absent; the site publishes city and province only. */}
          <div className="flex flex-col gap-1 border-t border-line-ink pt-8">
            <p className="text-xs text-on-ink-muted">
              &copy; {new Date().getFullYear()} {SITE.legal.operatingName}. All
              rights reserved.
            </p>
            <p className="text-xs text-on-ink-muted">
              {SITE.legal.corporationName} o/a {SITE.legal.operatingName}
              <span aria-hidden="true"> &middot; </span>
              BIN {SITE.legal.bin}
            </p>
            <p className="text-xs text-on-ink-muted">{SITE.legal.cityProvince}</p>
          </div>
        </motion.div>
      </div>
    </footer>
  )
}
