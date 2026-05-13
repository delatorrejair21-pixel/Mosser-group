'use client'

import { useState } from 'react'
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

export default function Home() {
  const [introComplete, setIntroComplete] = useState(false)

  return (
    <>
      {/* Full-screen cinematic intro — unmounts itself when done */}
      <LogoIntro onComplete={() => setIntroComplete(true)} />

      {/* Page reveals after intro scrolls away */}
      <div
        className="transition-opacity duration-700"
        style={{ opacity: introComplete ? 1 : 0 }}
      >
        <ScrollProgressBar />
        <Navbar />
      </div>

      <main>
        <Hero />
        <About />
        <Services />
        <HowIWork />
        <FeaturedProperties />
        <Testimonials />
        <Contact />
      </main>
      <Footer />
    </>
  )
}
