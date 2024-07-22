import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { UserService } from '../../../../services/user.service';
import { DatePipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { ProjectActionComponent } from '../actionButtons/project-action/project-action.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css',
})
export class ProjectComponent implements OnInit {
  projects: [] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1, filter: true },
    { field: 'name', flex: 1, filter: true },
    { field: 'description', flex: 1, filter: true },
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
      cellRenderer: ProjectActionComponent,
    },
  ];
  constructor(
    private dialog: MatDialog,
    private userService: UserService,
    private datePipe: DatePipe
  ) {}

  ngOnInit(): void {
    this.userService.fetchProjects();
    this.userService.projectSubject.subscribe((data: any) => {
      this.projects = data;
    });
  }
}
