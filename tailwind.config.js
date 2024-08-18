/** @type {import('tailwindcss').Config} */

import { themes } from "./src/enums/Themes";

const safeThemes = themes.flatMap((theme) => [
  `bg-${theme}-100`,
  `bg-${theme}-200`,
  `focus:border-${theme}`,
  `bg-${theme}-dark`,
  `bg-${theme}`,
  `text-${theme}-500`,
  `hover:bg-${theme}-300`,
  `border-${theme}-400`,
  `ring-${theme}-600`,
  `shadow-${theme}-700`,
  `focus:ring-${theme}-500`,
  `hover:text-${theme}-600`,
  `active:bg-${theme}-800`,
  `disabled:bg-${theme}-50`,
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
          50: "#EBF2FA",
          100: "#D7E6F4",
          200: "#AFCDE9",
          300: "#87B4DF",
          400: "#5F9CD3",
          500: "#3776C8",
          600: "#2B5F9F",
          700: "#204877",
          800: "#14304F",
          900: "#0A1827",
          light: "#4B9CD3",
          DEFAULT: "#1E3A8A",
          dark: "#162C55",
        },
        secondary: {
          50: "#FFFBEA",
          100: "#FFF3C4",
          200: "#FCE588",
          300: "#FADB5F",
          400: "#F7C948",
          500: "#F0B429",
          600: "#DE911D",
          700: "#CB6E17",
          800: "#B44D12",
          900: "#8D2B0B",
          light: "#FCD34D",
          DEFAULT: "#F59E0B",
          dark: "#B45309",
        },
        neutral: {
          50: "#F9FAFB",
          100: "#F3F4F6",
          200: "#E5E7EB",
          300: "#D1D5DB",
          400: "#9CA3AF",
          500: "#6B7280",
          600: "#4B5563",
          700: "#374151",
          800: "#1F2937",
          900: "#111827",
          light: "#F3F4F6",
          DEFAULT: "#9CA3AF",
          dark: "#4B5563",
        },
        accent: {
          50: "#ECFDF5",
          100: "#D1FAE5",
          200: "#A7F3D0",
          300: "#6EE7B7",
          400: "#34D399",
          500: "#10B981",
          600: "#059669",
          700: "#047857",
          800: "#065F46",
          900: "#064E3B",
          light: "#D1FAE5",
          DEFAULT: "#10B981",
          dark: "#047857",
        },
        error: {
          50: "#FEF2F2",
          100: "#FEE2E2",
          200: "#FECACA",
          300: "#FCA5A5",
          400: "#F87171",
          500: "#EF4444",
          600: "#DC2626",
          700: "#B91C1C",
          800: "#991B1B",
          900: "#7F1D1D",
          light: "#FEE2E2",
          DEFAULT: "#EF4444",
          dark: "#991B1B",
        },
        "fondo-tarjetas": "#FFFFFF",
        bordes: "#E0E0E0",
        // Agregado para fondo en secciones hero y gradientes
        hero: {
          light: "#E0E7FF", // Añadir un fondo claro para secciones destacadas
          DEFAULT: "#6366F1", // Fondo morado vibrante para elementos hero
          dark: "#4338CA", // Fondo oscuro para áreas prominentes
        },
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
        // Agregado para proporcionar tipografía más moderna
        poppins: ["Poppins", "sans-serif"],
        roboto: ["Roboto", "sans-serif"],
      },
      fontSize: {
        sm: "0.875rem",
        base: "1rem",
        xl: "1.25rem",
        "2xl": "1.5rem", // Ajuste para tamaño de texto más coherente
        "3xl": "2rem",
        "4xl": "2.5rem",
        "5xl": "3.5rem", // Incrementado para resaltar títulos importantes
        "6xl": "4rem", // Añadido para hero titles o encabezados principales
      },
      // Agregado para sombras más sofisticadas
      boxShadow: {
        lg: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
        xl: "0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
      },
      // Agregado para manejar espaciado extra
      spacing: {
        72: "18rem",
        84: "21rem",
        96: "24rem",
        108: "27rem",
      },
    },
  },
  plugins: [],
};
