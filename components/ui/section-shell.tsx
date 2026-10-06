import * as React from 'react'

import { cn } from '@/lib/utils'

type SectionShellProps = React.ComponentProps<'section'> & {
  tone?: 'paper' | 'ink' | 'transparent'
  containerClassName?: string
}

const toneClass: Record<NonNullable<SectionShellProps['tone']>, string> = {
  paper: 'bg-background text-foreground',
  ink: 'bg-ink text-on-ink',
  transparent: '',
}

function SectionShell({
  className,
  containerClassName,
  tone = 'paper',
  children,
  ...props
}: SectionShellProps) {
  return (
    <section
      data-slot="section-shell"
      data-tone={tone}
      className={cn('py-[var(--section-py)]', toneClass[tone], className)}
      {...props}
    >
      <div
        className={cn(
          'mx-auto w-full max-w-[1200px] px-[clamp(1.25rem,5vw,2rem)]',
          containerClassName,
        )}
      >
        {children}
      </div>
    </section>
  )
}

export { SectionShell }
