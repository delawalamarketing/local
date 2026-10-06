'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'
import { BookCallButton } from '@/components/ui/book-call-button'
import { SectionShell } from '@/components/ui/section-shell'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { SITE } from '@/lib/site-config'

export function LeadCapture() {
  return (
    <SectionShell
      id="lead-capture"
      tone="paper"
      className="relative bg-muted"
      containerClassName=""
    >
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
      >
        {/* One ask: book the call */}
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
          <h2 className="text-display-h2 text-balance font-display text-foreground">
            Ready to be one of the top 3 in your city?
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground">
            We work with one business per industry per city. Book a free
            15-minute call to check if your city is still open.
          </p>
          <div className="mt-8 flex flex-col sm:flex-row items-center justify-center gap-4">
            <BookCallButton size="lg" className="shadow-lg" />
            <Link
              href="#pricing"
              className="inline-flex items-center gap-1 text-sm font-medium text-primary hover:underline"
            >
              See the full offer
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            Prefer to talk now? Call{' '}
            <a
              href={`tel:${SITE.contact.phoneHref}`}
              className="font-medium text-primary-strong hover:underline"
            >
              {SITE.contact.phone}
            </a>
          </p>
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
