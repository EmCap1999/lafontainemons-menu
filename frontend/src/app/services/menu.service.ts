import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import type {
  ItemsResponse,
  PublicItem,
  PublicSection,
  SectionsResponse,
} from '@lafontaine/backend/src/types'
import { map, Observable } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<PublicSection[]> {
    return this.http
      .get<SectionsResponse>(`${this.apiUrl}/sections`)
      .pipe(map((response) => response.data?.sections || []))
  }

  getItemsBySection(sectionId: number): Observable<PublicItem[]> {
    return this.http
      .get<ItemsResponse>(`${this.apiUrl}/sections/${sectionId}/items`)
      .pipe(map((response) => response.data?.items || []))
  }
}
