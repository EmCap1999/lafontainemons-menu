import type { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { type Observable, map } from 'rxjs'
import { environment } from '../../environments/environment'
import type {
  ApiResponse,
  ItemsResponse,
  SectionsResponse,
} from '../models/api-response.models'
import {
  type Item,
  ItemSchema,
  type Section,
  SectionSchema,
} from '../models/menu.models'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<Section[]> {
    return this.http
      .get<ApiResponse<SectionsResponse>>(`${this.apiUrl}/sections`)
      .pipe(
        map((response) => {
          const sections = response.data.sections
          return Array.isArray(sections)
            ? sections.map((section) => SectionSchema.parse(section))
            : []
        })
      )
  }

  getItemsBySection(sectionId: number): Observable<Item[]> {
    return this.http
      .get<ApiResponse<ItemsResponse>>(
        `${this.apiUrl}/sections/${sectionId}/items`
      )
      .pipe(
        map((response) => {
          const items = response.data.items
          return Array.isArray(items)
            ? items.map((item) => ItemSchema.parse(item))
            : []
        })
      )
  }
}
