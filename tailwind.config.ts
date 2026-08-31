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
        burgundy: {
          50: '#FDF2F4',
          100: '#FCE7EA',
          200: '#F8D0D6',
          300: '#F2A9B5',
          400: '#E77488',
          500: '#D4475E',
          600: '#B82E47',
          700: '#8B1E2D',
          800: '#7A1422',
          900: '#540D17',
          950: '#31040A',
        },
        linen: {
          50: '#FAF8F5',
          100: '#F5F1EB',
          200: '#EBE4D8',
          300: '#DDD1BF',
          400: '#C7B59D',
          500: '#B29B81',
        },
        charcoal: {
          900: '#141416',
          800: '#222226',
          700: '#3B3B42',
          600: '#555560',
          500: '#71717E',
          400: '#9595A2',
          300: '#C4C4CE',
          200: '#E2E2E8',
          100: '#F1F1F5',
        },
        flEmerald: {
          50: '#ECFDF5',
          500: '#10B981',
          600: '#059669',
          700: '#047857',
        },
      },
      fontFamily: {
        serif: ['var(--font-playfair)', 'Playfair Display', 'Georgia', 'serif'],
        sans: ['var(--font-jakarta)', 'Plus Jakarta Sans', 'Inter', 'sans-serif'],
      },
      boxShadow: {
        'artisan': '0 24px 48px -12px rgba(122, 20, 34, 0.08), 0 4px 16px -2px rgba(0, 0, 0, 0.04)',
        'artisan-lg': '0 32px 64px -16px rgba(122, 20, 34, 0.12), 0 8px 24px -4px rgba(0, 0, 0, 0.06)',
        'tactile': '0 2px 0 0 #540D17',
      },
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        'pulse-subtle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.85' },
        },
        'spin-slow': {
          '0%': { transform: 'rotate(0deg)' },
          '100%': { transform: 'rotate(360deg)' },
        },
      },
      animation: {
        'fade-in': 'fade-in 0.35s cubic-bezier(0.16, 1, 0.3, 1) forwards',
        'pulse-subtle': 'pulse-subtle 2s ease-in-out infinite',
        'spin-slow': 'spin-slow 1.6s linear infinite',
      },
    },
  },
  plugins: [],
};
export default config;
