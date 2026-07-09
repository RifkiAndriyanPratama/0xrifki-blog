// src/lib/utils.ts
import type { CollectionEntry } from "astro:content";

/** Format a Date object → "Jul 20, 2024" */
export function formatDate(date: Date): string {
  return date.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/** Format a Date object → machine-readable ISO string for <time datetime> */
export function isoDate(date: Date): string {
  return date.toISOString().split("T")[0]!;
}

/** Estimate reading time from raw markdown body */
export function readingTime(body: string): number {
  const WPM = 200;
  const words = body.trim().split(/\s+/).length;
  return Math.max(1, Math.round(words / WPM));
}

/** Sort posts: drafts last, then newest first */
export function sortPosts(
  posts: CollectionEntry<"posts">[]
): CollectionEntry<"posts">[] {
  return posts
    .filter((p) => !p.data.draft)
    .sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

/** Get all unique categories from posts */
export function getCategories(
  posts: CollectionEntry<"posts">[]
): string[] {
  const cats = posts
    .filter((p) => !p.data.draft)
    .map((p) => p.data.category);
  return [...new Set(cats)].sort();
}

/** Get all unique tags from posts */
export function getTags(
  posts: CollectionEntry<"posts">[]
): string[] {
  const tags = posts
    .filter((p) => !p.data.draft)
    .flatMap((p) => p.data.tags);
  return [...new Set(tags)].sort();
}

/** Build a serialisable post object for client-side Fuse.js search */
export function toSearchIndex(posts: CollectionEntry<"posts">[]) {
  return posts.map((p) => ({
    slug:        p.slug,
    title:       p.data.title,
    description: p.data.description,
    category:    p.data.category,
    tags:        p.data.tags,
    date:        isoDate(p.data.date),
  }));
}
