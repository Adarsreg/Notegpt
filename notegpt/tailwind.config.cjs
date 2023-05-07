module.exports = {

  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    backdropBrightness: {
      0: '0',
      25: '.25',
      50: '.50',
      75: '.75',
    },
    extend: {
      colors: {
        darkgreen: '#2d712a'
        // Add any other custom colors here
      },
      fonts: {
        'sans': ['Inter', 'sans-serif'],
      },
    },
  },
  variants: {
    backdropBrightness: ['hover', 'focus'],
  },

}