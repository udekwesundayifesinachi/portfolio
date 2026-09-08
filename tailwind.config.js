/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#0B0F17', // Deep charcoal / near black
        surface: '#111827',    // Card background
        border: '#1F2937',     // Dark gray borders
        primary: {
          DEFAULT: '#1E40AF', // Security blue
          hover: '#1D4ED8',
          light: '#3B82F6',
        },
        cyanAccent: '#06B6D4', // Subtle cyan highlight
      },
      fontFamily: {
        mono: ['JetBrains Mono', 'monospace'],
        sans: ['Inter', 'sans-serif'],
      },
    },
  },
  plugins: [],
};