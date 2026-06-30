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
            <el-button type="primary" @click="goToLatLng">Tìm</el-button>
        </div>

        <!-- Map -->
        <div ref="mapRef" class="map"></div>
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref, watch } from 'vue'
import { useGoogleMaps } from '@/composables/useGoogleMaps'

const apiKey = 'AIzaSyD2_kkzvfEJmLHoOV4ok9LfdoaNxTFcGac' // 🔑 thay bằng key thật

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

const mapRef = ref<HTMLDivElement | null>(null)
const autocompleteInput = ref<HTMLInputElement | null>(null)

const lat = ref(props.lat)
const lng = ref(props.lng)

watch(
    () => [props.lat, props.lng],
    ([newLat, newLng]) => {
        if (newLat != null && newLng != null) {
            lat.value = newLat
            lng.value = newLng

            if (map && marker) {
                const location = { lat: newLat, lng: newLng }
                map.setCenter(location)
                marker.setPosition(location)
            }
        }
    }
)

const { loadScript } = useGoogleMaps(apiKey)

// Emit event lên component cha
const emit = defineEmits<{ (e: 'update:location', location: { lat: number; lng: number }): void }>()

let map: google.maps.Map
let marker: google.maps.Marker

onMounted(async () => {
    await loadScript()
    if (!mapRef.value || !autocompleteInput.value) return

    // Init map
    map = new google.maps.Map(mapRef.value, {
        center: { lat: lat.value, lng: lng.value },
        zoom: 13,
    })

    marker = new google.maps.Marker({
        position: { lat: lat.value, lng: lng.value },
        map,
    })

    // --- Autocomplete ---
    const autocomplete = new google.maps.places.Autocomplete(autocompleteInput.value, {
        fields: ['geometry', 'formatted_address'],
    })

    autocomplete.addListener('place_changed', () => {
        const place = autocomplete.getPlace()
        if (!place.geometry || !place.geometry.location) return

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

    // --- Click trên map ---
    map.addListener('click', (e: google.maps.MapMouseEvent) => {
        if (!e.latLng) return
        const location = { lat: e.latLng.lat(), lng: e.latLng.lng() }
        marker.setPosition(location)
        lat.value = location.lat
        lng.value = location.lng
        emit('update:location', location)
    })
})

// --- Hàm khi nhập lat/lng thủ công ---
const goToLatLng = () => {
    if (!map || !marker) return
    const location = { lat: lat.value, lng: lng.value }
    map.setCenter(location)
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
    font-size: 14px;
    border: 1px solid #ddd;
    border-radius: 6px;
}
.latlng-inputs {
    display: flex;
    gap: 6px;
}
.latlng-inputs input {
    flex: 1;
    padding: 6px;
    border: 1px solid #ddd;
    border-radius: 6px;
}
.map {
    width: 100%;
    height: 400px;
    border-radius: 8px;
}
</style>
