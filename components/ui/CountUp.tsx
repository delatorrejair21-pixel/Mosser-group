'use client'

import { useEffect, useRef, useState } from 'react'
import { useInView } from 'framer-motion'

function parse(value: string) {
  const m = value.match(/^([^0-9]*)(\d+\.?\d*)(.*)$/)
  if (!m) return { prefix: '', num: 0, suffix: value }
  return { prefix: m[1], num: parseFloat(m[2]), suffix: m[3] }
}

interface CountUpProps {
  value: string
  className?: string
  duration?: number
}

export default function CountUp({ value, className, duration = 1800 }: CountUpProps) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-40px' })
  const [count, setCount] = useState(0)
  const { prefix, num, suffix } = parse(value)

  useEffect(() => {
    if (!isInView) return
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.round(eased * num))
      if (progress < 1) requestAnimationFrame(tick)
    }

    requestAnimationFrame(tick)
  }, [isInView, num, duration])

  return (
    <span ref={ref} className={className}>
      {prefix}{count}{suffix}
    </span>
  )
}
