---
title: "Rekursif Itu Keren, Tapi Kamu Harus Tau Harganya"
date: 2025-03-07
description: "Rekursif kelihatan elegan dan pintar, tapi ada trade-off yang jarang dibahas di tutorial pemula."
category: coding
lang: "id"
tags: [cpp, rekursif, loop, programming, performance]
draft: false
---

Halo temen-temen, aku Rifki.

Ada satu momen yang bikin aku mikir panjang waktu belajar rekursif: kodenya kelihatan *indah*. Bersih, singkat, elegan, kayak programmer yang nulis itu pasti orang pinter.

```cpp
int faktorial(int n) {
    if (n <= 1) return 1;
    return n * faktorial(n - 1);
}
```

Dibanding versi loop-nya:

```cpp
int faktorial(int n) {
    int hasil = 1;
    for (int i = 1; i <= n; i++) {
        hasil *= i;
    }
    return hasil;
}
```

Yang pertama kelihatan lebih keren, kan? Tapi setelah dipikir lebih dalam, *keren* dan *benar* itu dua hal yang berbeda.

---

## Rekursif Bekerja dengan Cara yang Nggak Kelihatan

Waktu kamu nulis `faktorial(5)`, yang terjadi di balik layar bukan sekedar "function manggil dirinya sendiri."

Setiap pemanggilan function, termasuk pemanggilan rekursif, nyimpen data di **stack memory.** Informasi tentang di mana eksekusi harus balik, nilai variabel lokal, parameter yang dikirim, semua itu numpuk di stack setiap kali function dipanggil.

Untuk `faktorial(5)`, stack-nya keliatan kayak gini:

```
faktorial(5) → nunggu faktorial(4)
  faktorial(4) → nunggu faktorial(3)
    faktorial(3) → nunggu faktorial(2)
      faktorial(2) → nunggu faktorial(1)
        faktorial(1) → return 1  ← base case
      faktorial(2) → return 2
    faktorial(3) → return 6
  faktorial(4) → return 24
faktorial(5) → return 120
```

Semua itu tersimpan di stack **secara bersamaan** sampai base case tercapai. Baru setelah itu hasilnya dikembalikan satu per satu ke atas.

Loop? Dia jalan flat. Nggak ada yang numpuk di stack.

---

## Stack Overflow Bukan Cuma Nama Website

Kamu pasti tau Stack Overflow, website tanya jawab programmer. Tapi tau nggak kenapa namanya itu?

Karena **stack overflow** adalah salah satu error paling iconic di dunia programming, dan rekursif adalah penyebab paling umumnya.

Kalau rekursif nggak punya base case, atau base case-nya nggak pernah tercapai, stack terus diisi tanpa henti sampai memorinya habis. Program crash dengan error: *stack overflow.*

Ini bukan masalah teoritis. Di production code, rekursif yang salah dirancang bisa crash aplikasi yang udah berjalan bertahun-tahun, dipicu oleh input yang nggak pernah diprediksi sebelumnya.

---

## Lalu Kapan Rekursif Worth It?

Bukan berarti rekursif harus dihindari. Ada masalah yang sifatnya memang **hierarkis**, terpecah jadi sub-masalah yang sama persis dengan masalah aslinya, cuma lebih kecil.

Contoh paling nyata: **traversal folder.** Folder bisa berisi folder lain, yang bisa berisi folder lain lagi, sampai kedalaman yang nggak diketahui. Struktur itu rekursif secara alami, dan kode rekursif mencerminkan strukturnya dengan sempurna.

Contoh lain: **binary search tree**, **parsing ekspresi matematika**, **algoritma divide and conquer** seperti merge sort dan quick sort.

Di kasus-kasus itu, versi loop-nya ada, tapi jauh lebih kompleks dan susah dibaca. Trade-off antara keterbacaan dan efisiensi memori jadi worthwhile.

---

## Framework Berpikirnya

Sebelum pakai rekursif, tanya dua pertanyaan:

**Pertama, apakah masalahnya memang hierarkis?** Kalau bisa diselesaikan dengan loop biasa tanpa kehilangan keterbacaan, pakai loop.

**Kedua, seberapa dalam rekursinya bisa sampai?** Kalau inputnya bisa sangat besar, rekursif bisa jadi bom waktu yang menunggu stack overflow.

Di low level programming, ini bukan pilihan estetika. Ini engineering decision yang harus bisa kamu jelaskan dan pertanggungjawabkan.

---

## Penutup

Rekursif itu bukan tentang kelihatan pintar. Rekursif itu tentang memilih tool yang tepat untuk struktur masalah yang tepat, sambil sadar penuh akan biayanya.

Programmer yang pakai rekursif karena kelihatan keren, dan programmer yang pakai rekursif karena memang itu solusi terbaik untuk masalah itu, keduanya nulis kode yang sama. Tapi cara berpikirnya beda kelas. 🔥