'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useRef } from 'react'
import Image from 'next/image'
import CountUp from '@/components/ui/CountUp'
import { brand, heroStats } from '@/data/content'

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  })

  // Image panel moves slower than scroll — cinematic parallax
  const imageY = useTransform(scrollYProgress, [0, 1], ['0%', '18%'])
  // Left panel content lifts slightly on scroll
  const contentY = useTransform(scrollYProgress, [0, 1], ['0%', '-6%'])

  return (
    <section ref={sectionRef} className="relative flex flex-col lg:flex-row min-h-screen overflow-hidden">

      {/* ── LEFT PANEL — Dark Green ─────────────────────────────────────────── */}
      <motion.div
        style={{ y: contentY }}
        className="relative z-10 flex flex-col justify-center lg:w-[48%] bg-moss-800 px-8 sm:px-14 lg:px-16 xl:px-20 pt-32 pb-16 lg:pt-0 lg:pb-0 order-2 lg:order-1"
      >
        {/* Corner accent lines */}
        <div className="absolute top-0 left-0 w-px h-24 bg-parchment-500/30" />
        <div className="absolute top-0 left-0 w-24 h-px bg-parchment-500/30" />

        {/* Brand label */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease }}
          className="mb-8"
        >
          <span className="text-[10px] font-sans tracking-widest-xl uppercase text-parchment-500">
            {brand.name} · {brand.affiliation}
          </span>
          <motion.div
            className="mt-3 h-px bg-parchment-500/40"
            initial={{ width: 0 }}
            animate={{ width: 40 }}
            transition={{ duration: 0.8, delay: 0.5, ease }}
          />
        </motion.div>

        {/* Agent name — word-by-word reveal on mount */}
        <h1 className="font-display text-6xl sm:text-7xl xl:text-8xl font-light leading-none tracking-tight text-parchment-100 mb-8">
          {['Sara', 'Mosser'].map((word, i) => (
            <span key={word} className="block overflow-hidden">
              <motion.span
                className={`block ${i === 1 ? 'italic font-light text-parchment-400' : ''}`}
                initial={{ y: '105%' }}
                animate={{ y: 0 }}
                transition={{ duration: 0.8, delay: 0.25 + i * 0.15, ease }}
              >
                {word}
              </motion.span>
            </span>
          ))}
        </h1>

        {/* Quote */}
        <motion.blockquote
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6, ease }}
          className="font-display text-lg xl:text-xl italic font-light text-parchment-300 leading-relaxed mb-12 max-w-sm"
        >
          &ldquo;{brand.tagline}&rdquo;
        </motion.blockquote>

        {/* Stats with count-up */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.75, ease }}
          className="flex gap-8 mb-12 pb-12 border-b border-parchment-600/20"
        >
          {heroStats.map((stat) => (
            <div key={stat.label} className="flex flex-col">
              <CountUp
                value={stat.value}
                className="font-display text-3xl xl:text-4xl font-semibold text-parchment-100 leading-none"
              />
              <span className="mt-1.5 text-[10px] font-sans tracking-widest uppercase text-parchment-500">
                {stat.label}
              </span>
            </div>
          ))}
        </motion.div>

        {/* CTA buttons */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.9, ease }}
          className="flex flex-wrap gap-4"
        >
          <a
            href="#contact"
            className="group inline-flex items-center gap-2 px-8 py-3.5 bg-parchment-200 text-moss-900 font-sans text-[13px] font-semibold tracking-wide hover:bg-white transition-all duration-300"
          >
            Work With Sara
            <ArrowRight
              size={14}
              className="transform group-hover:translate-x-1 transition-transform duration-300"
            />
          </a>
          <a
            href="#process"
            className="inline-flex items-center px-8 py-3.5 border border-parchment-500/40 text-parchment-200 font-sans text-[13px] tracking-wide hover:border-parchment-300 hover:text-parchment-100 transition-all duration-300"
          >
            How I Work
          </a>
        </motion.div>

        <div className="absolute bottom-0 right-0 w-px h-16 bg-parchment-500/20" />
      </motion.div>

      {/* ── RIGHT PANEL — Portrait with parallax ───────────────────────────── */}
      <div className="relative lg:w-[52%] min-h-[60vh] lg:min-h-0 lg:h-screen order-1 lg:order-2 overflow-hidden">
        <motion.div
          className="absolute inset-0"
          style={{ y: imageY }}
        >
          <Image
            src="/images/mosser.JPG"
            fill
            alt="Sara Mosser — The Mosser Group"
            className="object-cover object-[center_35%]"
            priority
          />
        </motion.div>

        {/* Left gradient bleed into green panel */}
        <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-moss-800 to-transparent z-10" />
        {/* Mobile bottom gradient */}
        <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-moss-800/60 to-transparent lg:hidden z-10" />
        {/* Subtle vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-moss-900/20 via-transparent to-transparent z-[5]" />
      </div>

    </section>
  )
}
