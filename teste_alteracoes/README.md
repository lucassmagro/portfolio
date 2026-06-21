# teste_alteracoes/

Versões **reformuladas** das 4 mini-sites estáticas, criadas sem alterar os
arquivos originais em `public/` (para comparação antes/depois). Cada card de
projeto no portfólio React tem um botão **"Ver versão reformulada"** que aponta
para cá, ao lado do link para a versão original.

## Como é servido

A pasta fica na raiz do repositório (fora de `public/`). Um plugin no
`vite.config.js` (`serveTesteAlteracoes`) a serve em `/teste_alteracoes/...`
durante o `dev` e a copia para `dist/teste_alteracoes/` no `build`. As imagens
são reaproveitadas de `public/<site>/img/` via caminhos absolutos (sem duplicar
binários).

## Sites

| Site | Páginas | Destaques da reformulação |
|------|---------|---------------------------|
| `hotel/` | 6 | Fluxo de reserva real simulado (busca → resultados → modal 2 passos → confirmação), favicon corrigido, contatos unificados |
| `cafeteria/` | 6 | Carrinho funcional (localStorage + mailto), sem hotlink de Unsplash, contato unificado em SP (DDD 11) |
| `refit/` | 6 | CSS/JS extraídos para arquivos, galeria filtrável + lightbox, form real, telefone unificado |
| `arquitetura/` | 5 | Grid minimalista, `<main>`, portfólio filtrável (consolida as páginas de projeto), WhatsApp placeholder removido |

Todos: dark mode onde fazia sentido, nav fixa com estado ativo, rodapé
consistente, `meta description` única por página, validação de formulário com
estados de erro/sucesso, responsivo (375 / 768 / desktop) e
`prefers-reduced-motion`.

## Migrar para rotas React no futuro?

**Recomendação:** manter como sites estáticos por enquanto. Elas demonstram
HTML/CSS/JS "na unha" (um diferencial num portfólio) e carregam sem o bundle do
app. Valeria virar rota React apenas o **Hotel**, cujo fluxo de reserva ganharia
com estado compartilhado e roteamento — as outras três são majoritariamente
conteúdo e não justificam o custo da migração.
