// tailwind.config.js
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './index.html',
    './src/**/*.{js,jsx,ts,tsx}', // This ensures Tailwind looks through your source files for classes
  ],
  theme: {
    extend: {},
  },
  plugins: [],
};
