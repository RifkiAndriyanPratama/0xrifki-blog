// src/config/site.ts
// Semua data pribadi/placeholder yang bisa diedit tanpa nyentuh markup.
export const siteConfig = {
  name:       "Rifki Andriyan",
  username:   "@thestoriesrifki",
  role:       "Software Developer & Lifelong Learner",
  bio:        "Menulis tentang programming, produktivitas, dan kehidupan. Tempat menulis dalam dan berbagi bebas.",
  avatarLetter: "R",
  socials: [
    { label: "GitHub",     href: "https://github.com/RifkiAndriyanPratama" },
    { label: "Instagram",  href: "https://instagram.com/thestoriesrifkii" },
    { label: "RSS",        href: "/rss.xml" },
  ],

  newsletter: {
    title: "Newsletter",
    desc:  "Belum ada backend — untuk sekarang pakai RSS, hapus kolom ini kalau mau diganti form nyata.",
    rssHref: "/rss.xml",
  },

  currentlyReading: {
    title:    "Currently Reading",
    book:     "Coders at Work",
    author:   "Peter Seibel",
    progress: 42,
  },

  moodboard: {
    quote:  "Focus on becoming the best version of yourself, not on proving anything to anyone.",
    source: "anon",
  },

  about: {
    text: "Personal website — tempat menulis panjang dan berbagi bebas. Artikel untuk pemikiran yang butuh ruang, Threads untuk hal-hal kecil yang tetap layak dikenang.",
  },
};