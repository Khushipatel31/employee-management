import { Component, OnInit } from '@angular/core';
import { UserService } from '../../../../services/user.service';
import { ColDef } from 'ag-grid-community';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent implements OnInit {
  total: Number = 0;
  ongoing: Number = 0;
  completed: Number = 0;
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
    { field: 'reason', filter: true, flex: 1 },
    { field: 'leaveType', filter: true, flex: 1 },
    {
      field: 'from',
      filter: true,
      valueFormatter: (p: any) => {
        return this.datepipe.transform(p.value, 'shortDate') + '';
      },
      flex: 1,
    },
    {
      field: 'to',
      filter: true,
      valueFormatter: (p: any) => {
        return this.datepipe.transform(p.value, 'shortDate') + '';
      },
      flex: 1,
    },
  ];
  constructor(private userService: UserService, private datepipe: DatePipe) {}
  ngOnInit(): void {
    this.userService.fetchLeaves();
    this.userService.leaveSubject.subscribe((data: any) => {
      this.pending = data.pending;
      this.rejected = data.rejected;
      this.approved = data.approved;
      this.rowData = data.pending;
      this.colDefs = this.attributes.slice();
    });
    this.userService.getCounts();
    this.userService.countSubject.subscribe((data) => {
      if (data && data.success) {
        this.total = data.data.total;
        this.ongoing = data.data.active;
        this.completed = data.data.past;
      }
    });
  }
  onStatusChange(status: any): void {
    this.status = status.value;
    if (this.status === 'pending') {
      this.rowData = this.pending;
      this.colDefs = this.attributes.slice();
    } else if (this.status === 'approved') {
      this.rowData = this.approved;
      this.colDefs = this.attributes.slice();
      this.colDefs.push({
        field: 'approvedByName',
      });
    } else {
      this.rowData = this.rejected;
      this.colDefs = this.attributes.slice();
      this.colDefs.push({
        field: 'approvedByName',
      });
    }
  }
}
