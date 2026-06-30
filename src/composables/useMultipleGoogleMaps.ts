import { ref } from 'vue'

const isLoaded = ref(false)

export function useMultipleGoogleMaps(apiKey: string) {
    function loadScript(): Promise<void> {
        return new Promise((resolve, reject) => {
            if (isLoaded.value) {
                resolve()
                return
            }

            const oldScript = document.getElementById('google-maps')

            if (oldScript) {
                isLoaded.value = true
                resolve()
                return
            }

            const script = document.createElement('script')

            script.id = 'google-maps'

            script.src =
                `https://maps.googleapis.com/maps/api/js?` +
                `key=${apiKey}` +
                `&libraries=places,geometry`

            script.async = true
            script.defer = true

            script.onload = () => {
                isLoaded.value = true
                resolve()
            }

            script.onerror = (err) => {
                reject(err)
            }

            document.head.appendChild(script)
        })
    }

    return {
        loadScript,
        isLoaded,
    }
}