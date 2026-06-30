import { useState, useEffect, useRef, memo } from 'react'
import Lenis from 'lenis'
import BootSequence from './components/hud/BootSequence'
import HUDOverlay from './components/hud/HUDOverlay'
import MatrixRain from './components/hud/MatrixRain'
import SideRails from './components/hud/SideRails'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import Projects from './components/Projects'
import Experience from './components/Experience'
import Contact from './components/Contact'
import Footer from './components/Footer'

// Memoized so scroll-state changes in App don't re-render page content
const PageContent = memo(function PageContent() {
  return (
    <>
      <Navbar />
      <main style={{ position: 'relative', zIndex: 10 }}>
        <Hero />
        <Projects />
        <Experience />
        <Contact />
      </main>
      <Footer style={{ position: 'relative', zIndex: 10 }} />
    </>
  )
})

export default function App() {
  const [booted, setBooted] = useState(false)
  const [scrollPct, setScrollPct] = useState(0)
  const lenisRef = useRef(null)

  useEffect(() => {
    const lenis = new Lenis({ lerp: 0.1, smoothWheel: true })
    lenisRef.current = lenis
    window.__lenis = lenis
    let raf
    function loop(t) { lenis.raf(t); raf = requestAnimationFrame(loop) }
    raf = requestAnimationFrame(loop)
    lenis.on('scroll', ({ progress }) => {
      const next = Math.round(progress * 100)
      setScrollPct(prev => prev === next ? prev : next)
    })
    return () => { cancelAnimationFrame(raf); lenis.destroy() }
  }, [])

  return (
    <>
      {!booted && <BootSequence onDone={() => setBooted(true)} />}

      {/* Fixed BG layers */}
      <MatrixRain />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', background: 'rgba(8,7,13,.82)' }} />
      <div style={{ position: 'fixed', inset: 0, zIndex: 0, pointerEvents: 'none', backgroundImage: 'linear-gradient(rgba(168,85,247,.045) 1px,transparent 1px),linear-gradient(90deg,rgba(168,85,247,.045) 1px,transparent 1px)', backgroundSize: '64px 64px', opacity: .5 }} />
      <div style={{ position: 'fixed', top: -220, right: -180, zIndex: 0, width: 700, height: 700, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle at center,rgba(168,85,247,.18) 0%,rgba(168,85,247,.08) 30%,rgba(168,85,247,.02) 60%,transparent 75%)' }} />
      <div style={{ position: 'fixed', bottom: -260, left: -160, zIndex: 0, width: 660, height: 660, borderRadius: '50%', pointerEvents: 'none', background: 'radial-gradient(circle at center,rgba(126,34,206,.14) 0%,rgba(126,34,206,.05) 40%,transparent 70%)' }} />

      {/* HUD + rails — only these re-render on scroll */}
      <HUDOverlay scrollPct={scrollPct} />
      <SideRails scrollPct={scrollPct} />

      <PageContent />
    </>
  )
}
