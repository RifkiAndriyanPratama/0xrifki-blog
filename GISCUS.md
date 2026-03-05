# Giscus Comments — Setup Guide

Giscus routes blog comments through GitHub Discussions. Zero backend, zero database,
visitors authenticate via GitHub. Takes ~10 minutes to wire up.

---

## Prerequisites

- A **public** GitHub repository for this blog
- GitHub Discussions enabled on that repo
  → `Settings` → `Features` → ☑ Discussions

---

## Step 1 — Install the Giscus GitHub App

Visit https://github.com/apps/giscus and click **Install**.
Grant access to the blog repo specifically (not all repos).

---

## Step 2 — Create a Discussion Category

In your repo → `Discussions` → `Manage categories` → `New category`.

Recommended settings:
- **Name**: `Blog Comments`
- **Format**: Announcement ← important: prevents random threads

---

## Step 3 — Get Your IDs

Visit https://giscus.app and fill in:

| Field          | Value                              |
|----------------|------------------------------------|
| Repository     | `yourusername/your-repo`           |
| Page ↔ Discussion | Pathname                        |
| Discussion Category | Blog Comments                 |
| Features       | Enable reactions ✓                 |
| Theme          | `transparent_dark`                 |

Giscus will generate a `<script>` tag. You need these values:

```
data-repo-id      = "R_XXXXXXXXXXXXXXXXXX"
data-category-id  = "DIC_XXXXXXXXXXXXXXXXXX"
```

---

## Step 4 — Update PostLayout.astro

Open `src/layouts/PostLayout.astro` and find the Giscus script block.
Replace the placeholder values:

```astro
<script
  is:inline
  src="https://giscus.app/client.js"
  data-repo="yourusername/your-repo"        ← change
  data-repo-id="R_XXXXXXXXXXXXXXXXXX"       ← change
  data-category="Blog Comments"
  data-category-id="DIC_XXXXXXXXXXXXXXXXXX" ← change
  data-mapping="pathname"
  data-strict="0"
  data-reactions-enabled="1"
  data-emit-metadata="0"
  data-input-position="top"
  data-theme="transparent_dark"
  data-lang="en"
  data-loading="lazy"
  crossorigin="anonymous"
  async
></script>
```

---

## Step 5 — Verify

Run `npm run dev`, open a post, scroll to the bottom.
You should see the Giscus widget. Sign in with GitHub to test a comment.

---

## Theming

The `data-theme="transparent_dark"` value blends into the Tokyo Night background.
Other options: `dark`, `dark_dimmed`, `dark_tritanopia`, or a custom CSS URL.

Custom theme URL example:
```
data-theme="https://your-domain.com/giscus-theme.css"
```

Create `public/giscus-theme.css` and override Giscus CSS variables there.

---

## Privacy Note

Giscus embeds a GitHub iframe. If you care about GDPR/cookie banners, load it
lazily only after user interaction:

```javascript
// Replace is:inline with a click-to-load approach
const container = document.getElementById('giscus-container');
const btn = document.createElement('button');
btn.textContent = 'Load comments';
btn.onclick = () => {
  // inject the <script> tag dynamically
  const s = document.createElement('script');
  s.src = 'https://giscus.app/client.js';
  // ... set data-* attributes
  container.replaceChild(s, btn);
};
container.appendChild(btn);
```
