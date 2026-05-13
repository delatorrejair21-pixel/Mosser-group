'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import Image from 'next/image'
import TextReveal from '@/components/ui/TextReveal'
import FadeInView from '@/components/ui/FadeInView'
import { properties as staticProperties } from '@/data/content'
import { urlFor } from '@/sanity/image'
import type { SanityProperty } from '@/sanity/queries'

type Props = { sanityProperties?: SanityProperty[] | null }

const placeholderGradients = [
  'from-moss-100 via-parchment-300 to-parchment-200',
  'from-parchment-200 via-moss-100 to-parchment-300',
  'from-parchment-300 via-parchment-200 to-moss-200',
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

export default function FeaturedProperties({ sanityProperties }: Props) {
  const gridRef = useRef(null)
  const isInView = useInView(gridRef, { once: true, margin: '-80px' })

  // Normalise Sanity and static data into the same shape
  const items = sanityProperties
    ? sanityProperties.map((p) => ({
        id:       p._id,
        location: p.location,
        price:    p.price,
        status:   p.status,
        beds:     p.beds,
        baths:    p.baths,
        sqft:     p.sqft,
        imageUrl: p.image ? urlFor(p.image)?.width(800).height(520).url() ?? null : null,
        imageAlt: p.image?.alt ?? p.location,
      }))
    : staticProperties.map((p) => ({
        id:       String(p.id),
        location: p.location,
        price:    p.price,
        status:   p.status,
        beds:     p.beds,
        baths:    p.baths,
        sqft:     p.sqft,
        imageUrl: null as string | null,
        imageAlt: p.location,
      }))

  return (
    <section id="properties" className="bg-parchment-100 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-8 mb-16">
          <div>
            <EyebrowWipe text="Featured Listings" className="text-moss-700" />
            <TextReveal
              text="Properties of Distinction"
              className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900"
              stagger={0.055}
            />
          </div>
          <FadeInView delay={0.2}>
            <a
              href="#contact"
              className="flex-shrink-0 font-sans text-sm tracking-wide text-moss-800 border-b border-moss-800/40 pb-0.5 hover:border-moss-800 transition-all duration-300 whitespace-nowrap"
            >
              View all listings →
            </a>
          </FadeInView>
        </div>

        <div ref={gridRef} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {items.map((property, i) => (
            <motion.article
              key={property.id}
              className="bg-white group cursor-pointer overflow-hidden"
              initial={{ opacity: 0, y: 48, scale: 0.96 }}
              animate={isInView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.65, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
              whileHover={{ y: -8, transition: { duration: 0.35, ease: [0.25, 0.1, 0.25, 1] } }}
            >
              {/* Image */}
              <div className="relative h-64 overflow-hidden">
                {property.imageUrl ? (
                  <Image
                    src={property.imageUrl}
                    fill
                    alt={property.imageAlt}
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                ) : (
                  <motion.div
                    className={`absolute inset-0 bg-gradient-to-br ${placeholderGradients[i % 3]}`}
                    whileHover={{ scale: 1.05 }}
                    transition={{ duration: 0.7 }}
                  >
                    <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-[10px] font-sans tracking-widest uppercase text-moss-700/50">
                      Upload photo in CMS
                    </div>
                  </motion.div>
                )}

                {/* Status badge */}
                <div className="absolute top-4 right-4 z-10">
                  <span
                    className={`px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase ${
                      property.status === 'Active'
                        ? 'bg-moss-800 text-parchment-100'
                        : property.status === 'Under Contract'
                        ? 'bg-amber-700 text-white'
                        : 'bg-parchment-500 text-moss-900'
                    }`}
                  >
                    {property.status}
                  </span>
                </div>
              </div>

              {/* Body */}
              <div className="p-6 lg:p-8">
                <p className="text-[11px] font-sans tracking-widest uppercase text-moss-700 mb-2">
                  {property.location}
                </p>
                <p className="font-display text-3xl font-light text-stone-900 mb-5">
                  {property.price}
                </p>
                <div className="flex gap-5 pt-5 border-t border-parchment-300">
                  <span className="text-[12px] font-sans text-stone-500">
                    <strong className="font-semibold text-stone-700">{property.beds}</strong> Beds
                  </span>
                  <span className="text-[12px] font-sans text-stone-500">
                    <strong className="font-semibold text-stone-700">{property.baths}</strong> Baths
                  </span>
                  {property.sqft && (
                    <span className="text-[12px] font-sans text-stone-500">
                      <strong className="font-semibold text-stone-700">{property.sqft}</strong> sqft
                    </span>
                  )}
                </div>
              </div>
            </motion.article>
          ))}
        </div>

        <FadeInView delay={0.3}>
          <div className="mt-16 text-center">
            <a
              href="#contact"
              className="inline-flex items-center gap-3 px-10 py-4 bg-moss-800 text-parchment-100 font-sans text-sm tracking-wide hover:bg-moss-700 transition-colors duration-300"
            >
              Inquire About a Property
            </a>
          </div>
        </FadeInView>

      </div>
    </section>
  )
}
