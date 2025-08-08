import type { PublicItem, PublicSection } from './schemas.js'

export interface ApiResponse<T> {
  status: 'success' | 'error'
  results?: number
  data?: T
}

export interface ApiError {
  status: 'error'
  error: {
    message: string
    statusCode: number
    stack?: string
    details?: any
  }
}

export interface SectionsResponse
  extends ApiResponse<{ sections: PublicSection[] }> {}
export interface ItemsResponse extends ApiResponse<{ items: PublicItem[] }> {}
