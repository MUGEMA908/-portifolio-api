/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        green: {
          DEFAULT: '#00e5a0',
          dim: 'rgba(0,229,160,0.10)',
          glow: 'rgba(0,229,160,0.22)',
          border: 'rgba(0,229,160,0.28)',
        },
        dark: {
          bg:       '#080c0a',
          surface:  '#0e1410',
          surface2: '#131a15',
          border:   'rgba(0,229,160,0.13)',
          text:     '#ddeae3',
          muted:    '#5d7a6e',
        },
        light: {
          bg:       '#f4f9f6',
          surface:  '#ffffff',
          surface2: '#eaf3ee',
          border:   'rgba(0,150,90,0.18)',
          text:     '#0e1f18',
          muted:    '#4a7060',
        },
      },
      animation: {
        'pulse-dot': 'pulseDot 2.5s infinite',
        'spin-border': 'spinBorder 6s linear infinite',
        'breathe': 'breathe 4s ease-in-out infinite',
        'fade-up': 'fadeUp 0.7s ease both',
      },
      keyframes: {
        pulseDot: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%':       { opacity: '0.4', transform: 'scale(1.4)' },
        },
        spinBorder: {
          to: { transform: 'rotate(360deg)' },
        },
        breathe: {
          '0%, 100%': { opacity: '0.4', transform: 'scale(0.97)' },
          '50%':       { opacity: '1', transform: 'scale(1.03)' },
        },
        fadeUp: {
          from: { opacity: '0', transform: 'translateY(24px)' },
          to:   { opacity: '1', transform: 'translateY(0)' },
        },
      },
    },
  },
  plugins: [],
}
