import * as React from 'react'

import { cn } from '@/lib/utils'

type EyebrowProps = React.ComponentProps<'p'> & {
  tone?: 'muted' | 'on-ink'
}

/**
 * No "signal" tone: amber text fails AA contrast on light backgrounds
 * (~1.75:1). The signature accent is reserved for ink backgrounds,
 * icons, and solid-fill badges - never as body/label text on paper.
 */
const toneClass: Record<NonNullable<EyebrowProps['tone']>, string> = {
  muted: 'text-muted-foreground',
  'on-ink': 'text-on-ink-muted',
}

function Eyebrow({ className, tone = 'muted', ...props }: EyebrowProps) {
  return (
    <p
      data-slot="eyebrow"
      className={cn('text-eyebrow', toneClass[tone], className)}
      {...props}
    />
  )
}

export { Eyebrow }
