import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.service';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { ProjectJoinActionComponent } from '../actionButtons/project-join-action/project-join-action.component';

@Component({
  selector: 'app-project-requests',
  templateUrl: './project-requests.component.html',
  styleUrl: './project-requests.component.css',
})
export class ProjectRequestsComponent implements OnInit {
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
    { field: 'username', flex: 1 },
    { field: 'email', flex: 1 },
    { field: 'projectName', headerName: 'Project', filter: true, flex: 1 },
    {
      field: 'joinDate',
      headerName: 'Joined On',
      filter: true,
      flex: 1,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'action',
      headerName: 'Approve/Reject',
      cellRenderer: ProjectJoinActionComponent,
    },
  ];
  constructor(
    private adminService: AdminServices,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.adminService.fetchProjectJoinRequests();
    this.adminService.projectJoinRequestSubject.subscribe((data) => {
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
      this.colDefs = this.colDefs.filter((ele) => ele.field != 'action');
    } else {
      this.rowData = this.disapproved;
      this.colDefs = this.attributes.slice();
      this.colDefs = this.colDefs.filter((ele) => {
        return ele.field !== 'action' && ele.field !== 'joinDate';
      });
    }
  }
}
