import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { UserService } from '../../../../services/user.service';
import { DatePipe } from '@angular/common';
import { LeaveActionComponent } from '../actionButtons/leave-action/leave-action.component';
import { AssignProjectFormComponent } from './assign-project-form/assign-project-form.component';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrl: './my-project.component.css',
})
export class MyProjectComponent implements OnInit {
  projects: [] = [];
  status = 'pending';
  pending!: any;
  approved!: any;
  disapproved!: any;
  pagination = true;
  rowData: any[] = [];
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [];
  attributes: ColDef[] = [
    { field: 'index', flex: 1 },
    { field: 'projectName', headerName: 'Project', filter: true, flex: 1 },
    { field: 'projectStatus', filter: true, flex: 1 },
    {
      field: 'joinDate',
      headerName: 'Joined On',
      filter: true,
      flex: 1,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    // {
    //   field: 'action',
    //   headerName: 'Leave Project',
    //   cellRenderer: LeaveActionComponent,
    // },
  ];
  constructor(
    private userService: UserService,
    private datePipe: DatePipe,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.userService.fetchMyProjects();
    this.status = 'pending';
    this.userService.myProjectSubject.subscribe((data: any) => {
      this.pending = data.pending;
      this.disapproved = data.disapproved;
      this.approved = data.approved;
      this.rowData = data.pending;
      this.colDefs = this.attributes.slice();
    });
  }
  onStatusChange(status: any): void {
    this.status = status.value;
    if (this.status === 'pending') {
      this.rowData = this.pending;
      this.colDefs = this.attributes.slice();
    } else if (this.status === 'approved') {
      this.rowData = this.approved;
      this.colDefs = this.attributes.slice();
      this.colDefs.push({
        field: 'action',
        headerName: 'Leave Project',
        cellRenderer: LeaveActionComponent,
      });
    } else {
      this.rowData = this.disapproved;
      this.colDefs = this.attributes.slice();
    }
  }

  assignForm() {
    this.dialog.open(AssignProjectFormComponent, {
      width: '600px',
      height: '600 px',
      data: {
        name: '',
        description: '',
        duration: '',
        startDate: '',
        edit: false,
        id: '',
      },
    });
  }
}
