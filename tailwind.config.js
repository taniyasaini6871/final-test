/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ["./src/**/*.{html,js}"],
  theme: {
    extend: {
      animation:{
        "bottomslider": "bottomslider 5s linear forwards"
      },
      keyframes:{
        bottomslider:{
          "100%":{
            width:0
          }
        }
      }
    },
  },
  plugins: [],
}

