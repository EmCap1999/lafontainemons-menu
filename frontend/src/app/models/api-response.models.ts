import { Item } from './menu.models'

export interface ApiResponse<T> {
  status: string
  results: number
  data: T
}

export interface ItemsResponse {
  items: Item[]
}
