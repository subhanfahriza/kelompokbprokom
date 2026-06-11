# 🚀 PANDUAN SETUP DAN MENJALANKAN APLIKASI

## ✅ Persyaratan Sistem

### Kebutuhan Minimum
- Browser modern (Chrome, Firefox, Safari, Edge tahun 2020 atau lebih baru)
- Koneksi internet (untuk CDN libraries)
- Desktop/Laptop/Mobile device
- Permission untuk akses lokasi (optional tapi disarankan)

### Sistem Operasi
- Windows 10/11+
- macOS 10.14+
- Linux (Ubuntu, Debian, dll)
- iOS 12+
- Android 8+

## 📥 Cara Mengunduh & Setup

### Opsi 1: Menjalankan Lokal (Paling Mudah)

1. **Buka folder aplikasi**
   - Ekstrak/buka folder yang berisi semua file

2. **Buka file `index.html`**
   - Klik kanan pada `index.html`
   - Pilih "Open with" → Pilih browser (Chrome, Firefox, dll)
   - **ATAU** drag file `index.html` ke browser

3. **Izinkan Geolocation**
   - Browser akan menampilkan popup permintaan lokasi
   - Klik "Izinkan" untuk akurasi maksimal

4. **Aplikasi siap digunakan!**

### Opsi 2: Menggunakan Local Server (Recommended untuk Development)

#### Windows
```powershell
# Navigasi ke folder aplikasi
cd "C:\Users\LENOVO\Downloads\TUGAS PROKOM KELOMPOK B"

# Gunakan Python (jika terinstall)
python -m http.server 8000

# Buka browser: http://localhost:8000
```

#### macOS/Linux
```bash
# Navigasi ke folder aplikasi
cd "/path/to/TUGAS PROKOM KELOMPOK B"

# Gunakan Python
python -m http.server 8000

# Atau gunakan node http-server (jika terinstall)
npx http-server

# Buka browser: http://localhost:8000
```

### Opsi 3: Upload ke Hosting (Untuk Production)

1. **Pilih hosting (free options)**:
   - Netlify: netlify.com
   - Vercel: vercel.com
   - GitHub Pages: pages.github.com

2. **Upload semua file**:
   - index.html
   - styles.css
   - script.js
   - data.js
   - README.md
   - DOKUMENTASI_TEKNIS.md
   - PANDUAN_SETUP.md

3. **Deploy dan dapatkan URL public**

## 🎮 Cara Menggunakan Aplikasi

### Step 1: Buka Aplikasi
- Buka `index.html` di browser
- Tunggu peta dan komponen UI termuat

### Step 2: Izinkan Lokasi (Optional tapi Disarankan)
```
Browser popup: "Situs ini ingin mengakses lokasi Anda"
↓
Klik "Izinkan" atau "Allow"
↓
Map akan menampilkan lokasi Anda dengan marker merah
```

Jika tidak diizinkan, aplikasi akan menggunakan pusat UNDIP Tembalang sebagai default.

### Step 3: Gunakan Filter (Semua Opsional)

#### Filter Nama
- Ketik nama tempat makan (misal: "Nasi Kuning")
- Bersifat case-insensitive
- Partial match (misal: "Nasi" akan cocok dengan "Nasi Kuning")

#### Filter Kategori
Pilih satu atau lebih:
- ☐ Warung Makan
- ☐ Restoran
- ☐ Cafe
- ☐ Makanan Indonesia
- ☐ Makanan Cepat Saji
- ☐ Minuman & Dessert

#### Filter Rentang Harga
Pilih satu atau lebih:
- ☐ < Rp10.000
- ☐ Rp10.000 - Rp20.000
- ☐ Rp20.000 - Rp35.000
- ☐ > Rp35.000

#### Filter Jarak Maksimal
Pilih satu atau lebih:
- ☐ < 500 m
- ☐ < 1 km
- ☐ < 2 km
- ☐ < 5 km

#### Filter Lokasi Tembalang
Pilih satu atau lebih:
- ☐ Sekitar UNDIP
- ☐ Tembalang Atas
- ☐ Tembalang Bawah
- ☐ Jalan Prof. Soedarto
- ☐ Tirto Agung
- ☐ Ngesrep
- ☐ Bulusan

### Step 4: Klik Tombol "Cari Tempat Makan"
- Loading spinner akan muncul
- Sistem memproses filter (~0.5 detik)
- Hasil ditampilkan dalam format card berurutan dari terdekat

### Step 5: Lihat Hasil

#### Card Result
Setiap card menampilkan:
```
┌─────────────────────────────────┐
│   Icon/Emoji Tempat Makan       │
│  Nama Tempat Makan              │
│  [Kategori Badge]               │
│  📍 Jarak: 0.2 km               │
│  💰 Harga: Rp8.000              │
│  ⭐ 4.5/5 (128 review)          │
│  [Lihat Detail Button]          │
└─────────────────────────────────┘
```

#### Map Markers
- 🔵 Marker biru: Pusat UNDIP (referensi)
- 🔴 Marker merah: Lokasi Anda (dengan pulsing animation)
- 🟢 Marker hijau: Hasil pencarian

### Step 6: Lihat Detail

#### Opsi A: Klik Card "Lihat Detail"
```
Modal popup terbuka dengan informasi lengkap:
- Nama lengkap
- Kategori
- Rating & reviews
- Lokasi area
- Alamat lengkap
- Jarak dari Anda
- Kisaran harga
- Deskripsi
- [Tombol] Lihat di Maps
- [Tombol] Tutup
```

#### Opsi B: Klik Marker di Map
```
Popup muncul di atas marker dengan:
- Nama tempat makan
- Kategori
- Harga
- Rating
- Alamat
- [Tombol] Lihat Detail
```

### Step 7: Buka di Google Maps (Optional)
- Klik tombol "Lihat di Maps"
- Google Maps akan terbuka di tab baru dengan lokasi tempat makan
- Anda bisa melihat rute, review, foto, dll

### Step 8: Reset Filter
- Untuk mencari lagi dengan filter berbeda
- Klik tombol "Reset Filter"
- Semua filter akan dihapus
- Hasil akan kembali kosong

## 📱 Mode Mobile

### Tampilan Berbeda di Mobile
- Panel filter tersembunyi (fold ke kiri)
- Map menempati layar penuh
- Tombol hamburger (☰) di kiri bawah

### Cara Menggunakan di Mobile

1. **Tap tombol hamburger (☰)** di kiri bawah
2. **Panel filter terbuka** dari sebelah kiri
3. **Gunakan filter seperti desktop**
4. **Tap tombol "Cari Tempat Makan"**
5. **Hasil ditampilkan** dengan scroll vertical
6. **Tap card untuk lihat detail**
7. **Tap area peta** untuk menutup panel filter

## 🎨 Interface Overview

### Desktop Layout
```
┌──────────────────────────────────────────────────────┐
│  Header: Cari Makan UNDIP                            │
├────────────────────┬────────────────────────────────┤
│                    │                                 │
│  Filter Panel      │    Peta Interaktif (Leaflet)   │
│  ├─ Search Name    │    ├─ Marker UNDIP             │
│  ├─ Categories     │    ├─ Marker User (merah)      │
│  ├─ Price Range    │    ├─ Marker Results (hijau)   │
│  ├─ Distance       │    └─ Zoom Controls            │
│  ├─ Location       │                                 │
│  ├─ Search Btn     │                                 │
│  ├─ Reset Btn      │                                 │
│  │                 │                                 │
│  Results:          │                                 │
│  ├─ [Result Card]  │                                 │
│  ├─ [Result Card]  │                                 │
│  └─ [Result Card]  │                                 │
│                    │                                 │
└────────────────────┴────────────────────────────────┘
```

### Mobile Layout
```
┌──────────────────────┐
│    Header            │
├──────────────────────┤
│                      │
│                      │
│   Peta (Full)        │
│                      │
│  ├─ Marker UNDIP     │
│  ├─ Marker User      │
│  └─ Marker Results   │
│                      │
│                      │
│        [☰]           │  ← Hamburger Button
│       (kiri bawah)   │
└──────────────────────┘

[Panel filter tergeser dari kiri]
```

## 🔧 Troubleshooting

### Problem: Aplikasi tidak membuka
**Solusi:**
1. Pastikan file `index.html` ada di folder yang sama dengan `.css` dan `.js`
2. Coba buka dengan browser berbeda
3. Check apakah ada error di console (F12 → Console tab)

### Problem: Peta tidak muncul
**Solusi:**
1. Periksa koneksi internet (Leaflet dari CDN)
2. Clear browser cache (Ctrl+Shift+Delete)
3. Tunggu lebih lama untuk loading
4. Buka DevTools (F12) → Network tab → lihat error CDN

### Problem: Geolocation tidak bekerja
**Solusi:**
1. Pastikan HTTPS (jika di hosting) atau localhost
2. Check permission browser: Settings → Privacy → Location
3. Izinkan akses lokasi untuk situs
4. Refresh halaman

### Problem: Filter tidak merespons
**Solusi:**
1. Pastikan minimal satu filter dipilih sebelum search
2. Refresh halaman
3. Check console untuk error (F12)

### Problem: Marker tidak muncul di map
**Solusi:**
1. Pastikan filter sudah dijalankan
2. Cek apakah ada hasil yang cocok dengan filter
3. Zoom out map untuk melihat area lebih luas
4. Refresh halaman

### Problem: Google Maps tidak terbuka
**Solusi:**
1. Browser harus allow popup (check settings)
2. Internet harus stabil
3. Pastikan koordinat valid

## 💡 Tips Penggunaan

1. **Untuk hasil terbaik**: Izinkan geolocation agar jarak dihitung akurat
2. **Filter yang efektif**: Gunakan kombinasi category + distance untuk hasil yang relevan
3. **Jika hasil terlalu banyak**: Kurangi jarak atau tambah filter kategori
4. **Jika hasil terlalu sedikit**: Perbesar jarak atau hapus beberapa filter
5. **Lihat di Maps**: Gunakan untuk navigasi atau review lengkap

## ⚙️ Pengaturan Browser (Optional)

### Untuk Performa Optimal:
1. Update browser ke versi terbaru
2. Enable JavaScript (default usually enabled)
3. Clear cache secara berkala
4. Disable ad-blocker jika ada issue

### Untuk Development:
1. Buka DevTools (F12)
2. Enable "Responsive Design Mode" (Ctrl+Shift+M)
3. Test di berbagai ukuran layar
4. Monitor Console untuk warning/error

## 📊 Data Statistics

Aplikasi sudah include 20 tempat makan sample:
- 5 Warung Makan
- 4 Restoran
- 2 Cafe
- 3 Makanan Indonesia
- 2 Makanan Cepat Saji
- 4 Minuman & Dessert

Rata-rata rating: 4.3/5 ⭐
Rentang harga: Rp7.000 - Rp50.000

## 🎓 Untuk Keperluan Akademis

### Fitur yang Didemonstrasikan:
✅ HTML5 Semantic Markup
✅ CSS3 Modern (Grid, Flexbox, Custom Properties)
✅ Vanilla JavaScript (ES6+)
✅ DOM Manipulation
✅ Event Handling
✅ Asynchronous Operations
✅ APIs (Geolocation, Browser APIs)
✅ Data Structures & Algorithms (filtering, sorting)
✅ Responsive Design
✅ UX/UI Best Practices

### Struktur Code:
- Well-organized dan commented
- Follows JavaScript best practices
- Modular function design
- Clear separation of concerns

## 📞 Kontak & Support

Jika ada pertanyaan atau issue:
1. Baca dokumentasi di README.md
2. Check DOKUMENTASI_TEKNIS.md untuk detail teknis
3. Lihat console browser untuk error messages
4. Referensi kode dengan komentar untuk penjelasan

---

**Happy Searching! Selamat mencari tempat makan terbaik! 🍽️😊**
