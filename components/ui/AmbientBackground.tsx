'use client'

import { useEffect, useRef } from 'react'

interface Orb {
  x: number; y: number; r: number
  vx: number; vy: number
  color: [number, number, number]; alpha: number
}

interface Mote {
  x: number; y: number; r: number
  vx: number; vy: number; alpha: number
}

export default function AmbientBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf: number
    let W = 0, H = 0

    function resize() {
      if (!canvas) return
      W = canvas.offsetWidth
      H = canvas.offsetHeight
      canvas.width  = W
      canvas.height = H
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)

    // Orbs — large blurred radial glows
    const orbs: Orb[] = [
      { x: W * 0.08, y: H * 0.14, r: 260, vx: 0.55, vy: 0.65, color: [44, 80, 58],  alpha: 0.18 },
      { x: W * 0.72, y: H * 0.60, r: 290, vx:-0.50, vy: 0.60, color: [36, 70, 50],  alpha: 0.15 },
      { x: W * 0.42, y: H * 0.82, r: 220, vx: 0.45, vy:-0.55, color: [52, 90, 65],  alpha: 0.13 },
    ]

    // Motes — tiny floating dust particles
    const motes: Mote[] = Array.from({ length: 14 }, (_, i) => ({
      x: W * (0.05 + i * 0.068),
      y: H * (0.1 + (i % 5) * 0.18),
      r: 1.5 + (i % 3) * 0.8,
      vx: (i % 2 === 0 ? 0.38 : -0.32) + (i % 3) * 0.08,
      vy: 0.25 + (i % 4) * 0.10,
      alpha: 0.12 + (i % 5) * 0.04,
    }))

    // Orb bounce bounds with padding so they don't disappear at edges
    function tickOrbs() {
      for (const o of orbs) {
        o.x += o.vx
        o.y += o.vy
        const pad = o.r * 0.4
        if (o.x < pad || o.x > W - pad) o.vx *= -1
        if (o.y < pad || o.y > H - pad) o.vy *= -1
      }
    }

    function tickMotes() {
      for (const m of motes) {
        m.x += m.vx
        m.y += m.vy
        if (m.x < 0)  m.x = W
        if (m.x > W)  m.x = 0
        if (m.y < 0)  m.y = H
        if (m.y > H)  m.y = 0
      }
    }

    function drawOrb(o: Orb) {
      const g = ctx!.createRadialGradient(o.x, o.y, 0, o.x, o.y, o.r)
      const [r, g2, b] = o.color
      g.addColorStop(0,   `rgba(${r},${g2},${b},${o.alpha})`)
      g.addColorStop(0.45,`rgba(${r},${g2},${b},${o.alpha * 0.4})`)
      g.addColorStop(1,   `rgba(${r},${g2},${b},0)`)
      ctx!.beginPath()
      ctx!.arc(o.x, o.y, o.r, 0, Math.PI * 2)
      ctx!.fillStyle = g
      ctx!.fill()
    }

    function drawMote(m: Mote) {
      ctx!.beginPath()
      ctx!.arc(m.x, m.y, m.r, 0, Math.PI * 2)
      ctx!.fillStyle = `rgba(205,195,170,${m.alpha})`
      ctx!.fill()
    }

    function draw() {
      ctx!.clearRect(0, 0, W, H)
      tickOrbs()
      tickMotes()
      for (const o of orbs)  drawOrb(o)
      for (const m of motes) drawMote(m)
      raf = requestAnimationFrame(draw)
    }

    raf = requestAnimationFrame(draw)

    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className="absolute inset-0 w-full h-full pointer-events-none select-none"
      style={{ zIndex: 0 }}
    />
  )
}
