import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { EmployeeLeaveComponent } from '../../dialogs/employee-leave/employee-leave.component';

@Component({
  selector: 'app-employee-leave-action',
  templateUrl: './employee-leave-action.component.html',
  styleUrl: './employee-leave-action.component.css',
})
export class EmployeeLeaveActionComponent {
  constructor(private dialog: MatDialog) {}

  params: any;
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  buttonClicked() {
    this.dialog.open(EmployeeLeaveComponent, {
      width: '500px',
      height: '200px',
      data: this.params.data._id,
    });
  }
}
