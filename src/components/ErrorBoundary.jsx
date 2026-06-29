import { Component } from 'react'

/**
 * Error boundary global: evita a tela branca caso algum componente quebre
 * em runtime, mostrando um fallback discreto com opção de recarregar.
 */
export default class ErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { hasError: false }
  }

  static getDerivedStateFromError() {
    return { hasError: true }
  }

  componentDidCatch(error, info) {
    // Em produção isto poderia ir para um serviço de monitoramento.
    console.error('ErrorBoundary capturou um erro:', error, info)
  }

  render() {
    if (this.state.hasError) {
      return (
        <div className="min-h-screen bg-paper text-edtext font-body flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="font-display text-3xl tracking-[-0.02em]">Algo deu errado</h1>
          <p className="text-[0.95rem] text-edsecondary max-w-md leading-relaxed">
            Ocorreu um erro inesperado ao renderizar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[0.8rem] font-medium uppercase tracking-[0.08em] text-white px-8 py-3.5 rounded-full"
            style={{ background: 'var(--ed-accent)' }}
          >
            Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
