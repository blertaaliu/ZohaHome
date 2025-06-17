/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'soft-beige': '#f9f5f1',
        'pastel-pink': '#ffd1dc',
        'olive-green': '#808000',
        'light-brown': '#d2b48c',
      },
      fontFamily: {
        'playfair': ['"Playfair Display"', 'serif'],
        'cormorant': ['"Cormorant Garamond"', 'serif'],
        'inter': ['Inter', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
        'nunito': ['Nunito Sans', 'sans-serif'],
      },
    },
  },
  plugins: [],
} 