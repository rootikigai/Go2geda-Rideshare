/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        go2geda: {
          light: "#c7f9cc", // light pastel green
          DEFAULT: "#80ed99", // main green
          dark: "#38a169", // darker shade for text or accents
        },
        danger: "#e63946", // red for logout or warnings
      },
    },
  },
  plugins: [],
};
