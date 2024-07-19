import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {

  constructor(private http:HttpServices) { }

  addDesignation(data:string){
    return this.http.postMethod('/admin/designation',data);
  }

}
