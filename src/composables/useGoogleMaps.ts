// // composables/useGoogleMaps.ts
// import { ref } from 'vue'

// const isLoaded = ref(false)

// export function useGoogleMaps(apiKey: string) {
//   function loadScript(): Promise<void> {
//     return new Promise((resolve, reject) => {
//       if (isLoaded.value) {
//         resolve()
//         return
//       }

//       // Nếu đã tồn tại script thì resolve luôn
//       if (document.getElementById('google-maps')) {
//         ;(window as any).initMap = () => {
//           isLoaded.value = true
//           resolve()
//         }
//         return
//       }

//       const script = document.createElement('script')
//       script.id = 'google-maps'
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places&callback=initMap`
//       script.async = true
//       script.defer = true
//       ;(window as any).initMap = () => {
//         isLoaded.value = true
//         resolve()
//       }

//       script.onerror = reject
//       document.head.appendChild(script)
//     })
//   }

//   return { loadScript, isLoaded }
// }

// composables/useGoogleMaps.ts
import { ref } from 'vue'

const isLoaded = ref(false)

export function useGoogleMaps(apiKey: string) {
  function loadScript(): Promise<void> {
    return new Promise((resolve, reject) => {
      if (isLoaded.value) {
        resolve()
        return
      }

      // Nếu script đã có thì resolve luôn
      if (document.getElementById('google-maps')) {
        isLoaded.value = true
        resolve()
        return
      }

      const script = document.createElement('script')
      script.id = 'google-maps'
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`
      script.async = true
      script.defer = true

      script.onload = () => {
        isLoaded.value = true
        resolve()
      }

      script.onerror = (err) => reject(err)

      document.head.appendChild(script)
    })
  }

  return { loadScript, isLoaded }
}
