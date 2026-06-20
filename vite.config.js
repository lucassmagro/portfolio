/// <reference types="vitest/config" />
import { readFileSync, existsSync, statSync, cpSync } from 'node:fs'
import { join, extname } from 'node:path'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const MIME = {
  '.html': 'text/html',
  '.css': 'text/css',
  '.js': 'text/javascript',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.json': 'application/json',
}

/**
 * Serve a pasta teste_alteracoes/ (versões reformuladas das mini-sites), que
 * fica na raiz do repositório e não é coberta pelo publicDir do Vite.
 * - Em dev: middleware lê os arquivos do disco.
 * - No build: copia teste_alteracoes/ para dist/teste_alteracoes/.
 */
function serveTesteAlteracoes() {
  const folder = 'teste_alteracoes'
  return {
    name: 'serve-teste-alteracoes',
    configureServer(server) {
      server.middlewares.use((req, res, next) => {
        if (!req.url || !req.url.startsWith(`/${folder}`)) return next()
        let filePath = join(process.cwd(), decodeURIComponent(req.url.split('?')[0]))
        if (existsSync(filePath) && statSync(filePath).isDirectory()) {
          filePath = join(filePath, 'index.html')
        }
        if (!existsSync(filePath)) return next()
        res.setHeader('Content-Type', MIME[extname(filePath)] || 'application/octet-stream')
        res.end(readFileSync(filePath))
      })
    },
    closeBundle() {
      const src = join(process.cwd(), folder)
      if (existsSync(src)) cpSync(src, join(process.cwd(), 'dist', folder), { recursive: true })
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), serveTesteAlteracoes()],

  test: {
    globals: true,
    environment: 'jsdom',
    setupFiles: './src/test/setup.js',
    css: false,
  },

  // base './' → all asset URLs are relative, so the built index.html
  // works when opened directly as a file without a server.
  base: '/',

  server: {
    // Allow the dev server to reach outside the project root
    // so that ../hotel/img/... and ../cafeteria/img/... resolve correctly.
    fs: {
      allow: ['..'],
    },
  },

  build: {
    // Output to /portfolio/dist/.
    // With base './', from dist/index.html the relative links
    // ../../hotel/index.html and ../../hotel/img/... resolve correctly.
    outDir: 'dist',
  },
})
