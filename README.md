# local.delawalamarketing.com

The Google Business Profile ranking offer: **$500/month, top 3 on Google Maps in
6 months, or your money back.** This site is the offer's landing page and its
booking page, and nothing else.

| Route | What it is |
|---|---|
| `/` | The offer landing page. Copy lives in the `gbp-rankings` entry in `lib/services.ts`. |
| `/apply` | Booking page: details form, then the Calendly calendar. `noindex`. |
| `/privacy`, `/terms` | Legal pages. `/terms` carries the Top 3 guarantee conditions. |
| `/gbp-apply` | Permanent redirect to `/apply` (the old path on the main site). |

## Relationship to the main site

The blog, services and case studies live on the main site,
**www.delawalamarketing.com**, which is a separate repo and Vercel project. Links
to it from this site are absolute; build them with `mainSite('/path')` from
`lib/site-config.ts`, never with a bare path. A bare path would point at this
domain, where those pages don't exist.

This site was split out of `delawalamarketing/v0-delawalamarketing-GBP-landing-page`
(branch `gbp-offer`, commit `e84b5b3`).

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

All are optional. Every one except Clarity has a working default in code.

| Variable | Used for | Default |
|---|---|---|
| `NEXT_PUBLIC_CALENDLY_URL` | Calendar on `/apply` (`lib/calendly.ts`) | `calendly.com/rizwan-delawalamarketing/book-a-call` |
| `FORMSPREE_GBP_APPLY_URL` | `/apply` details form, sent from `app/api/lead` | `formspree.io/f/moevorgn` |
| `FORMSPREE_VSL_URL` | Video email gate, sent from `app/api/vsl-lead` | `formspree.io/f/mjykqljk` |
| `NEXT_PUBLIC_GTM_ID` | Google Tag Manager | `GTM-5XNK87NW` |
| `NEXT_PUBLIC_GA_ID` | Google Analytics 4 | `G-HVDW3ZD8X1` |
| `NEXT_PUBLIC_CLARITY_ID` | Microsoft Clarity | none. Clarity is off until this is set. |

The Formspree forms are the same ones the main site used for `/gbp-apply` and
the video gate, so submissions keep landing in the same place.

### Sales video

No env var. The Wistia media ID lives with the rest of the page's copy, in the
service's `vsl` block in `lib/services.ts`. `components/ui/vsl-embed.tsx` loads
Wistia's `player.js` itself, so the scripts load only where a video is shown.

## Deploying (one-time setup)

1. **Vercel:** create a new project from `delawalamarketing/local`. The package
   manager is pnpm and the build settings stay at their defaults. The Framework
   Preset is pinned to Next.js in `vercel.json`, so it builds as Next.js even if
   the dashboard says "Other". Without that, the build succeeds but every page
   returns Vercel's `404 NOT_FOUND`. Then add the domain
   `local.delawalamarketing.com` under Settings → Domains.
2. **Cloudflare DNS** (the `delawalamarketing.com` zone): add a `CNAME` record
   from `local` to `cname.vercel-dns.com`. Set the proxy status to **DNS only**
   (grey cloud) so Vercel can issue the SSL certificate.
3. **Environment variables:** set `NEXT_PUBLIC_CLARITY_ID` in the Vercel project
   if you want Clarity. The rest only need setting to override a default.
4. **Analytics:** turn on Web Analytics and Speed Insights in the new Vercel
   project. The components are already in `app/layout.tsx`.
5. **Redeploy** after steps 3 and 4 (Deployments → ⋯ → Redeploy on the latest
   production deployment). `NEXT_PUBLIC_*` values are baked in at build time,
   and the Analytics and Speed Insights scripts only load on a deployment made
   after those features were turned on.

Pushes to `main` deploy to production.
