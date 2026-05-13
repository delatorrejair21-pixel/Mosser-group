import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        moss: {
          DEFAULT: '#1B3A29',
          50:  '#EFF5F2',
          100: '#D4E7DB',
          200: '#A9CFB8',
          300: '#7EB794',
          400: '#539F71',
          500: '#3A7D58',
          600: '#2E6446',
          700: '#234B35',
          800: '#1B3A29',
          900: '#0F2118',
          950: '#07100C',
        },
        parchment: {
          DEFAULT: '#F5F0E8',
          50:  '#FDFCF9',
          100: '#FAF7F2',
          200: '#F5F0E8',
          300: '#EDE3D0',
          400: '#E0D1B2',
          500: '#CEBA8E',
          600: '#B5A070',
        },
      },
      fontFamily: {
        display: ['var(--font-cormorant)', 'Georgia', 'serif'],
        sans:    ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl':  '0.25em',
        'widest-2xl': '0.35em',
      },
      transitionTimingFunction: {
        luxury: 'cubic-bezier(0.25, 0.1, 0.25, 1)',
      },
    },
  },
  plugins: [],
}

export default config
