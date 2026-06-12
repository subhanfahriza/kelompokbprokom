/**
 * Restaurant Data Audit Script
 * Verifies restaurant data for UNDIP Tembalang mapping application
 */

// UNDIP Tembalang coordinates (reference point)
const UNDIP_LAT = -7.048889;
const UNDIP_LNG = 110.438056;
const MAX_DISTANCE_KM = 5.0;

// Restaurant data extracted from data.js
const restaurants = [
    { id: 1, name: "Warung Nasi Kuning Mbah Sarno", address: "Jl. Prof. Soedarto SH, Tembalang", lat: -7.0675, lng: 110.4069 },
    { id: 2, name: "Restoran Seafood Nikmat", address: "Jl. Prof. Soedarto No. 123, Tembalang", lat: -7.0685, lng: 110.4050 },
    { id: 3, name: "Cafe Tembalang Indah", address: "Jl. Tembalang No. 45, Semarang", lat: -7.0620, lng: 110.4100 },
    { id: 4, name: "Warung Mie Ayam Cabe Rawit", address: "Jl. Pendidikan, Tembalang", lat: -7.0700, lng: 110.4080 },
    { id: 5, name: "Restoran Padang Rasa Sabar", address: "Jl. Bulusan No. 67, Tembalang", lat: -7.0750, lng: 110.4120 },
    { id: 6, name: "KFC Tembalang", address: "Jl. Prof. Soedarto, Tembalang", lat: -7.0660, lng: 110.4060 },
    { id: 7, name: "Boba Tea Tembalang Premium", address: "Jl. Tirto Agung, Tembalang", lat: -7.0590, lng: 110.4140 },
    { id: 8, name: "Soto Ayam Lampir Mak Tini", address: "Jl. Pendidikan, Tembalang", lat: -7.0680, lng: 110.4090 },
    { id: 9, name: "McDonald's Tembalang", address: "Jl. Prof. Soedarto No. 100, Tembalang", lat: -7.0670, lng: 110.4075 },
    { id: 10, name: "Warung Bakso Boyo", address: "Jl. Tembalang Atas No. 12, Semarang", lat: -7.0610, lng: 110.4110 },
    { id: 11, name: "Grill House Tembalang", address: "Jl. Ngesrep, Tembalang", lat: -7.0540, lng: 110.4180 },
    { id: 12, name: "Warung Tahu Goreng Cemplon", address: "Jl. Bulusan No. 34, Tembalang", lat: -7.0820, lng: 110.4150 },
    { id: 13, name: "Martabak Mesir Asli Tembalang", address: "Jl. Prof. Soedarto, Tembalang", lat: -7.0675, lng: 110.4070 },
    { id: 14, name: "Ayam Betutu Bali Tembalang", address: "Jl. Tirto Agung No. 88, Tembalang", lat: -7.0580, lng: 110.4160 },
    { id: 15, name: "Jus Buah Segar Tembalang", address: "Jl. Pendidikan, Tembalang", lat: -7.0695, lng: 110.4085 },
    { id: 16, name: "Pasta Italia Tembalang", address: "Jl. Tembalang No. 99, Semarang", lat: -7.0615, lng: 110.4105 },
    { id: 17, name: "Warung Es Cendol Ulek", address: "Jl. Bulusan, Tembalang", lat: -7.0765, lng: 110.4135 },
    { id: 18, name: "Roti Bakar Surya Jaya", address: "Jl. Ngesrep, Tembalang", lat: -7.0535, lng: 110.4195 },
    { id: 19, name: "Kari Kambing Tanjung", address: "Jl. Prof. Soedarto, Tembalang", lat: -7.0670, lng: 110.4085 },
    { id: 20, name: "Warung Lumpia & Bakso Enak", address: "Jl. Tirto Agung, Tembalang", lat: -7.0600, lng: 110.4160 },
    { id: 21, name: "Ayam Geprek Maestro", address: "Jl. Gerung Sari 1C, Kelurahan Bulusan, Kecamatan Tembalang, Semarang", lat: -7.0830, lng: 110.4160 },
];

/**
 * Calculate distance between two points using Haversine formula
 * Returns distance in kilometers
 */
function haversineDistance(lat1, lon1, lat2, lon2) {
    const R = 6371; // Earth's radius in km
    
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLon = (lon2 - lon1) * Math.PI / 180;
    
    const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
              Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
              Math.sin(dLon / 2) * Math.sin(dLon / 2);
    
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    
    return R * c;
}

/**
 * Validate if coordinates are within valid ranges
 */
function validateCoordinates(lat, lng) {
    return lat >= -90 && lat <= 90 && lng >= -180 && lng <= 180;
}

/**
 * Perform audit on all restaurants
 */
function auditRestaurants() {
    const auditResults = {
        timestamp: new Date().toISOString(),
        undip_reference: { latitude: UNDIP_LAT, longitude: UNDIP_LNG },
        max_distance_km: MAX_DISTANCE_KM,
        verified_restaurants: [],
        removed_restaurants: [],
        summary: {}
    };
    
    console.log("=".repeat(80));
    console.log("RESTAURANT DATA AUDIT - UNIVERSITAS DIPONEGORO TEMBALANG");
    console.log("=".repeat(80));
    console.log(`Reference Point: UNDIP Tembalang (${UNDIP_LAT}, ${UNDIP_LNG})`);
    console.log(`Maximum Distance: ${MAX_DISTANCE_KM} km`);
    console.log();
    
    let verifiedCount = 0;
    let removedCount = 0;
    
    restaurants.forEach(restaurant => {
        const { id, name, address, lat, lng } = restaurant;
        
        // Validate coordinates
        if (!validateCoordinates(lat, lng)) {
            console.log(`❌ REMOVE - ID ${id}: ${name}`);
            console.log(`   Reason: Invalid coordinates (${lat}, ${lng})`);
            auditResults.removed_restaurants.push({
                id,
                name,
                reason: "Invalid coordinates"
            });
            removedCount++;
            return;
        }
        
        // Calculate distance
        const distanceKm = haversineDistance(UNDIP_LAT, UNDIP_LNG, lat, lng);
        
        // Check if within 5km
        if (distanceKm > MAX_DISTANCE_KM) {
            console.log(`❌ REMOVE - ID ${id}: ${name}`);
            console.log(`   Address: ${address}`);
            console.log(`   Distance: ${distanceKm.toFixed(2)} km (exceeds ${MAX_DISTANCE_KM} km limit)`);
            console.log();
            auditResults.removed_restaurants.push({
                id,
                name,
                address,
                latitude: lat,
                longitude: lng,
                distance_km: parseFloat(distanceKm.toFixed(2)),
                reason: `Outside 5km radius (actual: ${distanceKm.toFixed(2)} km)`
            });
            removedCount++;
        } else {
            console.log(`✓ KEEP - ID ${id}: ${name}`);
            console.log(`   Address: ${address}`);
            console.log(`   Latitude: ${lat} | Longitude: ${lng}`);
            console.log(`   Distance: ${distanceKm.toFixed(2)} km`);
            console.log();
            auditResults.verified_restaurants.push({
                id,
                name,
                address,
                latitude: lat,
                longitude: lng,
                distance_km: parseFloat(distanceKm.toFixed(2))
            });
            verifiedCount++;
        }
    });
    
    // Summary
    auditResults.summary = {
        total_restaurants: restaurants.length,
        verified_restaurants: verifiedCount,
        removed_restaurants: removedCount
    };
    
    console.log("=".repeat(80));
    console.log("AUDIT SUMMARY");
    console.log("=".repeat(80));
    console.log(`Total Restaurants Audited: ${restaurants.length}`);
    console.log(`Verified & Kept: ${verifiedCount}`);
    console.log(`Removed: ${removedCount}`);
    console.log();
    
    if (removedCount > 0) {
        console.log("REMOVED RESTAURANTS:");
        auditResults.removed_restaurants.forEach(removed => {
            console.log(`  - ${removed.name}: ${removed.reason}`);
        });
        console.log();
    }
    
    return auditResults;
}

// Run audit and export results
const results = auditRestaurants();

// Save as JSON file
const fs = require('fs');
fs.writeFileSync('audit_report.json', JSON.stringify(results, null, 2), 'utf8');
console.log("✓ Audit report saved to: audit_report.json");
