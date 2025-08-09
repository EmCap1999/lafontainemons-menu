import type { ItemSelect, SectionSelect } from '@lafontaine/database'

export type PublicSection = Pick<
  SectionSelect,
  'sectionId' | 'name' | 'displayOrder'
>
export type PublicItem = Pick<
  ItemSelect,
  | 'name'
  | 'price'
  | 'description'
  | 'origin'
  | 'capacity'
  | 'unit'
  | 'isAvailable'
  | 'displayOrder'
>

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

export const toPublicSection = (section: SectionSelect): PublicSection =>
  section as PublicSection
export const toPublicItem = (item: ItemSelect): PublicItem => item as PublicItem
