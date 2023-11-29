/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{html,css,js}"],
  theme: {
    fontFamily: {
      sans: ["Source Sans", "sans-serif"],
      serif: ["Bree Serif", "serif"],
    },
    extend: {},
  },
  plugins: [require("tailwindcss-animate")],
};
