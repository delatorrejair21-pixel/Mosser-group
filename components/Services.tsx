'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '@/components/ui/TextReveal'
import { services } from '@/data/content'

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
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      duration: 0.6,
      delay: i * 0.1,
      ease: [0.25, 0.1, 0.25, 1],
    },
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
              className="bg-white p-8 lg:p-10 flex flex-col h-full group cursor-default"
              whileHover={{ y: -6, transition: { duration: 0.3, ease: [0.25, 0.1, 0.25, 1] } }}
            >
              <span className="font-display text-5xl font-light text-moss-800/15 leading-none mb-6 select-none">
                {service.number}
              </span>

              <h3 className="font-display text-2xl font-medium text-stone-900 mb-4 leading-snug group-hover:text-moss-800 transition-colors duration-300">
                {service.title}
              </h3>

              <motion.div
                className="h-px bg-moss-800/30 mb-5"
                initial={{ width: 32 }}
                whileHover={{ width: 56 }}
                transition={{ duration: 0.4 }}
              />

              <p className="font-sans text-sm text-stone-500 leading-relaxed flex-1">
                {service.desc}
              </p>

              <div className="mt-8">
                <a
                  href="#contact"
                  className="inline-flex items-center gap-1.5 text-[12px] font-sans font-semibold tracking-widest uppercase text-moss-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                >
                  Learn More →
                </a>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
