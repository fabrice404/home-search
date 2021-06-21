const plugin = require('tailwindcss/plugin');

module.exports = {
  purge: [
    './components/**/*.js',
    './lib/**/*.js',
    './pages/**/*.js',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    fontSize: {
      xs: '.5rem',
      sm: '.625rem',
      base: '.75rem',
      lg: '1rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.75rem',
      '4xl': '2rem',
      '5xl': '3rem',
      '6xl': '4rem',
      '7xl': '5rem',
    },
    zIndex: {
      1000: 1000,
    },
  },
  variants: {
    extend: {},
  },
  plugins: [
    plugin(({ addBase }) => {
      addBase({
        '.montserrat': {
          fontFamily: 'Montserrat',
        },
      });
    }),
  ],
};
