import { useRef, useEffect } from 'react'
import { useReducedMotion } from 'framer-motion'

/**
 * ParticleCanvas
 * Campo de pontos derivando lentamente, conectados por linhas ultra-tênues
 * quando ficam a menos de 150px um do outro.
 *
 * Otimizações:
 *  - Respeita prefers-reduced-motion (desenha um quadro estático, sem rAF).
 *  - Pausa quando a aba fica oculta (economia de bateria/CPU).
 *  - Pareamento de linhas via grade espacial: em vez de O(n²) comparando
 *    todos os pares, cada ponto só checa as células vizinhas.
 */
export default function ParticleCanvas({ isDark }) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)
  const particlesRef = useRef([])
  const prefersReducedMotion = useReducedMotion()

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    let W, H

    const color = isDark ? '255,255,255' : '0,0,0'
    const dotOpacityBase = isDark ? 0.02 : 0.04
    const lineOpacityMax = isDark ? 0.03 : 0.06
    const MAX_DIST = 150
    const MAX_DIST_SQ = MAX_DIST * MAX_DIST

    const resize = () => {
      W = canvas.width = window.innerWidth
      H = canvas.height = window.innerHeight
      init()
    }

    const init = () => {
      const count = Math.min(Math.floor((W * H) / 18000), 90)
      particlesRef.current = Array.from({ length: count }, () => ({
        x: Math.random() * W,
        y: Math.random() * H,
        vx: (Math.random() - 0.5) * 0.1,
        vy: (Math.random() - 0.5) * 0.1,
        r: Math.random() * 1.2 + 0.3,
        op: dotOpacityBase + Math.random() * 0.05,
      }))
    }

    // Desenha pontos e linhas. Quando `step` é true, atualiza posições.
    const draw = (step) => {
      ctx.clearRect(0, 0, W, H)
      const ps = particlesRef.current

      ps.forEach((p) => {
        if (step) {
          p.x += p.vx
          p.y += p.vy
          if (p.x < 0) p.x = W
          if (p.x > W) p.x = 0
          if (p.y < 0) p.y = H
          if (p.y > H) p.y = 0
        }
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(${color},${p.op})`
        ctx.fill()
      })

      // Grade espacial: bucket por célula de tamanho MAX_DIST.
      const cols = Math.max(1, Math.ceil(W / MAX_DIST))
      const rows = Math.max(1, Math.ceil(H / MAX_DIST))
      const grid = new Map()
      const key = (cx, cy) => cx * rows + cy
      ps.forEach((p, idx) => {
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / MAX_DIST)))
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / MAX_DIST)))
        const k = key(cx, cy)
        if (!grid.has(k)) grid.set(k, [])
        grid.get(k).push(idx)
      })

      ctx.lineWidth = 0.4
      ps.forEach((p, i) => {
        const cx = Math.min(cols - 1, Math.max(0, Math.floor(p.x / MAX_DIST)))
        const cy = Math.min(rows - 1, Math.max(0, Math.floor(p.y / MAX_DIST)))
        for (let gx = cx - 1; gx <= cx + 1; gx++) {
          for (let gy = cy - 1; gy <= cy + 1; gy++) {
            if (gx < 0 || gy < 0 || gx >= cols || gy >= rows) continue
            const bucket = grid.get(key(gx, gy))
            if (!bucket) continue
            for (const j of bucket) {
              if (j <= i) continue // cada par só uma vez
              const dx = p.x - ps[j].x
              const dy = p.y - ps[j].y
              const distSq = dx * dx + dy * dy
              if (distSq < MAX_DIST_SQ) {
                const alpha = (1 - Math.sqrt(distSq) / MAX_DIST) * lineOpacityMax
                ctx.beginPath()
                ctx.strokeStyle = `rgba(${color},${alpha})`
                ctx.moveTo(p.x, p.y)
                ctx.lineTo(ps[j].x, ps[j].y)
                ctx.stroke()
              }
            }
          }
        }
      })
    }

    const tick = () => {
      if (!document.hidden) draw(true)
      rafRef.current = requestAnimationFrame(tick)
    }

    const onVisibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(rafRef.current)
      } else if (!prefersReducedMotion) {
        rafRef.current = requestAnimationFrame(tick)
      }
    }

    resize()
    window.addEventListener('resize', resize, { passive: true })

    if (prefersReducedMotion) {
      draw(false) // quadro estático, sem animação
    } else {
      document.addEventListener('visibilitychange', onVisibility)
      tick()
    }

    return () => {
      cancelAnimationFrame(rafRef.current)
      window.removeEventListener('resize', resize)
      document.removeEventListener('visibilitychange', onVisibility)
    }
  }, [isDark, prefersReducedMotion])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
      aria-hidden="true"
    />
  )
}
