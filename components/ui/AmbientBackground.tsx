'use client'

import { motion, useReducedMotion } from 'framer-motion'

// Orbs: large blurred radial-gradient blobs drifting diagonally
// All values are static to avoid SSR/hydration mismatch
const ORBS = [
  { left: '8%',  top: '12%', size: 540, opacity: 0.062, dur: 32, del: 0    },
  { left: '70%', top: '60%', size: 620, opacity: 0.050, dur: 40, del: -13  },
  { left: '40%', top: '82%', size: 440, opacity: 0.042, dur: 50, del: -24  },
  { left: '86%', top: '18%', size: 380, opacity: 0.038, dur: 36, del: -7   },
] as const

// Drift keyframes per orb — slight diagonal to echo logo geometry
const orbDrift = (i: number) => {
  const s = i % 2 === 0 ? 1 : -1
  return {
    x: [0, s * 28, s * -18, 0],
    y: [0, s * 34, s * -22, 0],
  }
}

// Dust particles: tiny motes, slow diagonal drift, static positions
const PARTICLES = [
  { l: '4%',  t: '8%',  sz: 1.5, op: 0.11, dur: 34, del: 0,   dx: 9,  dy: 12 },
  { l: '13%', t: '35%', sz: 1.0, op: 0.08, dur: 29, del: -5,  dx: -7, dy: 10 },
  { l: '19%', t: '72%', sz: 2.0, op: 0.06, dur: 42, del: -13, dx: 8,  dy: 11 },
  { l: '27%', t: '16%', sz: 1.0, op: 0.09, dur: 37, del: -8,  dx: -9, dy: 13 },
  { l: '33%', t: '58%', sz: 1.5, op: 0.07, dur: 46, del: -21, dx: 10, dy: 14 },
  { l: '42%', t: '90%', sz: 1.0, op: 0.08, dur: 31, del: -3,  dx: -6, dy: 9  },
  { l: '50%', t: '23%', sz: 2.0, op: 0.05, dur: 40, del: -17, dx: 7,  dy: 10 },
  { l: '56%', t: '47%', sz: 1.0, op: 0.10, dur: 35, del: -9,  dx: -8, dy: 12 },
  { l: '63%', t: '78%', sz: 1.5, op: 0.07, dur: 44, del: -26, dx: 9,  dy: 11 },
  { l: '71%', t: '11%', sz: 1.0, op: 0.09, dur: 38, del: -6,  dx: -7, dy: 13 },
  { l: '78%', t: '53%', sz: 2.0, op: 0.05, dur: 52, del: -19, dx: 8,  dy: 10 },
  { l: '85%', t: '31%', sz: 1.0, op: 0.08, dur: 33, del: -2,  dx: -9, dy: 12 },
  { l: '92%', t: '69%', sz: 1.5, op: 0.09, dur: 41, del: -15, dx: 7,  dy: 11 },
  { l: '97%', t: '91%', sz: 1.0, op: 0.06, dur: 47, del: -23, dx: -8, dy: 9  },
  { l: '7%',  t: '93%', sz: 1.0, op: 0.07, dur: 39, del: -11, dx: 10, dy: 13 },
  { l: '22%', t: '44%', sz: 1.5, op: 0.08, dur: 45, del: -28, dx: -7, dy: 10 },
  { l: '47%', t: '66%', sz: 1.0, op: 0.06, dur: 32, del: -4,  dx: 9,  dy: 14 },
  { l: '59%', t: '19%', sz: 2.0, op: 0.07, dur: 43, del: -20, dx: -8, dy: 11 },
  { l: '74%', t: '85%', sz: 1.0, op: 0.05, dur: 55, del: -35, dx: 7,  dy: 9  },
  { l: '89%', t: '5%',  sz: 1.5, op: 0.09, dur: 30, del: -1,  dx: -9, dy: 12 },
] as const

export default function AmbientBackground() {
  const reduced = useReducedMotion()

  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {/* Gradient orbs — deep forest green, heavily blurred */}
      {ORBS.map((orb, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            background:
              'radial-gradient(circle at 40% 40%, rgba(52,92,68,0.9) 0%, rgba(27,58,41,0.55) 42%, transparent 68%)',
            filter: 'blur(72px)',
            transform: 'translate(-50%, -50%)',
          }}
          animate={reduced ? undefined : orbDrift(i)}
          transition={{
            duration: orb.dur,
            delay: orb.del,
            repeat: Infinity,
            repeatType: 'mirror',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Dust particles — faint parchment motes, slow diagonal drift */}
      {PARTICLES.map((p, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: p.l,
            top: p.t,
            width: p.sz,
            height: p.sz,
            opacity: p.op,
            backgroundColor: 'rgba(230, 222, 206, 0.9)',
          }}
          animate={
            reduced
              ? undefined
              : {
                  x: [0, p.dx, -p.dx * 0.6, 0],
                  y: [0, p.dy, -p.dy * 0.7, 0],
                  opacity: [p.op, p.op * 1.4, p.op * 0.5, p.op],
                }
          }
          transition={{
            duration: p.dur,
            delay: p.del,
            repeat: Infinity,
            repeatType: 'loop',
            ease: 'easeInOut',
          }}
        />
      ))}

      {/* Very faint diagonal grain texture overlay */}
      <div
        className="absolute inset-0 opacity-[0.018]"
        style={{
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(230,222,206,0.6) 0px, transparent 1px, transparent 48px, rgba(230,222,206,0.6) 49px)',
        }}
      />
    </div>
  )
}
