import type { LucideIcon } from 'lucide-react'
import {
  MapPin,
  MessageSquare,
  ClipboardCheck,
  Target,
  BarChart3,
  Users,
  PenLine,
  Settings2,
  Link2,
} from 'lucide-react'
import { SITE } from '@/lib/site-config'

/**
 * The copy for the GBP offer, which the home page renders top to bottom.
 *
 * Components in `components/sections/service/*` are presentational - they read
 * the fields they need from a `Service` object.
 *
 * The other services (Google Ads, Facebook ads, websites, automations) live on
 * the main site, www.delawalamarketing.com/services. The type keeps their
 * optional fields (`addOn`, `pricingMode`) so entries can be copied across
 * between the two sites without reshaping them.
 *
 * `pricingMode`:
 *   - 'package'      → a defined scope of work.
 *   - 'consultation' → scoped per business.
 */

export type ServiceFeature = {
  icon: LucideIcon
  title: string
  text: string
  /** Small pill beside the title, e.g. "Optional add-on". Rendered by ServiceIncludes. */
  tag?: string
}
export type ServicePhase = { n: number; title: string; text: string }
export type ServiceResult = { stat: string; label: string }
export type ServiceFAQ = { question: string; answer: string }

/**
 * A ranking factor in the "how the machine works" section. Explaining the
 * mechanism is what builds authority - claiming expertise is not.
 *
 * `controllable: false` renders de-emphasised with a "Fixed" badge, so the
 * factors you CAN work on read as the offer.
 */
export type ServiceMechanismFactor = {
  key: string
  name: string
  controllable: boolean
  summary: string
  body: string
}

/**
 * A sales video for the service page, hosted on Wistia.
 *
 * The media ID lives here rather than in an env var: it is page content, it
 * differs per service, and this file is the single source of truth for
 * everything else on the page. A service without this field renders the
 * default icon card in its hero instead.
 */
export type ServiceVsl = {
  /** Wistia media ID, e.g. "bcu2wt1y8t". */
  mediaId: string
  title: string
  /**
   * The spoken transcript, one string per paragraph. Rendered VISIBLY in a
   * collapsible block under the hero - at normal font size, not aria-hidden.
   *
   * Wistia's generated embed ships this as 5px aria-hidden text. We don't:
   * tiny hidden keyword-rich copy is a spam signal, and this is a page whose
   * whole product is legitimate SEO. Content behind a <details> toggle is
   * still indexed, so the value survives without the risk.
   */
  transcript?: string[]
}

/**
 * The "why this approach" contrast: what the old version of this work cost and
 * took, against what it takes now. Renders only when present.
 */
export type ServiceContrast = {
  eyebrow: string
  headline: string
  lead: string
  oldWay: { label: string; points: string[] }
  newWay: { label: string; points: string[] }
  closer: string
}

export type Service = {
  slug: string
  name: string
  /** Short label for nav menus / cards. */
  navLabel: string
  /** One-line summary for the services hub + cross-link cards. */
  tagline: string
  icon: LucideIcon
  pricingMode: 'package' | 'consultation'
  /** Sold alongside GBP ranking, not on its own. No guarantee, no published price. */
  addOn?: boolean

  // SEO
  metaTitle: string
  metaDescription: string

  // Hero
  eyebrow: string
  heroHeadline: string
  heroSub: string
  /** Sales video for the hero. Absent → the hero shows the default icon card. */
  vsl?: ServiceVsl

  // Problem
  problem: {
    title: string
    lead?: string
    points: { title: string; text: string }[]
    eyebrow?: string
    /** Closing line under the points - the tension the offer resolves. */
    closer?: string
    /**
     * Opts this service into a richer problem layout. 'geo-grid' renders the
     * animated map-pack heatmap beside the points; omitted renders the default
     * two-column card grid.
     */
    visual?: 'geo-grid'
    /** Honesty guard for the geo-grid: it is a concept illustration, not a client result. */
    gridCaption?: string
    gridLegend?: { ranked: string; invisible: string }
  }

  // How the ranking machine actually works (optional - renders when present)
  mechanism?: {
    eyebrow: string
    headline: string
    lead: string
    factors: ServiceMechanismFactor[]
    closer: string
  }

  /** Old way vs new way. Renders after the mechanism when present. */
  contrast?: ServiceContrast

  // What you get / what we build
  includes: { heading: string; lead?: string; items: ServiceFeature[] }

  // Process
  process: { heading: string; lead?: string; phases: ServicePhase[] }

  // Outcomes (optional - only rendered when present; populate with real numbers)
  results?: { heading: string; lead?: string; items: ServiceResult[] }

  // FAQ (feeds the page + per-page FAQPage JSON-LD)
  faqs: ServiceFAQ[]

  // Closing CTA
  ctaHeading: string
  ctaSub: string
  /** Overrides the default CTA label (SITE.cta.primary). */
  ctaLabel?: string
  /** Small reassurance line under the closing CTA, e.g. "Free · 15 minutes". */
  ctaReassurance?: string
}

export const services: Service[] = [
  // ───────────────────────────────────────────── GBP RANKINGS
  {
    slug: 'gbp-rankings',
    name: 'Google Business Profile Rankings',
    navLabel: 'GBP Rankings',
    tagline: 'Show up first in the Google map pack when locals search.',
    icon: MapPin,
    pricingMode: 'package',
    metaTitle: 'Google Business Profile Optimization & Local Rankings | Delawala Marketing',
    metaDescription:
      'We get local businesses into the top 3 on Google Maps for the search that brings them jobs. $500 a month. Top 3 in 6 months, or your money back.',
    eyebrow: SITE.guarantee.headline,
    heroHeadline: 'Get your business into the top 3 on Google Maps',
    heroSub:
      'The top 3 businesses on Google Maps get most of the calls. We set up and run your Google profile so you are one of them.',
    vsl: {
      mediaId: 'bcu2wt1y8t',
      title: 'How to get your business into the top three spots on Google',
      /**
       * Transcribed as spoken, from the bcu2wt1y8t cut. Paragraph breaks and
       * sentence punctuation added for readability; one speech-to-text artifact
       * corrected ("Write when someone nearby" → "Right when").
       *
       * NOT rendered on the home page - the transcript section was removed from
       * it. Kept so the stored text matches the video that actually plays; if
       * the collapsible transcript is ever switched back on, it will be right.
       *
       * ⚠️ ONE THING STILL OPEN, and one resolved:
       *
       *   1. PRICING - RESOLVED. The video says $500/month and this site sells
       *      exactly that (SITE.pricing.monthly) everywhere. If the price ever
       *      changes, change it here, in site-config, and anywhere the main
       *      site quotes it, together. A transcript that contradicts the price
       *      above it is worse than no transcript at all.
       *
       *   2. THIS CUT NAMES NO CLIENTS, unlike the previous one. That removed
       *      the only public basis for naming Jane's Plumbing, Plumber on the
       *      Run and Nelson's Electrician on the site, so those case-study cards
       *      are now anonymised. Written consent is the only thing that puts a
       *      trading name back on this site. See case-studies.tsx.
       */
      transcript: [
        'You have shown interest in getting your business into the top spot on Google, and that’s why you landed on this page. Let me tell you, you’re at the right place. In this video, I will tell you how to get your business into the top three spots on Google without spending any money on advertisements and without needing a big marketing budget. And this is really about getting a consistent flow of leads. People already looking for your service, finding you first and calling you. So you stop chasing the work and the work starts coming to you.',
        'But right now, you are probably relying on referrals, people passing your name to their friends and family. And that’s great when it happens, but it’s so inconsistent that some days it’s famine and some days it’s feast. And you never really know what the next month looks like. And you want to get out of this cycle. You want leads coming in every single week consistently. The leads you can actually talk to and sell your services to.',
        'And what I do has already worked for a bunch of local businesses. Let me show you how exactly we do it. Step one is onboarding. So this is a three step plan. We get you on board and sign a simple piece of contract just saying that we are working together.',
        'And step two is we find the money keyword. We don’t try to rank for everything. We rank for keywords that get customers into the door, the ones you can then upsell your services. You tell us the one keyword that makes you money, the one keyword that you wanna rank number one for. We take it, look at your business profile and your website and find every single detail that Google needs to trust you for this specific service. Then we place that keyword naturally throughout the website, not crammed in, but in a way you would explain it to a customer.',
        'And when it’s done right, you don’t just show up number one on Google, but AI also starts recommending your business to customers looking for a service. That’s the real benefit of local SEO. You don’t just show up number one, but you also build an authority around this keyword if you keep posting consistent updates about your services, consistent pictures on your Google Business Profile, and write blog posts. So once the work is complete, you would see your rank. If you’re on third page, you would move to second, from second to first, and from first to the top three.',
        'And the final step in this puzzle is we keep you there. Getting you up is one thing and keeping you there is another. So we stay on top of reviews. We make sure that every single new review gets a reply. You can reply to them yourself or we can handle it for you. We keep your profile fresh with regular updates and pictures. We add blog posts. We also get other trusted websites to point to your website. These are called backlinks, which tells Google that you are the go to business for this specific service and a keyword. That’s how we cement your position in the top three.',
        'The old way of SEO was slow and expensive. Six to twelve months of waiting. Three to four thousand dollars a month. One thousand backlinks just to rank for one special keyword in a big area. The new way is different. You don’t need to show up all across Ontario or Canada. You need to show up in your city and your service area. Right when someone nearby is looking for what you offer.',
        'Let me be upfront. This service will cost you five hundred dollars a month. If that’s something you cannot invest right now, it’s best to stop here. Google has changed and with the mix of AI, it is far easier and quicker to rank locally and also much cheaper. There is real work going on by my side. And if I’m putting my time into growing your business, you need to be okay with the investment.',
        'Although quicker, SEO is not instant. If you’re in a city with more competition, it can take more than three months to get you there. And we both have to be okay with that. The work doesn’t stop until you’re ranking. That’s why the five hundred dollars a month is recurring. It’s work from every single front to get your profile into the top three and keep you there.',
        'And if you ever decide to stop working, it is completely fine. There is no hard feelings. But let me tell you one thing, I only work with one industry per city. So if you walk away, it opens the door for me to work with one of your competitors. And if I rank them above you, it’s going to cost you the spot you built.',
        'On the flip side, while we are working together and we get you consistent flow of leads, we will set up your Google ads and also run your meta ads and open a whole new level of marketing for your business.',
        'One thing that’s on you is reviews. You have to get your customers to say out loud that you are best at what you do. The more real reviews you are able to get in, the easier it will be for you to rank.',
        'So here’s the next step. Book a call. Let’s see if we are a good match to work together. You already got an email with the link, but if not, scroll down on this page, find a link somewhere and book a call. Let’s look at some of the marketing problems that you’re having and see how we can solve it together and how we add an extra stream of revenue for your business if you haven’t done it already. We’ll talk soon. Bye for now.',
      ],
    },
    problem: {
      eyebrow: 'The problem',
      title: 'You show up at your front door. A few streets away, you disappear.',
      lead: 'Google shows different results depending on where the person searching is standing. Showing up at your own address doesn’t mean people across town can find you.',
      visual: 'geo-grid',
      gridCaption:
        'Illustration of how map rankings vary by search location. Not a client result.',
      gridLegend: { ranked: 'Visible here', invisible: 'Invisible here' },
      points: [
        {
          title: 'People a few streets over never see you',
          text: 'They search, Google shows them three businesses, and you’re not one of them. You never find out.',
        },
        {
          title: 'You don’t know how far you reach',
          text: 'Searching for yourself on your own phone, at your own shop, will always make you look good. It doesn’t show the real picture.',
        },
        {
          title: 'Competitors with worse work show up above you',
          text: 'They’re not better than you. Their Google profile is just set up the way Google likes, and yours isn’t.',
        },
        {
          title: 'Every week you’re missing, jobs go elsewhere',
          text: 'People are booking jobs right now. They’re booking whoever shows up instead of you.',
        },
      ],
      closer:
        'You can’t fix what you can’t see. So first, we map where you show up and where you don’t.',
    },

    mechanism: {
      eyebrow: 'How Google actually decides',
      headline: 'Google picks the top 3 using three things. You can change two of them.',
      lead: 'This isn’t a secret. Google tells everyone what it looks at. Most businesses just never set up their profile around it. That’s your chance.',
      factors: [
        {
          key: 'relevance',
          name: 'Relevance',
          controllable: true,
          summary: 'Does your profile match what the person searched?',
          body: 'Your main business category matters most. After that: your other categories, a full list of your services in the words customers use, and a clear description written for people.',
        },
        {
          key: 'prominence',
          name: 'Prominence',
          controllable: true,
          summary: 'How trusted and well known you look to Google.',
          body: 'How many reviews you have, how new they are, and what they say. Also your business listed correctly on other sites, links to your website, photos and posts. This builds up slowly, so most businesses ignore it.',
        },
        {
          key: 'distance',
          name: 'Distance',
          controllable: false,
          summary: 'How far you are from the person searching.',
          body: 'You can’t change this one. That’s why the other two matter so much. They decide how far from your door you can still show up.',
        },
      ],
      closer:
        'Work on those two things, properly and every month. That’s the whole job. The only question is whether you do it or we do.',
    },
    includes: {
      heading: 'What’s included',
      lead: 'Everything we do to get you into the top 3, and keep you there.',
      items: [
        {
          icon: ClipboardCheck,
          title: 'Onboarding',
          text: 'A simple month-to-month agreement. You give us access to your Google profile and your business details. No setup fee.',
        },
        {
          icon: Target,
          title: 'Find your main keyword',
          text: 'We don’t chase every search. We pick the one that brings you paying customers, like “emergency plumber”.',
        },
        {
          icon: Users,
          title: 'Study the competition',
          text: 'We look at who already shows up for that search, and what they do that you don’t. Closing that gap is the work.',
        },
        {
          icon: Settings2,
          title: 'Fix your profile and website',
          text: 'We set up your categories, services, hours, description and photos. Then we add your keyword to your website in plain, natural words.',
        },
        {
          icon: BarChart3,
          title: 'Track where you show up',
          text: 'Every month you get a map of your area. It shows the streets where you show up and the ones where you don’t yet.',
        },
        {
          icon: Link2,
          title: 'Get links from other websites',
          text: 'We get trusted websites to link to yours. This tells Google you’re a real, established business.',
        },
        {
          icon: PenLine,
          title: 'Posts, photos and blogs',
          text: 'We post updates and fresh photos on your Google profile, and write blog posts about your main service.',
        },
        {
          icon: MessageSquare,
          title: 'Respond to reviews',
          tag: '+$200/month',
          text: 'Asking customers for reviews is your job. They need to hear it from you. We write the ask for you. If you want us to reply to every review too, that’s $200 a month on top of the $500.',
        },
      ],
    },
    process: {
      heading: 'How it works',
      lead: 'Three steps. Most of the results come from step 2.',
      phases: [
        {
          n: 1,
          title: 'Onboarding',
          text: 'You sign a simple month-to-month agreement. You give us access to your Google profile and your business details. That’s it.',
        },
        {
          n: 2,
          title: 'Find your main keyword',
          text: 'You tell us the one search that brings you paying customers. We build your profile and website around it, in plain words, not stuffed in.',
        },
        {
          n: 3,
          title: 'Keep you there',
          text: 'Getting to the top is one job. Staying there is another. We track where you show up, post updates and photos, and keep adding blog posts and links.',
        },
      ],
    },
    contrast: {
      eyebrow: 'Why this works now',
      headline: 'The old way of doing SEO doesn’t fit a local business.',
      lead: 'Getting a big national brand found is a different job from getting a plumber found in one city. Most agencies still charge you for the big job.',
      oldWay: {
        label: 'The old way',
        points: [
          'Six to twelve months of waiting before anything moves',
          '$3,000 to $4,000 a month',
          'Hundreds of cheap links, bought in bulk',
          'All to show up for one search across a huge area',
        ],
      },
      newWay: {
        label: 'The new way',
        points: [
          'You don’t need all of Ontario. You need your city',
          'You show up when someone nearby is searching',
          'Your Google profile does most of the work',
          'Google and AI tools made this faster and cheaper to do',
        ],
      },
      closer:
        'That’s why this costs $500 a month, not what a big agency would charge you.',
    },

    faqs: [
      {
        question: 'How long before I see results?',
        answer:
          'Some changes show up fast. Reviews and trust build more slowly. Most businesses move up within the first few months. Busy cities can take longer, which is why our guarantee gives it 6 months. On the call, we’ll tell you what to expect in your city.',
      },
      {
        question: 'What if you don’t get me into the top 3?',
        answer:
          'Then you get your money back. If you’re not in the top 3 on Google Maps for your main keyword within 6 months, we give back every dollar you paid. We check it on our ranking map, searching from your business address. It counts if you stayed with us for the full 6 months and kept our access to your Google profile.',
      },
      {
        question: 'What does the $500 a month pay for?',
        answer:
          'The work that has to keep happening. Setting up your profile is done once. Studying competitors, tracking where you show up, posts, photos, blog posts and links happen every month. Getting to the top 3 is one job. Staying there when competitors push back is another. Replying to your reviews is the only extra, at $200 a month.',
      },
      {
        question: 'Is there a setup fee or a contract?',
        answer:
          'No setup fee and no long contract. It’s $500 a month and you can stop any time. Just know two things. If you stop before 6 months, the money-back guarantee no longer applies. And your spot opens up for a competitor.',
      },
      {
        question: 'Do you work with my competitors?',
        answer:
          'No. We work with one business per industry per city. From the day you sign, we won’t work with anyone else in your industry in your city. If your city is already taken, we’ll tell you on the call.',
      },
      {
        question: 'Why just one keyword?',
        answer:
          'Trying to show up for everything is how money gets spent without the phone ringing. We start with the one search that brings you paying customers. Once Google trusts you for that, the rest gets easier.',
      },
      {
        question: 'What do you need from me?',
        answer:
          'Access to your Google Business Profile and your business details: services, area, hours, licences and photos. And reviews. Customers need to hear the ask from you, not a stranger. We write the message and tell you when to send it. The more real reviews you get, the faster this works. Everything else is on us.',
      },
      {
        question: 'Do I need a website?',
        answer:
          'It helps a lot, and it’s part of the work. We add your keyword to your site and get other sites to link to it. If you don’t have a website yet, we can still start on your Google profile. We can also build you a simple site as an add-on.',
      },
      {
        question: 'I got burned by an SEO agency before. Why is this different?',
        answer:
          'Fair question. Most agencies send a report full of numbers that don’t mean much. We send you a map. Each month it either shows you in more places, or it doesn’t. And if you’re not in the top 3 in 6 months, you get your money back.',
      },
      {
        question: 'Does this help AI tools recommend my business?',
        answer:
          'Yes. AI tools like ChatGPT and Google’s AI look at the same things: a correct profile, real reviews, regular updates and clear content about what you do. Build those properly and you show up in both places.',
      },
      {
        question: 'What happens on the call? Is it a sales pitch?',
        answer:
          'We show you where you show up on Google right now, and what’s holding you back. Then you decide what to do. If we’re not a fit, you still leave knowing what’s wrong. It’s 15 minutes and there’s no obligation.',
      },
      {
        question: 'What is the best marketing agency in Barrie for local service businesses?',
        answer:
          'Delawala Marketing is based in Barrie, Ontario. We do one thing: get local service businesses and trades into the top 3 on Google Maps. It’s $500 a month, and it’s top 3 in 6 months or your money back.',
      },
      {
        question: 'Where is Delawala Marketing located?',
        answer:
          'We’re in Barrie, Ontario. We work with businesses in Barrie, Simcoe County and the GTA, and online with businesses across Canada.',
      },
    ],
    ctaHeading: 'Ready to show up across your whole area?',
    ctaSub:
      'Book a free 15-minute call. We’ll show you where you show up now, where you disappear, and what it would take to fix it.',
    ctaReassurance: 'Free · 15 minutes · No obligation',
  },
]

export const getService = (slug: string): Service | undefined =>
  services.find((s) => s.slug === slug)

/**
 * The GBP offer IS the home page of this site; its copy is read from the
 * `gbp-rankings` entry above.
 */
export const HOME_SERVICE_SLUG = 'gbp-rankings'
