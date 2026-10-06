'use client'

import { motion } from 'framer-motion'
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from '@/components/ui/accordion'
import type { Service } from '@/lib/services'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'

export function ServiceFAQ({ service }: { service: Service }) {
  if (service.faqs.length === 0) return null

  return (
    <section id="faq" className="py-20 sm:py-28 bg-muted">
      <div className="mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-100px' }}
          variants={staggerContainer}
          className="flex flex-col gap-10"
        >
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl text-balance">
              {service.addOn ? `Questions about ${service.name}` : 'Questions and answers'}
            </h2>
          </motion.div>

          {/* Narrow measure for readability, anchored left so the heading
            * above it and every other section heading share one edge. */}
          <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
            <Accordion type="single" collapsible className="glass-card rounded-2xl px-6">
              {service.faqs.map((faq) => (
                <AccordionItem key={faq.question} value={faq.question}>
                  <AccordionTrigger className="text-base font-semibold text-foreground">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-base leading-relaxed text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
