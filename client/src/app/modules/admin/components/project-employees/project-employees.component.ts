import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { AdminServices } from '../../../../services/admin.service';
import { DatePipe, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';
import { ViewEmployeeComponent } from '../actionButtons/view-employee/view-employee.component';

@Component({
  selector: 'app-project-employees',
  templateUrl: './project-employees.component.html',
  styleUrl: './project-employees.component.css',
})
export class ProjectEmployeesComponent implements OnInit {
  employees: [] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1, filter: true },
    { field: 'fullname', flex: 1, filter: true },
    { field: 'designationName', flex: 1, filter: true },
    {
      field: 'projectJoinDate',
      headerName: 'Project Joined on',
      flex: 1,
      filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'action',
      cellRenderer: ViewEmployeeComponent,
    },
  ];

  constructor(
    private dialog: MatDialog,
    private admin: AdminServices,
    private datePipe: DatePipe,
    private route: ActivatedRoute,
    private location: Location
  ) {}

  goBack(): void {
    this.location.back();
  }

  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.admin.fetchProjectEmployees(id);
    this.admin.projectEmployeesSubject.subscribe((data: any) => {
      console.log(data);
      this.employees = data;
    });
  }
}
