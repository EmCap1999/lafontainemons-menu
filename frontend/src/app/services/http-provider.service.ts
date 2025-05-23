import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { WebApiService } from './web-api.service';

var apiUrl = "http://162.19.247.38:8080/";

@Injectable({
  providedIn: 'root'
})
export class HttpProviderService {
  constructor(private webApiService: WebApiService) { }

  public getAllItems(condition?: any): Observable<any> {
    let url = apiUrl + "allitems";
    if (condition) {
      url += `?condition=${encodeURIComponent(JSON.stringify(condition))}`;
      console.log('Calling URL:', url);
    }
    return this.webApiService.get(url);
  }
}
