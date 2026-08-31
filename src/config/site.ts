// src/config/site.ts
// Semua data pribadi/placeholder yang bisa diedit tanpa nyentuh markup.
export const siteConfig = {
  name:       "Rifki Andriyan Pratama",
  username:   "@thestoriesrifki",
  role:       "Membangun, merenung, lalu berbagi.",
  bio:        "Menulis tentang programming, produktivitas, dan kehidupan. Tempat menulis dalam dan berbagi bebas.",
  avatarLetter: "R",

  // Kalimat berputar di bawah profil (typing effect). Kalimat pertama jadi statis kalau user menonaktifkan animasi.
  typewriter: [
    "Membangun, merenung, lalu berbagi.",
    "Menulis kode di siang, menangkap senja di ujung hari.",
    "Tempat menulis dalam, dan berbagi bebas.",
  ],

  socials: [
    { label: "GitHub",     href: "https://github.com/RifkiAndriyanPratama" },
    { label: "Instagram",  href: "https://instagram.com/thestoriesrifkii" },
    { label: "RSS",        href: "/rss.xml" },
  ],

  currentlyReading: {
    title:    "Currently Reading",
    book:     "Coders at Work",
    author:   "Peter Seibel",
    progress: 42,
  },

  moodboard: {
    title: "Moodboard",
    quotes: [
      { quote: "Focus on becoming the best version of yourself, not on proving anything to anyone.", source: "anon" },
      { quote: "Setiap senja adalah pengingat bahwa hari bisa diakhiri dengan tenang.", source: "catatan sendiri" },
      { quote: "Menulis itu cara berjalan pelan sambil melihat ke belakang dengan jujur.", source: "catatan sendiri" },
    ],
  },

  dailyFrame: {
    title: "Frame Hari Ini",
    quote: "Dua frame malam ini: satu untuk dinginnya malam, satu untuk hangatnya cerita.",
    source: "arked bawah",
  },

  rootNote: {
    label: "notes",
    href:  "/search?q=",
  },

  about: {
    text: "Personal website — tempat menulis panjang dan berbagi bebas. Artikel untuk pemikiran yang butuh ruang, Frames untuk hal-hal kecil yang tetap layak dikenang.",
  },

  colophon: {
    label: "Colophon",
    href:  "/colophon",
    text:  "Astro · Tailwind · Vercel — kenapa dibangun begini, font & warna apa, semuanya ada di halaman ini.",
  },
};