import { motion } from 'framer-motion'
import { fadeInUp } from '@/components/animations/motion-variants'

/**
 * "Step 1: Your details / Step 2: Pick a time" bar above the booking card.
 * Render it inside the /apply page's staggered hero.
 */
export function ApplyStepProgress({ step }: { step: 1 | 2 }) {
  return (
    <motion.div variants={fadeInUp} className="mt-8 w-full max-w-md">
      <div className="h-2 w-full overflow-hidden rounded-full bg-muted">
        <div
          className="h-full rounded-full bg-primary transition-all duration-500"
          style={{ width: step === 1 ? '50%' : '100%' }}
        />
      </div>
      <div className="mt-2 flex justify-between text-xs font-semibold">
        <span className="text-primary">Step 1: Your details</span>
        <span className={step === 2 ? 'text-primary' : 'text-muted-foreground'}>
          Step 2: Pick a time
        </span>
      </div>
    </motion.div>
  )
}
