/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{html,js}",
    "./src/views/**/*.html",
    "./src/assets/styles/**/*.scss"
  ],
  theme: {
    extend: {
      colors: {
        'primary': '#000078',
        'secondary': '#73edff',
        'background': '#e2faff',
      },
      fontFamily: {
        'sans': ['-apple-system', 'BlinkMacSystemFont', '"Segoe UI"', 'Roboto', '"Helvetica Neue"', 'Arial', 'sans-serif'],
        'serif': ['Georgia', '"Times New Roman"', 'serif'],
      },
    },
  },
  safelist: [
    "bg-blue-900",
    "text-white",
    "hover:bg-blue-800",
    "hover:bg-green-800",
    "transition",
    "text-3xl",
    "font-bold",
    "mb-4"
  ],
  plugins: [],
};
