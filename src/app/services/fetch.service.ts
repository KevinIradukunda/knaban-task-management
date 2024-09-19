import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class FetchService {
  constructor(private http: HttpClient) {}

  getAllData(): Observable<any> {
    return this.http.get('assets/data.json');
  }

  getData(board: any): Observable<any> {
    return this.http.get(`assets/data.json`);
  }
}
