/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./Frontend/**/*.{html,js}"],
  theme: {
    extend: {
      scrollbar: {
        width: '8px',
        height: '8px',
        borderRadius: '10px',
      },
      fontFamily : {
        "poppins": ["Poppins","sans-serif"],
        "manrope": ["Manrope","sans-serif"]
      },
      keyframes: {
        moveRight: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(30px)' }
        },
        moveBox: {
          '0%': { transform: 'translateX(100%)'},
          '100%': {  transform: 'translateX(0)' },
        },
        borderChange: {
          '0%, 100%': { borderWidth: '2px', borderColor: 'red' },
          '50%': { borderWidth: '10px', borderColor: 'blue' },
        },
        borderMove: {
          '0%': { height : '180px' , width : '300px'},
          '50%': { height : '500px' , width : '300px'},
          '100%': {  height : '500px' , width : '790px'  },
        },
        borderMoveQuestions : {
          '0%': { borderColor: 'transparent transparent transparent #ffffff' },
          '10%': { borderColor: '#ffffff transparent transparent transparent' },
          '25%': { borderColor: 'transparent #ffffff transparent transparent' },
          '50%': { borderColor: 'transparent transparent #ffffff transparent' },
          '75%': { borderColor: 'transparent transparent transparent #ffffff' },
          '90%': { borderColor: '#ffffff transparent transparent transparent' },
          '100%': { borderColor: 'transparent transparent transparent #ffffff'},
        },
        rotate: {
          "0%": { transform: "rotate(0deg) scale(10)" },
          "100%": { transform: "rotate(-360deg) scale(10)" },
        },
      },
      animation: {
        'moveBox': 'moveBox 3s ease-in-out forwards', // Adjust duration as needed
        'borderChange': 'borderChange 3s infinite',
        'borderMove': 'borderMove 5s ease-in-out forwards',
        'rotate': "rotate 10s linear infinite",
        'move-infinite' : 'moveRight 2s ease-in-out infinite',
        'borderMoveQuestions': 'borderMoveQuestions 3s cubic-bezier(0.42, 0, 0.58, 1) infinite',
        'spin-slow':'spin 7s linear infinite',
      },
    },
  },
  plugins: [
    require('tailwind-scrollbar'),
  ],
}
