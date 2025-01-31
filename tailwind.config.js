/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}", "./public/**/*.{html,js}"],
  theme: {
    extend: {
      colors: {
        'customRed': 'hsl(14, 86%, 42%)',
        'customBrown': 'hsl(14, 65%, 9%)'
      },

      fontFamily: {
        'redHat': ["Red Hat Text"]
      },
    },
  },
  plugins: [],
}