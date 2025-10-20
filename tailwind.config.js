/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        main: "#c4b9a5",      // soft beige text
        highlight: "#2e54d1", // blue for accents
        bgdark: "#000000",    // pure black background
      },

      // ✅ all keyframes and animations in one clean place
      keyframes: {
        fadeIn: {
          "0%": { opacity: 0, transform: "translateX(-20px)" },
          "100%": { opacity: 1, transform: "translateX(0)" },
        },
        fadeUp: {
          "0%": { opacity: 0, transform: "translateY(30px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        fadeDown: {
          "0%": { opacity: 0, transform: "translateY(-10px)" },
          "100%": { opacity: 1, transform: "translateY(0)" },
        },
        scrollLine: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '50%': { transform: 'translateY(0)', opacity: '1' },
          '100%': { transform: 'translateY(100%)', opacity: '0' },
        },
      },

      animation: {
        'spin-slow': 'spin 8s linear infinite',
        fadeIn: "fadeIn 1s ease-in-out forwards",
        fadeUp: "fadeUp 1s ease-out forwards",
        fadeDown: "fadeDown 0.3s ease-out forwards",
        scrollLine: "scrollLine 1.6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};
