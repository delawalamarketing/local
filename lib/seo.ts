import type { Metadata } from 'next'
import { SITE } from '@/lib/site-config'

/**
 * One place that builds a route's Metadata object.
 *
 * Next merges metadata shallowly: a page that declares its own `openGraph` or
 * `twitter` replaces the layout's wholesale rather than merging into it. Hand-
 * rolling those blocks per route is how `twitter.creator` silently disappeared
 * from /services/[slug] and /blog/[slug] - each set a twitter block without it.
 * Building them here keeps every route complete and consistent.
 *
 * `metadataBase` deliberately stays in app/layout.tsx: it is root-only.
 */
type BuildMetadataInput = {
  title: string
  description: string
  /** Route path with a leading slash, e.g. '/apply'. Use '/' for the homepage. */
  path: string
  keywords?: string[]
  ogType?: 'website' | 'article'
  /** Overrides the canonical derived from `path` (blog posts may set their own). */
  canonicalOverride?: string
  /**
   * Set for a route that has its own sibling `opengraph-image` file (today,
   * only /blog/[slug]). That file's image is injected automatically and must
   * not be pre-empted by the site-wide card below.
   */
  ownOgImage?: boolean
  /**
   * Absolute URL of a per-page social image (e.g. a case study's cover).
   * Falls back to the site-wide card when omitted. Also used for Twitter.
   */
  ogImage?: string
  noindex?: boolean
  article?: {
    publishedTime: string
    modifiedTime: string
    authors?: string[]
  }
}

/** Absolute URL for a route path. `/` collapses to the bare domain. */
export const absoluteUrl = (path: string): string =>
  path === '/' ? SITE.domain : `${SITE.domain}${path}`

export function buildMetadata({
  title,
  description,
  path,
  keywords,
  ogType = 'website',
  canonicalOverride,
  ownOgImage = false,
  ogImage,
  noindex = false,
  article,
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path)

  return {
    title,
    description,
    ...(keywords ? { keywords } : {}),
    alternates: {
      canonical: canonicalOverride ?? url,
    },
    openGraph: {
      type: ogType,
      title,
      description,
      url,
      siteName: SITE.name,
      locale: 'en_CA',
      // Next injects a sibling opengraph-image file's card automatically, but
      // an ANCESTOR segment's card is dropped the moment a route declares its
      // own openGraph - which every route here now does. So routes without
      // their own image file name the site-wide card explicitly; without this
      // they would share with no image at all. Routes that do have their own
      // file pass ownOgImage and omit `images`, because naming one here would
      // override the generated per-post card.
      ...(ownOgImage ? {} : { images: [ogImage ?? `${SITE.domain}/opengraph-image`] }),
      ...(article ?? {}),
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      creator: SITE.social.twitter,
      ...(ogImage ? { images: [ogImage] } : {}),
    },
    ...(noindex ? { robots: { index: false, follow: false } } : {}),
  }
}
