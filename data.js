// Kampus utama Universitas Diponegoro (Undip) berlokasi di Jalan Prof. Soedarto, SH, Kecamatan Tembalang, Kota Semarang, Jawa Tengah (Kode Pos 50275). Kawasan ini berada di area dataran tinggi Semarang atas dengan luas total sekitar 1,3 juta meter persegi.
// Titik koordinat utama kampus ini adalah 7°2'56" LS dan 110°26'17" BT (decimal: -7.048889, 110.438056).

const restaurantData = [
    {
        id: 1,
        name: "Warung Nasi Kuning Mbah Sarno",
        category: "Warung Makan",
        rating: 4.5,
        reviews: 128,
        priceRange: 8000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Prof. Soedarto SH, Tembalang",
        lat: -7.0675,
        lng: 110.4069,
        icon: "🍚",
        distance: 0.2,
        photo: "url(...)",
        description: "Warung nasi kuning dengan rasa autentik, pelayanan cepat dan ramah. Menu lengkap dengan berbagai lauk pauk pilihan."
    },
    {
        id: 2,
        name: "Restoran Seafood Nikmat",
        category: "Restoran",
        rating: 4.7,
        reviews: 245,
        priceRange: 45000,
        location: "Jalan Prof. Soedarto",
        address: "Jl. Prof. Soedarto No. 123, Tembalang",
        lat: -7.0685,
        lng: 110.4050,
        icon: "🦐",
        distance: 0.5,
        photo: "url(...)",
        description: "Restoran seafood premium dengan berbagai pilihan ikan segar dan udang. Suasana nyaman untuk keluarga dan kolega."
    },
    {
        id: 3,
        name: "Cafe Tembalang Indah",
        category: "Cafe",
        rating: 4.3,
        reviews: 187,
        priceRange: 25000,
        location: "Tembalang Atas",
        address: "Jl. Tembalang No. 45, Semarang",
        lat: -7.0620,
        lng: 110.4100,
        icon: "☕",
        distance: 0.8,
        photo: "url(...)",
        description: "Cafe cozy dengan berbagai minuman premium, kopi specialty, dan pastry lezat. Cocok untuk bekerja dan bersantai."
    },
    {
        id: 4,
        name: "Warung Mie Ayam Cabe Rawit",
        category: "Warung Makan",
        rating: 4.4,
        reviews: 156,
        priceRange: 10000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Pendidikan, Tembalang",
        lat: -7.0700,
        lng: 110.4080,
        icon: "🍜",
        distance: 0.3,
        photo: "url(...)",
        description: "Mie ayam dengan cita rasa khas, telur matang, dan topping lengkap. Porsi besar dengan harga terjangkau."
    },
    {
        id: 5,
        name: "Restoran Padang Rasa Sabar",
        category: "Makanan Indonesia",
        rating: 4.2,
        reviews: 198,
        priceRange: 15000,
        location: "Tembalang Bawah",
        address: "Jl. Bulusan No. 67, Tembalang",
        lat: -7.0750,
        lng: 110.4120,
        icon: "🍛",
        distance: 1.2,
        photo: "url(...)",
        description: "Restoran Padang dengan menu tradisional, berbagai masakan rumahan, dan cita rasa autentik Minangkabau."
    },
    {
        id: 6,
        name: "KFC Tembalang",
        category: "Makanan Cepat Saji",
        rating: 4.0,
        reviews: 312,
        priceRange: 35000,
        location: "Jalan Prof. Soedarto",
        address: "Jl. Prof. Soedarto, Tembalang",
        lat: -7.0660,
        lng: 110.4060,
        icon: "🍗",
        distance: 0.4,
        photo: "url(...)",
        description: "Restoran cepat saji dengan menu ayam goreng, burger, dan minuman. Tempat duduk luas dan A/C nyaman."
    },
    {
        id: 7,
        name: "Boba Tea Tembalang Premium",
        category: "Minuman & Dessert",
        rating: 4.6,
        reviews: 267,
        priceRange: 20000,
        location: "Tirto Agung",
        address: "Jl. Tirto Agung, Tembalang",
        lat: -7.0590,
        lng: 110.4140,
        icon: "🧋",
        distance: 1.5,
        photo: "url(...)",
        description: "Kedai minuman dengan berbagai pilihan boba tea, jus segar, dan dessert menarik. Ambiance Instagram-worthy."
    },
    {
        id: 8,
        name: "Soto Ayam Lampir Mak Tini",
        category: "Warung Makan",
        rating: 4.3,
        reviews: 142,
        priceRange: 12000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Pendidikan, Tembalang",
        lat: -7.0680,
        lng: 110.4090,
        icon: "🥣",
        distance: 0.35,
        photo: "url(...)",
        description: "Soto ayam tradisional dengan kaldu kaya rasa, ayam lembut, dan sambal nikmat. Sarapan favorit mahasiswa."
    },
    {
        id: 9,
        name: "McDonald's Tembalang",
        category: "Makanan Cepat Saji",
        rating: 3.9,
        reviews: 289,
        priceRange: 40000,
        location: "Jalan Prof. Soedarto",
        address: "Jl. Prof. Soedarto No. 100, Tembalang",
        lat: -7.0670,
        lng: 110.4075,
        icon: "🍔",
        distance: 0.45,
        photo: "url(...)",
        description: "Restoran burger dengan menu lengkap, delivery cepat, dan tempat makan bersih. Drive-thru tersedia."
    },
    {
        id: 10,
        name: "Warung Bakso Boyo",
        category: "Warung Makan",
        rating: 4.4,
        reviews: 176,
        priceRange: 11000,
        location: "Tembalang Atas",
        address: "Jl. Tembalang Atas No. 12, Semarang",
        lat: -7.0610,
        lng: 110.4110,
        icon: "🍲",
        distance: 0.9,
        photo: "url(...)",
        description: "Bakso dengan kuah gurih, daging empuk, dan mie lembut. Suplemen bumbu dan sambal tersedia."
    },
    {
        id: 11,
        name: "Grill House Tembalang",
        category: "Restoran",
        rating: 4.5,
        reviews: 203,
        priceRange: 50000,
        location: "Ngesrep",
        address: "Jl. Ngesrep, Tembalang",
        lat: -7.0540,
        lng: 110.4180,
        icon: "🥩",
        distance: 2.1,
        photo: "url(...)",
        description: "Restoran barbeque premium dengan berbagai pilihan daging pilihan dan side dish lezat. Cocok untuk acara spesial."
    },
    {
        id: 12,
        name: "Warung Tahu Goreng Cemplon",
        category: "Warung Makan",
        rating: 4.2,
        reviews: 134,
        priceRange: 9000,
        location: "Bulusan",
        address: "Jl. Bulusan No. 34, Tembalang",
        lat: -7.0820,
        lng: 110.4150,
        icon: "🟫",
        distance: 2.0,
        photo: "url(...)",
        description: "Tahu goreng renyah dengan bumbu khas, isinya empuk, dan dihidangkan dengan sambal ulek pedas nikmat."
    },
    {
        id: 13,
        name: "Martabak Mesir Asli Tembalang",
        category: "Minuman & Dessert",
        rating: 4.3,
        reviews: 98,
        priceRange: 15000,
        location: "Jalan Prof. Soedarto",
        address: "Jl. Prof. Soedarto, Tembalang",
        lat: -7.0675,
        lng: 110.4070,
        icon: "🥞",
        distance: 0.2,
        photo: "url(...)",
        description: "Martabak premium dengan varian rasa lengkap, isi melimpah, dan tekstur renyah. Pesanan take-away tersedia."
    },
    {
        id: 14,
        name: "Ayam Betutu Bali Tembalang",
        category: "Makanan Indonesia",
        rating: 4.4,
        reviews: 167,
        priceRange: 30000,
        location: "Tirto Agung",
        address: "Jl. Tirto Agung No. 88, Tembalang",
        lat: -7.0580,
        lng: 110.4160,
        icon: "🍗",
        distance: 1.6,
        photo: "url(...)",
        description: "Ayam betutu autentik dengan bumbu tradisional Bali, empuk dan lezat. Paket untuk keluarga tersedia."
    },
    {
        id: 15,
        name: "Jus Buah Segar Tembalang",
        category: "Minuman & Dessert",
        rating: 4.1,
        reviews: 145,
        priceRange: 12000,
        location: "Sekitar Kampus Utama Undip",
        address: "Jl. Pendidikan, Tembalang",
        lat: -7.0695,
        lng: 110.4085,
        icon: "🧃",
        distance: 0.3,
        photo: "url(...)",
        description: "Jus buah segar dengan berbagai pilihan kombinasi, tanpa pewarna, dan menggunakan buah berkualitas tinggi."
    },
    {
        id: 16,
        name: "Pasta Italia Tembalang",
        category: "Restoran",
        rating: 4.4,
        reviews: 189,
        priceRange: 45000,
        location: "Tembalang Atas",
        address: "Jl. Tembalang No. 99, Semarang",
        lat: -7.0615,
        lng: 110.4105,
        icon: "🍝",
        distance: 0.85,
        photo: "url(...)",
        description: "Restoran Italia dengan menu pasta autentik, pizza, dan minuman wine. Chef berpengalaman internasional."
    },
    {
        id: 17,
        name: "Warung Es Cendol Ulek",
        category: "Minuman & Dessert",
        rating: 4.2,
        reviews: 112,
        priceRange: 7000,
        location: "Tembalang Bawah",
        address: "Jl. Bulusan, Tembalang",
        lat: -7.0765,
        lng: 110.4135,
        icon: "🥤",
        distance: 1.3,
        photo: "url(...)",
        description: "Es cendol tradisional dengan santan kental, gula merah cair, dan cendol halus. Dingin dan menyegarkan."
    },
    {
        id: 18,
        name: "Roti Bakar Surya Jaya",
        category: "Warung Makan",
        rating: 4.3,
        reviews: 154,
        priceRange: 13000,
        location: "Ngesrep",
        address: "Jl. Ngesrep, Tembalang",
        lat: -7.0535,
        lng: 110.4195,
        icon: "🍞",
        distance: 2.2,
        photo: "url(...)",
        description: "Roti bakar dengan berbagai varian topping, margarin melimpah, dan dibuat fresh. Cocok untuk sarapan."
    },
    {
        id: 19,
        name: "Kari Kambing Tanjung",
        category: "Makanan Indonesia",
        rating: 4.5,
        reviews: 201,
        priceRange: 35000,
        location: "Jalan Prof. Soedarto",
        address: "Jl. Prof. Soedarto, Tembalang",
        lat: -7.0670,
        lng: 110.4085,
        icon: "🍛",
        distance: 0.38,
        photo: "url(...)",
        description: "Kari kambing dengan daging empuk, kuah kental, dan rasa pedas pas. Nasi putih unlimited."
    },
    {
        id: 20,
        name: "Warung Lumpia & Bakso Enak",
        category: "Warung Makan",
        rating: 4.2,
        reviews: 129,
        priceRange: 10000,
        location: "Tirto Agung",
        address: "Jl. Tirto Agung, Tembalang",
        lat: -7.0600,
        lng: 110.4160,
        icon: "🥟",
        distance: 1.55,
        photo: "url(...)",
        description: "Lumpia goreng renyah dan bakso dalam kuah gurih. Pelayanan ramah dan tempat bersih."
    },
    {
        id: 21,
        name: "Ayam Geprek Maestro",
        category: "Warung Makan",
        rating: 4.4,
        reviews: 167,
        priceRange: 22000,
        location: "Bulusan",
        address: "Jl. Gerung Sari 1C, Kelurahan Bulusan, Kecamatan Tembalang, Semarang (Belakang Rusunawa UNDIP)",
        lat: -7.05643051229876
        lng: 110.44361306068305
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
