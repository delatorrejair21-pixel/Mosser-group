'use client'

import { useState } from 'react'
import { motion, AnimatePresence, useInView } from 'framer-motion'
import { useRef } from 'react'
import TextReveal from '@/components/ui/TextReveal'
import { services } from '@/data/content'
import { ArrowRight } from 'lucide-react'

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

// Each service gets a unique atmospheric visual composition
const SERVICE_VISUALS = [
  // 01 — Buying: warm, hopeful, new beginnings
  {
    bg: 'from-[#1B3A29] via-[#243D2E] to-[#0F2019]',
    accent: '#C8B89A',
    geo: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice">
        <circle cx="480" cy="80"  r="220" fill="none" stroke="rgba(200,184,154,0.08)" strokeWidth="1" />
        <circle cx="480" cy="80"  r="160" fill="none" stroke="rgba(200,184,154,0.06)" strokeWidth="1" />
        <circle cx="480" cy="80"  r="100" fill="none" stroke="rgba(200,184,154,0.10)" strokeWidth="1" />
        <line x1="0" y1="500" x2="600" y2="0" stroke="rgba(200,184,154,0.05)" strokeWidth="1" />
        <rect x="60" y="60" width="180" height="240" fill="none" stroke="rgba(200,184,154,0.07)" strokeWidth="1" />
      </svg>
    ),
    label: 'Your New Beginning',
    stat: '$100M+',
    statLabel: 'in Closed Transactions',
  },
  // 02 — Selling: confident, market-savvy
  {
    bg: 'from-[#0F1F17] via-[#1B3A29] to-[#243D2E]',
    accent: '#D4C5A9',
    geo: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice">
        <polygon points="300,40 560,460 40,460" fill="none" stroke="rgba(212,197,169,0.07)" strokeWidth="1" />
        <polygon points="300,100 500,420 100,420" fill="none" stroke="rgba(212,197,169,0.05)" strokeWidth="1" />
        <line x1="0" y1="0"   x2="600" y2="500" stroke="rgba(212,197,169,0.04)" strokeWidth="1" />
        <line x1="600" y1="0" x2="0"   y2="500" stroke="rgba(212,197,169,0.04)" strokeWidth="1" />
        <circle cx="300" cy="250" r="80" fill="none" stroke="rgba(212,197,169,0.08)" strokeWidth="1" />
      </svg>
    ),
    label: 'Sell With Confidence',
    stat: 'Top 10%',
    statLabel: 'Solo Agents in Atlanta',
  },
  // 03 — Relocation: movement, arrival
  {
    bg: 'from-[#162B20] via-[#1E3828] to-[#0D1A12]',
    accent: '#B8A88A',
    geo: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice">
        {[0,1,2,3,4].map((i) => (
          <line key={i} x1={i*150} y1="0" x2={i*150+100} y2="500" stroke="rgba(184,168,138,0.05)" strokeWidth="1" />
        ))}
        {[0,1,2,3].map((i) => (
          <line key={i} x1="0" y1={i*130} x2="600" y2={i*130+40} stroke="rgba(184,168,138,0.04)" strokeWidth="1" />
        ))}
        <circle cx="120" cy="200" r="60"  fill="none" stroke="rgba(184,168,138,0.09)" strokeWidth="1" />
        <circle cx="120" cy="200" r="100" fill="none" stroke="rgba(184,168,138,0.05)" strokeWidth="1" />
      </svg>
    ),
    label: 'Land in the Right Place',
    stat: '10 Yrs',
    statLabel: 'Atlanta Market Expertise',
  },
  // 04 — Luxury: ultra-dark, opulent
  {
    bg: 'from-[#080F0B] via-[#0F1F17] to-[#1B3A29]',
    accent: '#C8B060',
    geo: (
      <svg className="absolute inset-0 w-full h-full" viewBox="0 0 600 500" preserveAspectRatio="xMidYMid slice">
        <rect x="80"  y="80"  width="440" height="340" fill="none" stroke="rgba(200,176,96,0.07)" strokeWidth="1" />
        <rect x="120" y="120" width="360" height="260" fill="none" stroke="rgba(200,176,96,0.05)" strokeWidth="1" />
        <rect x="160" y="160" width="280" height="180" fill="none" stroke="rgba(200,176,96,0.08)" strokeWidth="1" />
        <line x1="80"  y1="80"  x2="520" y2="420" stroke="rgba(200,176,96,0.04)" strokeWidth="1" />
        <line x1="520" y1="80"  x2="80"  y2="420" stroke="rgba(200,176,96,0.04)" strokeWidth="1" />
        <circle cx="300" cy="250" r="120" fill="none" stroke="rgba(200,176,96,0.06)" strokeWidth="1" />
      </svg>
    ),
    label: 'Elevated by Every Detail',
    stat: 'Discreet',
    statLabel: 'White-Glove Service',
  },
]

const ease = [0.25, 0.1, 0.25, 1] as const

export default function Services() {
  const [active, setActive] = useState(0)
  const sectionRef = useRef(null)
  const isInView = useInView(sectionRef, { once: true, margin: '-80px' })

  const visual = SERVICE_VISUALS[active]

  return (
    <section className="bg-white py-28 lg:py-40" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-6 lg:px-12">

        {/* Header */}
        <div className="max-w-2xl mb-16 lg:mb-20">
          <EyebrowWipe text="How Sara Can Help" className="text-moss-700" />
          <TextReveal
            text="Full-Service Real Estate, Tailored to You"
            className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900"
            stagger={0.045}
          />
        </div>

        {/* ── Desktop: split panel ──────────────────────────────────────── */}
        <div className="hidden lg:grid lg:grid-cols-[1fr_1.1fr] gap-0 min-h-[520px]">

          {/* Left — service list */}
          <div className="flex flex-col divide-y divide-parchment-300/60 border-t border-parchment-300/60">
            {services.map((service, i) => {
              const isActive = active === i
              return (
                <motion.div
                  key={service.title}
                  onHoverStart={() => setActive(i)}
                  className={`relative flex items-start gap-6 px-8 py-8 cursor-default overflow-hidden transition-colors duration-300 ${
                    isActive ? 'bg-moss-800' : 'bg-white hover:bg-parchment-50'
                  }`}
                  initial={{ opacity: 0, x: -24 }}
                  animate={isInView ? { opacity: 1, x: 0 } : {}}
                  transition={{ duration: 0.55, delay: 0.1 + i * 0.1, ease }}
                >
                  {/* Active indicator bar */}
                  <motion.div
                    className="absolute left-0 top-0 bottom-0 w-0.5 bg-parchment-300"
                    animate={{ scaleY: isActive ? 1 : 0, opacity: isActive ? 1 : 0 }}
                    transition={{ duration: 0.3, ease }}
                  />

                  {/* Number */}
                  <span className={`font-display text-4xl font-light leading-none shrink-0 transition-colors duration-300 select-none ${
                    isActive ? 'text-parchment-500/40' : 'text-moss-800/15'
                  }`}>
                    {service.number}
                  </span>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className={`font-display text-2xl font-medium leading-snug mb-2 transition-colors duration-300 ${
                      isActive ? 'text-parchment-100' : 'text-stone-900'
                    }`}>
                      {service.title}
                    </h3>
                    <motion.p
                      className={`font-sans text-sm leading-relaxed transition-colors duration-300 ${
                        isActive ? 'text-parchment-400' : 'text-stone-500'
                      }`}
                      animate={{ height: isActive ? 'auto' : 'auto' }}
                    >
                      {service.desc}
                    </motion.p>
                    <motion.a
                      href="#contact"
                      className="inline-flex items-center gap-1.5 mt-4 text-[11px] font-sans font-semibold tracking-widest uppercase text-parchment-300 hover:text-parchment-100 transition-colors duration-200"
                      animate={{ opacity: isActive ? 1 : 0, y: isActive ? 0 : 6 }}
                      transition={{ duration: 0.25, ease }}
                    >
                      Work With Sara <ArrowRight size={11} />
                    </motion.a>
                  </div>
                </motion.div>
              )
            })}
          </div>

          {/* Right — atmospheric visual panel */}
          <div className="relative overflow-hidden">
            <AnimatePresence mode="wait">
              <motion.div
                key={active}
                className={`absolute inset-0 bg-gradient-to-br ${visual.bg}`}
                initial={{ opacity: 0, scale: 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.97 }}
                transition={{ duration: 0.55, ease }}
              >
                {/* Geometric SVG */}
                {visual.geo}

                {/* Radial glow */}
                <div
                  className="absolute inset-0"
                  style={{
                    background: `radial-gradient(ellipse at 70% 40%, ${visual.accent}18 0%, transparent 65%)`,
                  }}
                />

                {/* Content */}
                <div className="absolute inset-0 flex flex-col justify-end p-12">
                  <motion.div
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.15, ease }}
                  >
                    <div className="w-8 h-px mb-6" style={{ backgroundColor: `${visual.accent}80` }} />
                    <p
                      className="font-display text-3xl font-light italic leading-snug mb-8"
                      style={{ color: `${visual.accent}CC` }}
                    >
                      {visual.label}
                    </p>
                    <div>
                      <p
                        className="font-display text-5xl font-semibold leading-none"
                        style={{ color: visual.accent }}
                      >
                        {visual.stat}
                      </p>
                      <p className="font-sans text-[11px] tracking-widest uppercase mt-2" style={{ color: `${visual.accent}80` }}>
                        {visual.statLabel}
                      </p>
                    </div>
                  </motion.div>
                </div>

                {/* Service number watermark */}
                <div
                  className="absolute top-10 right-10 font-display text-[120px] font-light leading-none select-none"
                  style={{ color: `${visual.accent}08` }}
                >
                  {services[active].number}
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        {/* ── Mobile: simple card grid (unchanged) ─────────────────────── */}
        <div className="lg:hidden grid sm:grid-cols-2 gap-px bg-parchment-300/50">
          {services.map((service, i) => (
            <motion.div
              key={service.title}
              className="bg-white p-8 flex flex-col"
              initial={{ opacity: 0, y: 32 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.55, delay: i * 0.1, ease }}
            >
              <span className="font-display text-5xl font-light text-moss-800/15 leading-none mb-6 select-none">
                {service.number}
              </span>
              <h3 className="font-display text-2xl font-medium text-stone-900 mb-3 leading-snug">
                {service.title}
              </h3>
              <div className="w-8 h-px bg-moss-800/30 mb-4" />
              <p className="font-sans text-sm text-stone-500 leading-relaxed flex-1">{service.desc}</p>
              <a href="#contact" className="mt-6 inline-flex items-center gap-1.5 text-[11px] font-sans font-semibold tracking-widest uppercase text-moss-700">
                Learn More →
              </a>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  )
}
