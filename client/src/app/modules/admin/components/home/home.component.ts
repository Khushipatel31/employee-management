import { Component, OnInit } from '@angular/core';
import { AdminServices } from '../../../../services/admin.service';
import { DatePipe } from '@angular/common';
import { ColDef } from 'ag-grid-community';
import { ApproveLeaveComponent } from '../approve-leave/approve-leave.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  employees: Number = 0;
  projects: Number = 0;
  designations: Number = 0;
  pending!: any;
  approved!: any;
  rejected!: any;
  status = 'pending';
  rowData: any[] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [];
  attributes: ColDef[] = [
    {
      field: 'index',
      filter: true,
      flex: 0.5,
    },
    { field: 'reason', filter: true },
    { field: 'leaveType', filter: true },
    {
      field: 'from',
      filter: true,
      valueFormatter: (p: any) => {
        return this.datepipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'to',
      filter: true,
      valueFormatter: (p: any) => {
        return this.datepipe.transform(p.value, 'shortDate') + '';
      },
    },
    {
      field: 'markAsComplete',
      cellRenderer: ApproveLeaveComponent,
    },
  ];
  constructor(
    private adminService: AdminServices,
    private datepipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.adminService.fetchLeaves();
    this.adminService.leaveSubject.subscribe((data: any) => {
      this.pending = data.pending;
      this.rejected = data.rejected;
      this.approved = data.approved;
      this.rowData = data.pending;
      this.colDefs = this.attributes.slice();
    });
    this.adminService.getCounts();
    this.adminService.countSubject.subscribe((data) => {
      if (data && data.success) {
        this.designations = data.data.designations;
        this.projects = data.data.projects;
        this.employees = data.data.employees;
      }
    });
  }
  onStatusChange(status: any): void {
    this.status = status.value;
    let columns = this.attributes.slice();
    if (this.status === 'pending') {
      this.rowData = this.pending;
    } else if (this.status === 'approved') {
      this.rowData = this.approved;
      columns = columns.filter((col) => col.field !== 'markAsComplete');
      columns.push({
        field: 'approvedByName',
      });
    } else {
      this.rowData = this.rejected;
      columns = columns.filter((col) => col.field !== 'markAsComplete');
      columns.push({
        field: 'approvedByName',
      });
    }
    this.colDefs = columns;
  }
}
