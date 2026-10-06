import type { DetailedHTMLProps, HTMLAttributes } from 'react'

/**
 * `<wistia-player>` is a custom element registered by Wistia's player.js at
 * runtime, so TypeScript has no idea it exists. Declare it here rather than
 * casting at every call site.
 *
 * React 19 moved the JSX namespace onto the `react` module, so the
 * augmentation target is `react`, not the old global `JSX`.
 */
declare module 'react' {
  namespace JSX {
    interface IntrinsicElements {
      'wistia-player': DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement> & {
        'media-id': string
        /** Width ÷ height. 1.777... for 16:9. */
        aspect?: string
      }
    }
  }
}
