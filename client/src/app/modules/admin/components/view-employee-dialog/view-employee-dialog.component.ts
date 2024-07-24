import { Component, inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-view-employee-dialog',
  templateUrl: './view-employee-dialog.component.html',
  styleUrl: './view-employee-dialog.component.css',
})
export class ViewEmployeeDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ViewEmployeeDialogComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  profileUrl: string;
  fullname: string;
  email: string;
  designation: { name: string };
  joinDate: Date;
  address: string;
  city: string;
  state: string;
  pin: string;
  contact: string;
  dob: Date;
  education: string;
  gender: string;
  courses: string[];

  constructor() {
    console.log(this.data);
    this.profileUrl = this.data.profile?.url || '';
    this.fullname = this.data.fullname || '';
    this.email = this.data.email || '';
    this.designation = this.data.designationName || '';
    this.joinDate = this.data.joinDate || null;
    this.address = this.data.address || '';
    this.city = this.data.city || '';
    this.state = this.data.state || '';
    this.pin = this.data.pin || '';
    this.contact = this.data.contact || '';
    this.dob = this.data.dob || null;
    this.education = this.data.education || '';
    this.gender = this.data.gender || '';
    this.courses = this.data.courses || [];
  }

  closeModal(): void {
    this.dialogRef.close();
  }
}
