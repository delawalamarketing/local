'use client'

import { useEffect, useState } from 'react'
import { useTheme } from 'next-themes'
import { Toaster as Sonner, ToasterProps } from 'sonner'

/**
 * Below 1024px the MobileActionBar is fixed to the bottom of the viewport, so
 * bottom-anchored toasts land on top of the primary CTA. Sonner's own
 * `mobileOffset` only applies under 600px and offsets the stack rather than
 * reliably clearing a element of this height, so toasts move to the top on
 * small screens instead. The matching top offset lives in globals.css, keyed
 * to the same breakpoint the action bar uses.
 */
const COMPACT_QUERY = '(max-width: 1023.98px)'

const Toaster = ({ position = 'bottom-left', ...props }: ToasterProps) => {
  const { theme = 'system' } = useTheme()
  const [isCompact, setIsCompact] = useState(false)

  useEffect(() => {
    const mq = window.matchMedia(COMPACT_QUERY)
    const sync = () => setIsCompact(mq.matches)
    sync()
    mq.addEventListener('change', sync)
    return () => mq.removeEventListener('change', sync)
  }, [])

  return (
    <Sonner
      theme={theme as ToasterProps['theme']}
      position={isCompact ? 'top-center' : position}
      className="toaster group"
      style={
        {
          '--normal-bg': 'var(--popover)',
          '--normal-text': 'var(--popover-foreground)',
          '--normal-border': 'var(--border)',
        } as React.CSSProperties
      }
      {...props}
    />
  )
}

export { Toaster }
