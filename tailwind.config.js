/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    animationDelay: {
        10000: "10000ms",
        20000: "20000ms",
        30000: "30000ms",
    },
    extend: {
      keyframes: {
        bg: {
          '0%, 100%': { transform: 'translate(0vh)',},
          '50%': { transform: 'translate(-50vh, 50vh)' },
        }
      },
      animation: {
        bg: 'pulse 30s ease-in-out infinite'
      }
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}

