// Always fetch fresh — never serve a cached version of this page.
// Required so Sanity content updates appear without a redeploy.
export const dynamic = 'force-dynamic'

import HomeClient from '@/components/HomeClient'
import {
  getSiteSettings,
  getTestimonials,
  getProperties,
} from '@/sanity/queries'

export default async function Page() {
  const [settings, testimonials, properties] = await Promise.all([
    getSiteSettings().catch((e) => { console.error('Sanity settings error:', e); return null }),
    getTestimonials().catch((e) => { console.error('Sanity testimonials error:', e); return null }),
    getProperties().catch((e)  => { console.error('Sanity properties error:', e);  return null }),
  ])

  return (
    <HomeClient
      sanitySettings={settings}
      sanityTestimonials={testimonials}
      sanityProperties={properties}
    />
  )
}
