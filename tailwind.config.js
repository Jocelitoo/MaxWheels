/* eslint-disable no-undef */
/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      padding: {
        interface: '0 8vw 0 8vw',
      },
      backgroundColor: {
        mainColor: '#facc15',
        light: '#F2F2F2',
        'light-10%': '#D9D9D9',
      },
      textColor: {
        mainColor: '#facc15',
      },
      ringColor: {
        mainColor: '#facc15',
      },
      borderColor: {
        mainColor: '#facc15',
      },
    },
  },
  plugins: [require('@tailwindcss/forms')],
};
