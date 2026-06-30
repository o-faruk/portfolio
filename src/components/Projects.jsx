import { useState, useRef, useEffect } from 'react'
import { motion, useScroll, useTransform, useMotionTemplate, AnimatePresence } from 'framer-motion'
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

const CORNERS = [['top:-1px','left:-1px','borderTop','borderLeft'],['top:-1px','right:-1px','borderTop','borderRight'],['bottom:-1px','left:-1px','borderBottom','borderLeft'],['bottom:-1px','right:-1px','borderBottom','borderRight']]

function ModalCorners({ size = 18, opacity = .7 }) {
  return CORNERS.map(([p1,p2,b1,b2],i) => (
    <span key={i} style={{ position:'absolute', ...Object.fromEntries([p1,p2].map(s=>s.split(':'))), width:size, height:size, [b1]:`1px solid rgba(168,85,247,${opacity})`, [b2]:`1px solid rgba(168,85,247,${opacity})` }} />
  ))
}

function ImageCarousel({ project }) {
  const mono = { fontFamily: '"JetBrains Mono",monospace' }
  const images = project.images ?? (project.image ? [project.image] : [])
  const [idx, setIdx] = useState(0)
  const multi = images.length > 1
  const src = images[idx]

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: .4, ease: [.2,.7,.2,1] }}
      style={{ position: 'relative', height: 280, background: '#08070d', borderBottom: '1px solid rgba(168,85,247,.15)', overflow: 'hidden', flexShrink: 0 }}>

      {src ? (
        <>
          {/* Blurred fill — same image scaled up and blurred to eliminate black bars */}
          <img src={src} aria-hidden alt=""
            style={{ position: 'absolute', inset: '-10%', width: '120%', height: '120%', objectFit: 'cover', filter: 'blur(28px) brightness(.28) saturate(1.4)', transform: 'scale(1.05)', pointerEvents: 'none' }} />
          {/* Sharp contained foreground */}
          <AnimatePresence mode="wait">
            <motion.img key={idx} src={src} alt={`${project.name} ${idx + 1}`}
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}
              style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'contain' }} />
          </AnimatePresence>
        </>
      ) : (
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg,rgba(168,85,247,.07) 0 1px,transparent 1px 13px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ ...mono, fontSize: 12, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(239,236,229,.3)' }}>// {project.capLabel}</span>
        </div>
      )}

      {/* gradient fades */}
      <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom,rgba(14,13,20,.3) 0%,transparent 30%,transparent 60%,rgba(14,13,20,.75) 100%)', pointerEvents: 'none' }} />

      {/* dossier label */}
      <div style={{ position: 'absolute', bottom: 14, left: 20, ...mono, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(168,85,247,.8)', pointerEvents: 'none', zIndex: 2 }}>[ dossier_{project.num} ]</div>

      {multi && (
        <>
          <button onClick={() => setIdx(i => (i - 1 + images.length) % images.length)}
            style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(14,13,20,.75)', border: '1px solid rgba(168,85,247,.4)', color: '#a855f7', width: 32, height: 32, cursor: 'pointer', ...mono, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>‹</button>
          <button onClick={() => setIdx(i => (i + 1) % images.length)}
            style={{ position: 'absolute', right: 14, top: '50%', transform: 'translateY(-50%)', background: 'rgba(14,13,20,.75)', border: '1px solid rgba(168,85,247,.4)', color: '#a855f7', width: 32, height: 32, cursor: 'pointer', ...mono, fontSize: 18, display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 2 }}>›</button>
          <div style={{ position: 'absolute', bottom: 14, right: 20, display: 'flex', gap: 5, zIndex: 2 }}>
            {images.map((_, i) => (
              <button key={i} onClick={() => setIdx(i)}
                style={{ width: i === idx ? 16 : 5, height: 5, background: i === idx ? '#a855f7' : 'rgba(168,85,247,.35)', border: 'none', cursor: 'pointer', padding: 0, transition: 'width .2s,background .2s' }} />
            ))}
          </div>
        </>
      )}
    </motion.div>
  )
}

function ProjectModal({ project, onClose }) {
  useEffect(() => {
    const onKey = e => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', onKey)
    window.__lenis?.stop()
    return () => {
      window.removeEventListener('keydown', onKey)
      window.__lenis?.start()
    }
  }, [onClose])

  const mono = { fontFamily: '"JetBrains Mono",monospace' }
  const fadeUp = (delay = 0) => ({ initial: { opacity: 0, y: 14 }, animate: { opacity: 1, y: 0 }, transition: { duration: .38, ease: [.2,.7,.2,1], delay } })

  return (
    <motion.div
      initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: .22 }}
      style={{ position: 'fixed', inset: 0, zIndex: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 16 }}
      onClick={e => { if (e.target === e.currentTarget) onClose() }}>
      <div style={{ position: 'absolute', inset: 0, background: 'rgba(14,13,20,.93)', backdropFilter: 'blur(4px)' }} />
      <motion.div
        initial={{ opacity: 0, y: 40, scale: .97 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 28, scale: .97 }}
        transition={{ duration: .38, ease: [.2,.7,.2,1] }}
        data-lenis-prevent
        style={{ position: 'relative', width: '100%', maxWidth: 1080, maxHeight: '92vh', overflowY: 'auto', background: '#0e0d14', border: '1px solid rgba(168,85,247,.3)' }}>
        <ModalCorners />
        <button onClick={onClose} style={{ position: 'absolute', top: 16, right: 16, zIndex: 20, padding: '6px 12px', border: '1px solid rgba(239,236,229,.25)', color: 'rgba(239,236,229,.7)', background: 'rgba(14,13,20,.75)', cursor: 'pointer', ...mono, fontSize: 14, backdropFilter: 'blur(4px)' }}>✕</button>

        <ImageCarousel project={project} />

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px' }}>
          {/* ── Main content ── */}
          <div style={{ padding: '36px 48px', borderRight: '1px solid rgba(239,236,229,.07)' }}>
            <motion.div {...fadeUp(.08)}>
              <div style={{ ...mono, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 20 }}>— dossier_entry</div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 10 }}>
                <span style={{ width: 48, height: 48, border: '1px solid rgba(168,85,247,.4)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#a855f7', fontSize: 20, flexShrink: 0 }}>{project.icon || '◉'}</span>
                <h2 style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#efece5', fontSize: 'clamp(2.2rem,5vw,3.5rem)', lineHeight: .9, margin: 0 }}>{project.name}</h2>
              </div>
              <p style={{ ...mono, fontSize: 12, color: 'rgba(239,236,229,.45)', margin: '0 0 28px', paddingLeft: 68 }}>{project.tagline}</p>
            </motion.div>

            {/* Problem / Solution / Impact */}
            <motion.div {...fadeUp(.16)} style={{ fontFamily: 'Newsreader,serif', fontSize: 16, lineHeight: 1.7, color: 'rgba(239,236,229,.85)' }}>
              {project.problem  && <p style={{ margin: '0 0 14px' }}><strong style={{ color: '#efece5', fontFamily: 'Newsreader,serif' }}>Problem:</strong> {project.problem}</p>}
              {project.solution && <p style={{ margin: '0 0 14px' }}><strong style={{ color: '#efece5', fontFamily: 'Newsreader,serif' }}>Solution:</strong> {project.solution}</p>}
              {project.impact   && <p style={{ margin: '0 0 28px' }}><strong style={{ color: '#efece5', fontFamily: 'Newsreader,serif' }}>Impact:</strong> {project.impact}</p>}
            </motion.div>

            {/* Features */}
            {project.features?.length > 0 && (
              <motion.div {...fadeUp(.24)} style={{ marginBottom: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
                  <span style={{ color: '#a855f7' }}>✦</span>
                  <span style={{ ...mono, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.5)' }}>features</span>
                </div>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px 32px' }}>
                  {project.features.map((f, i) => (
                    <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: 8, ...mono, fontSize: 11, color: 'rgba(239,236,229,.75)' }}>
                      <span style={{ color: '#a855f7', flexShrink: 0, marginTop: 1 }}>✓</span>
                      {f}
                    </div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Stack */}
            <motion.div {...fadeUp(.3)}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
                <span style={{ color: '#a855f7' }}>◆</span>
                <span style={{ ...mono, fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.5)' }}>stack</span>
              </div>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                {project.tags.map(t => <Tag key={t} label={t} />)}
              </div>
            </motion.div>
          </div>

          {/* ── Right sidebar ── */}
          <motion.div {...fadeUp(.2)} style={{ padding: '36px 24px', display: 'flex', flexDirection: 'column', gap: 16 }}>
            {project.telemetry && (
              <div style={{ position: 'relative', border: '1px solid rgba(168,85,247,.3)' }}>
                <ModalCorners size={10} opacity={.6} />
                <div style={{ padding: '16px 20px' }}>
                  <div style={{ ...mono, fontSize: 9, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a855f7', marginBottom: 14 }}>— telemetry</div>
                  {[['lang', project.telemetry.lang], ['dist', project.telemetry.dist], ['os', project.telemetry.os]].filter(([,v]) => v).map(([k, v]) => (
                    <div key={k} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 0', borderBottom: '1px solid rgba(239,236,229,.06)', ...mono, fontSize: 11 }}>
                      <span style={{ color: 'rgba(239,236,229,.38)', textTransform: 'uppercase', letterSpacing: '.15em', fontSize: 9 }}>{k}</span>
                      <span style={{ color: '#efece5' }}>{v}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            <a href={project.src} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, border: '1px solid rgba(239,236,229,.2)', color: 'rgba(239,236,229,.8)', ...mono, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', background: 'rgba(239,236,229,.03)', transition: 'border-color .2s,color .2s' }}
              onMouseEnter={e => { e.currentTarget.style.borderColor='rgba(168,85,247,.5)'; e.currentTarget.style.color='#a855f7' }}
              onMouseLeave={e => { e.currentTarget.style.borderColor='rgba(239,236,229,.2)'; e.currentTarget.style.color='rgba(239,236,229,.8)' }}>
              ◙ source
            </a>

            {project.live && project.live !== '#' && (
              <a href={project.live} target="_blank" rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 10, padding: 14, background: '#a855f7', color: '#0e0d14', ...mono, fontSize: 11, letterSpacing: '.2em', textTransform: 'uppercase', textDecoration: 'none', fontWeight: 700 }}>
                ↗ visit live
              </a>
            )}
          </motion.div>
        </div>
      </motion.div>
    </motion.div>
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
  const barWidth = useMotionTemplate`${pct}%`
  
  function jumpTo(i) {
    const rect = wrapRef.current.getBoundingClientRect()
    const start = window.scrollY + rect.top
    const step = (wrapRef.current.offsetHeight - window.innerHeight) / PROJECTS.length
    window.scrollTo({ top: start + step * (i + 0.5), behavior: 'smooth' })
  }
  
  return (
    <section id="projects" style={{ position: 'relative' }}>
      <AnimatePresence>
        {modal !== null && <ProjectModal key={modal} project={PROJECTS[modal - 1]} onClose={() => setModal(null)} />}
      </AnimatePresence>
      
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
      
      <div ref={wrapRef} className="projects-desktop-wrapper" style={{ position: 'relative', height: `${(PROJECTS.length + 1) * 100}vh` }}>
        <div style={{ position: 'sticky', top: 0, height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflow: 'hidden' }}>
          <div style={{ position: 'absolute', top: 0, left: 0, right: 0, zIndex: 30, pointerEvents: 'none' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '20px 40px 12px', fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase' }}>
              <div style={{ display: 'flex', alignItems: 'baseline', gap: 12 }}>
                <span style={{ color: '#a855f7', fontVariantNumeric: 'tabular-nums' }}>[ {p.num} / {String(PROJECTS.length).padStart(2,'00')} ]</span>
                <span style={{ color: 'rgba(239,236,229,.3)' }}>·</span>
                <span style={{ color: 'rgba(239,236,229,.85)', fontFamily: 'Fraunces,serif', fontStyle: 'italic', textTransform: 'none', letterSpacing: '.04em', fontSize: 18 }}>{p.name}</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'rgba(239,236,229,.45)' }}>
                <span style={{ color: 'rgba(168,85,247,.7)' }}>▶</span>
                <span>mission_dossier</span>
              </div>
            </div>
            <div style={{ position: 'relative', height: 3, margin: '0 40px', background: 'rgba(239,236,229,.08)', overflow: 'hidden' }}>
              <motion.div style={{ height: '100%', width: barWidth, background: 'linear-gradient(90deg,#a855f7,#c084fc,#a855f7)' }} />
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', margin: '4px 40px 0' }}>
              {PROJECTS.map((_, i) => (
                <span key={i} style={{ display: 'block', width: 1, height: active >= i ? 8 : 4, background: active >= i ? '#a855f7' : 'rgba(239,236,229,.25)', transition: 'all .3s' }} />
              ))}
            </div>
          </div>
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
          <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', overflow: 'hidden', zIndex: 1 }}>
            <motion.div key={wmKey} initial={{ opacity: 0, x: 24 }} animate={{ opacity: .13, x: 0 }} transition={{ duration: .6 }}
              style={{ position: 'absolute', bottom: -64, right: -32, display: 'flex', alignItems: 'flex-end', gap: 16 }}>
              <span style={{ fontFamily: 'Fraunces,serif', fontStyle: 'italic', color: '#a855f7', lineHeight: .78, fontVariantNumeric: 'tabular-nums', fontSize: 'clamp(14rem,24vw,26rem)' }}>{p.num}</span>
              <span style={{ fontFamily: '"JetBrains Mono",monospace', color: 'rgba(239,236,229,.15)', fontSize: 24, letterSpacing: '.2em', textTransform: 'uppercase', marginBottom: 48 }}>/ {String(PROJECTS.length).padStart(2,'0')}</span>
            </motion.div>
          </div>
          <div style={{ position: 'relative', width: '100%', maxWidth: 1280, margin: '0 auto', zIndex: 2, padding: '0 64px' }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: 48, alignItems: 'center' }}>
              <motion.div key={`preview-${active}`} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }}
                onClick={() => setModal(active + 1)} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter'&&setModal(active+1)}
                style={{ position: 'relative', aspectRatio: '16/10', background: '#16151c', border: '1px solid rgba(239,236,229,.1)', overflow: 'hidden', cursor: 'pointer' }}>
                {[['top:-1px','left:-1px','borderTop','borderLeft'],['top:-1px','right:-1px','borderTop','borderRight'],['bottom:-1px','left:-1px','borderBottom','borderLeft'],['bottom:-1px','right:-1px','borderBottom','borderRight']].map(([p1,p2,b1,b2],i)=>(
                  <span key={i} style={{ position:'absolute', ...Object.fromEntries([p1,p2].map(s=>s.split(':'))), width:18, height:18, [b1]:'1px solid rgba(168,85,247,.65)', [b2]:'1px solid rgba(168,85,247,.65)', zIndex:5 }} />
                ))}
                {p.image
                  ? <img src={p.image} alt={p.name} style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 0.85 }} />
                  : <div style={{ position: 'absolute', inset: 0, backgroundImage: 'repeating-linear-gradient(135deg,rgba(168,85,247,.07) 0 1px,transparent 1px 11px)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.3em', textTransform: 'uppercase', color: 'rgba(239,236,229,.35)' }}>// {p.capLabel}</span>
                    </div>
                }
                <div style={{ position: 'absolute', top: 12, left: 12, right: 12, fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: '#a855f7', zIndex: 6 }}>[ dossier_{p.num} ]</div>
                <div style={{ position: 'absolute', bottom: 12, left: 12, right: 12, display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.65)', zIndex: 6 }}>
                  <span>▶ click_to_access</span>
                  <span style={{ color: 'rgba(168,85,247,.7)' }}>[ {p.num} / {String(PROJECTS.length).padStart(2,'0')} ]</span>
                </div>
              </motion.div>
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
                  <a href={p.live} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '2px solid rgba(168,85,247,.4)', color: '#a855f7', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', background: 'rgba(168,85,247,.04)' }}>↗ live</a>
                  <a href={p.src} target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', gap: 8, padding: '10px 20px', border: '2px solid rgba(239,236,229,.25)', color: 'rgba(239,236,229,.85)', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.2em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none' }}>&lt;/&gt; source</a>
                </div>
              </motion.div>
            </div>
          </div>
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
    </section>
  )
}