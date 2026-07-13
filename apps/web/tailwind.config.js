import brandPreset from '../../packages/config/tailwind.preset.js'

/**
 * The full brand design system now lives in the shared preset
 * (packages/config/tailwind.preset.js) so the site and the admin
 * dashboard stay perfectly in sync. This file only declares the
 * files Tailwind should scan for class names.
 */
/** @type {import('tailwindcss').Config} */
export default {
  presets: [brandPreset],
  content: ['./index.html', './src/**/*.{js,jsx}'],
}
