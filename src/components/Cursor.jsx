import { useEffect, useRef, useState } from 'react'

const LERP_FACTOR = 0.18

/**
 * High-Performance Custom Cursor (rAF + Lerp)
 * Logic:
 * 1. Track raw mouse coordinates.
 * 2. Animate a 'lerped' position inside requestAnimationFrame (60fps+).
 * 3. Use mix-blend-mode: difference for total visibility.
 */
export default function Cursor() {
  const [isHovered, setIsHovered] = useState(false)
  const [cursorText, setCursorText] = useState('')

  // Refs for animation performance
  const mousePos = useRef({ x: 0, y: 0 })
  const cursorPos = useRef({ x: 0, y: 0 })
  const requestRef = useRef(null)
  const cursorRef = useRef(null)

  useEffect(() => {
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
  }, [])

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
