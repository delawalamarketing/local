import SchemaMarkup from '@/components/seo/schema-markup'
import { Navigation } from '@/components/layout/navigation'
import { Footer } from '@/components/layout/footer'
import { GbpOfferHome } from '@/components/sections/gbp-offer-home'
import { MobileActionBar } from '@/components/ui/mobile-action-bar'
import { LiveSocialProof } from '@/components/ui/live-social-proof'
import { ExitIntentPopup } from '@/components/ui/exit-intent-popup'
import { getService, HOME_SERVICE_SLUG } from '@/lib/services'

/**
 * The home page IS the GBP offer.
 *
 * This site sells one thing, so the root URL carries it. All the copy lives in
 * the `gbp-rankings` entry in lib/services.ts and renders through the service
 * section components.
 */
export default function HomePage() {
  return (
    <>
      <SchemaMarkup faqs={getService(HOME_SERVICE_SLUG)?.faqs ?? []} />
      <Navigation />
      <LiveSocialProof />
      <ExitIntentPopup />
      <GbpOfferHome />
      <Footer />
      <MobileActionBar />
    </>
  )
}
