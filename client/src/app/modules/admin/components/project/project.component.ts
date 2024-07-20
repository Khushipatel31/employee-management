import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { AdminServices } from '../../../../services/admin.service';
import { Router } from '@angular/router';
import { ProjectComponent as projectDialog } from '../formsDialog/project/project.component';

@Component({
  selector: 'app-project',
  templateUrl: './project.component.html',
  // styleUrl: './project.component.css'
})
export class ProjectComponent {
  constructor(private dialog: MatDialog, private admin: AdminServices,private router:Router){

  }

  createProject(){
    this.dialog.open(projectDialog, {
      width: '600px',
      height: '600 px',
      data: {
        designation: '',
        edit: false,
        id: '',
      },
    });
  }
}
