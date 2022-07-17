module.exports = {
  mode: 'jit',
  purge: [
    './app/index.html',
    './app/**/*.html',
    './app/**/*.{js,jsx}',
    './app/components/**/*.{js,jsx}',
    './app/containers/**/*.{js,jsx}',
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: 'var(--primary)',
          light: 'var(--primary-light)',
          dark: 'var(--primary-dark)',
        },
        secondary: {
          DEFAULT: 'var(--secondary)',
          light: 'var(--secondary-light)',
        },
      },
      borderWidth: {},
    },
  },
  variants: {
    extend: {},
  },
  plugins: [],
};
