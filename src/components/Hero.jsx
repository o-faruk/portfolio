import { useState, useEffect } from 'react'
import BracketFrame from './hud/BracketFrame'
import GlitchText from './hud/GlitchText'
import emailIcon from '../assets/email.png'

const GHIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
    <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z"/>
  </svg>
)
const LIIcon = () => (
  <svg viewBox="0 0 24 24" fill="currentColor" width="14" height="14" aria-hidden>
    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
  </svg>
)

const SUBTITLE = 'building agents & going down rabbit holes.'
const SUBJECT_NAME = 'omar_faruk'

function PingDot({ size = 6, square = false }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span className="animate-ping-ring absolute inset-0 bg-signal opacity-70" style={{ borderRadius: square ? 0 : '50%' }} />
      <span className="relative bg-signal" style={{ width: size, height: size, borderRadius: square ? 0 : '50%' }} />
    </span>
  )
}

function PulseDot({ size = 8 }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size, flexShrink: 0 }}>
      <span className="animate-ping-ring absolute inset-0 bg-signal opacity-70" style={{ borderRadius: '50%' }} />
      <span className="relative bg-signal" style={{ width: size, height: size, borderRadius: '50%' }} />
    </span>
  )
}

function StatusClock() {
  const [t, setT] = useState('')
  useEffect(() => {
    const fmt = d => [d.getHours(), d.getMinutes(), d.getSeconds()].map(n => String(n).padStart(2, '0')).join(':')
    setT(fmt(new Date()))
    const iv = setInterval(() => setT(fmt(new Date())), 1000)
    return () => clearInterval(iv)
  }, [])
  return <span style={{ color: '#a855f7', fontWeight: 700, fontVariantNumeric: 'tabular-nums' }}>{t}</span>
}

export default function Hero() {
  const [subtitle, setSubtitle] = useState('')
  const [typedName, setTypedName] = useState('')

  useEffect(() => {
    let i = 0
    const tick = () => { if (i <= SUBTITLE.length) { setSubtitle(SUBTITLE.slice(0, i++)); setTimeout(tick, 34) } }
    const delay = setTimeout(tick, 400)
    return () => clearTimeout(delay)
  }, [])

  useEffect(() => {
    let i = 0
    const tick = () => { if (i <= SUBJECT_NAME.length) { setTypedName(SUBJECT_NAME.slice(0, i++)); setTimeout(tick, 80) } }
    const delay = setTimeout(tick, 150)
    return () => clearTimeout(delay)
  }, [])

  return (
    <section id="hero" style={{ position: 'relative', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
      {/* diagonal rule */}
      <div style={{ position: 'absolute', top: '26%', left: '-50%', width: '220%', height: 1, background: 'linear-gradient(90deg,transparent,rgba(168,85,247,.5) 40%,rgba(168,85,247,.5) 60%,transparent)', transform: 'rotate(-23deg)', opacity: .22, pointerEvents: 'none' }} />

      <div style={{ position: 'relative', zIndex: 10, maxWidth: 1280, margin: '0 auto', padding: '80px 24px 60px', width: '100%' }}>
      {/* mission briefing badge */}
        <div style={{ marginBottom: 13 }}>
          <BracketFrame className="inline-flex">
            <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(22,21,28,.6)' }}>
              <PulseDot />
              <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.3em', color: '#a855f7', textTransform: 'uppercase' }}>mission_briefing // 001</span>
              <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.3em', color: 'rgba(239,236,229,.45)', textTransform: 'uppercase' }}>— subject: {typedName}</span>
            </div>
          </BracketFrame>
        </div>

        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 48, alignItems: 'center', justifyContent: 'space-between' }}>
          {/* Left column */}
          <div style={{ flex: '1 1 540px', minWidth: 300 }}>
            {/* Status badges */}
            {/* Note the addition of alignItems: 'flex-start' here! */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: 12, marginBottom: 32, maxWidth: 560 }}>
              <BracketFrame className="inline-flex">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(22,21,28,.4)' }}>
                  <PulseDot />
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 500, color: '#a855f7' }}>now</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: 'rgba(239,236,229,.85)' }}>Building agents · going down rabbit holes</span>
                </div>
              </BracketFrame>
              <BracketFrame className="inline-flex">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(22,21,28,.4)' }}>
                  <PulseDot />
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 500, color: 'rgba(239,236,229,.5)' }}>studying</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: 'rgba(239,236,229,.6)' }}>CS · AI/ML · UConn · Class of '28</span>
                </div>
              </BracketFrame>
            </div>

            {/* Name */}
            <h1 style={{ fontFamily: 'Fraunces,serif', fontVariationSettings: '"opsz" 144,"SOFT" 30', letterSpacing: '-.03em', color: '#efece5', margin: '0 0 24px', fontSize: 'clamp(3.2rem,10vw,8rem)', lineHeight: .88 }}>
              <span style={{ display: 'block', fontStyle: 'italic' }}>
                <GlitchText text="Omar" baseDelay={0.3} step={0.04} />
              </span>
              <span style={{ display: 'block' }}>
                <span className="inline-block animate-glitch" style={{ color: 'rgba(239,236,229,.4)', animationDelay: '.70s', animationFillMode: 'both' }}>/</span>
                <span style={{ display: 'inline-flex', alignItems: 'center', gap: 10 }}>
                  <span style={{ color: '#a855f7' }}>
                    <GlitchText text="Faruk" baseDelay={0.8} step={0.04} />
                  </span>
                  <span className="animate-blink bg-signal" style={{ width: 10, height: '0.75em', flexShrink: 0 }} />
                </span>
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 'clamp(13px,1.2vw,15px)', color: 'rgba(239,236,229,.72)', maxWidth: 640, margin: '0 0 8px' }}>
              <span style={{ color: '#a855f7' }}>›</span> <span style={{ color: '#efece5' }}>omar@faruk:~$</span> {subtitle}
              <span className="animate-blink inline-block align-middle bg-bone" style={{ width: 10, height: 16, marginLeft: 3 }} />
            </p>
            <p style={{ fontFamily: 'Newsreader,serif', fontStyle: 'italic', fontSize: 'clamp(13px,1.2vw,15px)', color: 'rgba(239,236,229,.6)', maxWidth: 640, margin: '0 0 32px' }}>
              CS &amp; AI/ML · University of Connecticut · Class of &apos;28
            </p>

            {/* Résumé */}
            <div style={{ marginBottom: 20 }}>
              <BracketFrame className="inline-flex">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 16px', background: 'rgba(22,21,28,.4)' }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(168,85,247,.7)', marginRight: 4 }}>// résumé</span>
                  <a href="/Resume.pdf" target="_blank" rel="noopener noreferrer" style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', background: '#a855f7', color: '#0e0d14', border: '1px solid #a855f7', transition: 'opacity .2s' }}
                    onMouseEnter={e => e.currentTarget.style.opacity = '.8'}
                    onMouseLeave={e => e.currentTarget.style.opacity = '1'}>
                    preview →
                  </a>
                  <a href="/Resume.pdf" download="Omar_Faruk_Resume.pdf" style={{ display: 'inline-flex', alignItems: 'center', padding: '5px 14px', fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', background: 'transparent', color: 'rgba(168,85,247,.85)', border: '1px solid rgba(168,85,247,.4)', transition: 'border-color .2s,color .2s' }}
                    onMouseEnter={e => { e.currentTarget.style.color='#a855f7'; e.currentTarget.style.borderColor='#a855f7' }}
                    onMouseLeave={e => { e.currentTarget.style.color='rgba(168,85,247,.85)'; e.currentTarget.style.borderColor='rgba(168,85,247,.4)' }}>
                    ↓ download
                  </a>
                </div>
              </BracketFrame>
            </div>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
              {[
                { href: '#projects', label: 'view work →', primary: true },
                { href: '#contact',  label: "let's talk →", outline: true },
              ].map(({ href, label, primary, outline }) => (
                <a key={label} href={href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px',
                  fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', transition: 'background .2s,color .2s,border-color .2s',
                  ...(primary ? { background: '#a855f7', color: '#0e0d14', border: '2px solid #a855f7' } : {}),
                  ...(outline ? { background: 'transparent', color: 'rgba(168,85,247,.85)', border: '2px solid rgba(168,85,247,.4)' } : {}),
                }}>
                  {label}
                </a>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {[
                { label: 'github',   icon: <GHIcon />, href: 'https://github.com/o-faruk' },
                { label: 'linkedin', icon: <LIIcon />, href: 'https://www.linkedin.com/in/omar-faruko/' },
                { label: 'email',    icon: <img src={emailIcon} alt="" width="14" height="14" style={{ objectFit: 'contain', filter: 'brightness(0) invert(1)', opacity: .65 }} />, href: 'mailto:omarfarukk108@gmail.com' },
              ].map(({ label, icon, href }) => (
                <a key={label} href={href} target={href.startsWith('mailto') ? undefined : '_blank'} rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 6, fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(239,236,229,.6)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'color .2s,border-color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#a855f7'; e.currentTarget.style.borderBottomColor='#a855f7' }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(239,236,229,.6)'; e.currentTarget.style.borderBottomColor='transparent' }}>
                  {icon} {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right column: status panel */}
          <aside style={{ flex: '0 1 420px', minWidth: 320 }}>
            <BracketFrame size={10}>
              <div style={{ background: '#16171a', border: '1px solid rgba(239,236,229,.08)', padding: 28 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 20 }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(168,85,247,.85)' }}>// current_status</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, color: 'rgba(239,236,229,.35)' }}>v.06.29.26</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10, fontFamily: '"JetBrains Mono",monospace', fontSize: 12 }}>
                  {[
                    ['clock', <StatusClock key="c" />],
                    ['loc', <span key="l" style={{ color: '#efece5' }}>hartford, ct</span>],
                    ['cords', <span key="co" style={{ color: 'rgba(239,236,229,.75)', fontVariantNumeric: 'tabular-nums' }}>41.76°N 72.68°W</span>],
                    ['edition', <span key="e" style={{ color: 'rgba(239,236,229,.75)' }}>v.06.29.26</span>],
                    ['subject', <span key="s" style={{ color: 'rgba(239,236,229,.75)' }}>cs · ai/ml · uconn &#39;28</span>],
                    ['uplink', <span key="u" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a855f7' }}><PulseDot size={6} />stable</span>],
                    ['now', <span key="n" style={{ color: '#a855f7' }}>agents · rabbit holes</span>],
                  ].map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(239,236,229,.05)', paddingBottom: 6 }}>
                      <span style={{ color: 'rgba(239,236,229,.4)', textTransform: 'uppercase', letterSpacing: '.15em', fontSize: 10 }}>{key}</span>
                      {val}
                    </div>
                  ))}
                </div>
              </div>
            </BracketFrame>
          </aside>
        </div>
      </div>

      {/* Scroll prompt */}
      <div style={{ position: 'absolute', bottom: 24, left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 6, pointerEvents: 'none' }}>
        <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.3em', color: 'rgba(168,85,247,.6)', textTransform: 'uppercase' }}>▼ scroll</span>
        <span className="animate-dot-drift" style={{ height: 24, width: 1, background: 'linear-gradient(to bottom,rgba(168,85,247,.6),transparent)' }} />
      </div>
    </section>
  )
}
