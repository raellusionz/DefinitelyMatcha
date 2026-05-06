/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,jsx,ts,tsx}", "./**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      keyframes: {
        fadeUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.92)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        blink: {
          "0%, 100%": { opacity: "1" },
          "50%": { opacity: "0.35" },
        },
      },
      animation: {
        "fade-up": "fadeUp 0.55s ease both",
        "fade-up-delayed-1": "fadeUp 0.55s 0.08s ease both",
        "fade-up-delayed-2": "fadeUp 0.55s 0.16s ease both",
        "fade-up-delayed-3": "fadeUp 0.55s 0.24s ease both",
        "fade-up-delayed-4": "fadeUp 0.55s 0.32s ease both",
        "fade-in": "fadeIn 0.2s ease both",
        "scale-in": "scaleIn 0.25s cubic-bezier(0.34,1.4,0.64,1) both",
        blink: "blink 2s infinite",
      },
    },
  },
  plugins: [],
};
