'use client'

import { Calendar, Phone } from 'lucide-react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APPLY_PATH } from '@/lib/apply-routes'
import { SITE } from '@/lib/site-config'

/**
 * Persistent mobile-only Call/Book bar, in the spirit of brief §5 Nav.
 * Mounted on the home page; books via /apply.
 */
export function MobileActionBar() {
  return (
    // pb accounts for the iOS home-indicator safe area so the buttons
    // aren't sat on by the system gesture bar.
    <div className="fixed inset-x-0 bottom-0 z-50 flex gap-2 border-t border-line bg-card/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-sm lg:hidden">
      <Button asChild variant="outline" size="lg" className="flex-1">
        <a href={`tel:${SITE.contact.phoneHref}`}>
          <Phone className="h-4 w-4" />
          Call
        </a>
      </Button>
      <Button asChild size="lg" className="flex-[2]">
        <Link href={APPLY_PATH}>
          <Calendar className="h-4 w-4" />
          {SITE.cta.primaryShort}
        </Link>
      </Button>
    </div>
  )
}
