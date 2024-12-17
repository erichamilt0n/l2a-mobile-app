/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: '#121212',
          100: '#1E1E1E',
          200: '#2C2C2C',
          300: '#3D3D3D',
        },
        menu: {
          DEFAULT: '#616e70',
        }
      },
      screens: {
        'tablet': '1024px',
      },
      maxWidth: {
        'tablet': '1024px',
      },
    },
  },
  plugins: [],
}
