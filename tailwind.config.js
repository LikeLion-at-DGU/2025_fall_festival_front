/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", 
  ],
  theme: {
    extend: {
      fontFamily: {
      sans: ['SUIT Variable', 'sans-serif'], // Tailwind 기본 sans 폰트 덮어쓰기
      },
      colors:{
        orange:'#e65b4d',
        gray:'#F4F4F5',
        black:'#2A2A2E',
        white: '#FFFFFF',
        lightgray: '#E4E4E7',

      },
   
    },
  },
  plugins: [],
}

