import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { JoinProjectRequestComponent } from '../../formsDialog/join-project-request/join-project-request.component';

@Component({
  selector: 'app-project-join-action',
  templateUrl: './project-join-action.component.html',
  styleUrl: './project-join-action.component.css',
})
export class ProjectJoinActionComponent {
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
    this.dialog.open(JoinProjectRequestComponent, {
      width: '500px',
      height: '200px',
      data: this.params.data._id,
    });
  }
}
