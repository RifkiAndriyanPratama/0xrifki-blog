// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortPosts } from "@/lib/utils";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = sortPosts(await getCollection("posts"));

  return rss({
    title:       "0xrifki",
    description: "cs student by day, terminal addict by night. notes on software, systems & tooling.",
    site:        context.site!,
    xmlns:       { dc: "http://purl.org/dc/elements/1.1/" },
    items: posts.map((post) => ({
      title:       post.data.title,
      pubDate:     post.data.date,
      description: post.data.description,
      link:        `/blog/${post.slug}/`,
      categories:  [post.data.category, ...post.data.tags],
      customData:  `<dc:language>${post.data.lang}</dc:language>`,
    })),
    customData: `<language>en</language>`,
  });
}
