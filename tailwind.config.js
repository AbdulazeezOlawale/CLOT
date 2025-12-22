/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,jsx,ts,tsx}", "./components/**/*.{js,jsx,ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        primary: '#8E6CEF',
        background: '#FFFFFF',
        secondary: "#F4F4F4"
      }
    },
  },
  plugins: [
    function ({ addUtilities }) {
      addUtilities({
        '.flex-gap-3': {
          display: 'flex',
          gap: 12,
        },
      });
    },
  ],
}