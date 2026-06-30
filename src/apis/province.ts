import api from '@/apis/axios'
export interface Province {
  id: number
  name: string
}

export interface ApiResponse<T> {
  code: number
  message: string
  error: string | null
  data: T
  timestamp: number
}

export async function getProvinces(): Promise<{ res: Province[] }> {
  const res = await api.get<ApiResponse<Province[]>>('/v1/suggestion/getProvinceList')
  return { res: res.data } // chỉ lấy mảng data
}

export async function getWards(provinceId: number): Promise<{ res: Province[] }> {
  const res = await api.get<ApiResponse<Province[]>>(
    `/v1/suggestion/getWardList?provinceId=${provinceId}`,
  )
  return { res: res.data } // chỉ lấy mảng data
}
