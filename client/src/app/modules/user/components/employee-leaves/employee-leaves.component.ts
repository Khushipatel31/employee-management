import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';
import { EmployeeLeaveActionComponent } from '../actionButtons/employee-leave-action/employee-leave-action.component';

@Component({
  selector: 'app-employee-leaves',
  templateUrl: './employee-leaves.component.html',
  styleUrls: ['./employee-leaves.component.css'],
})
export class EmployeeLeavesComponent implements OnInit {
  pending: any[] = [];
  approved: any[] = [];
  rejected: any[] = [];
  status = 'pending';
  rowData: any[] = [];
  pagination = true;
  paginationPageSize = 20;
  paginationPageSizeSelector = [20, 50, 100];
  colDefs: ColDef[] = [];
  attributes: ColDef[] = [
    {
      field: 'index',
      flex: 0.5,
    },
    { field: 'leaveType', filter: true, flex: 1 },
    { field: 'username', filter: true, flex: 1 },
    { field: 'reason', filter: true, flex: 1 },
    {
      field: 'from',
      filter: true,
      valueFormatter: (p: any) => {
        return p.value
          ? this.datepipe.transform(p.value, 'shortDate') || ''
          : '';
      },
    },
    {
      field: 'to',
      filter: true,
      valueFormatter: (p: any) => {
        return p.value
          ? this.datepipe.transform(p.value, 'shortDate') || ''
          : '';
      },
    },
    {
      field: 'markAsComplete',
      cellRenderer: EmployeeLeaveActionComponent,
    },
  ];

  constructor(private userServices: UserService, private datepipe: DatePipe) {}

  ngOnInit(): void {
    this.userServices.fetchEmployeeLeaves();
    this.userServices.employeeLeavesSubject.subscribe((data) => {
      this.pending = data.pending || [];
      this.rejected = data.rejected || [];
      this.approved = data.approved || [];
      this.rowData = this.pending;
      this.colDefs = this.attributes.slice();
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
