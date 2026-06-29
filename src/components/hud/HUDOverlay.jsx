import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',       num: 'I',   label: 'HERO_COVER' },
  { id: 'projects',   num: 'II',  label: 'MISSION_DOSSIER' },
  { id: 'experience', num: 'III', label: 'SERVICE_RECORD' },
  { id: 'contact',    num: 'IV',  label: 'ENCRYPTED_CHANNEL' },
]

function fmt(d) {
  const p = n => String(n).padStart(2, '0')
  return `${p(d.getHours())}:${p(d.getMinutes())}:${p(d.getSeconds())}`
}

export default function HUDOverlay({ scrollPct }) {
  const [active, setActive] = useState(SECTIONS[0])
  const [clock, setClock] = useState(fmt(new Date()))

  useEffect(() => {
    const iv = setInterval(() => setClock(fmt(new Date())), 1000)
    return () => clearInterval(iv)
  }, [])

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          const s = SECTIONS.find(s => s.id === e.target.id)
          if (s) setActive(s)
        }
      })
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const c = { position: 'absolute', width: 12, height: 12 }
  const b = '1px solid rgba(168,85,247,.4)'

  return (
    <div style={{ position: 'fixed', inset: 0, zIndex: 30, pointerEvents: 'none', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.22em', textTransform: 'uppercase' }}
      className="hidden md:block">
      {/* corner brackets */}
      <span style={{ ...c, top: 12, left: 12, borderTop: b, borderLeft: b }} />
      <span style={{ ...c, top: 12, right: 12, borderTop: b, borderRight: b }} />
      <span style={{ ...c, bottom: 12, left: 12, borderBottom: b, borderLeft: b }} />
      <span style={{ ...c, bottom: 12, right: 12, borderBottom: b, borderRight: b }} />
      {/* top-left: section */}
      <div style={{ position: 'absolute', top: 12, left: 34, display: 'flex', alignItems: 'center', gap: 8 }}>
        <span style={{ color: 'rgba(168,85,247,.85)' }}>[ {active.num} ]</span>
        <span style={{ color: 'rgba(239,236,229,.55)' }}>{active.label}</span>
      </div>
      {/* top-right: clock + scroll */}
      <div style={{ position: 'absolute', top: 12, right: 34, display: 'flex', alignItems: 'center', gap: 16, color: 'rgba(239,236,229,.55)' }}>
        <span style={{ color: 'rgba(168,85,247,.85)', fontVariantNumeric: 'tabular-nums' }}>{clock}</span>
        <span style={{ color: 'rgba(168,85,247,.4)' }}>▶</span>
        <span>scroll <span style={{ color: 'rgba(168,85,247,.85)' }}>{scrollPct}</span>%</span>
      </div>
      {/* bottom-left: coords */}
      <div style={{ position: 'absolute', bottom: 12, left: 34, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(239,236,229,.45)' }}>
        <span style={{ color: 'rgba(168,85,247,.7)' }}>◆</span>
        <span>hartford, ct · 41.76°n 72.68°w</span>
      </div>
      {/* bottom-right: uplink */}
      <div style={{ position: 'absolute', bottom: 12, right: 34, display: 'flex', alignItems: 'center', gap: 8, color: 'rgba(239,236,229,.55)' }}>
        <span className="relative inline-flex w-[6px] h-[6px]">
          <span className="animate-ping-ring absolute inset-0 rounded-full bg-signal opacity-70" />
          <span className="relative w-[6px] h-[6px] rounded-full bg-signal" />
        </span>
        <span style={{ color: 'rgba(168,85,247,.85)' }}>uplink_stable</span>
      </div>
    </div>
  )
}
