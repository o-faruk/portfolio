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
      canvas.width = window.innerWidth
      canvas.height = window.innerHeight
      cols = Math.ceil(canvas.width / FS)
      drops = Array.from({ length: cols }, () => Math.random() * -50)
      speeds = Array.from({ length: cols }, () => 0.4 + Math.random() * 0.55)
    }

    function draw(t) {
      raf = requestAnimationFrame(draw)
      if (t - last < 33) return
      last = t
      ctx.fillStyle = 'rgba(8,7,13,0.09)'
      ctx.fillRect(0, 0, canvas.width, canvas.height)
      ctx.font = `${FS}px "JetBrains Mono",monospace`
      ctx.textBaseline = 'top'
      for (let i = 0; i < cols; i++) {
        const ch = CHARS[(Math.random() * CHARS.length) | 0]
        const x = i * FS, y = drops[i] * FS
        const base = Math.random() < 0.78 ? '168,85,247' : '192,132,252'
        const a = 0.1 + Math.random() * 0.85
        if (a > 0.82) {
          ctx.shadowBlur = 10
          ctx.shadowColor = `rgba(${base},0.85)`
          ctx.fillStyle = `rgba(239,236,229,${Math.min(1, a)})`
        } else {
          ctx.shadowBlur = 0
          ctx.fillStyle = `rgba(${base},${a})`
        }
        ctx.fillText(ch, x, y)
        drops[i] += speeds[i]
        if (y > canvas.height && Math.random() > 0.975) {
          drops[i] = Math.random() * -20
          speeds[i] = 0.4 + Math.random() * 0.55
        }
      }
      ctx.shadowBlur = 0
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
      style={{ position: 'fixed', inset: 0, zIndex: 0, width: '100vw', height: '100vh', display: 'block', pointerEvents: 'none' }}
    />
  )
}
