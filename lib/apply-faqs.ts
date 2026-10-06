import { SITE } from '@/lib/site-config'

/**
 * The /apply page's FAQs. Shared with that page's FAQPage JSON-LD, so the
 * structured data always matches what a visitor can see.
 */
export const applyFaqs: { question: string; answer: string }[] = [
  {
    question: 'How long does it take?',
    answer:
      'Some changes show up fast. Reviews and trust build more slowly. Most businesses move up within the first few months. Busy cities can take longer, which is why the guarantee gives it 6 months.',
  },
  {
    question: 'What does “top 3, or your money back” mean?',
    answer: `${SITE.guarantee.statement} ${SITE.guarantee.conditions}`,
  },
  {
    question: 'Why does the top 3 matter so much?',
    answer:
      'When someone searches for a service nearby, Google Maps shows three businesses first. Most people call one of those three. If you’re not there, most people never see you.',
  },
  {
    question: 'Is there a contract?',
    answer:
      'No long contract. It’s $500 a month and you can stop any time. If you stop before 6 months, the money-back guarantee no longer applies.',
  },
  {
    question: 'What do you need from me?',
    answer:
      'Access to your Google Business Profile and your business details. And reviews: customers need to hear the ask from you. We write the message and tell you when to send it. Everything else is on us.',
  },
  {
    question: 'Do you work with my competitors?',
    answer: SITE.terms.exclusivity,
  },
  {
    question: 'Do I need a website?',
    answer:
      'It helps, and it’s part of the work. If you don’t have one yet, we can still start on your Google profile. We can also build you a simple site as an add-on.',
  },
  {
    question: 'I already run Google Ads. Do I still need this?',
    answer:
      'Ads stop the day you stop paying. Showing up in the top 3 on Google Maps keeps bringing in calls for free. Most businesses do best with both, and you can lean less on ads once you rank.',
  },
  {
    question: 'What happens on the call?',
    answer:
      'It’s 15 minutes. We show you where you show up on Google right now, what’s holding you back, and whether your city is still open. Then you decide. No pressure.',
  },
]
