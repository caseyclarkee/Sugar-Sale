/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        purple: '#BB29BB',
        yellow: '#FFDD00',
        pink: '#f9a8d4',
        grey: '#333333',
        black: '#000000',
      },
    },
  },
  plugins: [],
};
