/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './data/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        serif: ['Playfair Display', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Background - Off-White / Pierre chaude
        stone: {
          warm: '#F2F0E9',
          light: '#FAFAF9',
          card: '#E6E8E6',
        },
        // Primary - Deep Pine Green
        pine: {
          50: '#E8F5F2',
          100: '#D1EBE5',
          200: '#A3D7CB',
          300: '#75C3B1',
          400: '#47AF97',
          500: '#2D8B75',
          600: '#1E6655',
          700: '#154A3D',
          800: '#0F2822',
          900: '#0A1A16',
          DEFAULT: '#0F2822',
        },
        // Accent - Orange brûlé / Ocre
        accent: {
          light: '#FBBF24',
          DEFAULT: '#D97706',
          dark: '#B45309',
        },
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
        '30': '7.5rem',
      },
      fontSize: {
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '0.95' }],
        '10xl': ['10rem', { lineHeight: '0.9' }],
      },
      borderRadius: {
        '4xl': '2rem',
      },
      boxShadow: {
        'subtle': '0 1px 2px rgba(15, 40, 34, 0.04)',
        'soft': '0 4px 12px rgba(15, 40, 34, 0.06)',
        'elevated': '0 12px 24px rgba(15, 40, 34, 0.08)',
      },
      animation: {
        'marquee': 'marquee 30s linear infinite',
        'marquee-reverse': 'marquee-reverse 30s linear infinite',
        'fade-up': 'fadeUp 0.8s ease-out forwards',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'marquee-reverse': {
          '0%': { transform: 'translateX(-50%)' },
          '100%': { transform: 'translateX(0%)' },
        },
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
