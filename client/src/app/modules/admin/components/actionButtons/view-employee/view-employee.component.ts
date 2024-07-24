import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { ViewEmployeeDialogComponent } from '../../view-employee-dialog/view-employee-dialog.component';

@Component({
  selector: 'app-view-employee',
  templateUrl: './view-employee.component.html',
  styleUrl: './view-employee.component.css',
})
export class ViewEmployeeComponent {
  params: any;
  constructor(private dialog: MatDialog) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  clicked() {
    this.dialog.open(ViewEmployeeDialogComponent, {
      width: '650px',
      height: '650px',
      data: this.params.data,
    });
  }
}
