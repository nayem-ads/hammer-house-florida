import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#FFF1F2',
          100: '#FFE4E6',
          200: '#FECDD3',
          500: '#E11D48',
          600: '#BE123C',
          700: '#8B1122',
          800: '#730C1A',
          900: '#520611',
          950: '#330209',
        },
        dark: {
          950: '#090D14',
          900: '#0F172A',
          800: '#1E293B',
          700: '#334155',
          600: '#475569',
        },
      },
      fontFamily: {
        sans: ['var(--font-poppins)', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'sans-serif'],
      },
      boxShadow: {
        'card': '0 20px 50px -12px rgba(15, 23, 42, 0.12), 0 4px 16px -2px rgba(15, 23, 42, 0.04)',
        'btn': '0 10px 25px -5px rgba(139, 17, 34, 0.35), 0 4px 10px -2px rgba(139, 17, 34, 0.2)',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.25s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'spin-slow': 'spin-slow 1.4s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
