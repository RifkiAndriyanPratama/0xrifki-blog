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
      typography: (theme) => ({
        devlog: {
          css: {
            "--tw-prose-body":          theme("colors.base.text"),
            "--tw-prose-headings":      theme("colors.base.text"),
            "--tw-prose-lead":          theme("colors.base.subtle"),
            "--tw-prose-links":         theme("colors.base.heading"),
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

            fontSize: "1.0625rem",
            lineHeight: "1.75",

            "p": {
              marginTop: "1.25em",
              marginBottom: "1.25em",
            },

            "h2": {
              fontSize: "1.5rem",
              fontWeight: "600",
              marginTop: "2em",
              marginBottom: "0.5em",
              lineHeight: "1.3",
            },
            "h3": {
              fontSize: "1.25rem",
              fontWeight: "600",
              marginTop: "1.5em",
              marginBottom: "0.5em",
              lineHeight: "1.35",
            },
            "h2 + h3": {
              marginTop: "0",
            },

            "ul, ol": {
              marginTop: "1em",
              marginBottom: "1em",
            },
            "li": {
              marginTop: "0.125em",
              marginBottom: "0.125em",
            },

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
              marginTop: "1.5em",
              marginBottom: "1.5em",
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
              fontStyle: "italic",
              fontFamily: "'Source Serif 4', Georgia, serif",
              fontSize: "1.05em",
              lineHeight: "1.7",
              borderLeftWidth: "3px",
              borderLeftColor: theme("colors.base.teal"),
              backgroundColor: theme("colors.base.surface"),
              padding: "1.25rem 1.5rem",
              borderRadius: "0 0.5rem 0.5rem 0",
              marginTop: "2em",
              marginBottom: "2em",
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
              backgroundColor: "var(--color-overlay)",
            },
            "img": {
              borderRadius: "0.5rem",
              border: `1px solid ${theme("colors.base.overlay")}`,
              marginTop: "1.5em",
              marginBottom: "1.5em",
            },
            "hr": {
              marginTop: "2em",
              marginBottom: "2em",
            },
          },
        },
      }),
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
