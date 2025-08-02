/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#22370D',
          light: '#3A5417',
          dark: '#1A2608',
        },
        secondary: {
          DEFAULT: '#606758',
          light: '#7A8273',
          dark: '#464D41',
        },
        accent: {
          DEFAULT: '#C3FF00',
          light: '#D7FF4D',
          dark: '#9FC700',
        },
        overlay: {
          dark: 'rgba(34, 55, 13, 0.8)',
          light: 'rgba(34, 55, 13, 0.2)',
        }
      },
      keyframes:{
        scroll:{
          '0%':{transform:'translateY(0)'},
          '100%':{transform:'translateY(-100%)'},
        },
      },
      animation:{
        scroll:'scroll 30s linear infinite',
      },
    },
  },
  plugins: [],
}
