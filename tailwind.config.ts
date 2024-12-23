import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        // Custom color scheme
        primary: {
          DEFAULT: "#0A1933",
          hover: "#0c1f3d",
          foreground: "#ffffff"
        },
        secondary: {
          DEFAULT: "#2851A3",
          hover: "#2f5cba",
          foreground: "#ffffff"
        },
        accent: {
          DEFAULT: "#D1E3F9",
          hover: "#bfd7f5",
          foreground: "#0A1933"
        },
        metallic: {
          DEFAULT: "#C0C0C0",
          hover: "#b3b3b3",
          foreground: "#0A1933"
        },
        highlight1: {
          DEFAULT: "#EF8EA4",
          hover: "#e57d95",
          foreground: "#020202"
        },
        highlight2: {
          DEFAULT: "#718089",
          hover: "#5f6b73",
          foreground: "#FEFEFE"
        },
        background: {
          DEFAULT: "hsl(var(--background))",
          foreground: "hsl(var(--foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: ["var(--font-sans)", ...fontFamily.sans],
        heading: ["var(--font-heading)", ...fontFamily.sans],
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        sparkle: {
          '0%, 100%': { opacity: '0', transform: 'scale(0)' },
          '50%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { backgroundPosition: '200% 0' },
          '100%': { backgroundPosition: '-200% 0' },
        },
        "gradient-x": {
          "0%, 100%": {
            "background-size": "200% 200%",
            "background-position": "left center"
          },
          "50%": {
            "background-size": "200% 200%",
            "background-position": "right center"
          }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "sparkle": "sparkle 1.5s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "gradient-x": "gradient-x 15s ease infinite"
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, #C0C0C0 0%, #E8E8E8 50%, #C0C0C0 100%)',
        'crystal-gradient': 'linear-gradient(135deg, rgba(209,227,249,0.2) 0%, rgba(209,227,249,0.4) 50%, rgba(209,227,249,0.2) 100%)',
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
} satisfies Config;
