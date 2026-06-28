import { useEffect, useRef } from 'react'
import { useTheme } from '../context/ThemeContext.jsx'

/**
 * StarsCanvas — campo de estrelas com cometas ocasionais.
 * Renderiza apenas no modo escuro (fundo do hero). Respeita
 * prefers-reduced-motion (desenha estrelas estáticas, sem cometas).
 */
export default function StarsCanvas() {
  const { isDark } = useTheme()
  const canvasRef = useRef(null)

  useEffect(() => {
    if (!isDark) return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches

    let width = 0
    let height = 0
    let stars = []
    let comets = []
    let raf = 0
    let lastComet = 0

    const initStars = () => {
      const count = Math.round((width * height) / 8000)
      stars = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        r: Math.random() * 1.2 + 0.3,
        a: Math.random() * 0.5 + 0.25,
        tw: Math.random() * 0.02 + 0.004,
        ph: Math.random() * Math.PI * 2,
      }))
    }

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      width = canvas.offsetWidth
      height = canvas.offsetHeight
      canvas.width = width * dpr
      canvas.height = height * dpr
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      initStars()
    }

    const spawnComet = () => {
      comets.push({
        x: Math.random() * width * 0.6,
        y: Math.random() * height * 0.35,
        vx: Math.random() * 4 + 5,
        vy: Math.random() * 2 + 2.5,
        life: 0,
        ttl: 110,
      })
    }

    const draw = (t) => {
      ctx.clearRect(0, 0, width, height)

      // Estrelas (com leve cintilar)
      ctx.fillStyle = '#ffffff'
      for (const s of stars) {
        if (!reduce) s.ph += s.tw
        ctx.globalAlpha = Math.max(0, s.a + Math.sin(s.ph) * 0.25)
        ctx.beginPath()
        ctx.arc(s.x, s.y, s.r, 0, Math.PI * 2)
        ctx.fill()
      }
      ctx.globalAlpha = 1

      // Cometas
      if (!reduce) {
        if (t - lastComet > 2800 && comets.length < 2) {
          lastComet = t
          spawnComet()
        }
        comets = comets.filter((c) => c.life < c.ttl && c.x < width + 200 && c.y < height + 200)
        for (const c of comets) {
          c.x += c.vx
          c.y += c.vy
          c.life++
          const norm = Math.hypot(c.vx, c.vy)
          const tail = 150
          const tx = c.x - (c.vx / norm) * tail
          const ty = c.y - (c.vy / norm) * tail
          const fade = Math.min(1, c.life / 10) * Math.min(1, (c.ttl - c.life) / 24)
          const grad = ctx.createLinearGradient(c.x, c.y, tx, ty)
          grad.addColorStop(0, `rgba(255,255,255,${0.9 * fade})`)
          grad.addColorStop(1, 'rgba(255,255,255,0)')
          ctx.strokeStyle = grad
          ctx.lineWidth = 2
          ctx.beginPath()
          ctx.moveTo(c.x, c.y)
          ctx.lineTo(tx, ty)
          ctx.stroke()
          ctx.globalAlpha = fade
          ctx.beginPath()
          ctx.arc(c.x, c.y, 1.6, 0, Math.PI * 2)
          ctx.fill()
          ctx.globalAlpha = 1
        }
        raf = requestAnimationFrame(draw)
      }
    }

    resize()
    window.addEventListener('resize', resize)
    if (reduce) {
      draw(0)
    } else {
      raf = requestAnimationFrame(draw)
    }

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [isDark])

  if (!isDark) return null
  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 h-full w-full"
    />
  )
}
