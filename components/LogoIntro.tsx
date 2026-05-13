'use client'

import { useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'
import Image from 'next/image'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Animation beats:
//   0.3s  — logo mark wipes in left→right (diagonal clip sweep)
//   1.1s  — text portion slides up from below
//   2.0s  — logo settles, scroll hint appears, scroll unlocked
const PHASE_WAIT_DELAY = 2200

const ease = [0.25, 0.1, 0.25, 1] as const

interface LogoIntroProps {
  onComplete: () => void
}

export default function LogoIntro({ onComplete }: LogoIntroProps) {
  const bgRef         = useRef<HTMLDivElement>(null)
  const introLogoRef  = useRef<HTMLDivElement>(null)
  const scrollHintRef = useRef<HTMLDivElement>(null)

  const [phase, setPhase]           = useState<'animating' | 'waiting' | 'done'>('animating')
  const [showScroll, setShowScroll] = useState(false)

  // Lock scroll during the animation
  useEffect(() => {
    document.body.style.overflow = phase === 'animating' ? 'hidden' : ''
    return () => { document.body.style.overflow = '' }
  }, [phase])

  // Unlock scroll after animation beats finish
  useEffect(() => {
    const id = setTimeout(() => {
      setShowScroll(true)
      setPhase('waiting')
    }, PHASE_WAIT_DELAY)
    return () => clearTimeout(id)
  }, [])

  // GSAP ScrollTrigger — morphs the real logo from center → navbar on scroll
  useEffect(() => {
    if (phase !== 'waiting') return
    if (!introLogoRef.current || !bgRef.current) return

    const navLogoEl = document.querySelector('[data-navbar-logo]') as HTMLElement | null
    ScrollTrigger.refresh()

    const ctx = gsap.context(() => {
      const introBounds = introLogoRef.current!.getBoundingClientRect()
      const navBounds   = navLogoEl?.getBoundingClientRect()

      const targetScale = navBounds ? navBounds.height / introBounds.height : 0.35
      const targetX = navBounds
        ? (navBounds.left + navBounds.width  / 2) - (introBounds.left + introBounds.width  / 2)
        : -(window.innerWidth / 2) + 140
      const targetY = navBounds
        ? (navBounds.top  + navBounds.height / 2) - (introBounds.top  + introBounds.height / 2)
        : -(window.innerHeight / 2) + 50

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: document.documentElement,
          start: 'top top',
          end: '+=600',
          scrub: 1.2,
          onLeave: () => { setPhase('done'); onComplete() },
        },
      })

      tl.to(bgRef.current,         { opacity: 0, ease: 'power2.out'  }, 0)
      tl.to(scrollHintRef.current, { opacity: 0, ease: 'power1.out'  }, 0)
      tl.to(introLogoRef.current,  {
        x: targetX, y: targetY, scale: targetScale,
        ease: 'power2.inOut',
      }, 0)
    })

    return () => ctx.revert()
  }, [phase, onComplete])

  const skip = () => { if (phase !== 'animating') { setPhase('done'); onComplete() } }

  if (phase === 'done') return null

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center"
      style={{ pointerEvents: phase === 'animating' ? 'auto' : 'none' }}
    >
      {/* Cream background — logo reads in its natural green */}
      <div ref={bgRef} className="absolute inset-0 bg-[#F5F0E8]" />

      {/* Logo — GSAP morphs this to the navbar on scroll */}
      <div
        ref={introLogoRef}
        className="relative flex flex-col items-center"
        style={{ willChange: 'transform' }}
      >
        {/*
          The real logo is revealed in two beats:

          Beat 1 — Mark (top ~68% of logo height):
            Diagonal clip sweeps left → right, like a blade revealing the geometric mark.
            Uses polygon clip-path so the leading edge is angled, not straight.

          Beat 2 — Text (bottom ~32% of logo height):
            Slides up from behind a horizontal clip mask.

          Both clips expose the same real logo image, just at different timings.
          At rest the two layers perfectly overlap = the complete logo.
        */}

        {/* Beat 1: Mark reveal — diagonal wipe */}
        <motion.div
          className="overflow-hidden"
          style={{ height: '68%', width: '100%', position: 'absolute', top: 0 }}
          initial={{ clipPath: 'polygon(0% 0%, 0% 0%, 0% 100%, 0% 100%)' }}
          animate={{ clipPath: 'polygon(0% 0%, 100% 0%, 100% 100%, 0% 100%)' }}
          transition={{ duration: 1.1, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <Image
            src="/images/Green+Logo+no+background.png.webp"
            alt="The Mosser Group"
            width={480}
            height={185}
            className="brightness-100 object-contain object-top w-full"
            style={{ height: '185px' }}
            priority
          />
        </motion.div>

        {/* Beat 2: Text reveal — slides up from below */}
        <motion.div
          className="overflow-hidden"
          style={{ height: '32%', width: '100%', position: 'absolute', bottom: 0 }}
          initial={{ clipPath: 'inset(100% 0% 0% 0%)' }}
          animate={{ clipPath: 'inset(0% 0% 0% 0%)' }}
          transition={{ duration: 0.75, delay: 1.1, ease }}
        >
          <Image
            src="/images/Green+Logo+no+background.png.webp"
            alt=""
            aria-hidden
            width={480}
            height={185}
            className="brightness-100 object-contain object-bottom w-full"
            style={{ height: '185px', position: 'absolute', bottom: 0 }}
          />
        </motion.div>

        {/* Spacer so the container has the right dimensions */}
        <div style={{ width: '480px', height: '185px', opacity: 0 }} aria-hidden />
      </div>

      {/* Scroll hint + skip */}
      {showScroll && (
        <div
          ref={scrollHintRef}
          className="absolute bottom-10 flex flex-col items-center gap-3"
          style={{ pointerEvents: 'auto' }}
        >
          <motion.div
            className="flex flex-col items-center gap-3"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.8 }}
          >
            <span className="font-sans text-[9px] tracking-[0.35em] uppercase text-moss-700/40">
              Scroll to enter
            </span>
            <motion.div
              className="w-px bg-moss-700/20"
              animate={{ height: [0, 32, 0] }}
              transition={{ duration: 1.6, repeat: Infinity, ease: 'easeInOut' }}
            />
            <button
              onClick={skip}
              className="mt-2 font-sans text-[9px] tracking-[0.25em] uppercase text-moss-700/25 hover:text-moss-700/60 transition-colors duration-300"
            >
              Skip
            </button>
          </motion.div>
        </div>
      )}
    </div>
  )
}
