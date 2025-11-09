import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class", // <-- Add this line
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-creepster)", "cursive"],
        creepster: ["var(--font-creepster)", "cursive"],
      },
      colors: {
        primary: {
          main: "#26282c",
          secondary: "#f64295",
          orange: "#FF7A00",
          black: "#1B1B1B",
          purple: "#4B0082",
        },
      },
      animation: {
        'spin-slow': 'spin 3s linear infinite',
      },
      // Add our themed gradients
      backgroundImage: {
        'day-gradient': 'linear-gradient(to bottom, #FFDAB9, #FFA07A)', // Peach to Light Salmon
        'night-gradient': 'linear-gradient(to bottom, #1B1B1B, #4B0082)', // Black to Purple
      },
    },
  },
  plugins: [],
};
export default config;