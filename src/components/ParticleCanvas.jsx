import { useRef, useEffect } from 'react'

/**
 * ParticleCanvas
 * Draws a slowly-drifting field of tiny dots connected by
 * ultra-faint lines when they come within 150px of each other.
 *
 * Opacity targets:
 *   dots  → 0.02–0.07  (dark) / 0.04–0.10  (light)
 *   lines → max 0.03   (dark) / max 0.06    (light)
 *
 * Re-initializes when isDark changes so colors flip immediately.
 */
export default function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H

    const color = isDark ? '255,255,255' : '0,0,0'
    const dotOpacityBase = isDark ? 0.02 : 0.04
    const lineOpacityMax = isDark ? 0.03 : 0.06
    const MAX_DIST = 150

    // ── Sizing ──────────────────────────────────────────
    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      init()
    }

    // ── Particle factory ─────────────────────────────────
    const init = () => {
      const count = Math.min(Math.floor((W * H) / 18000), 90)
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.10, // very slow
        vy: (Math.random() - 0.5) * 0.10,
        r: Math.random() * 1.2 + 0.3,
        op: dotOpacityBase + Math.random() * 0.05,
      }))
    }

    // ── Animation loop ───────────────────────────────────
    const tick = () => {
      ctx.clearRect(0, 0, W, H)
      const ps = particlesRef.current

      // Draw dots & update positions
      ps.forEach((p) => {
        p.x += p.vx
        p.y += p.vy
        // Wrap edges seamlessly
        if (p.x < 0) p.x = W
        if (p.x > W) p.x = 0
        if (p.y < 0) p.y = H
        if (p.y > H) p.y = 0

        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.op})`
        ctx.fill()
      })

      // Draw connecting lines between nearby particles
      for (let i = 0; i < ps.length; i++) {
        for (let j = i + 1; j < ps.length; j++) {
          const dx = ps[i].x - ps[j].x
          const dy = ps[i].y - ps[j].y
          const dist = Math.sqrt(dx * dx + dy * dy)
          if (dist < MAX_DIST) {
            const alpha = (1 - dist / MAX_DIST) * lineOpacityMax
            ctx.beginPath()
            ctx.strokeStyle = `rgba(${color},${alpha})`
            ctx.lineWidth = 0.4
            ctx.moveTo(ps[i].x, ps[i].y)
            ctx.lineTo(ps[j].x, ps[j].y)
            ctx.stroke()
          }
        }
      }

      rafRef.current = requestAnimationFrame(tick)
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })
    tick()

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
    }
  }, [isDark]) // Re-run when theme changes → correct color immediately

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
