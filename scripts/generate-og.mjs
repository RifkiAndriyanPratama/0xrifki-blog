// scripts/generate-og.mjs
// Generates a unique 1200x630 OG image per post into public/og/<slug>.png
// Run before `astro build` (wired in package.json build script).
import { readdirSync, readFileSync, mkdirSync, writeFileSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import sharp from "sharp";
import { hashSeed, mulberry32, COVER_PALETTE, COVER_DIM } from "../src/lib/cover.mjs";

const root = dirname(fileURLToPath(import.meta.url)) + "/..";
const postsDir = join(root, "src/content/posts");
const outDir = join(root, "public/og");

function parseFrontmatter(src) {
  const m = src.match(/^---\r?\n([\s\S]*?)\r?\n---/);
  const fm = {};
  if (m) {
    for (const line of m[1].split("\n")) {
      const kv = line.match(/^([a-zA-Z]+):\s*(.*)$/);
      if (kv) fm[kv[1]] = kv[2].replace(/^["']|["']$/g, "").trim();
    }
  }
  return fm;
}

function esc(s) {
  return String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
}

function wrapTitle(title, maxChars) {
  const words = title.split(/\s+/);
  const lines = [];
  let cur = "";
  for (const w of words) {
    if ((cur + " " + w).trim().length > maxChars) {
      if (cur) lines.push(cur.trim());
      cur = w;
    } else {
      cur = (cur + " " + w).trim();
    }
  }
  if (cur) lines.push(cur.trim());
  return lines.slice(0, 3);
}

// ---------- variant motifs ----------
function motif(hnum, variant, rnd, uid) {
  const pick = (arr) => arr[Math.floor(rnd() * arr.length)];
  const hex = () => Math.floor(rnd() * 256).toString(16).padStart(2, "0");
  const mono = 'font-family="JetBrains Mono, ui-monospace, monospace"';
  let s = "";

  if (variant === 0) {
    // chip
    const pins = [...Array(5)].map((_, i) =>
      `<rect x="${118 + i * 36}" y="92" width="12" height="18" fill="#2b3a4a"/>` +
      `<rect x="${118 + i * 36}" y="330" width="12" height="18" fill="#2b3a4a"/>`
    ).join("");
    s += `<g>${pins}
      <rect x="130" y="112" width="180" height="216" rx="22" fill="#121a24" stroke="url(#${uid}-acc)" stroke-width="2"/>
      <rect x="164" y="148" width="112" height="144" rx="12" fill="#0b1016" stroke="#2b3a4a" stroke-width="2"/>
      <path d="M184 176 H 250 V 224" stroke="#5fedac" stroke-width="2.5" fill="none"/>
      <path d="M250 204 H 196 V 268" stroke="#49b3bc" stroke-width="2.5" fill="none"/>
      <circle cx="250" cy="224" r="6" fill="#5fedac"/>
      <circle cx="196" cy="268" r="6" fill="#49b3bc"/>
      <text x="220" y="356" text-anchor="middle" ${mono} font-size="18" font-weight="700" fill="url(#${uid}-acc)">CORE</text></g>`;
  } else if (variant === 1) {
    // hexdump
    const rows = [...Array(5)].map((_, r) => {
      const bytes = [...Array(8)].map(() => {
        const v = hex();
        return `<tspan fill="${rnd() > 0.72 ? pick(COVER_PALETTE) : COVER_DIM}"> ${v}</tspan>`;
      }).join("");
      return `<text x="92" y="${142 + r * 30}" ${mono} font-size="16" fill="#49b3bc">0x${(r * 16).toString(16).padStart(4, "0")}${bytes}</text>`;
    }).join("");
    s += `<g>
      <rect x="60" y="76" width="300" height="286" rx="18" fill="rgba(255,255,255,0.045)" stroke="#2b3a4a"/>
      <circle cx="84" cy="102" r="5" fill="#f06a6a"/><circle cx="104" cy="102" r="5" fill="#e8c766"/><circle cx="124" cy="102" r="5" fill="#6ccb8c"/>
      <text x="146" y="109" ${mono} font-size="15" fill="#8aa0b8">xxd --len 0x50 ./mem.bin</text>
      ${rows}
      <text x="210" y="398" text-anchor="middle" ${mono} font-size="15" fill="#5fedac">RSP → 0x7fffffffe2b0</text></g>`;
  } else if (variant === 2) {
    // code
    const words = ["mov", "push", "call", "pop", "ret", "lea", "xor", "cmp", "jne", "add", "sub", "syscall", "rax", "rbx", "0x40", "0x7f", ";"];
    const lines = [...Array(6)].map((_, i) => {
      const n = 3 + Math.floor(rnd() * 4);
      const toks = [...Array(n)].map(() => {
        const t = pick(words);
        return `<tspan fill="${rnd() > 0.6 ? pick(COVER_PALETTE) : COVER_DIM}">${t} </tspan>`;
      }).join("");
      return `<text x="${82 + (i % 2) * 8}" y="${132 + i * 36}" ${mono} font-size="16"><tspan fill="#2b3a4a">${(i + 1).toString().padStart(2, "0")} </tspan>${toks}</text>`;
    }).join("");
    s += `<g>${lines}
      <g fill="#5fedac"><circle cx="340" cy="140" r="5" opacity="0.8"/><circle cx="332" cy="212" r="6"/><circle cx="340" cy="284" r="4" opacity="0.8"/></g>
      <path d="M336 140 H 344 V 284" stroke="#5fedac" stroke-width="1.5" stroke-dasharray="2 4" opacity="0.5"/>
      <text x="292" y="360" ${mono} font-size="15" fill="#ef7a2b">$ gdb ./a.out</text></g>`;
  } else {
    // stack
    const names = ["main()", "foo()", "bar()", "rec(3)"];
    const frames = names.map((n, i) => {
      const y = 108 + i * 64;
      return `<g>
        <rect x="128" y="${y}" width="200" height="48" rx="12" fill="rgba(255,255,255,0.05)" stroke="#2b3a4a"/>
        <text x="146" y="${y + 20}" ${mono} font-size="14" fill="#8aa0b8">0x7fff...e${["00", "40", "80", "c0"][i]}</text>
        <text x="146" y="${y + 38}" ${mono} font-size="16" fill="#5fedac">${n}</text>
        ${i === 0 ? `<text x="342" y="${y + 32}" ${mono} font-size="14" fill="#e8c766">← RSP</text>` : ""}
      </g>`;
    }).join("");
    s += `<g>${frames}
      <path d="M336 134 H 316" stroke="#e8c766" stroke-width="1.5"/>
      <text x="60" y="112" ${mono} font-size="16" fill="#49b3bc" font-weight="700">call stack</text>
      <text x="60" y="408" ${mono} font-size="14" fill="#8aa0b8">↑ grows down</text>
      <text x="60" y="200" ${mono} font-size="14" fill="#ef7a2b">stack overflow?</text></g>`;
  }
  return s;
}

function buildOgSvg({ seed, title, category }) {
  const hnum = hashSeed(seed);
  const variant = hnum % 4;
  const rnd = mulberry32(hnum);
  const uid = "og" + hnum.toString(36);

  const len = title.length;
  let fontSize, maxChars;
  if (len <= 26) { fontSize = 62; maxChars = 22; }
  else if (len <= 50) { fontSize = 52; maxChars = 26; }
  else if (len <= 80) { fontSize = 44; maxChars = 32; }
  else { fontSize = 38; maxChars = 38; }
  const lines = wrapTitle(title, maxChars);
  const lineH = Math.round(fontSize * 1.28);
  const baseY = 250 - ((lines.length - 1) * lineH) / 2;
  const titleSvg = lines
    .map((ln, i) => `<text x="470" y="${baseY + i * lineH}" font-family="JetBrains Mono, ui-monospace, monospace" font-weight="700" font-size="${fontSize}" fill="#f1f1f1">${esc(ln)}</text>`)
    .join("\n      ");

  return `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630">
  <defs>
    <linearGradient id="${uid}-acc" x1="0" y1="0" x2="1" y2="0">
      <stop offset="0" stop-color="#5fedac"/><stop offset="1" stop-color="#49b3bc"/>
    </linearGradient>
    <pattern id="${uid}-grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <circle cx="1" cy="1" r="1.2" fill="#28272c"/>
    </pattern>
  </defs>
  <rect width="1200" height="630" fill="#100f15"/>
  <rect width="1200" height="630" fill="url(#${uid}-grid)" opacity="0.6"/>
  <ellipse cx="200" cy="120" rx="420" ry="300" fill="#5fedac" opacity="0.07"/>
  <ellipse cx="1050" cy="540" rx="460" ry="320" fill="#49b3bc" opacity="0.09"/>

  ${motif(hnum, variant, rnd, uid)}

  <text x="470" y="170" font-family="JetBrains Mono, ui-monospace, monospace" font-size="22" fill="url(#${uid}-acc)" font-weight="600">${esc(category)}</text>
  ${titleSvg}

  <text x="470" y="560" font-family="JetBrains Mono, ui-monospace, monospace" font-size="26" fill="#9aa0b0">$ whoami &gt; <tspan fill="url(#${uid}-acc)">0xrifki</tspan></text>
  <rect x="470" y="584" width="210" height="4" rx="2" fill="url(#${uid}-acc)"/>
</svg>`;
}

mkdirSync(outDir, { recursive: true });

for (const file of readdirSync(postsDir).filter((f) => f.endsWith(".md"))) {
  const slug = file.replace(/\.md$/, "");
  const src = readFileSync(join(postsDir, file), "utf8");
  const fm = parseFrontmatter(src);
  const title = fm.title || slug;
  const category = fm.category || "notes";

  const svg = buildOgSvg({ seed: `${slug}-${category}`, title, category });
  const png = await sharp(Buffer.from(svg), { density: 144 }).resize(1200, 630).png().toBuffer();
  writeFileSync(join(outDir, `${slug}.png`), png);
  console.log("og:", slug);
}

console.log("done:", outDir);