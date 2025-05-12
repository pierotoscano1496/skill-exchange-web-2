/** @type {import('tailwindcss').Config} */

import { themes } from "./src/enums/Themes";

module.exports = {
    darkMode: ["class"],
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
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		transitionProperty: {
  			width: 'width',
  			spacing: 'margin, padding'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			xl: '1rem',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		colors: {
  			'fondo-principal': '#FFFFFF',
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				content: '#FFFFFF',
  				hover: '#EA580C',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				content: '#78350F',
  				hover: '#EAB308',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				content: '#064E3B',
  				hover: '#059669',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			neutral: {
  				DEFAULT: '#9CA3AF',
  				content: '#374151',
  				hover: '#6B7280'
  			},
  			error: {
  				DEFAULT: '#EF4444',
  				content: '#FFFFFF',
  				hover: '#DC2626'
  			},
  			'fondo-tarjetas': '#FFFFFF',
  			bordes: '#E0E0E0',
  			'yape-purple': '#720E9E',
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card))',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			},
  			sidebar: {
  				DEFAULT: 'hsl(var(--sidebar-background))',
  				foreground: 'hsl(var(--sidebar-foreground))',
  				primary: 'hsl(var(--sidebar-primary))',
  				'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
  				accent: 'hsl(var(--sidebar-accent))',
  				'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
  				border: 'hsl(var(--sidebar-border))',
  				ring: 'hsl(var(--sidebar-ring))'
  			}
  		},
  		fontFamily: {
  			display: [
  				'Poppins',
  				'sans-serif'
  			],
  			body: [
  				'Open Sans',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			sm: '0.875rem',
  			base: '1rem',
  			xl: '1.25rem',
  			'2xl': '1.5rem',
  			'3xl': '2rem',
  			'4xl': '2.5rem',
  			'5xl': '3.5rem',
  			'6xl': '4rem'
  		},
  		boxShadow: {
  			lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  			xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  			soft: '0 4px 6px rgba(0, 0, 0, 0.1)',
  			deep: '0 10px 15px rgba(0, 0, 0, 0.2)',
  			input: 'inset 0 2px 4px 0 hsla(0, 0%, 0%, 0.08)'
  		},
  		spacing: {
  			'128': '32rem',
  			'144': '36rem'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate")],
};
