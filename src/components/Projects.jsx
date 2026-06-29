import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion'
import { PROJECTS } from '../data/projects'

function PingDot({ size = 6 }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span className="animate-ping-ring absolute inset-0 rounded-full bg-signal opacity-70" />
      <span className="relative rounded-full bg-signal" style={{ width: size, height: size }} />
    </span>
  )
}

function Tag({ label }) {
  return (
    <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.12em', textTransform: 'uppercase', padding: '4px 8px', border: '1px solid rgba(168,85,247,.25)', color: 'rgba(239,236,229,.75)' }}>
      [{label}]
    </span>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => { window.removeEventListener('keydown', onKey); document.body.style.overflow = '' }
  }, [onClose])

  return (
    <AnimatePresence>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
        style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
        onClick={e => { if (e.target === e.currentTarget) onClose() }}>
        <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,13,20,.95)' }} />
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 24 }}
          style={{ position: 'relative', width: '100%', maxWidth: 980, maxHeight: '92vh', overflowY: 'auto', background: '#0e0d14', border: '1px solid rgba(168,85,247,.3)' }}>
          {/* corner brackets */}
          {[['top:-1px','left:-1px','borderTop','borderLeft'],['top:-1px','right:-1px','borderTop','borderRight'],['bottom:-1px','left:-1px','borderBottom','borderLeft'],['bottom:-1px','right:-1px','borderBottom','borderRight']].map(([p1,p2,b1,b2],i)=>(
            <span key={i} style={{ position:'absolute', ...Object.fromEntries([p1,p2].map(s=>s.split(':'))), width:18, height:18, [b1]:'1px solid rgba(168,85,247,.7)', [b2]:'1px solid rgba(168,85,247,.7)' }} />
          ))}
          <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, zIndex: 10, padding: '8px 12px', border: '1px solid rgba(239,236,229,.3)', color: 'rgba(239,236,229,.8)', background: 'rgba(14,13,20,.6)', cursor: 'pointer', fontFamily: '"JetBrains Mono",monospace', fontSize: 16 }}>✕</button>
          {/* preview area */}
          <div style={{ height: 300, background: '#08070d', borderBottom: '1px solid rgba(239,236,229,.1)', backgroundImage: 'repeating-linear-gradient(135deg,rgba(168,85,247,.07) 0 1px,transparent 1px 13px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(239,236,229,.35)' }}>// {project.capLabel}</span>
          </div>
          <div style={{ padding: 32 }}>
            <div style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 12 }}>— dossier_entry</div>
            <h2 style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#efece5', fontSize: 'clamp(2.4rem,6vw,4rem)', lineHeight: .9, margin: '0 0 8px' }}>{project.name}</h2>
            <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 13, color: 'rgba(239,236,229,.6)', margin: '0 0 24px' }}>{project.tagline}</p>
            <p style={{ fontFamily: 'Newsreader,serif', fontSize: 16, lineHeight: 1.7, color: 'rgba(239,236,229,.85)', whiteSpace: 'pre-wrap', margin: '0 0 28px' }}>{project.long}</p>
            <h3 style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', color: 'rgba(239,236,229,.55)', margin: '0 0 12px' }}>◆ stack</h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28 }}>
              {project.tags.map(t => <Tag key={t} label={t} />)}
            </div>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, borderTop: '1px solid rgba(239,236,229,.1)', paddingTop: 24 }}>
              <a href={project.live} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', background: '#a855f7', color: '#0e0d14', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, border: '2px solid #a855f7', textDecoration: 'none' }}>↗ visit live</a>
              <a href={project.src} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '12px 24px', border: '2px solid rgba(239,236,229,.25)', color: 'rgba(239,236,229,.85)', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>&lt;/&gt; source</a>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  )
}

export default function Projects() {
  const [modal, setModal] = useState(null)
  const wrapRef = useRef(null)
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ['start start', 'end end'] })
  const activeIdx = useTransform(scrollYProgress, [0, 1], [0, PROJECTS.length - 0.001])
  const [active, setActive] = useState(0)
  const [wmKey, setWmKey] = useState(-1)

  useEffect(() => activeIdx.on('change', v => {
    const i = Math.min(PROJECTS.length - 1, Math.max(0, Math.floor(v)))
    setActive(prev => {
      if (prev !== i) setWmKey(k => k + 1)
      return i
    })
  }), [activeIdx])

  const p = PROJECTS[active]
  const pct = useTransform(scrollYProgress, [0, 1], [0, 100])
  const [barPct, setBarPct] = useState(0)
  useEffect(() => pct.on('change', v => setBarPct(Math.round(v))), [pct])

  function jumpTo(i) {
    const rect = wrapRef.current.getBoundingClientRect()
    const start = window.scrollY + rect.top
    const step = (wrapRef.current.offsetHeight - window.innerHeight) / PROJECTS.length
    window.scrollTo({ top: start + step * (i + 0.5), behavior: 'smooth' })
  }

  return (
    <section id="projects" style={{ position: 'relative' }}>
      {modal && <ProjectModal project={PROJECTS[modal - 1]} onClose={() => setModal(null)} />}

      {/* Section header */}
      <div style={{ maxWidth: 1280, margin: '0 auto', padding: '112px 24px 48px' }}>
        <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', gap: 32, borderBottom: '1px solid rgba(168,85,247,.15)', paddingBottom: 24 }}>
          <div style={{ display: 'flex', alignItems: 'baseline', gap: 24 }}>
            <span style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#a855f7', fontSize: 'clamp(28px,4vw,40px)', lineHeight: 1 }}>II.</span>
            <div>
              <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.32em', color: 'rgba(168,85,247,.7)', textTransform: 'uppercase', margin: '0 0 8px' }}>// mission_dossier</p>
              <h2 style={{ fontFamily: 'Fraunces,serif', fontVariationSettings: '"opsz" 144,"SOFT" 30', letterSpacing: '-.03em', lineHeight: .88, color: '#efece5', margin: 0, fontSize: 'clamp(3rem,8vw,8rem)' }}>
                <span style={{ fontStyle: 'italic' }}>selected</span> <span style={{ color: '#a855f7' }}>works.</span>
              </h2>
            </div>
          </div>
          <div style={{ textAlign: 'right', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.45)' }}>
            <div>files {String(PROJECTS.length).padStart(2,'0')} active</div>
            <div style={{ color: 'rgba(168,85,247,.6)', marginTop: 4 }}>scroll to traverse ▼</div>
          </div>
        </div>
      </div>

      {/* Desktop sticky dossier */}
      <div ref={wrapRef} className="projects-desktop-wrapper" style={{ position: 'relative', height: `${(PROJECTS.length + 1) * 100}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>

          {/* Top bar */}
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px 12px', fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ color: '#a855f7', fontVariantNumeric: 'tabular-nums' }}>[ {p.num} / {String(PROJECTS.length).padStart(2,'0')} ]</span>
                <span style={{ color: 'rgba(239,236,229,.3)' }}>·</span>
                <span style={{ color: 'rgba(239,236,229,.85)', fontFamily: 'Fraunces,serif', fontStyle: 'italic', textTransform: 'none', letterSpacing: '.04em', fontSize: 18 }}>{p.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(239,236,229,.45)' }}>
                <span style={{ color: 'rgba(168,85,247,.7)' }}>▶</span>
                <span>mission_dossier</span>
              </div>
            </div>
            {/* Progress bar */}
            <div style={{ position: 'relative', height: 3, margin: '0 40px', background: 'rgba(239,236,229,.08)', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', width: `${barPct}%`, background: 'linear-gradient(90deg,#a855f7,#c084fc,#a855f7)' }} />
            </div>
            {/* Ticks */}
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 40px 0' }}>
              {PROJECTS.map((_, i) => (
                <span key={i} style={{ display: 'block', width: 1, height: active >= i ? 8 : 4, background: active >= i ? '#a855f7' : 'rgba(239,236,229,.25)', transition: 'all .3s' }} />
              ))}
            </div>
          </div>

          {/* Mini index */}
          <div style={{ position: 'absolute', left: 40, top: '50%', transform: 'translateY(-50%)', display: 'flex', flexDirection: 'column', gap: 12, zIndex: 20 }}>
            {PROJECTS.map((proj, i) => {
              const on = active === i
              return (
                <button key={i} onClick={() => jumpTo(i)} style={{ display: 'flex', alignItems: 'center', gap: 12, background: 'none', border: 'none', cursor: 'pointer' }}>
                  <span style={{ display: 'block', height: 1, transition: 'all .5s', width: on ? 32 : 12, background: on ? '#a855f7' : 'rgba(239,236,229,.4)' }} />
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', transition: 'color .5s', color: on ? '#a855f7' : 'rgba(239,236,229,.4)' }}>{proj.num}</span>
                </button>
              )
            })}
          </div>

          {/* Watermark numeral */}
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            <motion.div key={wmKey} initial={{ opacity: 0, x: 24 }} animate={{ opacity: .13, x: 0 }} transition={{ duration: .6 }}
              style={{ position: 'absolute', bottom: -64, right: -32, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <span style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#a855f7', lineHeight: .78, fontVariantNumeric: 'tabular-nums', fontSize: 'clamp(14rem,24vw,26rem)' }}>{p.num}</span>
              <span style={{ fontFamily: '"JetBrains Mono",monospace', color: 'rgba(239,236,229,.15)', fontSize: 24, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 48 }}>/ {String(PROJECTS.length).padStart(2,'0')}</span>
            </motion.div>
          </div>

          {/* Main content grid */}
          <div style={{ position: 'relative', width: '100%', maxWidth: 1280, margin: '0 auto', zIndex: 2, padding: '0 64px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
              {/* Preview */}
              <motion.div key={`preview-${active}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                onClick={() => setModal(active + 1)} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter'&&setModal(active+1)}
                style={{ position: 'relative', aspectRatio: '16/10', background: '#16151c', border: '1px solid rgba(239,236,229,.1)', overflow: 'hidden', cursor: 'pointer' }}>
                {[['top:-1px','left:-1px','borderTop','borderLeft'],['top:-1px','right:-1px','borderTop','borderRight'],['bottom:-1px','left:-1px','borderBottom','borderLeft'],['bottom:-1px','right:-1px','borderBottom','borderRight']].map(([p1,p2,b1,b2],i)=>(
                  <span key={i} style={{ position:'absolute', ...Object.fromEntries([p1,p2].map(s=>s.split(':'))), width:18, height:18, [b1]:'1px solid rgba(168,85,247,.65)', [b2]:'1px solid rgba(168,85,247,.65)', zIndex:5 }} />
                ))}
                <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg,rgba(168,85,247,.07) 0 1px,transparent 1px 11px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(239,236,229,.35)' }}>// {p.capLabel}</span>
                </div>
                <div style={{ position: 'absolute', top: 12, left: 12, right: 12, fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a855f7' }}>[ dossier_{p.num} ]</div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.65)' }}>
                  <span>▶ click_to_access</span>
                  <span style={{ color: 'rgba(168,85,247,.7)' }}>[ {p.num} / {String(PROJECTS.length).padStart(2,'0')} ]</span>
                </div>
              </motion.div>

              {/* Info */}
              <motion.div key={`info-${active}`} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 16 }}>
                  <span style={{ display: 'inline-block', padding: 8, border: '1px solid rgba(168,85,247,.4)', color: '#a855f7', fontSize: 14, lineHeight: 1 }}>◆</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(168,85,247,.7)' }}>// project_file</span>
                </div>
                <h3 style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', fontVariationSettings: '"opsz" 144', letterSpacing: '-.03em', color: '#efece5', fontSize: 'clamp(2.4rem,4.5vw,4rem)', lineHeight: .92, margin: '0 0 12px' }}>{p.name}</h3>
                <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.55)', margin: '0 0 24px' }}>{p.tagline}</p>
                <p style={{ fontFamily: 'Newsreader,serif', fontSize: 16, lineHeight: 1.55, color: 'rgba(239,236,229,.8)', maxWidth: '34rem', margin: '0 0 28px' }}>{p.desc}</p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, marginBottom: 28, maxWidth: '30rem' }}>
                  {p.tags.map(t => <Tag key={t} label={t} />)}
                </div>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12 }}>
                  <button onClick={() => setModal(active + 1)} style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '10px 20px', background: '#a855f7', color: '#0e0d14', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, border: '2px solid #a855f7', cursor: 'pointer' }}>▶ access_file ↗</button>
                  <a href={p.live} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '2px solid rgba(168,85,247,.4)', color: '#a855f7', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', background: 'rgba(168,85,247,.04)' }}>↗ live</a>
                  <a href={p.src} style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '2px solid rgba(239,236,229,.25)', color: 'rgba(239,236,229,.85)', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>&lt;/&gt; source</a>
                </div>
              </motion.div>
            </div>
          </div>

          {/* Bottom label */}
          <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.55)' }}>
              <span style={{ color: '#a855f7' }}>[ {p.num} / {String(PROJECTS.length).padStart(2,'0')} ]</span>
              <span style={{ color: 'rgba(239,236,229,.3)' }}>·</span>
              <span style={{ color: 'rgba(239,236,229,.8)' }}>{p.name}</span>
            </div>
            <span className="animate-dot-drift" style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.4em', textTransform: 'uppercase', color: 'rgba(168,85,247,.7)' }}>scroll ▼</span>
          </div>
        </div>
      </div>

      {/* Mobile stacked */}
      <div className="lg:hidden" style={{ padding: '0 16px 64px', display: 'flex', flexDirection: 'column', gap: 56 }}>
        {PROJECTS.map(proj => (
          <motion.div key={proj.num} initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, amount: 0.12 }}>
            <div style={{ position: 'relative', aspectRatio: '16/10', background: '#16151c', border: '1px solid rgba(239,236,229,.1)', overflow: 'hidden', marginBottom: 20 }}>
              {[['top:-1px','left:-1px','borderTop','borderLeft'],['bottom:-1px','right:-1px','borderBottom','borderRight']].map(([p1,p2,b1,b2],i)=>(
                <span key={i} style={{ position:'absolute', ...Object.fromEntries([p1,p2].map(s=>s.split(':'))), width:14, height:14, [b1]:'1px solid rgba(168,85,247,.65)', [b2]:'1px solid rgba(168,85,247,.65)' }} />
              ))}
              <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg,rgba(168,85,247,.07) 0 1px,transparent 1px 11px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(239,236,229,.35)' }}>// {proj.capLabel}</span>
              </div>
              <div style={{ position: 'absolute', top: 10, left: 10, fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a855f7' }}>[ dossier_{proj.num} ]</div>
            </div>
            <h3 style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#efece5', fontSize: '2.2rem', lineHeight: .95, margin: '0 0 8px' }}>{proj.name}</h3>
            <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.55)', margin: '0 0 16px' }}>{proj.tagline}</p>
            <p style={{ fontFamily: 'Newsreader,serif', fontSize: 15, lineHeight: 1.55, color: 'rgba(239,236,229,.8)', margin: '0 0 16px' }}>{proj.desc}</p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {proj.tags.map(t => <Tag key={t} label={t} />)}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  )
}
