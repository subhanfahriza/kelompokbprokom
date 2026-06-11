# 🍽️ Aplikasi Cari Makan - UNDIP Tembalang

Aplikasi web interaktif untuk mencari tempat makan di sekitar Universitas Diponegoro Tembalang, Semarang.

## 📋 Fitur Utama

### 1. **Peta Interaktif**
- Menggunakan Leaflet + OpenStreetMap untuk peta yang responsif
- Menampilkan marker untuk setiap tempat makan
- Marker lokasi pengguna dengan animasi pulse
- Popup informatif saat mengklik marker

### 2. **Geolocation**
- Sistem meminta izin lokasi pengguna otomatis
- Menampilkan posisi pengguna pada peta dengan marker merah
- Fallback ke pusat UNDIP jika geolocation tidak tersedia
- Menghitung jarak otomatis dari lokasi pengguna

### 3. **Sistem Filter Pencarian**
Pengguna dapat memfilter berdasarkan:
- **Nama tempat makan** (search bar)
- **Kategori**: Warung Makan, Restoran, Cafe, Makanan Indonesia, Makanan Cepat Saji, Minuman & Dessert
- **Rentang Harga**: < Rp10.000, Rp10.000-Rp20.000, Rp20.000-Rp35.000, > Rp35.000
- **Jarak Maksimal**: < 500m, < 1km, < 2km, < 5km
- **Lokasi Tembalang**: Sekitar UNDIP, Tembalang Atas, Tembalang Bawah, Jalan Prof. Soedarto, Tirto Agung, Ngesrep, Bulusan

### 4. **Hasil Pencarian**
- Menampilkan rekomendasi dalam format card yang menarik
- Diurutkan berdasarkan jarak terdekat
- Setiap card menampilkan:
  - Nama tempat makan
  - Kategori
  - Jarak dari pengguna
  - Kisaran harga
  - Rating bintang
  - Tombol "Lihat Detail"

### 5. **Modal Detail**
- Menampilkan informasi lengkap tempat makan:
  - Rating dan jumlah review
  - Lokasi spesifik
  - Alamat lengkap
  - Jarak dari pengguna
  - Kisaran harga
  - Deskripsi singkat
- Tombol "Lihat di Maps" untuk membuka Google Maps
- Tombol "Tutup" untuk menutup modal

### 6. **Desain Responsif**
- Desktop: Panel dua kolom (filter kiri, peta kanan)
- Tablet: Proporsi kolom disesuaikan
- Mobile: Panel filter toggle dengan tombol hamburger
- Semua elemen dioptimalkan untuk layar kecil

### 7. **Animasi & Transisi**
- Animasi smooth saat marker muncul
- Hover effect pada card hasil
- Loading spinner saat proses pencarian
- Transisi smooth antar hasil
- Pulse animation pada marker lokasi pengguna

## 🛠️ Teknologi yang Digunakan

- **Frontend**: HTML5, CSS3, Vanilla JavaScript
- **Peta**: Leaflet.js + OpenStreetMap
- **Icons**: Font Awesome 6
- **API**: Geolocation API Browser
- **Responsive Design**: CSS Flexbox & Media Queries

## 📁 Struktur File

```
TUGAS PROKOM KELOMPOK B/
├── index.html          # File HTML utama
├── styles.css          # Stylesheet lengkap
├── script.js           # Logika aplikasi utama
├── data.js             # Data tempat makan & fungsi utility
└── README.md           # Dokumentasi (file ini)
```

## 🚀 Cara Menggunakan

### Persiapan
1. Pastikan memiliki browser modern yang support:
   - Geolocation API
   - ES6 JavaScript
   - CSS Grid & Flexbox

2. Buka file `index.html` di browser (atau host di server web)

### Penggunaan Aplikasi

1. **Izin Lokasi**
   - Aplikasi akan meminta izin mengakses lokasi Anda
   - Klik "Izinkan" untuk mendapatkan akurasi pencarian terbaik
   - Jika ditolak, aplikasi akan menggunakan pusat UNDIP sebagai referensi

2. **Pilih Filter** (opsional)
   - Cari nama tempat di search bar
   - Pilih kategori yang diinginkan
   - Tentukan rentang harga
   - Atur jarak maksimal
   - Pilih area lokasi

3. **Tekan Tombol "Cari Tempat Makan"**
   - Sistem akan memproses filter
   - Hasil ditampilkan dalam bentuk card berurutan dari jarak terdekat

4. **Lihat Detail**
   - Klik tombol "Lihat Detail" pada card atau marker
   - Modal akan menampilkan informasi lengkap
   - Klik "Lihat di Maps" untuk membuka Google Maps dengan lokasi tempat makan

5. **Reset Filter**
   - Klik tombol "Reset Filter" untuk menghapus semua pilihan filter

### Mode Mobile
- Tap tombol hamburger (kiri bawah) untuk membuka panel filter
- Tap area peta untuk menutup panel filter
- Semua fungsi sama dengan desktop

## 📊 Data Tempat Makan

Aplikasi sudah menyertakan 20 tempat makan sample di sekitar UNDIP Tembalang dengan data:
- Nama tempat makan
- Kategori
- Rating dan review count
- Kisaran harga
- Lokasi spesifik
- Koordinat GPS
- Deskripsi singkat

**Catatan**: Untuk penggunaan production, gantikan data sample dengan data real dari database atau API.

## 🔧 Kustomisasi

### Menambah/Mengubah Data Tempat Makan
Edit file `data.js`, tambahkan object baru di array `restaurantData`:

```javascript
{
    id: 21,
    name: "Nama Tempat Makan",
    category: "Warung Makan",
    rating: 4.5,
    reviews: 100,
    priceRange: 25000,
    location: "Sekitar UNDIP",
    address: "Jalan Lengkap No. XX",
    lat: -7.0675,
    lng: 110.4069,
    icon: "🍚",
    distance: 0.5,
    description: "Deskripsi tempat makan"
}
```

### Mengubah Warna Tema
Edit variabel CSS di `styles.css`:

```css
:root {
    --primary-color: #4A90E2;      /* Warna utama (biru) */
    --secondary-color: #2E8B57;    /* Warna sekunder (hijau) */
    --accent-color: #FF9F43;       /* Warna aksen (oranye) */
    /* ... */
}
```

### Mengintegrasikan dengan Database Real
Ubah bagian di `script.js`:

```javascript
function performSearch() {
    // Ganti dengan fetch dari API/database
    fetch('/api/restaurants?filters=' + JSON.stringify(filters))
        .then(response => response.json())
        .then(data => {
            currentResults = data;
            displayResults(currentResults);
        });
}
```

## 📱 Kompatibilitas Browser

✅ Chrome 90+
✅ Firefox 88+
✅ Safari 14+
✅ Edge 90+
✅ Mobile Chrome & Firefox

## ⚠️ Catatan Penting

1. **Geolocation**: Aplikasi memerlukan HTTPS untuk menggunakan Geolocation API (kecuali localhost)
2. **Akses Google Maps**: Tombol "Lihat di Maps" memerlukan koneksi internet
3. **Data Real-time**: Data tempat makan dalam file ini adalah sample. Untuk data real-time, integrasikan dengan database atau API actual.
4. **Performance**: Dengan data besar (>1000 tempat), pertimbangkan untuk implement pagination atau infinite scroll.

## 🎨 UX/UI Highlights

- **Minimalis Modern**: Design clean dengan warna netral dan aksen menarik
- **Responsif**: Optimal di desktop, tablet, dan mobile
- **Intuitif**: User dapat langsung memahami cara menggunakan tanpa tutorial
- **Cepat**: Loading instant dengan UX yang smooth
- **Accessibility**: Icon dan color contrast yang baik untuk inklusivitas

## 🐛 Troubleshooting

### Peta tidak muncul
- Pastikan internet connection stabil
- Cek browser console untuk error
- Clear browser cache

### Geolocation tidak bekerja
- Periksa apakah browser menggunakan HTTPS (kecuali localhost)
- Pastikan sudah memberikan permission
- Coba reset permission di browser settings

### Filter tidak bekerja
- Refresh halaman
- Clear browser cache
- Cek console untuk JavaScript errors

## 📞 Support & Feedback

Untuk improvement atau feedback, silahkan sampaikan saran untuk:
- Tambahan fitur
- Perbaikan UI/UX
- Integrasi data real
- Performa optimization

---

**Dibuat dengan ❤️ untuk membantu mahasiswa dan masyarakat menemukan tempat makan terbaik di sekitar UNDIP Tembalang** 🎓🍽️
