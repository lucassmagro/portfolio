import { useEffect, useRef, useState } from 'react'

/**
 * Observa um elemento e retorna [ref, inView] quando ele entra na viewport.
 * Substitui o `whileInView` do framer-motion com IntersectionObserver nativo.
 * Por padrão dispara uma única vez (once) com uma margem negativa.
 */
export function useInView({ margin = '-80px 0px', once = true } = {}) {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)

  useEffect(() => {
    const el = ref.current
    if (!el || typeof IntersectionObserver === 'undefined') {
      setInView(true)
      return
    }
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setInView(true)
          if (once) io.disconnect()
        } else if (!once) {
          setInView(false)
        }
      },
      { rootMargin: margin },
    )
    io.observe(el)
    return () => io.disconnect()
  }, [margin, once])

  return [ref, inView]
}
