import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpServices } from './http.service';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  projects: any;
  usernameSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  projectSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  constructor(private http: HttpServices) {}
  subjectUsername(name: any): void {
    this.usernameSubject.next(name);
  }

  subjectProject(newProjects: any): void {
    this.projectSubject.next(newProjects);
  }

  fetchProjects() {
    this.http
      .getMethod('/user/projects')
      .pipe(
        map((data: any) => {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectProject(data);
      });
  }

  joinProject(id: string) {
    return this.http.postMethod('/user/assignProject', { project: id });
  }
}
