'use client'

import { motion } from 'framer-motion'
import { Siren, HardHat, Snowflake, Stethoscope, Sparkles, Layers } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SectionShell } from '@/components/ui/section-shell'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'

/**
 * What owning one money keyword is worth, by trade.
 *
 * ⚠️ THIS IS NOT A TESTIMONIAL SECTION AND MUST NOT BECOME ONE.
 *
 * Every card here is ILLUSTRATIVE: this is what ranking for that search does
 * for that kind of business, not a claim that it happened for a client. That
 * distinction is the whole reason this section exists - it means the page can
 * show breadth without anyone needing to invent a case study.
 *
 * So: no business names, no metrics, no quotes, nothing in the past tense that
 * reads as a result we delivered. Real clients belong in case-studies.tsx, and
 * real quotes in reviews.tsx (still empty by design, pending written approval).
 */
const TRADES = [
  {
    icon: HardHat,
    trade: 'Roofing',
    keyword: 'roof repair',
    situation:
      'Most roofers chase replacements through ads and let repair searches go to whoever turns up first on the map.',
    benefit:
      'Repair jobs are searched in a hurry, close on the same call, and lead to the replacement later anyway. Owning that one search fills the calendar between the big jobs.',
  },
  {
    icon: Snowflake,
    trade: 'Ice and snow removal',
    keyword: 'ice removal',
    situation:
      'Entirely seasonal, and searched the morning of the storm by people who will not scroll.',
    benefit:
      'The whole year is decided in a handful of weeks. Being in the top three when the freeze hits is the difference between a full route and an empty one.',
  },
  {
    icon: Siren,
    trade: 'Emergency plumbing and electrical',
    keyword: 'emergency plumber',
    situation:
      'Searched once, under pressure, by someone with water on the floor or no power.',
    benefit:
      'Nobody compares quotes in an emergency. They call the first number they trust, which makes the top three worth more here than in almost any other trade.',
  },
  {
    icon: Stethoscope,
    trade: 'Clinics and practices',
    keyword: 'the treatment name',
    situation:
      'Patients search for what hurts, not for the name of a clinic they have never heard of.',
    benefit:
      'Every treatment you offer becomes its own way in. Rank for the specific thing you are good at and you get the patients who need exactly that.',
  },
  {
    icon: Sparkles,
    trade: 'New businesses with no reviews',
    keyword: 'your core service',
    situation:
      'Recently opened, barely registering, up against businesses with a decade of reviews behind them.',
    benefit:
      'A profile built properly competes long before the review count catches up. It is the fastest way for a new business to look established.',
  },
  {
    icon: Layers,
    trade: 'Two businesses, one roof',
    keyword: 'one for each side',
    situation:
      'A shop that is also a restaurant, a garage that also sells tires. One profile trying to be both, ranking for neither.',
    benefit:
      'Untangled, each side gets found for its own searches instead of blurring into a listing that confuses everybody.',
  },
]

export function WhoThisIsFor() {
  return (
    <SectionShell id="who-its-for" tone="paper">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="flex flex-col gap-12"
      >
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Who this is for</Eyebrow>
          <h2 className="mt-3 text-display-h2 font-display text-foreground text-balance">
            One keyword is worth something different to every trade.
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            The method does not change. What changes is which search we go after,
            and what owning it is actually worth to you.
          </p>
        </motion.div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {TRADES.map((t) => (
            <motion.div key={t.trade} variants={fadeInUp}>
              <Card hover className="h-full">
                <CardContent className="flex h-full flex-col gap-4 p-6 sm:p-8">
                  <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                    <t.icon className="h-6 w-6" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-foreground">{t.trade}</h3>
                    <p className="mt-1 text-eyebrow text-primary">
                      Money keyword: {t.keyword}
                    </p>
                  </div>

                  <p className="text-sm leading-relaxed text-muted-foreground">
                    {t.situation}
                  </p>
                  <p className="mt-auto border-t border-line pt-4 text-sm leading-relaxed text-foreground">
                    {t.benefit}
                  </p>
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </SectionShell>
  )
}
