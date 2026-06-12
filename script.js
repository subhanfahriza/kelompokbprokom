// ============================================
// APLIKASI CARI MAKAN - MAIN SCRIPT
// ============================================

// Global Variables
let map;
let userMarker;
let restaurantMarkers = [];
let userLocation = { lat: null, lng: null };
let allRestaurants = [];
let currentResults = [];
// UNDIP center (decimal) — from provided DMS 7°2'56" LS, 110°26'17" BT
const UNDIP_CENTER = { lat: -7.048889, lng: 110.438056 };

// DOM Elements
const searchBtn = document.getElementById('search-btn');
const resetBtn = document.getElementById('reset-btn');
const resultsContainer = document.getElementById('results-container');
const locationStatus = document.getElementById('location-status');
const loadingSpinner = document.getElementById('loading-spinner');
const togglePanelBtn = document.getElementById('toggle-panel');
const leftPanel = document.querySelector('.left-panel');
const modal = document.getElementById('detail-modal');
const modalClose = document.querySelector('.modal-close');

// ============================================
// INISIALISASI APLIKASI
// ============================================

function initApp() {
    // Load data
    allRestaurants = getRestaurants();
    
    // Initialize map
    initMap();
    
    // Get user location
    getUserLocation();
    
    // Setup event listeners
    setupEventListeners();
    
    // Hide mobile panel by default
    if (window.innerWidth <= 768) {
        leftPanel.classList.remove('show');
    }
}

// ============================================
// INISIALISASI PETA
// ============================================

function initMap() {
    // Pusat peta: gunakan nilai pusat Kampus Utama Undip (UNDIP_CENTER)
    map = L.map('map').setView([UNDIP_CENTER.lat, UNDIP_CENTER.lng], 16);

    // Tambah tile layer dari OpenStreetMap
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '© OpenStreetMap contributors',
        maxZoom: 19,
        minZoom: 13
    }).addTo(map);

    // Add UNDIP marker sebagai pusat referensi
    L.marker([UNDIP_CENTER.lat, UNDIP_CENTER.lng], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            shadowAnchor: [12, 41]
        })
    }).addTo(map).bindPopup('<strong>📍 Kampus Utama Universitas Diponegoro (Undip)</strong><br/>Referensi lokasi pencarian');
}

// ============================================
// GEOLOCATION - DAPATKAN LOKASI PENGGUNA
// ============================================

function getUserLocation() {
    if (navigator.geolocation) {
        // Options untuk akurasi tinggi
        const options = {
            enableHighAccuracy: true,  // Gunakan GPS untuk akurasi maksimal
            timeout: 15000,             // Tunggu maksimal 15 detik
            maximumAge: 0               // Jangan gunakan cache lokasi
        };
        
        navigator.geolocation.getCurrentPosition(
            (position) => {
                userLocation.lat = position.coords.latitude;
                userLocation.lng = position.coords.longitude;
                
                // Cek akurasi koordinat
                const accuracy = position.coords.accuracy;
                
                // Tampilkan marker lokasi pengguna
                addUserMarker();
                
                // Update status dengan info akurasi
                const accuracyText = accuracy < 50 ? '✓ Akurat' : 
                                     accuracy < 100 ? '~ Cukup Akurat' : '? Kurang Akurat';
                updateLocationStatus(true, `Lokasi ditemukan ${accuracyText} (±${Math.round(accuracy)}m)`);
                
                // Pan map ke user location
                map.setView([userLocation.lat, userLocation.lng], 16);
            },
            (error) => {
                // Fallback ke UNDIP Tembalang
                // Set fallback ke pusat kampus utama Undip
                userLocation.lat = UNDIP_CENTER.lat;
                userLocation.lng = UNDIP_CENTER.lng;
                
                let errorMsg = 'Menggunakan lokasi default: UNDIP Tembalang';
                if (error.code === error.PERMISSION_DENIED) {
                    errorMsg = 'Izin lokasi ditolak. Buka izin di setting browser.';
                } else if (error.code === error.POSITION_UNAVAILABLE) {
                    errorMsg = 'Sinyal GPS tidak tersedia. Coba di area terbuka.';
                } else if (error.code === error.TIMEOUT) {
                    errorMsg = 'Geolocation timeout. Coba refresh halaman.';
                }
                
                console.warn('Geolocation error:', error);
                updateLocationStatus(false, errorMsg);
            },
            options  // Gunakan options dengan high accuracy
        );
    } else {
        // Fallback jika browser tidak support geolocation
        userLocation.lat = UNDIP_CENTER.lat;
        userLocation.lng = UNDIP_CENTER.lng;
        updateLocationStatus(false, 'Geolocation tidak didukung');
    }
}

// ============================================
// DEBUG / AUDIT HELPERS
// ============================================

function generateDebugTable(filters, reference = UNDIP_CENTER, referenceLabel = 'UNDIP') {
    // Remove existing debug container
    const existing = document.getElementById('debug-table-container');
    if (existing) existing.remove();

    const container = document.createElement('div');
    container.id = 'debug-table-container';
    container.style.padding = '12px';
    container.style.marginTop = '12px';
    container.style.background = '#fff3cd';
    container.style.border = '1px solid #ffeeba';
    container.style.maxHeight = '240px';
    container.style.overflow = 'auto';

    const title = document.createElement('div');
    title.style.fontWeight = '600';
    title.style.marginBottom = '8px';
    title.textContent = 'DEBUG: Audit koordinat & jarak (sementara)';
    container.appendChild(title);

    const table = document.createElement('table');
    table.style.width = '100%';
    table.style.borderCollapse = 'collapse';
    table.innerHTML = `
        <thead>
            <tr>
                <th style="border-bottom:1px solid #ccc; text-align:left; padding:4px">Name</th>
                <th style="border-bottom:1px solid #ccc; text-align:right; padding:4px">Lat</th>
                <th style="border-bottom:1px solid #ccc; text-align:right; padding:4px">Lng</th>
                <th style="border-bottom:1px solid #ccc; text-align:right; padding:4px">Dist UNDIP (m)</th>
                <th style="border-bottom:1px solid #ccc; text-align:right; padding:4px">Dist User (m)</th>
                <th style="border-bottom:1px solid #ccc; text-align:right; padding:4px">Dist Ref (${referenceLabel}) (m)</th>
                <th style="border-bottom:1px solid #ccc; text-align:center; padding:4px">Passes Filter (${referenceLabel})</th>
            </tr>
        </thead>
        <tbody></tbody>
    `;

    const tbody = table.querySelector('tbody');

    // Normalize selected distance thresholds (meters)
    const selectedThresholds = (filters.distances || []).map(d => parseInt(d));

    allRestaurants.forEach(r => {
        const distUndipKm = typeof calculateDistance === 'function'
            ? calculateDistance(UNDIP_CENTER.lat, UNDIP_CENTER.lng, r.lat, r.lng)
            : null;
        const distUserKm = (userLocation.lat && userLocation.lng && typeof calculateDistance === 'function')
            ? calculateDistance(userLocation.lat, userLocation.lng, r.lat, r.lng)
            : null;
        const distRefKm = (reference && typeof calculateDistance === 'function')
            ? calculateDistance(reference.lat, reference.lng, r.lat, r.lng)
            : null;

        const distUndipM = distUndipKm !== null ? Math.round(distUndipKm * 1000) : 'n/a';
        const distUserM = distUserKm !== null ? Math.round(distUserKm * 1000) : 'n/a';

        // Determine pass for UNDIP, User and chosen Reference using selected thresholds
        const passUndip = selectedThresholds.length === 0 ? true : selectedThresholds.some(t => distUndipKm * 1000 <= t);
        const passUser = selectedThresholds.length === 0 ? true : (distUserKm !== null && selectedThresholds.some(t => distUserKm * 1000 <= t));
        const passRef = selectedThresholds.length === 0 ? true : (distRefKm !== null && selectedThresholds.some(t => distRefKm * 1000 <= t));

        // Append row
        const tr = document.createElement('tr');
        tr.innerHTML = `
            <td style="padding:4px; border-bottom:1px solid #eee">${r.name}</td>
            <td style="padding:4px; border-bottom:1px solid #eee; text-align:right">${r.lat}</td>
            <td style="padding:4px; border-bottom:1px solid #eee; text-align:right">${r.lng}</td>
            <td style="padding:4px; border-bottom:1px solid #eee; text-align:right">${distUndipM}</td>
            <td style="padding:4px; border-bottom:1px solid #eee; text-align:right">${distUserM}</td>
            <td style="padding:4px; border-bottom:1px solid #eee; text-align:right">${distRefKm !== null ? Math.round(distRefKm*1000) : 'n/a'}</td>
            <td style="padding:4px; border-bottom:1px solid #eee; text-align:center">${passRef ? 'YES' : 'NO'}</td>
        `;
        tbody.appendChild(tr);

        // Console log each item for easy copy-paste audit
        console.log('[AUDIT]', r.name, 'lat=', r.lat, 'lng=', r.lng, 'distUNDIP(m)=', distUndipM, 'distUser(m)=', distUserM, 'distRef(m)=', distRefKm !== null ? Math.round(distRefKm*1000) : 'n/a', 'passRef=', passRef);
    });

    container.appendChild(table);

    // Place debug container below results
    const parent = document.querySelector('.left-panel .results-section') || document.body;
    parent.appendChild(container);
}

// ============================================
// TAMBAH MARKER LOKASI PENGGUNA
// ============================================

function addUserMarker() {
    if (userMarker) {
        map.removeLayer(userMarker);
    }

    userMarker = L.marker([userLocation.lat, userLocation.lng], {
        icon: L.icon({
            iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
            shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
            iconSize: [25, 41],
            iconAnchor: [12, 41],
            popupAnchor: [1, -34],
            shadowSize: [41, 41],
            shadowAnchor: [12, 41]
        })
    }).addTo(map).bindPopup('<strong>📍 Lokasi Anda</strong><br/>Posisi saat ini');

    // Add pulsing animation
    addPulseAnimation(userMarker);
}

// ============================================
// PULSE ANIMATION UNTUK MARKER
// ============================================

function addPulseAnimation(marker) {
    // Delay untuk memastikan element sudah di-render ke DOM
    setTimeout(() => {
        const element = marker._icon;
        if (element) {
            element.style.animation = 'pulse 2s infinite';
            element.style.zIndex = '1001';
            element.style.pointerEvents = 'auto';
            
            if (!document.querySelector('style[data-pulse]')) {
                const style = document.createElement('style');
                style.setAttribute('data-pulse', 'true');
                style.textContent = `
                    @keyframes pulse {
                        0%, 100% { filter: drop-shadow(0 0 0 rgba(0,0,0,0.3)); }
                        50% { filter: drop-shadow(0 0 8px rgba(255, 0, 0, 0.5)); }
                    }
                `;
                document.head.appendChild(style);
            }
        }
    }, 50);
}

// ============================================
// UPDATE LOCATION STATUS
// ============================================

function updateLocationStatus(success, message) {
    locationStatus.textContent = message;
    locationStatus.classList.remove('success', 'error');
    if (success) {
        locationStatus.classList.add('success');
    } else {
        locationStatus.classList.add('error');
    }
    
    // Hide after 3 seconds
    setTimeout(() => {
        locationStatus.style.opacity = '0.5';
    }, 3000);
}

// ============================================
// SETUP EVENT LISTENERS
// ============================================

function setupEventListeners() {
    // Search button
    searchBtn.addEventListener('click', performSearch);
    
    // Reset button
    resetBtn.addEventListener('click', resetFilters);
    
    // Toggle panel button (mobile)
    togglePanelBtn.addEventListener('click', () => {
        leftPanel.classList.toggle('show');
    });
    
    // Close modal
    modalClose.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) closeModal();
    });
    
    // Close left panel when clicking map area (mobile)
    if (window.innerWidth <= 768) {
        map.on('click', () => {
            leftPanel.classList.remove('show');
        });
    }
}

// ============================================
// FUNGSI PENCARIAN
// ============================================

function performSearch() {
    // Show loading
    loadingSpinner.classList.add('show');
    searchBtn.classList.add('loading');
    
    // Get filter values
    const filters = {
        name: document.getElementById('search-name').value,
        categories: Array.from(document.querySelectorAll('input[name="category"]:checked')).map(e => e.value),
        prices: Array.from(document.querySelectorAll('input[name="price"]:checked')).map(e => e.value),
        distances: Array.from(document.querySelectorAll('input[name="distance"]:checked')).map(e => e.value),
        locations: Array.from(document.querySelectorAll('input[name="location"]:checked')).map(e => e.value)
    };
    
    // Simulate delay for better UX
    setTimeout(() => {
            // Determine reference for distance filtering: if user selected only UNDIP location, use UNDIP_CENTER
            const selectedLocations = filters.locations || [];
            const useUndipAsReference = (selectedLocations.length === 1 && selectedLocations[0] === 'Sekitar Kampus Utama Undip');
            const reference = useUndipAsReference ? UNDIP_CENTER : userLocation;

            // Generate debug table & console logs to audit distances (with chosen reference)
            try { generateDebugTable(filters, reference, useUndipAsReference ? 'UNDIP' : 'USER'); } catch (e) { console.error('generateDebugTable error', e); }

            // Filter data using the chosen reference (UNDIP or user)
            currentResults = filterRestaurants(reference.lat, reference.lng, filters);
        
        // Display results
        displayResults(currentResults);
        
        // Update map
        updateMapMarkers(currentResults);
        
        // Hide loading
        loadingSpinner.classList.remove('show');
        searchBtn.classList.remove('loading');
    }, 500);
}

// ============================================
// TAMPILKAN HASIL
// ============================================

function displayResults(results) {
    resultsContainer.innerHTML = '';
    
    if (results.length === 0) {
        resultsContainer.innerHTML = `
            <div class="no-results">
                <i class="fas fa-inbox"></i>
                <p>Tidak ada tempat makan yang sesuai dengan filter Anda</p>
            </div>
        `;
        return;
    }
    
    results.forEach((restaurant, index) => {
        const card = createResultCard(restaurant);
        card.style.animationDelay = `${index * 0.1}s`;
        resultsContainer.appendChild(card);
    });
}

// ============================================
// BUAT RESULT CARD
// ============================================

function createResultCard(restaurant) {
    const card = document.createElement('div');
    card.className = 'result-card';
    
    // Format data
    const distance = restaurant.distanceKm < 1 
        ? Math.round(restaurant.distanceM) + ' m' 
        : restaurant.distanceKm.toFixed(2) + ' km';
    
    const price = formatPrice(restaurant.priceRange);
    const stars = generateStars(restaurant.rating);
    
    card.innerHTML = `
        <div class="card-image">
            ${restaurant.icon}
        </div>
        <div class="card-title">${restaurant.name}</div>
        <span class="card-category">${restaurant.category}</span>
        
        <div class="card-info">
            <div class="info-row">
                <i class="fas fa-map-marker-alt"></i>
                <strong>Jarak:</strong>
                <span>${distance}</span>
            </div>
            <div class="info-row">
                <i class="fas fa-tag"></i>
                <strong>Harga:</strong>
                <span>${price}</span>
            </div>
        </div>
        
        <div class="card-rating">
            <span class="stars">${stars}</span>
            <span>(${restaurant.reviews} review)</span>
        </div>
        
        <button class="card-button" onclick="showDetail(${restaurant.id})">
            <i class="fas fa-eye"></i> Lihat Detail
        </button>
    `;
    
    return card;
}

// ============================================
// UPDATE MARKER DI PETA
// ============================================

function updateMapMarkers(results) {
    // Clear existing restaurant markers
    restaurantMarkers.forEach(marker => map.removeLayer(marker));
    restaurantMarkers = [];
    
    if (results.length === 0) return;
    
    // Add markers for results
    results.forEach((restaurant, index) => {
        const marker = L.marker([restaurant.lat, restaurant.lng], {
            icon: L.icon({
                iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
                shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
                iconSize: [25, 41],
                iconAnchor: [12, 41],
                popupAnchor: [1, -34],
                shadowSize: [41, 41],
                shadowAnchor: [12, 41]
            })
        }).addTo(map);
        
        console.log('[MAP] Adding marker:', restaurant.name, 'lat=', restaurant.lat, 'lng=', restaurant.lng);
        
        // Bind popup
        const popupContent = `
            <div class="popup-title">${restaurant.name}</div>
            <div class="popup-info"><strong>Kategori:</strong> ${restaurant.category}</div>
            <div class="popup-info"><strong>Harga:</strong> ${formatPrice(restaurant.priceRange)}</div>
            <div class="popup-info"><strong>Rating:</strong> ${restaurant.rating}/5</div>
            <div class="popup-info"><strong>Alamat:</strong> ${restaurant.address}</div>
            <button class="card-button" onclick="showDetail(${restaurant.id})" style="margin-top: 8px; width: 100%;">
                Lihat Detail
            </button>
        `;
        marker.bindPopup(popupContent);
        
        // Add animation dengan delay untuk memastikan icon sudah ter-render
        setTimeout(() => {
            if (marker._icon) {
                marker._icon.style.animation = `slideIn 0.3s ease forwards`;
                marker._icon.style.animationDelay = `${index * 0.05}s`;
                marker._icon.style.zIndex = 1000 + index;
                marker._icon.style.pointerEvents = 'auto';
            }
        }, 50);
        
        restaurantMarkers.push(marker);
    });
    
    // Fit map to show all markers
    if (restaurantMarkers.length > 0) {
        const group = new L.featureGroup([userMarker, ...restaurantMarkers]);
        map.fitBounds(group.getBounds().pad(0.1));
    }
}

// ============================================
// TAMPILKAN DETAIL MODAL
// ============================================

function showDetail(restaurantId) {
    const restaurant = allRestaurants.find(r => r.id === restaurantId);
    if (!restaurant) return;
    
    const distance = restaurant.distanceKm < 1 
        ? Math.round(restaurant.distanceM) + ' m' 
        : restaurant.distanceKm.toFixed(2) + ' km';
    
    const price = formatPrice(restaurant.priceRange);
    const stars = generateStars(restaurant.rating);
    
    const html = `
        <div class="modal-image">
            ${restaurant.icon}
        </div>
        
        <h2 class="modal-title">${restaurant.name}</h2>
        <span class="modal-category">${restaurant.category}</span>
        
        <div class="modal-details">
            <div class="detail-item">
                <i class="fas fa-star"></i>
                <strong>Rating</strong>
                <span>${stars} (${restaurant.reviews} review)</span>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-map-marker-alt"></i>
                <strong>Lokasi</strong>
                <span>${restaurant.location}</span>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-road"></i>
                <strong>Alamat</strong>
                <span>${restaurant.address}</span>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-ruler"></i>
                <strong>Jarak</strong>
                <span>${distance}</span>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-tag"></i>
                <strong>Harga</strong>
                <span>${price} (per porsi)</span>
            </div>
            
            <div class="detail-item">
                <i class="fas fa-info-circle"></i>
                <strong>Deskripsi</strong>
                <span>${restaurant.description}</span>
            </div>
        </div>
        
        <div class="modal-buttons">
            <button class="modal-btn modal-btn-primary" onclick="openGoogleMaps(${restaurant.lat}, ${restaurant.lng})">
                <i class="fas fa-map"></i> Lihat di Maps
            </button>
            <button class="modal-btn modal-btn-secondary" onclick="closeModal()">
                <i class="fas fa-times"></i> Tutup
            </button>
        </div>
    `;
    
    document.getElementById('modal-body').innerHTML = html;
    modal.classList.add('show');
}

// ============================================
// BUKA GOOGLE MAPS
// ============================================

function openGoogleMaps(lat, lng) {
    const mapsUrl = `https://www.google.com/maps/?q=${lat},${lng}`;
    window.open(mapsUrl, '_blank');
}

// ============================================
// CLOSE MODAL
// ============================================

function closeModal() {
    modal.classList.remove('show');
}

// ============================================
// RESET FILTERS
// ============================================

function resetFilters() {
    // Clear all input values
    document.getElementById('search-name').value = '';
    
    // Uncheck all checkboxes
    document.querySelectorAll('input[type="checkbox"]').forEach(checkbox => {
        checkbox.checked = false;
    });
    
    // Clear results
    resultsContainer.innerHTML = `
        <div class="no-results">
            <i class="fas fa-search"></i>
            <p>Tekan tombol "Cari Tempat Makan" untuk memulai pencarian</p>
        </div>
    `;
    
    // Clear markers
    restaurantMarkers.forEach(marker => map.removeLayer(marker));
    restaurantMarkers = [];
    
    // Reset map view to user location
    map.setView([userLocation.lat, userLocation.lng], 16);
}

// ============================================
// HANDLE RESPONSIVE
// ============================================

window.addEventListener('resize', () => {
    if (window.innerWidth > 768) {
        leftPanel.classList.remove('show');
    }
});

// ============================================
// INISIALISASI SAAT LOAD
// ============================================

document.addEventListener('DOMContentLoaded', initApp);
