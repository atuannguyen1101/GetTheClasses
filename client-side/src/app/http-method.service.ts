import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Criteria } from './models/criteria';

@Injectable({
  providedIn: 'root'
})
export class HttpMethodService {
  constructor(private http: HttpClient) { }

  criteria: Criteria;

  get(url: string): Observable<any> {
      return this.http.get(url).map(res => {
        return res.json();
      });
  }

  post(url: string, data: string): Observable<any> {
    return this.http.post<any>(url, data);
  }
}
