/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // We will set up our Neumorphic color palette here later
      colors: {
        neuBase: '#e0e5ec',
        neuLight: '#ffffff',
        neuDark: '#a3b1c6',
      }
    },
  },
  plugins: [],
}