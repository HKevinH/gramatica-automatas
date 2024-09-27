/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.html", "./src/**/*.tsx", "./src/**/*.ts"],
  theme: {
    extend: {
      animation: {
        "border-gradient": "borderGradient 3s linear infinite",
      },
      keyframes: {
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
