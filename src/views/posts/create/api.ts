import api from '@/apis/axios'

export interface CreatePostPayload {
  title: string | null
  content: string | null
  square: number | null
  price: number | null
  deposit: string | null
  provinceId: string | null
  wardId: string | null
  houseNo: string | null
  ownerName: string | null

  ownerPhone: string | null
  photos: any[]
  totalRoom: number | null
  currentRoom: number | null
  roomType: number | null
  roomDirection: number | null

  latitude: any | null
  longitude: any | null
  facility: number[]
}

export const createPhongTro = async (data: CreatePostPayload) => {
  return await api.post('/v1/phongtro/createPhongTro', data)
}
