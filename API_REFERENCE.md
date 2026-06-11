# 🗂️ API & Data Structure Reference

Dokumentasi lengkap API dan struktur data yang digunakan dalam aplikasi "Cari Makan UNDIP".

## 📊 Data Structure

### 1. Restaurant Object

Struktur data untuk setiap tempat makan yang disimpan dalam array `restaurantData`:

```javascript
{
  // Identifikasi
  id: number,                    // Unique ID (1-20 untuk sample data)
  name: string,                  // Nama tempat makan
  
  // Kategorisasi & Rating
  category: string,              // Kategori (lihat daftar di bawah)
  rating: number,                // Rating 0-5 (contoh: 4.5)
  reviews: number,               // Jumlah review/rating
  
  // Harga & Lokasi
  priceRange: number,            // Harga dalam IDR (contoh: 25000)
  location: string,              // Area lokasi Tembalang
  address: string,               // Alamat lengkap
  
  // Koordinat GPS
  lat: number,                   // Latitude (-7.0... untuk area Tembalang)
  lng: number,                   // Longitude (110.4... untuk area Tembalang)
  
  // Display
  icon: string,                  // Unicode emoji (contoh: "🍚")
  photo: string,                 // URL foto (untuk future use)
  description: string,           // Deskripsi singkat
  
  // Runtime (ditambah saat runtime)
  distance: number,              // Jarak dari referensi (km) - sample
  distanceKm: number,            // Jarak dari user (km) - calculated
  distanceM: number              // Jarak dari user (meter) - calculated
}
```

### 2. Filter Object

Struktur filter yang dikirim ke fungsi `filterRestaurants()`:

```javascript
{
  name: string,                  // Search text (case-insensitive)
  categories: string[],          // Selected category filters
  prices: string[],              // Selected price range filters
  distances: string[],           // Selected distance filters (dalam meter)
  locations: string[]            // Selected location filters
}
```

### 3. Map Marker Object

Struktur marker yang ditampilkan di Leaflet:

```javascript
{
  // Leaflet Marker Properties
  type: "FeatureGroup" | "Marker",
  geometry: {
    type: "Point",
    coordinates: [lng, lat]      // [longitude, latitude]
  },
  properties: {
    id: number,                  // Reference to restaurant id
    name: string,
    category: string,
    icon: string,                // Icon type (reference, user, result)
    color: string                // Marker color (blue, red, green)
  }
}
```

## 🔄 Filter Categories

### Kategori Tempat Makan
```javascript
const CATEGORIES = [
  "Warung Makan",
  "Restoran",
  "Cafe",
  "Makanan Indonesia",
  "Makanan Cepat Saji",
  "Minuman & Dessert"
];
```

### Rentang Harga
```javascript
const PRICE_RANGES = [
  { label: "< Rp10.000", value: "0-10000" },
  { label: "Rp10.000 - Rp20.000", value: "10000-20000" },
  { label: "Rp20.000 - Rp35.000", value: "20000-35000" },
  { label: "> Rp35.000", value: "35000-999999" }
];
```

### Jarak Maksimal (dalam meter)
```javascript
const DISTANCES = [
  { label: "< 500 m", value: 500 },
  { label: "< 1 km", value: 1000 },
  { label: "< 2 km", value: 2000 },
  { label: "< 5 km", value: 5000 }
];
```

### Lokasi Tembalang
```javascript
const LOCATIONS = [
  "Sekitar UNDIP",
  "Tembalang Atas",
  "Tembalang Bawah",
  "Jalan Prof. Soedarto",
  "Tirto Agung",
  "Ngesrep",
  "Bulusan"
];
```

## 📡 Public Functions

### getRestaurants()

Mengambil semua data restaurant.

```javascript
// Signature
function getRestaurants() : Array<Restaurant>

// Usage
const restaurants = getRestaurants();

// Return
[
  { id: 1, name: "Warung Nasi Kuning...", ... },
  { id: 2, name: "Restoran Seafood...", ... },
  // ... 20 items
]
```

### calculateDistance(lat1, lon1, lat2, lon2)

Menghitung jarak antara dua koordinat menggunakan Haversine formula.

```javascript
// Signature
function calculateDistance(lat1: number, lon1: number, lat2: number, lon2: number) : number

// Parameters
lat1, lon1    : User location (latitude, longitude)
lat2, lon2    : Target location (latitude, longitude)

// Usage
const distanceKm = calculateDistance(-7.0675, 110.4069, -7.0685, 110.4050);

// Return
0.1234  // Distance in kilometers

// Accuracy
// ± 10 meter untuk jarak dekat
// ± 0.1% untuk jarak jauh
```

### filterRestaurants(userLat, userLng, filters)

Filter dan sort restaurant berdasarkan kriteria.

```javascript
// Signature
function filterRestaurants(
  userLat: number, 
  userLng: number, 
  filters: FilterObject
) : Array<Restaurant>

// Parameters
userLat, userLng : User location coordinates
filters          : Object with filter criteria

// Usage
const results = filterRestaurants(-7.0675, 110.4069, {
  name: "Nasi",
  categories: ["Warung Makan"],
  prices: ["0-10000"],
  distances: ["1000"],
  locations: ["Sekitar UNDIP"]
});

// Return
[
  { id: 1, name: "Warung Nasi Kuning...", distanceKm: 0.2, ... },
  { id: 8, name: "Soto Ayam Lampir...", distanceKm: 0.35, ... }
]

// Proses Internal:
// 1. Calculate distance untuk setiap restaurant
// 2. Filter by name (case-insensitive, partial match)
// 3. Filter by selected categories (OR logic)
// 4. Filter by selected price ranges (OR logic)
// 5. Filter by selected distances (OR logic)
// 6. Filter by selected locations (OR logic)
// 7. Sort by distance ascending (terdekat dulu)
```

### formatPrice(price)

Format angka harga menjadi string IDR yang readable.

```javascript
// Signature
function formatPrice(price: number) : string

// Usage
const formatted = formatPrice(25000);

// Return
"Rp25.000"

// Examples
formatPrice(8000)       // "Rp8.000"
formatPrice(1000000)    // "Rp1.000.000"
formatPrice(9500)       // "Rp9.500"
```

### generateStars(rating)

Generate star representation untuk rating.

```javascript
// Signature
function generateStars(rating: number) : string

// Parameters
rating : Nilai rating 1-5 (bisa decimal)

// Usage
const stars = generateStars(4.5);

// Return
"★★★★½☆"

// Examples
generateStars(5)   // "★★★★★"
generateStars(4.5) // "★★★★½"
generateStars(3)   // "★★★☆☆"
generateStars(2.5) // "★★½☆☆"
generateStars(1)   // "★☆☆☆☆"
```

## 🎯 Main Application Functions

### initApp()

Inisialisasi aplikasi saat load.

```javascript
// Memanggil:
// 1. getRestaurants()    - Load data
// 2. initMap()           - Inisialisasi peta
// 3. getUserLocation()   - Get user geolocation
// 4. setupEventListeners() - Attach listeners
```

### initMap()

Inisialisasi Leaflet map.

```javascript
// Creates:
// - L.map instance
// - Base layer (OpenStreetMap)
// - UNDIP reference marker

// Default view:
// Center: -7.0675, 110.4069 (UNDIP Tembalang)
// Zoom: 15
```

### getUserLocation()

Request geolocation dari browser.

```javascript
// Success:
// - Set userLocation.lat/lng
// - Call addUserMarker()
// - Update location status

// Fallback:
// - Set userLocation ke UNDIP Tembalang
// - Show error status
```

### performSearch()

Eksekusi pencarian berdasarkan filter.

```javascript
// Flow:
// 1. Show loading spinner
// 2. Collect filter values dari form
// 3. Call filterRestaurants()
// 4. Call displayResults()
// 5. Call updateMapMarkers()
// 6. Hide loading spinner

// Delay: 500ms (untuk UX smoothness)
```

### displayResults(results)

Tampilkan hasil dalam format cards.

```javascript
// Proses:
// 1. Clear results container
// 2. Check if results empty
//    - If empty: show "no results" message
//    - If not: create card untuk setiap result
// 3. Add animation delay 100ms tiap card
```

### updateMapMarkers(results)

Update marker di peta sesuai hasil.

```javascript
// Proses:
// 1. Remove all existing result markers
// 2. For each result:
//    - Create green marker
//    - Bind popup dengan info
//    - Add animation
// 3. Fit map bounds untuk show semua markers
```

### showDetail(restaurantId)

Tampilkan modal detail tempat makan.

```javascript
// Parameter:
restaurantId : number (1-20)

// Tampilkan:
// - Foto/icon
// - Nama, kategori
// - Rating & reviews
// - Lokasi, alamat
// - Jarak, harga
// - Deskripsi
// - Tombol "Lihat di Maps"
```

### openGoogleMaps(lat, lng)

Buka Google Maps dengan lokasi tertentu.

```javascript
// URL generated:
https://www.google.com/maps/?q=LAT,LNG

// Opens di new tab
```

### resetFilters()

Reset semua filter ke state awal.

```javascript
// Proses:
// 1. Clear search input
// 2. Uncheck all checkboxes
// 3. Clear results display
// 4. Remove all map markers
// 5. Reset map view
```

## 🔌 Event Handlers

### DOM Events

```javascript
// Click Events
#search-btn click              → performSearch()
#reset-btn click               → resetFilters()
#toggle-panel click            → Toggle left panel visibility
.modal-close click             → closeModal()
.result-card click             → showDetail()
.card-button click             → showDetail()
#map click                      → Close mobile panel
.modal click (on background)   → closeModal()

// Input Events
#search-name input             → (no real-time filter, need click search)

// Window Events
resize                         → Adjust responsive layout
DOMContentLoaded              → Call initApp()
```

### Leaflet Map Events

```javascript
map.on('click')                → Close mobile panel
marker.on('click')             → Show popup

// Geolocation Events
navigator.geolocation.getCurrentPosition()
├── Success callback
└── Error callback (fallback)
```

## 🎨 Display Components

### Result Card HTML Structure

```html
<div class="result-card">
  <div class="card-image">{icon}</div>
  <div class="card-title">{name}</div>
  <span class="card-category">{category}</span>
  
  <div class="card-info">
    <div class="info-row">
      <i class="fas fa-map-marker-alt"></i>
      <strong>Jarak:</strong>
      <span>{distance}</span>
    </div>
    <div class="info-row">
      <i class="fas fa-tag"></i>
      <strong>Harga:</strong>
      <span>{price}</span>
    </div>
  </div>
  
  <div class="card-rating">
    <span class="stars">{stars}</span>
    <span>({reviews} review)</span>
  </div>
  
  <button class="card-button">Lihat Detail</button>
</div>
```

### Modal Detail HTML Structure

```html
<div id="detail-modal" class="modal">
  <div class="modal-content">
    <button class="modal-close">×</button>
    <div id="modal-body">
      <!-- Dynamic content inserted here -->
      <div class="modal-image">{icon}</div>
      <h2 class="modal-title">{name}</h2>
      <span class="modal-category">{category}</span>
      
      <div class="modal-details">
        <!-- Detail items -->
      </div>
      
      <div class="modal-buttons">
        <button class="modal-btn modal-btn-primary">
          Lihat di Maps
        </button>
        <button class="modal-btn modal-btn-secondary">
          Tutup
        </button>
      </div>
    </div>
  </div>
</div>
```

### Leaflet Popup Structure

```javascript
popupContent = `
  <div class="popup-title">${name}</div>
  <div class="popup-info"><strong>Kategori:</strong> ${category}</div>
  <div class="popup-info"><strong>Harga:</strong> ${price}</div>
  <div class="popup-info"><strong>Rating:</strong> ${rating}/5</div>
  <div class="popup-info"><strong>Alamat:</strong> ${address}</div>
  <button class="card-button">Lihat Detail</button>
`
```

## 🔐 Validation

### Input Validation

```javascript
// Search Name: String (any characters allowed)
// Max length: typically limited by HTML input

// Checkboxes: Pre-defined values
// Only values dari CATEGORIES, PRICE_RANGES, DISTANCES, LOCATIONS

// Geolocation: Latitude/Longitude
// Format: -7.0XXX to -7.1XXX (untuk area Tembalang)
//         110.4XXX (untuk area Tembalang)
```

### Filter Logic

```javascript
// Kategori: OR logic (jika multiple selected)
// - Jika dipilih "Warung Makan" dan "Restoran"
// - Return restaurants dengan kategori SALAH SATU dari keduanya

// Harga, Jarak, Lokasi: Sama dengan OR logic

// Kombinasi Filter: AND logic
// - Jika filter kategori + harga + jarak dipilih
// - Return restaurants yang match SEMUA filter
```

## 📈 Performance Metrics

### Ideal Performance
- Initial load: < 2 detik
- Search execution: < 1 detik (with 500ms delay untuk UX)
- Map interaction: < 300ms response
- Modal open: < 200ms
- Scroll smooth: 60fps

### Current Optimization
- Client-side processing (no server latency)
- Minimal DOM manipulation
- Efficient filter algorithm O(n)
- CSS animation dengan GPU acceleration

## 🚀 Extensibility Points

### Add New Restaurant
1. Edit `data.js`
2. Tambah object baru ke `restaurantData` array
3. Increment id
4. Follow struktur Restaurant Object

### Add New Filter
1. Tambah checkbox group di HTML
2. Tambah filter array di filter collection
3. Tambah filter logic di `filterRestaurants()`
4. Add CSS styling

### Add New Display Format
1. Create new component function
2. Modify `displayResults()` untuk call new component
3. Update CSS styling

### Connect to Backend
1. Modify `performSearch()` untuk fetch dari API
2. Replace `filterRestaurants()` dengan server-side processing
3. Handle async response
4. Add error handling untuk network issues

---

**API Version**: 1.0
**Last Updated**: 2026
**Compatible with**: ES6+, Modern Browsers
