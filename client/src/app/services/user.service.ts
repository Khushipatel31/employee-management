import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpServices } from './http.service';

export interface IDesignation {
  _id: string;
  name: string;
  is_active: number;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
}

export interface Employee {
  _id: string;
  fullname: string;
  email: string;
  is_active: number;
  role: string;
  profileCompleted: number;
  designation: IDesignation;
  projects: string[];
  courses: string[];
  joinDate: Date;
  createdAt: Date;
  updatedAt: Date;
  __v: number;
  profile: {
    public_id?: string;
    url?: string;
  }[];
}

@Injectable({
  providedIn: 'root',
})
export class UserService {
  projects: any;
  usernameSubject: BehaviorSubject<any> = new BehaviorSubject<any>('');
  projectSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  myProjectSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  profileSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  profileData: Employee | null = null;

  constructor(private http: HttpServices) {}

  subjectUsername(name: any): void {
    this.usernameSubject.next(name);
  }

  subjectProject(newProjects: any): void {
    this.projectSubject.next(newProjects);
  }

  subjectProfile(data: Employee) {
    this.profileSubject.next(data);
  }

  subjectMyProject(newProjects: any) {
    this.myProjectSubject.next(newProjects);
  }

  fetchProfileDetail() {
    this.http.getMethod('/user/verify').subscribe((data) => {
      this.subjectProfile(data.data);
    });
  }

  updateProfile(data: any) {
    return this.http.putMethod('/user/completeProfile', data);
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

  fetchMyProjects() {
    this.http
      .getMethod('/user/myProjects')
      .pipe(
        map((data: any) => {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectMyProject(data);
      });
  }

  joinProject(id: string) {
    return this.http.postMethod('/user/assignProject', { project: id });
  }

  fetchEmployee() {
    return this.http.getMethod('/user/employees').pipe(
      map((data: any) => {
        if (data.success) {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.designation = ele.designation.name;
          });
          return data.data;
        }
      })
    );
  }

  fetchEmployeeProjects(id: string) {
    return this.http.getMethod(`/user/getProjects/${id}`).pipe(
      map((data: any) => {
        if (data.success) {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
          });
          return data;
        }
      })
    );
  }
}
