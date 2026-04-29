/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        bg: '#0B0E14',
        panel: '#121826',
        border: '#27314a',
        neon: '#7c3aed',
        cyan: '#38bdf8'
      }
    },
  },
  plugins: [],
}
