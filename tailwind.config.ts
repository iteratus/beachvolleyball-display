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
        clockFaceGUI: [
          "100pt",
          {
            lineHeight: "1",
          },
        ],
      },
      colors: {
        mainColor: "#FFFFFF",
        input: "#000000",
      },
      backgroundColor: {
        mainPanel: "#1c1c1e",
      },
    },
  },
  plugins: [],
};
export default config;
