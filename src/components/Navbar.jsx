import { useState } from 'react'

const links = [
  { href: '#projects',   num: '[01]', label: 'projects' },
  { href: '#experience', num: '[02]', label: 'experience' },
  { href: '#contact',    num: '[03]', label: 'contact' },
]

export default function Navbar() {
  const [open, setOpen] = useState(false)

  return (
    <header style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 50, background: 'rgba(14,13,20,.72)', borderBottom: '1px solid rgba(168,85,247,.16)', backdropFilter: 'blur(8px)' }}>
      <nav style={{ maxWidth: 'min(94vw,1800px)', margin: '0 auto', padding: '14px 24px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <a href="#hero" style={{ display: 'flex', alignItems: 'center', gap: 12, fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: 'inherit', textDecoration: 'none' }}>
          <span className="relative inline-flex w-[8px] h-[8px]">
            <span className="animate-ping-ring absolute inset-0 bg-signal opacity-70" style={{ borderRadius: 0 }} />
            <span className="relative w-[8px] h-[8px] bg-signal" />
          </span>
          <span style={{ color: '#efece5' }}>omar_faruk</span>
          <span style={{ color: 'rgba(239,236,229,.3)' }}>//</span>
          <span style={{ color: 'rgba(168,85,247,.7)' }}>o-faruk</span>
        </a>

        {/* Desktop nav */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: 28 }}>
          {links.map(l => (
            <a key={l.href} href={l.href} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.7)', textDecoration: 'none', transition: 'color .2s' }}
              onMouseEnter={e => e.currentTarget.style.color='#efece5'} onMouseLeave={e => e.currentTarget.style.color='rgba(239,236,229,.7)'}>
              <span style={{ color: 'rgba(168,85,247,.6)' }}>{l.num}</span>
              <span>{l.label}</span>
            </a>
          ))}
          <a href="#contact" style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 700, padding: '6px 12px', border: '1px solid #a855f7', color: '#a855f7', textDecoration: 'none', transition: 'background .2s,color .2s' }}
            onMouseEnter={e => { e.currentTarget.style.background='#a855f7'; e.currentTarget.style.color='#0e0d14' }}
            onMouseLeave={e => { e.currentTarget.style.background='transparent'; e.currentTarget.style.color='#a855f7' }}>
            ▶ résumé
          </a>
        </div>

        {/* Mobile hamburger */}
        <button className="md:hidden" onClick={() => setOpen(o => !o)} style={{ background: 'none', border: 'none', color: 'rgba(239,236,229,.8)', cursor: 'pointer', fontSize: 20, fontFamily: '"JetBrains Mono",monospace' }}>
          {open ? '✕' : '☰'}
        </button>
      </nav>

      {/* Mobile menu */}
      {open && (
        <div style={{ borderTop: '1px solid rgba(239,236,229,.1)', background: 'rgba(14,13,20,.98)', padding: '16px 24px' }}>
          {links.map(l => (
            <a key={l.href} href={l.href} onClick={() => setOpen(false)} style={{ display: 'flex', alignItems: 'center', gap: 8, fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', color: 'rgba(239,236,229,.7)', textDecoration: 'none', padding: '10px 0' }}>
              <span style={{ color: 'rgba(168,85,247,.6)' }}>{l.num}</span>
              <span>{l.label}</span>
            </a>
          ))}
          <a href="#contact" onClick={() => setOpen(false)} style={{ display: 'block', textAlign: 'center', fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.22em', textTransform: 'uppercase', fontWeight: 700, padding: 10, border: '1px solid #a855f7', color: '#a855f7', textDecoration: 'none', marginTop: 8 }}>
            ▶ résumé
          </a>
        </div>
      )}
    </header>
  )
}
