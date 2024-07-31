import { Injectable } from '@angular/core';
import { BehaviorSubject, map } from 'rxjs';
import { HttpServices } from './http.service';
import { DatePipe } from '@angular/common';
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
  gender: string;
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
  countSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  profileViewSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  leaveSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  employeeLeavesSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});

  constructor(private http: HttpServices, private datePipe: DatePipe) {}

  subjectUsername(name: any): void {
    this.usernameSubject.next(name);
  }

  subjectEmployeeLeaves(data: any): void {
    this.employeeLeavesSubject.next(data);
  }

  subjectLeave(data: any): void {
    this.leaveSubject.next(data);
  }

  subjectProfileView(data: any): void {
    this.profileViewSubject.next(data);
  }

  subjectCount(counts: any): void {
    this.countSubject.next(counts);
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

  updateLeave(data: any, id: string) {
    this.http.putMethod(`/user/leave/${id}`, data).subscribe((data) => {
      this.fetchEmployeeLeaves();
    });
  }

  fetchProfileDetail() {
    this.http.getMethod('/user/verify').subscribe((data) => {
      this.subjectProfileView(data.data);
      this.subjectProfile(data.data);
    });
  }

  getCounts() {
    return this.http.getMethod('/user/counts').subscribe((data) => {
      this.subjectCount(data);
    });
  }

  fetchManagers() {
    return this.http.getMethod('/user/managers');
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

  fetchEmployeeLeaves() {
    this.http
      .getMethod('/user/employeeLeaves')
      .pipe(
        map((data: any) => {
          data.data.approved.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.approvedByName = ele.approved_by.fullname;
            ele.username = ele.user.fullname;
          });
          data.data.pending.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.username = ele.user.fullname;
          });
          data.data.rejected.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.approvedByName = ele.approved_by.fullname;
            ele.username = ele.user.fullname;
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectEmployeeLeaves(data);
      });
  }

  fetchLeaves() {
    this.http
      .getMethod('/user/leave')
      .pipe(
        map((data: any) => {
          data.data.approved.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.approvedByName = ele.approved_by.fullname;
          });
          data.data.pending.forEach((ele: any, i: number) => {
            ele.index = i + 1;
          });
          data.data.rejected.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.approvedByName = ele.approved_by.fullname;
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectLeave(data);
      });
  }

  fetchMyProjects() {
    this.http
      .getMethod('/user/myProjects')
      .pipe(
        map((data: any) => {
          data.data.approved.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.projectName = ele.project.name;
            if (ele.project.endDate > new Date(Date.now()).toISOString()) {
              ele.projectStatus = 'Active';
            } else {
              ele.projectStatus = 'Completed';
            }
          });
          data.data.pending.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.projectName = ele.project.name;
            if (ele.project.endDate > new Date(Date.now()).toISOString()) {
              ele.projectStatus = 'Active';
            } else {
              ele.projectStatus = 'Completed';
            }
          });
          data.data.disapproved.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.projectName = ele.project.name;
            if (ele.project.endDate > new Date(Date.now()).toISOString()) {
              ele.projectStatus = 'Active';
            } else {
              ele.projectStatus = 'Completed';
            }
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectMyProject(data);
      });
    // .pipe(
    //   map((data: any) => {
    //     // data.data.forEach((ele: any, i: number) => {
    //     //   ele.index = i + 1;
    //     // });
    //     // return data.data;
    //   })
    // )
  }

  joinProject(data: any) {
    return this.http.postMethod('/user/assignProject', data);
  }

  leaveProject(id: string, data: any) {
    return this.http.putMethod(`/user/leaveProject/${id}`, data);
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

  createLeave(data: any) {
    return this.http.postMethod('/user/leave', data);
  }
}
