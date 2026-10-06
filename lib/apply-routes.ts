import { SITE } from '@/lib/site-config'

/**
 * The booking page. `noindex`, and only linked from this site's own pages, so
 * the offer copy on it is never the first thing a cold visitor lands on.
 * The old /gbp-apply path redirects here (next.config.mjs).
 */
export const APPLY_PATH = '/apply'

/**
 * Where every "book a call" link goes, and what it says. This site sells one
 * offer, so it is the same on every page.
 */
export const APPLY_CTA = {
  href: APPLY_PATH,
  label: SITE.cta.primary,
  shortLabel: SITE.cta.primaryShort,
} as const
