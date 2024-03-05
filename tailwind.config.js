/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      backgroundImage: {
        'logo-blue': "url('/src/assets/logo-blue.png')",
        'logo-white': "url('/src/assets/logo-white.png')",
      },
      colors: {
        'main-purple': '#733aa5',
        'main-blue': '#79a9d1'
      }
    },
  },
  plugins: [],
}

