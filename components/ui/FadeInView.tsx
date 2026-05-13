'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ReactNode } from 'react'

interface FadeInViewProps {
  children: ReactNode
  className?: string
  delay?: number
  direction?: 'up' | 'down' | 'left' | 'right' | 'none'
  duration?: number
}

export default function FadeInView({
  children,
  className = '',
  delay = 0,
  direction = 'up',
  duration = 0.7,
}: FadeInViewProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-80px' })

  const offsets = {
    up:    { y: 36, x: 0 },
    down:  { y: -36, x: 0 },
    left:  { y: 0, x: 36 },
    right: { y: 0, x: -36 },
    none:  { y: 0, x: 0 },
  }
  const { x, y } = offsets[direction]

  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, x, y }}
      animate={isInView ? { opacity: 1, x: 0, y: 0 } : { opacity: 0, x, y }}
      transition={{ duration, delay, ease: [0.25, 0.1, 0.25, 1] }}
    >
      {children}
    </motion.div>
  )
}
