/**
 * Helpers de tema para eliminar o padrão repetido de ternário `isDark ? ... : ...`
 * que aparecia em LinkHub, Resume, Footer, CtaBanner e ScrollToTop.
 */

// Junta classes condicionais ignorando valores falsy.
export const cx = (...parts) => parts.filter(Boolean).join(' ')

/**
 * Conjunto de classes de superfície derivadas do tema.
 * Uso: const s = themeClasses(isDark); <div className={s.bg + ' ' + s.text} />
 */
export const themeClasses = (isDark) => ({
  bg: isDark ? 'bg-black' : 'bg-white',
  text: isDark ? 'text-white' : 'text-black',
  cardBg: isDark ? 'bg-white/5' : 'bg-black/[0.03]',
  border: isDark ? 'border-white/10' : 'border-black/10',
  borderSoft: isDark ? 'border-white/10' : 'border-black/5',
  muted: isDark ? 'text-white/40' : 'text-black/40',
  subline: isDark ? 'bg-white/10' : 'bg-black/10',
  // Botão sólido invertido (preto no claro, branco no escuro).
  solidBtn: isDark ? 'bg-white text-black hover:bg-white/90' : 'bg-black text-white hover:bg-black/90',
})
