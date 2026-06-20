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
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center gap-6 px-6 text-center">
          <h1 className="text-2xl font-black uppercase tracking-[0.2em]">Algo deu errado</h1>
          <p className="text-sm opacity-60 max-w-md">
            Ocorreu um erro inesperado ao renderizar a página.
          </p>
          <button
            onClick={() => window.location.reload()}
            className="text-[11px] font-bold uppercase tracking-[0.3em] bg-white text-black px-8 py-4 rounded-full"
          >
            Recarregar
          </button>
        </div>
      )
    }
    return this.props.children
  }
}
