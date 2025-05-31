import { HttpClient } from '@angular/common/http'
import { Injectable } from '@angular/core'
import { Observable, map } from 'rxjs'
import { environment } from '../../environments/environment'
import { ApiResponse, ItemsResponse } from '../models/api-response.models'
import { Item, ItemSchema } from '../models/menu.models'

@Injectable({
  providedIn: 'root',
})
export class MenuService {
  private apiUrl = environment.apiUrl

  constructor(private http: HttpClient) {}

  getAllItems(): Observable<Item[]> {
    return this.http
      .get<ApiResponse<ItemsResponse>>(`${this.apiUrl}/items`)
      .pipe(
        map((response) => {
          const items = response.data.items
          return Array.isArray(items)
            ? items.map((item) => ItemSchema.parse(item))
            : []
        }),
      )
  }
}
