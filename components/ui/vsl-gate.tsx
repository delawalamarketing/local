'use client'

import { useEffect, useRef, useState, type FormEvent } from 'react'
import { Lock, Play, Loader2 } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { VslEmbed } from '@/components/ui/vsl-embed'
import { captureUTM } from '@/lib/utm'
import { trackEvent } from '@/lib/analytics'

const STORAGE_KEY = 'dm_vsl_email'

/** The email a visitor used to unlock the video, or '' if none / unavailable. */
export function readVslEmail(): string {
  try {
    return window.localStorage.getItem(STORAGE_KEY) ?? ''
  } catch {
    return ''
  }
}

type VslGateProps = {
  /** Wistia media ID, passed through to VslEmbed. */
  mediaId: string
  title: string
}

/**
 * The sales video, behind an email opt-in.
 *
 * The visitor gives an email, we send them the step-by-step process, and the
 * player appears. Wistia's scripts only load after that, via VslEmbed.
 *
 * Two deliberate choices:
 *   - A visitor who already gave an email (stored in localStorage) skips the
 *     gate on return visits.
 *   - Delivery failures still unlock the video. The visitor did their part; a
 *     broken webhook is ours to fix, not theirs to be punished for. Only an
 *     invalid email (400) keeps the gate up.
 */
export function VslGate({ mediaId, title }: VslGateProps) {
  const [unlocked, setUnlocked] = useState(false)
  const [justUnlocked, setJustUnlocked] = useState(false)
  const [email, setEmail] = useState('')
  const [sending, setSending] = useState(false)
  const [error, setError] = useState('')
  const honeypotRef = useRef<HTMLInputElement>(null)

  useEffect(() => {
    if (readVslEmail()) setUnlocked(true)
  }, [])

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()
    const trimmed = email.trim()
    if (!trimmed) return

    setSending(true)
    setError('')

    try {
      const response = await fetch('/api/vsl-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          email: trimmed,
          honeypot: honeypotRef.current?.value ?? '',
          utm: captureUTM(),
          source: 'home_vsl',
        }),
      })
      if (response.status === 400) {
        setError('Please enter a valid email address.')
        setSending(false)
        return
      }
    } catch (err) {
      // eslint-disable-next-line no-console
      console.warn('[vsl-gate] submit failed', err)
    }

    trackEvent('vsl_optin', { content_name: title })
    try {
      window.localStorage.setItem(STORAGE_KEY, trimmed)
    } catch {
      // Storage unavailable (private mode). The gate simply shows again next visit.
    }
    setSending(false)
    setJustUnlocked(true)
    setUnlocked(true)
  }

  if (unlocked) {
    return (
      <div className="flex flex-col gap-3">
        <VslEmbed mediaId={mediaId} title={title} />
        {justUnlocked && (
          <p className="text-sm text-muted-foreground">
            Thanks! We&apos;ll email you the step-by-step process too.
          </p>
        )}
      </div>
    )
  }

  return (
    <div className="relative overflow-hidden rounded-card border border-line bg-ink shadow-md">
      {/* The video's own thumbnail, blurred, so the gate reads as "the video
        * is right here". Same swatch VslEmbed shows while loading. */}
      <div
        aria-hidden="true"
        className="absolute inset-0 scale-110 bg-cover bg-center opacity-60 blur-md"
        style={{
          backgroundImage: `url('https://fast.wistia.com/embed/medias/${mediaId}/swatch')`,
        }}
      />
      <div aria-hidden="true" className="absolute inset-0 bg-ink/70" />

      <div className="relative flex min-h-[340px] flex-col items-center justify-center gap-4 px-5 py-10 text-center sm:aspect-video sm:min-h-0 sm:px-10">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg">
          <Play className="ml-0.5 h-6 w-6 fill-current" />
        </div>
        <h2 className="max-w-lg text-xl font-bold text-on-ink sm:text-2xl">
          Watch how we&apos;ll get your business into the top 3 on Google
        </h2>
        <p className="max-w-md text-sm text-on-ink-muted sm:text-base">
          Enter your email to watch the video and get our step-by-step
          process, free.
        </p>

        <form
          onSubmit={handleSubmit}
          className="flex w-full max-w-md flex-col gap-2 sm:flex-row"
          noValidate
        >
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
          <Input
            type="email"
            required
            autoComplete="email"
            placeholder="Your email"
            aria-label="Your email"
            aria-invalid={error ? true : undefined}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 bg-card text-foreground"
          />
          <Button type="submit" size="lg" className="h-12 shrink-0" disabled={sending}>
            {sending ? <Loader2 className="h-4 w-4 animate-spin" /> : 'Watch the video'}
          </Button>
        </form>

        {error ? (
          <p role="alert" className="text-sm font-medium text-red-300">
            {error}
          </p>
        ) : (
          <p className="inline-flex items-center gap-1.5 text-xs text-on-ink-muted">
            <Lock className="h-3 w-3" />
            No spam. Unsubscribe any time.
          </p>
        )}
      </div>
    </div>
  )
}
