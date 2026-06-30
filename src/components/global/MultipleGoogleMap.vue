<template>
    <div class="map-container">
        <!-- Input autocomplete -->
        <input
            v-show="!isDisabled"
            ref="autocompleteInput"
            type="text"
            placeholder="Nhập địa chỉ..."
            class="autocomplete-input"
        />

        <!-- Input lat/lng -->
        <div v-show="!isDisabled" class="latlng-inputs">
            <input v-model.number="lat" type="number" step="0.000001" placeholder="Lat" />
            <input v-model.number="lng" type="number" step="0.000001" placeholder="Lng" />
            <el-button type="primary" @click="goToLatLng"> Tìm </el-button>
        </div>

        <!-- Map -->
        <div ref="mapRef" class="map"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useMultipleGoogleMaps } from '@/composables/useMultipleGoogleMaps'

const apiKey = 'AIzaSyD2_kkzvfEJmLHoOV4ok9LfdoaNxTFcGac'

const props = withDefaults(
    defineProps<{
        isDisabled?: boolean
        lat?: number
        lng?: number
    }>(),
    {
        isDisabled: false,
        lat: 11.233129,
        lng: 106.732281,
    }
)

const emit = defineEmits<{
    (e: 'update:location', location: { lat: number; lng: number }): void
}>()

const { loadScript } = useMultipleGoogleMaps(apiKey)

const mapRef = ref<HTMLDivElement | null>(null)
const autocompleteInput = ref<HTMLInputElement | null>(null)

const lat = ref(props.lat)
const lng = ref(props.lng)

let map: google.maps.Map
let marker: google.maps.Marker

// Marker của các tủ
let stationMarkers: google.maps.Marker[] = []

interface Station {
    id: number
    name: string
    address: string
    lat: number
    lng: number
}

let nearestPolyline: google.maps.Polyline | null = null
let nearestInfoWindow: google.maps.InfoWindow | null = null

const stations = ref<Station[]>([
    {
        id: 1,
        name: 'Tủ Bình Dương',
        address: 'QL13',
        lat: 11.2144491121499,
        lng: 106.7205215362333,
    },
    {
        id: 2,
        name: 'Tủ Phước Hòa',
        address: 'ĐT741',
        lat: 11.298027890538167,
        lng: 106.80236861882014,
    },
    {
        id: 3,
        name: 'Tủ Phú Giáo 1',
        address: 'Chợ Phú Giáo',
        lat: 11.247780506982814,
        lng: 106.75895725906827,
    },
    {
        id: 4,
        name: 'Tủ Phú Giáo 2',
        address: 'Chợ Phú Giáo',
        lat: 11.241020684186873,
        lng: 106.74412197683802,
    },
    {
        id: 5,
        name: 'Tủ Phú Giáo 3',
        address: 'Chợ Phú Giáo',
        lat: 11.242894891765777,
        lng: 106.75529034127841,
    },
    {
        id: 6,
        name: 'Tủ Phú Giáo 4',
        address: 'Chợ Phú Giáo',
        lat: 11.075613896326402,
        lng: 106.76445931796107,
    },

    {
        id: 7,
        name: 'Tủ Phú Giáo 5',
        address: 'Chợ Phú Giáo',
        lat: 11.075208529639655,
        lng: 106.76431581923542,
    },
    {
        id: 8,
        name: 'Tủ Phú Giáo 6',
        address: 'Chợ Phú Giáo',
        lat: 11.076086476931305,
        lng: 106.78910865907837,
    },
    {
        id: 9,
        name: 'Tủ Phú Giáo 7',
        address: 'Chợ Phú Giáo',
        lat: 11.076460212420761,
        lng: 106.79017900017443,
    },
    {
        id: 10,
        name: 'Tủ Phú Giáo 8',
        address: 'Chợ Phú Giáo',
        lat: 11.076496896304068,
        lng: 106.78923397685391,
    },
    {
        id: 11,
        name: 'Tủ Phú Giáo 9',
        address: 'Chợ Phú Giáo',
        lat: 11.076398631808098,
        lng: 106.79048300016156,
    },
])

watch(
    () => [props.lat, props.lng],
    ([newLat, newLng]) => {
        if (newLat == null || newLng == null) return

        lat.value = newLat
        lng.value = newLng

        if (map && marker) {
            const location = {
                lat: newLat,
                lng: newLng,
            }

            map.setCenter(location)
            marker.setPosition(location)
        }
    }
)

function getDistance(lat1: number, lng1: number, lat2: number, lng2: number) {
    return google.maps.geometry.spherical.computeDistanceBetween(
        new google.maps.LatLng(lat1, lng1),
        new google.maps.LatLng(lat2, lng2)
    )
}

function showNearestStation(location: { lat: number; lng: number }) {
    if (!map) return

    if (nearestPolyline) {
        nearestPolyline.setMap(null)
    }

    if (nearestInfoWindow) {
        nearestInfoWindow.close()
    }

    let nearestStation: Station | null = null
    let minDistance = Number.MAX_VALUE

    stations.value.forEach((station) => {
        const distance = getDistance(location.lat, location.lng, station.lat, station.lng)

        if (distance < minDistance) {
            minDistance = distance
            nearestStation = station
        }
    })

    if (!nearestStation) return

    // Vẽ đường nối
    nearestPolyline = new google.maps.Polyline({
        map,
        path: [
            location,
            {
                lat: nearestStation.lat,
                lng: nearestStation.lng,
            },
        ],
        strokeColor: '#2196F3',
        strokeWeight: 3,
    })

    // Hiện popup
    // nearestInfoWindow = new google.maps.InfoWindow({
    //     position: location,
    //     content: `
    //         <div class="custom-info-window">
    //             <b>Tủ gần nhất</b><br>
    //             ${nearestStation.name}<br>
    //             Khoảng cách:
    //             <b>${
    //                 minDistance >= 1000
    //                     ? (minDistance / 1000).toFixed(2) + ' km'
    //                     : minDistance.toFixed(0) + ' m'
    //             }</b>
    //         </div>
    //     `,
    // })
    nearestInfoWindow = new google.maps.InfoWindow({
        position: location,
        content: `
        <div class="nearest-info-window">

            <div class="nearest-header">
                <div class="nearest-icon">
                    📍
                </div>

                <div>
                    <div class="nearest-title">
                        Tủ gần nhất
                    </div>

                    <div class="nearest-name">
                        ${nearestStation.name}
                    </div>
                </div>
            </div>

            <div class="nearest-distance-box">
                <div class="nearest-distance-label">
                    Khoảng cách đường chim bay
                </div>

                <div class="nearest-distance-value">
                    ${
                        minDistance >= 1000
                            ? (minDistance / 1000).toFixed(2) + ' km'
                            : minDistance.toFixed(0) + ' m'
                    }
                </div>
            </div>
        </div>
    `,
    })

    nearestInfoWindow.open(map)
}

function renderStations() {
    stationMarkers.forEach((item) => item.setMap(null))
    stationMarkers = []

    stations.value.forEach((station) => {
        const stationMarker = new google.maps.Marker({
            map,
            position: {
                lat: station.lat,
                lng: station.lng,
            },
            title: station.name,

            icon: {
                url: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png',
            },
        })

        // const infoWindow = new google.maps.InfoWindow({
        //     content: `
        //         <div style="min-width:180px">
        //             <b>${station.name}</b><br/>
        //             ${station.address}
        //         </div>
        //     `,
        // })
        const infoWindow = new google.maps.InfoWindow({
            content: `
        <div class="station-info-window">

            <div class="station-header">
                <div class="station-icon">
                    🔋
                </div>

                <div>
                    <div class="station-title">
                        ${station.name}
                    </div>

                    <div class="station-address">
                        ${station.address}
                    </div>
                </div>
            </div>

            <div class="station-divider"></div>

            <div class="station-footer">

                <div class="station-status">
                    🟢 Đang hoạt động
                </div>

                <div class="station-id">
                    #${station.id}
                </div>

            </div>

        </div>
    `,
        })

        stationMarker.addListener('click', () => {
            infoWindow.open({
                anchor: stationMarker,
                map,
            })
        })

        stationMarkers.push(stationMarker)
    })
}

onMounted(async () => {
    await loadScript()

    if (!mapRef.value || !autocompleteInput.value) return

    map = new google.maps.Map(mapRef.value, {
        center: {
            lat: lat.value,
            lng: lng.value,
        },
        zoom: 14,
    })

    // Marker đang chọn
    marker = new google.maps.Marker({
        map,
        draggable: true,
        position: {
            lat: lat.value,
            lng: lng.value,
        },

        icon: {
            url: 'http://maps.google.com/mapfiles/ms/icons/blue-dot.png',
        },
    })

    marker.addListener('dragend', (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return

        lat.value = e.latLng.lat()
        lng.value = e.latLng.lng()

        emit('update:location', {
            lat: lat.value,
            lng: lng.value,
        })
    })

    // Hiển thị danh sách tủ
    renderStations()

    // Click map
    // map.addListener('click', (e: google.maps.MapMouseEvent) => {
    //     if (!e.latLng) return

    //     const location = {
    //         lat: e.latLng.lat(),
    //         lng: e.latLng.lng(),
    //     }

    //     marker.setPosition(location)

    //     lat.value = location.lat
    //     lng.value = location.lng

    //     emit('update:location', location)
    // })

    map.addListener('click', (e) => {
        if (!e.latLng) return

        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }

        marker.setPosition(location)

        lat.value = location.lat
        lng.value = location.lng

        emit('update:location', location)

        showNearestStation(location)
    })

    // Autocomplete
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value, {
        fields: ['geometry', 'formatted_address'],
    })

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()

        if (!place.geometry?.location) return

        const location = {
            lat: place.geometry.location.lat(),
            lng: place.geometry.location.lng(),
        }

        map.setCenter(location)

        marker.setPosition(location)

        lat.value = location.lat
        lng.value = location.lng

        emit('update:location', location)
    })
})

const goToLatLng = () => {
    if (!map || !marker) return

    const location = {
        lat: lat.value,
        lng: lng.value,
    }

    map.panTo(location)

    marker.setPosition(location)

    emit('update:location', location)
}
</script>

<style scoped>
.map-container {
    display: flex;
    flex-direction: column;
    gap: 8px;
}

.autocomplete-input {
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

.latlng-inputs {
    display: flex;
    gap: 8px;
}

.latlng-inputs input {
    flex: 1;
    padding: 8px;
    border: 1px solid #ddd;
    border-radius: 6px;
}

.map {
    width: 100%;
    height: 500px;
    border-radius: 8px;
}

:deep(.nearest-info-window) {
    min-width: 220px;
    font-family: Arial, sans-serif;
}

:deep(.nearest-header) {
    display: flex;
    align-items: center;
    gap: 12px;
    margin-bottom: 14px;
}

:deep(.nearest-icon) {
    width: 32px;
    height: 32px;
    border-radius: 50%;
    background: #16a34a;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
}

:deep(.nearest-title) {
    font-size: 16px;
    font-weight: 700;
    color: #1f2937;
}

:deep(.nearest-name) {
    font-size: 13px;
    color: #6b7280;
    margin-top: 2px;
}

:deep(.nearest-distance-box) {
    background: #f3f4f6;
    border-radius: 10px;
    padding: 12px;
    margin-bottom: 14px;
}

:deep(.nearest-distance-label) {
    font-size: 13px;
    color: #6b7280;
}

:deep(.nearest-distance-value) {
    margin-top: 6px;
    font-size: 24px;
    font-weight: bold;
    color: #2563eb;
}

:deep(.nearest-footer) {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:deep(.nearest-status) {
    color: #16a34a;
    font-weight: 600;
}

:deep(.nearest-id) {
    font-size: 12px;
    color: #9ca3af;
}

/* custom marker info */
/* custom marker info */
/* custom marker info */
/* custom marker info */
/* custom marker info */
:deep(.station-info-window) {
    min-width: 240px;
    font-family: Arial, sans-serif;
}

:deep(.station-header) {
    display: flex;
    align-items: center;
    gap: 12px;
}

:deep(.station-icon) {
    width: 46px;
    height: 46px;
    border-radius: 50%;
    background: #2563eb;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 22px;
    color: #fff;
}

:deep(.station-title) {
    font-size: 16px;
    font-weight: 700;
    color: #111827;
}

:deep(.station-address) {
    margin-top: 4px;
    font-size: 13px;
    color: #6b7280;
    line-height: 18px;
}

:deep(.station-divider) {
    margin: 12px 0;
    border-top: 1px solid #ececec;
}

:deep(.station-footer) {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

:deep(.station-status) {
    font-size: 13px;
    font-weight: 600;
    color: #16a34a;
}

:deep(.station-id) {
    font-size: 12px;
    color: #9ca3af;
}
</style>