import { useEffect, useRef } from 'react'

const CHARS = 'アァカサタナハマヤャラワガザダバパイィキシチニヒミリヰギジヂビピウゥクスツヌフムユュルグズブヅプエェケセテネヘメレヱゲゼデベペオォコソトノホモヨョロヲゴゾドボポヴッン0123456789'.split('')

export default function MatrixRain() {
  const ref = useRef(null)

  useEffect(() => {
    const canvas = ref.current
    const ctx = canvas.getContext('2d')
    const FS = 16
    let cols, drops, speeds, raf, last = 0

    function setup() {
      // Cap at 1× DPR — halves pixel count on retina without visual distortion
      const dpr = Math.min(window.devicePixelRatio || 1, 1)
      canvas.width = Math.ceil(window.innerWidth * dpr)
      canvas.height = Math.ceil(window.innerHeight * dpr)
      const scaledFS = Math.round(FS * dpr)
      cols = Math.ceil(canvas.width / scaledFS)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
      speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.55)
      ctx.font = `${scaledFS}px "JetBrains Mono",monospace`
      ctx.textBaseline = 'top'
    }

    function draw(t) {
      raf = requestAnimationFrame(draw)
      if (t - last < 55) return
      last = t
      const scaledFS = Math.round(FS * Math.min(window.devicePixelRatio || 1, 1))
      ctx.fillStyle = 'rgba(8,7,13,0.09)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0]
        const x = i * scaledFS, y = drops[i] * scaledFS
        const a = 0.1 + Math.random() * 0.85
        ctx.fillStyle = Math.random() < 0.78
          ? `rgba(168,85,247,${a})`
          : `rgba(192,132,252,${a})`
        ctx.fillText(ch, x, y)
        drops[i] += speeds[i]
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20
          speeds[i] = 0.4 + Math.random() * 0.55
        }
      }
    }

    setup()
    const ro = new ResizeObserver(setup)
    ro.observe(document.documentElement)
    raf = requestAnimationFrame(draw)
    return () => { cancelAnimationFrame(raf); ro.disconnect() }
  }, [])

  return (
    <canvas
      ref={ref}
      style={{ position: 'fixed', inset: 0, zIndex: 0, width: '100vw', height: '100vh', display: 'block', pointerEvents: 'none', willChange: 'transform' }}
    />
  )
}
