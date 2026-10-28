import { describe, it, expect } from 'vitest'
import { render, screen, fireEvent } from '@testing-library/react'
import Gallery from './Gallery.jsx'

const t = {
  section: 'Trabalhos',
  title: 'Sites que eu fiz.',
  view: 'Ver site',
  caseLabel: 'Cliente real',
  caseCta: 'Ver o site no ar',
  challengeLabel: 'Desafio',
  solutionLabel: 'Solução',
  modelsTitle: 'Veja um site do seu ramo',
  modelsSub: 'Sites modelo.',
  filterLabel: 'Filtrar por ramo',
  filters: [
    { id: 'todos', label: 'Todos' },
    { id: 'saude', label: 'Saúde' },
    { id: 'pets', label: 'Pets' },
    { id: 'comercio', label: 'Comércio' },
  ],
  items: [
    {
      id: 'mg',
      featured: true,
      caseReal: true,
      title: 'MG',
      sector: 'Construtora',
      brief: 'Resumo.',
      challenge: 'Desafio do caso.',
      solution: 'Solução do caso.',
      href: 'https://exemplo.com/',
      customImage: 'projects/mockup-mg.webp',
    },
    {
      id: 'clarim',
      featured: true,
      ramo: 'saude',
      title: 'Clarim',
      sector: 'Odontologia',
      href: 'odonto/index.html',
      customImage: 'projects/mockup-clarim.webp',
    },
    {
      id: 'mimo',
      featured: true,
      ramo: 'pets',
      title: 'Mimo',
      sector: 'Veterinária',
      href: 'veterinaria/index.html',
      customImage: 'projects/mockup-mimo.webp',
    },
    { id: 'estudo', title: 'Estudo', href: '#', customImage: 'x.webp' },
  ],
}

describe('Gallery', () => {
  it('mostra o case real em destaque e os modelos, sem os projetos fora do destaque', () => {
    render(<Gallery t={t} />)
    expect(screen.getByRole('heading', { name: 'MG' })).toBeInTheDocument()
    expect(screen.getByText('Resumo.')).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Clarim' })).toBeInTheDocument()
    expect(screen.getByRole('heading', { name: 'Mimo' })).toBeInTheDocument()
    expect(screen.queryByText('Estudo')).not.toBeInTheDocument()
  })

  it('só oferece filtros de ramos que têm site, e filtra ao tocar', () => {
    render(<Gallery t={t} />)
    // "Comércio" não tem nenhum modelo, então não vira botão
    expect(screen.queryByRole('button', { name: 'Comércio' })).not.toBeInTheDocument()
    fireEvent.click(screen.getByRole('button', { name: 'Pets' }))
    expect(screen.getByRole('button', { name: 'Pets' })).toHaveAttribute('aria-pressed', 'true')
    expect(screen.getByRole('heading', { name: 'Mimo' })).toBeInTheDocument()
    expect(screen.queryByRole('heading', { name: 'Clarim' })).not.toBeInTheDocument()
  })
})
