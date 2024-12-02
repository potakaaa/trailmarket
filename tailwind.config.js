/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {

      }, fontFamily: {
        Inter: ["Inter"]
      }
    },
  container: {
    center: true,
  }
  },
  plugins: [],
}

