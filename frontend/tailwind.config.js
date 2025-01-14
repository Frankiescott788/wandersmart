// tailwind.config.js
const { nextui } = require("@nextui-org/react");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    // make sure it's pointing to the ROOT node_module
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        customBlue: '#19AFFF',
      },
      boxShadow: {
        custom: '0px 16px 37px -18px #19afff',
      },
    },
  },
  daisyui: {
    themes: [],
  },
  darkMode: "class",
  plugins: [nextui(), require('daisyui')],
};
