import Colors from './src/styles/colors'
import FontFamily from './src/styles/fontFamily'


/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: Colors,
      fontFamily: FontFamily,
    },
  },
  plugins: [],
} 