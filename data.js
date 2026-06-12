// Kampus utama Universitas Diponegoro (Undip) berlokasi di Jalan Prof. Soedarto, SH, Kecamatan Tembalang, Kota Semarang, Jawa Tengah (Kode Pos 50275). Kawasan ini berada di area dataran tinggi Semarang atas dengan luas total sekitar 1,3 juta meter persegi.
// Titik koordinat utama kampus ini adalah 7°2'56" LS dan 110°26'17" BT (decimal: -7.048889, 110.438056).

const restaurantData = [
    {
        id: 1,
        name: "Kedai Wakamsi",
        category: "Warung Makan",
        rating: 4.2,
        reviews: 176,
        priceRange: 15000,
        location: "Klentengsari",
        address: "Jl. Klentengsari No.2aa, Pedalangan, Kec. Banyumanik",
        lat: -7.0587513359031435,
        lng: 110.42709314528432,
        icon: "🍚",
        distance: 0.2,
        photo: "url(...)",
        description: "Burjo dengan rasa autentik, pelayanan cepat dan ramah. Menu lengkap dengan berbagai lauk pauk pilihan."
    },
    {
        id: 2,
        name: "Padangju Klentengsari",
        category: "Restoran",
        rating: 4.5,
        reviews: 398,
        priceRange: 20000,
        location: "Klentengsari",
        address: "Jl. Klentengsari No.2aa, Pedalangan, Kec. Banyumanik",
        lat: -7.0579765880278265,
        lng: 110.42718059956177,
        icon: "🦐",
        distance: 0.5,
        photo: "url(...)",
        description: "Restoran padang dengan berbagai pilihan lauk. Suasana nyaman untuk keluarga dan kolega."
    },
    {
        id: 3,
        name: "Warteg Mama Ros",
        category: "Warung Makan",
        rating: 4.1,
        reviews: 46,
        priceRange: 10000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Jatimulyo No 1A, Tembalang, Semarang",
        lat: -7.058453015870806,
        lng: 110.43518753061824,
        icon: "☕",
        distance: 0.8,
        photo: "url(...)",
        description: "Cafe cozy dengan berbagai minuman premium, kopi specialty, dan pastry lezat. Cocok untuk bekerja dan bersantai."
    },
    {
        id: 4,
        name: "Mie Ayam Palembang AFUI",
        category: "Warung Makan",
        rating: 4.2,
        reviews: 531,
        priceRange: 20000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Banyu Putih Raya No. 14, Tembalang",
        lat: -7.05319043939963,
        lng:  110.43219589923636,
        icon: "🍜",
        distance: 0.3,
        photo: "url(...)",
        description: "Mie ayam dengan cita rasa khas, telur matang, dan topping lengkap. Porsi besar dengan harga terjangkau."
    },
    {
        id: 5,
        name: "Tanjungsari Chinese Food",
        category: "Restoran",
        rating: 4.4,
        reviews: 366,
        priceRange: 15000,
        location: "Ngesrep",
        address: "Jl. Tj. Sari VIII, Sumurboto, Kec, Banyumanik",
        lat: -7.054976723330281,
        lng:  110.42415859832408,
        icon: "🍛",
        distance: 1.2,
        photo: "url(...)",
        description: "Restoran Padang dengan menu tradisional, berbagai masakan rumahan, dan cita rasa autentik Minangkabau."
    },
    {
        id: 6,
        name: "OTI Fried Chicken Ngesrep",
        category: "Makanan Cepat Saji",
        rating: 4.6,
        reviews: 356,
        priceRange: 20000,
        location: "Ngesrep",
        address: "Jl. Prof. Soedarto No.56, Sumurboto, Kec. Banyumanik",
        lat: -7.050350458054578,
        lng: 110.42363371492753,
        icon: "🍗",
        distance: 0.4,
        photo: "url(...)",
        description: "Restoran cepat saji dengan menu ayam goreng, burger, dan minuman. Tempat duduk luas dan A/C nyaman."
    },
    {
        id: 7,
        name: "Warung Penyet Sami Seneng",
        category: "Warung Makan",
        rating: 4.5,
        reviews: 334,
        priceRange: 20000,
        location: "Baskoro",
        address: "Jl. Baskoro Raya, Tembalang",
        lat: -7.054753947699224,
        lng:  110.437065809427,
        icon: "🧋",
        distance: 1.5,
        photo: "url(...)",
        description: "Kedai minuman dengan berbagai pilihan boba tea, jus segar, dan dessert menarik. Ambiance Instagram-worthy."
    },
    {
        id: 8,
        name: "Masa Ria",
        category: "Warung Makan",
        rating: 4.5,
        reviews: 435,
        priceRange: 25000,
        location: "Mulawarman",
        address: "Jl. Mulawarman Raya No.3, Pedalangan, Kec. Banyumanik",
        lat: -7.068700570057105,
        lng: 110.43652948134167,
        icon: "🥣",
        distance: 0.35,
        photo: "url(...)",
        description: "Soto ayam tradisional dengan kaldu kaya rasa, ayam lembut, dan sambal nikmat. Sarapan favorit mahasiswa."
    },
    {
        id: 21,
        name: "Ayam Geprek Maestro",
        category: "Warung Makan",
        rating: 4.4,
        reviews: 167,
        priceRange: 22000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Gerung Sari 1C, Kelurahan Bulusan, Kecamatan Tembalang, Semarang (Belakang Rusunawa UNDIP)",
        lat: -7.05643051229876,
        lng: 110.44361306068305,
        icon: "🍗",
        distance: 2.0,
        photo: "url(...)",
        description: "Ayam geprek premium dengan cita rasa autentik, daging empuk bersama sambal yang menggugah selera. Tersedia berbagai pilihan level pedas dan topping pelengkap. Cocok untuk makan siang atau makan malam dengan harga terjangkau."
    }
];

// Fungsi untuk mengambil data
function getRestaurants() {
    return restaurantData;
}

// Fungsi validasi koordinat
function validateCoordinate(lat, lng) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

// Fungsi untuk menghitung jarak antara dua koordinat (Haversine formula dengan akurasi tinggi)
function calculateDistance(lat1, lon1, lat2, lon2) {
    // Validasi input
    if (!validateCoordinate(lat1, lon1) || !validateCoordinate(lat2, lon2)) {
        console.error('Koordinat tidak valid:', {lat1, lon1, lat2, lon2});
        return 0;
    }
    
    const R = 6371; // Radius Bumi dalam km (nilai presisi)
    
    // Convert ke radian dengan presisi tinggi
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    // Haversine formula
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    // Return jarak dalam km
    return R * c;
}

// Fungsi untuk filter dan sort data
function filterRestaurants(userLat, userLng, filters) {
    // Validasi lokasi user
    if (!validateCoordinate(userLat, userLng)) {
        console.error('Lokasi pengguna tidak valid');
        return [];
    }
    
    let results = restaurantData.slice();

    // Calculate distance for each restaurant dengan presisi tinggi
    results.forEach(restaurant => {
        const distance = calculateDistance(userLat, userLng, restaurant.lat, restaurant.lng);
        restaurant.distanceKm = parseFloat(distance.toFixed(3)); // Presisi 3 desimal
        restaurant.distanceM = Math.round(restaurant.distanceKm * 1000); // Pembulatan ke meter terdekat
    });

    // Filter berdasarkan nama
    if (filters.name && filters.name.trim() !== '') {
        results = results.filter(r => r.name.toLowerCase().includes(filters.name.toLowerCase()));
    }

    // Filter berdasarkan kategori
    if (filters.categories && filters.categories.length > 0) {
        results = results.filter(r => filters.categories.includes(r.category));
    }

    // Filter berdasarkan harga
    if (filters.prices && filters.prices.length > 0) {
        results = results.filter(r => {
            return filters.prices.some(price => {
                const [min, max] = price.split('-').map(Number);
                return r.priceRange >= min && r.priceRange <= max;
            });
        });
    }

    // Filter berdasarkan jarak
    if (filters.distances && filters.distances.length > 0) {
        results = results.filter(r => {
            return filters.distances.some(distance => {
                return r.distanceM <= parseInt(distance);
            });
        });
    }

    // Filter berdasarkan lokasi
    if (filters.locations && filters.locations.length > 0) {
        results = results.filter(r => filters.locations.includes(r.location));
    }

    // Sort berdasarkan jarak terdekat
    results.sort((a, b) => a.distanceKm - b.distanceKm);

    return results;
}

// Fungsi untuk format harga
function formatPrice(price) {
    return 'Rp' + price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
}

// Fungsi untuk generate stars
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const hasHalfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (hasHalfStar) stars += '½';
    return stars + '☆'.repeat(5 - Math.ceil(rating));
}
