import type { Config } from 'tailwindcss'

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'cosmic-dark': '#0a0e27',
        'cosmic-purple': '#7c3aed',
        'cosmic-violet': '#a855f7',
      },
    },
  },
  plugins: [],
} satisfies Config
