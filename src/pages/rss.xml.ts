// src/pages/rss.xml.ts
import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { sortPosts } from "@/lib/utils";
import type { APIContext } from "astro";

export async function GET(context: APIContext) {
  const posts = sortPosts(await getCollection("posts", ({ data }) => !data.draft));

  const items = posts.map((post) => {
    const photoUrls = post.data.type === "foto"
      ? (post.data.photos ?? []).filter((p): p is string => typeof p === "string")
      : [];
    const safeTitle = post.data.title.replace(/"/g, "&quot;");
    const content = photoUrls.length > 0
      ? photoUrls.map((u) => `<figure><img src="${new URL(u, context.site)}" alt="${safeTitle}"/></figure>`).join("\n")
      : undefined;

    return {
      title:       post.data.title,
      pubDate:     post.data.date,
      description: post.data.description,
      link:        `/blog/${post.slug}/`,
      categories:  [post.data.category, ...post.data.tags],
      ...(content && { content }),
      customData:  `<dc:language>${post.data.lang}</dc:language>`,
    };
  });

  return rss({
    title:       "thestoriesrifki",
    description: "cerita seputar coding, teknologi, dan kehidupan.",
    site:        context.site!,
    xmlns:       { dc: "http://purl.org/dc/elements/1.1/" },
    items,
    customData: `<language>id</language>`,
  });
}
