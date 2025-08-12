import type { PublicItem, PublicSection } from './public.js'

export interface ApiResponse<T> {
  status: 'success' | 'error'
  results?: number
  data?: T
}

export interface SectionsResponse
  extends ApiResponse<{ sections: PublicSection[] }> {}
export interface ItemsResponse extends ApiResponse<{ items: PublicItem[] }> {}
