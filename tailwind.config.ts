import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          DEFAULT: "#1F3A5F",
          light: "#2a4f7a",
          dark: "#1a3250",
        },
        teal: {
          DEFAULT: "#4F7C82",
          light: "#5f9ca3",
        },
        background: "#F3F0E8",
        charcoal: "#333333",
      },
      fontFamily: {
        heading: ["var(--font-merriweather)", "serif"],
        body: ["var(--font-inter)", "sans-serif"],
      },
      boxShadow: {
        sm: "0 1px 3px rgba(31,58,95,0.08)",
        md: "0 4px 12px rgba(31,58,95,0.1)",
        lg: "0 12px 32px rgba(31,58,95,0.12)",
      },
    },
  },
  plugins: [],
};
export default config;
