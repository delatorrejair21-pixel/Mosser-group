'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '@/components/ui/TextReveal'
import FadeInView from '@/components/ui/FadeInView'
import { testimonials as staticTestimonials, brand } from '@/data/content'
import type { SanityTestimonial } from '@/sanity/queries'

type Props = { sanityTestimonials?: SanityTestimonial[] | null }

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

export default function Testimonials({ sanityTestimonials }: Props) {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })

  // Normalise Sanity and static data into the same shape
  const items = sanityTestimonials
    ? sanityTestimonials.map((t) => ({
        id:       t._id,
        quote:    t.quote,
        name:     t.authorName,
        location: t.authorLocation,
      }))
    : staticTestimonials.map((t, i) => ({
        id:       String(i),
        quote:    t.quote,
        name:     t.name,
        location: t.location,
      }))

  return (
    <section className="bg-parchment-50 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="mb-20 max-w-xl">
          <EyebrowWipe text="Client Stories" className="text-moss-700" />
          <TextReveal
            text="The Mosser Experience"
            className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900"
            stagger={0.065}
          />
        </div>

        <div ref={gridRef} className="grid md:grid-cols-3 gap-6 lg:gap-8">
          {items.map((t, i) => (
            <motion.div
              key={t.id}
              className="flex flex-col h-full bg-white p-8 lg:p-10 border border-parchment-300/60"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.14, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{
                y: -6,
                borderColor: 'rgb(169 207 184 / 0.8)',
                boxShadow: '0 20px 40px -12px rgba(27, 58, 41, 0.08)',
                transition: { duration: 0.35 },
              }}
            >
              <motion.div
                className="font-display text-7xl font-light text-moss-800/15 leading-none mb-6 select-none"
                initial={{ opacity: 0, scale: 0.5 }}
                animate={isInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.5, delay: 0.2 + i * 0.14, ease: [0.25, 0.1, 0.25, 1] }}
              >
                &ldquo;
              </motion.div>

              <blockquote className="font-display text-xl font-light leading-relaxed text-stone-700 italic flex-1 mb-8">
                {t.quote}
              </blockquote>

              <div className="pt-6 border-t border-parchment-300">
                <p className="font-sans text-sm font-semibold text-stone-900 tracking-wide">{t.name}</p>
                <p className="font-sans text-[12px] text-moss-700 mt-0.5 tracking-wide">{t.location}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <FadeInView delay={0.35}>
          <div className="mt-20 flex flex-col sm:flex-row items-center justify-center gap-4 text-center">
            <div className="w-12 h-px bg-parchment-400" />
            <p className="font-sans text-sm text-stone-400 tracking-wide">
              {brand.name} · Keller Williams · Atlanta, GA
            </p>
            <div className="w-12 h-px bg-parchment-400" />
          </div>
        </FadeInView>

      </div>
    </section>
  )
}
