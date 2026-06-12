#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Restaurant Data Audit Script
Verifies restaurant data for UNDIP Tembalang mapping application
"""

import math
import json
from datetime import datetime

# UNDIP Tembalang coordinates (reference point)
UNDIP_LAT = -7.048889
UNDIP_LNG = 110.438056
MAX_DISTANCE_KM = 5.0

# Restaurant data extracted from data.js
restaurants = [
    {"id": 1, "name": "Warung Nasi Kuning Mbah Sarno", "address": "Jl. Prof. Soedarto SH, Tembalang", "lat": -7.0675, "lng": 110.4069},
    {"id": 2, "name": "Restoran Seafood Nikmat", "address": "Jl. Prof. Soedarto No. 123, Tembalang", "lat": -7.0685, "lng": 110.4050},
    {"id": 3, "name": "Cafe Tembalang Indah", "address": "Jl. Tembalang No. 45, Semarang", "lat": -7.0620, "lng": 110.4100},
    {"id": 4, "name": "Warung Mie Ayam Cabe Rawit", "address": "Jl. Pendidikan, Tembalang", "lat": -7.0700, "lng": 110.4080},
    {"id": 5, "name": "Restoran Padang Rasa Sabar", "address": "Jl. Bulusan No. 67, Tembalang", "lat": -7.0750, "lng": 110.4120},
    {"id": 6, "name": "KFC Tembalang", "address": "Jl. Prof. Soedarto, Tembalang", "lat": -7.0660, "lng": 110.4060},
    {"id": 7, "name": "Boba Tea Tembalang Premium", "address": "Jl. Tirto Agung, Tembalang", "lat": -7.0590, "lng": 110.4140},
    {"id": 8, "name": "Soto Ayam Lampir Mak Tini", "address": "Jl. Pendidikan, Tembalang", "lat": -7.0680, "lng": 110.4090},
    {"id": 9, "name": "McDonald's Tembalang", "address": "Jl. Prof. Soedarto No. 100, Tembalang", "lat": -7.0670, "lng": 110.4075},
    {"id": 10, "name": "Warung Bakso Boyo", "address": "Jl. Tembalang Atas No. 12, Semarang", "lat": -7.0610, "lng": 110.4110},
    {"id": 11, "name": "Grill House Tembalang", "address": "Jl. Ngesrep, Tembalang", "lat": -7.0540, "lng": 110.4180},
    {"id": 12, "name": "Warung Tahu Goreng Cemplon", "address": "Jl. Bulusan No. 34, Tembalang", "lat": -7.0820, "lng": 110.4150},
    {"id": 13, "name": "Martabak Mesir Asli Tembalang", "address": "Jl. Prof. Soedarto, Tembalang", "lat": -7.0675, "lng": 110.4070},
    {"id": 14, "name": "Ayam Betutu Bali Tembalang", "address": "Jl. Tirto Agung No. 88, Tembalang", "lat": -7.0580, "lng": 110.4160},
    {"id": 15, "name": "Jus Buah Segar Tembalang", "address": "Jl. Pendidikan, Tembalang", "lat": -7.0695, "lng": 110.4085},
    {"id": 16, "name": "Pasta Italia Tembalang", "address": "Jl. Tembalang No. 99, Semarang", "lat": -7.0615, "lng": 110.4105},
    {"id": 17, "name": "Warung Es Cendol Ulek", "address": "Jl. Bulusan, Tembalang", "lat": -7.0765, "lng": 110.4135},
    {"id": 18, "name": "Roti Bakar Surya Jaya", "address": "Jl. Ngesrep, Tembalang", "lat": -7.0535, "lng": 110.4195},
    {"id": 19, "name": "Kari Kambing Tanjung", "address": "Jl. Prof. Soedarto, Tembalang", "lat": -7.0670, "lng": 110.4085},
    {"id": 20, "name": "Warung Lumpia & Bakso Enak", "address": "Jl. Tirto Agung, Tembalang", "lat": -7.0600, "lng": 110.4160},
    {"id": 21, "name": "Ayam Geprek Maestro", "address": "Jl. Gerung Sari 1C, Kelurahan Bulusan, Kecamatan Tembalang, Semarang", "lat": -7.0830, "lng": 110.4160},
]

def haversine_distance(lat1, lon1, lat2, lon2):
    """
    Calculate distance between two points using Haversine formula
    Returns distance in kilometers
    """
    R = 6371  # Earth's radius in km
    
    # Convert to radians
    lat1_rad = math.radians(lat1)
    lon1_rad = math.radians(lon1)
    lat2_rad = math.radians(lat2)
    lon2_rad = math.radians(lon2)
    
    # Haversine formula
    dlat = lat2_rad - lat1_rad
    dlon = lon2_rad - lon1_rad
    
    a = math.sin(dlat/2)**2 + math.cos(lat1_rad) * math.cos(lat2_rad) * math.sin(dlon/2)**2
    c = 2 * math.asin(math.sqrt(a))
    
    return R * c

def validate_coordinates(lat, lng):
    """Validate if coordinates are within valid ranges"""
    return -90 <= lat <= 90 and -180 <= lng <= 180

def audit_restaurants():
    """Perform audit on all restaurants"""
    
    audit_results = {
        "timestamp": datetime.now().isoformat(),
        "undip_reference": {"latitude": UNDIP_LAT, "longitude": UNDIP_LNG},
        "max_distance_km": MAX_DISTANCE_KM,
        "verified_restaurants": [],
        "removed_restaurants": [],
        "summary": {}
    }
    
    print("=" * 80)
    print("RESTAURANT DATA AUDIT - UNIVERSITAS DIPONEGORO TEMBALANG")
    print("=" * 80)
    print(f"Reference Point: UNDIP Tembalang ({UNDIP_LAT}, {UNDIP_LNG})")
    print(f"Maximum Distance: {MAX_DISTANCE_KM} km")
    print()
    
    verified_count = 0
    removed_count = 0
    
    for restaurant in restaurants:
        rest_id = restaurant["id"]
        name = restaurant["name"]
        address = restaurant["address"]
        lat = restaurant["lat"]
        lng = restaurant["lng"]
        
        # Validate coordinates
        if not validate_coordinates(lat, lng):
            print(f"❌ REMOVE - ID {rest_id}: {name}")
            print(f"   Reason: Invalid coordinates ({lat}, {lng})")
            audit_results["removed_restaurants"].append({
                "id": rest_id,
                "name": name,
                "reason": "Invalid coordinates"
            })
            removed_count += 1
            continue
        
        # Calculate distance
        distance_km = haversine_distance(UNDIP_LAT, UNDIP_LNG, lat, lng)
        
        # Check if within 5km
        if distance_km > MAX_DISTANCE_KM:
            print(f"❌ REMOVE - ID {rest_id}: {name}")
            print(f"   Address: {address}")
            print(f"   Distance: {distance_km:.2f} km (exceeds {MAX_DISTANCE_KM} km limit)")
            print()
            audit_results["removed_restaurants"].append({
                "id": rest_id,
                "name": name,
                "address": address,
                "latitude": lat,
                "longitude": lng,
                "distance_km": round(distance_km, 2),
                "reason": f"Outside 5km radius (actual: {distance_km:.2f} km)"
            })
            removed_count += 1
        else:
            print(f"✓ KEEP - ID {rest_id}: {name}")
            print(f"   Address: {address}")
            print(f"   Latitude: {lat} | Longitude: {lng}")
            print(f"   Distance: {distance_km:.2f} km")
            print()
            audit_results["verified_restaurants"].append({
                "id": rest_id,
                "name": name,
                "address": address,
                "latitude": lat,
                "longitude": lng,
                "distance_km": round(distance_km, 2)
            })
            verified_count += 1
    
    # Summary
    audit_results["summary"] = {
        "total_restaurants": len(restaurants),
        "verified_restaurants": verified_count,
        "removed_restaurants": removed_count
    }
    
    print("=" * 80)
    print("AUDIT SUMMARY")
    print("=" * 80)
    print(f"Total Restaurants Audited: {len(restaurants)}")
    print(f"Verified & Kept: {verified_count}")
    print(f"Removed: {removed_count}")
    print()
    
    if removed_count > 0:
        print("REMOVED RESTAURANTS:")
        for removed in audit_results["removed_restaurants"]:
            print(f"  - {removed['name']}: {removed['reason']}")
        print()
    
    return audit_results

if __name__ == "__main__":
    results = audit_restaurants()
    
    # Save results to JSON
    with open("audit_report.json", "w", encoding="utf-8") as f:
        json.dump(results, f, indent=2, ensure_ascii=False)
    
    print("✓ Audit report saved to: audit_report.json")
