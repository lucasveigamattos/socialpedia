import plugin from 'tailwindcss/plugin'

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.tsx"],
  theme: {
    fontFamily: {
      sans: ["Rubik", "sans-serif"]
    },
    extend: {},
  },
  plugins: [
    plugin(function({addBase}) {
      addBase({
        html: {fontSize: "62.5%"},
        body: {fontSize: "1.2rem"}
      })
    })
  ],
}

