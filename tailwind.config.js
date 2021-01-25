module.exports = {
  purge: ['./src/**/*.{html,ts}'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        dark: '#005e5e',
        light: '#ffe159',
        medium: '#339999'
      },
      fontFamily: {
        title: ['Kanit']
      },
      fontSize: {
        '10xl': ['9rem', '1'],
      }
    },
  },
  variants: {
    extend: {},
  },
  plugins: [require('@tailwindcss/aspect-ratio')
,require('@tailwindcss/forms')
,require('@tailwindcss/line-clamp')
,require('@tailwindcss/typography')
],
};
