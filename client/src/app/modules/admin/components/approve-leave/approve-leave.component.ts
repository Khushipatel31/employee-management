import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { LeaveDialogComponent } from './leave-dialog/leave-dialog.component';

@Component({
  selector: 'app-approve-leave',
  templateUrl: './approve-leave.component.html',
  styleUrl: './approve-leave.component.css',
})
export class ApproveLeaveComponent {
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
    this.dialog.open(LeaveDialogComponent, {
      width: '500px',
      height: '200px',
      data: this.params.data._id,
    });
  }
}
