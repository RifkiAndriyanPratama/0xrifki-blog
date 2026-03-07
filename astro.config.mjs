// astro.config.mjs
import { defineConfig } from "astro/config";
import tailwind from "@astrojs/tailwind";
import mdx from "@astrojs/mdx";
// import sitemap from "@astrojs/sitemap";

// https://astro.build/config
export default defineConfig({
  site: "https://0xrifki-blog.vercel.app",
  integrations: [
    tailwind({ applyBaseStyles: false }),
    mdx(),
    // sitemap(),
  ],
  markdown: {
    shikiConfig: {
      // vitesse-dark — muted greens/teals, complements Everblush perfectly
      theme: "vitesse-dark",
      wrap: true,
    },
  },
  image: {
    // Sharp for optimized local images
    service: { entrypoint: "astro/assets/services/sharp" },
  },
});
