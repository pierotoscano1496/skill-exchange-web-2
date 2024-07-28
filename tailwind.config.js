/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "fondo-principal": "#F5F7FA",

        primary: {
          light: "#00ff00",
          DEFAULT: "#00ff00",
          dark: "#00ff00",
        },
        secondary: {
          light: "#FFC9C9",
          DEFAULT: "#FF6B6B",
          dark: "#D6336C",
        },
        accent: {
          light: "#D0BFFF",
          DEFAULT: "#845EF7",
          dark: "#5F3DC4",
        },
        neutral: {
          light: "#F8F9FA",
          DEFAULT: "#CED4DA",
          dark: "#495057",
        },
        success: {
          light: "#B2F2BB",
          DEFAULT: "#51CF66",
          dark: "#2B8A3E",
        },
        warning: {
          light: "#FFE066",
          DEFAULT: "#FFC107",
          dark: "#F59F00",
        },
        danger: {
          light: "#FF8787",
          DEFAULT: "#FA5252",
          dark: "#C92A2A",
        },
        info: {
          light: "#74C0FC",
          DEFAULT: "#339AF0",
          dark: "#1C7ED6",
        },

        "accent-primary": "#cc0099",
        "accent-secondary": "#E74C3C",
        "fondo-tarjetas": "#FFFFFF",
        bordes: "#E0E0E0",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
    },
    fontSize: {
      sm: "0.8rem",
      base: "1rem",
      xl: "1.25rem",
      "2xl": "1.563rem",
      "3xl": "1.953rem",
      "4xl": "2.441rem",
      "5xl": "3.052rem",
    },
  },
  plugins: [],
};
