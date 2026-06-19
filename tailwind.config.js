/** @type {import('tailwindcss').Config} */
module.exports = {
  // Patricia / Grace tokens (pat-* colors, serif/dm fonts, radii, shadows) come from the
  // shared design system, the single source of truth also consumed by the ai-assistant app.
  presets: [require("./design-system/tailwind-preset.cjs")],
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
        // Patricia families (serif, dm) come from the preset; these are website-only extras.
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
      },
      colors: {
        // HyperPerfect-Excel product identity (separate brand from Patricia).
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
      // Radii and the shared greyscale shadows (card/card-hover/input/hero) now come from
      // the preset. Only the brand-blue glow is website-specific and stays here.
      boxShadow: {
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
