import api from '@/apis/axios'

export interface Post {
  id: number
  title: string
  provinceName: string
  wardName: string
  square: number
  price: number
  createTime: string
  thumbnail: string
  original: number
}

export interface Meta {
  total: number
  perPage: number
  currentPage: number
  lastPage: number
  from: number
  to: number
}

export interface PostResponse {
  data: any
  phongTroList: Post[]
  meta: Meta
}

export interface PostFilter {
  page?: number
  provinceId?: number
  wardId?: number | null
  price?: number | null
  square?: number | null
  areaId?: number | null
}

export async function getPosts(filter: PostFilter): Promise<{ res: PostResponse }> {
  const res = await api.get<PostResponse>(
    `/v1/phongtro/getPhongTroList?page=1&provinceId=${filter.provinceId ?? ''}&wardId=${filter.wardId ?? ''}&price=${filter.price ?? ''}&square=${filter.square ?? ''}&areaId=${filter.areaId ?? ''}&status=2`,
  )
  return { res: res.data } // bọc vào key `res`
}
