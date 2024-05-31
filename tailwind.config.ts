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
        clockFaceRemote: [
          "30vmin",
          {
            lineHeight: "1",
          },
        ],
        headline: [
          "4vmin",
          {
            lineHeight: "1",
          },
        ],
        team: [
          "3.5vmin",
          {
            lineHeight: "1",
          },
        ],
        scoreMain: [
          "10vmin",
          {
            lineHeight: "1",
          },
        ],
      },
      colors: {
        clockBackdrop: "#292929",
        input: "#000000",
        mainColor: "#FFFFFF",
      },
      backgroundColor: {
        button: "#007aff",
        buttonActive: "#004085",
        buttonHover: "#0056b3",
        delete: "#c7000a",
        input: "#2c2c2e",
        mainPanel: "#1c1c1e",
        stepper: "#2c2c2e",
      },
      borderWidth: {
        separator: "1vmin",
      },
      gridTemplateRows: {
        custom: "auto auto",
      },
      padding: {
        scoreBoard: "8vmin",
      },
    },
  },
  plugins: [],
};
export default config;
