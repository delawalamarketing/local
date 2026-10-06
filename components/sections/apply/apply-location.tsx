import { Eyebrow } from '@/components/ui/eyebrow'
import { SITE } from '@/lib/site-config'

/** "Where to find us": address line, contact details and the map. Used on /apply. */
export function ApplyLocation() {
  return (
    <section className="py-16">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 sm:px-6 lg:grid-cols-12 lg:items-center lg:px-8">
        <div className="flex flex-col gap-3 lg:col-span-5">
          <Eyebrow>Where to find us</Eyebrow>
          <p className="text-base text-muted-foreground">{SITE.locationLine}</p>
          <div className="flex flex-col gap-1.5 text-sm">
            <a href={`mailto:${SITE.contact.email}`} className="text-primary hover:underline">
              {SITE.contact.email}
            </a>
            <a href={`tel:${SITE.contact.phoneHref}`} className="text-primary hover:underline">
              {SITE.contact.phone}
            </a>
          </div>
        </div>
        <div className="lg:col-span-7">
          <div className="relative h-[300px] w-full overflow-hidden rounded-2xl border border-border shadow-sm">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d110776.25653860912!2d-79.7481615651732!3d44.359114381438836!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0xa944f16c1d420d11%3A0x8ac42ebbbb3b6b0b!2sDelawala%20Marketing!5e1!3m2!1sen!2sca!4v1783389102093!5m2!1sen!2sca"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="strict-origin-when-cross-origin"
              title="Delawala Marketing office location"
              className="grayscale opacity-90 transition-all duration-300 hover:grayscale-0 hover:opacity-100"
            />
          </div>
        </div>
      </div>
    </section>
  )
}
