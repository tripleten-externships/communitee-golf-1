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
        grayBorder: "#959494",
        "border-grey": "rgba(149,148,148,1)",
        "alt-grey": "rgba(222,222,222,0.3)",
        "red-orange": "#ff3131",
      },
    },
  },
  plugins: [],
};
