'use client'

import { motion } from 'framer-motion'
import { Lock } from 'lucide-react'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { BookCallButton } from '@/components/ui/book-call-button'
import { SectionShell } from '@/components/ui/section-shell'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SITE } from '@/lib/site-config'

export function Exclusivity() {
  return (
    <SectionShell id="exclusivity" tone="paper" className="bg-muted">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="flex flex-col items-center gap-5 text-center"
      >
        <motion.div
          variants={fadeInUp}
          className="flex h-14 w-14 items-center justify-center rounded-2xl bg-primary/10 text-primary"
        >
          <Lock className="h-7 w-7" />
        </motion.div>
        <motion.div variants={fadeInUp}>
          <Eyebrow className="justify-center">Your exclusive market</Eyebrow>
        </motion.div>
        <motion.h2
          variants={fadeInUp}
          className="mx-auto max-w-2xl text-display-h2 text-balance font-display text-foreground"
        >
          We don&apos;t work with your competitor.
        </motion.h2>
        <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">
          We work with one business per industry per city. From the day you
          sign, we won&apos;t work with anyone else in your industry in your
          city. It&apos;s written into your agreement.
        </motion.p>
        <motion.p variants={fadeInUp} className="mx-auto max-w-2xl text-lg text-muted-foreground">
          It works both ways, so we&apos;ll say it now. If you leave, your spot
          opens back up. If we then rank a competitor there, you lose the spot
          you spent months building.
        </motion.p>
        <motion.div variants={fadeInUp}>
          <BookCallButton size="lg" label={SITE.cta.exclusivityCheck} />
        </motion.div>
      </motion.div>
    </SectionShell>
  )
}
