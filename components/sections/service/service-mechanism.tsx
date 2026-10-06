'use client'

import { motion } from 'framer-motion'
import { Award, Lock, MapPin, Target } from 'lucide-react'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { RevealCard } from '@/components/animations/reveal-card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { cn } from '@/lib/utils'

const ICONS: Record<string, typeof Target> = {
  relevance: Target,
  prominence: Award,
  distance: MapPin,
}

/**
 * Authority comes from explaining the machine, not from claiming expertise.
 * The uncontrollable factor is deliberately de-emphasised so the ones you CAN
 * work on read as the offer.
 *
 * Renders only when the service has a `mechanism` block.
 */
export function ServiceMechanism({ service }: { service: Service }) {
  const mech = service.mechanism
  if (!mech || mech.factors.length === 0) return null

  return (
    <section id="how-google-decides" className="py-20 sm:py-28 bg-muted/40">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        {/* Cards deliberately live outside the variant-driven heading wrapper,
            so their own whileInView triggers are not overridden. See the same
            note in service-problem-geogrid.tsx. */}
        <div className="flex flex-col gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            <motion.div variants={fadeInUp}>
              <Eyebrow className="justify-center">{mech.eyebrow}</Eyebrow>
            </motion.div>
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
            >
              {mech.headline}
            </motion.h2>
            <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
              {mech.lead}
            </motion.p>
          </motion.div>

          {/* Same per-card reveal as the problem section, for a consistent feel. */}
          <div className="grid gap-6 md:grid-cols-3">
            {mech.factors.map((factor, i) => {
              const Icon = ICONS[factor.key] ?? Target
              return (
                <RevealCard
                  key={factor.key}
                  index={i}
                  className={cn(
                    'glass-card flex flex-col gap-4 rounded-2xl p-6 sm:p-8',
                    !factor.controllable && 'bg-muted/50 shadow-none',
                  )}
                >
                  <div
                    className={cn(
                      'flex h-12 w-12 items-center justify-center rounded-xl',
                      factor.controllable
                        ? 'bg-primary/10 text-primary'
                        : 'bg-muted text-muted-foreground',
                    )}
                  >
                    <Icon className="h-6 w-6" />
                  </div>

                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-foreground">{factor.name}</h3>
                    {!factor.controllable && (
                      <span className="inline-flex items-center gap-1 rounded-pill bg-muted px-2 py-0.5 text-xs font-mono text-muted-foreground">
                        <Lock className="h-3 w-3" />
                        Fixed
                      </span>
                    )}
                  </div>

                  <p className="font-medium text-foreground">{factor.summary}</p>
                  <p className="text-sm leading-relaxed text-muted-foreground">{factor.body}</p>
                </RevealCard>
              )
            })}
          </div>

          <motion.p
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.6 }}
            className="mx-auto max-w-2xl text-center text-lg font-medium text-foreground"
          >
            {mech.closer}
          </motion.p>
        </div>
      </div>
    </section>
  )
}
