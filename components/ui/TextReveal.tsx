'use client'

import { motion, useInView } from 'framer-motion'
import { useRef, ElementType } from 'react'

interface TextRevealProps {
  text: string
  className?: string
  delay?: number
  stagger?: number
  as?: ElementType
}

// Each word slides up from behind an overflow:hidden clip — classic luxury editorial reveal.
export default function TextReveal({
  text,
  className = '',
  delay = 0,
  stagger = 0.045,
  as: Tag = 'h2',
}: TextRevealProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-60px' })

  const words = text.split(' ')

  return (
    <Tag ref={ref} className={className} aria-label={text}>
      {words.map((word, i) => (
        <span key={i} className="inline-block overflow-hidden leading-[1.1]">
          <motion.span
            className="inline-block"
            initial={{ y: '105%', opacity: 0 }}
            animate={isInView ? { y: 0, opacity: 1 } : { y: '105%', opacity: 0 }}
            transition={{
              duration: 0.65,
              delay: delay + i * stagger,
              ease: [0.25, 0.1, 0.25, 1],
            }}
          >
            {word}&nbsp;
          </motion.span>
        </span>
      ))}
    </Tag>
  )
}
