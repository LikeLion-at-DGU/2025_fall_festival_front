/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["SUITE", "sans-serif"], // Tailwind 기본 sans 폰트 덮어쓰기
      },
      colors: {
        orange: "#e65b4d",
        gray: "#F4F4F5",
        black: "#2A2A2E",
        white: "#FFFFFF",
        lightgray: "#E4E4E7",
        primary: {
          50: "#fef2f1",
          100: "#fee4e2",
          200: "#fecdd3",
          300: "#fda4af",
          400: "#EF7063", // Primary-400
          500: "#e65b4d", // Primary-500
          600: "#dc2626",
          700: "#b91c1c",
          800: "#991b1b",
          900: "#7f1d1d",
        },
        neutral: {
          0: "#FFF",
          100: "#F4F4F5",
          200: "#E4E4E7",
          300: "#D4D4D8",
          400: "#A1A1AA",
          500: "#71717A",
          600: "#52525B",
          700: "#3F3F46",
          800: "#27272A",
          900: "#18181B",
        },
      },
      borderRadius: {
        l: "12px", // Radius-L
        m: "8px", // Radius-M
        s: "4px", // Radius-S
      },
      boxShadow: {
        tag: "0 1px 4px 0 rgba(0, 0, 0, 0.15)", // Shadow/Tag
      },
    },
  },
  plugins: [],
};
