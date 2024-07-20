import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServices } from '../../../../services/admin.service';
import { Router } from '@angular/router';
import { ProjectComponent as projectDialog } from '../formsDialog/project/project.component';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { ProjectActionComponent } from '../actionButtons/project-action/project-action.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  styleUrl: './project.component.css'
})
export class ProjectComponent implements OnInit {

  projects:[]=[];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1, filter: true },
    { field: 'name', flex: 1,filter: true },
    { field: 'description', flex: 1,filter: true, },
    { field: 'startDate', flex: 1 ,filter: true,
      valueFormatter: (p: any) => {
        return this.datePipe.transform(p.value, 'shortDate') + '';
      },
    },
    { field: 'duration', flex: 1,filter: true, },
    {
      field: 'action',
      cellRenderer: ProjectActionComponent,
    }
  ];

  constructor(private dialog: MatDialog, private admin: AdminServices,private router:Router,private datePipe:DatePipe){
  }

  ngOnInit(): void {
    this.admin.fetchProjects();
    this.admin.projectSubject.subscribe((data: any) => {
      this.projects = data;
    });
  }

  createProject(){
    this.dialog.open(projectDialog, {
      width: '600px',
      height: '600 px',
      data: {
        name: '',
        description:'',
        duration:'',
        startDate:'',
        edit: false,
        id: '',
      },
    });
  }
}
