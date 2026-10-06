import { NextResponse, type NextRequest } from 'next/server'
import { vslLeadSchema } from '@/lib/validation'
import { rateLimit } from '@/lib/rate-limit'
import { postToFormspree } from '@/lib/formspree'

/**
 * The email gate in front of the sales video (components/ui/vsl-gate.tsx).
 *
 * Validates the submission and forwards it to Formspree. Sent from here rather
 * than the browser so the honeypot and rate limit still apply. The gate
 * unlocks the video on anything but a 400, so a Formspree failure only shows
 * up in the logs.
 */

const FORMSPREE_URL =
  process.env.FORMSPREE_VSL_URL ?? 'https://formspree.io/f/mjykqljk'

function getClientIp(req: NextRequest): string {
  const xff = req.headers.get('x-forwarded-for')
  if (xff) return xff.split(',')[0].trim()
  return req.headers.get('x-real-ip') ?? 'unknown'
}

export async function POST(req: NextRequest) {
  const ip = getClientIp(req)
  const limit = rateLimit(`vsl:${ip}`)
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

  const parsed = vslLeadSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json(
      { ok: false, error: 'Invalid payload', issues: parsed.error.issues },
      { status: 400 },
    )
  }

  if (parsed.data.honeypot && parsed.data.honeypot.length > 0) {
    return NextResponse.json({ ok: true })
  }

  const { email, source, utm } = parsed.data
  const result = await postToFormspree(FORMSPREE_URL, {
    email,
    _subject: 'New video sign-up',
    source: source ?? 'home_vsl',
    utm_source: utm?.source ?? '',
    utm_medium: utm?.medium ?? '',
    utm_campaign: utm?.campaign ?? '',
    utm_content: utm?.content ?? '',
    utm_term: utm?.term ?? '',
    page: req.headers.get('referer') ?? '',
    submitted_at: new Date().toISOString(),
  })

  if (!result.ok) {
    console.warn(
      `[vsl-lead] formspree failed: reason=${result.reason} status=${result.status ?? ''}`,
    )
    return NextResponse.json(
      { ok: false, error: 'Submission failed. Please try again.' },
      { status: 502 },
    )
  }

  return NextResponse.json({ ok: true })
}
