// tailwind.config.js (CREATE THIS FILE IF IT DOESN'T EXIST)
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}"
  ],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/typography'), // <-- ADD THIS LINE
  ],
}
