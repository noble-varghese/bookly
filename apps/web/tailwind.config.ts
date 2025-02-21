import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        foreground: "var(--foreground)",
        bookly: {
          brown: '#725B3A',    // Dark brown color
          orange: '#FCA72C',   // Orange/amber color
          cream: '#F2E5D0',    // Light cream color
          bg: '#FDF6EC',        // Background color (from the app's background)
          textInput: '#7B7B7B'
        }
      },
    },
  },
  plugins: [],
} satisfies Config;
