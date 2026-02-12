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
      fontFamily: {
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        brand: {
          DEFAULT: '#1a7bff',
          hover: '#1565d8',
        },
        surface: {
          primary: '#ffffff',
          secondary: '#f8f9fa',
          tertiary: '#f1f3f5',
          elevated: '#eceef2',
        },
        'hp-text': {
          primary: '#374151',
          secondary: '#6b7280',
          tertiary: '#9ca3af',
        },
        'hp-border': {
          DEFAULT: '#e2e5eb',
          subtle: '#eceef2',
        },
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
        sm: '6px',
        DEFAULT: '8px',
        md: '8px',
        lg: '12px',
        full: '9999px',
      },
      boxShadow: {
        card: '0 1px 3px rgba(0, 0, 0, 0.08)',
        'card-hover': '0 4px 12px rgba(0, 0, 0, 0.1)',
        input: '0 2px 8px rgba(0, 0, 0, 0.06)',
        hero: '0 25px 60px -12px rgba(0, 0, 0, 0.25)',
        'button-glow': '0 0 20px rgba(26, 123, 255, 0.3)',
      },
      keyframes: {
        messageIn: {
          '0%': { opacity: '0', transform: 'translateY(6px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'message-in': 'messageIn 0.25s ease-out',
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
}
