'use client'

const ORBS = [
  { left: '8%',  top: '14%', size: 520, opacity: 0.07,  anim: 'orbA', dur: '32s', del: '0s'   },
  { left: '72%', top: '62%', size: 580, opacity: 0.055, anim: 'orbB', dur: '41s', del: '-13s' },
  { left: '42%', top: '84%', size: 420, opacity: 0.045, anim: 'orbC', dur: '52s', del: '-24s' },
] as const

const MOTES = [
  { l: '5%',  t: '9%',  sz: 1.5, op: 0.10, anim: 'moteA', dur: '34s', del: '0s'   },
  { l: '14%', t: '36%', sz: 1.0, op: 0.07, anim: 'moteB', dur: '29s', del: '-5s'  },
  { l: '25%', t: '70%', sz: 2.0, op: 0.06, anim: 'moteC', dur: '43s', del: '-14s' },
  { l: '38%', t: '18%', sz: 1.0, op: 0.09, anim: 'moteA', dur: '37s', del: '-8s'  },
  { l: '50%', t: '54%', sz: 1.5, op: 0.07, anim: 'moteB', dur: '46s', del: '-21s' },
  { l: '60%', t: '88%', sz: 1.0, op: 0.08, anim: 'moteC', dur: '31s', del: '-3s'  },
  { l: '68%', t: '22%', sz: 2.0, op: 0.05, anim: 'moteA', dur: '40s', del: '-17s' },
  { l: '78%', t: '46%', sz: 1.0, op: 0.09, anim: 'moteB', dur: '35s', del: '-9s'  },
  { l: '86%', t: '75%', sz: 1.5, op: 0.06, anim: 'moteC', dur: '44s', del: '-26s' },
  { l: '93%', t: '12%', sz: 1.0, op: 0.08, anim: 'moteA', dur: '38s', del: '-6s'  },
  { l: '30%', t: '93%', sz: 1.0, op: 0.07, anim: 'moteB', dur: '50s', del: '-30s' },
  { l: '55%', t: '33%', sz: 1.5, op: 0.06, anim: 'moteC', dur: '42s', del: '-19s' },
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
              'radial-gradient(circle at 38% 38%, rgba(52,92,68,0.95) 0%, rgba(27,58,41,0.5) 44%, transparent 68%)',
            filter: 'blur(64px)',
            transform: 'translate(-50%,-50%)',
            willChange: 'transform',
            animation: `${orb.anim} ${orb.dur} ${orb.del} ease-in-out infinite`,
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
            backgroundColor: 'rgba(230,222,206,0.9)',
            willChange: 'transform',
            animation: `${m.anim} ${m.dur} ${m.del} ease-in-out infinite`,
          }}
        />
      ))}

      <div
        style={{
          position: 'absolute',
          inset: 0,
          opacity: 0.018,
          backgroundImage:
            'repeating-linear-gradient(135deg, rgba(230,222,206,0.5) 0px, transparent 1px, transparent 52px, rgba(230,222,206,0.5) 53px)',
        }}
      />
    </div>
  )
}
