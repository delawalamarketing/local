import type { Metadata } from 'next'
import { LegalShell } from '@/components/layout/legal-shell'
import { SITE } from '@/lib/site-config'
import { buildMetadata } from '@/lib/seo'

export const metadata: Metadata = buildMetadata({
  path: '/privacy',
  title: 'Privacy Policy | Delawala Marketing',
  description:
    'How Delawala Marketing collects, uses, and protects your information.',
})

export default function PrivacyPage() {
  return (
    <LegalShell title="Privacy Policy" lastUpdated={SITE.legal.effectiveDate}>
      <p>
        This Privacy Policy explains how {SITE.legal.legalName} (&ldquo;
        {SITE.name},&rdquo; &ldquo;we,&rdquo; &ldquo;us,&rdquo; or &ldquo;our&rdquo;)
        collects, uses, and shares information when you visit our website or
        contact us. By using this website, you agree to the practices described
        here.
      </p>

      <h2>Information we collect</h2>
      <p>
        <strong>Information you provide.</strong> When you submit a form, sign up
        to watch our video, or book a call, we collect the details you give us,
        such as your name, business name, website, email address, phone number,
        and any information you include in your message.
      </p>
      <p>
        <strong>Information collected automatically.</strong> When you visit the
        site, we automatically collect certain technical and usage data, such as
        your IP address, device and browser type, pages viewed, referring source,
        and marketing campaign parameters (UTM tags). We use cookies and similar
        technologies, including analytics and session-recording tools, to gather
        this information.
      </p>

      <h2>How we use your information</h2>
      <ul>
        <li>To respond to your questions, schedule calls, and send you the guide you asked for.</li>
        <li>To provide, operate, and improve our services and this website.</li>
        <li>
          To follow up with you about our services, including by email and SMS
          where you have provided your details.
        </li>
        <li>To measure and improve marketing and site performance.</li>
        <li>To detect, prevent, and address fraud, abuse, or security issues.</li>
        <li>To comply with legal obligations.</li>
      </ul>

      <h2>Cookies and tracking technologies</h2>
      <p>
        We use cookies and similar technologies to operate the site, remember
        your preferences, understand how the site is used, and measure marketing
        performance. This may include third-party analytics and session-recording
        services. You can control cookies through your browser settings; disabling
        them may affect how the site functions.
      </p>

      <h2>How we share information</h2>
      <p>
        We do not sell your personal information. We share information only with:
      </p>
      <ul>
        <li>
          <strong>Service providers</strong> that help us run the site and our
          business, for example, hosting, analytics, scheduling, automation, and
          email/SMS providers, who process data on our behalf.
        </li>
        <li>
          <strong>Legal and safety</strong> recipients, when required by law or to
          protect our rights, users, or the public.
        </li>
        <li>
          <strong>Business transfers</strong>, in connection with a merger,
          acquisition, or sale of assets.
        </li>
      </ul>

      <h2>Data retention</h2>
      <p>
        We keep your information for as long as needed to provide our services,
        fulfill the purposes described in this policy, and comply with our legal
        obligations. We then delete or anonymize it.
      </p>

      <h2>Your choices and rights</h2>
      <p>
        You may request access to, correction of, or deletion of your personal
        information, and you can opt out of marketing communications at any time.
        Every marketing email includes an unsubscribe link. Depending on where you
        live, you may have additional rights under applicable privacy laws. To
        make a request, contact us at{' '}
        <a href={`mailto:${SITE.legal.contactEmail}`}>{SITE.legal.contactEmail}</a>.
      </p>

      <h2>Third-party links</h2>
      <p>
        Our site may link to third-party websites and services (such as our
        scheduling provider). We are not responsible for the privacy practices of
        those third parties, and we encourage you to review their policies.
      </p>

      <h2>Children&apos;s privacy</h2>
      <p>
        This website is intended for business owners and is not directed to
        children. We do not knowingly collect personal information from children.
      </p>

      <h2>Data security</h2>
      <p>
        We use reasonable administrative, technical, and organizational measures
        to protect your information. However, no method of transmission or storage
        is completely secure, and we cannot guarantee absolute security.
      </p>

      <h2>Changes to this policy</h2>
      <p>
        We may update this Privacy Policy from time to time. When we do, we will
        revise the &ldquo;Last updated&rdquo; date above. Your continued use of the
        site after changes take effect constitutes acceptance of the updated
        policy.
      </p>

      <h2>Contact us</h2>
      <p>
        If you have questions about this Privacy Policy or our data practices,
        contact us at{' '}
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
