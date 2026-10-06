'use client'

import type { ReactNode } from 'react'
import { motion } from 'framer-motion'
import { ArrowRight, ShieldCheck, MapPin, FileText } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { BookCallButton } from '@/components/ui/book-call-button'
import { SITE } from '@/lib/site-config'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'

type ServiceHeroProps = {
  service: Service
  /** Optional custom visual, e.g. the sales video. Sits under the headline. */
  visual?: ReactNode
}

/**
 * One centred column, at every width.
 *
 * The video sits directly under the headline rather than beside it. On a page
 * whose job is getting the video watched, a half-column player is the wrong
 * shape - full width under the headline gives it the presence it needs, and it
 * means mobile and desktop read in the same order instead of needing a
 * separate grid to reshuffle them.
 */
export function ServiceHero({ service, visual }: ServiceHeroProps) {
  const scrollToIncludes = () => {
    document.querySelector('#includes')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <section className="relative overflow-hidden bg-background pt-28 pb-20 sm:pt-32">
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />

      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          animate="visible"
          className="flex flex-col items-center text-center"
        >
          <motion.span
            variants={fadeInUp}
            className="inline-flex items-center gap-2 rounded-full bg-accent px-4 py-1.5 text-sm font-medium text-accent-foreground"
          >
            <service.icon className="h-4 w-4" />
            {service.eyebrow}
          </motion.span>

          <motion.h1
            variants={fadeInUp}
            className="mt-6 max-w-4xl text-4xl font-bold leading-[1.1] tracking-tight text-foreground text-balance sm:text-5xl"
          >
            {service.heroHeadline}
          </motion.h1>

          {/* Directly under the headline, before anything else asks for a decision. */}
          {visual && (
            <motion.div variants={fadeInUp} className="mt-10 w-full max-w-3xl">
              {visual}
            </motion.div>
          )}

          <motion.p
            variants={fadeInUp}
            className="mt-8 max-w-2xl text-lg leading-relaxed text-muted-foreground sm:text-xl"
          >
            {service.heroSub}
          </motion.p>

          <motion.div
            variants={fadeInUp}
            className="mt-8 flex flex-col items-center gap-3 sm:flex-row"
          >
            <BookCallButton size="lg" label={service.ctaLabel} className="h-12 px-7 text-base" />
            <Button
              onClick={scrollToIncludes}
              variant="ghost"
              size="lg"
              className="h-12 rounded-xl px-5 text-base text-primary hover:bg-accent"
            >
              See what&apos;s included
              <ArrowRight className="h-4 w-4" />
            </Button>
          </motion.div>

          {service.addOn ? (
            /* Add-ons carry no guarantee and no published price. Say so
             * rather than borrowing the GBP offer's chips. */
            <motion.p variants={fadeInUp} className="mt-8 text-sm text-muted-foreground">
              Add-on for Google Business Profile ranking clients. Priced on your call.
            </motion.p>
          ) : (
            <>
              <motion.div
                variants={fadeInUp}
                className="mt-8 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-sm text-muted-foreground"
              >
                <span className="inline-flex items-center gap-1.5">
                  <ShieldCheck className="h-4 w-4 text-success" />
                  {SITE.guarantee.short}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <FileText className="h-4 w-4 text-success" />
                  {SITE.reporting.short}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <MapPin className="h-4 w-4 text-primary" />
                  *{SITE.terms.territory}
                </span>
              </motion.div>

              {/* What the asterisk on the chip above means, spelled out rather than
                * left hanging. */}
              <motion.p variants={fadeInUp} className="mt-3 text-xs text-muted-foreground">
                * {SITE.terms.territoryNote}
              </motion.p>
            </>
          )}

          {/* Services with no video keep the icon card, centred like everything else. */}
          {!visual && (
            <motion.div
              variants={fadeInUp}
              className="glass-card mt-12 flex w-full max-w-md flex-col items-center gap-5 rounded-2xl p-10"
            >
              <div className="flex h-20 w-20 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                <service.icon className="h-10 w-10" />
              </div>
              <p className="text-lg font-semibold text-foreground">{service.name}</p>
              <p className="text-sm text-muted-foreground">{service.tagline}</p>
            </motion.div>
          )}
        </motion.div>
      </div>
    </section>
  )
}
