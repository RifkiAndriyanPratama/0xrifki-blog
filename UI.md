# Product Requirements Document (PRD)
## UI/UX Design — thestoriesrifki.

### 1. Overview

**thestoriesrifki.** adalah personal website dengan konsep gabungan antara **personal blog** dan **microblogging feed ala Threads**.

Desain harus memungkinkan pengunjung untuk menikmati dua jenis konten dalam satu pengalaman:

1. **Long-form content** — artikel blog yang lebih panjang dan mendalam.
2. **Short-form content** — postingan singkat, pemikiran, foto, atau update sehari-hari.

Tujuan desain adalah menciptakan website yang terasa **personal, modern, minimalis, dan profesional**, tanpa kehilangan kesan santai.

---

# 2. Design Goals

Desain harus:

- Memprioritaskan keterbacaan konten.
- Memiliki visual yang minimal dan tidak berlebihan.
- Memadukan pengalaman membaca blog dan scrolling feed.
- Menampilkan personal identity penulis.
- Tetap terlihat profesional sebagai personal branding developer.
- Memberikan perbedaan visual yang jelas antara Blog dan Threads.
- Nyaman digunakan pada desktop maupun mobile.

---

# 3. Design Direction

### Design Keywords

- Minimal
- Clean
- Modern
- Personal
- Editorial
- Calm
- Developer-oriented

### Visual Personality

Website harus terasa seperti:

> **Personal digital journal untuk seorang developer.**

Bukan corporate website dan bukan social media yang terlalu ramai.

---

# 4. Layout Structure

## Desktop Layout

Menggunakan struktur utama **three-column layout**.

```text id="ojgtxm"
┌─────────────────────────────────────────────────────────────┐
│                         HEADER                              │
├───────────────┬─────────────────────────┬───────────────────┤
│               │                         │                   │
│   LEFT        │      MAIN CONTENT       │      RIGHT        │
│   SIDEBAR     │                         │      SIDEBAR      │
│               │                         │                   │
│   Profile     │      Featured Post      │      About        │
│   Navigation  │      Latest Posts       │      Popular      │
│   Categories  │      Threads            │      Tags         │
│   Newsletter  │                         │                   │
│               │                         │                   │
└───────────────┴─────────────────────────┴───────────────────┘
│                         FOOTER                              │
└─────────────────────────────────────────────────────────────┘
```

### Recommended Proportion

- Left sidebar: ± 20–25%
- Main content: ± 45–50%
- Right sidebar: ± 25–30%

Main content harus menjadi fokus visual utama.

---

# 5. Header

Header berada di bagian paling atas halaman.

## Elements

- Website logo/name.
- Navigation.
- Search icon.
- Theme toggle.
- Subscribe button.

### Navigation

- Home
- Blog
- Threads
- Categories
- About

### Behavior

Navigation aktif harus memiliki visual indicator yang sederhana, seperti:

- Underline.
- Accent color.
- Slight font weight change.

Header harus tetap clean dan tidak terlalu tinggi.

---

# 6. Left Sidebar

Left sidebar berfungsi sebagai area untuk **personal identity dan navigation**.

## Profile Section

Menampilkan:

- Profile photo.
- Nama.
- Short description.
- Social icons.

Contoh:

**Rifki Andriyan**

Software Developer & Lifelong Learner.

I write about programming, productivity, and life.

Social icons ditampilkan secara minimal.

---

## Navigation Menu

Menu menggunakan icon dan label.

Contoh:

- Latest
- Popular
- Bookshelf
- Notes
- Archive

Active menu memiliki background yang subtle.

---

## Categories

Categories ditampilkan dalam bentuk list.

Contoh:

```text id="o4wx8s"
All                 24
Development          8
Programming          6
Productivity         4
Lifestyle            3
Tech                 3
```

Jumlah artikel menggunakan badge kecil.

---

## Newsletter

Newsletter menggunakan card sederhana.

Elements:

- Title.
- Short description.
- Email input.
- Subscribe button.

---

## Currently Reading

Menampilkan buku yang sedang dibaca.

Elements:

- Book cover.
- Book title.
- Author.
- Progress bar.

Card ini harus terasa seperti bagian dari personal journal.

---

# 7. Main Content

Main content adalah area utama untuk konten.

Urutan section:

1. Featured Post.
2. Latest Blog Posts.
3. Popular on Threads.

---

# 8. Featured Post

Featured post menjadi konten paling menonjol di halaman.

## Layout

Desktop menggunakan dua area:

```text id="zrn6pm"
┌───────────────────────────────────────┐
│                                       │
│  Category          Visual / Image     │
│                                       │
│  Article Title                        │
│                                       │
│  Description                          │
│                                       │
│  Author · Date · Reading Time         │
│                                       │
└───────────────────────────────────────┘
```

Featured post harus memiliki:

- Category label.
- Large title.
- Short description.
- Metadata.
- Visual preview.

---

# 9. Latest Blog Posts

Menampilkan daftar artikel terbaru.

Setiap post memiliki layout:

```text id="c0smkq"
┌──────────────┬─────────────────────────┐
│              │ CATEGORY                │
│   THUMBNAIL  │                         │
│              │ ARTICLE TITLE           │
│              │                         │
│              │ Short description       │
│              │                         │
│              │ Date · Reading time     │
└──────────────┴─────────────────────────┘
```

## Visual Hierarchy

Urutan perhatian:

1. Article title.
2. Thumbnail.
3. Category.
4. Description.
5. Metadata.

Card tidak boleh terlalu berat atau memiliki shadow berlebihan.

---

# 10. Threads Section

Section ini menjadi pembeda utama website dari blog biasa.

## Concept

Threads digunakan untuk konten yang lebih ringan seperti:

- Foto + caption.
- Short thoughts.
- Progress update.
- Random notes.
- Daily moments.

---

## Layout

Pada desktop, Threads ditampilkan sebagai horizontal cards.

```text id="pjlwm9"
┌───────────┐  ┌───────────┐  ┌───────────┐
│ Avatar    │  │ Avatar    │  │ Avatar    │
│ Username  │  │ Username  │  │ Username  │
│           │  │           │  │           │
│ Caption   │  │ Caption   │  │ Caption   │
│           │  │           │  │           │
│  Image    │  │  Image    │  │  Image    │
│           │  │           │  │           │
│ ♡ 💬 ↻ ↗  │  │ ♡ 💬 ↻ ↗  │  │ ♡ 💬 ↻ ↗  │
└───────────┘  └───────────┘  └───────────┘
```

Terdapat tombol:

**View all threads →**

---

# 11. Right Sidebar

Right sidebar digunakan untuk membantu discovery.

Section terdiri dari:

1. About Me.
2. Popular Posts.
3. Tags.
4. Popular Threads.
5. Moodboard.

---

# 12. About Me

Card sederhana yang menjelaskan identitas penulis.

Menampilkan:

- Title.
- Short description.
- Link ke halaman About.

Tidak perlu terlalu panjang.

---

# 13. Popular Posts

Menampilkan ranking artikel populer.

Format:

```text id="ruxuy1"
01  Article Title
    Reading time

02  Article Title
    Reading time

03  Article Title
    Reading time
```

Dapat menggunakan thumbnail kecil.

---

# 14. Tags

Tags ditampilkan menggunakan rounded pills.

Contoh:

```text id="gafyh2"
#javascript   #programming
#linux        #productivity
#coding       #minimalism
```

Style harus subtle dan tidak terlalu berwarna.

---

# 15. Popular Threads

Menampilkan beberapa Threads yang mendapatkan perhatian lebih.

Setiap item:

- Small thumbnail.
- Short caption.
- Timestamp.

Tampilan lebih compact dibandingkan feed utama.

---

# 16. Moodboard / Quote

Section ini berfungsi memberikan karakter personal pada website.

Menampilkan quote dengan typography yang lebih editorial.

Contoh:

> Focus on becoming the best version of yourself, not on proving anything to anyone.

Section ini dapat menggunakan font yang sedikit berbeda untuk memberikan visual emphasis.

---

# 17. Article Reading Experience

Halaman artikel harus memiliki layout yang lebih sederhana dibandingkan homepage.

Tujuan utama adalah:

> **Membuat pengunjung nyaman membaca.**

Layout:

```text id="opjmde"
            ARTICLE CATEGORY

          ARTICLE TITLE HERE

       Description / excerpt

    Author · Date · Reading time


          ARTICLE CONTENT

          Heading

          Paragraph...

          Code Block

          Paragraph...

          Image / Quote


          Share Article

          Related Posts
```

Area membaca tidak boleh terlalu lebar.

---

# 18. Threads Feed Experience

Halaman Threads menggunakan konsep vertical feed.

Setiap post memiliki:

- Avatar.
- Username.
- Timestamp.
- Caption.
- Image jika tersedia.
- Interaction icons.

Postingan harus terasa ringan dan cepat untuk di-scroll.

---

# 19. Visual Style

## Colors

Primary palette:

- White / off-white sebagai background.
- Dark charcoal untuk text.
- Soft gray untuk borders.
- Green sebagai accent color.

Green digunakan secara terbatas untuk:

- Active state.
- Links.
- Category.
- Primary actions.

---

## Typography

Typography harus memiliki hierarchy yang kuat.

### Heading

- Bold.
- Clean.
- Modern.
- Large spacing.

### Body

- Comfortable line height.
- Tidak terlalu kecil.
- Fokus pada readability.

---

# 20. Components

Komponen utama:

### Cards

- Rounded corners.
- Soft border.
- Minimal shadow.

### Buttons

Primary:

- Dark atau accent green.

Secondary:

- Transparent atau outline.

### Tags

- Rounded pill.
- Soft background.

### Icons

- Minimal.
- Outline style.
- Consistent stroke width.

---

# 21. Responsive Design

## Desktop

Three-column layout.

## Tablet

Menggunakan two-column layout.

Right sidebar dapat dipindahkan ke bawah main content.

## Mobile

Single-column layout.

Urutan:

1. Header.
2. Profile.
3. Featured Post.
4. Latest Posts.
5. Threads.
6. Categories.
7. Newsletter.
8. Other sections.

Sidebar berubah menjadi section biasa.

---

# 22. Interaction Design

Hover effects harus subtle.

Contoh:

- Card slightly lifts.
- Title changes color.
- Image slightly scales.
- Button changes background.

Tidak menggunakan animasi berlebihan.

---

# 23. Design Success Criteria

Desain dianggap berhasil apabila:

- Website tetap terasa minimal meskipun memiliki banyak section.
- Blog dan Threads dapat dibedakan dengan jelas.
- Pengunjung memahami bahwa ini adalah personal website.
- Artikel panjang tetap menjadi fokus utama.
- Threads memberikan kesan personal dan hidup.
- Layout nyaman untuk membaca.
- Website terlihat profesional untuk personal branding.

---

# Final Design Principle

> **A place to write deeply and share freely.**

Blog digunakan untuk pemikiran yang membutuhkan ruang.

Threads digunakan untuk hal-hal kecil yang tetap layak untuk dikenang.

Keduanya berada dalam satu website, tetapi memiliki cara konsumsi konten yang berbeda.