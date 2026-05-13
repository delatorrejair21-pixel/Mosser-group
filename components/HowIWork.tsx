'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '@/components/ui/TextReveal'
import FadeInView from '@/components/ui/FadeInView'
import { process, brand } from '@/data/content'

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

export default function HowIWork() {
  const stepsRef = useRef(null)
  const isInView = useInView(stepsRef, { once: true, margin: '-100px' })

  return (
    <section id="process" className="bg-moss-800 py-28 lg:py-40 relative overflow-hidden">

      {/* Subtle background vertical lines */}
      <div className="absolute inset-0 opacity-[0.04] pointer-events-none">
        <div className="absolute top-0 left-1/4 w-px h-full bg-parchment-100" />
        <div className="absolute top-0 left-2/4 w-px h-full bg-parchment-100" />
        <div className="absolute top-0 left-3/4 w-px h-full bg-parchment-100" />
      </div>

      <div className="relative max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="mb-20 max-w-2xl">
          <EyebrowWipe text="The Mosser Method" className="text-parchment-500" />
          <TextReveal
            text="A Process Built Around You"
            className="font-display text-5xl md:text-6xl font-light leading-tight text-parchment-100"
            stagger={0.06}
          />
        </div>

        {/* Animated connecting line — draws left to right before steps appear */}
        <div ref={stepsRef}>
          <div className="relative mb-16 hidden lg:block">
            {/* Background track */}
            <div className="w-full h-px bg-parchment-600/15" />
            {/* Animated fill */}
            <motion.div
              className="absolute top-0 left-0 h-px bg-parchment-500/35"
              initial={{ width: '0%' }}
              animate={isInView ? { width: '100%' } : {}}
              transition={{ duration: 1.4, delay: 0.1, ease: [0.25, 0.1, 0.25, 1] }}
            />
            {/* Step dots on the line */}
            {process.map((_, i) => (
              <motion.div
                key={i}
                className="absolute top-1/2 -translate-y-1/2 w-2.5 h-2.5 rounded-full border border-parchment-500/50 bg-moss-800"
                style={{ left: `${(i / (process.length - 1)) * 100}%`, translateX: '-50%' }}
                initial={{ scale: 0, opacity: 0 }}
                animate={isInView ? { scale: 1, opacity: 1 } : {}}
                transition={{ duration: 0.4, delay: 0.3 + i * 0.25, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <div className="absolute inset-0.5 rounded-full bg-parchment-500/40" />
              </motion.div>
            ))}
          </div>

          {/* Step cards */}
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-0 divide-y sm:divide-y-0 sm:divide-x divide-parchment-600/20">
            {process.map((item, i) => (
              <motion.div
                key={item.step}
                className="px-0 sm:px-8 lg:px-10 py-10 sm:py-0 flex flex-col"
                initial={{ opacity: 0, y: 32 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.65,
                  delay: 0.5 + i * 0.12,
                  ease: [0.25, 0.1, 0.25, 1],
                }}
              >
                <span className="font-display text-6xl font-light text-parchment-600/20 leading-none mb-6 select-none">
                  {item.step}
                </span>
                <h3 className="font-display text-2xl font-medium text-parchment-100 mb-4 leading-snug">
                  {item.title}
                </h3>
                <div className="w-8 h-px bg-parchment-500/40 mb-5" />
                <p className="font-sans text-sm text-parchment-400 leading-relaxed flex-1">
                  {item.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Bottom quote */}
        <FadeInView delay={0.4}>
          <div className="mt-20 pt-12 border-t border-parchment-600/20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-8">
            <p className="font-display text-2xl md:text-3xl font-light italic text-parchment-300 max-w-md">
              &ldquo;Every client deserves a strategy as unique as their situation.&rdquo;
            </p>
            <div className="flex-shrink-0">
              <span className="block text-[10px] font-sans tracking-widest uppercase text-parchment-500 mb-1">
                — {brand.agent}
              </span>
              <span className="text-[10px] font-sans text-parchment-600">
                {brand.name} · {brand.affiliation}
              </span>
            </div>
          </div>
        </FadeInView>

      </div>
    </section>
  )
}
