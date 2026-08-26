---
title: "Paradigma Pemrograman: Bukan Soal Syntax, Tapi Cara Kamu Mikir"
date: 2026-03-07
description: "Apa bedanya prosedural, OOP, dan generik? Dan kenapa pilihan paradigma itu ngaruh banget ke cara kamu solve masalah."
category: coding
lang: "id"
tags: [cpp, OOP, paradigma, pemrograman]
draft: false
---

Halo temen-temen, aku Rifki.

Waktu pertama kali denger kata *paradigma pemrograman*, aku pikir itu cuma istilah keren yang dipake dosen buat bikin slide makin terkesan penting. Tapi setelah beneran belajar C++ dan ngulik kenapa bahasa ini dirancang seperti itu, aku nyadar, paradigma itu bukan soal gaya nulis kode.

**Paradigma itu adalah cara kamu memandang sebuah masalah.**

Dan itu bedanya gede banget.

---

## Prosedural: Cara yang Paling Natural

Kalau kamu baru mulai ngoding, hampir pasti kamu nulis kode secara prosedural tanpa sadar. Langkah satu, langkah dua, langkah tiga, dari atas ke bawah, linear, kayak resep masak.

Aku sendiri waktu belajar PHP pertama kali langsung nulis kayak gini:

```php
$total = hitungTotal($pesanan);
$diskon = cekDiskon($total);
$bayar = $total - $diskon;
echo tampilStruk($bayar);
```

Itu prosedural. Jelas, mudah dibaca, dan buat program kecil, ini sempurna.

Masalahnya mulai muncul waktu programnya tumbuh.

Bayangin sistem kasir sederhana tadi berkembang: sekarang tiap produk punya supplier, supplier punya kontak, ada history transaksi per hari, ada laporan bulanan, ada sistem member. Function `hitungTotal` yang tadinya terima 2 parameter sekarang butuh 5. Perubahan di satu function merembet ke function lain. Kode yang tadinya 100 baris sekarang 1000 baris, dan semua saling bergantung.

Orang sering nyebutnya **benang kusut.** Kamu tarik satu ujung, yang lain ikut berantakan.

---

## OOP: Berpikir dengan Benda, Bukan Langkah

OOP, *Object-Oriented Programming*, hadir dengan pendekatan yang fundamentally beda.

Daripada nanya *"langkah apa yang harus dilakukan?"*, kamu mulai nanya *"benda apa yang terlibat dalam masalah ini?"*

Ambil contoh yang sama, sistem kasir. Di OOP, kamu mulai identifikasi:
- Ada **Produk**, punya nama, harga, stok
- Ada **Kasir**, bisa scan produk, hitung total
- Ada **Transaksi**, nyimpen history, bisa di-print

Tiap "benda" itu punya **data** (disebut *attribute*) dan **aksi** (disebut *method*) yang jadi tanggung jawabnya sendiri.

```cpp
class Produk {
    string nama;
    int stok;
    double harga;

    string cekStatus() { ... }   // Produk yang tau statusnya sendiri
    void kurangiStok(int qty) { ... }
};
```

Sekarang kalau ada perubahan logika produk, misalnya cara ngecek status berubah, kamu cukup buka class `Produk`. Nggak ada yang merembet ke mana-mana. Perubahan terlokalisir.

Itu yang disebut **encapsulation**, salah satu pilar utama OOP. Data dan aksinya dibungkus dalam satu tempat, dan dunia luar nggak perlu tau dalamnya ngapain.

Analoginya begini: **prosedural itu kayak dapur umum**, semua orang masak di tempat yang sama, semua bahan tercampur, kalau ada yang berantakan susah dilacak siapa yang salah. **OOP itu kayak chef station**, tiap chef punya area sendiri, bahan sendiri, tanggung jawab sendiri. Berantakan? Langsung tau siapa yang harus beresin.

---

## Generik: Tulis Sekali, Berlaku untuk Semua

Ini yang paling abstrak dari tiga paradigma, dan jujur, aku sendiri masih di awal perjalanan memahami ini.

Paradigma generik intinya adalah: **tulis logika sekali, bisa bekerja untuk tipe data apapun.**

Bayangkan function `cariNilaiTerbesar`, kenapa harus nulis versi untuk `int`, versi untuk `float`, versi untuk `double` secara terpisah kalau logikanya sama? Dengan paradigma generik, kamu tulis satu kali dan dia bisa handle semuanya.

Di C++ ini diimplementasiin lewat *template*, tapi itu topik yang butuh tulisan sendiri.

---

## Kenapa C++ Mendukung Ketiganya?

Ini yang bikin C++ unik dibanding banyak bahasa lain.

Python dan PHP lebih condong ke prosedural dan OOP. Java sangat OOP-centric. Tapi C++ membiarkan kamu milih paradigma yang paling sesuai dengan masalahnya, bahkan gabungkan ketiganya dalam satu project.

Itu powerful, tapi juga butuh kedewasaan. Kamu yang harus tau kapan pakai yang mana, dan itu nggak bisa didapat dari hafalan. Cuma bisa didapat dari pengalaman nulis kode, bikin kesalahan, dan ngerti kenapa itu salah.

---

## Penutup

Prosedural bukan jelek, OOP bukan selalu lebih baik, generik bukan harus selalu dipakai. Semuanya ada tempatnya.

Yang penting adalah kamu ngerti *kenapa* kamu pilih pendekatan tertentu, bukan karena tutorial-nya pakai itu, tapi karena kamu ngerti masalahnya dan tau paradigma mana yang paling cocok.

Itu bedanya programmer yang ngoding autopilot dan programmer yang beneran mikir. 🔥