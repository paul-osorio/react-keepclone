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
          600: "#313235",
          700: "#313235",
          900: "#202124",
        },
        rust: "#41331C",
      },
      boxShadow: {
        darkCard:
          "0 1px 2px 0 rgb(0 0 0 / 60%), 0 2px 6px 2px rgb(0 0 0 / 30%)",
        card: "0 1px 2px 0 rgb(60 64 67 / 30%), 0 2px 6px 2px rgb(60 64 67 / 15%)",
      },
    },
  },
  plugins: [
    require("@tailwindcss/forms")({
      strategy: "class",
    }),
  ],
};
