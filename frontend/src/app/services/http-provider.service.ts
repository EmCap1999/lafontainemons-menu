import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';
import { environment } from '../environments/environment.dev';

var apiUrl = environment.apiUrl;

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllItems(condition?: any): Observable<any> {
    let url = apiUrl + "allitems";
    if (condition) {
      url += `?condition=${JSON.stringify(condition)}`;
    }
    return this.webApiService.get(url);
  }
}
