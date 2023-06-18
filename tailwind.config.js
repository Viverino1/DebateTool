/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    fontFamily: {
      'quicksand': ['Quicksand', 'sans-serif'],
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
      },
      animationDelay: {
        10000: "10000ms",
        20000: "20000ms",
        30000: "30000ms",
      },
      spacing: {
        '17' : '68px',
        '18' : '72px',
        '19' : '76px',
        '20' : '80px',
        '21' : '84px',
        '22' : '88px',
        '23' : '92px',
        '25' : '100px',
        '26' : '104px',
        '34' : '136px',
        '68' : '272px',
        '100' : '400px',
        '104' : '416px',
        '106' : '424px',
        '108' : '432px',
      },
    },
  },
  plugins: [
    require("tailwindcss-animation-delay"),
  ],
}

