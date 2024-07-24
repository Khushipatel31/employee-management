import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { UserService } from '../../../../services/user.service';
import { ColDef } from 'ag-grid-community';
import { DatePipe, Location } from '@angular/common';

@Component({
  selector: 'app-employee-projects',
  templateUrl: './employee-projects.component.html',
  styleUrl: './employee-projects.component.css',
})
export class EmployeeProjectsComponent implements OnInit {
  projects: [] = [];
  error: string = '';
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1 },
    { field: 'name', flex: 1, filter: true },
    { field: 'description', flex: 1, filter: true },
    { field: 'duration', flex: 1, filter: true },
    {
      field: 'startDate',
      headerName: 'Project start date',
      flex: 1,
      filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'joinedOn',
      flex: 1,
      filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    { field: 'status', flex: 1, filter: true },
  ];
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private datePipe: DatePipe,
    private location: Location
  ) {}
  ngOnInit(): void {
    let id = this.route.snapshot.params['id'];
    this.userService.fetchEmployeeProjects(id).subscribe(
      (data) => {
        console.log(data);
        this.projects = data.data;
        this.error = '';
      },
      (err) => {
        this.error = err.error.error.message;
      }
    );
  }
  goBack(): void {
    this.location.back();
  }
}
