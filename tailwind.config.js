/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      animation: {
        "border-gradient": "borderGradient 2s linear infinite",
        fadeIn: "fadeIn 1s ease-in-out",
      },
      keyframes: {
        rotation: {
          "0%": {
            "--gradient-angle": "0deg",
          },
          "100%": {
            "--gradient-angle": "360deg",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        borderGradient: {
          "0%": {
            "border-color": "transparent",
            "border-image-source": "linear-gradient(90deg, #34D399, #3B82F6)",
            "border-image-slice": "1",
          },
          "100%": {
            "border-color": "transparent",
            "border-image-source": "linear-gradient(90deg, #3B82F6, #34D399)",
            "border-image-slice": "1",
          },
        },
      },
    },
  },
  plugins: [],
};
