import { NextResponse, type NextRequest } from 'next/server'
import { leadSchema } from '@/lib/validation'
import { rateLimit } from '@/lib/rate-limit'
import { postToFormspree } from '@/lib/formspree'

/**
 * Step 1 of the /apply booking flow: the short details form shown before the
 * calendar (components/sections/apply/apply-booking.tsx).
 *
 * Validates the submission and forwards it to the GBP apply form on Formspree
 * - the same form /gbp-apply used on the main site, so leads keep landing in
 * one place. Sent from here rather than the browser so the honeypot and rate
 * limit still apply. The card moves on to the calendar on anything but a 400,
 * so a Formspree failure only shows up in the logs.
 */

const FORMSPREE_GBP_APPLY_URL =
  process.env.FORMSPREE_GBP_APPLY_URL ?? 'https://formspree.io/f/moevorgn'

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const limit = rateLimit(`lead:${ip}`)
  if (!limit.allowed) {
    return NextResponse.json(
      { ok: false, error: 'Too many requests. Try again later.' },
      {
        status: 429,
        headers: {
          'Retry-After': String(Math.ceil((limit.resetAt - Date.now()) / 1000)),
        },
      },
    )
  }

  let body: unknown
  try {
    body = await req.json()
  } catch {
    return NextResponse.json({ ok: false, error: 'Invalid JSON' }, { status: 400 })
  }

  const parsed = leadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid payload', issues: parsed.error.issues },
      { status: 400 },
    )
  }

  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { honeypot: _honeypot, utm, ...lead } = parsed.data

  const result = await postToFormspree(
    FORMSPREE_GBP_APPLY_URL,
    {
      name: lead.name,
      email: lead.email,
      phone: lead.phone,
      business_name: lead.business_name,
      trade: lead.trade,
      city: lead.city,
      profile_url: lead.profile_url ?? '',
      _subject: `New GBP apply: ${lead.business_name}`,
      source: lead.source ?? 'gbp_apply_page',
      utm_source: utm?.source ?? '',
      utm_medium: utm?.medium ?? '',
      utm_campaign: utm?.campaign ?? '',
      utm_content: utm?.content ?? '',
      utm_term: utm?.term ?? '',
      page: req.headers.get('referer') ?? '',
      submitted_at: new Date().toISOString(),
    },
  )

  if (!result.ok) {
    console.warn(
      `[lead] formspree failed: reason=${result.reason} status=${result.status ?? ''}`,
    )
    return NextResponse.json(
      { ok: false, error: 'Submission failed. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
