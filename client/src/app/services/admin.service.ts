import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {

  constructor(private http:HttpServices) { }

  addDesignation(data:string){
    return this.http.postMethod('/admin/designation',data);
  }

  addProject(data:string){
    return this.http.postMethod('/admin/project',data);
  }

  getDesignation(){
    return this.http.getMethod('/admin/designation').pipe(
      map((data:any)=>{
          data.data.forEach((ele:any,i:number)=>{
            ele.index=i+1;
          });
          return data;
      })
    );
  }

}
