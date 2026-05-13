'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '@/components/ui/TextReveal'
import { services } from '@/data/content'

// ─── Drop your 4 service photos into /public/images/ and update these paths ───
// Each image corresponds to the service card in the same position (01, 02, 03, 04)
const SERVICE_IMAGES = [
  '/images/service-buying.jpg',      // 01 — Buying a Home
  '/images/service-selling.jpg',     // 02 — Selling a Home
  '/images/service-relocation.jpg',  // 03 — Relocation Guidance
  '/images/service-luxury.jpg',      // 04 — Luxury Real Estate
]

function EyebrowWipe({ text, className }: { text: string; className?: string }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })
  return (
    <div ref={ref} className="overflow-hidden mb-6">
      <motion.span
        className={`eyebrow block ${className}`}
        initial={{ clipPath: 'inset(0 100% 0 0)' }}
        animate={isInView ? { clipPath: 'inset(0 0% 0 0)' } : {}}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
      >
        {text}
      </motion.span>
    </div>
  )
}

const cardVariants = {
  hidden: { opacity: 0, y: 40, scale: 0.97 },
  visible: (i: number) => ({
    opacity: 1, y: 0, scale: 1,
    transition: { duration: 0.6, delay: i * 0.1, ease: [0.25, 0.1, 0.25, 1] },
  }),
}

export default function Services() {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })

  return (
    <section className="bg-white py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-20">
          <EyebrowWipe text="How Sara Can Help" className="text-moss-700" />
          <TextReveal
            text="Full-Service Real Estate, Tailored to You"
            className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900"
            stagger={0.045}
          />
        </div>

        {/* Cards */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px bg-parchment-300/50"
        >
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              custom={i}
              variants={cardVariants}
              initial="hidden"
              animate={isInView ? 'visible' : 'hidden'}
              className="relative bg-white flex flex-col h-full group cursor-default overflow-hidden"
            >
              {/* Background image — fades in on hover */}
              <div className="absolute inset-0 z-0">
                <Image
                  src={SERVICE_IMAGES[i]}
                  fill
                  alt={service.title}
                  className="object-cover opacity-0 group-hover:opacity-100 transition-opacity duration-500 scale-105 group-hover:scale-100 transition-transform duration-700"
                  onError={(e) => { (e.target as HTMLImageElement).style.display = 'none' }}
                />
                {/* Dark overlay so text stays readable over the photo */}
                <div className="absolute inset-0 bg-moss-900/70 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Green highlight shown when no image loads yet */}
              <div className="absolute inset-0 bg-moss-800 opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-0 [.group:has(img[style*='none'])_&]:block" />

              {/* Card content */}
              <div className="relative z-10 p-8 lg:p-10 flex flex-col h-full">
                <span className="font-display text-5xl font-light leading-none mb-6 select-none transition-colors duration-300 text-moss-800/15 group-hover:text-parchment-100/20">
                  {service.number}
                </span>

                <h3 className="font-display text-2xl font-medium leading-snug mb-4 transition-colors duration-300 text-stone-900 group-hover:text-parchment-100">
                  {service.title}
                </h3>

                <motion.div
                  className="h-px mb-5 bg-moss-800/30 group-hover:bg-parchment-400/50 transition-colors duration-300"
                  initial={{ width: 32 }}
                  whileHover={{ width: 56 }}
                  transition={{ duration: 0.4 }}
                />

                <p className="font-sans text-sm leading-relaxed flex-1 transition-colors duration-300 text-stone-500 group-hover:text-parchment-300">
                  {service.desc}
                </p>

                <div className="mt-8">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-1.5 text-[12px] font-sans font-semibold tracking-widest uppercase opacity-0 group-hover:opacity-100 transition-all duration-300 text-parchment-200 hover:text-white translate-y-2 group-hover:translate-y-0"
                  >
                    Learn More →
                  </a>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
