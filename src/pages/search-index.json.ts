// src/pages/search-index.json.ts
// Static JSON endpoint — generated at build time for client-side Fuse.js search
import { getCollection } from "astro:content";
import type { APIRoute } from "astro";
import { sortPosts } from "@/lib/utils";

export const GET: APIRoute = async () => {
  const posts = sortPosts(await getCollection("posts"));

  const index = posts.map((p) => ({
    slug:        p.slug,
    title:       p.data.title,
    description: p.data.description,
    category:    p.data.category,
    tags:        p.data.tags,
    date:        p.data.date.toISOString().split("T")[0],
  }));

  return new Response(JSON.stringify(index), {
    status: 200,
    headers: { "Content-Type": "application/json" },
  });
};
