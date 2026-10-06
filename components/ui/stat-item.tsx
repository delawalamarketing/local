import * as React from 'react'

import { cn } from '@/lib/utils'

type StatItemProps = {
  value: React.ReactNode
  label: React.ReactNode
  tone?: 'paper' | 'ink'
  className?: string
}

function StatItem({ value, label, tone = 'paper', className }: StatItemProps) {
  return (
    <div className={cn('flex flex-col gap-1.5', className)}>
      <span
        className={cn(
          'text-stat',
          tone === 'ink' ? 'text-on-ink' : 'text-foreground',
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          'text-eyebrow',
          tone === 'ink' ? 'text-on-ink-muted' : 'text-muted-foreground',
        )}
      >
        {label}
      </span>
    </div>
  )
}

export { StatItem }
