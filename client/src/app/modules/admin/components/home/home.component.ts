import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  // styleUrl: './home.component.css'
})
export class HomeComponent implements OnInit {
  employees: Number = 0;
  projects: Number = 0;
  designations: Number = 0;
  constructor(private adminService: AdminServices) {}
  ngOnInit(): void {
    this.adminService.getCounts();
    this.adminService.countSubject.subscribe((data) => {
      if (data && data.success) {
        this.designations = data.data.designations;
        this.projects = data.data.projects;
        this.employees = data.data.employees;
      }
    });
  }
}
