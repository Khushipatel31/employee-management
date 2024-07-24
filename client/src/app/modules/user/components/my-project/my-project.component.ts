import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ColDef } from 'ag-grid-community';
import { UserService } from '../../../../services/user.service';
import { DatePipe } from '@angular/common';
import { LeaveActionComponent } from '../actionButtons/leave-action/leave-action.component';

@Component({
  selector: 'app-my-project',
  templateUrl: './my-project.component.html',
  styleUrl: './my-project.component.css',
})
export class MyProjectComponent implements OnInit {
  projects: [] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', filter: true },
    { field: 'name', filter: true },
    { field: 'description', flex: 1, filter: true },
    { field: 'status', filter: true },
    {
      field: 'startDate',
      flex: 1,
      filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    { field: 'duration', flex: 1, filter: true },
    {
      field: 'action',
      headerName: 'Leave Project',
      cellRenderer: LeaveActionComponent,
    },
  ];
  constructor(private userService: UserService, private datePipe: DatePipe) {}

  ngOnInit(): void {
    this.userService.fetchMyProjects();
    this.userService.myProjectSubject.subscribe((data: any) => {
      console.log(data);
      this.projects = data;
    });
  }
}
