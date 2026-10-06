'use client'

import { useEffect } from 'react'
import { toast } from 'sonner'
import { APPLY_PATH } from '@/lib/apply-routes'
import { SITE } from '@/lib/site-config'

/**
 * Rotating, factual trust messages - real activity only.
 *
 * Deliberately NOT fake "someone just booked" notifications. Every line below
 * is true, and the two lists are NOT interchangeable:
 *
 *   INBOUND_INTEREST - these businesses contacted us first. Only these may be
 *     phrased as showing interest, asking, or reaching out.
 *   WE_AUDITED - we prepared and sent these an audit unprompted. They never
 *     asked for anything. Phrasing these as "showed interest" or "requested
 *     info" would be a false claim about a named real business, so don't.
 *
 * Keep the lists accurate as the CRM grows. Never add a business we haven't
 * actually done the thing to, and move a name between lists only when the
 * underlying fact changes.
 */

// Businesses that contacted us first and asked for a free audit.
const INBOUND_INTEREST = [
  'AD Trades & Mechanical',
  'Hammertime Roofing',
  'STAT HVAC',
  'Go Lime',
]

// Local businesses we proactively prepared and sent a free audit to.
// They did not ask. Do not phrase these as interest.
const WE_AUDITED = [
  '1Click Heating & Cooling',
  'Affordable HVAC Solutions',
  'Air Makers Inc.',
  'Aire One East Heating & Cooling',
  'Aire One Heating & Cooling KW',
  'Aire One West Heating & Cooling',
  'Catalyst Health',
  'Fortitude Plumbing',
  'Guest Commercial & Residential Services',
  'Impact Healthcare',
  'iTeck Roofing',
  'Kohler Chiropractic Centre',
  'LG Home Comfort',
  'Little Lake Foot Clinic',
  'MAXgreen Roofing',
  'MAXgreen Windows',
  'Northwest Gas',
  'Ottawa Plumbing & Heating',
  'Peak Comfort HVAC',
  'Peter Inch & Associates',
  'PRICE Health',
  'Ramsay’s Doors',
  'Skyluxe Roofing & Sheet Metal',
  'Snelgrove Chiropractic Family Wellness Centre',
  'The Healing Theory',
  'The Roofing Master',
  'Thompson Chiropractic & Wellness',
  'Wiehler Plumbing & Heating',
  'Woodbridge GTA ClimateCare',
]

// Honest brand facts to mix into the rotation.
const BRAND_FACTS = [
  'One business per industry per city. Check if yours is open',
  `${SITE.guarantee.headline}`,
  `${SITE.pricing.monthly} a month, no setup fee, cancel any time`,
  SITE.reporting.long,
]

const MESSAGES = [
  // These businesses came to us and asked, so request-shaped wording is accurate.
  ...INBOUND_INTEREST.map((n) => `${n} requested a free online-presence audit`),
  // These we approached, so the claim stays on what we did, not what they wanted.
  ...WE_AUDITED.map((n) => `We just prepared a free visibility audit for ${n}`),
  ...BRAND_FACTS,
]

// Fisher–Yates shuffle so the rotation feels fresh on each visit.
function shuffle<T>(arr: T[]): T[] {
  const a = [...arr]
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[a[i], a[j]] = [a[j], a[i]]
  }
  return a
}

export function LiveSocialProof() {
  useEffect(() => {
    const queue = shuffle(MESSAGES)
    let index = 0

    const showToast = () => {
      toast(queue[index % queue.length], {
        // Sit long enough to be read comfortably.
        duration: 12000,
        // Give the visitor a way to act on it - straight to booking.
        action: {
          label: SITE.cta.primaryShort,
          onClick: () => {
            window.location.href = APPLY_PATH
          },
        },
      })
      index += 1
    }

    // First message after 8 seconds, then every ~40 seconds.
    const initialTimeout = setTimeout(showToast, 8000)
    const interval = setInterval(showToast, 40000)

    return () => {
      clearTimeout(initialTimeout)
      clearInterval(interval)
    }
  }, [])

  return null
}
