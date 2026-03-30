import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // base './' → all asset URLs are relative, so the built index.html
  // works when opened directly as a file without a server.
  base: '/portfolio/',

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
