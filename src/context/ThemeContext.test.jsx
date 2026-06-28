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
    window.location.hash = ''
  })

  it('abre claro por padrão na landing de portfólio', () => {
    window.location.hash = '#/portfolio'
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('dark').textContent).toBe('false')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('abre claro por padrão no LinkHub', () => {
    window.location.hash = '#/links'
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('dark').textContent).toBe('false')
    expect(document.documentElement).not.toHaveClass('dark')
  })

  it('mantém o modo escuro por padrão no currículo', () => {
    window.location.hash = '#/resume'
    render(
      <ThemeProvider>
        <Probe />
      </ThemeProvider>,
    )
    expect(screen.getByTestId('dark').textContent).toBe('true')
    expect(document.documentElement).toHaveClass('dark')
  })

  it('alterna o tema e persiste a escolha', async () => {
    window.location.hash = '#/resume' // começa no escuro para alternar p/ claro
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
