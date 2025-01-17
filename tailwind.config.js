/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dark: {
          DEFAULT: "#121212",
          100: "#1E1E1E",
          200: "#2C2C2C",
          300: "#3D3D3D",
        },
        menu: {
          DEFAULT: "#616e70",
        },
      },
      screens: {
        phone: "480px",
        tablet: "1024px",
      },
      maxWidth: {
        phone: "480px",
        tablet: "1024px",
      },
      animation: {
        slide: "slideIn 0.3s ease-out",
        "blur-out": "blurOut 0.3s ease-out",
        zoom: "zoom 0.3s ease-out",
        fade: "fadeIn 0.3s ease-out",
      },
      keyframes: {
        slideIn: {
          "0%": { transform: "translateX(-100%)" },
          "100%": { transform: "translateX(0)" },
        },
        blurOut: {
          "0%": { filter: "blur(8px)" },
          "100%": { filter: "blur(0)" },
        },
        zoom: {
          "0%": { transform: "scale(0.95)" },
          "100%": { transform: "scale(1)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
      },
    },
  },
  plugins: [],
};
