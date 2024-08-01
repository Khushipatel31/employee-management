import { Injectable } from '@angular/core';
import { HttpServices } from './http.service';
import { BehaviorSubject, map, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AdminServices {
  designations: any;
  projects: any;
  counts: any;
  designationSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  projectSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  projectEmployeesSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  employeeSubject: BehaviorSubject<any> = new BehaviorSubject<any>([]);
  countSubject: BehaviorSubject<any> = new BehaviorSubject<any>(null);
  leaveSubject: BehaviorSubject<any> = new BehaviorSubject<any>({});
  projectJoinRequestSubject: BehaviorSubject<any> = new BehaviorSubject<any>(
    {}
  );

  constructor(private http: HttpServices) {}

  subjectDesignation(newDesignations: any): void {
    this.designationSubject.next(newDesignations);
  }
  subjectProjectJoinRequest(data: any): void {
    this.projectJoinRequestSubject.next(data);
  }
  subjectProjectEmployees(data: any): void {
    this.projectEmployeesSubject.next(data);
  }

  subjectLeave(data: any): void {
    this.leaveSubject.next(data);
  }
  subjectProject(newProjects: any): void {
    this.projectSubject.next(newProjects);
  }

  subjectCount(counts: any): void {
    this.countSubject.next(counts);
  }

  subjectEmployee(newProjects: any): void {
    this.employeeSubject.next(newProjects);
  }

  addDesignation(data: string) {
    return this.http.postMethod('/admin/designation', data);
  }

  getCounts() {
    return this.http.getMethod('/admin/counts').subscribe((data) => {
      this.subjectCount(data);
    });
  }

  fetchProjectJoinRequests() {
    this.http
      .getMethod('/admin/projectJoinRequests')
      .pipe(
        map((data: any) => {
          data.data.approved.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.projectName = ele.project.name;
            ele.username = ele.user.fullname;
            ele.email = ele.user.email;
            ele.joinDate = ele.joinDate;
          });
          data.data.pending.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.projectName = ele.project.name;
            ele.username = ele.user.fullname;
            ele.email = ele.user.email;
            ele.joinDate = ele.joinDate;
          });
          data.data.disapproved.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            ele.projectName = ele.project.name;
            ele.username = ele.user.fullname;
            ele.email = ele.user.email;
            ele.joinDate = ele.joinDate;
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectProjectJoinRequest(data);
      });
  }

  fetchLeaves() {
    this.http
      .getMethod('/admin/leave')
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
        this.subjectLeave(data);
      });
  }

  updateLeave(data: any, id: string) {
    this.http.putMethod(`/admin/leave/${id}`, data).subscribe((data) => {
      this.fetchLeaves();
    });
  }

  updateJoinProjectRequest(data: any, id: string) {
    this.http
      .putMethod(`/admin/projectJoinRequest/${id}`, data)
      .subscribe((data) => {
        this.fetchProjectJoinRequests();
      });
  }

  fetchProjectEmployees(id: string) {
    this.http
      .getMethod(`/admin/project/${id}`)
      .pipe(
        map((data: any) => {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            (ele.designationName = ele.designation.name),
              (ele.designation = ele.designation._id);
          });
          console.log(data.data);
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectProjectEmployees(data);
      });
  }

  fetchDesignation() {
    this.http
      .getMethod('/admin/designation')
      .pipe(
        map((data: any) => {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectDesignation(data);
      });
  }

  editDesignation(data: any) {
    this.http.putMethod('/admin/designation', data).subscribe((data) => {
      this.fetchDesignation();
    });
  }

  addProject(data: string) {
    return this.http.postMethod('/admin/project', data);
  }

  fetchProjects() {
    this.http
      .getMethod('/admin/project')
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

  editProject(data: any) {
    this.http.putMethod('/admin/project', data).subscribe((data) => {
      this.fetchProjects();
    });
  }

  deleteProject(id: string) {
    return this.http.deleteMethod(`/admin/project/${id}`);
  }

  addEmployee(data: any) {
    return this.http.postMethod('/admin/employee', data);
  }

  fetchEmployees() {
    this.http
      .getMethod('/admin/employee')
      .pipe(
        map((data: any) => {
          data.data.forEach((ele: any, i: number) => {
            ele.index = i + 1;
            (ele.designationName = ele.designation.name),
              (ele.designation = ele.designation._id);
          });
          return data.data;
        })
      )
      .subscribe((data) => {
        this.subjectEmployee(data);
      });
  }

  editEmployee(data: any) {
    this.http.putMethod('/admin/employee', data).subscribe((data) => {
      this.fetchEmployees();
    });
  }

  deleteEmployee(id: string) {
    return this.http.deleteMethod(`/admin/employee/${id}`);
  }
}
