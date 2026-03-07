// src/content/config.ts
// Zod-powered content schema — strongly typed frontmatter enforcement
import { z, defineCollection } from "astro:content";

const CATEGORIES = [
  "devops",
  "web",
  "systems",
  "tooling",
  "security",
  "notes",
  "project",
  "programming",
  "math",
] as const;

export type Category = (typeof CATEGORIES)[number];

// ─── Posts ────────────────────────────────────────────────────────────────────
const postsCollection = defineCollection({
  type: "content",
  schema: ({ image }) =>
    z.object({
      title:       z.string().min(1).max(120),
      date:        z.coerce.date(),
      description: z.string().max(160),
      category:    z.enum(CATEGORIES),
      tags:        z.array(z.string()).default([]),
      cover:       image().optional(),
      coverAlt:    z.string().optional(),
      draft:       z.boolean().default(false),
      readingTime: z.number().optional(),
    }),
});

// ─── Projects ─────────────────────────────────────────────────────────────────
const projectsCollection = defineCollection({
  type: "data",
  schema: ({ image }) =>
    z.object({
      name:        z.string().min(1).max(80),
      description: z.string().max(160),
      stack:       z.array(z.string()).default([]),
      github:      z.string().url().optional(),
      cover:       image().optional(),
      coverAlt:    z.string().optional(),
      status:      z.enum(["wip", "done", "archived"]).default("done"),
      order:       z.number().default(99),
      featured:    z.boolean().default(false),
    }),
});

export const collections = {
  posts:    postsCollection,
  projects: projectsCollection,
};
