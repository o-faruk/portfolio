import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { EXPERIENCES } from '../data/experience'

function Tag({ label }) {
  return (
    <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.18em', textTransform: 'uppercase', padding: '4px 10px', border: '1px solid rgba(239,236,229,.15)', color: 'rgba(239,236,229,.8)' }}>
      {label}
    </span>
  )
}

function ExpCard({ exp, open, onToggle }) {
  const dot = exp.isWork ? '#a855f7' : '#c084fc'
  return (
    <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}
      style={{ position: 'relative', paddingLeft: 72 }}>
      {/* Timeline node */}
      <div style={{ position: 'absolute', left: 16, top: 4, zIndex: 10, width: 16, height: 16, background: '#0e0d14', border: '1px solid rgba(168,85,247,.7)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ width: 6, height: 6, background: dot }} />
      </div>
      <div style={{ position: 'relative', border: `1px solid ${open ? 'rgba(168,85,247,0.4)' : 'rgba(239,236,229,0.1)'}`, background: open ? '#16151c' : '#0e0d14', transition: 'border-color .3s,background .3s' }}>
        {open && <div style={{ position: 'absolute', left: 0, top: 0, bottom: 0, width: 3, background: '#a855f7' }} />}
        <button onClick={onToggle} style={{ width: '100%', padding: 24, textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', color: 'inherit' }}>
          <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: 20 }}>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: 8, marginBottom: 12 }}>
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(239,236,229,.35)' }}>{exp.num} /</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 700, padding: '4px 10px', border: `1px solid ${exp.isWork ? 'rgba(168,85,247,0.5)' : 'rgba(239,236,229,0.3)'}`, color: exp.isWork ? '#a855f7' : 'rgba(239,236,229,.8)', background: exp.isWork ? 'rgba(168,85,247,.08)' : 'rgba(239,236,229,.05)' }}>
                  <span style={{ width: 6, height: 6, borderRadius: '50%', background: dot }} />
                  {exp.kind}
                </span>
                {exp.badge && (
                  <span style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(168,85,247,.8)' }}>
                    <span className="relative inline-flex" style={{ width: 6, height: 6 }}>
                      <span className="animate-ping-ring absolute inset-0 rounded-full bg-signal opacity-70" />
                      <span className="relative rounded-full bg-signal" style={{ width: 6, height: 6 }} />
                    </span>
                    {exp.badge}
                  </span>
                )}
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.4)', marginLeft: 'auto' }}>{exp.period} · {exp.location}</span>
              </div>
              <h3 style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#efece5', fontSize: 'clamp(1.8rem,4vw,3rem)', lineHeight: .95, margin: '0 0 4px' }}>{exp.company}</h3>
              <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 13, color: 'rgba(239,236,229,.7)', margin: 0 }}>
                <span style={{ color: '#a855f7' }}>›</span> {exp.title}
              </p>
            </div>
            <div style={{ padding: 8, border: `1px solid ${open ? 'rgba(168,85,247,.5)' : 'rgba(239,236,229,.2)'}`, color: open ? '#a855f7' : 'rgba(239,236,229,.6)', transform: open ? 'rotate(180deg)' : 'none', transition: 'transform .3s,color .3s', flexShrink: 0 }}>▾</div>
          </div>
        </button>
        <AnimatePresence>
          {open && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} transition={{ duration: .3 }} style={{ overflow: 'hidden' }}>
              <div style={{ padding: '0 24px 28px', display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div style={{ height: 1, background: 'linear-gradient(90deg,rgba(168,85,247,.4),rgba(168,85,247,.1),transparent)' }} />
                <p style={{ fontFamily: 'Newsreader,serif', fontStyle: 'italic', fontSize: 17, lineHeight: 1.6, color: 'rgba(239,236,229,.8)', maxWidth: '44rem', margin: 0 }}>{exp.description}</p>
                <div>
                  <h4 style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(239,236,229,.6)', margin: '0 0 12px' }}>⚡ {exp.listLabel}</h4>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                    {exp.skills.map(s => <Tag key={s} label={s} />)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  )
}

export default function Experience() {
  const [open, setOpen] = useState(0)
  const toggle = i => setOpen(prev => prev === i ? -1 : i)

  return (
    <section id="experience" style={{ position: 'relative', padding: '112px 24px', overflow: 'hidden' }}>
      <div style={{ position: 'absolute', top: 80, left: '-60%', width: '220%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(168,85,247,.5) 40%,rgba(168,85,247,.5) 60%,transparent)', transform: 'rotate(-23deg)', opacity: .22, pointerEvents: 'none' }} />
      <div style={{ maxWidth: 1024, margin: '0 auto', position: 'relative', zIndex: 10 }}>
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
          style={{ marginBottom: 72, borderBottom: '1px solid rgba(168,85,247,.15)', paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
            <span style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#a855f7', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1 }}>III.</span>
            <div>
              <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.32em', color: 'rgba(168,85,247,.7)', textTransform: 'uppercase', margin: '0 0 8px' }}>// service_record</p>
              <h2 style={{ fontFamily: 'Fraunces,serif', fontVariationSettings: '"opsz" 144', letterSpacing: '-.03em', lineHeight: .88, margin: 0, fontSize: 'clamp(3rem,8vw,8rem)' }}>
                <span style={{ color: '#efece5', fontStyle: 'italic' }}>what </span>
                <span style={{ color: '#a855f7', fontStyle: 'italic' }}>i&apos;ve </span>
                <span style={{ color: '#efece5', fontStyle: 'italic' }}>built.</span>
              </h2>
            </div>
          </div>
        </motion.div>
        <div style={{ position: 'relative' }}>
          <div style={{ position: 'absolute', left: 24, top: 0, bottom: 0, width: 1, background: 'linear-gradient(to bottom,rgba(168,85,247,.4),rgba(239,236,229,.1),transparent)' }} />
          <div style={{ display: 'flex', flexDirection: 'column', gap: 40 }}>
            {EXPERIENCES.map((exp, i) => (
              <ExpCard key={exp.num} exp={exp} open={open === i} onToggle={() => toggle(i)} />
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}
