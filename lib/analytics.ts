import { track } from '@vercel/analytics'

export type AnalyticsEvent =
  | 'lead_form_step_1_completed'
  | 'lead_form_step_2_completed'
  | 'lead_submitted'
  | 'lead_submit_failed'
  | 'calendly_opened'
  | 'calendly_viewed'
  | 'calendly_date_time_selected'
  | 'discovery_call_booked'
  | 'vsl_play'
  | 'vsl_optin'

type EventProps = Record<string, string | number | boolean | null>

declare global {
  interface Window {
    dataLayer?: Record<string, unknown>[]
  }
}

export function trackEvent(name: AnalyticsEvent, props?: EventProps): void {
  if (typeof window === 'undefined') return

  if (process.env.NODE_ENV !== 'production') {
    // eslint-disable-next-line no-console
    console.log('[analytics]', name, props ?? {})
  }

  // Push to the GTM dataLayer so Google Tag Manager - and the GA4 / Meta Pixel
  // tags fired through it - can trigger on these custom events. Without this,
  // GTM never sees client-side conversions like a confirmed Calendly booking.
  try {
    window.dataLayer = window.dataLayer || []
    window.dataLayer.push({ event: name, ...(props ?? {}) })
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[analytics] dataLayer push failed', err)
  }

  try {
    track(name, props)
  } catch (err) {
    // eslint-disable-next-line no-console
    console.warn('[analytics] track failed', err)
  }
}
