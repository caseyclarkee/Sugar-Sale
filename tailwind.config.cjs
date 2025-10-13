/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      /* Brand fonts (served by your Adobe link in index.html) */
      fontFamily: {
        futura: ['"futura-pt"', 'Futura', '"Avenir Next"', 'Avenir', 'sans-serif'],
        futuraCondensed: [
          '"futura-pt-condensed"',
          '"Futura PT Condensed"',
          '"futura-pt"',
          'Futura',
          'sans-serif',
        ],
      },

      /* Optional semantic weights */
      fontWeight: {
        book: 400,
        heavy: 900,
      },

      /* Your custom colours (simple names) */
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
