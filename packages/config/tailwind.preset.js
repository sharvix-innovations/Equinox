/**
 * ============================================================
 * Equinox shared Tailwind preset  the single source of truth
 * for the brand design system (colors, fonts, shadows, motion).
 *
 * Consumed by every app so the marketing site and the admin
 * dashboard stay visually identical. Each app supplies its own
 * `content` globs and may extend further on top of this.
 * ============================================================
 */

/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // GREEN sustainability theme. Token names kept stable so shared
        // components inherit the palette without per-file edits.
        brand: {
          blue: '#3DA94E', // Primary Green
          sky: '#6FCF79', // Light/Secondary Green
          navy: '#0F3320', // Deep Forest (dark surfaces / footer)
          green: '#2E9E43', // Accent Green
          gray: '#F2F7F2', // Mint Light Gray
        },
        // Semantic tokens driven by CSS variables (see each app's index.css).
        surface: 'rgb(var(--surface) / <alpha-value>)',
        'surface-2': 'rgb(var(--surface-2) / <alpha-value>)',
        ink: 'rgb(var(--ink) / <alpha-value>)',
        'ink-soft': 'rgb(var(--ink-soft) / <alpha-value>)',
        line: 'rgb(var(--line) / <alpha-value>)',
        // Status tokens used by dashboard badges / charts.
        success: '#2E9E43',
        warning: '#E0A020',
        danger: '#E0574E',
        info: '#3B82C4',
      },
      fontFamily: {
        display: ['Poppins', 'system-ui', 'sans-serif'],
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        '4xl': '2rem',
        '5xl': '2.5rem',
      },
      boxShadow: {
        glow: '0 0 40px -8px rgba(61, 169, 78, 0.4)',
        'glow-green': '0 0 40px -8px rgba(46, 158, 67, 0.45)',
        soft: '0 14px 40px -16px rgba(16, 51, 30, 0.22)',
        card: '0 18px 50px -24px rgba(16, 51, 30, 0.28)',
        neo: '8px 8px 24px rgba(16,51,30,0.07), -8px -8px 24px rgba(255,255,255,0.8)',
        'neo-dark': '8px 8px 24px rgba(0,0,0,0.5), -6px -6px 20px rgba(255,255,255,0.03)',
      },
      backgroundImage: {
        'grid-fade':
          'radial-gradient(circle at center, rgba(61,169,78,0.08) 0%, transparent 70%)',
        'brand-gradient': 'linear-gradient(135deg, #3DA94E 0%, #6FCF79 100%)',
        'brand-gradient-soft':
          'linear-gradient(135deg, rgba(61,169,78,0.14) 0%, rgba(111,207,121,0.14) 100%)',
        'navy-radial':
          'radial-gradient(ellipse at top, #1a4a2c 0%, #0F3320 55%, #082014 100%)',
        'page-bg': 'linear-gradient(165deg, #dcefe0 0%, #c2e6cb 45%, #a9d8b4 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(24px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        float: {
          '0%,100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-14px)' },
        },
        'float-slow': {
          '0%,100%': { transform: 'translateY(0) rotate(0deg)' },
          '50%': { transform: 'translateY(-22px) rotate(6deg)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '-200% 0' },
          '100%': { backgroundPosition: '200% 0' },
        },
        'spin-slow': { to: { transform: 'rotate(360deg)' } },
        ripple: {
          '0%': { transform: 'scale(0.8)', opacity: '0.6' },
          '100%': { transform: 'scale(2.4)', opacity: '0' },
        },
        marquee: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        'pulse-ring': {
          '0%': { boxShadow: '0 0 0 0 rgba(0,196,140,0.5)' },
          '70%': { boxShadow: '0 0 0 16px rgba(0,196,140,0)' },
          '100%': { boxShadow: '0 0 0 0 rgba(0,196,140,0)' },
        },
        'gradient-x': {
          '0%,100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.7s ease forwards',
        float: 'float 6s ease-in-out infinite',
        'float-slow': 'float-slow 9s ease-in-out infinite',
        shimmer: 'shimmer 2.5s linear infinite',
        'spin-slow': 'spin-slow 26s linear infinite',
        ripple: 'ripple 3s ease-out infinite',
        marquee: 'marquee 32s linear infinite',
        'pulse-ring': 'pulse-ring 2.2s ease-out infinite',
        'gradient-x': 'gradient-x 6s ease infinite',
      },
    },
  },
  plugins: [],
}
