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
          light: "#6EC1E4",
          DEFAULT: "#009EDB",
          dark: "#007BB5",
        },
        secondary: {
          light: "#FFB6C1",
          DEFAULT: "#FF69B4",
          dark: "#C2185B",
        },
        accent: {
          light: "#FFECB3",
          DEFAULT: "#FFC107",
          dark: "#FFA000",
        },
        neutral: {
          light: "#F5F5F5",
          DEFAULT: "#E0E0E0",
          dark: "#BDBDBD",
        },
        success: {
          light: "#81C784",
          DEFAULT: "#4CAF50",
          dark: "#388E3C",
        },
        warning: {
          light: "#FFD54F",
          DEFAULT: "#FFC107",
          dark: "#FFA000",
        },
        danger: {
          light: "#E57373",
          DEFAULT: "#F44336",
          dark: "#D32F2F",
        },
        info: {
          light: "#64B5F6",
          DEFAULT: "#2196F3",
          dark: "#1976D2",
        },

        "accent-primary": "#3498DB",
        "accent-secondary": "#E74C3C",
        "fondo-tarjetas": "#FFFFFF",
        bordes: "#E0E0E0",
      },
      fontFamily: {
        montserrat: ["Montserrat", "sans-serif"],
        openSans: ["Open Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};
