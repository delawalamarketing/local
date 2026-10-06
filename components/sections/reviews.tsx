'use client'

import { motion } from 'framer-motion'
import { Star, Quote } from 'lucide-react'
import { Card, CardContent } from '@/components/ui/card'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { fadeInUp, staggerContainer } from '@/components/animations/motion-variants'
import { SectionShell } from '@/components/ui/section-shell'

/**
 * REAL client reviews only.
 *
 * The fabricated placeholder testimonials were removed. Add an entry here ONLY
 * once the client has approved being quoted and named (see the outreach
 * template). Until at least one approved review exists this section renders
 * nothing - we never show invented quotes.
 *
 * Template to copy for each approved review:
 *   {
 *     name: 'First Last',
 *     role: 'Owner, Business Name',
 *     avatar: 'FL',            // initials
 *     content: 'Their exact words…',
 *     rating: 5,
 *   },
 */
type Review = {
  name: string
  role: string
  avatar: string
  content: string
  rating: number
}

const REVIEWS: Review[] = [
  // ── Awaiting client approval - paste real, approved quotes here. ──
]

export function Reviews() {
  if (REVIEWS.length === 0) return null

  return (
    <SectionShell id="reviews" tone="paper" className="bg-muted">
      <motion.div
        variants={staggerContainer}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className="mb-16 text-center"
      >
        <motion.h2
          variants={fadeInUp}
          className="text-display-h2 font-display text-foreground"
        >
          What owners say
        </motion.h2>
        <motion.p
          variants={fadeInUp}
          className="mx-auto mt-4 max-w-2xl text-lg text-muted-foreground"
        >
          Real local business owners, in their own words.
        </motion.p>
      </motion.div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
        {REVIEWS.map((review, index) => (
          <motion.div
            key={index}
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            transition={{ delay: index * 0.1 }}
          >
            <Card hover className="h-full">
              <CardContent className="flex h-full flex-col p-6">
                <div className="mb-4 flex gap-1">
                  {[...Array(review.rating)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 fill-signal text-signal" />
                  ))}
                </div>

                <Quote className="mb-4 h-8 w-8 text-primary/15" />

                <p className="mb-6 flex-grow text-sm text-muted-foreground">
                  &ldquo;{review.content}&rdquo;
                </p>

                <div className="flex items-center gap-3 border-t border-line pt-6">
                  <Avatar className="h-10 w-10 border border-primary/20">
                    <AvatarFallback className="bg-primary/10 font-bold text-primary">
                      {review.avatar}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="text-sm font-bold text-foreground">{review.name}</span>
                    <span className="text-eyebrow text-muted-foreground">{review.role}</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>
    </SectionShell>
  )
}
