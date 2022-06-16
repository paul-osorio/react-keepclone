/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    screens: {
      mobile: "320px",
      tablet: "768px",
      laptop: "1024px",
    },
    extend: {},
  },
  plugins: [],
};
