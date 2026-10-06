'use client'

import type { ComponentProps } from 'react'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { APPLY_CTA } from '@/lib/apply-routes'
import { cn } from '@/lib/utils'

type BookCallButtonProps = {
  /** Override the button label. Defaults to the site's booking CTA copy. */
  label?: string
} & Omit<ComponentProps<typeof Button>, 'onClick'>

/** Primary conversion action. Goes to the booking page (see lib/apply-routes.ts). */
export function BookCallButton({ label, className, ...props }: BookCallButtonProps) {
  return (
    <Button asChild className={cn(className)} {...props}>
      <Link href={APPLY_CTA.href}>
        {label ?? APPLY_CTA.label}
      </Link>
    </Button>
  )
}
