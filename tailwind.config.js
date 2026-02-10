/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        blue: {
          hyperperfect: "#1a7bff",
        },
        guide: {
          dark: '#0F0F14',
          card: '#1A1A24',
          code: '#12121A',
          orange: '#D47B2A',
          green: '#4EC98B',
          blue: '#5B8DEF',
          purple: '#9B6EE7',
          pink: '#E05E7E',
        },
      },
      borderRadius: {
        full: "9999px",
      },
    },
  },
  plugins: [],
} 