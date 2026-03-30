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
      },
      colors: {
        'perry-gray': '#666666',
        'perry-light-gray': '#999999',
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
