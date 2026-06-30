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
import { useGoogleMaps } from '@/composables/useGoogleMaps'

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

const { loadScript } = useGoogleMaps(apiKey)

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

const stations = ref<Station[]>([
    {
        id: 1,
        name: 'Tủ Bình Dương',
        address: 'QL13',
        lat: 11.233129,
        lng: 106.732281,
    },
    {
        id: 2,
        name: 'Tủ Phước Hòa',
        address: 'ĐT741',
        lat: 11.2382,
        lng: 106.7285,
    },
    {
        id: 3,
        name: 'Tủ Chợ Phú Giáo',
        address: 'Chợ Phú Giáo',
        lat: 11.244,
        lng: 106.738,
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

        const infoWindow = new google.maps.InfoWindow({
            content: `
                <div style="min-width:180px">
                    <b>${station.name}</b><br/>
                    ${station.address}
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
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return

        const location = {
            lat: e.latLng.lat(),
            lng: e.latLng.lng(),
        }

        marker.setPosition(location)

        lat.value = location.lat
        lng.value = location.lng

        emit('update:location', location)
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
</style>