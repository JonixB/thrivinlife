/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      backgroundColor: {
        '3498db': '#3498db',
      },
      borderColor: {
        'f5f5f5': '#f5f5f5',
      },
      screens: {
        'mobile': '767px',
      },
      fontFamily: {
        'roboto': ['Roboto', 'sans-serif']
      },
      textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
    },
    variants: {
      extend: {
        backgroundColor: ['checked'],
        borderColor: ['checked'],
        textDecoration: ['responsive', 'hover', 'focus', 'active', 'group-hover'],
      },
    },
  },
  plugins: [],
}

