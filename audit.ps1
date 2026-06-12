# Restaurant Data Audit Script (PowerShell)
# UNDIP Tembalang coordinates
$UNDIP_LAT = -7.048889
$UNDIP_LNG = 110.438056
$MAX_DISTANCE_KM = 5.0

# Restaurant data
$restaurants = @(
    @{ id=1; name="Warung Nasi Kuning Mbah Sarno"; address="Jl. Prof. Soedarto SH, Tembalang"; lat=-7.0675; lng=110.4069 },
    @{ id=2; name="Restoran Seafood Nikmat"; address="Jl. Prof. Soedarto No. 123, Tembalang"; lat=-7.0685; lng=110.4050 },
    @{ id=3; name="Cafe Tembalang Indah"; address="Jl. Tembalang No. 45, Semarang"; lat=-7.0620; lng=110.4100 },
    @{ id=4; name="Warung Mie Ayam Cabe Rawit"; address="Jl. Pendidikan, Tembalang"; lat=-7.0700; lng=110.4080 },
    @{ id=5; name="Restoran Padang Rasa Sabar"; address="Jl. Bulusan No. 67, Tembalang"; lat=-7.0750; lng=110.4120 },
    @{ id=6; name="KFC Tembalang"; address="Jl. Prof. Soedarto, Tembalang"; lat=-7.0660; lng=110.4060 },
    @{ id=7; name="Boba Tea Tembalang Premium"; address="Jl. Tirto Agung, Tembalang"; lat=-7.0590; lng=110.4140 },
    @{ id=8; name="Soto Ayam Lampir Mak Tini"; address="Jl. Pendidikan, Tembalang"; lat=-7.0680; lng=110.4090 },
    @{ id=9; name="McDonald's Tembalang"; address="Jl. Prof. Soedarto No. 100, Tembalang"; lat=-7.0670; lng=110.4075 },
    @{ id=10; name="Warung Bakso Boyo"; address="Jl. Tembalang Atas No. 12, Semarang"; lat=-7.0610; lng=110.4110 },
    @{ id=11; name="Grill House Tembalang"; address="Jl. Ngesrep, Tembalang"; lat=-7.0540; lng=110.4180 },
    @{ id=12; name="Warung Tahu Goreng Cemplon"; address="Jl. Bulusan No. 34, Tembalang"; lat=-7.0820; lng=110.4150 },
    @{ id=13; name="Martabak Mesir Asli Tembalang"; address="Jl. Prof. Soedarto, Tembalang"; lat=-7.0675; lng=110.4070 },
    @{ id=14; name="Ayam Betutu Bali Tembalang"; address="Jl. Tirto Agung No. 88, Tembalang"; lat=-7.0580; lng=110.4160 },
    @{ id=15; name="Jus Buah Segar Tembalang"; address="Jl. Pendidikan, Tembalang"; lat=-7.0695; lng=110.4085 },
    @{ id=16; name="Pasta Italia Tembalang"; address="Jl. Tembalang No. 99, Semarang"; lat=-7.0615; lng=110.4105 },
    @{ id=17; name="Warung Es Cendol Ulek"; address="Jl. Bulusan, Tembalang"; lat=-7.0765; lng=110.4135 },
    @{ id=18; name="Roti Bakar Surya Jaya"; address="Jl. Ngesrep, Tembalang"; lat=-7.0535; lng=110.4195 },
    @{ id=19; name="Kari Kambing Tanjung"; address="Jl. Prof. Soedarto, Tembalang"; lat=-7.0670; lng=110.4085 },
    @{ id=20; name="Warung Lumpia dan Bakso Enak"; address="Jl. Tirto Agung, Tembalang"; lat=-7.0600; lng=110.4160 },
    @{ id=21; name="Ayam Geprek Maestro"; address="Jl. Gerung Sari 1C, Kelurahan Bulusan, Kecamatan Tembalang, Semarang"; lat=-7.0830; lng=110.4160 }
)

# Haversine distance formula
function Get-Distance {
    param(
        [double]$lat1,
        [double]$lon1,
        [double]$lat2,
        [double]$lon2
    )
    
    $R = 6371  # Earth's radius in km
    $dLat = [Math]::PI * ($lat2 - $lat1) / 180
    $dLon = [Math]::PI * ($lon2 - $lon1) / 180
    
    $a = [Math]::Sin($dLat/2) * [Math]::Sin($dLat/2) +
         [Math]::Cos([Math]::PI * $lat1 / 180) * [Math]::Cos([Math]::PI * $lat2 / 180) *
         [Math]::Sin($dLon/2) * [Math]::Sin($dLon/2)
    
    $c = 2 * [Math]::Atan2([Math]::Sqrt($a), [Math]::Sqrt(1-$a))
    
    return $R * $c
}

Write-Host ("=" * 80)
Write-Host "RESTAURANT DATA AUDIT - UNIVERSITAS DIPONEGORO TEMBALANG"
Write-Host ("=" * 80)
Write-Host "Reference Point: UNDIP Tembalang ($UNDIP_LAT, $UNDIP_LNG)"
Write-Host "Maximum Distance: $MAX_DISTANCE_KM km"
Write-Host ""

$verifiedList = @()
$removedList = @()
$verifiedCount = 0
$removedCount = 0

foreach ($restaurant in $restaurants) {
    $id = $restaurant.id
    $name = $restaurant.name
    $address = $restaurant.address
    $lat = $restaurant.lat
    $lng = $restaurant.lng
    
    $distanceKm = Get-Distance -lat1 $UNDIP_LAT -lon1 $UNDIP_LNG -lat2 $lat -lon2 $lng
    
    if ($distanceKm -gt $MAX_DISTANCE_KM) {
        Write-Host "REMOVE - ID $id`: $name" -ForegroundColor Red
        Write-Host "   Address: $address"
        $distRounded = [Math]::Round($distanceKm, 2)
        Write-Host "   Distance: $distRounded km (exceeds $MAX_DISTANCE_KM km limit)"
        Write-Host ""
        
        $removedList += @{
            id = $id
            name = $name
            address = $address
            latitude = $lat
            longitude = $lng
            distance_km = $distRounded
            reason = "Outside 5km radius"
        }
        $removedCount++
    } else {
        Write-Host "KEEP - ID $id`: $name" -ForegroundColor Green
        Write-Host "   Address: $address"
        Write-Host "   Latitude: $lat | Longitude: $lng"
        $distRounded = [Math]::Round($distanceKm, 2)
        Write-Host "   Distance: $distRounded km"
        Write-Host ""
        
        $verifiedList += @{
            id = $id
            name = $name
            address = $address
            latitude = $lat
            longitude = $lng
            distance_km = $distRounded
        }
        $verifiedCount++
    }
}

Write-Host ("=" * 80)
Write-Host "AUDIT SUMMARY" -ForegroundColor Cyan
Write-Host ("=" * 80)
Write-Host "Total Restaurants Audited: $($restaurants.Count)"
Write-Host "Verified and Kept: $verifiedCount" -ForegroundColor Green
Write-Host "Removed: $removedCount" -ForegroundColor Red
Write-Host ""

if ($removedCount -gt 0) {
    Write-Host "REMOVED RESTAURANTS:" -ForegroundColor Red
    foreach ($removed in $removedList) {
        Write-Host "  - $($removed.name): $($removed.reason)"
    }
    Write-Host ""
}

# Export results
$results = @{
    timestamp = (Get-Date).ToUniversalTime().ToString("O")
    undip_reference = @{ latitude = $UNDIP_LAT; longitude = $UNDIP_LNG }
    max_distance_km = $MAX_DISTANCE_KM
    verified_restaurants = $verifiedList
    removed_restaurants = $removedList
    summary = @{
        total_restaurants = $restaurants.Count
        verified_restaurants = $verifiedCount
        removed_restaurants = $removedCount
    }
}

$results | ConvertTo-Json | Out-File -FilePath "audit_report.json" -Encoding utf8
Write-Host "Audit report saved to: audit_report.json" -ForegroundColor Green
