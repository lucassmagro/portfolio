import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { I18nProvider, useI18n } from './I18nContext.jsx'
import { translations } from '../i18n/translations.js'

function Probe() {
  const { lang, t, toggleLang } = useI18n()
  return (
    <div>
      <span data-testid="lang">{lang}</span>
      <span data-testid="tag">{t.hero.tag}</span>
      <button onClick={toggleLang}>toggle</button>
    </div>
  )
}

describe('I18nProvider', () => {
  beforeEach(() => localStorage.clear())

  it('expõe o dicionário do idioma ativo', () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    const lang = screen.getByTestId('lang').textContent
    expect(screen.getByTestId('tag').textContent).toBe(translations[lang].hero.tag)
  })

  it('alterna entre pt e en ao chamar toggleLang', async () => {
    render(
      <I18nProvider>
        <Probe />
      </I18nProvider>,
    )
    const before = screen.getByTestId('lang').textContent
    await userEvent.click(screen.getByText('toggle'))
    const after = screen.getByTestId('lang').textContent
    expect(after).not.toBe(before)
    expect(screen.getByTestId('tag').textContent).toBe(translations[after].hero.tag)
  })
})
