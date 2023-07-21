/** @type {import('tailwindcss').Config} */
/*
    Tailwind CSS works by scanning all of your HTML files, JavaScript components, and any other templates for class names, generating the corresponding styles and then writing them to a static CSS file.

    It's fast, flexible, and reliable — with zero-runtime.
*/
module.exports = {
  content: [
      "./index.html",
      "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
      extend: {},
  },
  darkMode: "class",
  plugins: []
  }