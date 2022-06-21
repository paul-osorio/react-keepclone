/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  darkMode: "class",
  theme: {
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
    },
    extend: {
      colors: {
        midnight: {
          500: "#525355",
          700: "#313235",
          900: "#202124",
        },
        rust: "#41331C",
      },
    },
  },
  plugins: [],
};
