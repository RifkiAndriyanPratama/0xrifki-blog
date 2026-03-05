// tailwind.config.mjs
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        // Everblush — https://github.com/Everblush/everblush
        base: {
          bg:       "#1e2326",
          "bg-alt": "#181b1e",
          surface:  "#232a2d",
          overlay:  "#2d3437",
          muted:    "#3d4649",
          subtle:   "#5b6b6e",
          text:     "#dadada",
          red:      "#e67e80",
          orange:   "#e69875",
          yellow:   "#dbbc7f",
          green:    "#a7c080",
          teal:     "#83c092",
          blue:     "#7fbbb3",
          purple:   "#d699b6",
        },
      },
      fontFamily: {
        mono: ["'JetBrains Mono'", "'Fira Code'", ...defaultTheme.fontFamily.mono],
        sans: ["'Inter'", ...defaultTheme.fontFamily.sans],
      },
      typography: (theme) => ({
        devlog: {
          css: {
            "--tw-prose-body":          theme("colors.base.text"),
            "--tw-prose-headings":      theme("colors.base.teal"),
            "--tw-prose-lead":          theme("colors.base.subtle"),
            "--tw-prose-links":         theme("colors.base.blue"),
            "--tw-prose-bold":          theme("colors.base.text"),
            "--tw-prose-counters":      theme("colors.base.subtle"),
            "--tw-prose-bullets":       theme("colors.base.muted"),
            "--tw-prose-hr":            theme("colors.base.overlay"),
            "--tw-prose-quotes":        theme("colors.base.purple"),
            "--tw-prose-quote-borders": theme("colors.base.purple"),
            "--tw-prose-captions":      theme("colors.base.subtle"),
            "--tw-prose-code":          theme("colors.base.orange"),
            "--tw-prose-pre-code":      theme("colors.base.text"),
            "--tw-prose-pre-bg":        theme("colors.base.surface"),
            "--tw-prose-th-borders":    theme("colors.base.overlay"),
            "--tw-prose-td-borders":    theme("colors.base.overlay"),
            // Remove backtick background from inline code — Shiki handles blocks
            "code::before": { content: '""' },
            "code::after":  { content: '""' },
            "code": {
              fontFamily: theme("fontFamily.mono").join(", "),
              backgroundColor: theme("colors.base.surface"),
              padding: "0.15em 0.4em",
              borderRadius: "0.25rem",
              fontSize: "0.875em",
            },
            "pre": {
              borderRadius: "0.5rem",
              border: `1px solid ${theme("colors.base.overlay")}`,
            },
            "a": {
              textDecoration: "underline",
              textDecorationColor: theme("colors.base.muted"),
              textUnderlineOffset: "3px",
              transition: "color 0.15s, text-decoration-color 0.15s",
              "&:hover": {
                color: theme("colors.base.teal"),
                textDecorationColor: theme("colors.base.teal"),
              },
            },
            "blockquote": {
              fontStyle: "normal",
              fontFamily: theme("fontFamily.mono").join(", "),
              fontSize: "0.9em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
