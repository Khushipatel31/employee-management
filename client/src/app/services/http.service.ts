import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

const URL: string = 'http://localhost:3001/api/v1';

@Injectable({
  providedIn: 'root',
})
export class HttpServices {
  constructor(private http: HttpClient) {}

  putMethod(url: string, data: Object): Observable<any> {
    return this.http.put<any>(URL + url, data);
  }

  postMethod(url: string, data: Object) {
    return this.http.post<any>(URL + url, data);
  }

  deleteMethod(url:string,id:any){
    return this.http.delete(URL+url,id);
  }

  getMethod(url: string) {
    return this.http.get<any>(URL + url);
  }
}