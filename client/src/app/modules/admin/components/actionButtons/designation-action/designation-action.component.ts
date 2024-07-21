import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ICellRendererParams } from 'ag-grid-community';
import { DesignationComponent } from '../../formsDialog/designation/designation.component';

@Component({
  selector: 'app-designation-action',
  templateUrl: './designation-action.component.html',
  styleUrl: './designation-action.component.css'
})
export class DesignationActionComponent {
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
    console.log(this.params.data);
    this.dialog.open(DesignationComponent, {
      width: '600px',
      height: '600 px',
      data: {
        name: this.params.data.name,
        id: this.params.data._id,
        edit:true
      },
    });
  }
}
