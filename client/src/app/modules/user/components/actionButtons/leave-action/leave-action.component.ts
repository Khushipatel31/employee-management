import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { LeaveProjectComponent } from '../../dialogs/leave-project/leave-project.component';

@Component({
  selector: 'app-leave-action',
  templateUrl: './leave-action.component.html',
  styleUrl: './leave-action.component.css',
})
export class LeaveActionComponent {
  params: any;
  constructor(private dialog: MatDialog) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  leave() {
    this.dialog.open(LeaveProjectComponent, {
      width: '600px',
      height: '600 px',
      data: {
        id: this.params.data._id,
        edit: true,
      },
    });
  }
}
