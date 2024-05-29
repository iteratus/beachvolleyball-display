import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontSize: {
        clock: [
          "1vw",
          {
            lineHeight: "1.4vw",
          },
        ],
      },
      colors: {
        mainColor: "#FFFFFF",
      },
      backgroundColor: {
        mainPanel: "#333333",
      },
    },
  },
  plugins: [],
};
export default config;
