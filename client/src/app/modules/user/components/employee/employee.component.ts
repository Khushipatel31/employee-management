import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { ColDef } from 'ag-grid-community';
import { UserService } from '../../../../services/user.service';
import { EmployeeActionComponent } from '../actionButtons/employee-action/employee-action.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employees: [] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1 },
    { field: 'fullname', flex: 1, filter: true },
    { field: 'email', flex: 1, filter: true },
    { field: 'designation', flex: 1, filter: true },
    {
      field: 'joinDate',
      flex: 1,
      filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'action',
      cellRenderer: EmployeeActionComponent,
    },
  ];
  constructor(private datePipe: DatePipe, private userService: UserService) {}

  ngOnInit(): void {
    this.userService.fetchEmployee().subscribe((data) => {
      this.employees = data;
      console.log(data);
    });
  }
}
