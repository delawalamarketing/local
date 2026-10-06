'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import {
  ArrowDown,
  Check,
  Lock,
  MapPin,
  Link2,
  ShieldCheck,
  Star,
  Target,
  X,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { StatItem } from '@/components/ui/stat-item'
import { Eyebrow } from '@/components/ui/eyebrow'
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion'
import { ApplyBooking } from '@/components/sections/apply/apply-booking'
import { ApplyLocation } from '@/components/sections/apply/apply-location'
import { ApplyStepProgress } from '@/components/sections/apply/apply-step-progress'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { applyFaqs } from '@/lib/apply-faqs'
import { SITE } from '@/lib/site-config'
import { cn } from '@/lib/utils'

/**
 * /apply: the GBP-offer booking page. Linked only from this site's own pages,
 * and noindex (see app/apply/page.tsx).
 *
 * Shaped like a guarantee-led booking page: the guarantee and the booking
 * form sit at the very top, and everything below exists to answer the
 * questions that stop someone booking - then send them back up.
 *
 * Two rules for this page:
 *   - No fake urgency. The only limit shown is the real one: one business per
 *     industry per city.
 *   - Every number is one we control (price, guarantee window, the city
 *     rule, call length). No invented client counts or ratings.
 */

const STATS = [
  { value: SITE.pricing.monthly, label: 'A month. No setup fee' },
  { value: `${SITE.guarantee.months} months`, label: 'To the top 3, or your money back' },
  { value: '1', label: 'Business per industry, per city' },
  { value: '15 min', label: 'Free call. No pressure' },
]

const PACKAGE = [
  {
    icon: MapPin,
    title: 'Your Google profile, set up and run',
    text: 'The listing that shows on Google Maps. We set it up the way Google likes and keep it active every month.',
    points: [
      'The right main category and services',
      'Hours, description and photos done properly',
      'Regular posts and fresh photos',
    ],
    others: 'Most agencies set it up once and forget it.',
  },
  {
    icon: Target,
    title: 'Your main keyword, everywhere it counts',
    text: 'We find the one search that brings you paying customers, then build your profile and website around it.',
    points: [
      'Keyword picked because it makes you money',
      'We study who already ranks for it',
      'Added to your website in plain words',
    ],
    others: 'Most agencies chase dozens of keywords that never ring the phone.',
  },
  {
    icon: Star,
    title: 'More reviews, with less effort',
    text: 'Reviews are a big part of how Google decides. You send the ask; we write it and tell you when.',
    points: [
      'Review request messages written for you',
      'Timing that gets more replies',
      'Optional: we reply to every review ($200/month)',
    ],
    others: 'Most agencies leave reviews completely up to you.',
  },
  {
    icon: Link2,
    title: 'Links, blogs and AI search',
    text: 'Other trusted websites linking to you tells Google, and AI tools like ChatGPT, that you’re the real deal.',
    points: [
      'Links from other trusted websites',
      'Blog posts about your main service',
      'Set up so AI tools can recommend you',
    ],
    others: 'Most agencies buy cheap links in bulk that do nothing.',
  },
]

function scrollToBooking() {
  document.querySelector('#book')?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export function GbpApplyClient() {
  const [step, setStep] = useState<1 | 2>(1)
  const bookingRef = useRef<HTMLDivElement>(null)
  const [bookingVisible, setBookingVisible] = useState(true)

  // Hide the sticky mobile button while the booking card is on screen.
  useEffect(() => {
    const el = bookingRef.current
    if (!el || typeof IntersectionObserver === 'undefined') return
    const observer = new IntersectionObserver(
      ([entry]) => setBookingVisible(entry.isIntersecting),
      { threshold: 0.15 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <>
      {/* 1. HERO + BOOKING */}
      <section className="relative overflow-hidden bg-background pt-28 pb-16 sm:pt-32">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-accent/40 via-background to-background" />

        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="flex flex-col items-center text-center"
          >
            <motion.span
              variants={fadeInUp}
              className="inline-flex items-center gap-2 rounded-full bg-success-subtle px-4 py-1.5 text-sm font-semibold text-foreground"
            >
              <ShieldCheck className="h-4 w-4 text-success" />
              {SITE.guarantee.short}
            </motion.span>

            <motion.h1
              variants={fadeInUp}
              className="mt-5 text-4xl font-bold leading-[1.05] tracking-tight text-foreground text-balance sm:text-5xl"
            >
              Top 3 on Google Maps in {SITE.guarantee.months} months
              <span className="mt-2 block text-primary">or you get every dollar back</span>
            </motion.h1>

            <motion.p
              variants={fadeInUp}
              className="mt-6 max-w-2xl text-lg leading-relaxed text-muted-foreground"
            >
              <span className="font-semibold text-foreground">Local service business owners:</span>{' '}
              if we don&apos;t get you into the top 3 on Google Maps for your main
              keyword within {SITE.guarantee.months} months, we give back{' '}
              <span className="font-semibold text-foreground">every dollar you paid</span>.
            </motion.p>

            {/* The only limit on this page is the real one. */}
            <motion.div
              variants={fadeInUp}
              className="mt-6 inline-flex items-center gap-2 rounded-xl border-2 border-primary/30 bg-card px-4 py-2.5 text-sm font-semibold text-foreground shadow-sm"
            >
              <Lock className="h-4 w-4 flex-shrink-0 text-primary" />
              One business per industry per city. Check if yours is still open.
            </motion.div>

            <ApplyStepProgress step={step} />
          </motion.div>

          <motion.div
            id="book"
            ref={bookingRef}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-8 scroll-mt-24"
          >
            <ApplyBooking
              step={step}
              onStepChange={setStep}
              source="gbp_apply_page"
              subtitle="Takes 30 seconds. We use it to check if your city is still open."
            />
          </motion.div>
        </div>
      </section>

      {/* 2. STATS BAR - facts we control, nothing invented */}
      <section className="border-y border-line bg-card py-10">
        <div className="mx-auto grid max-w-5xl grid-cols-2 gap-8 px-4 text-center sm:grid-cols-4 sm:px-6 lg:px-8">
          {STATS.map((s) => (
            <StatItem key={s.label} value={s.value} label={s.label} className="items-center" />
          ))}
        </div>
      </section>

      {/* 3. WHAT YOU GET */}
      <section className="bg-muted py-20 sm:py-24">
        <div className="mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="flex flex-col gap-12"
          >
            <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
              <Eyebrow className="justify-center">What you get</Eyebrow>
              <h2 className="mt-3 text-display-h2 font-display text-foreground text-balance">
                The Top 3 package
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                Everything it takes to get you into the top 3 on Google Maps, and
                keep you there. All for {SITE.pricing.monthly} a month.
              </p>
            </motion.div>

            <div className="grid gap-6 md:grid-cols-2">
              {PACKAGE.map((item, i) => (
                <motion.div
                  key={item.title}
                  variants={fadeInUp}
                  className="glass-card flex flex-col gap-4 rounded-2xl p-6 sm:p-8"
                >
                  <div className="flex items-center gap-3">
                    <span className="font-mono text-2xl font-bold text-primary/40">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <item.icon className="h-5 w-5" />
                    </div>
                  </div>
                  <div>
                    <h3 className="text-display-h3 font-display text-foreground">{item.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                  </div>
                  <ul className="flex flex-col gap-2">
                    {item.points.map((p) => (
                      <li key={p} className="flex items-start gap-2.5 text-sm text-foreground">
                        <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                        {p}
                      </li>
                    ))}
                  </ul>
                  <p className="mt-auto flex items-start gap-2 rounded-lg bg-destructive/5 px-3 py-2 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    {item.others}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div variants={fadeInUp} className="flex flex-col items-center gap-2 text-center">
              <Button size="lg" className="h-12 px-8 text-base shadow-lg" onClick={scrollToBooking}>
                Book your free map ranking call
                <ArrowDown className="h-4 w-4" />
              </Button>
              <p className="text-sm text-muted-foreground">
                We&apos;ll show you where you show up on Google right now. Free.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. FAQ - the same list feeds this page's FAQPage JSON-LD */}
      <section className="py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-center text-display-h2 font-display text-foreground">
            Questions and answers
          </h2>
          <Accordion type="single" collapsible className="mt-10 w-full">
            {applyFaqs.map((faq) => (
              <AccordionItem key={faq.question} value={faq.question} className="border-line">
                <AccordionTrigger className="text-left text-base font-semibold text-foreground hover:no-underline hover:text-primary-strong">
                  {faq.question}
                </AccordionTrigger>
                <AccordionContent className="leading-relaxed text-muted-foreground">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </section>

      {/* 5. CLOSING GUARANTEE */}
      <section className="bg-muted py-20 sm:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl border-2 border-success/40 bg-success-subtle p-8 text-center shadow-md sm:p-12">
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-success/20 text-success">
              <ShieldCheck className="h-8 w-8" />
            </div>
            <h2 className="text-display-h2 font-display text-foreground text-balance">
              Ready to be in the top 3 in {SITE.guarantee.months} months?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg font-medium text-foreground">
              {SITE.guarantee.statement}
            </p>
            <p className="mx-auto mt-3 max-w-2xl text-sm text-muted-foreground">
              {SITE.guarantee.conditions}
            </p>
            <Button size="lg" className="mt-8 h-12 px-8 text-base shadow-lg" onClick={scrollToBooking}>
              Book my free call now
              <ArrowDown className="h-4 w-4" />
            </Button>
            <p className="mt-4 text-xs font-medium text-muted-foreground">
              No long contract · No credit card · Money back if we don&apos;t deliver
            </p>
          </div>
        </div>
      </section>

      {/* 6. WHERE WE ARE */}
      <ApplyLocation />

      {/* Sticky mobile button - hidden while the booking card is on screen. */}
      <div
        className={cn(
          'fixed inset-x-0 bottom-0 z-50 border-t border-line bg-card/95 p-3 pb-[calc(0.75rem+env(safe-area-inset-bottom))] shadow-lg backdrop-blur-sm transition-transform duration-300 lg:hidden',
          bookingVisible ? 'translate-y-full' : 'translate-y-0',
        )}
        aria-hidden={bookingVisible}
      >
        <Button
          size="lg"
          className="h-12 w-full text-base"
          onClick={scrollToBooking}
          tabIndex={bookingVisible ? -1 : 0}
        >
          Book your free call
          <ArrowDown className="h-4 w-4" />
        </Button>
      </div>
    </>
  )
}
