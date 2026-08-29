// src/content/config.ts
// Zod-powered content schema — strongly typed frontmatter enforcement
import { z, defineCollection } from "astro:content";

const CATEGORIES = [
  "coding",
  "teknologi",
  "kehidupan",
] as const;

export type Category = (typeof CATEGORIES)[number];

const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title:       z.string().min(1).max(120),
      date:        z.coerce.date(),
      description: z.string().max(160),
      category:    z.enum(CATEGORIES),
      lang:        z.enum(["id", "en"]).default("id"),
      tags:        z.array(z.string()).default([]),
      cover:       z.union([image(), z.string()]).optional(),
      coverAlt:    z.string().optional(),
      draft:       z.boolean().default(false),
      readingTime: z.number().optional(),
      updated:     z.coerce.date().optional(),
    }),
});

export const collections = {
  posts:    postsCollection,
};
