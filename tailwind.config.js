/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}',
  ],

  // 'class' strategy: dark mode activates when <html class="dark"> is present
  // This is synced with React state in App.jsx via useEffect
  darkMode: 'class',

  theme: {
    extend: {
      fontFamily: {
        sans: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        // Editorial type system (portfolio landing)
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        body: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        // Editorial palette — semantic tokens backed by CSS variables (theme-aware)
        paper: 'var(--ed-paper)',
        cream: 'var(--ed-cream)',
        ink: 'var(--ed-ink)',
        edtext: 'var(--ed-text)',
        edbody: 'var(--ed-body)',
        edsecondary: 'var(--ed-secondary)',
        edmuted: 'var(--ed-muted)',
        edborder: 'var(--ed-border)',
        edborderfaint: 'var(--ed-border-faint)',
        ondark: '#e8e4dc',
        // Cor de acento (laranja editorial), tema-aware via CSS variable
        accent: 'var(--ed-accent)',
      },
      borderRadius: {
        ed: '4px',
        edsm: '3px',
      },
    },
  },

  plugins: [],
}
