// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkAlerts from "./src/lib/remark-alerts.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://0xrifki-blog.vercel.app",
  compressHTML: true,
  prefetch: true,
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    sitemap(),
  ],
  markdown: {
    remarkPlugins: [remarkAlerts],
    shikiConfig: {
      // dual themes — readable in light & dark mode
      themes: {
        light: "vitesse-light",
        dark:  "vitesse-dark",
      },
      defaultColor: false,
      wrap: true,
    },
  },
  image: {
    // Sharp for optimized local images
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
