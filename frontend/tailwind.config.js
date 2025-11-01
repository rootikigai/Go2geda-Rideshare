/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        go2geda: {
          light: "#9BE7A5",   
          DEFAULT: "#05B116", 
          dark: "#024D13",    
        },
        accent: {
          yellow: "#FFD166",  
          blue: "#118AB2",    
        },
        neutral: {
          light: "#F9FAFB",   
          DEFAULT: "#E5E7EB", 
          dark: "#1F2937",    
        },
        danger: "#E63946",    
        success: "#06D6A0",   
        info: "#4ECDC4",      
      },
    },
  },
  plugins: [],
};
