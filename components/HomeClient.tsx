'use client'

import { useState } from 'react'
import type { SanitySettings, SanityTestimonial, SanityProperty } from '@/sanity/queries'
import LogoIntro from '@/components/LogoIntro'
import Navbar from '@/components/Navbar'
import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import HowIWork from '@/components/HowIWork'
import FeaturedProperties from '@/components/FeaturedProperties'
import Testimonials from '@/components/Testimonials'
import Contact from '@/components/Contact'
import Footer from '@/components/Footer'
import ScrollProgressBar from '@/components/ui/ScrollProgressBar'

type Props = {
  sanitySettings:     SanitySettings     | null
  sanityTestimonials: SanityTestimonial[] | null
  sanityProperties:   SanityProperty[]   | null
}

export default function HomeClient({ sanitySettings, sanityTestimonials, sanityProperties }: Props) {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      <LogoIntro onComplete={() => setIntroComplete(true)} />

      <div
        className="transition-opacity duration-700"
        style={{ opacity: introComplete ? 1 : 0 }}
      >
        <ScrollProgressBar />
        <Navbar sanitySettings={sanitySettings} />
      </div>

      <main>
        <Hero        sanitySettings={sanitySettings} />
        <About       sanitySettings={sanitySettings} />
        <Services />
        <HowIWork />
        <FeaturedProperties sanityProperties={sanityProperties} />
        <Testimonials       sanityTestimonials={sanityTestimonials} />
        <Contact            sanitySettings={sanitySettings} />
      </main>
      <Footer sanitySettings={sanitySettings} />
    </>
  )
}
