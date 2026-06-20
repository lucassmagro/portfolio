import { useEffect, useRef, useState } from 'react'
import { useReducedMotion } from 'framer-motion'

const LERP_FACTOR = 0.18

// Detecta dispositivos de toque/sem ponteiro fino (mobile/tablet).
const isTouchDevice = () =>
  typeof window !== 'undefined' &&
  (window.matchMedia?.('(hover: none), (pointer: coarse)').matches ||
    'ontouchstart' in window ||
    navigator.maxTouchPoints > 0)

/**
 * Cursor customizado de alta performance (rAF + lerp).
 * Só é montado em dispositivos com ponteiro fino e sem prefers-reduced-motion;
 * caso contrário não renderiza e mantém o cursor do sistema (UX correto no mobile).
 */
export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')
  const prefersReducedMotion = useReducedMotion()
  const [enabled] = useState(() => !isTouchDevice())

  // Refs for animation performance
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const requestRef = useRef(null)
  const cursorRef = useRef(null)

  const active = enabled && !prefersReducedMotion

  // Esconde o cursor do sistema apenas quando o customizado está ativo.
  useEffect(() => {
    if (!active) return
    document.body.classList.add('cursor-none')
    return () => document.body.classList.remove('cursor-none')
  }, [active])

  useEffect(() => {
    if (!active) return
    const onMove = (e) => {
      mousePos.current = { x: e.clientX, y: e.clientY }
    }

    const onOver = (e) => {
      const target = e.target.closest('[data-cursor-hover]')
      if (target) {
        setIsHovered(true)
        setCursorText(target.getAttribute('data-cursor-text') || '')
      }
    }

    const onOut = (e) => {
      if (e.target.closest('[data-cursor-hover]')) {
        setIsHovered(false)
        setCursorText('')
      }
    }

    window.addEventListener('mousemove', onMove, { passive: true })
    document.addEventListener('mouseover', onOver)
    document.addEventListener('mouseout', onOut)

    // Animation Loop
    const animate = () => {
      // Linear Interpolation: current + (target - current) * factor
      cursorPos.current.x += (mousePos.current.x - cursorPos.current.x) * LERP_FACTOR
      cursorPos.current.y += (mousePos.current.y - cursorPos.current.y) * LERP_FACTOR

      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${cursorPos.current.x}px, ${cursorPos.current.y}px, 0) translate(-50%, -50%)`
      }

      requestRef.current = requestAnimationFrame(animate)
    }

    requestRef.current = requestAnimationFrame(animate)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseover', onOver)
      document.removeEventListener('mouseout', onOut)
      cancelAnimationFrame(requestRef.current)
    }
  }, [active])

  // Em toque ou reduced-motion: não renderiza nada e mantém o cursor do sistema.
  if (!active) return null

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 rounded-full pointer-events-none z-[10000] mix-blend-difference flex items-center justify-center transition-[width,height] duration-500 ease-out bg-white"
      style={{
        width: isHovered ? '90px' : '12px',
        height: isHovered ? '90px' : '12px',
      }}
    >
      {isHovered && cursorText && (
        <span 
          className="text-[10px] font-bold tracking-[0.2em] text-black uppercase opacity-0 animate-fade-in"
          style={{ 
            animation: 'fadeIn 0.3s forwards 0.2s',
            filter: 'invert(1)' 
          }}
        >
          {cursorText}
        </span>
      )}
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; transform: translateY(5px); }
          to { opacity: 1; transform: translateY(0); }
        }
      `}</style>
    </div>
  )
}
