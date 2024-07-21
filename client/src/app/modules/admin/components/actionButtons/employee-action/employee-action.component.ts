import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { EmployeeComponent } from '../../formsDialog/employee/employee.component';
import { EmployeeDeleteComponent } from '../../deleteDialog/employee-delete/employee-delete.component';

@Component({
  selector: 'app-employee-action',
  templateUrl: './employee-action.component.html',
  styleUrl: './employee-action.component.css'
})
export class EmployeeActionComponent {
  params: any;
  constructor(private dialog: MatDialog) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }

  edit() {
    this.dialog.open(EmployeeComponent, {
      width: '600px',
      height: '600 px',
      data: {
        email: this.params.data.email,
        fullname: this.params.data.fullname,
        joinDate: this.params.data.joinDate,
        id: this.params.data._id,
        designation:this.params.data.designation,
        edit:true
      },
    });
  }

  delete() {
    this.dialog.open(EmployeeDeleteComponent, {
      width: '500px',
      data: this.params.data._id,
    });
  }
}
