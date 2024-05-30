/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      sm: '400px',
      md: '680px',
      lg: '960px',
      xl: '1100px',
    },
    extend: {},
  },
  plugins: [],
};
