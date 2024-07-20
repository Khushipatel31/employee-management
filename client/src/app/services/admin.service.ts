import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AdminServices {

  designations:any;
  projects:any;
  designationSubject:BehaviorSubject<any>=new BehaviorSubject<any>([]);
  projectSubject:BehaviorSubject<any>=new BehaviorSubject<any>([]);



  constructor(private http:HttpServices) { }

  subjectDesignation(newDesignations:any):void{
    this.designationSubject.next(newDesignations);
  }

  subjectProject(newProjects:any):void{
    this.projectSubject.next(newProjects);
  }

  addDesignation(data:string){
    return this.http.postMethod('/admin/designation',data);
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

  addProject(data:string){
    return this.http.postMethod('/admin/project',data);
  }

  fetchProjects(){
    this.http.getMethod('/admin/project').pipe(
      map((data:any)=>{
        data.data.forEach((ele:any,i:number)=>{
          ele.index=i+1;
        });
        return data.data;
      })
    ).subscribe((data)=>{
      this.subjectProject(data);
    })
  }

  editProject(data:any){
    this.http.putMethod('/admin/project',data).subscribe((data)=>{
      this.fetchProjects();
    })
  }

}
