import { describe, it, expect } from 'vitest'
import { render, screen } from '@testing-library/react'
import ProjectCard from './ProjectCard.jsx'

const labels = {
  view: 'VER',
  reworked: 'Ver versão reformulada',
  soon: 'Estudo de caso em breve',
  challengeLabel: 'Desafio',
  solutionLabel: 'Solução',
}

const baseProject = {
  id: 'hotel',
  title: 'Lumina Hotel',
  brief: 'Resumo do projeto.',
  challenge: 'Reservar é burocrático.',
  solution: 'Fluxo guiado.',
  tags: ['UI/UX'],
  href: 'hotel/index.html',
}

describe('ProjectCard', () => {
  it('renderiza título, enquadramento e ações de um projeto com link', () => {
    render(<ProjectCard project={baseProject} labels={labels} isDark index={0} />)
    expect(screen.getByText('Lumina Hotel')).toBeInTheDocument()
    expect(screen.getByText('Desafio')).toBeInTheDocument()
    expect(screen.getByText('Reservar é burocrático.')).toBeInTheDocument()
    expect(screen.getByText('Solução')).toBeInTheDocument()
    // há ao menos um link apontando para o projeto
    const links = screen.getAllByRole('link')
    expect(links.some((a) => a.getAttribute('href') === 'hotel/index.html')).toBe(true)
  })

  it('mostra o selo "em breve" e nenhum link quando comingSoon', () => {
    const soon = { ...baseProject, href: undefined, comingSoon: true }
    render(<ProjectCard project={soon} labels={labels} isDark index={1} />)
    expect(screen.getByText('Estudo de caso em breve')).toBeInTheDocument()
    expect(screen.queryAllByRole('link')).toHaveLength(0)
  })

  it('exibe o botão de versão reformulada quando reworkedHref existe', () => {
    const reworked = { ...baseProject, reworkedHref: 'teste_alteracoes/hotel/index.html' }
    render(<ProjectCard project={reworked} labels={labels} isDark index={2} />)
    const links = screen.getAllByRole('link')
    expect(links.some((a) => a.getAttribute('href') === 'teste_alteracoes/hotel/index.html')).toBe(
      true,
    )
  })
})
