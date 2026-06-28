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
        sans: ['Inter', 'Plus Jakarta Sans', 'system-ui', '-apple-system', 'sans-serif'],
        serif: ['Gloock', 'serif'],
        // Editorial type system (portfolio landing)
        display: ['Fraunces', 'Georgia', 'Times New Roman', 'serif'],
        body: ['"DM Sans"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      colors: {
        'perry-gray': '#666666',
        'perry-light-gray': '#999999',
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
        brand: {
          green: '#8eec74',
        },
      },
      borderRadius: {
        ed: '4px',
        edsm: '3px',
      },
      letterSpacing: {
        'perry': '-0.05em',
        'widest-xl': '0.35rem',
      },
      lineHeight: {
        'perry': '0.85',
      },
      spacing: {
        'section': '200px',
      },
      backdropBlur: {
        '18': '18px',
        '3xl': '64px',
      },
    },
  },

  plugins: [],
}
