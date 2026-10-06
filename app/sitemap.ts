import { MetadataRoute } from 'next'
import { SITE } from '@/lib/site-config'

/**
 * Only the landing page. /apply is noindex and left out on purpose, and
 * /privacy and /terms are not pages anyone should find through search.
 * The blog, services and case studies are in the main site's sitemap.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE.domain,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 1,
    },
  ]
}
