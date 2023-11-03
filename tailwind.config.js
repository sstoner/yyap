const { theme } = require('@sanity/demo/tailwind');
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './intro-template/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    ...theme,
    // Overriding fontFamily to use @next/font loaded families
    fontFamily: {
      mono: 'var(--font-mono)',
      sans: 'var(--font-sans)',
      serif: 'var(--font-serif)',
    },
    extend: {
      heroPatterns: {
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('tailwindcss-hero-patterns'),
    require('tailwindcss-elevation')(
      {
        color: '240,248,255', // This is the RGB value for a light shade of blue.
        opacityBoost: '0.23'
      }
    ),
  ],
}
