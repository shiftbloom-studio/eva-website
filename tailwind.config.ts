import type { Config } from 'tailwindcss'

export default {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './hooks/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
    './lib/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        ironwood: '#452C1F',
        sunbronze: '#BA8A2D',
        bloodstone: '#994324',
        void: {
          50: '#f7f7f8',
          100: '#e9e9ee',
          200: '#cbccd7',
          300: '#a3a4b7',
          400: '#77798f',
          500: '#585a6f',
          600: '#45465a',
          700: '#333342',
          800: '#1f202a',
          900: '#121219',
          950: '#07060a',
        },
        vellum: {
          50: '#fdfaf6',
          100: '#fbf5ec',
          200: '#f4e6cf',
          300: '#e7cfa6',
          400: '#d7b074',
          500: '#c5914c',
          600: '#b0773f',
          700: '#905a34',
          800: '#77492e',
          900: '#633d29',
          950: '#2f1c14',
        },
        moss: {
          200: '#b9c39c',
          300: '#95a073',
          400: '#78855a',
          500: '#5b6944',
          700: '#2f3a24',
          900: '#141a11',
        },
      },
      fontFamily: {
        sans: [
          'var(--font-sans)',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
        display: [
          'var(--font-display)',
          'var(--font-sans)',
          'system-ui',
          'Segoe UI',
          'Roboto',
          'Helvetica',
          'Arial',
          'sans-serif',
        ],
      },
      fontSize: {
        'display-sm': [
          'clamp(2.2rem, 7vw, 4.25rem)',
          { lineHeight: '0.92', letterSpacing: '-0.04em' },
        ],
        'display-md': [
          'clamp(3.1rem, 8.5vw, 6.25rem)',
          { lineHeight: '0.9', letterSpacing: '-0.055em' },
        ],
        'display-lg': [
          'clamp(3.75rem, 10.5vw, 10rem)',
          { lineHeight: '0.86', letterSpacing: '-0.065em' },
        ],
        mega: ['10rem', { lineHeight: '0.82', letterSpacing: '-0.07em' }],
      },
      boxShadow: {
        'glow-bronze':
          '0 0 0 1px rgba(186, 138, 45, 0.25), 0 18px 80px rgba(186, 138, 45, 0.10)',
        'glow-blood':
          '0 0 0 1px rgba(153, 67, 36, 0.25), 0 18px 80px rgba(153, 67, 36, 0.10)',
      },
      borderRadius: {
        '4xl': '2rem',
      },
    },
  },
  plugins: [],
} satisfies Config

