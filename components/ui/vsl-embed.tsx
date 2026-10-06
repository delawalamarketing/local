'use client'

import { useEffect, useRef } from 'react'
import Script from 'next/script'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

type VslEmbedProps = {
  /** Wistia media ID, e.g. "bcu2wt1y8t". */
  mediaId: string
  /** Accessible label for the player, and the analytics content name. */
  title: string
  className?: string
}

/**
 * Wistia video, rendered with their native web component.
 *
 * Both scripts are mounted HERE rather than in app/layout.tsx, so Wistia only
 * loads on pages that actually show a video. next/script dedupes by `src`, so
 * two players on one page would still cost a single load.
 *
 * The player renders its own thumbnail and controls, which is what keeps
 * Wistia's analytics honest - impressions and play rate need the player
 * present on view, not mounted after a click.
 *
 * Never YouTube: it puts competitor videos and external branding on a sales page.
 */
export function VslEmbed({ mediaId, title, className }: VslEmbedProps) {
  const ref = useRef<HTMLElement>(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return
    const onPlay = () => trackEvent('vsl_play', { content_name: title })
    el.addEventListener('play', onPlay, { once: true })
    return () => el.removeEventListener('play', onPlay)
  }, [title])

  return (
    <>
      {/* Registers the <wistia-player> custom element. */}
      <Script src="https://fast.wistia.com/player.js" strategy="afterInteractive" />
      {/* Inlines this media's data so the player skips a round trip. Purely an
       * optimization - player.js fetches the same data on its own if this is
       * absent or fails. */}
      <Script
        src={`https://fast.wistia.com/embed/${mediaId}.js`}
        strategy="afterInteractive"
        type="module"
      />

      <div
        className={cn(
          'overflow-hidden rounded-card border border-line bg-ink shadow-md',
          className,
        )}
      >
        <wistia-player
          ref={ref}
          media-id={mediaId}
          aspect="1.7777777777777777"
          aria-label={title}
          /* Blurred swatch shown until the custom element is defined. The
           * structural half of this lives in globals.css under
           * `wistia-player:not(:defined)`; only the URL varies per video, so
           * only the URL is inline. */
          style={{
            backgroundImage: `url('https://fast.wistia.com/embed/medias/${mediaId}/swatch')`,
          }}
        />
      </div>
    </>
  )
}
