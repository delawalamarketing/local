'use client'

import { motion } from 'framer-motion'
import { Check } from 'lucide-react'
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { SectionShell } from '@/components/ui/section-shell'
import { Eyebrow } from '@/components/ui/eyebrow'
import { SITE } from '@/lib/site-config'

const points = [
  'We only work with local service businesses and trades.',
  SITE.reporting.long,
  'We keep you ahead as Google and AI search keep changing.',
]

export function About() {
  return (
    <SectionShell id="about" tone="paper" className="bg-muted">
      <motion.div
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: '-100px' }}
        variants={staggerContainer}
        className="flex flex-col gap-10"
      >
        {/* Header sits above the photo/bio grid rather than in its second
          * column, so it lines up with every other section heading. */}
        <motion.div variants={fadeInUp} className="mx-auto max-w-3xl text-center">
          <Eyebrow className="justify-center">Who you&apos;re working with</Eyebrow>
          <h2 className="mt-3 text-display-h2 text-balance font-display text-foreground">
            Built and run by Rizwan Delawala
          </h2>
        </motion.div>

        <div className="grid max-w-4xl gap-10 sm:grid-cols-[auto_1fr] sm:items-start">
        <motion.div variants={fadeInUp} className="flex justify-center sm:justify-start">
          <Avatar className="h-28 w-28 border-2 border-primary/20 shadow-md">
            <AvatarImage
              src="/rizwan-delawala.png"
              alt="Rizwan Delawala, founder of Delawala Marketing"
              className="object-cover"
            />
            <AvatarFallback className="bg-primary/10 text-3xl font-bold text-primary">
              RD
            </AvatarFallback>
          </Avatar>
        </motion.div>

        <div className="flex flex-col gap-6">
          <motion.p variants={fadeInUp} className="text-lg leading-relaxed text-muted-foreground">
            I work with local service businesses and trades across Canada on one
            thing: getting them into the top 3 on Google Maps for the searches
            that bring in customers. You get a map every month, so you can see
            the progress yourself instead of taking my word for it. Owner to
            owner, no jargon, no excuses.
          </motion.p>
          <motion.ul variants={fadeInUp} className="flex flex-col gap-3 text-left">
            {points.map((p) => (
              <li key={p} className="flex items-start gap-3 text-foreground">
                <Check className="mt-0.5 h-5 w-5 flex-shrink-0 text-success" />
                <span>{p}</span>
              </li>
            ))}
          </motion.ul>
          </div>
        </div>
      </motion.div>
    </SectionShell>
  )
}
