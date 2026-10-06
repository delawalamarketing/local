import * as React from 'react'

import { cn } from '@/lib/utils'

type PillProps = React.ComponentProps<'span'> & {
  tone?: 'primary' | 'signal' | 'neutral' | 'on-ink'
}

/** "signal" is solid-fill (bg-signal + dark ink text) - the translucent
 * wash + amber-text pairing fails AA contrast on light surfaces. */
const toneClass: Record<NonNullable<PillProps['tone']>, string> = {
  primary: 'bg-accent text-accent-foreground',
  signal: 'bg-signal text-ink',
  neutral: 'bg-muted text-muted-foreground',
  'on-ink': 'bg-white/10 text-on-ink',
}

function Pill({ className, tone = 'primary', ...props }: PillProps) {
  return (
    <span
      data-slot="pill"
      className={cn(
        'inline-flex w-fit items-center gap-2 rounded-pill px-4 py-1.5 text-sm font-medium',
        toneClass[tone],
        className,
      )}
      {...props}
    />
  )
}

export { Pill }
