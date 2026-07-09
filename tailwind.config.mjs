// tailwind.config.mjs
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{astro,html,js,jsx,md,mdx,ts,tsx}"],
  darkMode: "class",
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
              borderLeftWidth: "3px",
              borderLeftColor: theme("colors.base.teal"),
              backgroundColor: theme("colors.base.surface"),
              padding: "0.75rem 1rem",
              borderRadius: "0 0.5rem 0.5rem 0",
            },
            "table": {
              borderCollapse: "separate",
              borderSpacing: "0",
              width: "100%",
            },
            "th": {
              backgroundColor: theme("colors.base.surface"),
              padding: "0.5rem 0.75rem",
              fontWeight: "600",
              fontSize: "0.875rem",
            },
            "td": {
              padding: "0.5rem 0.75rem",
              borderBottomWidth: "1px",
              borderBottomColor: theme("colors.base.overlay"),
            },
            "tr:nth-child(even) td": {
              backgroundColor: "rgba(0,0,0,0.03)",
            },
            ".dark tr:nth-child(even) td": {
              backgroundColor: "rgba(255,255,255,0.02)",
            },
            "img": {
              borderRadius: "0.5rem",
              border: `1px solid ${theme("colors.base.overlay")}`,
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
