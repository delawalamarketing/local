'use client'

import { motion } from 'framer-motion'
import { Check, Plus, ShieldCheck } from 'lucide-react'
import { BookCallButton } from '@/components/ui/book-call-button'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SectionShell } from '@/components/ui/section-shell'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { SITE } from '@/lib/site-config'

/**
 * One price, stated plainly.
 *
 * The VSL names the number out loud and tells anyone who cannot invest it to
 * stop watching. The page should not then hide it behind a discovery call -
 * that would contradict the video a visitor has just watched, and the whole
 * pitch here is that we publish what the category keeps secret.
 */
export function Pricing() {
  return (
    <SectionShell id="pricing" tone="paper" className="bg-muted">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="flex flex-col items-center text-center"
      >
        <motion.div variants={fadeInUp}>
          <Eyebrow className="justify-center">What it costs</Eyebrow>
        </motion.div>

        <motion.h2
          variants={fadeInUp}
          className="mt-3 text-display-h2 font-display text-foreground text-balance"
        >
          One price. No setup fee. Cancel any time.
        </motion.h2>

        <motion.div
          variants={fadeInUp}
          className="mt-10 w-full max-w-2xl rounded-2xl border border-line bg-card p-8 text-left shadow-md sm:p-10"
        >
          <div className="flex flex-wrap items-baseline justify-center gap-2 text-center">
            <span className="font-mono text-5xl font-bold text-foreground">
              {SITE.pricing.monthly}
            </span>
            <span className="text-lg text-muted-foreground">/ month</span>
          </div>
          <p className="mt-3 text-center text-sm text-muted-foreground">
            {SITE.terms.note} {SITE.pricing.currencyNote}
          </p>

          <ul className="mt-8 flex flex-col gap-3">
            {SITE.included.map((item) => (
              <li key={item} className="flex gap-3 text-sm text-foreground">
                <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                <span>{item}</span>
              </li>
            ))}
          </ul>

          <div className="mt-6 border-t border-line pt-6">
            <p className="text-eyebrow text-muted-foreground">Optional extra</p>
            <ul className="mt-3 flex flex-col gap-3">
              {SITE.addOns.map((item) => (
                <li key={item} className="flex gap-3 text-sm text-muted-foreground">
                  <Plus className="mt-0.5 h-4 w-4 flex-shrink-0 text-muted-foreground" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="mt-8 flex items-start gap-2.5 rounded-xl bg-success-subtle px-4 py-3">
            <ShieldCheck className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
            <div>
              <p className="text-sm font-semibold text-foreground">
                {SITE.guarantee.statement}
              </p>
              <p className="mt-1 text-xs text-muted-foreground">
                {SITE.guarantee.conditions}
              </p>
            </div>
          </div>

          <div className="mt-8 flex flex-col items-center gap-3">
            <BookCallButton size="lg" className="h-12 w-full px-7 text-base sm:w-auto" />
            <p className="text-eyebrow text-muted-foreground">
              Nothing to pay today &middot; {SITE.terms.territory}
            </p>
          </div>
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
