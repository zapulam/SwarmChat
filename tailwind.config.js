// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // Ensures Tailwind scans your source files
  ],
  darkMode: "class", // Enables class-based dark mode
  theme: {
    extend: {
      fontSize: {
        base: "1rem",
        lg: "1.125rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "1.875rem",
        "4xl": "2.25rem",
        "5xl": "3rem",
        "6xl": "4rem",
      },
      screens: {
        xs: "480px", // Adds a custom screen size for better mobile scaling
      },
      colors: {
        dark: {
          900: "#121212",
          800: "#1a1a1a",
          700: "#222222",
          600: "#2a2a2a",
          500: "#333333",
          400: "#3d3d3d",
          300: "#525252",
          200: "#a1a1a1",
          100: "#cfcfcf",
        },
      },
    },
  },
  plugins: [
    require('@tailwindcss/typography'), // Adds the typography plugin for better text handling
    require('tailwind-scrollbar')
  ],
};
