import { useEffect, useState } from 'react'

const SECTIONS = [
  { id: 'hero',       num: 'I' },
  { id: 'projects',   num: 'II' },
  { id: 'experience', num: 'III' },
  { id: 'contact',    num: 'IV' },
]

export default function SideRails({ scrollPct }) {
  const [active, setActive] = useState('hero')

  useEffect(() => {
    const io = new IntersectionObserver(entries => {
      entries.forEach(e => { if (e.isIntersecting) setActive(e.target.id) })
    }, { rootMargin: '-40% 0px -55% 0px', threshold: 0 })
    SECTIONS.forEach(s => { const el = document.getElementById(s.id); if (el) io.observe(el) })
    return () => io.disconnect()
  }, [])

  const activeSection = SECTIONS.find(s => s.id === active) || SECTIONS[0]

  return (
    <>
      {/* Left rail */}
      <aside className="hidden md:flex" style={{ position: 'fixed', left: 0, top: 0, zIndex: 30, height: '100vh', width: 48, flexDirection: 'column', alignItems: 'center', justifyContent: 'space-between', pointerEvents: 'none' }}>
        <div style={{ paddingTop: 96, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12 }}>
          <span className="relative inline-flex w-[8px] h-[8px]">
            <span className="animate-ping-ring absolute inset-0 bg-signal opacity-70" style={{ borderRadius: 0 }} />
            <span className="relative w-[8px] h-[8px] bg-signal" />
          </span>
          <span style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)', fontSize: 9, letterSpacing: '.3em', color: 'rgba(239,236,229,.45)' }}>RUNNING</span>
        </div>
        <div style={{ writingMode: 'vertical-rl', fontSize: 10, letterSpacing: '.45em', color: 'rgba(239,236,229,.45)', textTransform: 'uppercase' }}>
          N° <span style={{ color: 'rgba(239,236,229,.8)' }}>01</span> <span style={{ color: '#a855f7', margin: '0 6px' }}>⁂</span> Edition I
        </div>
        <div style={{ paddingBottom: 32, fontSize: 9, letterSpacing: '.3em', color: 'rgba(168,85,247,.6)' }}>↓</div>
      </aside>

      {/* Right rail */}
      <aside className="hidden md:flex" style={{ position: 'fixed', right: 0, top: 0, zIndex: 30, height: '100vh', width: 64, flexDirection: 'column', alignItems: 'center', justifyContent: 'center', pointerEvents: 'none' }}>
        {/* section dots */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20, pointerEvents: 'auto' }}>
          {SECTIONS.map(s => {
            const on = s.id === active
            return (
              <a key={s.id} href={`#${s.id}`} aria-label={s.id} style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                <span style={{ display: 'block', height: 1, transition: 'all .5s', width: on ? 28 : 12, background: on ? '#a855f7' : 'rgba(239,236,229,.3)' }} />
                <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', padding: '2px 6px', border: '1px solid', transition: 'all .5s', color: on ? '#a855f7' : 'rgba(239,236,229,.45)', borderColor: on ? 'rgba(168,85,247,.5)' : 'transparent', background: on ? 'rgba(168,85,247,.06)' : 'transparent' }}>{s.num}</span>
              </a>
            )
          })}
        </div>
        {/* scroll bar */}
        <div style={{ position: 'absolute', bottom: 40, right: 16, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8, pointerEvents: 'none' }}>
          <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.18em', textTransform: 'uppercase', color: 'rgba(168,85,247,.7)' }}>
            &lt; {String(scrollPct).padStart(2, '0')}% &gt;
          </span>
          <div style={{ height: 128, width: 1, background: 'rgba(239,236,229,.1)', overflow: 'hidden', display: 'flex', alignItems: 'flex-start' }}>
            <span style={{ display: 'block', width: '100%', height: `${scrollPct}%`, background: 'linear-gradient(to bottom,#a855f7,#7e22ce)', transition: 'height .1s linear' }} />
          </div>
        </div>
        {/* roman numeral */}
        <div style={{ position: 'absolute', top: 96, right: 12, fontFamily: 'Fraunces,serif', fontStyle: 'italic', fontSize: 24, color: 'rgba(168,85,247,.15)', pointerEvents: 'none' }}>
          {activeSection.num}.
        </div>
      </aside>
    </>
  )
}
