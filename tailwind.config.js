/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        jakarta: ['"Jakarta Sans"', "sans-serif"],
      },
      colors: {
        MediumGray: "#828FA3",
        MainPurple: "#635FC7",
        MainHover: "#A8A4FF",
        paleblue: "#F4F7FD",
        bluesky: "#49C4E5",
        skyred: "#EFEFF9",
        bordercolors: "F3F3F3",
        lightgrey: "F4F7FD",
      },
    },
  },
  plugins: [],
};
