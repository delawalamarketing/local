'use client'

import { notFound } from 'next/navigation'
import { ServiceHero } from '@/components/sections/service/service-hero'
import { ServiceProblemGeoGrid } from '@/components/sections/service/service-problem-geogrid'
import { ServiceMechanism } from '@/components/sections/service/service-mechanism'
import { ServiceContrast } from '@/components/sections/service/service-contrast'
import { ServiceProcess } from '@/components/sections/service/service-process'
import { ServiceIncludes } from '@/components/sections/service/service-includes'
import { ServiceFAQ } from '@/components/sections/service/service-faq'
import { CaseStudies } from '@/components/sections/case-studies'
import { Reviews } from '@/components/sections/reviews'
import { WhoThisIsFor } from '@/components/sections/who-this-is-for'
import { Pricing } from '@/components/sections/pricing'
import { Exclusivity } from '@/components/sections/exclusivity'
import { About } from '@/components/sections/about'
import { LeadCapture } from '@/components/sections/lead-capture'
import { VslGate } from '@/components/ui/vsl-gate'
import { getService, HOME_SERVICE_SLUG } from '@/lib/services'

/**
 * The home page body: the GBP offer, top to bottom.
 *
 * This is a CLIENT boundary on purpose. The service data carries Lucide icon
 * components, which cannot cross the Server → Client serialization boundary as
 * props - so the service is resolved here rather than in app/page.tsx and
 * handed down. Same reasoning as ServiceDetail; see its note.
 *
 * Reading order is deliberate: watch the video, understand why you are
 * invisible, understand how Google decides, see why this costs what it costs,
 * see the work and who it has worked for, then the price, then the guarantee.
 * Price lands after proof, never before it.
 */
export function GbpOfferHome() {
  const service = getService(HOME_SERVICE_SLUG)
  if (!service) notFound()

  return (
    <main className="pb-[calc(6rem+env(safe-area-inset-bottom))] lg:pb-0">
      <ServiceHero
        service={service}
        visual={
          service.vsl ? (
            <VslGate mediaId={service.vsl.mediaId} title={service.vsl.title} />
          ) : undefined
        }
      />
      <ServiceProblemGeoGrid service={service} />
      <ServiceMechanism service={service} />
      <ServiceContrast service={service} />

      <ServiceProcess service={service} />
      <ServiceIncludes service={service} />

      <CaseStudies />
      <WhoThisIsFor />
      {/* Renders nothing until real, approved quotes exist. By design. */}
      <Reviews />

      <Pricing />
      <Exclusivity />

      <ServiceFAQ service={service} />
      <About />
      <LeadCapture />
    </main>
  )
}
