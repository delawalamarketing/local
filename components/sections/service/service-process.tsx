'use client'

import { motion } from 'framer-motion'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { cn } from '@/lib/utils'

export function ServiceProcess({ service }: { service: Service }) {
  const { process } = service

  /* Three phases in a hardcoded four-column grid left the row hanging off to
   * one side. Follow the actual count instead, and cap the three-up row so it
   * centres rather than stretching to the full container. */
  const isThreeUp = process.phases.length === 3

  return (
    <section id="process" className="py-20 sm:py-28 bg-muted">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {process.heading}
            </h2>
            {process.lead && (
              <p className="mt-4 text-lg text-muted-foreground">{process.lead}</p>
            )}
          </motion.div>

          <div
            className={cn(
              'grid gap-6 sm:grid-cols-2',
              isThreeUp ? 'mx-auto max-w-5xl lg:grid-cols-3' : 'lg:grid-cols-4',
            )}
          >
            {process.phases.map((phase) => (
              <motion.div
                key={phase.n}
                variants={fadeInUp}
                className="glass-card flex flex-col gap-4 rounded-2xl p-6 sm:p-7"
              >
                <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-primary font-bold text-primary-foreground">
                  {phase.n}
                </div>
                <div>
                  <h3 className="font-semibold text-foreground">{phase.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{phase.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
