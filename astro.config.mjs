// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import remarkAlerts from "./src/lib/remark-alerts.mjs";

// https://astro.build/config
export default defineConfig({
  site: "https://thestoriesrifki.vercel.app",
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
      theme: "vitesse-light",
      wrap: true,
    },
  },
  image: {
    // Sharp for optimized local images
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
