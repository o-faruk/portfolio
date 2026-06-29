import { useState, useEffect } from 'react'
import BracketFrame from './hud/BracketFrame'
import GlitchText from './hud/GlitchText'

const SUBTITLE = 'building agents & going down rabbit holes.'

function PingDot({ size = 6, square = false }) {
  return (
    <span className="relative inline-flex" style={{ width: size, height: size }}>
      <span className="animate-ping-ring absolute inset-0 bg-signal opacity-70" style={{ borderRadius: square ? 0 : '50%' }} />
      <span className="relative bg-signal" style={{ width: size, height: size, borderRadius: square ? 0 : '50%' }} />
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

  useEffect(() => {
    let i = 0
    const tick = () => { if (i <= SUBTITLE.length) { setSubtitle(SUBTITLE.slice(0, i++)); setTimeout(tick, 34) } }
    const delay = setTimeout(tick, 400)
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
              <PingDot />
              <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.3em', color: '#a855f7', textTransform: 'uppercase' }}>mission_briefing // 001</span>
              <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.3em', color: 'rgba(239,236,229,.45)', textTransform: 'uppercase' }}>— subject: omar_faruk</span>
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
                  <PingDot size={8} />
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 10, letterSpacing: '.24em', textTransform: 'uppercase', fontWeight: 500, color: '#a855f7' }}>now</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 12, color: 'rgba(239,236,229,.85)' }}>Building agents · going down rabbit holes</span>
                </div>
              </BracketFrame>
              <BracketFrame className="inline-flex">
                <div style={{ display: 'inline-flex', alignItems: 'center', gap: 12, padding: '8px 16px', background: 'rgba(22,21,28,.4)' }}>
                  <span style={{ width: 8, height: 8, borderRadius: '50%', background: 'rgba(239,236,229,.4)', flexShrink: 0 }} />
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
                <span style={{ color: '#a855f7' }}>
                  <GlitchText text="Faruk" baseDelay={0.8} step={0.04} />
                </span>
                <span className="animate-blink inline-block align-middle bg-signal" style={{ width: '0.06em', minWidth: 12, height: '0.82em', marginLeft: 12 }} />
              </span>
            </h1>

            {/* Subtitle */}
            <p style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 'clamp(13px,1.2vw,15px)', color: 'rgba(239,236,229,.72)', maxWidth: 640, margin: '0 0 8px' }}>
              <span style={{ color: '#a855f7' }}>›</span> <span style={{ color: '#efece5' }}>omar@faruk:~$</span> {subtitle}
              <span className="animate-blink inline-block align-middle bg-bone" style={{ width: 8, height: 15, marginLeft: 2, opacity: .7 }} />
            </p>
            <p style={{ fontFamily: 'Newsreader,serif', fontStyle: 'italic', fontSize: 'clamp(13px,1.2vw,15px)', color: 'rgba(239,236,229,.6)', maxWidth: 640, margin: '0 0 32px' }}>
              CS &amp; AI/ML · University of Connecticut · Class of &apos;28
            </p>

            {/* CTAs */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 12, marginBottom: 32 }}>
              {[
                { href: '#projects', label: 'view work →', primary: true },
                { href: '#contact',  label: '↓ résumé',    secondary: true },
                { href: '#contact',  label: "let's talk →", outline: true },
              ].map(({ href, label, primary, secondary, outline }) => (
                <a key={label} href={href} style={{
                  display: 'inline-flex', alignItems: 'center', gap: 10, padding: '10px 20px',
                  fontFamily: '"JetBrains Mono",monospace', fontSize: 12, letterSpacing: '.15em', textTransform: 'uppercase', fontWeight: 700, textDecoration: 'none', transition: 'background .2s,color .2s,border-color .2s',
                  ...(primary   ? { background: '#a855f7', color: '#0e0d14', border: '2px solid #a855f7' } : {}),
                  ...(secondary ? { background: 'transparent', color: '#efece5', border: '2px solid rgba(239,236,229,.4)' } : {}),
                  ...(outline   ? { background: 'transparent', color: 'rgba(168,85,247,.85)', border: '2px solid rgba(168,85,247,.4)' } : {}),
                }}>
                  {label}
                </a>
              ))}
            </div>

            {/* Social links */}
            <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
              {[['</> github','#'],['in linkedin','#'],['✉ email','#']].map(([label, href]) => (
                <a key={label} href={href} style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 11, letterSpacing: '.15em', textTransform: 'uppercase', color: 'rgba(239,236,229,.6)', textDecoration: 'none', borderBottom: '1px solid transparent', transition: 'color .2s,border-color .2s' }}
                  onMouseEnter={e => { e.currentTarget.style.color='#a855f7'; e.currentTarget.style.borderBottomColor='#a855f7' }}
                  onMouseLeave={e => { e.currentTarget.style.color='rgba(239,236,229,.6)'; e.currentTarget.style.borderBottomColor='transparent' }}>
                  {label}
                </a>
              ))}
            </div>
          </div>

          {/* Right column: status panel */}
          <aside style={{ flex: '0 1 340px', minWidth: 280 }}>
            <BracketFrame size={10}>
              <div style={{ background: '#16171a', border: '1px solid rgba(239,236,229,.08)', padding: 20 }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 16 }}>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, letterSpacing: '.2em', textTransform: 'uppercase', color: 'rgba(168,85,247,.85)' }}>// current_status</span>
                  <span style={{ fontFamily: '"JetBrains Mono",monospace', fontSize: 9, color: 'rgba(239,236,229,.35)' }}>v.06.29.26</span>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8, fontFamily: '"JetBrains Mono",monospace', fontSize: 11 }}>
                  {[
                    ['clock', <StatusClock key="c" />],
                    ['loc', <span key="l" style={{ color: '#efece5' }}>hartford, ct</span>],
                    ['coords', <span key="co" style={{ color: 'rgba(239,236,229,.75)', fontVariantNumeric: 'tabular-nums' }}>41.76°N 72.68°W</span>],
                    ['subject', <span key="s" style={{ color: 'rgba(239,236,229,.75)' }}>cs · ai/ml · uconn &#39;28</span>],
                    ['building', <span key="b" style={{ color: 'rgba(239,236,229,.75)' }}>jarvis · recall</span>],
                    ['uplink', <span key="u" style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#a855f7' }}><PingDot />stable</span>],
                    ['stack', <span key="st" style={{ color: '#c084fc' }}>⏵ python · js · aws · react</span>],
                  ].map(([key, val]) => (
                    <div key={key} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid rgba(239,236,229,.05)', paddingBottom: 6 }}>
                      <span style={{ color: 'rgba(239,236,229,.4)', textTransform: 'uppercase', letterSpacing: '.15em', fontSize: 9 }}>{key}</span>
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
