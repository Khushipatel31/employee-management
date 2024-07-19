import { Component } from '@angular/core';
import { DesignationComponent as designationDialog } from '../formsDialog/designation/designation.component';
import { MatDialog } from '@angular/material/dialog';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  // styleUrl: './designation.component.css'
})
export class DesignationComponent {
  constructor(private dialog: MatDialog) {}

  createDesignation() {
    this.dialog.open(designationDialog, {
      width: '600px',
      height: '600 px',
      data: {
        designation: '',
        edit: false,
        id:'',
      },
    });
  }
}
