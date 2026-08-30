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

/** True for photo-only posts (Substack-style) */
export function isFoto(post: CollectionEntry<"posts">): boolean {
  return post.data.type === "foto";
}

/** Leading image of a post: first gallery photo for foto posts, else the cover */
export function leadPhoto(post: CollectionEntry<"posts">):
  | import("astro").ImageMetadata
  | string
  | undefined {
  if (isFoto(post)) {
    const photos = post.data.photos;
    if (photos && photos.length > 0) return photos[0];
  }
  return post.data.cover;
}

/** Build a serialisable post object for client-side Fuse.js search */
export function toSearchIndex(posts: CollectionEntry<"posts">[]) {
  return posts.filter((p) => !p.data.draft).map((p) => ({
    slug:        p.slug,
    title:       p.data.title,
    description: p.data.description,
    category:    p.data.category,
    tags:        p.data.tags,
    date:        isoDate(p.data.date),
    dateHuman:   formatDate(p.data.date),
  }));
}
