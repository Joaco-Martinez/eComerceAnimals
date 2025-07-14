/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",     // si usás carpeta `app`
    "./pages/**/*.{js,ts,jsx,tsx}",   // si usás carpeta `pages`
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
  extend: {
    fontFamily: {
      chatime: ['Chatime', 'sans-serif'],     // si ya la tenés
      montserrat: ['Montserrat', 'sans-serif'],
    },
  },
},
  plugins: [],
}
