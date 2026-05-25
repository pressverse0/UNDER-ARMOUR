/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
          border: "hsl(var(--card-border))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
          border: "hsl(var(--popover-border))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
          border: "var(--primary-border)",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
          border: "var(--secondary-border)",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
          border: "var(--muted-border)",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
          border: "var(--accent-border)",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
          border: "var(--destructive-border)",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          1: "hsl(var(--chart-1))",
          2: "hsl(var(--chart-2))",
          3: "hsl(var(--chart-3))",
          4: "hsl(var(--chart-4))",
          5: "hsl(var(--chart-5))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar))",
          foreground: "hsl(var(--sidebar-foreground))",
          border: "hsl(var(--sidebar-border))",
          primary: {
            DEFAULT: "hsl(var(--sidebar-primary))",
            foreground: "hsl(var(--sidebar-primary-foreground))",
            border: "var(--sidebar-primary-border)",
          },
          accent: {
            DEFAULT: "hsl(var(--sidebar-accent))",
            foreground: "hsl(var(--sidebar-accent-foreground))",
            border: "var(--sidebar-accent-border)",
          },
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        sans: "var(--app-font-sans)",
        serif: "var(--app-font-serif)",
        mono: "var(--app-font-mono)",
      },
      animation: {
        wiggle: "wiggle 3s ease-in-out infinite",
        float: "float 3s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite",
        slideInLeft: "slideInLeft 0.8s ease-out",
        slideInRight: "slideInRight 0.8s ease-out",
        fadeInUp: "fadeInUp 0.8s ease-out",
        scaleIn: "scaleIn 0.6s ease-out",
        glitch: "glitch 1s ease-in-out infinite",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-1deg)" },
          "50%": { transform: "rotate(1deg)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(220, 38, 38, 0.5), 0 0 10px rgba(220, 38, 38, 0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(220, 38, 38, 0.8), 0 0 30px rgba(220, 38, 38, 0.5)" },
        },
        slideInLeft: {
          from: { opacity: "0", transform: "translateX(-100px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        slideInRight: {
          from: { opacity: "0", transform: "translateX(100px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        fadeInUp: {
          from: { opacity: "0", transform: "translateY(30px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          from: { opacity: "0", transform: "scale(0.5)" },
          to: { opacity: "1", transform: "scale(1)" },
        },
        glitch: {
          "0%": { textShadow: "2px 2px 0 #dc2626, -2px -2px 0 #000" },
          "25%": { textShadow: "-2px 2px 0 #dc2626, 2px -2px 0 #000" },
          "50%": { textShadow: "2px -2px 0 #dc2626, -2px 2px 0 #000" },
          "75%": { textShadow: "-2px -2px 0 #dc2626, 2px 2px 0 #000" },
          "100%": { textShadow: "2px 2px 0 #dc2626, -2px -2px 0 #000" },
        },
      },
    },
  },
  plugins: [],
}
