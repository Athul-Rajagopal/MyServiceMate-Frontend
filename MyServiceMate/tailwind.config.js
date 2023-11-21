import animated from 'tailwindcss-animate';
/** @type {import('tailwindcss').Config} */

export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}","./index.html",],
  theme: {
    extend: {},
  },
  plugins: [
    animated,
  ],
}

