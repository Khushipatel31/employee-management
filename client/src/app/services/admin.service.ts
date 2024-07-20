import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {

  designationSubject:BehaviorSubject<any>=new BehaviorSubject<any>([]);
  designations:any;
  constructor(private http:HttpServices) { }

  subjectDesignation(newDesignations:any):void{
    this.designationSubject.next(newDesignations);
  }

  addDesignation(data:string){
    return this.http.postMethod('/admin/designation',data);
  }

  addProject(data:string){
    return this.http.postMethod('/admin/project',data);
  }

  fetchDesignation(){
      this.http.getMethod('/admin/designation').pipe(
      map((data:any)=>{
          data.data.forEach((ele:any,i:number)=>{
            ele.index=i+1;
          });
          return data.data;
      })
    ).subscribe((data)=>{
      this.subjectDesignation(data);
    })
  }

}
