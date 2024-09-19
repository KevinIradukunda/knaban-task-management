/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: [
    "./src/**/*.{html,ts}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Jakarta Sans"', 'sans-serif'], 
      },
      colors: {
        MediumGray: '#828FA3', 
        MainPurple: '#635FC7',
        MainHover: '#A8A4FF',
        paleblue: '#F4F7FD'
      },
    },
  },
  plugins: [],
}

