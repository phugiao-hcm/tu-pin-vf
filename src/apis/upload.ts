import axios from 'axios'

export async function getTokenImage(): Promise<string> {
  const res = await axios.post(`https://api.sirv.com/v2/token`, {
    clientId: '6ySLQOSG6TJaTRqhXGTw5jJ9Zu7',
    clientSecret:
      'ZjCCdsPqdCHDZr95wR7BJ0rw4iRSgvGcfl1xtQbJQv+MgSy8jp29pI1R3ceIAzGbg2nvU28OIZB3hS1lRPXcOQ==',
  })

  return res.data.token
}

export async function uploadImage(file: File, token: string) {
  try {
    const filename = `/phongtro/${file.name}`
    const url = `https://api.sirv.com/v2/files/upload?filename=${encodeURIComponent(filename)}`

    const res = await axios.post(url, file, {
      headers: {
        Authorization: `Bearer ${token}`,
        'Content-Type': file.type || 'application/octet-stream', // image/jpeg, image/png...
      },
    })

    console.log('Upload thành công:', res.data)
    return res.data
  } catch (error) {
    console.error('Upload thất bại:', error)
    throw error
  }
}
