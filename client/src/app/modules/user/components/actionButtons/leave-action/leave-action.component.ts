import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { LeaveProjectComponent } from '../../dialogs/leave-project/leave-project.component';
import { AssignProjectFormComponent } from '../../my-project/assign-project-form/assign-project-form.component';
import { MyProjectDetailsComponent } from '../../my-project/my-project-details/my-project-details.component';

@Component({
  selector: 'app-leave-action',
  templateUrl: './leave-action.component.html',
  styleUrl: './leave-action.component.css',
})
export class LeaveActionComponent implements OnInit {
  params: any;
  constructor(private dialog: MatDialog) {}
  agInit(params: ICellRendererParams): void {
    this.params = params;
  }
  refresh(params: ICellRendererParams) {
    this.params = params;
    return true;
  }
  ngOnInit(): void {
    console.log(this.params.data);
  }
  detail() {
    this.dialog.open(MyProjectDetailsComponent, {
      width: '600px',
      height: '600px',
      data: this.params.data,
    });
  }
  leave() {
    this.dialog.open(AssignProjectFormComponent, {
      width: '600px',
      height: '600 px',
      data: {
        id: this.params.data._id,
        project: this.params.data.projectName,
        reportingTo: this.params.data.reportingTo.fullname,
        joinDate: this.params.data.joinDate,
        leaveDate: this.params.data.leaveDate,
        edit: true,
      },
    });
  }
}
