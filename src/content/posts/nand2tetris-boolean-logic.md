---
title: "NAND Doang, Semua Jadi Ada: Catatan Night 1 Belajar Nand2Tetris"
date: 2026-08-15
description: "Kenapa satu gerbang logika paling sederhana bisa jadi fondasi seluruh sistem komputer, dan kenapa HDL bikin otakku harus di-reset dulu."
category: notes
tags: [nand2tetris, boolean-logic, digital-logic, hdl, low-level]
draft: false
---

Halo temen-temen, aku Rifki.

Beberapa waktu lalu aku mulai Nand2Tetris, terus berhenti di tengah jalan karena bosen. Konsepnya kelewat abstrak buat langsung dicerna: gerbang logika, boolean algebra, kelihatannya jauh banget dari "hasil nyata" yang biasa kerasa pas ngoding web.

Malam ini aku coba lagi, dan ternyata masalahnya bukan materinya susah. Masalahnya aku loncat ke halaman berikutnya sebelum bener-bener paham halaman sebelumnya. Begitu dipelanin, semuanya nyambung sendiri.

---

## Kenapa NAND Doang yang Dipakai?

Chapter 1 Nand2Tetris maksa kamu bangun semua gerbang logika, AND, OR, NOT, XOR, cuma dari satu gerbang: **NAND**. Reaksi pertamaku: kok muter-muter, kenapa gak langsung pakai AND aja kalau emang butuh AND?

Ternyata ini soal **functional completeness**. NAND punya sifat matematis unik: kombinasinya bisa mensimulasikan gerbang logika apapun. Ini bukan sekadar latihan konseptual doang, di level fisik (CMOS), NAND cuma butuh 4 transistor, sementara AND butuh 6 (4 buat NAND-nya + 2 buat inverter tambahan). Jadi NAND itu justru paling murah diproduksi, bukan paling boros kayak dugaan awalku.

Konstruksi NOT dari NAND itu paling simpel, kabel A digabung jadi satu masuk ke kedua input NAND:

```hdl
CHIP Not {
    IN a;
    OUT out;
    PARTS:
    Nand(a=a, b=a, out=out);
}
```

AND tinggal NOT-in hasil NAND (karena AND = NOT dari NAND):

```hdl
CHIP And {
    IN a, b;
    OUT out;
    PARTS:
    Nand(a=a, b=b, out=nandOut);
    Not(in=nandOut, out=out);
}
```

Yang paling menarik itu OR, dibangun pakai **hukum De Morgan**: `A OR B` secara logis sama persis dengan `NOT(NOT A AND NOT B)`. Jadi tinggal susun 3 NAND, dua buat negasi masing-masing input, satu lagi buat gabungin.

Awalnya aku maksa diri buat "ngeliat langsung" kenapa itu bisa sama, dan malah tambah bingung. Ternyata gak masalah kalau harus itung manual pakai truth table dulu buat percaya, itu bukan tanda belum paham, itu memang cara yang benar buat verifikasi.

---

## Half Adder: Kenapa Cuma Bisa 2 Bit

Bagian yang paling lama nyantol di kepalaku itu half adder. Awalnya aku kira "half" itu soal jumlah bit yang bisa diproses. Ternyata bukan.

Coba jumlahin manual `1 + 1` dalam biner:

```
  1
+ 1
---
 10
```

Hasilnya dua bagian: **sum** (digit paling kanan, hasilnya 0) dan **carry** (yang "meluap" ke posisi kiri, hasilnya 1). Half adder itu sirkuit yang ngitung dua-duanya sekaligus, dari 2 input A dan B:

| A | B | Sum | Carry |
|---|---|-----|-------|
| 0 | 0 | 0 | 0 |
| 0 | 1 | 1 | 0 |
| 1 | 0 | 1 | 0 |
| 1 | 1 | 0 | 1 |

Pola kolom Sum itu persis truth table XOR. Pola kolom Carry itu persis truth table AND. Jadi:

```
Sum   = XOR(A, B)
Carry = AND(A, B)
```

Masalahnya muncul begitu kamu jumlahin angka lebih dari 1 bit. Di posisi bit kedua dan seterusnya, yang perlu dijumlahin bukan cuma A dan B, tapi ada tambahan **carry titipan** dari posisi bit sebelumnya. Half adder cuma punya 2 slot input, gak ada tempat buat carry titipan itu, jadi kalau dipaksa dipakai di posisi kedua, carry-nya ilang begitu aja dan hasilnya salah.

Solusinya **full adder**, punya 3 input (A, B, carry-in), dua output (sum, carry-out). Carry-out satu posisi jadi carry-in posisi berikutnya, berantai terus. Aturannya simpel: posisi bit paling kanan pakai half adder (karena belum ada carry titipan dari mana pun), sisanya pakai full adder.

Bukan soal "half adder cuma kuat 2 bit", tapi soal **half adder gak punya slot buat carry titipan**, jadi cuma cocok dipakai di satu posisi doang, yang paling kanan.

---

## Bit, Byte, dan Kenapa Linux Pakai MiB Bukan MB

Selingan kecil pas ngobrolin ukuran storage. Ternyata banyak yang gak sadar ini dua sistem hitung yang beda:

- **MB** (decimal), kelipatan 1000, dipakai produsen hardware buat marketing
- **MiB** (binary), kelipatan 1024 (karena 2¹⁰), dipakai OS karena itu representasi jujur sesuai cara kerja hardware yang basisnya 2

Makanya pas beli SSD 500GB terus dicek di OS keliatan cuma ~465GiB, itu bukan hilang, cuma beda cara ngitung. Linux (`df -h` misalnya) sengaja pakai MiB/GiB karena itu yang sesuai realita teknis, bukan angka marketing.

---

## HDL Itu Bukan Bahasa Pemrograman Biasa

Ini yang paling bikin otakku harus di-reset. Aku udah biasa sama PHP, Python, C++, C, yang semuanya **imperative**, nulis instruksi berurutan, ada if/else, ada function call yang eksekusi baris demi baris.

HDL itu **deskriptif**. Kamu bukan nulis instruksi, tapi ndeskripsiin gimana komponen disambung jadi satu sirkuit. Gak ada "urutan eksekusi" sama sekali, karena di hardware asli, semua komponen jalan **serentak**, bukan gantian.

```hdl
Not(in=nandOut, out=out);
```

Baris ini bukan "manggil fungsi Not dengan argumen nandOut". Ini lebih kayak nyambungin kabel HDMI dari laptop ke monitor, kabel `nandOut` disambung ke input chip `Not`, kabel `out` disambung ke output-nya. Begitu ada sinyal masuk, langsung ke-propagate serentak lewat semua kabel yang nyambung, gak ada proses "tunggu selesai dulu".

Kesalahan pertamaku waktu nyoba nulis `And.hdl`: manggil chip `And` di dalam definisi `And` itu sendiri, persis kayak fungsi Python yang manggil dirinya sendiri tanpa base case, infinite recursion. HDL gak beda soal ini, chip yang lagi kamu bangun belum ada, jadi gak bisa dipakai buat bangun dirinya sendiri.

---

## Hierarki yang Akhirnya Kelihatan

Satu hal yang bikin semuanya kerasa nyambung malam ini: Boolean logic dan arithmetic itu **teori matematika murni**, gak ada kaitan sama hardware. Gerbang logika (NAND, AND, OR) itu **implementasi fisik pertama** dari teori itu. Sirkuit aritmatika (half adder, full adder) itu implementasi fisik dari teori arithmetic. Dan ALU, nanti di project berikutnya, itu satu chip besar yang gabungin semuanya, bisa milih mau jalanin operasi logika atau aritmatika, tergantung sinyal kontrol.

Tiap level dibangun dari level sebelumnya. Baru kerasa masuk akal kenapa Nand2Tetris maksa mulai dari yang paling remeh dulu, gerbang NAND doang, sebelum boleh megang apapun yang lebih tinggi.

---

## Penutup

Ini baru night 1, belum sampai nulis semua file HDL-nya secara lengkap. Tapi bedanya kerasa jauh dibanding percobaan pertama dulu yang berhenti di tengah jalan. Kuncinya ternyata bukan "materinya susah", tapi jangan buru-buru pindah topik sebelum konsep sebelumnya bener-bener nempel.

Lanjut nulis `Not.hdl`, `And.hdl`, `Or.hdl`, `Xor.hdl` beneran abis ini. Semoga besok progress-nya nambah, bukan malah lupa lagi. 🔥
