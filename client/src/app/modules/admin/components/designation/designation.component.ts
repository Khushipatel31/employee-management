import { Component, OnInit } from '@angular/core';
import { DesignationComponent as designationDialog } from '../formsDialog/designation/designation.component';
import { MatDialog } from '@angular/material/dialog';
import { AdminServices } from '../../../../services/admin.service';
import { ColDef } from 'ag-grid-community';
@Component({
  selector: 'app-designation',
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {
  designations: [] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [
    { field: 'index', flex: 1, filter: true },
    { field: 'name', flex: 1 },
  ];
  constructor(
    private dialog: MatDialog,
    private admin: AdminServices,
  ) {}

  ngOnInit(): void {
    this.admin.fetchDesignation();
    this.admin.designationSubject.subscribe((data: any) => {
      this.designations = data;
    });
  }

  createDesignation() {
    this.dialog.open(designationDialog, {
      width: '600px',
      height: '600 px',
      data: {
        edit: false,
      },
    });
  }
}
