/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: ["./app/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    fontFamily: {
      sairaRegular: 'Saira_Regular',
      sairaMedium: 'Saira_Medium',
      sairaBold: 'Saira_Bold',
    },
    extend: {
      colors: {
        light: '#f7f7fa',
        primary: '#0e516c',
        primaryLight: '#28759f',
        lighter: '#cef1ff'
      }
    },
  },
  plugins: [],
}