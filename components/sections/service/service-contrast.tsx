'use client'

import { motion } from 'framer-motion'
import { Check, X } from 'lucide-react'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { Eyebrow } from '@/components/ui/eyebrow'

/**
 * Old way vs new way.
 *
 * The job here is to justify the price before it is named. A prospect who has
 * been quoted $3-4k/month by an agency needs to understand why this costs a
 * fraction of that WITHOUT concluding it is a fraction of the work.
 *
 * Renders only when the service has a `contrast` block.
 */
export function ServiceContrast({ service }: { service: Service }) {
  const c = service.contrast
  if (!c) return null

  return (
    <section id="why-this-works" className="py-20 sm:py-28 bg-muted">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <Eyebrow className="justify-center">{c.eyebrow}</Eyebrow>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {c.headline}
            </h2>
            <p className="mt-4 text-lg text-muted-foreground">{c.lead}</p>
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2">
            {/* Old way - muted and struck through in tone, never mocking. The
             * reader may have paid for exactly this, and calling them a fool
             * is a bad way to open a sale. */}
            <motion.div
              variants={fadeInUp}
              className="flex flex-col gap-5 rounded-2xl border border-line bg-background/60 p-6 sm:p-8"
            >
              <p className="text-eyebrow text-muted-foreground">{c.oldWay.label}</p>
              <ul className="flex flex-col gap-3">
                {c.oldWay.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-muted-foreground">
                    <X className="mt-0.5 h-4 w-4 flex-shrink-0 text-destructive" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>

            <motion.div
              variants={fadeInUp}
              className="glass-card flex flex-col gap-5 rounded-2xl p-6 sm:p-8"
            >
              <p className="text-eyebrow text-primary">{c.newWay.label}</p>
              <ul className="flex flex-col gap-3">
                {c.newWay.points.map((point) => (
                  <li key={point} className="flex gap-3 text-sm text-foreground">
                    <Check className="mt-0.5 h-4 w-4 flex-shrink-0 text-success" />
                    <span>{point}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>

          <motion.p
            variants={fadeInUp}
            className="mx-auto max-w-2xl text-center text-lg font-medium text-foreground"
          >
            {c.closer}
          </motion.p>
        </motion.div>
      </div>
    </section>
  )
}
