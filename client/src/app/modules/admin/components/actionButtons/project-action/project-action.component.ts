import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { ProjectComponent } from '../../formsDialog/project/project.component';
import { duration } from 'moment';

@Component({
  selector: 'app-project-action',
  templateUrl: './project-action.component.html',
  styleUrl: './project-action.component.css'
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

  edit() {
    this.dialog.open(ProjectComponent, {
      width: '600px',
      height: '600 px',
      data: {
        name: this.params.data.name,
        description: this.params.data.description,
        startDate: this.params.data.startDate,
        id: this.params.data._id,
        duration:this.params.data.duration,
        edit:true
      },
    });
  }

  // delete() {
  //   this.dialog.open(DeleteDialogComponent, {
  //     width: '500px',
  //     data: this.params.data._id,
  //   });
  // }

}
