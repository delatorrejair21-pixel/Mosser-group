'use client'

import { useState } from 'react'
import { motion, useInView, AnimatePresence } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '@/components/ui/TextReveal'
import { services } from '@/data/content'

const SERVICE_IMAGES = [
  '/images/service-buying.png',
  '/images/service-selling.png',
  '/images/service-relocation.png',
  '/images/service-luxury.png',
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

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Services() {
  const [hovered, setHovered] = useState<number | null>(null)
  const gridRef  = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })
  const isAnyHovered = hovered !== null

  return (
    <section
      className="relative bg-white py-28 lg:py-40 overflow-hidden"
      onMouseLeave={() => setHovered(null)}
    >

      {/* ── Full-section background images — one per service ───────────── */}
      {SERVICE_IMAGES.map((src, i) => (
        <motion.div
          key={i}
          className="absolute inset-0 z-0 pointer-events-none"
          animate={{ opacity: hovered === i ? 1 : 0 }}
          transition={{ duration: 0.6, ease }}
        >
          <Image src={src} fill alt="" className="object-cover" priority={i === 0} />
          {/* Dark overlay so text stays readable */}
          <div className="absolute inset-0 bg-moss-900/65" />
        </motion.div>
      ))}

      {/* ── Content ───────────────────────────────────────────────────── */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header — fades out slightly when image is showing */}
        <motion.div
          className="max-w-2xl mb-20"
          animate={{ opacity: isAnyHovered ? 0.15 : 1 }}
          transition={{ duration: 0.4, ease }}
        >
          <EyebrowWipe
            text="How Sara Can Help"
            className={isAnyHovered ? 'text-parchment-400' : 'text-moss-700'}
          />
          <TextReveal
            text="Full-Service Real Estate, Tailored to You"
            className={`font-display text-5xl md:text-6xl font-light leading-tight ${isAnyHovered ? 'text-parchment-100' : 'text-stone-900'}`}
            stagger={0.045}
          />
        </motion.div>

        {/* Cards grid */}
        <div
          ref={gridRef}
          className="grid sm:grid-cols-2 lg:grid-cols-4 gap-px"
          style={{ background: isAnyHovered ? 'rgba(255,255,255,0.06)' : 'rgba(200,190,175,0.5)' }}
        >
          {services.map((service, i) => {
            const isActive  = hovered === i
            const isDimmed  = isAnyHovered && !isActive

            return (
              <motion.div
                key={service.title}
                onHoverStart={() => setHovered(i)}
                className="relative flex flex-col h-full cursor-default p-8 lg:p-10"
                initial={{ opacity: 0, y: 40 }}
                animate={isInView
                  ? { opacity: isDimmed ? 0.18 : 1, y: 0 }
                  : { opacity: 0, y: 40 }
                }
                transition={{
                  opacity: { duration: isDimmed ? 0.3 : 0.5, ease },
                  y: { duration: 0.6, delay: i * 0.1, ease },
                }}
                style={{
                  // Transparent so the full-section image bleeds through
                  background: isAnyHovered ? 'transparent' : 'white',
                  transition: 'background 0.4s ease',
                }}
              >
                {/* Left border accent on active card */}
                <motion.div
                  className="absolute left-0 top-6 bottom-6 w-0.5 bg-parchment-300"
                  animate={{ opacity: isActive ? 1 : 0, scaleY: isActive ? 1 : 0 }}
                  transition={{ duration: 0.3, ease }}
                />

                <span className={`font-display text-5xl font-light leading-none mb-6 select-none transition-colors duration-300 ${
                  isActive ? 'text-parchment-100/25' : 'text-moss-800/15'
                }`}>
                  {service.number}
                </span>

                <h3 className={`font-display text-2xl font-medium leading-snug mb-4 transition-colors duration-300 ${
                  isActive ? 'text-parchment-100' : 'text-stone-900'
                }`}>
                  {service.title}
                </h3>

                <div className={`h-px mb-5 w-8 transition-colors duration-300 ${
                  isActive ? 'bg-parchment-400/60' : 'bg-moss-800/30'
                }`} />

                <p className={`font-sans text-sm leading-relaxed flex-1 transition-colors duration-300 ${
                  isActive ? 'text-parchment-300' : 'text-stone-500'
                }`}>
                  {service.desc}
                </p>

                <motion.a
                  href="#contact"
                  className="mt-8 inline-flex items-center gap-1.5 text-[12px] font-sans font-semibold tracking-widest uppercase text-parchment-200 hover:text-white"
                  animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 8 }}
                  transition={{ duration: 0.25, ease }}
                >
                  Learn More →
                </motion.a>
              </motion.div>
            )
          })}
        </div>
      </div>
    </section>
  )
}
