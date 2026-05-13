// Server component — fetches Sanity data at request time.
// Passes data down to the client shell which handles animations/state.
import HomeClient from '@/components/HomeClient'
import {
  getSiteSettings,
  getTestimonials,
  getProperties,
} from '@/sanity/queries'

export default async function Page() {
  const [settings, testimonials, properties] = await Promise.all([
    getSiteSettings().catch(() => null),
    getTestimonials().catch(() => null),
    getProperties().catch(() => null),
  ])

  return (
    <HomeClient
      sanitySettings={settings}
      sanityTestimonials={testimonials}
      sanityProperties={properties}
    />
  )
}
