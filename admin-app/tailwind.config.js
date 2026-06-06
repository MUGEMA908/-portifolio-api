export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['Cormorant Garamond', 'Georgia', 'serif'],
      },
      colors: {
        green: { DEFAULT: '#00e5a0', dim: 'rgba(0,229,160,0.10)', glow: 'rgba(0,229,160,0.22)', border: 'rgba(0,229,160,0.28)' },
        dark: { bg: '#080c0a', surface: '#0e1410', surface2: '#131a15', border: 'rgba(0,229,160,0.13)', text: '#ddeae3', muted: '#5d7a6e' },
      },
    },
  },
  plugins: [],
}
