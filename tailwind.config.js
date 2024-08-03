/** @type {import('tailwindcss').Config} */

import { themes } from "./src/enums/Themes";

const safeThemes = themes.flatMap((theme) => [
  `bg-${theme}-100`,
  `bg-${theme}-200`,
  `focus:border-${theme}`,
  `bg-${theme}-dark`,
  `bg-${theme}`,
]);

module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",

    // Or if using `src` directory:
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: [...safeThemes],
  theme: {
    extend: {
      colors: {
        "fondo-principal": "#F5F7FA",

        primary: {
          50: "#EBF2FA", // Azul muy claro
          100: "#D7E6F4", // Azul más claro
          200: "#AFCDE9", // Azul claro
          300: "#87B4DF", // Azul intermedio
          400: "#5F9CD3", // Azul medio
          500: "#3776C8", // Azul
          600: "#2B5F9F", // Azul oscuro
          700: "#204877", // Azul más oscuro
          800: "#14304F", // Azul profundo
          900: "#0A1827", // Azul muy profundo
          light: "#4B9CD3", // Azul claro
          DEFAULT: "#1E3A8A", // Azul oscuro
          dark: "#162C55", // Azul más oscuro
        },
        secondary: {
          50: "#FFFBEA", // Amarillo muy claro
          100: "#FFF3C4", // Amarillo más claro
          200: "#FCE588", // Amarillo claro
          300: "#FADB5F", // Amarillo intermedio
          400: "#F7C948", // Amarillo medio
          500: "#F0B429", // Amarillo
          600: "#DE911D", // Amarillo oscuro
          700: "#CB6E17", // Amarillo más oscuro
          800: "#B44D12", // Amarillo profundo
          900: "#8D2B0B", // Amarillo muy profundo
          light: "#FCD34D", // Amarillo claro
          DEFAULT: "#F59E0B", // Amarillo vibrante
          dark: "#B45309", // Amarillo oscuro
        },
        neutral: {
          50: "#F9FAFB", // Gris muy claro
          100: "#F3F4F6", // Gris más claro
          200: "#E5E7EB", // Gris claro
          300: "#D1D5DB", // Gris intermedio
          400: "#9CA3AF", // Gris medio
          500: "#6B7280", // Gris
          600: "#4B5563", // Gris oscuro
          700: "#374151", // Gris más oscuro
          800: "#1F2937", // Gris profundo
          900: "#111827", // Gris muy profundo
          light: "#F3F4F6", // Gris claro
          DEFAULT: "#9CA3AF", // Gris intermedio
          dark: "#4B5563", // Gris oscuro
        },
        accent: {
          50: "#ECFDF5", // Verde muy claro
          100: "#D1FAE5", // Verde más claro
          200: "#A7F3D0", // Verde claro
          300: "#6EE7B7", // Verde intermedio
          400: "#34D399", // Verde medio
          500: "#10B981", // Verde
          600: "#059669", // Verde oscuro
          700: "#047857", // Verde más oscuro
          800: "#065F46", // Verde profundo
          900: "#064E3B", // Verde muy profundo
          light: "#D1FAE5", // Verde claro
          DEFAULT: "#10B981", // Verde brillante
          dark: "#047857", // Verde oscuro
        },
        error: {
          50: "#FEF2F2", // Rojo muy claro
          100: "#FEE2E2", // Rojo más claro
          200: "#FECACA", // Rojo claro
          300: "#FCA5A5", // Rojo intermedio
          400: "#F87171", // Rojo medio
          500: "#EF4444", // Rojo
          600: "#DC2626", // Rojo oscuro
          700: "#B91C1C", // Rojo más oscuro
          800: "#991B1B", // Rojo profundo
          900: "#7F1D1D", // Rojo muy profundo
          light: "#FEE2E2", // Rojo claro para fondos de error
          DEFAULT: "#EF4444", // Rojo brillante para textos y botones de error
          dark: "#991B1B", // Rojo oscuro para acentos de error
        },
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
