const colors = require("tailwindcss/colors");

module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  important: true,
  theme: {
    extend: {
      colors: {
        amber: colors.amber,
        emerald: colors.emerald,
        primary: "rgb(17, 24, 39)",
        secondary: "rgb(80, 72, 229)",
        tertiary: "rgb(16, 185, 129)",
        white: "#fff",
        black: "#000",
      },
    },
  },
  plugins: [],
};
