'use client'

// Orbs: large blurred green blobs drifting slowly across the section
const ORBS = [
  { left: '8%',  top: '14%', size: 500, opacity: 0.14, anim: 'orbA', dur: '18s', del: '0s'  },
  { left: '72%', top: '58%', size: 560, opacity: 0.11, anim: 'orbB', dur: '22s', del: '-7s' },
  { left: '42%', top: '80%', size: 420, opacity: 0.10, anim: 'orbC', dur: '26s', del: '-12s'},
] as const

// Motes: visible floating dust — 3–5px, higher opacity so they actually read
const MOTES = [
  { l: '5%',  t: '9%',  sz: 3, op: 0.22, anim: 'moteA', dur: '14s', del: '0s'   },
  { l: '14%', t: '36%', sz: 2, op: 0.18, anim: 'moteB', dur: '11s', del: '-3s'  },
  { l: '25%', t: '70%', sz: 4, op: 0.15, anim: 'moteC', dur: '17s', del: '-8s'  },
  { l: '38%', t: '18%', sz: 2, op: 0.20, anim: 'moteA', dur: '13s', del: '-5s'  },
  { l: '50%', t: '54%', sz: 3, op: 0.16, anim: 'moteB', dur: '19s', del: '-11s' },
  { l: '60%', t: '88%', sz: 2, op: 0.18, anim: 'moteC', dur: '12s', del: '-2s'  },
  { l: '68%', t: '22%', sz: 4, op: 0.13, anim: 'moteA', dur: '20s', del: '-9s'  },
  { l: '78%', t: '46%', sz: 2, op: 0.20, anim: 'moteB', dur: '15s', del: '-6s'  },
  { l: '86%', t: '75%', sz: 3, op: 0.15, anim: 'moteC', dur: '18s', del: '-14s' },
  { l: '93%', t: '12%', sz: 2, op: 0.18, anim: 'moteA', dur: '16s', del: '-4s'  },
  { l: '30%', t: '93%', sz: 3, op: 0.14, anim: 'moteB', dur: '22s', del: '-17s' },
  { l: '55%', t: '33%', sz: 4, op: 0.13, anim: 'moteC', dur: '21s', del: '-10s' },
] as const

export default function AmbientBackground() {
  return (
    <div
      aria-hidden
      className="absolute inset-0 overflow-hidden pointer-events-none select-none"
      style={{ zIndex: 0 }}
    >
      {ORBS.map((orb, i) => (
        <div
          key={i}
          className="ambient-orb absolute rounded-full"
          style={{
            left: orb.left,
            top: orb.top,
            width: orb.size,
            height: orb.size,
            opacity: orb.opacity,
            background:
              'radial-gradient(circle at 38% 38%, rgba(52,92,68,1) 0%, rgba(27,58,41,0.6) 44%, transparent 68%)',
            filter: 'blur(60px)',
            transform: 'translate(-50%,-50%)',
            willChange: 'transform',
            animationName: orb.anim,
            animationDuration: orb.dur,
            animationDelay: orb.del,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
          }}
        />
      ))}

      {MOTES.map((m, i) => (
        <div
          key={i}
          className="ambient-mote absolute rounded-full"
          style={{
            left: m.l,
            top: m.t,
            width: m.sz,
            height: m.sz,
            opacity: m.op,
            backgroundColor: 'rgba(205,195,175,1)',
            willChange: 'transform',
            animationName: m.anim,
            animationDuration: m.dur,
            animationDelay: m.del,
            animationTimingFunction: 'ease-in-out',
            animationIterationCount: 'infinite',
            animationDirection: 'alternate',
          }}
        />
      ))}

      {/* Diagonal grain line at 135° — matches logo geometry */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.025,
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(230,222,206,0.6) 0px, transparent 1px, transparent 52px, rgba(230,222,206,0.6) 53px)',
        }}
      />
    </div>
  )
}
