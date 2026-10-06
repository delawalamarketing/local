const DEFAULT_CALENDLY_URL =
  'https://calendly.com/rizwan-delawalamarketing/book-a-call'

interface CalendlyPrefill {
  name?: string
  email?: string
}

export function getCalendlyUrl(opts: CalendlyPrefill = {}): string {
  const base = process.env.NEXT_PUBLIC_CALENDLY_URL ?? DEFAULT_CALENDLY_URL
  const params = new URLSearchParams()
  if (opts.name) params.set('name', opts.name)
  if (opts.email) params.set('email', opts.email)
  const qs = params.toString()
  return qs ? `${base}?${qs}` : base
}
