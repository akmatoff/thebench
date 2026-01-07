/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "var(--primary-color)",
        content: "var(--content-color)",
        foreground: "var(--foreground-color)",
        border: "var(--border-color)",
      },
    },
  },
  plugins: [],
};
