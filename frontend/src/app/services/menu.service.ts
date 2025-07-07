import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../environments/environment'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getAllSections(): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/sections`)
      .pipe(map((response) => response.data.sections))
  }

  getItemsBySection(sectionId: number): Observable<any[]> {
    return this.http
      .get<any>(`${this.apiUrl}/sections/${sectionId}/items`)
      .pipe(map((response) => response.data.items))
  }
}
