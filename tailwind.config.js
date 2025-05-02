/** @type {import('tailwindcss').Config} */

import { themes } from "./src/enums/Themes";

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
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
      },
      transitionProperty: {
        width: "width",
        spacing: "margin, padding",
      },
      borderRadius: {
        lg: "0.5rem",
        xl: "1rem",
      },
      colors: {
        "fondo-principal": "#FFFFFF", // Cambiado a blanco puro para mayor armonía

        primary: {
          DEFAULT: "#F97316", // Naranja principal del logo
          content: "#FFFFFF", // Texto blanco sobre fondo naranja
          hover: "#EA580C", // Naranja más oscuro para hover
        },
        secondary: {
          DEFAULT: "#FACC15", // Amarillo complementario
          content: "#78350F", // Texto marrón oscuro
          hover: "#EAB308", // Amarillo más oscuro para hover
        },
        accent: {
          DEFAULT: "#10B981", // Verde para acentos
          content: "#064E3B", // Texto verde oscuro
          hover: "#059669", // Verde más oscuro para hover
        },
        neutral: {
          DEFAULT: "#9CA3AF", // Gris neutro
          content: "#374151", // Texto gris oscuro
          hover: "#6B7280", // Gris más oscuro para hover
        },
        error: {
          DEFAULT: "#EF4444", // Rojo para errores
          content: "#FFFFFF", // Texto blanco sobre fondo rojo
          hover: "#DC2626", // Rojo más oscuro para hover
        },
        "fondo-tarjetas": "#FFFFFF", // Fondo blanco para tarjetas
        bordes: "#E0E0E0", // Gris claro para bordes
        "yape-purple": "#720E9E",
      },
      fontFamily: {
        display: ["Poppins", "sans-serif"],
        body: ["Open Sans", "sans-serif"],
      },
      fontSize: {
        sm: "0.875rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem",
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3.5rem",
        "6xl": "4rem",
      },
      // Agregado para sombras más sofisticadas
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
        soft: "0 4px 6px rgba(0, 0, 0, 0.1)",
        deep: "0 10px 15px rgba(0, 0, 0, 0.2)",
        input: "inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08)",
      },
      // Agregado para manejar espaciado extra
      spacing: {
        128: "32rem",
        144: "36rem",
      },
    },
  },
  plugins: [],
};
