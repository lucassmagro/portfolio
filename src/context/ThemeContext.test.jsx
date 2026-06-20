import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { ThemeProvider, useTheme } from './ThemeContext.jsx'

function Probe() {
  const { isDark, toggleTheme } = useTheme()
  return (
    <div>
      <span data-testid="dark">{String(isDark)}</span>
      <button onClick={toggleTheme}>toggle</button>
    </div>
  )
}

describe('ThemeProvider', () => {
  beforeEach(() => {
    localStorage.clear()
    document.documentElement.classList.remove('dark')
  })

  it('começa em modo escuro por padrão e aplica a classe dark', () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('dark').textContent).toBe('true')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('alterna o tema e persiste a escolha', async () => {
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    await userEvent.click(screen.getByText('toggle'))
    expect(screen.getByTestId('dark').textContent).toBe('false')
    expect(document.documentElement).not.toHaveClass('dark')
    expect(localStorage.getItem('lsm-theme')).toBe('light')
  })
})
