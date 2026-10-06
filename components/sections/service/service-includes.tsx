'use client'

import { motion } from 'framer-motion'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'

export function ServiceIncludes({ service }: { service: Service }) {
  const { includes } = service

  return (
    <section id="includes" className="py-20 sm:py-28">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-12"
        >
          {/* A real h2 rather than the pill this used to be, so this section
            * reads as a section like every other one on the page. */}
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {includes.heading}
            </h2>
            {includes.lead && (
              <p className="mt-4 text-lg text-muted-foreground">{includes.lead}</p>
            )}
          </motion.div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {includes.items.map((item) => (
              <motion.div
                key={item.title}
                variants={fadeInUp}
                className="glass-card flex flex-col gap-4 rounded-2xl p-6 sm:p-7"
              >
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-primary/10 text-primary">
                  <item.icon className="h-6 w-6" />
                </div>
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="font-semibold text-foreground">{item.title}</h3>
                    {/* Anything not covered by the monthly fee says so here, on the
                      * card, rather than being discovered on the invoice. */}
                    {item.tag && (
                      <span className="rounded-pill border border-line px-2 py-0.5 text-eyebrow text-muted-foreground">
                        {item.tag}
                      </span>
                    )}
                  </div>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{item.text}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  )
}
