// tailwind.config.mjs
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        base: {
          bg:       "var(--color-bg)",
          "bg-alt": "var(--color-bg-alt)",
          surface:  "var(--color-surface)",
          overlay:  "var(--color-overlay)",
          muted:    "var(--color-muted)",
          subtle:   "var(--color-subtle)",
          text:     "var(--color-text)",
          heading:  "var(--color-heading)",
          red:      "var(--color-red)",
          orange:   "var(--color-orange)",
          yellow:   "var(--color-yellow)",
          green:    "var(--color-green)",
          teal:     "var(--color-teal)",
          blue:     "var(--color-blue)",
          purple:   "var(--color-purple)",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", ...defaultTheme.fontFamily.mono],
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
        serif: ["'Source Serif 4'", "Georgia", "serif"],
      },
    },
  },
  plugins: [],
};
