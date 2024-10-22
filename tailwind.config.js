/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  safelist: ["absolute", "right-0", "top-0", "z-40"],
  theme: {
    screens: {
      ssm: "480px",
      sm: "640px",
      md: "768px",
      lg: "1024px",
      xl: "1280px",
      "2xl": "1536px",
    },
    container: {
      padding: "7em",
      center: true,
      screens: {
        "2xl": "1392px",
      },
    },
    extend: {
      fontFamily: {
        roboto: ["Roboto", "sans-serif"],
        elle: ["ElleFutura", "sans-serif"],
      },
      colors: {
        red: "#FF0000",
        primry: "#000000",
        black: "#000000",
        gray: "#474747",
        white: "#ffffff",
        pink: "#f4f4f4",
        yellow: "#d49b37",
        darkblue: "#19356d",
        purple: "#4c63c4",
        purplelight: "#7780e6",
      },
      // Thêm animation và keyframes
      keyframes: {
        slide: {
          '0%': { transform: 'translateX(5%)' },
          '50%': { transform: 'translateX(-5%)' },
          '100%': { transform: 'translateX(5%)' },
        },
        blink: {
          '0%, 100%': { opacity: 1 },
          '50%': { opacity: 0 },
        },
      },
      animation: {
        slide: 'slide 10s linear infinite',
        'blink-fast': 'blink 0.5s steps(2, start) infinite', 

      },
    },
  },
  plugins: [],
};
