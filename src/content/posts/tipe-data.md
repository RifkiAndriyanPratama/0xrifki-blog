---
title: "Tipe Data di C++: Kenapa Harus Milih-Milih?"
date: 2026-03-07
description: "Di PHP nggak pernah mikirin tipe data. Di C++ kamu dipaksa sadar bahwa setiap byte itu ada harganya."
category: coding
lang: "id"
tags: [cpp, tipe-data, low-level, memory]
draft: false
---

Halo temen-temen, aku Rifki.

Sebelum belajar C++, aku nggak pernah sekalipun mikirin tipe data secara serius. Di PHP, mau angka bulat atau desimal, mau teks pendek atau panjang, tinggal tulis aja. PHP yang urus semuanya di balik layar.

Terus aku mulai belajar C++, dan nemu hal kayak gini:

```cpp
int umur = 20;
float nilaiUjian = 87.5;
double jarakBintang = 149597870.7;
char inisial = 'R';
bool sudahMakan = true;
```

*Lah, kenapa harus spesifik banget? Kenapa nggak satu tipe aja buat semua?*

Pertanyaan itu yang akhirnya ngubah cara aku mikir soal pemrograman.

---

## PHP Nggak Gratis, Dia Cuma Nyembunyiin Biayanya

Waktu PHP otomatis ngurus tipe data, itu bukan berarti nggak ada proses yang terjadi. PHP tetap harus ngecek tipe data di runtime, konversi kalau perlu, alokasi memori sesuai kebutuhan, semua itu terjadi, cuma kamu yang nggak lihat.

C++ nggak mau nyembunyiin itu. Dia maksa kamu sadar: **setiap variabel butuh memori, dan kamu yang tentuin berapa.**

Itu bukan ribet tanpa alasan. Itu cara C++ ngajarin kamu berpikir seperti komputer.

---

## Kenapa `float` dan `double` Itu Beda Urusan

Ini yang paling sering bikin bingung pemula, dua tipe data untuk angka desimal, apa bedanya?

| | float | double |
|---|---|---|
| Ukuran | 4 byte | 8 byte |
| Presisi | ~7 digit desimal | ~15 digit desimal |
| Kecepatan | Lebih cepat | Lebih lambat |

*Lah, pake double aja terus biar aman dong?*

Coba bayangin skenario ini: kamu bikin sistem yang baca data dari sensor cuaca, 10 juta titik data per detik. Setiap titik data adalah angka desimal.

Kalau kamu pakai `double` untuk semua:
- 10.000.000 × 8 byte = **80 MB per detik**

Kalau kamu pakai `float`:
- 10.000.000 × 4 byte = **40 MB per detik**

Selisihnya 40 MB per detik. Dalam sejam, itu selisih 144 GB.

Di laptop biasa mungkin nggak kerasa. Tapi di embedded system yang memorinya cuma beberapa MB, atau di game engine yang harus proses jutaan kalkulasi per frame, atau di sistem satelit, pilihan antara `float` dan `double` itu bisa jadi perbedaan antara sistem yang jalan dan sistem yang crash.

**Kapan pakai `float`?** Kalau presisi 7 digit cukup dan kamu peduli efisiensi memori, grafis, simulasi fisika sederhana, data sensor dengan akurasi rendah.

**Kapan pakai `double`?** Kalau kamu butuh presisi tinggi, kalkulasi keuangan, koordinat GPS, perhitungan ilmiah.

---

## Modifier: Lebih Spesifik Lagi

C++ bahkan kasih kamu kontrol lebih jauh lewat *modifier* tipe data:

```cpp
unsigned int stok = 500;      // hanya positif, range lebih besar
short int umur = 20;          // lebih kecil dari int biasa
long long int populasi = 7800000000; // untuk angka sangat besar
```

`unsigned int` misalnya, karena dia nggak perlu nyimpen nilai negatif, semua bitnya bisa dipakai untuk nilai positif. Range-nya jadi dua kali lipat dari `int` biasa.

Ini mungkin kelihatan over-engineering. Tapi di sistem yang jalan bertahun-tahun dengan jutaan transaksi, keputusan kecil kayak gini yang nentuin apakah sistem tetap stabil atau mulai lemot.

---

## Yang Paling Penting: Sadar Bahwa Memori Itu Terbatas

Ini pelajaran terbesar yang aku dapet dari belajar tipe data di C++.

PHP, JavaScript, Python, mereka semua punya *garbage collector* atau mekanisme otomatis yang ngurus memori. Kamu nggak perlu mikirin itu. Nyaman? Iya. Tapi konsekuensinya kamu nggak pernah beneran ngerti apa yang terjadi di balik layar.

C++ nggak punya safety net itu. Kamu yang deklarasi, kamu yang tentuin ukurannya, dan di level yang lebih advanced, kamu yang manage sendiri kapan memorinya dibebasin.

Menyakitkan di awal. Tapi setelah terbiasa, kamu bakal ngeliatin kode PHP atau JavaScript dengan perspektif yang beda, kamu tau apa yang sebenarnya terjadi di balik semua "kemudahan" itu.

**Dan programmer yang tau apa yang terjadi di balik layar, itu yang susah digantiin.**