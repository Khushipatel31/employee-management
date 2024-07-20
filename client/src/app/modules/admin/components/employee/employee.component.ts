import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServices } from '../../../../services/admin.service';
import { EmployeeComponent as employeeDialog } from '../formsDialog/employee/employee.component';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { EmployeeActionComponent } from '../actionButtons/employee-action/employee-action.component';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css'
})
export class EmployeeComponent implements OnInit {

  employees:[]=[];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1, filter: true },
    { field: 'fullname', flex: 1,filter: true },
    { field: 'designationName', flex: 1,filter: true, },
    { field: 'joinDate', flex: 1 ,filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'action',
      cellRenderer: EmployeeActionComponent,
    }
  ];

  constructor(
    private dialog: MatDialog,
    private admin: AdminServices,
    private datePipe:DatePipe
  ) {}

  ngOnInit(): void {
    this.admin.fetchEmployees();
    this.admin.employeeSubject.subscribe((data: any) => {
      this.employees = data;
    });
  }

  createEmployee() {
    this.dialog.open(employeeDialog, {
      width: '600px',
      height: '600 px',
      data: {
        email: '',
        edit: false,
        id: '',
        fullname:'',
        designation:'',
        joinDate:''
      },
    });
  }
}
