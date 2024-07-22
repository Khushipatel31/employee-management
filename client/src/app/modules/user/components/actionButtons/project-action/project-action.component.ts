import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { JoinProjectComponent } from '../../dialogs/join-project/join-project.component';

@Component({
  selector: 'app-project-action',
  templateUrl: './project-action.component.html',
  styleUrl: './project-action.component.css',
})
export class ProjectActionComponent {
  params: any;
  constructor(private dialog: MatDialog) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  join() {
    this.dialog.open(JoinProjectComponent, {
      width: '600px',
      height: '600 px',
      data: {
        id: this.params.data._id,
        edit: true,
      },
    });
  }
}
