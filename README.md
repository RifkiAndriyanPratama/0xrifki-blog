# devlog

Personal blog — project-driven content on software engineering, systems, and tooling.

Built with [Astro](https://astro.build) · [Tailwind CSS](https://tailwindcss.com) · [Tokyo Night](https://github.com/enkia/tokyo-night-vscode-theme)

---

## Stack

| Layer      | Tool                                      |
|------------|-------------------------------------------|
| Framework  | Astro 4 (SSG)                             |
| Styling    | Tailwind CSS + @tailwindcss/typography    |
| Content    | Astro Content Collections (`.md` / `.mdx`)|
| Syntax HL  | Shiki — `tokyo-night` theme               |
| Search     | Fuse.js (client-side)                     |
| Deploy     | Vercel                                    |

---

## Quick Start

```bash
# Clone & install
git clone https://github.com/yourusername/devlog
cd devlog
npm install

# Dev server at localhost:4321
npm run dev

# Production build
npm run build
npm run preview
```

---

## Writing a Post

Create `src/content/posts/your-post-slug.md`:

```markdown
---
title: "Your Post Title"
date: 2024-07-20
description: "One sentence — max 160 chars for SEO."
category: devops         # devops | web | systems | tooling | security | notes | project
tags: [docker, nginx]
draft: false
cover: ./cover.png       # optional — local image relative to this file
coverAlt: "Description"
---

Your content here. Images work: ![alt](./screenshot.png)
```

Slug is derived from the filename. No config needed.

---

## Project Structure

```
devlog/
├── src/
│   ├── components/
│   │   └── PostCard.astro        # Blog list item
│   ├── content/
│   │   ├── config.ts             # Zod schema for frontmatter
│   │   └── posts/                # Markdown posts live here
│   ├── layouts/
│   │   ├── Layout.astro          # Base shell (Navbar + Footer)
│   │   └── PostLayout.astro      # Post chrome
│   ├── lib/
│   │   └── utils.ts              # Shared helpers
│   ├── pages/
│   │   ├── index.astro           # Homepage
│   │   ├── blog/
│   │   │   ├── index.astro       # Listing + search + filter
│   │   │   └── [slug].astro      # Dynamic post route
│   │   └── rss.xml.ts            # RSS feed
│   └── styles/
│       └── global.css            # Tailwind base + custom vars
├── public/                       # Static assets
├── astro.config.mjs
├── tailwind.config.mjs
├── tsconfig.json
├── vercel.json
└── GISCUS.md                     # Giscus setup instructions (deprecated)
```

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Production
vercel --prod
```

Or connect the GitHub repo to Vercel for automatic deploys on push.
