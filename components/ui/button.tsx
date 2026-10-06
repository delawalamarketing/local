import * as React from 'react'
import { Slot } from '@radix-ui/react-slot'
import { cva, type VariantProps } from 'class-variance-authority'

import { cn } from '@/lib/utils'

const buttonVariants = cva(
  // NOTE: labels wrap rather than overflow. `whitespace-nowrap` here used to
  // force long CTAs ("Check Availability In Your Canadian Market") wider than
  // a 375px viewport, which gave the whole page horizontal scroll on mobile.
  // Heights are min-h so a wrapped label grows the button instead of spilling.
  // `shrink-0` stays: in a flex ROW it keeps the button at its content width
  // instead of squeezing the label onto three lines. It costs nothing in a
  // flex COLUMN (mobile), where width comes from the stretched cross axis.
  "inline-flex max-w-full shrink-0 items-center justify-center gap-2 text-balance text-center rounded-button text-sm font-medium transition-all duration-200 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none focus-visible:border-ring focus-visible:ring-ring/50 focus-visible:ring-[3px] aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
  {
    variants: {
      variant: {
        default:
          'bg-primary text-primary-foreground shadow-sm hover:bg-primary-strong hover:scale-[1.01]',
        destructive:
          'bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60',
        outline:
          'border border-line bg-transparent text-foreground hover:bg-muted dark:border-input dark:hover:bg-input/50',
        secondary:
          'bg-secondary text-secondary-foreground hover:bg-secondary/80',
        ghost:
          'hover:bg-accent hover:text-accent-foreground dark:hover:bg-accent/50',
        accent:
          'bg-signal text-ink shadow-sm hover:bg-signal-strong hover:scale-[1.01]',
        link: 'text-primary underline-offset-4 hover:underline',
      },
      size: {
        default: 'min-h-9 px-4 py-2 has-[>svg]:px-3',
        sm: 'min-h-8 rounded-button gap-1.5 px-3 py-1.5 has-[>svg]:px-2.5',
        lg: 'min-h-12 rounded-button px-7 py-2.5 text-base has-[>svg]:px-5',
        icon: 'size-9',
        'icon-sm': 'size-8',
        'icon-lg': 'size-10',
      },
    },
    defaultVariants: {
      variant: 'default',
      size: 'default',
    },
  },
)

function Button({
  className,
  variant,
  size,
  asChild = false,
  ...props
}: React.ComponentProps<'button'> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : 'button'

  return (
    <Comp
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }
