# 🔍 Dokumentasi Teknis - Cari Makan UNDIP

Dokumentasi lengkap untuk developer yang ingin memahami atau mengembangkan aplikasi lebih lanjut.

## 📐 Arsitektur Aplikasi

### Struktur Folder
```
project/
├── index.html         # Entry point HTML
├── styles.css         # Seluruh styling aplikasi
├── script.js          # Main application logic
├── data.js            # Data management & utilities
└── README.md          # User documentation
```

### Alur Data
```
User Input → Filter Collection → Data Filtering → 
Distance Calculation → Sorting → Results Display → 
Map Update → Modal Detail
```

## 🎯 Komponen Utama

### 1. **Peta (Leaflet)**
- **Inisialisasi**: `initMap()`
- **Lokasi Default**: UNDIP Tembalang (-7.0675, 110.4069)
- **Zoom Level**: 15 (optimal untuk area Tembalang)
- **Tile Layer**: OpenStreetMap (gratis, open source)
- **Markers**: 
  - Biru: Pusat UNDIP (referensi)
  - Merah: Lokasi pengguna (dengan pulse animation)
  - Hijau: Hasil pencarian tempat makan

### 2. **Geolocation**
```javascript
function getUserLocation()
├── navigator.geolocation.getCurrentPosition()
├── Success: Set userLocation.lat/lng
└── Fallback: Default ke UNDIP Tembalang
```

**Koordinat Format**: Latitude, Longitude (WGS84)

### 3. **Filter System**
```javascript
function filterRestaurants(userLat, userLng, filters)
├── Calculate distance
├── Filter by name
├── Filter by category
├── Filter by price
├── Filter by distance
├── Filter by location
└── Sort by distance (ascending)
```

**Filter Object Structure**:
```javascript
{
  name: "string",           // Search text
  categories: ["string"],   // Selected categories
  prices: ["min-max"],      // Price ranges
  distances: ["number"],    // Distance in meters
  locations: ["string"]     // Location areas
}
```

### 4. **Distance Calculation**
- **Formula**: Haversine formula
- **Accuracy**: ~10 meter (untuk jarak dekat)
- **Unit**: Kilometer (internal), Meter/Kilometer (display)

```javascript
function calculateDistance(lat1, lon1, lat2, lon2)
// Returns: distance in kilometers
```

## 🎨 CSS Architecture

### Variables (Custom Properties)
```css
--primary-color: #4A90E2        /* Biru - tombol, link utama */
--secondary-color: #2E8B57      /* Hijau - gradient, hover */
--accent-color: #FF9F43         /* Oranye - highlight */
--light-bg: #F5F7FA             /* Abu-abu terang - background */
--dark-text: #2C3E50            /* Abu-abu gelap - text utama */
--light-text: #7F8C8D           /* Abu-abu - text sekunder */
--border-color: #E1E8ED         /* Abu-abu lebih terang - border */
--shadow: 0 2px 8px rgba(...)   /* Shadow normal */
--shadow-lg: 0 4px 16px rgba... /* Shadow besar */
--transition: all 0.3s ease     /* Transition default */
```

### Responsive Breakpoints
- **Desktop**: > 1024px (full layout)
- **Tablet**: 768px - 1024px (adjusted proportions)
- **Mobile**: < 768px (toggle panel)
- **Small Mobile**: < 480px (optimized spacing)

### Key Animations
1. **slideIn**: Fade + slide up 300ms
2. **pulse**: 2s infinite pulse effect
3. **spin**: 1s infinite rotation (loading)
4. **smooth transitions**: 300ms untuk semua hover/active states

## 📝 JavaScript Architecture

### Global State
```javascript
let map;                    // Leaflet map instance
let userMarker;             // User location marker
let restaurantMarkers = []; // Result markers array
let userLocation = {};      // {lat, lng}
let allRestaurants = [];    // All restaurant data
let currentResults = [];    // Filtered results
```

### Key Functions

#### Initialization
```javascript
initApp()
├── Load data
├── Initialize map
├── Get user location
├── Setup event listeners
└── Hide mobile panel
```

#### Search Flow
```javascript
performSearch()
├── Collect filter values
├── Call filterRestaurants()
├── displayResults()
├── updateMapMarkers()
└── Show/hide loading state
```

#### Display Results
```javascript
displayResults(results)
├── Clear container
├── For each result:
│   └── createResultCard()
│       └── Append with delay animation
└── If empty: show "no results" message
```

#### Map Update
```javascript
updateMapMarkers(results)
├── Remove old markers
├── For each result:
│   ├── Create marker
│   ├── Bind popup
│   └── Add animation
└── Fit bounds to show all
```

## 🔌 Event Listeners

| Event | Element | Handler |
|-------|---------|---------|
| click | #search-btn | performSearch() |
| click | #reset-btn | resetFilters() |
| click | #toggle-panel | Toggle left panel |
| click | .modal-close | closeModal() |
| click | .result-card button | showDetail() |
| click | #map | Close mobile panel |
| resize | window | Adjust layout |

## 🗂️ Data Structure

### Restaurant Object
```javascript
{
  id: number,                  // Unique identifier
  name: string,                // Restaurant name
  category: string,            // Category type
  rating: float,               // 1-5 stars
  reviews: number,             // Review count
  priceRange: number,          // Average price in IDR
  location: string,            // Area location
  address: string,             // Full address
  lat: float,                  // Latitude (WGS84)
  lng: float,                  // Longitude (WGS84)
  icon: string,                // Unicode emoji
  distance: float,             // Distance from reference (km)
  photo: string,               // Photo URL (optional)
  description: string,         // Short description
  distanceKm: float,           // Calculated distance (added dynamically)
  distanceM: float             // Distance in meters (added dynamically)
}
```

### Filter Object
```javascript
{
  name: string,               // Search name
  categories: string[],       // Selected categories
  prices: string[],           // Price range selections
  distances: string[],        // Distance range selections
  locations: string[]         // Location selections
}
```

## 🎯 User Interface Flow

```
Start
  ↓
Request Geolocation
  ├─ Granted → Set user location
  └─ Denied → Use UNDIP default
  ↓
Show Map with User Marker
  ↓
User Selects Filters (optional)
  ↓
User Clicks Search Button
  ↓
Process Search (500ms delay for UX)
  ├─ Filter restaurants
  ├─ Calculate distances
  └─ Sort by proximity
  ↓
Display Results as Cards
  ↓
Update Map Markers
  ↓
User Can:
  ├─ Click Card → Show Detail Modal
  ├─ Click Map Marker → Show Popup
  ├─ Click "Lihat di Maps" → Open Google Maps
  ├─ Reset Filter → Start over
  └─ Close Modal → Back to results
```

## 🔐 Security Considerations

1. **Geolocation Data**: Lokasi pengguna hanya disimpan di memory, tidak dikirim ke server (privacy-first)
2. **No Backend**: Aplikasi berjalan 100% client-side, tidak ada server side processing
3. **Data Validation**: Input dipilih dari checkbox (tidak ada manual input untuk filter)
4. **XSS Protection**: Menggunakan textContent daripada innerHTML untuk user input

## ⚡ Performance Optimization

### Current Optimizations
- Lazy loading Leaflet library via CDN
- CSS custom properties untuk theme management
- Efficient DOM manipulation (batch updates)
- Animation delays untuk visual smoothness
- Mobile-first responsive design

### Future Improvements
1. **Pagination**: Untuk dataset besar (>100 items)
2. **Caching**: Service Worker untuk offline support
3. **Clustering**: Marker clustering untuk banyak hasil
4. **Search Debounce**: Debounce search input untuk performa
5. **Lazy Load Images**: Jika menambah foto actual

## 🧪 Testing Checklist

### Browser Testing
- [ ] Chrome desktop
- [ ] Firefox desktop
- [ ] Safari desktop
- [ ] Chrome mobile
- [ ] Firefox mobile
- [ ] Safari iOS

### Feature Testing
- [ ] Geolocation working
- [ ] Map initializing
- [ ] Filter selections working
- [ ] Search filtering correctly
- [ ] Results displaying in order
- [ ] Markers updating
- [ ] Modal showing details
- [ ] Google Maps link working
- [ ] Reset clearing all

### Responsive Testing
- [ ] Desktop (1920x1080)
- [ ] Tablet (768x1024)
- [ ] Mobile (375x667)
- [ ] Mobile landscape
- [ ] Small phone (320x568)

## 🚀 Deployment Guide

### Development
```bash
# Simply open in browser
open index.html
```

### Production
1. **Hosting Options**:
   - GitHub Pages (free, static)
   - Netlify (free, with features)
   - Vercel (free, optimized)
   - Traditional web hosting

2. **HTTPS Requirement**: Wajib untuk Geolocation API
3. **CDN**: Leaflet dan Font Awesome sudah dari CDN global
4. **No Build Process**: Tidak perlu build step

### Optimization
- Minify CSS & JavaScript untuk production
- Optimize images jika menambah foto
- Setup cache headers
- Enable gzip compression

## 📚 Dependencies

### External Libraries (via CDN)
- **Leaflet.js** v1.9.4: Interactive mapping
- **OpenStreetMap**: Free map tiles
- **Font Awesome** v6.4.0: Icons

### Browser APIs
- **Geolocation API**: User location
- **Fetch API**: Potential future API calls
- **LocalStorage**: Potential future preferences

## 🔄 Future Enhancement Ideas

1. **Backend Integration**
   - Save user preferences
   - Store favorite places
   - User ratings & reviews

2. **Features**
   - Real-time opening hours
   - Menu preview
   - Photo gallery
   - Contact & reservation
   - Payment integration

3. **Analytics**
   - Track popular searches
   - User behavior analysis
   - A/B testing

4. **Advanced Filtering**
   - By opening hours
   - By cuisine type
   - By amenities (WiFi, parking)
   - By dietary preferences

5. **Social**
   - Share results
   - Social login
   - Friends recommendations

## 📞 Support & Debugging

### Common Issues & Solutions

**Issue**: Map not loading
- Solution: Check internet, clear cache, check console errors

**Issue**: Geolocation not working
- Solution: Ensure HTTPS, check permissions, fallback to default

**Issue**: Filters not filtering
- Solution: Check filter values in console, verify data structure

**Issue**: Performance slow
- Solution: Reduce dataset, implement pagination, optimize images

### Debugging Tips
1. Open DevTools (F12)
2. Check Console for errors
3. Monitor Network tab for CDN loading
4. Use breakpoints in Sources tab
5. Check Elements for styling issues

---

**Documentation Version**: 1.0
**Last Updated**: 2026
**Author**: Development Team
