/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        bg: {
          '0%, 100%': { transform: 'translate(0vh)' },
          '50%': { transform: 'translate(-50vh, 50vh)' },
        }
      },
      animation: {
        bg: 'pulse 30s ease-in-out infinite'
      }
    },
  },
  plugins: [],
}

