import type { PublicSection, PublicItem } from './schemas.js'

// Types de réponse API standardisés
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

// Types de réponse spécifiques
export interface SectionsResponse extends ApiResponse<{ sections: PublicSection[] }> {}
export interface ItemsResponse extends ApiResponse<{ items: PublicItem[] }> {}