/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./.storybook/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
      },
      fontWeight: {
        regular: 400,
        medium: 500,
        semibold: 600,
        bold: 700,
      },
      colors: {
        grayBorder: "#959494",
        black: "#030303",
        white: "#ffffff",
        "alt-white": "#f5f8fa",
        "border-grey": "#959494",
        "alt-grey": "rgba(222,222,222,0.3)",
        "black-bg": "#1c1919",
        "text-on-black-bg": "#b1acac",
        "red-orange": "#ff3131",
        "orange-text-bubble": "rgba(255, 223, 223, 1)",
      },
    },
  },
  plugins: [],
};
