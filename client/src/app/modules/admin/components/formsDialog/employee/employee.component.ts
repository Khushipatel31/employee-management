import { Component, inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { AdminServices } from '../../../../../services/admin.service';
import { NotifyComponent } from '../../../../../components/notify/notify.component';

interface Designation {
  _id: string;
  name: string;
  is_active: number;
  createdAt: string;
  updatedAt: string;
  __v: number;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrl: './employee.component.css',
})
export class EmployeeComponent implements OnInit {
  employeeForm!: FormGroup;
  error: string = '';
  loading: Boolean = false;
  valid: Boolean = false;
  designations: Designation[] = [];
  readonly dialogRef = inject(MatDialogRef<EmployeeComponent>);
  readonly data = inject<any>(MAT_DIALOG_DATA);

  constructor(
    private formBuilder: FormBuilder,
    private _snackBar: MatSnackBar,
    private admin: AdminServices
  ) {
    this.employeeForm = this.formBuilder.group({
      email: [this.data?.email || '', Validators.required],
      fullname: [this.data?.fullname || '', Validators.required],
      designation: [this.data?.designation || '', Validators.required],
      joinDate: [this.data?.joinDate || '', Validators.required],
    });
  }
  ngOnInit(): void {
    this.admin.fetchDesignation();
    this.admin.designationSubject.subscribe((data: Designation[]) => {
      this.designations = data;
    });
  }

  onFormSubmit() {
    if (this.employeeForm.invalid) {
      this.error = 'Enter project details properly';
      return;
    }
    if (!this.data.edit) {
      this.loading = true;
      const formValue = this.employeeForm.value;
      const formattedDate = formValue.joinDate.format('YYYY-MM-DD');
      const formValues = {
        ...formValue,
        joinDate: formattedDate,
      };
      this.admin.addEmployee(formValues).subscribe((data) => {
        if (data.success) {
          this.dialogRef.close(true);
          this._snackBar.openFromComponent(NotifyComponent, {
            duration: 5 * 1000,
            data: 'Employee added Successfully!!',
          });
          this.admin.fetchEmployees();
        }
      });
      this.admin.getCounts();
    } else {
      const formValue = this.employeeForm.value;
      let formValues = {
        ...formValue,
        userId: this.data.id,
      };
      if (typeof formValue.joinDate == 'object') {
        const formattedDate = formValue.joinDate.format('YYYY-MM-DD');
        formValues = {
          ...formValue,
          userId: this.data.id,
          joinDate: formattedDate,
        };
      }
      this.admin.editEmployee(formValues);
      this.loading = false;
      this.dialogRef.close(true);
      this._snackBar.openFromComponent(NotifyComponent, {
        duration: 5 * 1000,
        data: 'Employee edited Successfully!!',
      });
    }
  }
}
