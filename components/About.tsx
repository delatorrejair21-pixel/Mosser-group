'use client'

import { motion, useInView } from 'framer-motion'
import { useRef } from 'react'
import FadeInView from '@/components/ui/FadeInView'
import TextReveal from '@/components/ui/TextReveal'
import { about } from '@/data/content'

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

export default function About() {
  return (
    <section id="about" className="bg-parchment-50 py-28 lg:py-40">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 items-start">

          {/* Left */}
          <FadeInView direction="right">
            <div>
              <EyebrowWipe text={about.eyebrow} className="text-moss-700" />

              <TextReveal
                text={about.headline}
                className="font-display text-5xl md:text-6xl font-light leading-tight text-stone-900 mb-10"
                stagger={0.06}
              />

              <div className="space-y-5">
                {about.paragraphs.map((p, i) => (
                  <FadeInView key={i} delay={0.15 + i * 0.1}>
                    <p className="font-sans text-base md:text-lg text-stone-600 leading-relaxed">
                      {p}
                    </p>
                  </FadeInView>
                ))}
              </div>

              <FadeInView delay={0.35}>
                <div className="mt-12">
                  <a
                    href="#contact"
                    className="inline-flex items-center gap-2 font-sans text-sm tracking-wide text-moss-800 border-b border-moss-800 pb-0.5 hover:text-moss-600 hover:border-moss-600 transition-colors duration-300"
                  >
                    Start a conversation with Sara
                  </a>
                </div>
              </FadeInView>
            </div>
          </FadeInView>

          {/* Right — Values */}
          <FadeInView direction="left" delay={0.1}>
            <div className="divide-y divide-parchment-300/70">
              {about.values.map((value, i) => (
                <motion.div
                  key={value.title}
                  className="py-8 group"
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: '-60px' }}
                  transition={{ duration: 0.55, delay: i * 0.12, ease: [0.25, 0.1, 0.25, 1] }}
                >
                  <div className="flex items-start gap-5">
                    <span className="font-display text-3xl font-light text-moss-800/20 leading-none pt-1 select-none">
                      {String(i + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-display text-xl font-medium text-stone-900 mb-2">
                        {value.title}
                      </h3>
                      <p className="font-sans text-stone-500 text-sm leading-relaxed">
                        {value.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </FadeInView>

        </div>
      </div>
    </section>
  )
}
