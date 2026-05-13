'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { motion } from 'framer-motion'
import { ArrowLeft } from 'lucide-react'
import { urlFor } from '@/sanity/image'
import { properties as staticProperties } from '@/data/content'
import type { SanityProperty } from '@/sanity/queries'

type Props = { properties: SanityProperty[] | null }

type StatusFilter = 'All' | 'Active' | 'Under Contract' | 'Sold'

const STATUS_FILTERS: StatusFilter[] = ['All', 'Active', 'Under Contract', 'Sold']

const placeholderGradients = [
  'from-moss-100 via-parchment-300 to-parchment-200',
  'from-parchment-200 via-moss-100 to-parchment-300',
  'from-parchment-300 via-parchment-200 to-moss-200',
]

export default function ListingsClient({ properties }: Props) {
  const [filter, setFilter] = useState<StatusFilter>('All')

  const items = properties
    ? properties.map((p) => ({
        id:       p._id,
        location: p.location,
        price:    p.price,
        status:   p.status,
        beds:     p.beds,
        baths:    p.baths,
        sqft:     p.sqft,
        imageUrl: p.image ? urlFor(p.image)?.width(900).height(600).url() ?? null : null,
        imageAlt: p.image?.alt ?? p.location,
      }))
    : staticProperties.map((p, i) => ({
        id:       String(p.id),
        location: p.location,
        price:    p.price,
        status:   p.status as StatusFilter,
        beds:     p.beds,
        baths:    p.baths,
        sqft:     p.sqft,
        imageUrl: null as string | null,
        imageAlt: p.location,
      }))

  const filtered = filter === 'All' ? items : items.filter((p) => p.status === filter)

  return (
    <div className="min-h-screen bg-parchment-50">

      {/* ── Header ───────────────────────────────────────────────────────── */}
      <header className="bg-moss-800 px-6 lg:px-12 py-8">
        <div className="max-w-7xl mx-auto">
          <Link
            href="/"
            className="inline-flex items-center gap-2 text-parchment-400 hover:text-parchment-100 transition-colors duration-300 mb-8 font-sans text-[12px] tracking-widest uppercase"
          >
            <ArrowLeft size={12} />
            Back to Home
          </Link>

          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-6">
            <div>
              <p className="text-[10px] font-sans tracking-widest-xl uppercase text-parchment-500 mb-3">
                The Mosser Group · Keller Williams
              </p>
              <h1 className="font-display text-5xl md:text-6xl font-light text-parchment-100 leading-none">
                All Listings
              </h1>
            </div>
            <p className="font-sans text-sm text-parchment-400">
              {filtered.length} {filtered.length === 1 ? 'property' : 'properties'}
            </p>
          </div>
        </div>
      </header>

      {/* ── Filter bar ───────────────────────────────────────────────────── */}
      <div className="border-b border-parchment-300 bg-white sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 lg:px-12">
          <div className="flex gap-0 overflow-x-auto">
            {STATUS_FILTERS.map((s) => (
              <button
                key={s}
                onClick={() => setFilter(s)}
                className={`px-6 py-4 font-sans text-[11px] tracking-widest uppercase whitespace-nowrap border-b-2 transition-all duration-200 ${
                  filter === s
                    ? 'border-moss-800 text-moss-800 font-semibold'
                    : 'border-transparent text-stone-400 hover:text-stone-700'
                }`}
              >
                {s}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* ── Grid ─────────────────────────────────────────────────────────── */}
      <main className="max-w-7xl mx-auto px-6 lg:px-12 py-16">
        {filtered.length === 0 ? (
          <div className="py-32 text-center">
            <p className="font-display text-2xl font-light text-stone-400 italic">
              No {filter.toLowerCase()} listings at this time.
            </p>
            <p className="font-sans text-sm text-stone-400 mt-4">
              Check back soon or{' '}
              <Link href="/#contact" className="text-moss-700 underline underline-offset-2">
                contact Sara
              </Link>{' '}
              directly.
            </p>
          </div>
        ) : (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {filtered.map((property, i) => (
              <motion.article
                key={property.id}
                className="bg-white group overflow-hidden shadow-sm hover:shadow-md transition-shadow duration-300"
                initial={{ opacity: 0, y: 32 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.06, ease: [0.25, 0.1, 0.25, 1] }}
              >
                {/* Image */}
                <div className="relative h-64 overflow-hidden bg-parchment-200">
                  {property.imageUrl ? (
                    <Image
                      src={property.imageUrl}
                      fill
                      alt={property.imageAlt}
                      className="object-cover group-hover:scale-105 transition-transform duration-700"
                    />
                  ) : (
                    <div className={`absolute inset-0 bg-gradient-to-br ${placeholderGradients[i % 3]}`}>
                      <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
                    </div>
                  )}

                  {/* Status badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <span className={`px-3 py-1 text-[10px] font-sans font-semibold tracking-widest uppercase ${
                      property.status === 'Active'
                        ? 'bg-moss-800 text-parchment-100'
                        : property.status === 'Under Contract'
                        ? 'bg-amber-700 text-white'
                        : 'bg-stone-600 text-white'
                    }`}>
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

                {/* Inquire footer */}
                <div className="px-6 lg:px-8 pb-6 lg:pb-8">
                  <Link
                    href="/#contact"
                    className="block w-full py-3 text-center font-sans text-[12px] tracking-widest uppercase text-moss-800 border border-moss-800/30 hover:bg-moss-800 hover:text-parchment-100 transition-all duration-300"
                  >
                    Inquire
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </main>

      {/* ── Footer strip ─────────────────────────────────────────────────── */}
      <div className="border-t border-parchment-300 py-8 text-center">
        <p className="font-sans text-[11px] text-stone-400 tracking-wide">
          The Mosser Group · Keller Williams · Atlanta, GA
        </p>
      </div>

    </div>
  )
}
