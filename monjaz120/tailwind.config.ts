// tailwind.config.ts
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0891b2", // هذا هو نفس لون زر "بحث"
      },
    },
  },
  plugins: [],
};
export default config;
