/** tailwind.config.js **/
module.exports = {
/** @type {import('tailwindcss').Config} */
  content: ["./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
  },
  plugins: [
    require('@tailwindcss/forms'),
  ],
}
