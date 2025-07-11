export interface ItemDataInput {
  sectionName: string
  subsectionName?: string
  name: string
  description?: string
  origin?: string
  capacity?: number
  unit?: string
  price: number
  displayOrder: number
}

export interface SubsectionDataInput {
  sectionName: string
  name: string
  displayOrder: number
}
