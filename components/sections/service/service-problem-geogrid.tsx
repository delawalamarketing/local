'use client'

import { motion } from 'framer-motion'
import { EyeOff, MapPin, Search, TrendingDown } from 'lucide-react'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { RevealCard } from '@/components/animations/reveal-card'
import { Eyebrow } from '@/components/ui/eyebrow'
import { HeatmapAnimation } from '@/components/ui/heatmap-animation'

const ICONS = [EyeOff, Search, TrendingDown, MapPin]

/**
 * The `visual: 'geo-grid'` variant of the problem section: it makes an
 * invisible problem visible. No CTA here on purpose - this section builds the
 * tension the offer resolves, and cashing it in early kills the sale.
 *
 * Rendered instead of ServiceProblem when the service opts in. Everything else
 * still gets the default card grid.
 */
export function ServiceProblemGeoGrid({ service }: { service: Service }) {
  const { problem } = service
  const legend = problem.gridLegend

  return (
    <section id="problem" className="py-20 sm:py-28 bg-muted">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        {/* The heading block is the only thing inside a variant-driven parent.
            The cards below sit OUTSIDE it on purpose: a parent that owns
            `variants` + `whileInView` takes control of every descendant motion
            component, which silently suppresses the cards' own viewport
            triggers. Keeping them out of that subtree is what makes the
            per-card reveal actually fire. */}
        <div className="flex flex-col gap-12">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: '-100px' }}
            variants={staggerContainer}
            className="mx-auto max-w-3xl text-center"
          >
            {problem.eyebrow && (
              <motion.div variants={fadeInUp}>
                <Eyebrow className="justify-center">{problem.eyebrow}</Eyebrow>
              </motion.div>
            )}
            <motion.h2
              variants={fadeInUp}
              className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance"
            >
              {problem.title}
            </motion.h2>
            {problem.lead && (
              <motion.p variants={fadeInUp} className="mt-4 text-lg text-muted-foreground">
                {problem.lead}
              </motion.p>
            )}
          </motion.div>

          <div className="grid gap-10 lg:grid-cols-2 lg:items-start lg:gap-14">
            <motion.figure
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.6 }}
              className="flex flex-col gap-4"
            >
              <div className="glass-card flex items-center justify-center rounded-2xl p-6">
                <HeatmapAnimation className="w-full max-w-sm" />
              </div>
              {legend && (
                <div className="flex flex-wrap items-center gap-4">
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-3 w-3 rounded-full bg-success" aria-hidden="true" />
                    {legend.ranked}
                  </span>
                  <span className="flex items-center gap-2 text-sm text-muted-foreground">
                    <span className="h-3 w-3 rounded-full bg-destructive" aria-hidden="true" />
                    {legend.invisible}
                  </span>
                </div>
              )}
              {/* Honesty guard: this is a concept illustration, not a client result. */}
              {problem.gridCaption && (
                <figcaption className="text-sm text-muted-foreground">
                  {problem.gridCaption}
                </figcaption>
              )}
            </motion.figure>

            {/* Each card reveals on its own as you scroll past it - see RevealCard. */}
            <div className="flex flex-col gap-4">
              {problem.points.map((point, i) => {
                const Icon = ICONS[i % ICONS.length]
                return (
                  <RevealCard
                    key={point.title}
                    index={i}
                    className="glass-card flex gap-4 rounded-2xl p-6"
                  >
                    <div className="flex h-11 w-11 flex-shrink-0 items-center justify-center rounded-xl bg-destructive/10 text-destructive">
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-foreground">{point.title}</h3>
                      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                        {point.text}
                      </p>
                    </div>
                  </RevealCard>
                )
              })}
            </div>
          </div>

          {problem.closer && (
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.6 }}
              className="mx-auto max-w-2xl text-center text-lg font-medium text-foreground"
            >
              {problem.closer}
            </motion.p>
          )}
        </div>
      </div>
    </section>
  )
}
