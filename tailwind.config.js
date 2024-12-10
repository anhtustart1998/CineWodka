const flowbite = require("flowbite-react/tailwind");
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        // iceland: ["Iceland", "sans-serif"],
        sans: ["Tomorrow", "sans-serif"],
      },
    },
  },
  plugins: [flowbite.plugin()],
};
