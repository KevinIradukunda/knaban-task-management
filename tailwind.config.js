/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./src/**/*.{html,ts}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', "sans-serif"],
      },
      colors: {
        dark: {
          primary: "#635FC7",
          secondary: "#2B2C37",
          tertiary: "#3E3F4E",
          background: "#000112",
          text: "#828FA3",
        },
        light: {
          primary: "#635FC7",
          background: "#F4F7FD",
          text: "#E4EBFA",
          white: "#FFFFFF",
        },
        accent: {
          danger: "#EA5555",
          warning: "#FF9898",
        },
      },
    },
  },

  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        ".no-scrollbar": {
          overflow: "auto",
          "&::-webkit-scrollbar": { display: "none" },
        },
      });
    },
  ],
};
