import axios from 'axios'
import type { AxiosInstance, InternalAxiosRequestConfig, AxiosResponse } from 'axios'

const api: AxiosInstance = axios.create({
  baseURL: 'https://api.kongricsstudio.com/api', // đổi thành API backend của bạn
  timeout: 10000,
})

// Interceptor cho request (thêm token nếu có)
api.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const token = localStorage.getItem('token')
    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      }
    }
    return config
  },
  (error) => Promise.reject(error),
)

// Interceptor cho response (bắt lỗi chung)
api.interceptors.response.use(
  (response: AxiosResponse) => response,
  (error) => {
    if (error.response) {
      // Có response trả về từ server
      console.error('API Error Response:', error.response.data)
    } else if (error.request) {
      // Request gửi đi nhưng không có phản hồi
      console.error('API No Response:', error.request)
    } else {
      // Lỗi khác (ví dụ config)
      console.error('API Config Error:', error.message)
    }
    return Promise.reject(error)
  },
)

export default api
