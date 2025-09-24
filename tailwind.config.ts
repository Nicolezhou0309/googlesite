import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f0fdf4',
          100: '#dcfce7',
          200: '#bbf7d0',
          300: '#86efac',
          400: '#4ade80',
          500: '#22c55e',
          600: '#16a34a',
          700: '#15803d',
          800: '#166534',
          900: '#14532d',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        accent: {
          50: '#fefce8',
          100: '#fef9c3',
          200: '#fef08a',
          300: '#fde047',
          400: '#facc15',
          500: '#eab308',
          600: '#ca8a04',
          700: '#a16207',
          800: '#854d0e',
          900: '#713f12',
        }
      },
      fontFamily: {
        sans: ['HarmonyOS_Sans_SC', 'Inter', 'Helvetica', 'sans-serif'],
        'harmony': ['HarmonyOS_Sans_SC', 'Helvetica', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fade-in 1s ease forwards',
        'fade-up': 'fade-up 1s ease forwards',
        'marquee': 'marquee var(--duration) infinite linear',
        'marquee-vertical': 'marquee-vertical var(--duration) linear infinite',
        'shimmer': 'shimmer 8s infinite',
        'image-glow': 'image-glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        'fade-in': {
          '0%': {
            opacity: '0',
            transform: 'translateY(-10px)',
          },
          'to': {
            opacity: '1',
            transform: 'none',
          },
        },
        'fade-up': {
          '0%': {
            opacity: '0',
            transform: 'translateY(20px)',
          },
          'to': {
            opacity: '1',
            transform: 'none',
          },
        },
        'marquee': {
          '0%': {
            transform: 'translate(0)',
          },
          'to': {
            transform: 'translateX(calc(-100% - var(--gap)))',
          },
        },
        'marquee-vertical': {
          '0%': {
            transform: 'translateY(0)',
          },
          'to': {
            transform: 'translateY(calc(-100% - var(--gap)))',
          },
        },
        'shimmer': {
          '0%, 90%, to': {
            backgroundPosition: 'calc(-100% - var(--shimmer-width)) 0',
          },
          '30%, 60%': {
            backgroundPosition: 'calc(100% + var(--shimmer-width)) 0',
          },
        },
        'image-glow': {
          '0%': {
            opacity: '0',
            animationTimingFunction: 'cubic-bezier(0.74, 0.25, 0.76, 1)',
          },
          '10%': {
            opacity: '0.7',
            animationTimingFunction: 'cubic-bezier(0.12, 0.01, 0.08, 0.99)',
          },
          'to': {
            opacity: '0.4',
          },
        },
      },
    },
  },
  plugins: [],
}
export default config
