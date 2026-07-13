import brandPreset from '../../packages/config/tailwind.preset.js'

/**
 * Dashboard shares the exact brand design system used by the marketing
 * site via the shared preset, so colors, fonts, shadows and motion match.
 */
/** @type {import('tailwindcss').Config} */
export default {
  presets: [brandPreset],
  content: ['./index.html', './src/**/*.{js,jsx}'],
}
