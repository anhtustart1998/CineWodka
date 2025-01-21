import flowbite from "flowbite-react/tailwind";
/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}", flowbite.content()],
  theme: {
    extend: {
      fontFamily: {
        // iceland: ["Iceland", "sans-serif"],
        sans: ["Tomorrow", "sans-serif"],
        inter: ["Inter", "sans-serif"],
      },
      colors: {
        "orange-350": "#bb5f2c",
      },
      container: {
        center: true,
      },
    },
  },
  plugins: [flowbite.plugin()],
};
