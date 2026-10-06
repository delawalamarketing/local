import type { Metadata } from 'next'
import { LegalShell } from '@/components/layout/legal-shell'
import { SITE } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  path: '/terms',
  title: 'Terms of Service | Delawala Marketing',
  description: 'The terms that govern your use of the Delawala Marketing website.',
})

export default function TermsPage() {
  return (
    <LegalShell title="Terms of Service" lastUpdated={SITE.legal.effectiveDate}>
      <p>
        These Terms of Service (&ldquo;Terms&rdquo;) govern your access to and use
        of the {SITE.name} website (the &ldquo;Site&rdquo;), operated by{' '}
        {SITE.legal.legalName}. By accessing or using the Site, you agree to be
        bound by these Terms. If you do not agree, please do not use the Site.
      </p>

      <h2>Use of the website</h2>
      <p>
        You may use the Site for lawful purposes only. You agree not to misuse the
        Site, interfere with its operation, attempt to gain unauthorized access,
        or use it in any way that could harm us or any other party.
      </p>

      <h2>Marketing claims and results</h2>
      <p>
        The case studies on the Site describe real client work. Every business
        starts from a different place, so your results may be different. Results
        depend on your market, your industry and how much you take part, for
        example in asking customers for reviews. Google decides its own rankings,
        and we do not control them. The Site does not create a binding offer.
      </p>

      {/* Mirrors SITE.guarantee word for word. If one changes, change both - a
        * promise on the page that the Terms do not back up is worse than not
        * making the promise at all. */}
      <h2>The Top 3 guarantee</h2>
      <p>{SITE.guarantee.statement}</p>
      <p>
        <strong>How we measure it.</strong> Your main keyword is the search we
        agree on together when you sign up. &ldquo;Top 3&rdquo; means your
        business appears in the top three Google Maps results for that keyword,
        searched from your business address, as shown on the ranking map we send
        you.
      </p>
      <p>
        <strong>When it applies.</strong> The guarantee applies if you stayed
        subscribed for the full {SITE.guarantee.months} months in a row and kept
        our access to your Google Business Profile and your business details up
        to date. Services are billed monthly with no minimum term, so you can stop
        at any time, but stopping before {SITE.guarantee.months} months ends the
        guarantee.
      </p>
      <p>
        <strong>How to claim it.</strong> Email us at{' '}
        <a href={`mailto:${SITE.legal.contactEmail}`}>{SITE.legal.contactEmail}</a>{' '}
        within 30 days after the end of your {SITE.guarantee.months}th month. If the
        guarantee applies, we refund every dollar you paid for the service.
      </p>

      <h2>Exclusivity</h2>
      <p>{SITE.terms.exclusivity}</p>

      <h2>Intellectual property</h2>
      <p>
        The Site and its content, including text, graphics, logos, and design,
        are owned by {SITE.legal.legalName} or its licensors and are protected by
        intellectual property laws. You may not copy, reproduce, or distribute any
        part of the Site without our prior written permission.
      </p>

      <h2>Third-party links and services</h2>
      <p>
        The Site may contain links to third-party websites and services (such as
        our scheduling provider). We do not control and are not responsible for
        the content, policies, or practices of those third parties.
      </p>

      <h2>Disclaimer of warranties</h2>
      <p>
        The Site is provided on an &ldquo;as is&rdquo; and &ldquo;as
        available&rdquo; basis, without warranties of any kind, whether express or
        implied, including warranties of merchantability, fitness for a particular
        purpose, and non-infringement. We do not warrant that the Site will be
        uninterrupted, secure, or error-free.
      </p>

      <h2>Limitation of liability</h2>
      <p>
        To the fullest extent permitted by law, {SITE.legal.legalName} will not be
        liable for any indirect, incidental, special, consequential, or punitive
        damages, or any loss of profits or revenue, arising out of or related to
        your use of the Site.
      </p>

      <h2>Indemnification</h2>
      <p>
        You agree to indemnify and hold harmless {SITE.legal.legalName} and its
        team from any claims, losses, or expenses arising out of your use of the
        Site or your violation of these Terms.
      </p>

      <h2>Governing law</h2>
      <p>
        These Terms are governed by the laws of {SITE.legal.governingLaw}, without
        regard to its conflict-of-law principles.
      </p>

      <h2>Changes to these terms</h2>
      <p>
        We may update these Terms from time to time. When we do, we will revise
        the &ldquo;Last updated&rdquo; date above. Your continued use of the Site
        after changes take effect constitutes acceptance of the updated Terms.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have questions about these Terms, contact us at{' '}
        <a href={`mailto:${SITE.legal.contactEmail}`}>{SITE.legal.contactEmail}</a>.
      </p>

      {/* Names the registered entity outright, so a reader can identify the
        * company without parsing it out of a clause. City and province only -
        * the street address goes only in marketing emails, where CASL requires it. */}
      <h2>Legal entity</h2>
      <p>
        {SITE.legal.operatingName} is a trade name of{' '}
        <strong>{SITE.legal.corporationName}</strong>, a corporation registered in
        Canada.
      </p>
      <ul>
        <li>Corporation: {SITE.legal.corporationName}</li>
        <li>Operating as: {SITE.legal.operatingName}</li>
        <li>BIN: {SITE.legal.bin}</li>
        <li>{SITE.legal.cityProvince}</li>
        <li>
          <a href={`mailto:${SITE.legal.contactEmail}`}>{SITE.legal.contactEmail}</a>
        </li>
      </ul>
    </LegalShell>
  )
}
