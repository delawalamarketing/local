'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import Link from 'next/link'
import { ArrowLeft, ArrowRight, Loader2, Lock } from 'lucide-react'
import { InlineWidget, useCalendlyEventListener } from 'react-calendly'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { readVslEmail } from '@/components/ui/vsl-gate'
import { getCalendlyUrl } from '@/lib/calendly'
import { captureUTM } from '@/lib/utm'
import { trackEvent } from '@/lib/analytics'
import { cn } from '@/lib/utils'

const TRADES = [
  'HVAC / heating & cooling',
  'Plumbing',
  'Electrical',
  'Roofing',
  'Windows & doors',
  'Garage doors',
  'Landscaping',
  'Cleaning',
  'Clinic (physio, chiro, dental, medical)',
  'Auto repair',
  'Other',
]

type Details = {
  name: string
  email: string
  phone: string
  business_name: string
  trade: string
  city: string
  profile_url: string
}

const EMPTY: Details = {
  name: '',
  email: '',
  phone: '',
  business_name: '',
  trade: '',
  city: '',
  profile_url: '',
}

const CalendlySpinner = () => (
  <div className="absolute inset-0 z-10 flex flex-col items-center justify-center gap-3 bg-card">
    <div className="h-8 w-8 animate-spin rounded-full border-3 border-primary border-t-transparent" />
    <p className="animate-pulse text-sm text-muted-foreground">Loading the calendar...</p>
  </div>
)

/**
 * The two-step booking card on /apply.
 *
 * Step 1 collects a few details; step 2 is the Calendly calendar, prefilled
 * with them. The details go to /api/lead. Like the video gate, a delivery
 * failure still moves the visitor on - only a 400 (bad input) keeps them on
 * step 1.
 *
 * Same form and calendar on both pages. `source` tags the lead and the
 * Calendly events so the two pages can be told apart; `subtitle` is the line
 * under the step 1 heading (the GBP page explains the city check, the generic
 * page must not).
 */
export function ApplyBooking({
  step,
  onStepChange,
  source,
  subtitle,
}: {
  step: 1 | 2
  onStepChange: (step: 1 | 2) => void
  source: 'apply_page' | 'gbp_apply_page'
  subtitle: string
}) {
  const [details, setDetails] = useState<Details>(EMPTY)
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  // Prefill the email a visitor gave to unlock the homepage video, if any.
  useEffect(() => {
    const email = readVslEmail()
    if (email) setDetails((d) => (d.email ? d : { ...d, email }))
  }, [])

  // Forward Calendly widget lifecycle events into the GTM dataLayer.
  // `discovery_call_booked` is the booking conversion - keep the name, GTM
  // triggers on it.
  useCalendlyEventListener({
    onProfilePageViewed: () => trackEvent('calendly_viewed', { source }),
    onDateAndTimeSelected: () =>
      trackEvent('calendly_date_time_selected', { source }),
    onEventScheduled: (e) =>
      trackEvent('discovery_call_booked', {
        source,
        eventUri: e.data.payload.event.uri,
        inviteeUri: e.data.payload.invitee.uri,
      }),
  })

  const set = (key: keyof Details) => (value: string) =>
    setDetails((d) => ({ ...d, [key]: value }))

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    setSending(true)
    setError('')

    try {
      const response = await fetch('/api/lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...details,
          honeypot: honeypotRef.current?.value ?? '',
          utm: captureUTM(),
          source,
        }),
      })
      if (response.status === 400) {
        setError('Please check your details. Every field except the link is needed.')
        setSending(false)
        trackEvent('lead_submit_failed', { reason: 'invalid' })
        return
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[apply-booking] submit failed', err)
    }

    trackEvent('lead_submitted', { source, trade: details.trade })
    setSending(false)
    onStepChange(2)
  }

  // A CLEAN Calendly URL: react-calendly adds its own embed params. Adding
  // ours as well broke the booking handshake once before.
  const calendlyUrl = getCalendlyUrl()

  return (
    <div className="overflow-hidden rounded-2xl border border-line bg-card shadow-xl">
      {step === 1 ? (
        <form onSubmit={handleSubmit} className="flex flex-col gap-4 p-6 sm:p-8" noValidate>
          <div>
            <p className="text-lg font-bold text-foreground">Step 1: Tell us about your business</p>
            <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>
          </div>

          {/* Honeypot: hidden from people, filled in by bots. */}
          <input
            ref={honeypotRef}
            type="text"
            name="company_url"
            tabIndex={-1}
            autoComplete="off"
            aria-hidden="true"
            className="sr-only"
            defaultValue=""
          />

          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Your first name" id="name" value={details.name} onChange={set('name')} autoComplete="given-name" />
            <Field label="Business name" id="business_name" value={details.business_name} onChange={set('business_name')} autoComplete="organization" />
            <Field label="Email" id="email" type="email" value={details.email} onChange={set('email')} autoComplete="email" />
            <Field label="Phone" id="phone" type="tel" value={details.phone} onChange={set('phone')} autoComplete="tel" />
            <div className="flex flex-col gap-1.5">
              <label htmlFor="trade" className="text-sm font-medium text-foreground">
                Your trade
              </label>
              <select
                id="trade"
                required
                value={details.trade}
                onChange={(e) => set('trade')(e.target.value)}
                className={cn(
                  'h-11 w-full rounded-md border border-input bg-background px-3 text-base shadow-xs outline-none md:text-sm',
                  'focus-visible:border-ring focus-visible:ring-[3px] focus-visible:ring-ring/50',
                  !details.trade && 'text-muted-foreground',
                )}
              >
                <option value="" disabled>
                  Pick one
                </option>
                {TRADES.map((t) => (
                  <option key={t} value={t} className="text-foreground">
                    {t}
                  </option>
                ))}
              </select>
            </div>
            <Field label="City you serve" id="city" value={details.city} onChange={set('city')} autoComplete="address-level2" />
          </div>

          <Field
            label="Google profile or website link (optional)"
            id="profile_url"
            value={details.profile_url}
            onChange={set('profile_url')}
            required={false}
            placeholder="https://"
          />

          {error && (
            <p role="alert" className="text-sm font-medium text-destructive">
              {error}
            </p>
          )}

          <Button type="submit" size="lg" className="h-12 w-full text-base" disabled={sending}>
            {sending ? (
              <Loader2 className="h-4 w-4 animate-spin" />
            ) : (
              <>
                Next: pick a time
                <ArrowRight className="h-4 w-4" />
              </>
            )}
          </Button>

          <p className="text-center text-xs text-muted-foreground">
            By continuing you agree to our{' '}
            <Link href="/terms" className="underline hover:text-foreground">
              Terms
            </Link>{' '}
            and{' '}
            <Link href="/privacy" className="underline hover:text-foreground">
              Privacy Policy
            </Link>
            .
          </p>
          <p className="inline-flex items-center justify-center gap-1.5 text-xs font-medium text-muted-foreground">
            <Lock className="h-3 w-3" />
            Private · No commitment · No credit card
          </p>
        </form>
      ) : (
        <div>
          <div className="flex items-center justify-between gap-3 border-b border-line px-5 py-3">
            <p className="text-sm font-bold text-foreground">Step 2: Pick a time for your call</p>
            <button
              type="button"
              onClick={() => onStepChange(1)}
              className="inline-flex items-center gap-1 text-xs font-medium text-muted-foreground hover:text-foreground"
            >
              <ArrowLeft className="h-3 w-3" />
              Edit details
            </button>
          </div>
          <div className="relative h-[700px] w-full">
            <InlineWidget
              url={calendlyUrl}
              prefill={{
                name: details.name || undefined,
                email: details.email || undefined,
              }}
              pageSettings={{ hideLandingPageDetails: true, hideGdprBanner: true }}
              styles={{ width: '100%', height: '100%', position: 'relative' }}
              LoadingSpinner={CalendlySpinner}
            />
          </div>
        </div>
      )}
    </div>
  )
}

function Field({
  label,
  id,
  value,
  onChange,
  type = 'text',
  required = true,
  autoComplete,
  placeholder,
}: {
  label: string
  id: string
  value: string
  onChange: (value: string) => void
  type?: string
  required?: boolean
  autoComplete?: string
  placeholder?: string
}) {
  return (
    <div className="flex flex-col gap-1.5">
      <label htmlFor={id} className="text-sm font-medium text-foreground">
        {label}
      </label>
      <Input
        id={id}
        name={id}
        type={type}
        required={required}
        autoComplete={autoComplete}
        placeholder={placeholder}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-11"
      />
    </div>
  )
}
