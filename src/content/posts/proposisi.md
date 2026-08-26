---
title: "Logika Proposisi: Bahasa yang Komputer Pahami Sebelum Kamu"
date: 2026-03-17
description: "Sebelum ada Python, Java, atau C++ ada logika. Dan ternyata logika itu masih hidup di setiap baris kode yang kamu tulis."
category: coding
lang: "id"
tags: [logic, mathematics, cs-fundamentals, programming]
draft: false
---

Halo temen-temen, aku Rifki.

Waktu pertama kali ketemu materi *propositional logic* di kuliah, reaksi pertamaku: *ini matematika, bukan CS.*

p, q, ∧, ∨, ¬, → kelihatannya kayak simbol-simbol yang cuma ada di buku filsafat Aristoteles. Di era AI dan cloud computing, siapa yang masih mikirin "jika p maka q"?

Ternyata jawabannya: setiap kompiler, setiap CPU, dan setiap `if` statement yang pernah kamu tulis.

---

## Proposisi Itu Apa Sebenernya?

Proposisi adalah pernyataan yang bisa dinilai **benar atau salah**, nggak ada di antaranya.

- "Langit berwarna biru" → proposisi ✓
- "Tolong tutup pintunya" → bukan proposisi ✓
- "x + 2 = 5" → belum proposisi (tergantung nilai x)

Kenapa ini penting? Karena komputer hanya bisa bekerja dengan dua nilai: **true (1) dan false (0)**. Propositional logic adalah bahasa formal yang mendeskripsikan cara kerja itu, jauh sebelum ada bahasa pemrograman, jauh sebelum ada transistor.

---

## Operator Logika dan Kembaran C++-nya

Kalau kamu udah belajar C++, kamu udah pakai propositional logic tanpa sadar:

| Logika | Simbol | C++ | Arti |
|--------|--------|-----|------|
| Konjungsi | p ∧ q | `p && q` | keduanya harus true |
| Disjungsi | p ∨ q | `p \|\| q` | salah satu cukup true |
| Negasi | ¬p | `!p` | kebalikannya |
| Implikasi | p → q | `if (p) { q }` | jika p maka q |

Setiap `if`, `while`, dan `for` yang kamu tulis adalah proposisi yang dievaluasi compiler: benar atau salah, jalan atau tidak.

---

## Tabel Kebenaran: Cara Komputer Mikir

Tabel kebenaran adalah cara enumerasi semua kemungkinan nilai dari sebuah ekspresi logika.

Ambil contoh: `p ∧ q` (p AND q)

| p | q | p ∧ q |
|---|---|-------|
| T | T | T |
| T | F | F |
| F | T | F |
| F | F | F |

Ini bukan cuma teori, ini literally yang terjadi di dalam CPU setiap kali dia mengevaluasi kondisi. Gate AND di hardware dibangun persis seperti tabel ini.

Sekarang `p ∨ q` (p OR q):

| p | q | p ∨ q |
|---|---|-------|
| T | T | T |
| T | F | T |
| F | T | T |
| F | F | F |

---

## Ekuivalensi Logika: Cara yang Berbeda, Hasil yang Sama

Dua ekspresi logika disebut **ekuivalen** kalau tabel kebenarannya identik, untuk semua kemungkinan nilai input, outputnya sama.

Notasinya: p ≡ q

Contoh paling sederhana: **Double Negation**:

> ¬(¬p) ≡ p

Negasi dari negasi adalah dirinya sendiri. Di C++: `!!p == p`. Kelihatan sepele, tapi ini fondasi dari banyak optimisasi compiler.

---

## Hukum De Morgan: Yang Paling Sering Dipake Tanpa Sadar

Ini yang paling powerful dan paling sering muncul di real code:

> **¬(p ∧ q) ≡ ¬p ∨ ¬q**
> **¬(p ∨ q) ≡ ¬p ∧ ¬q**

Dalam bahasa manusia:
- "Bukan (A dan B)" sama dengan "Bukan A, atau Bukan B"
- "Bukan (A atau B)" sama dengan "Bukan A, dan Bukan B"

Di C++, ini terlihat kayak gini:

```cpp
// Dua ekspresi ini identik:
if (!(umur >= 18 && punya_ktp)) { ... }
if (umur < 18 || !punya_ktp) { ... }
```

Kenapa ini penting di real code? Karena sering kali kita nulis kondisi yang kompleks, dan De Morgan kasih kita cara untuk **menyederhanakan atau membalik kondisi** tanpa mengubah logikanya.

Pernah nulis `if (!kondisi)` yang isinya panjang dan susah dibaca? De Morgan adalah alat untuk refactor itu jadi lebih clean.

---

## Koneksi ke Hal yang Lebih Dalam

Propositional logic bukan cuma matematika di atas kertas. Dia adalah **blueprint dari hardware komputer**.

Gate AND, OR, NOT di dalam CPU itu implementasi fisik dari operator logika. Setiap kali kamu nulis `&&` atau `||`, kamu essentially ngomong ke CPU: "jalankan gate ini dengan input ini."

Shannon, orang yang membangun fondasi teori informasi modern, menunjukkan di tahun 1937 bahwa propositional logic bisa diimplementasikan dengan sirkuit elektronik. Dari sana lahir komputer modern.

Bitwise operator yang kita bahas sebelumnya? Itu propositional logic yang diaplikasikan ke setiap bit secara paralel. `&` adalah ∧ yang bekerja pada 32 atau 64 bit sekaligus.

---

## Penutup

Propositional logic bukan materi kuliah yang bisa dilupakan setelah ujian. Dia adalah cara berpikir yang tertanam di setiap kondisi yang kamu tulis, setiap bug yang kamu debug, setiap algoritma yang kamu rancang.

Hukum De Morgan khususnya. Bukan karena dosen minta, tapi karena suatu hari kamu akan debugging kondisi yang kompleks jam 2 pagi, dan De Morgan adalah yang akan menyelamatkan kamu. 🔥