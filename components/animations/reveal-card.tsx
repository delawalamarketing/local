'use client'

import { motion, useReducedMotion } from 'framer-motion'

import { easePremium } from './motion-variants'

/**
 * Individually-triggered card reveal: each card tilts up and forward as it
 * enters the viewport, rather than the whole group animating at once when the
 * section does.
 *
 * The difference matters on mobile. A stacked column of four cards is taller
 * than the viewport, so a section-level trigger animates cards two, three and
 * four while they are still off-screen - by the time you scroll to them the
 * motion has already happened and they just appear. Triggering per card means
 * each one actually reveals as you reach it.
 *
 * `amount: 0.3` fires when a third of the card is visible, which reads as
 * responsive without waiting for the full card on tall cards.
 *
 * Honours prefers-reduced-motion: the transform is dropped entirely and only a
 * short fade remains, because a rotating card is exactly the kind of motion
 * that triggers vestibular discomfort.
 */
export function RevealCard({
  children,
  className,
  index = 0,
}: {
  children: React.ReactNode
  className?: string
  /** Position within its group - adds a small cascade when several are visible together. */
  index?: number
}) {
  const reduceMotion = useReducedMotion()

  if (reduceMotion) {
    return (
      <motion.div
        className={className}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.3 }}
      >
        {children}
      </motion.div>
    )
  }

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, rotateX: -12 }}
      whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{
        duration: 0.65,
        delay: index * 0.06,
        ease: easePremium,
      }}
      style={{ transformPerspective: 900, transformOrigin: 'center top' }}
    >
      {children}
    </motion.div>
  )
}
