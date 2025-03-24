import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        headingBlue: "rgba(16, 42, 86, 1)",
        "grey-1": "#4A5578",
        "grey-2": "#9DA4AE",
        "grey-3": "#7D89B0",
        "body-bg": "#F9F9FB",
        "input-bg": "#EFF1F5",
        "blue-1": "#102A56",
        error: "#F04438",
        success: "#17B268",
        secondary: "#E0FE10",
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        "accent-100": {
          DEFAULT: "hsl(var(--accent-100))",
          foreground: "hsl(var(--accent-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        chart: {
          "1": "hsl(var(--chart-1))",
          "2": "hsl(var(--chart-2))",
          "3": "hsl(var(--chart-3))",
          "4": "hsl(var(--chart-4))",
          "5": "hsl(var(--chart-5))",
        },
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      fontFamily: {
        schabo: "var(--font-schabo-condensed)",
        geistSans: "var(--font-geist-sans)",
        geistMono: "var(--font-geist-mono)",
        generalSans: "var(--font-general-sans)",
        comedik: "var(--font-comedik)", 
      },
    },
  },
 
  plugins: [require("tailwindcss-animate")],
};

export default config;