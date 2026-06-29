import { useState, useEffect, useRef } from 'react'

const BOOT_LINES = [
  '> OMAR_FARUK // PORTFOLIO',
  '> UPLINK........................OK',
  '> AUTH..........................OK',
  '> LOADING OMAR_FARUK.PORTFOLIO',
]
const STORAGE_KEY = 'ofaruk.boot.v1'

export default function BootSequence({ onDone }) {
  const [visibleLines, setVisibleLines] = useState([])
  const [progress, setProgress] = useState(false)
  const [granted, setGranted] = useState(false)
  const [exiting, setExiting] = useState(false)
  const timers = useRef([])

  function exit() {
    timers.current.forEach(clearTimeout)
    try { sessionStorage.setItem(STORAGE_KEY, '1') } catch (_) {}
    setExiting(true)
    setTimeout(onDone, 350)
  }

  useEffect(() => {
    const seen = (() => { try { return sessionStorage.getItem(STORAGE_KEY) === '1' } catch { return false } })()
    if (seen || window.matchMedia('(prefers-reduced-motion: reduce)').matches) { onDone(); return }

    const t = (fn, ms) => { const id = setTimeout(fn, ms); timers.current.push(id) }
    BOOT_LINES.forEach((line, i) => t(() => setVisibleLines(p => [...p, line]), 380 + i * 180))
    t(() => setProgress(true), 1100)
    t(() => setGranted(true), 1300)
    t(exit, 1700)

    const onKey = e => { if (e.key === 'Escape' || e.key === 'Enter') exit() }
    window.addEventListener('keydown', onKey)
    return () => { timers.current.forEach(clearTimeout); window.removeEventListener('keydown', onKey) }
  }, [])

  return (
    <div style={{
      position: 'fixed', inset: 0, zIndex: 100, background: '#08070d', color: '#efece5',
      fontFamily: '"JetBrains Mono",monospace', overflow: 'hidden',
      transition: 'opacity .35s ease', opacity: exiting ? 0 : 1,
    }}>
      {/* scanlines */}
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', opacity: .06, backgroundImage: 'repeating-linear-gradient(to bottom,rgba(168,85,247,.6) 0 1px,transparent 1px 3px)' }} />
      <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(168,85,247,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.045) 1px,transparent 1px)', backgroundSize: '64px 64px', opacity: .5 }} />
      {/* corners */}
      {[['top:24px','left:24px','borderTop','borderLeft'],['top:24px','right:24px','borderTop','borderRight'],['bottom:24px','left:24px','borderBottom','borderLeft'],['bottom:24px','right:24px','borderBottom','borderRight']].map(([p1,p2,b1,b2],i) => (
        <span key={i} style={{ position:'absolute', ...Object.fromEntries([p1,p2].map(s=>s.split(':'))), width:20, height:20, [b1]:'1px solid rgba(168,85,247,.8)', [b2]:'1px solid rgba(168,85,247,.8)' }} />
      ))}
      <div style={{ position: 'absolute', top: 24, left: '50%', transform: 'translateX(-50%)', fontSize: 9, letterSpacing: '.45em', color: 'rgba(168,85,247,.5)', textTransform: 'uppercase' }}>
        N° 01 · Hartford, CT · Edition I
      </div>
      <div style={{ position: 'relative', zIndex: 10, height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '0 24px' }}>
        <div style={{ fontSize: 10, letterSpacing: '.4em', color: 'rgba(168,85,247,.7)', textTransform: 'uppercase', marginBottom: 32 }}>▶ system_boot</div>
        <div style={{ fontSize: 13, lineHeight: 2, minWidth: 300, maxWidth: 480 }}>
          {visibleLines.map((l, i) => <div key={i} style={{ color: 'rgba(239,236,229,.85)' }}>{l}</div>)}
          {progress && (
            <div style={{ paddingTop: 16, paddingBottom: 8 }}>
              <div style={{ height: 1, width: '100%', background: 'rgba(239,236,229,.15)', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: '100%', background: 'linear-gradient(90deg,#a855f7,#7e22ce)', transition: 'width .5s ease-out' }} />
              </div>
            </div>
          )}
          {granted && <div style={{ color: '#a855f7', fontWeight: 700, letterSpacing: '.2em' }}>&gt; ENTRY_GRANTED <span style={{ color: '#c084fc' }}>●</span></div>}
        </div>
      </div>
      <button onClick={exit} style={{ position: 'absolute', bottom: 24, right: 48, fontSize: 10, letterSpacing: '.3em', color: 'rgba(239,236,229,.4)', textTransform: 'uppercase', fontFamily: '"JetBrains Mono",monospace', background: 'none', border: 'none', cursor: 'pointer' }}>
        [esc] skip
      </button>
    </div>
  )
}
