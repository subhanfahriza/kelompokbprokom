# 🎯 QUICK START GUIDE - Mulai dalam 5 Menit!

Panduan cepat untuk mulai menggunakan aplikasi dalam 5 menit.

## ⚡ 5 Minute Quick Start

### Menit 1-2: Setup
1. Ekstrak folder aplikasi
2. Buka `index.html` dengan double-click (atau drag ke browser)
3. Tunggu peta + UI load (biasanya < 2 detik)

### Menit 3: Izinkan Lokasi
```
Browser popup: "Allow location access?"
↓
Klik "Allow" atau "Izinkan"
↓
Peta akan menampilkan lokasi Anda (marker merah)
```

**Jika ditanya:** Kami gunakan lokasi untuk menghitung jarak akurat!

### Menit 4: Cari Tempat Makan
```
Panel Kiri:
├─ Filter Kategori: Pilih apa yang mau (misal: "Warung Makan")
├─ Filter Harga: Pilih budget (misal: "< Rp10.000")
├─ Filter Jarak: Pilih radius (misal: "< 1 km")
└─ Tombol "Cari Tempat Makan": CLICK!

Hasil:
├─ Card-card muncul di panel kiri
├─ Marker hijau muncul di peta
└─ Diurutkan dari TERDEKAT dulu
```

### Menit 5: Lihat Detail
```
Pilih salah satu card → Click "Lihat Detail"

Modal popup dengan:
├─ Nama lengkap
├─ Rating & reviews
├─ Alamat
├─ Jarak dari Anda
├─ Harga
└─ Tombol "Lihat di Maps"

Click "Lihat di Maps" → Google Maps terbuka (bisa lihat rute)
```

---

## 📸 Interface Tour

### Desktop View

```
┌─────────────────────────────────────────────────────────┐
│  🍽️ Cari Makan UNDIP                                   │
│  Temukan tempat makan terbaik di sekitar Tembalang      │
└─────────────────────────────────────────────────────────┘
┌────────────────────┬────────────────────────────────────┐
│                    │                                     │
│  FILTER PANEL      │       PETA INTERAKTIF              │
│                    │  ┌──────────────────────────────┐  │
│  🔍 Nama:          │  │                              │  │
│  ├─ Input field    │  │  📍 UNDIP (biru)            │  │
│  │                 │  │  🔴 Anda (merah, pulse)     │  │
│  🏷️ Kategori:      │  │  🟢 Hasil (hijau)           │  │
│  ├─ ☐ Warung      │  │                              │  │
│  ├─ ☐ Restoran    │  │  [+] [-] [Zoom controls]    │  │
│  ├─ ☐ Cafe        │  │                              │  │
│  └─ ...           │  └──────────────────────────────┘  │
│                    │                                     │
│  💰 Harga:        │  [Location Status]                 │
│  ├─ ☐ <10k        │  ✓ Lokasi ditemukan             │
│  ├─ ☐ 10-20k      │                                     │
│  └─ ...           │                                     │
│                    │                                     │
│  📍 Jarak:        │                                     │
│  ├─ ☐ <500m       │                                     │
│  ├─ ☐ <1km        │                                     │
│  └─ ...           │                                     │
│                    │                                     │
│  📌 Lokasi:       │                                     │
│  ├─ ☐ Sekitar     │                                     │
│  │    UNDIP        │                                     │
│  └─ ...           │                                     │
│                    │                                     │
│  [🔍 Cari]        │                                     │
│  [↺ Reset]        │                                     │
│                    │                                     │
│  📋 HASIL:        │                                     │
│  ├─ Card 1        │                                     │
│  ├─ Card 2        │                                     │
│  └─ ...           │                                     │
│                    │                                     │
└────────────────────┴────────────────────────────────────┘
```

### Mobile View

```
┌──────────────────────┐
│ 🍽️ Cari Makan UNDIP│
├──────────────────────┤
│                      │
│   PETA (Full)        │
│  ┌──────────────────┐│
│  │                  ││
│  │  🔴 Anda         ││
│  │  🟢 Hasil        ││
│  │                  ││
│  │   [+] [-]        ││
│  │                  ││
│  └──────────────────┘│
│                      │
│   [Location Status]  │
│                      │
│        [☰]           │← Click untuk filter
│     (kiri bawah)     │
└──────────────────────┘

[Geser dari kiri]
┌──────────────────────┐
│  FILTER PANEL        │ ← Keluar dari layar
│                      │
│  🔍 Nama: [...]      │
│  ☐ Warung Makan      │
│  ☐ Restoran          │
│  ...                 │
│  [🔍 Cari]           │
│  [↺ Reset]           │
│                      │
│  HASIL:              │
│  ├─ Card 1           │
│  ├─ Card 2           │
│  └─ [scroll]         │
│                      │
└──────────────────────┘
```

### Result Card Format

```
┌──────────────────────────────┐
│         🍚 (icon)            │ ← Emoji kategori
│ Warung Nasi Kuning Mbah Sarno│ ← Nama
│ [Warung Makan]               │ ← Badge kategori
│ 📍 Jarak: 0.2 km             │ ← Distance
│ 💰 Harga: Rp8.000            │ ← Price range
│ ⭐ 4.5/5 (128 reviews)       │ ← Rating
│ [Lihat Detail]               │ ← Call to action
└──────────────────────────────┘
```

### Modal Detail Format

```
┌───────────────────────────────┐
│ ×                    [modal]  │
├───────────────────────────────┤
│         🍚 (icon besar)       │
│ Warung Nasi Kuning Mbah Sarno │
│ [Warung Makan]                │
│                               │
│ ⭐ Rating: ★★★★½ (128 reviews)│
│ 📍 Lokasi: Sekitar UNDIP      │
│ 🏠 Alamat: Jl. Prof. Soedarto│
│ 📏 Jarak: 0.2 km              │
│ 💰 Harga: Rp8.000 per porsi  │
│ 📝 Deskripsi: Warung nasi...  │
│                               │
│ [Lihat di Maps] [Tutup]       │
└───────────────────────────────┘
```

---

## 🎮 Contoh Penggunaan Scenario

### Scenario 1: Mahasiswa Baru Mencari Makan Murah

```
1. Buka aplikasi
2. Izinkan lokasi
3. Di panel filter:
   - Filter Harga: Check "< Rp10.000"
   - Filter Jarak: Check "< 1 km"
4. Click "Cari Tempat Makan"
5. Hasil: Warung-warung murah terdekat
6. Click card favorit → Lihat detail
7. Click "Lihat di Maps" → Buka GPS navigasi
8. Go!
```

### Scenario 2: Makan Bareng Teman (Group Planning)

```
1. Buka aplikasi
2. Di panel filter:
   - Filter Kategori: Check "Restoran"
   - Filter Harga: Check "Rp20.000-Rp35.000"
   - Filter Lokasi: Check "Jalan Prof. Soedarto"
3. Click "Cari Tempat Makan"
4. Lihat beberapa option
5. Click "Lihat di Maps" untuk lihat rute dari lokasi teman
6. Agree pada pilihan bersama
```

### Scenario 3: Mencari Kafe untuk Belajar

```
1. Buka aplikasi
2. Izinkan lokasi (untuk hitung jarak)
3. Di panel filter:
   - Filter Kategori: Check "Cafe"
   - Filter Jarak: Check "< 2 km"
4. Click "Cari Tempat Makan"
5. Scroll hasil, baca rating & reviews
6. Click "Lihat Detail" pada kafe paling bagus
7. Check alamat & jam operasional di deskripsi
8. Click "Lihat di Maps"
```

---

## 🎯 Popular Filters Combination

### Combo 1: Budget Friendly
```
Kategori: Warung Makan
Harga: < Rp10.000
Jarak: < 500 m
```
**Hasil**: Warung makan paling murah & terdekat

### Combo 2: Date Night
```
Kategori: Restoran
Harga: > Rp35.000
Lokasi: Jalan Prof. Soedarto
```
**Hasil**: Restoran bagus untuk pacaran

### Combo 3: Study Session
```
Kategori: Cafe
Harga: Rp10.000 - Rp20.000
Jarak: < 1 km
```
**Hasil**: Kafe asik untuk belajar

### Combo 4: Quick Bite
```
Kategori: Makanan Cepat Saji
Harga: < Rp20.000
Jarak: < 500 m
```
**Hasil**: Makanan cepat terdekat

### Combo 5: Hangout Spot
```
Kategori: Minuman & Dessert
Jarak: < 2 km
Lokasi: Tembalang Atas
```
**Hasil**: Tempat nongkrong asyik

---

## 💡 Tips & Tricks

### Tip 1: Reset Cepat
- Jika hasil terlalu banyak → Click "Reset Filter" → Mulai lagi
- Lebih cepat daripada uncheck satu-satu

### Tip 2: Kombinasi Filter Efektif
- Jangan check terlalu banyak pilihan sekaligus
- Lebih baik: kategori + harga + jarak
- Hindari: semua filter sekaligus

### Tip 3: Lihat Marker di Map
- Klik marker di map → popup terbuka
- Bisa lihat detail tanpa buka modal
- Cepat & praktis

### Tip 4: Google Maps Integration
- Click "Lihat di Maps" untuk:
  - Lihat rute real
  - Lihat street view
  - Check jam buka
  - Lihat foto dari pengunjung lain

### Tip 5: Mobile Pro Tips
- Tap hamburger menu sekali → filter terbuka
- Tap map area → filter menutup (otomatis)
- Tidak perlu scroll filter, langsung cari
- Lebih cepat di mobile!

### Tip 6: No Results?
- Filter terlalu ketat?
- Try: Perbesar jarak atau hapus kategori
- Atau: Reset & search ulang tanpa filter

---

## 🆘 Common Issues Quick Fix

| Problem | Quick Fix |
|---------|-----------|
| Peta tidak muncul | Wait 3 sec atau refresh (F5) |
| Geolocation error | Allow permission popup atau allow di settings |
| Filter tidak bekerja | Pastikan check minimal 1 filter, then click search |
| Marker tidak ada | Tunggu loading selesai atau zoom out map |
| No results | Filter terlalu ketat, coba kurangi filter |
| Mobile panel stuck | Tap map area untuk close, atau refresh |
| Tombol tidak responsif | Refresh halaman (F5) |

---

## 🎓 Learning Resources

### Untuk Mahasiswa:
- Lihat code di `script.js` untuk belajar JavaScript
- Lihat CSS di `styles.css` untuk belajar responsive design
- Lihat `data.js` untuk algorithm (filtering, sorting)

### Untuk Developer:
- Baca `DOKUMENTASI_TEKNIS.md` untuk architecture
- Baca `API_REFERENCE.md` untuk API details
- Lihat code comments untuk penjelasan

### Untuk Product Manager:
- Baca `README.md` untuk feature overview
- Baca `RINGKASAN_APLIKASI.md` untuk summary

---

## ✨ Features Highlight

✅ **Lightning Fast** - No server, instant results
✅ **Privacy First** - Location only on device, no tracking
✅ **Beautiful UI** - Modern design, smooth animations
✅ **Mobile Ready** - Works perfect di semua devices
✅ **Easy to Use** - Intuitif bahkan untuk beginner
✅ **Data Rich** - 20 restaurants with full details
✅ **Extensible** - Easy to add more restaurants

---

## 🎯 Next Step?

### If you like this app:
1. Try all filter combinations
2. Explore "Lihat di Maps" feature
3. Share dengan teman
4. Read technical docs (untuk developer)
5. Suggest improvements

### Feedback untuk improvement:
- More restaurants? → Add ke data.js
- Different colors? → Edit CSS variables
- New filter? → Add checkbox + logic
- Better search? → Modify filterRestaurants()

---

## 🎉 Selesai!

You're ready to use the app! 🍽️

Enjoy finding best places to eat near UNDIP Tembalang! 😊

---

**Last Updated**: 2026
**App Version**: 1.0
**Status**: Production Ready ✨
