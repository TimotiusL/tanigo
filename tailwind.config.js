import daisyui from "daisyui";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],

  theme: {
    extend: {},
  },

  plugins: [daisyui],

  daisyui: {
    themes: [
      {
        tanigo: {
          primary: "#a8c700",
          secondary: "#8fb000",
          accent: "#d4e157",

          neutral: "#1f2937",

          "base-100": "#f9fafb",
          "base-200": "#eef8eb",
          "base-300": "#dcefd4",

          info: "#3abff8",
          success: "#36d399",
          warning: "#fbbd23",
          error: "#f87272",
        },
      },

      "light",
      "dark",
    ],
  },
};
