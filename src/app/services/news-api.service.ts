import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Sources} from '../models/Sorces';

@Injectable({
  providedIn: 'root'
})
export class NewsApiServiceService {

  constructor(private http: HttpClient) { }
  getSources(s, c, page):Observable<Sources>{
    const params = new HttpParams()
    .set('q', s)
    .set('category', c)
    .set('apiKey', '09b2a48dc89f416caada3626ec05f9eb')
    .set('page', page)
    .set('pageSize', '6');
    return <Observable<Sources>> this.http.get( 'http://newsapi.org/v2/top-headlines',{params});
  }
  
}
